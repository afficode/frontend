import { useFormik } from 'formik';
import { Button, Modal } from '../../../../ui';
import { useInspectionUpdate, useNotify } from '../../../../hooks';
import { useQueryClient } from 'react-query';

const InspectionUpdate = ({
    adId,
    inspectionModal,
    setInspectionModal,
    hasRequestedPayment,
    location,
}) => {
    const initialValues = {
        grabber_text: '',
        sold_by_me: false,
    };

    const { mutate, isLoading } = useInspectionUpdate();
    const notify = useNotify();
    const queryClient = useQueryClient();

    const handleSubmit = () => {
        const data = {
            ad_id: adId,
            grabber_text: formik.values.grabber_text,
        };

        mutate(data, {
            onSuccess: (data) => {
                notify(data?.message, 'success');
                setInspectionModal(false);
                queryClient.invalidateQueries({ queryKey: ['fetch-product', adId] });
            },
            onError: (error) => {
                notify(error?.response?.data?.message || 'Something went wrong', 'error');
            },
        });
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit,
        enableReinitialize: true,
    });

    return (
        <Modal
            isOpen={inspectionModal}
            setIsOpen={setInspectionModal}
            padding={false}
            className={'max-w-[600px] px-4'}
            headerText={'Inspection Update'}
            headerStyle={'!text-center !capitalize !text-lg'}
        >
            <div className='px-4'>
                <div className='flex flex-col gap-4 border-b border-black pb-1'>
                    <div className='flex items-start justify-between '>
                        <div className='text-sm text-primary'>
                            <p>Inspection Update</p>
                            <p>{location}</p>
                        </div>

                        <span className='text-xs'>{new Date().toLocaleDateString()}</span>
                    </div>

                    {/* <p className="text-sm text-primary">ref: 19028766476736</p> */}
                </div>

                {hasRequestedPayment === 1 && (
                    <p className='text-base text-secondary text-center mt-2'>
                        You have requested payment for this item
                    </p>
                )}

                <form onSubmit={formik.handleSubmit} className='space-y-2 pt-4'>
                    <div className='flex-col items-start '>
                        <label htmlFor='grabber_text' className='text-sm'>
                            Note
                        </label>
                        <textarea
                            name='grabber_text'
                            id='grabber_text'
                            cols='10'
                            rows='5'
                            placeholder='Provide boonfu with the inspection update of the above vehicle.'
                            className='w-full text-sm border p-2 disabled:bg-[#D9D9D9] disabled:border-none'
                            disabled={hasRequestedPayment}
                            value={formik.values.grabber_text}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        ></textarea>
                    </div>

                    <div className='flex items-center gap-2'>
                        <input
                            type='checkbox'
                            name='sold_by_me'
                            id='sold_by_me'
                            disabled={hasRequestedPayment}
                            value={formik.values.sold_by_me}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor='sold_by_me'>I can confirm this item is sold, by me</label>
                    </div>

                    <div className='pt-2'>
                        <Button
                            type='submit'
                            variant='primary'
                            size='small'
                            className='rounded-md'
                            disabled={
                                formik.values.grabber_text === '' ||
                                !formik.values.sold_by_me ||
                                hasRequestedPayment === 1 ||
                                isLoading
                            }
                            loading={isLoading}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default InspectionUpdate;
