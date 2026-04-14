import { IoMdClose } from "react-icons/io"
import { Button, InputGroup, Modal } from "../../../ui"
import { useFormik } from "formik";
import * as  Yup from 'yup'
import { BiUpload } from "react-icons/bi";


const PostRequest = ({ isOpen, setIsOpen }) => {
    const initialValues = {
        item_name: '',
        description: '',
        category: '',
        image: ''
    };

    const validationSchema = Yup.object({
        item_name: Yup.string()
            .required('Required'),
        description: Yup.string().required('Required'),
        category: Yup.string().required('Required'),
        image: Yup.mixed(),
    });


    const handleSubmit = (values, { resetForm }) => {

        console.log(values)

        // mutate(formData, {
        //     onSuccess: (data) => {
        //         notify(data?.message, 'success');
        //         queryClient.invalidateQueries('get-schedule');
        //         queryClient.invalidateQueries(['get-ads-schedule', { ad_id }]);
        //         resetForm();
        //     },
        //     onError: (error) => {
        //         notify(error?.response.data.message, 'error');
        //     },
        // });
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
        enableReinitialize: true,
    });

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} padding={false} modalHeader={false} className={'!py-0 !w-[450px]'} >
            <header className='flex items-center justify-between px-4 pb-4 border-b border-b-gray-200'>
                <h3 className='font-bold'>Place a Request</h3>

                <button type='button' onClick={() => setIsOpen(false)}>
                    <IoMdClose size={25} className='text-gray-500' />
                </button>
            </header>

            <form onSubmit={formik.handleSubmit} className="p-4 w-full space-y-4">
                <div className='flex flex-col gap-0 items-start w-full'>
                    <label htmlFor="item_name" className='text-xs uppercase font-semibold text-gray-500 w-fit'>Item name</label>
                    <InputGroup
                        type='text'
                        name='item_name'
                        placeholder={'What are you looking for?'}
                        value={formik.values.item_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.item_name}
                        className='!w-full bg-gray-50 border rounded-xl border-gray-100 focus:border-primary'
                    />
                </div>

                <div className='flex flex-col gap-0 items-start w-full'>
                    <label htmlFor="category" className='text-xs uppercase font-semibold text-gray-500 w-fit'>
                        Category
                    </label>
                    <InputGroup
                        type='select'
                        name='category'
                        optionLists={['1', '2']}
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.category}
                        className='!w-full bg-gray-50 border rounded-xl border-gray-100 focus:border-primary'
                    />
                </div>

                <div className='flex flex-col gap-0 items-start w-full'>
                    <label htmlFor="description" className='text-xs uppercase font-semibold text-gray-500 w-fit'>
                        Full Description
                    </label>
                    <InputGroup
                        type='textarea'
                        name='description'
                        placeholder={'Provide details about the item...'}
                        rows={5}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.description}
                        className='!w-full bg-gray-50 border rounded-xl border-gray-100 focus:border-primary'
                    />
                </div>

                <div className='flex flex-col gap-0 items-start w-full'>
                    <label htmlFor="image" className='space-y-2 w-full'>
                        <span className='text-xs uppercase font-semibold text-gray-500 w-fit'>Upload Image (Optional)</span>

                        <div className='!w-full h-52 flex flex-col items-enter justify-center  gap-2 bg-gray-50 rounded-xl border border-gray-100 hover:border-2 hover:border-primary hover:border-dashed cursor-pointer'>
                            <span className='bg-secondary/10 p-2 rounded-full w-fit mx-auto'>
                                <BiUpload size={25} className='text-secondary ' />
                            </span>
                            <h6 className='font-bold text-sm text-center'>Click to upload image</h6>
                            <span className="uppercase font-semibold text-xs text-gray-500 text-center">max size: 500kb</span>
                        </div>
                    </label>
                    <InputGroup
                        type='file'
                        name='image'
                        value={formik.values.image}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.image}

                    />
                </div>

                <Button type='submit' variant={'primary'} className='w-full rounded-2xl'>Post Request</Button>

            </form>
        </Modal>
    )
}

export default PostRequest