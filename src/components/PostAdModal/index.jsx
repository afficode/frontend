import { Link } from 'react-router-dom';
import { Modal } from '../../ui';
import { Approutes } from '../../constants';

const PostAdModal = ({ modalOpen, setModalOpen, filteredCategories }) => {
    return (
        <Modal
            isOpen={modalOpen}
            setIsOpen={setModalOpen}
            padding={false}
            className={'px-4 !py-2'}
            modalHeader={false}
        >
            <div className='flex flex-col gap-4 items-center'>
                <h3 className='text-xl font-semibold'>Post Ad in</h3>
                <ul className='flex flex-col gap-1 w-full'>
                    {filteredCategories?.allCat?.slice(0, 14)?.map((category) => (
                        <Link
                            to={`${Approutes.postAd}/${category.id}`}
                            key={category.id}
                            onClick={() => setModalOpen(false)}
                        >
                            <li className='capitalize text-base hover:text-secondary active:text-secondary '>
                                {category.name}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </Modal>
    );
};

export default PostAdModal;
