import { useEffect, useMemo, useState } from 'react';
import { useCategories, useGetRequests, useGetUserRequests } from '../../hooks';
import RequestCard from './Card';
import { RiSparkling2Fill } from 'react-icons/ri';
import { PiSquaresFour } from 'react-icons/pi';
import PostRequest from './Post';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Approutes, queryStrings } from '../../constants';
import 'react-loading-skeleton/dist/skeleton.css';
import { CategorySkeleton, RequestCardSkeleton } from './Skeletons';
import { FaPlus } from 'react-icons/fa6';
import { Button } from '../../ui';
import useAuth from '../../context/UserContext';
import { IoMdAdd } from 'react-icons/io';
import RequestInteractions from './Interactions';

const Requests = () => {
    const { isLogin } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all');
    const [searchParams, setSearchParams] = useSearchParams();
    const PAGE = Number(searchParams.get(queryStrings.page)) || 1;

    const params = useMemo(
        () => ({
            page: PAGE,
            limit: 12,
            category: searchParams.get(queryStrings.category) || undefined,
        }),
        [PAGE, searchParams]
    );

    const { data: categories, isLoading: isCategoriesLoading } = useCategories();
    const [isOpen, setIsOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [requestId, setRequestId] = useState(null);
    const interactionId = searchParams.get('interaction');

    useEffect(() => {
        if (interactionId) {
            setIsOpen(true);
        }
    }, [interactionId]);

    const mainCategories = useMemo(() => {
        return categories?.slice(0, 14) || [];
    }, [categories]);

    const activeCatId = searchParams.get(queryStrings.category) || 'all';

    const handleCategoryChange = (catId) => {
        const params = new URLSearchParams(searchParams);
        if (catId === 'all') {
            params.delete(queryStrings.category);
        } else {
            params.set(queryStrings.category, catId);
        }
        params.set(queryStrings.page, '1');
        setSearchParams(params);
    };

    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams);
        params.set(queryStrings.page, newPage);
        setSearchParams(params);
    };

    const { data, isLoading } = useGetRequests(params);
    const { data: userRequests, isLoading: isUserRequestsLoading } = useGetUserRequests({
        enabled: activeTab === 'my-requests',
    });

    const isDataLoading = activeTab === 'all' ? isLoading : isUserRequestsLoading;
    const hasNoRequests =
        activeTab === 'all' ? data?.requests?.length === 0 : userRequests?.requests?.length === 0;

    return (
        <div className='flex flex-col gap-4 py-6 px-4 '>
            <div className='flex flex-col max-w-2xl space-y-4 mx-auto items-center my-6'>
                <span className='bg-primary/10 px-3 py-2 rounded-2xl text-primary uppercase w-fit text-xs sm:text-sm font-semibold flex items-center gap-2'>
                    <RiSparkling2Fill size={20} /> Request Anything, Find Everything
                </span>
                <h1 className=' !text-3xl sm:!text-5xl lg:!text-6xl font-[900] text-center'>
                    What are you <br />
                    <span className='text-primary'>looking for</span> today?
                </h1>
                <p className='text-gray-500 max-sm:text-sm text-center font-semibold'>
                    Join the community where requests meet results. Place a request, <br /> interact
                    via templates, and get what you need safely.
                </p>
            </div>

            <div className='space-y-4 max-w-6xl mx-auto'>
                <h2 className='!text-xl sm:!text-3xl font-bold  flex items-center justify-center gap-2'>
                    <PiSquaresFour size={30} className='text-primary' /> Browse Categories
                </h2>
                <div className='flex items-center justify-center gap-2 flex-wrap '>
                    {isCategoriesLoading ? (
                        Array.from({ length: 13 }).map((_, i) => <CategorySkeleton key={i} />)
                    ) : (
                        <>
                            <button
                                type='button'
                                onClick={() => handleCategoryChange('all')}
                                className={`${activeCatId === 'all' ? 'bg-primary text-white' : ''} p-2 border border-primary/10 hover:border-primary/100 rounded-xl text-xs sm:text-sm text-gray-500 font-semibold focus:outline-none`}
                            >
                                All Requests
                            </button>
                            {mainCategories.map((cat) => (
                                <button
                                    type='button'
                                    onClick={() => handleCategoryChange(cat.id?.toString())}
                                    key={cat.id}
                                    className={`${activeCatId === cat.id?.toString() ? 'bg-primary text-white' : ''} p-2 border border-primary/10 hover:border-primary/100 rounded-xl text-xs sm:text-sm text-gray-500 font-semibold focus:outline-none`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </>
                    )}
                </div>
            </div>

            <div className='my-4 flex items-center justify-center bg-gray-100 rounded-full w-fit mx-auto'>
                <button
                    onClick={() => setActiveTab('all')}
                    className={`${activeTab === 'all' ? 'bg-primary text-white' : ''} px-6 py-2 rounded-full bg-gray-100 text-primary text-sm font-bold`}
                >
                    All
                </button>
                <button
                    onClick={() => {
                        if (!isLogin) {
                            navigate(`${Approutes.auth.initial}?next=${Approutes.requests}`);
                            return;
                        }
                        setActiveTab('my-requests');
                    }}
                    className={`${activeTab === 'my-requests' ? 'bg-primary text-white' : ''} px-6 py-2 rounded-full bg-gray-100 text-primary text-sm font-bold`}
                >
                    My Requests
                </button>
            </div>

            <div className='flex items-center justify-between my-4'>
                <h2 className='!text-xl sm:!text-3xl font-bold  flex items-center gap-2'>
                    {activeTab === 'all' ? 'Recent' : 'My'} Requests
                </h2>
            </div>

            <div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {isDataLoading
                        ? Array.from({ length: 6 }).map((_, i) => <RequestCardSkeleton key={i} />)
                        : activeTab === 'all'
                            ? data?.requests
                                ?.sort((a, b) => new Date(b.created_on) - new Date(a.created_on))
                                .map((request) => (
                                    <RequestCard
                                        setRequestId={setRequestId}
                                        key={request.request_id}
                                        modalOpen={isOpen}
                                        data={request}
                                        setModalOpen={setIsOpen}
                                        mainCategories={mainCategories}
                                    />
                                ))
                            : userRequests?.requests
                                ?.sort((a, b) => new Date(b.created_on) - new Date(a.created_on))
                                .map((request) => (
                                    <RequestCard
                                        setRequestId={setRequestId}
                                        key={request.request_id}
                                        modalOpen={isOpen}
                                        data={request}
                                        setModalOpen={setIsOpen}
                                        mainCategories={mainCategories}
                                    />
                                ))}
                </div>

                {hasNoRequests && (
                    <div className='my-8 flex flex-col items-center justify-center gap-4 mt-8'>
                        <p className='text-gray-500 text-center font-semibold'>
                            {activeTab === 'my-requests'
                                ? "You haven't posted any requests yet"
                                : 'No requests available for selected category'}
                        </p>
                        <Button
                            variant={'primary'}
                            size={'small'}
                            type='button'
                            onClick={() => setIsAddOpen(true)}
                            className={'flex items-center rounded-md gap-2'}
                        >
                            <FaPlus size={20} />
                            Post a Request
                        </Button>
                    </div>
                )}

                {/* Pagination Controls */}
                {data?.totalPage > 1 && (
                    <div className='flex items-center justify-center gap-4 mt-24'>
                        <button
                            type='button'
                            disabled={!data?.previousPage}
                            onClick={() => handlePageChange(data?.previousPage)}
                            className='px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold'
                        >
                            Previous
                        </button>
                        <span className='text-sm font-semibold text-gray-500'>
                            Page {data?.currentPage} of {data?.totalPage}
                        </span>
                        <button
                            type='button'
                            disabled={!data?.nextPage}
                            onClick={() => handlePageChange(data?.nextPage)}
                            className='px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold'
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            <RequestInteractions requestId={requestId} isOpen={isOpen} setIsOpen={setIsOpen} />
            <PostRequest
                isOpen={isAddOpen}
                setIsOpen={setIsAddOpen}
                mainCategories={mainCategories}
            />

            <button
                type='button'
                onClick={() => setIsAddOpen(true)}
                className='max-md:bottom-[5.25rem] max-md:right-3 max-md:flex-col max-md:text-xs max-md:rounded-2xl max-md:p-2 flex  items-center py-2 px-4 rounded-full font-semibold bg-primary text-white max-md:bg-secondary max-md:text-black fixed bottom-8 right-4 shadow-xl gap-1 border border-white z-20'
            >
                <IoMdAdd size={25} className='font-bold' /> Request
            </button>
        </div>
    );
};

export default Requests;
