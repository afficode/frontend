import { IoMdClose } from 'react-icons/io';
import { Button, InputGroup, Modal } from '../../../ui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BiUpload } from 'react-icons/bi';
import { useImageCompressor, useNotify, useUpdateRequest } from '../../../hooks';
import { addWatermarkToImage } from '../../../utils';
import { AD_IMAGE_SIZE } from '../../../constants';

const EditRequest = ({ isOpen, setIsOpen, requestData, mainCategories = [] }) => {
    const initialValues = {
        item_name: requestData?.item_name || '',
        description: requestData?.description || '',
        category: requestData?.category || '',
        image: '',
    };

    const validationSchema = Yup.object({
        item_name: Yup.string().required('Required'),
        description: Yup.string()
            .required('Required')
            .test('max-words', 'Description cannot exceed 50 words', (value) => {
                if (!value) return true;
                const words = value
                    .trim()
                    .split(/\s+/)
                    .filter((w) => w.length > 0);
                return words.length <= 50;
            }),
        category: Yup.string().required('Required'),
        image: Yup.mixed().test('fileSize', 'Image size is too large (max 10MB)', (value) => {
            if (!value) return true;
            if (typeof value === 'string') return true;
            return value.size <= AD_IMAGE_SIZE;
        }),
    });

    const { compressImages } = useImageCompressor();
    const notify = useNotify();
    const { mutate, isLoading } = useUpdateRequest(requestData?.request_id);

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        setSubmitting(true);

        const formData = new FormData();
        formData.append('item_name', values.item_name);
        formData.append('description', values.description);
        formData.append('category', values.category);

        if (values.image) {
            try {
                const imageWithWatermark = await addWatermarkToImage(values.image);
                const [compressedImage] = await compressImages([imageWithWatermark]);
                formData.append('image', compressedImage);
            } catch (error) {
                notify('Failed to process image', 'error');
                return;
            }
        }

        mutate(formData, {
            onSuccess: (data) => {
                notify(data?.message || 'Request updated successfully!', 'success');
                resetForm();
                setIsOpen(false);
                setSubmitting(false);
            },
            onError: (error) => {
                notify(error?.response?.data?.message || 'Failed to update request', 'error');
                setSubmitting(false);
            },
        });
        setSubmitting(false);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
        enableReinitialize: true,
    });

    const getPreviewImage = () => {
        if (formik.values.image) {
            return URL.createObjectURL(formik.values.image);
        }
        return requestData?.image || null;
    };
    const previewContent = getPreviewImage();

    const wordCount = formik.values.description
        ? formik.values.description
              .trim()
              .split(/\s+/)
              .filter((w) => w.length > 0).length
        : 0;

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            padding={false}
            modalHeader={false}
            className={'!py-0 sm:!w-[450px]'}
        >
            <header className='flex items-center justify-between px-4 pb-4 border-b border-b-gray-200'>
                <h3 className='font-bold'>Edit Request</h3>

                <button type='button' onClick={() => setIsOpen(false)}>
                    <IoMdClose size={25} className='text-gray-500' />
                </button>
            </header>

            <form onSubmit={formik.handleSubmit} className='p-4 w-full space-y-4'>
                <div className='flex flex-col gap-0 items-start w-full'>
                    <label
                        htmlFor='item_name'
                        className='text-xs uppercase font-semibold text-gray-500 w-fit'
                    >
                        Item name
                    </label>
                    <InputGroup
                        type='text'
                        name='item_name'
                        placeholder={'What are you looking for?'}
                        value={formik.values.item_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        errorMsg={formik.errors.item_name}
                        className='!w-full bg-gray-50 border rounded-xl border-gray-100 focus:border-primary'
                    />
                </div>

                <div className='flex flex-col gap-0 items-start w-full'>
                    <label
                        htmlFor='category'
                        className='text-xs uppercase font-semibold text-gray-500 w-fit'
                    >
                        Category
                    </label>
                    <InputGroup
                        type='select'
                        name='category'
                        optionLists={[
                            { key: 'Select Category', value: '' },
                            ...mainCategories.map((cat) => ({ key: cat.name, value: cat.id })),
                        ]}
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        errorMsg={formik.errors.category}
                        className='!w-full bg-gray-50 border rounded-xl border-gray-100 focus:border-primary'
                    />
                </div>

                <div className='flex flex-col gap-0 items-start w-full'>
                    <div className='flex items-center justify-between w-full pb-1'>
                        <label
                            htmlFor='description'
                            className='text-xs uppercase font-semibold text-gray-500 w-fit'
                        >
                            Full Description
                        </label>
                        <span
                            className={`text-[10px] font-semibold ${wordCount > 50 ? 'text-red-500' : 'text-gray-500'}`}
                        >
                            {wordCount}/50 words
                        </span>
                    </div>
                    <InputGroup
                        type='textarea'
                        name='description'
                        placeholder={'Provide details about the item...'}
                        rows={5}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        errorMsg={formik.errors.description}
                        className='!w-full bg-gray-50 border rounded-xl border-gray-100 focus:border-primary'
                    />
                </div>

                <div className='flex flex-col gap-0 items-start w-full'>
                    <label htmlFor='image' className='space-y-2 w-full'>
                        <span className='text-xs uppercase font-semibold text-gray-500 w-fit'>
                            Upload Image (Optional)
                        </span>

                        {previewContent ? (
                            <div className='!w-full h-52 relative rounded-xl border-2 border-primary overflow-hidden cursor-pointer group'>
                                <img
                                    src={previewContent}
                                    alt='Preview'
                                    className='w-full h-full object-contain'
                                />
                                <div className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                                    <span className='text-white font-semibold flex items-center gap-2'>
                                        <BiUpload size={20} /> Change Image
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className='!w-full h-52 flex flex-col items-center justify-center gap-2 bg-gray-50 rounded-xl border border-gray-100 hover:border-2 hover:border-primary hover:border-dashed cursor-pointer'>
                                <span className='bg-secondary/10 p-2 rounded-full w-fit mx-auto'>
                                    <BiUpload size={25} className='text-secondary ' />
                                </span>
                                <h6 className='font-bold text-sm text-center'>
                                    Click to upload image
                                </h6>
                                <span className='uppercase font-semibold text-xs text-gray-500 text-center'>
                                    max size: 10mb
                                </span>
                            </div>
                        )}
                    </label>
                    <InputGroup
                        type='file'
                        name='image'
                        onChange={(event) => {
                            formik.setFieldValue('image', event.currentTarget.files[0]);
                        }}
                        onBlur={formik.handleBlur}
                        errorMsg={formik.errors.image}
                        accept='image/*'
                    />
                </div>

                <Button
                    type='submit'
                    variant={'primary'}
                    className='w-full rounded-2xl'
                    disabled={isLoading || formik.isSubmitting}
                >
                    {isLoading || formik.isSubmitting ? 'Updating...' : 'Update Request'}
                </Button>
            </form>
        </Modal>
    );
};

export default EditRequest;
