import { useParams, useNavigate } from 'react-router-dom';
import { PiSquaresFour } from 'react-icons/pi';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { FiArrowLeft } from 'react-icons/fi';
import { Approutes, frontendBaseUrl, interactorResponse } from '../../../constants';
import { useCreateInteraction, useGetRequest, useNotify } from '../../../hooks';
import useAuth from '../../../context/UserContext';
import {
    formatTimeAgo,
    slugGeneratorForAdIdWithName,
    ScrollToTop,
    extractAdIdFromSlug,
    toMoney,
} from '../../../utils';
import { AdListingStatus, Button } from '../../../ui';
import { SEO } from '../../../components';
import SpinnerSkeleton from '../../../components/SpinnersUi';
import { useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb';
import { categoryData } from '../../../constants/Category';
import { Interactors } from '../../../assets/images';

const RequestDetails = () => {
    const { id } = useParams();
    const requestId = extractAdIdFromSlug(id);
    const navigate = useNavigate();
    const { isLogin, user } = useAuth();
    const [items, setItems] = useState()

    const { data: requestRes, isLoading } = useGetRequest(requestId, {
        enabled: !!requestId,
        isLogin,
    });

    useEffect(() => {
        if (requestRes?.request) {
            setItems(() => [
                { name: 'Home', link: Approutes.home },
                { name: 'Requests', link: Approutes.requests.initial },
                { name: requestRes?.request?.item_name },
            ]);
        }
    }, [isLoading]);

    const request = requestRes?.request;
    const isOwner = user?.id === request?.publisher;

    const handleInteract = () => {
        const next = `${Approutes.requests.interactions}?d=${request?.interaction_id}`;
        if (!isLogin) {
            navigate(`${Approutes.auth.initial}?next=${encodeURIComponent(next)}`);
            return;
        }
        navigate(next);
    };

    const handleClose = () => navigate(-1);

    const { mutate: createInteraction, isLoading: isCreating } = useCreateInteraction(request?.request_id);

    const notify = useNotify();

    const handleOptionClick = async (option, event = null) => {
        let payload = { user_option: option.value };
        const formData = new FormData();
        formData.append('user_option', option.value);
        payload = formData;

        const onSuccess = (data) => {
            if (event?.target) event.target.value = null;
            notify(data?.message, 'success');
            navigate(`${Approutes.requests.interactions}?d=${data?.interactionId}`);
        };

        const onError = (err) => {
            notify(err?.response?.data?.message || 'Failed to send message', 'error');
        };

        createInteraction(payload, { onSuccess, onError });
    };

    if (isLoading) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[60vh] text-gray-400'>
                <SpinnerSkeleton type={'spin'} height={50} className='mb-2 opacity-40' />
                <ScrollToTop />
            </div>
        );
    }

    if (!request) {
        return (
            <div className='flex flex-col items-center justify-center gap-4 min-h-[60vh]'>
                <p className='text-gray-500 font-semibold'>Request not found</p>
                <Button
                    variant={'primary'}
                    size={'small'}
                    className={'rounded-md'}
                    onClick={() => navigate(Approutes.requests)}
                >
                    Back to Requests
                </Button>

                <ScrollToTop />
            </div>
        );
    }

    return (
        <section className='w-full p-2 lg:p-4'>
            <header className='w-full'>
                <Breadcrumb items={items} className={'text-md breadcrumbs text-primary'} />
            </header>

            <section className='flex flex-col h-full w-full gap-2 md:flex-row md:items-stretch md:gap-8'>
                {/* request image */}
                <main className='w-full h-full md:w-[60%] xl:w-[70%] flex flex-col gap-2 lg:py-4 border-2 border-transparent'>
                    <div className='space-y-2'>
                        <div className="flex items-center">
                            <h2 className='font-bold'>{request?.item_name}</h2>
                        </div>
                        <div className="flex items-center justify-between">
                            <AdListingStatus createdAt={request?.created_on} />

                            {request?.status === 'approved' ? (
                                <span className={'px-3 uppercase text-sm rounded-xl text-white bg-green-700  '}>
                                    Active
                                </span>
                            ) : request?.status === 'closed' ? (
                                <span className={'px-3 uppercase text-sm rounded-xl text-white bg-gray-700  '}>
                                    Closed
                                </span>
                            ) : null}
                            {request?.status === 'rejected' ? (
                                <span className={'px-3 uppercase text-sm rounded-xl text-white bg-red-700  '}>
                                    Rejected
                                </span>
                            ) : null}
                        </div>
                    </div>

                    {!isOwner && request.incentive && <div className='bg-red-500 text-white text-center w-full p-2 font-bold'>
                        Incentive: ₦{toMoney(request.incentive)}
                    </div>}
                    <div className='relative w-full min-h-[300px] md:h-[500px]  mx-auto mt-1 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden'>
                        {request?.image ? (
                            <img
                                src={request?.image}
                                alt={request?.item_name}
                                className='w-full h-full object-contain'
                            />
                        ) : (
                            <span className='p-6 bg-primary/10 rounded-full'>
                                <PiSquaresFour size={80} className='text-primary' />
                            </span>
                        )}
                    </div>
                </main>

                {/* request details */}
                <aside className='w-full h-full md:w-[40%] xl:w-[30%] border-2 border-gray-400 max-lg:p-4 px-4 py-6 flex flex-col'>
                    <h4 className='w-full text-center text-lg font-bold md:text-xl capitalize text-primary'>
                        {categoryData.find((cat) => cat.id === request?.category)?.name}
                    </h4>

                    <div className='flex items-start justify-between mt-2 mb-4'>
                        <div className='flex flex-col'>
                            <span >Published by:</span>
                            <span className='font-bold'>{request?.publisher_name}</span>
                        </div>
                        <span className='text-sm'>{formatTimeAgo(request?.created_on)}</span>
                    </div>

                    {/* number of interactions */}
                    <div className='flex items-center gap-2 text-sm '>
                        <img src={Interactors} alt="amount of interactors" className='w-6' />
                        Interactions: <span className='text-primary'>({request?.interaction_count ?? 0})</span>

                        {
                            isOwner && <>
                                Views: <span className='text-primary'>({request?.views ?? 0})</span>
                            </>
                        }
                    </div>

                    <hr className='h-px my-3 bg-gray-700 border-black border-1' />

                    {/* request description */}
                    <div className='flex flex-col gap-1 mb-4'>
                        <h4 className='capitalize text-lg text-center'>
                            Request's  Description
                        </h4>
                        <p className='text-justify text-base whitespace-pre-line text-gray-700'>
                            {request?.description}
                        </p>
                    </div>

                    {/* action buttons */}
                    <div className='flex flex-col gap-3 mt-auto'>


                        {
                            isOwner ?
                                <Button
                                    variant={'primary'}
                                    onClick={() => navigate(`${Approutes.requests.interactions}?tab=2`)}
                                    className={
                                        'w-full rounded-xl flex items-center justify-center gap-2 font-semibold'
                                    }
                                >
                                    <IoChatbubbleOutline size={20} />
                                    View My Interactions
                                </Button>
                                : !isOwner && request?.interaction_id ? (
                                    <Button
                                        variant={'primary'}
                                        onClick={handleInteract}
                                        className={
                                            'w-full rounded-xl flex items-center justify-center gap-2 font-semibold'
                                        }
                                    >
                                        <IoChatbubbleOutline size={20} />
                                        View interaction
                                    </Button>
                                ) :
                                    (
                                        <div className='dropdown dropdown-top dropdown-center w-full '>
                                            <Button
                                                variant={'primary'}
                                                className={
                                                    'w-full rounded-xl flex items-center justify-center gap-2 font-semibold'
                                                }
                                            >
                                                Start a conversation
                                            </Button>

                                            <div
                                                tabIndex={0}
                                                className={`dropdown-content   z-[10] menu bg-white shadow-2xl max-sm:p-3 p-4 flex items-start gap-2 flex-wrap ${isCreating ? 'opacity-50 pointer-events-none' : ''}`}>

                                                {
                                                    interactorResponse.slice(0, 3).map((option) => (
                                                        <button
                                                            disabled={isCreating}
                                                            onClick={() => handleOptionClick(option)}
                                                            key={option.label}
                                                            className={` px-4 py-1 text-black font-bold text-xs uppercase text-start transition-colors ${isCreating ? 'opacity-50 cursor-not-allowed' : 'hover:text-black hover:bg-secondary'}`}
                                                        >
                                                            {option.label}
                                                        </button>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )

                        }

                        <Button
                            variant={'grey'}
                            onClick={handleClose}
                            className={
                                'w-full rounded-xl flex items-center justify-center gap-2 font-semibold !bg-gray-500 !text-white'
                            }
                        >
                            <FiArrowLeft size={20} />
                            Close
                        </Button>
                    </div>
                </aside>
            </section>

            <ScrollToTop />
            <SEO
                title={request?.item_name}
                description={request?.description}
                url={`${frontendBaseUrl}${Approutes.requests.view.replace(
                    ':id',
                    slugGeneratorForAdIdWithName(request?.item_name, request?.request_id)
                )}`}
                keywords={[request?.item_name, request?.category_name]}
                image={request?.image}
            />
        </section>
    );
};

export default RequestDetails;
