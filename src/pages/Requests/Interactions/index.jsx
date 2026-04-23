import { Modal } from '../../../ui';
import { MdChatBubbleOutline } from 'react-icons/md';
import InteractionWindow from './InteractionWindow';
import InteractionList from './InteractionList';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useGetInteraction, useGetInteractions, useGetRequest } from '../../../hooks';
import SpinnerSkeleton from '../../../components/SpinnersUi';

const RequestInteractions = ({ isOpen, setIsOpen, requestId }) => {
    const [chatWindow, setChatWindow] = useState(false);
    const [activeSelectionId, setActiveSelectionId] = useState(null);

    useEffect(() => {
        if (isOpen && requestId) {
            setActiveSelectionId(requestId);
        }
    }, [isOpen, requestId]);

    const { data: requestRes, isLoading: requestLoading } = useGetRequest(requestId, {
        enabled: !!requestId && isOpen,
    });

    const { data: interactionLists, isLoading: interactionLoading } = useGetInteractions({
        enabled: isOpen,
    });

    const initialRequestData = requestRes?.request;

    const mergedList = useMemo(() => {
        const list = Array.isArray(interactionLists?.interactions)
            ? [...interactionLists.interactions]
            : [];

        if (initialRequestData && requestId) {
            const alreadyInList = list.some(
                (item) =>
                    item.item_name === initialRequestData.item_name &&
                    item.image === initialRequestData.image
            );
            if (!alreadyInList) {
                list.unshift({
                    ...initialRequestData,
                    request_id: initialRequestData.request_id || requestId,
                });
            }
        }
        return list.sort((a, b) => new Date(b.updated_on) - new Date(a.updated_on));
    }, [interactionLists, initialRequestData, requestId]);

    const lookForId = activeSelectionId || requestId;
    const activeItem =
        mergedList.find(
            (item) => item.interaction_id === lookForId || item.request_id === lookForId
        ) || mergedList[0];

    const isNewRequest = !!activeItem?.request_id && !activeItem?.interaction_id;
    const activeRequestId = isNewRequest ? activeItem.request_id : null;

    const { data: interactionData } = useGetInteraction(activeRequestId, {
        enabled: !!activeRequestId && isOpen,
    });

    const actualInteractionId =
        activeItem?.interaction_id ||
        interactionData?.interactionId ||
        interactionData?.interaction_id;

    const handleSelectInteraction = useCallback((item) => {
        setActiveSelectionId(item.interaction_id || item.request_id);
        setChatWindow(true);
    }, []);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        setChatWindow(false);
        setActiveSelectionId(null);
    }, [setIsOpen]);

    const isItemActive = (item) => {
        if (!activeItem) return false;
        if (item.interaction_id && activeItem.interaction_id)
            return item.interaction_id === activeItem.interaction_id;
        if (item.request_id && activeItem.request_id)
            return item.request_id === activeItem.request_id;
        return false;
    };

    return (
        <Modal
            closeOnOutsideClick={false}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            padding={false}
            modalHeader={false}
            className={
                '!py-0 max-sm:max-h-[100%] max-sm:h-[100%] max-sm:!rounded-none !w-full sm:!w-[90%] !overflow-hidden'
            }
        >
            {/* Desktop layout */}
            <div className='w-full h-full overflow-y-hidden flex max-md:hidden'>
                <aside className='flex flex-col items-start gap-2 w-[35%] border-r border-gray-200  bg-white overflow-y-auto h-[calc(100vh-8rem)]  scrollbar-thin scrollbar-track-gray-100'>
                    <div className='w-full flex items-center gap-2 text-black font-bold text-xl pt-2 px-4 pb-4 border-b border-gray-200'>
                        <span className='p-[6px] bg-primary/10 rounded-full'>
                            <MdChatBubbleOutline size={25} className='text-primary' />
                        </span>
                        <h3 className='text-lg font-bold'>Messages</h3>
                    </div>

                    <div className='w-full p-4 flex flex-col gap-4 '>
                        {interactionLoading || requestLoading ? (
                            <div className='flex flex-col items-center justify-center py-12 text-gray-400'>
                                <SpinnerSkeleton
                                    type={'spin'}
                                    height={50}
                                    className='mb-2 opacity-40'
                                />
                            </div>
                        ) : mergedList.length > 0 ? (
                            mergedList.map((item) => (
                                <InteractionList
                                    key={item.interaction_id || item.request_id}
                                    data={item}
                                    isActive={isItemActive(item)}
                                    handleSelectInteraction={handleSelectInteraction}
                                />
                            ))
                        ) : (
                            <div className='flex flex-col items-center justify-center py-12 text-gray-400'>
                                <MdChatBubbleOutline size={40} className='mb-2 opacity-40' />
                                <p className='text-sm font-semibold'>No conversations yet</p>
                            </div>
                        )}
                    </div>
                </aside>

                <section className='w-[65%] h-[calc(100vh-8rem)]'>
                    <InteractionWindow
                        interactionId={actualInteractionId}
                        request={activeItem || initialRequestData}
                        requestId={activeRequestId || initialRequestData?.request_id}
                        setIsOpen={handleClose}
                        setChatWindow={setChatWindow}
                    />
                </section>
            </div>

            {/* Mobile layout */}
            <div className='md:hidden w-full'>
                {!chatWindow ? (
                    <aside className='flex flex-col items-start gap-2 w-full h-[calc(100dvh-2rem)] overflow-hidden bg-white'>
                        <div className='px-4 pb-4 border-b border-gray-200 flex items-center justify-between w-full'>
                            <div className='w-full flex items-center gap-2 text-black font-bold text-xl pt-2 '>
                                <span className='p-[6px] bg-primary/10 rounded-full'>
                                    <MdChatBubbleOutline size={25} className='text-primary' />
                                </span>
                                <h3 className='text-lg font-bold'>Messages</h3>
                            </div>

                            <button
                                className='bg-white p-2 rounded-full shadow-lg'
                                onClick={handleClose}
                            >
                                <IoMdClose size={20} className='text-gray-500' />
                            </button>
                        </div>

                        <div className='w-full p-4 flex flex-col gap-4 overflow-y-auto flex-1 min-h-0 scrollbar-thin scrollbar-track-gray-100'>
                            {interactionLoading || requestLoading ? (
                                <div className='flex flex-col items-center justify-center py-12 text-gray-400'>
                                    <SpinnerSkeleton
                                        type={'spin'}
                                        height={50}
                                        className='mb-2 opacity-40'
                                    />
                                </div>
                            ) : mergedList.length > 0 ? (
                                mergedList.map((item) => (
                                    <InteractionList
                                        key={item.interaction_id || item.request_id}
                                        data={item}
                                        isActive={isItemActive(item)}
                                        handleSelectInteraction={handleSelectInteraction}
                                    />
                                ))
                            ) : (
                                <div className='flex flex-col items-center justify-center py-12 text-gray-400'>
                                    <MdChatBubbleOutline size={40} className='mb-2 opacity-40' />
                                    <p className='text-sm font-semibold'>No conversations yet</p>
                                </div>
                            )}
                        </div>
                    </aside>
                ) : (
                    <section className='w-full max-sm:h-[calc(100vh-2rem)] h-[calc(100vh-8rem)]'>
                        <InteractionWindow
                            interactionId={actualInteractionId}
                            request={activeItem || initialRequestData}
                            requestId={activeRequestId || initialRequestData?.request_id}
                            setIsOpen={handleClose}
                            setChatWindow={setChatWindow}
                        />
                    </section>
                )}
            </div>
        </Modal>
    );
};

export default RequestInteractions;
