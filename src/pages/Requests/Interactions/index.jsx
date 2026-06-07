import { MdChatBubbleOutline } from 'react-icons/md';
import InteractionWindow from './InteractionWindow';
import InteractionList from './InteractionList';
import { useCallback, useMemo, useState } from 'react';
import { useGetInteractions } from '../../../hooks';
import SpinnerSkeleton from '../../../components/SpinnersUi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Approutes, queryStrings } from '../../../constants';
import { FiArrowLeft } from 'react-icons/fi';

const TABS = {
    interactions: 'interactions',
    published: 'published',
};

const PARAM_TO_TAB = {
    1: TABS.interactions,
    2: TABS.published,
};
const TAB_TO_PARAM = {
    [TABS.interactions]: '1',
    [TABS.published]: '2',
};

const RequestInteractions = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const interactionId = searchParams.get(queryStrings.discussion);
    const activeTab = PARAM_TO_TAB[searchParams.get('tab')] || TABS.interactions;

    const setActiveTab = useCallback(
        (tab) => {
            setSearchParams(
                (prev) => {
                    const next = new URLSearchParams(prev);
                    next.set('tab', TAB_TO_PARAM[tab]);
                    return next;
                },
                { replace: true }
            );
        },
        [setSearchParams]
    );

    const { data: interactionLists, isLoading: interactionLoading } = useGetInteractions({});
    const [chatWindow, setChatWindow] = useState(false);

    const filteredList = useMemo(() => {
        if (activeTab === TABS.interactions) {
            return interactionLists?.interactions.filter((item) => item.user_definition === 'interactor')
        }

        if (activeTab === TABS.published) {
            return interactionLists?.interactions.filter((item) => item.user_definition === 'publisher')
        }
    }, [interactionLists, activeTab]);

    const handleSelectInteraction = useCallback((item) => {
        setSearchParams(
            (prev) => {
                const next = new URLSearchParams(prev);
                next.set(queryStrings.discussion, item.interaction_id);
                return next;
            },
            { replace: true }
        );
        setChatWindow(true);
    }, [setSearchParams]);

    const renderTabs = () => (
        <div className='w-full px-4 pt-3'>
            <div className='flex items-center justify-center bg-gray-100 rounded-full w-full'>
                <button
                    onClick={() => setActiveTab(TABS.interactions)}
                    className={`${activeTab === TABS.interactions ? 'bg-primary text-white' : ''} flex-1 px-3 py-2 rounded-full bg-gray-100 text-primary text-xs font-bold`}
                >
                    As Interactor
                </button>
                <button
                    onClick={() => setActiveTab(TABS.published)}
                    className={`${activeTab === TABS.published ? 'bg-primary text-white' : ''} flex-1 px-3 py-2 rounded-full bg-gray-100 text-primary text-xs font-bold`}
                >
                    As Publisher
                </button>
            </div>
        </div>
    );

    const renderList = () =>
        interactionLoading ? (
            <div className='flex flex-col items-center justify-center py-12 text-gray-400'>
                <SpinnerSkeleton type={'spin'} height={50} className='mb-2 opacity-40' />
            </div>
        ) : filteredList.length > 0 ? (
            filteredList.map((item) => (
                <InteractionList
                    key={item.interaction_id}
                    data={item}
                    isActive={interactionId === item.interaction_id}
                    handleSelectInteraction={handleSelectInteraction}
                />
            ))
        ) : (
            <div className='flex flex-col items-center justify-center py-12 text-gray-400'>
                <MdChatBubbleOutline size={40} className='mb-2 opacity-40' />
                <p className='text-sm font-semibold'>
                    {activeTab === TABS.published
                        ? 'No interactions on your requests yet'
                        : 'No conversations yet'}
                </p>
            </div>
        );

    return (
        <section className='p-2'>
            <div className='w-full overflow-hidden max-w-[1200px] mx-auto border rounded-lg'>
                {/* Desktop layout */}
                <div className='w-full overflow-y-hidden flex max-md:hidden'>
                    <aside className='flex flex-col items-start gap-2 w-[35%] border-r border-gray-200 bg-white overflow-y-auto h-[calc(100vh-8rem)] scrollbar-thin scrollbar-track-gray-100'>
                        <div className='w-full flex items-center gap-2 text-black font-bold text-xl pt-2 px-4 pb-4 border-b border-gray-200'>
                            <span className='p-[6px] bg-primary/10 rounded-full'>
                                <MdChatBubbleOutline size={25} className='text-primary' />
                            </span>
                            <h3 className='text-lg font-bold'>Interactions</h3>
                        </div>

                        {renderTabs()}

                        <div className='w-full p-4 flex flex-col gap-4'>{renderList()}</div>
                    </aside>

                    <section className='w-[65%] h-[calc(100vh-8rem)]'>
                        <InteractionWindow
                            interactionId={interactionId}
                            setChatWindow={setChatWindow}
                        />
                    </section>
                </div>

                {/* Mobile layout */}
                <div className='md:hidden w-full'>
                    {!chatWindow ? (
                        <aside className='flex flex-col items-start gap-2 w-full h-[calc(100dvh-8rem)] overflow-hidden bg-white'>
                            <div className='px-4 pb-4 border-b border-gray-200 flex items-center justify-between w-full'>
                                <div className='w-full flex items-center gap-2 text-black font-bold text-xl pt-2'>
                                    <span className='p-[6px] bg-primary/10 rounded-full'>
                                        <MdChatBubbleOutline size={25} className='text-primary' />
                                    </span>
                                    <h3 className='text-lg font-bold'>Interactions</h3>
                                </div>

                                <button
                                    className='bg-white p-2 rounded-full shadow-lg'
                                    onClick={() => navigate(Approutes.requests)}
                                >
                                    <FiArrowLeft />   Back
                                </button>
                            </div>

                            {renderTabs()}

                            <div className='w-full p-4 flex flex-col gap-4 overflow-y-auto flex-1 min-h-0 scrollbar-thin scrollbar-track-gray-100'>
                                {renderList()}
                            </div>
                        </aside>
                    ) : (
                        <section className='w-full h-[calc(100vh-8rem)]'>
                            <InteractionWindow
                                interactionId={interactionId}
                                setChatWindow={setChatWindow}
                            />
                        </section>
                    )}
                </div>
            </div>
        </section>
    );
};

export default RequestInteractions;
