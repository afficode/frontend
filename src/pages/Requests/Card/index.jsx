import { PiSquaresFour } from 'react-icons/pi';
import { Button } from '../../../ui';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';
import { FaRegTrashAlt } from 'react-icons/fa';
import useAuth from '../../../context/UserContext';
import { useState } from 'react';
import EditRequest from '../Edit';
import DeleteRequest from '../Delete';
import { formatTimeAgo } from '../../../utils';
import { Approutes } from '../../../constants';
import { useNavigate } from 'react-router-dom';

const RequestCard = ({ data, setModalOpen, setRequestId, mainCategories, notify }) => {
    const { user, isLogin } = useAuth();
    const isOwner = user?.id === data?.publisher;
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        if (!isLogin) {
            navigate(`${Approutes.auth.initial}?next=${Approutes.requests}`);
            return;
        }
        setModalOpen(true);
        setRequestId(data?.request_id);
    };

    return (
        <>
            <div
                role='button'
                onClick={handleClick}
                className='bg-white w-full h-full flex flex-col justify-between rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-103 group relative'
            >
                {notify && (
                    <span
                        title='You have new message'
                        className='absolute top-4 right-4 w-3 h-3 bg-secondary rounded-full animate-ping z-20'
                    ></span>
                )}
                {data?.image && (
                    <div className='w-full h-full  max-h-[260px] relative '>
                        <div className={`${BADGE_STYLE} absolute top-4 left-4`}>
                            {data?.category_name}
                        </div>
                        <img
                            src={data?.image}
                            alt={data?.item_name}
                            className='w-full h-full object-cover rounded-t-2xl'
                        />
                    </div>
                )}

                <div className={`p-4 sm:p-6 flex flex-col gap-3 justify-between h-full`}>
                    {!data?.image && (
                        <div className={`${BADGE_STYLE} text-center max-w-fit mx-auto`}>
                            {data?.category_name}
                        </div>
                    )}

                    <div
                        className={`flex items-center justify-between ${!data?.image ? 'flex-col gap-4' : ''}`}
                    >
                        <div
                            className={`flex items-center gap-2 ${!data?.image ? 'flex-col gap-2' : ''}`}
                        >
                            {data?.image ? (
                                <img
                                    src={data?.image}
                                    alt={data?.item_name}
                                    className='w-10 h-10 rounded-full object-cover'
                                />
                            ) : (
                                <span className='p-[6px] bg-primary/10 rounded-full'>
                                    <PiSquaresFour size={30} className='text-primary' />
                                </span>
                            )}
                            <div
                                className={`flex flex-col items-start ${!data?.image ? 'items-center' : ''}`}
                            >
                                <span className='text-[10px] uppercase font-bold text-gray-500'>
                                    Published by
                                </span>
                                <h6 className='text-xs font-bold'>{data?.publisher_name}</h6>
                                <span className='text-[10px] uppercase font-bold text-gray-500'>
                                    {formatTimeAgo(data?.created_on)}
                                </span>
                            </div>
                        </div>

                        {isOwner && (
                            <div className='flex items-center gap-2'>
                                <button
                                    title='Edit'
                                    className='p-2 bg-blue-50 rounded-full text-blue-500 hover:bg-blue-100 transition-colors'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditOpen(true);
                                    }}
                                >
                                    <FiEdit size={15} />
                                </button>
                                <button
                                    title='Delete'
                                    className='p-2 bg-red-50 rounded-full text-red-500 hover:bg-red-100 transition-colors'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDeleteOpen(true);
                                    }}
                                >
                                    <FaRegTrashAlt size={15} />
                                </button>
                            </div>
                        )}
                    </div>

                    <div
                        className={`flex flex-col gap-1 items-start ${!data?.image ? 'items-center justify-center text-center' : 'text-justify'}`}
                    >
                        <h3 className='font-bold text-lg sm:text-xl line-clamp-2'>
                            {data?.item_name}
                        </h3>
                        <p className='!text-xs text-gray-700 '>{data?.description}</p>
                    </div>

                    <Button
                        variant={'primary'}
                        className={`${isOwner ? '!bg-primary' : '!bg-black'} w-full rounded-xl flex items-center justify-center gap-2 font-semibold hover:!bg-primary group/btn`}
                    >
                        <IoChatbubbleOutline size={20} className='group-hover/btn:animate-bounce' />{' '}
                        {isOwner ? 'Respond' : 'Interact'}
                    </Button>
                </div>
            </div>

            <EditRequest
                isOpen={editOpen}
                setIsOpen={setEditOpen}
                requestData={data}
                mainCategories={mainCategories}
            />
            <DeleteRequest isOpen={deleteOpen} setIsOpen={setDeleteOpen} data={data} />
        </>
    );
};

export default RequestCard;

const BADGE_STYLE =
    'px-2 py-1 sm:px-3  uppercase bg-blue-50 text-primary font-extrabold text-[10px] w-fit rounded-xl';
