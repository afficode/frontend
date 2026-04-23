import { useDeleteRequest, useNotify } from '../../../hooks';
import { Button, Modal } from '../../../ui';
import { FaRegTrashAlt } from 'react-icons/fa';

const DeleteRequest = ({ isOpen, setIsOpen, data }) => {
    const { mutate: deleteReq, isLoading: isDeleting } = useDeleteRequest(data?.request_id);
    const notify = useNotify();

    const handleDelete = () => {
        deleteReq(data?.request_id, {
            onSuccess: (res) => {
                notify(res?.message || 'Request deleted successfully', 'success');
                setIsOpen(false);
            },
            onError: (err) => {
                notify(err?.response?.data?.message || 'Failed to delete request', 'error');
            },
        });
    };

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} className={'sm:!w-[400px]'}>
            <div className='flex flex-col gap-4 text-center items-center p-4'>
                <div className='p-4 bg-red-100 rounded-full'>
                    <FaRegTrashAlt size={40} className='text-red-500' />
                </div>
                <h3 className='text-xl font-bold mt-2'>Delete Request?</h3>
                <p className='text-gray-500 text-sm'>
                    Are you sure you want to delete this request? This action cannot be undone.
                </p>
                <div className='flex w-full gap-4 mt-6'>
                    <Button
                        variant='primary'
                        className='w-full !rounded-xl'
                        onClick={() => setIsOpen(false)}
                        disabled={isDeleting}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='primary'
                        className='w-full !rounded-xl !bg-red-500 !text-white hover:!bg-red-600 border border-transparent'
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteRequest;
