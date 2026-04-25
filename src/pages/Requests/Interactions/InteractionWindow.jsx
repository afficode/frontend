import { PiSquaresFour } from 'react-icons/pi';
import Discussion from './Discussion';
import { IoMdClose } from 'react-icons/io';
import DiscussionInput from './DiscussionInput';
import useAuth from '../../../context/UserContext';
import { useGetDiscussion } from '../../../hooks';
import { useEffect, useRef } from 'react';
import { format } from 'date-fns';

const InteractionWindow = ({ request, requestId, interactionId, setIsOpen, setChatWindow }) => {
    const { user } = useAuth();
    const latestMessageRef = useRef(null);

    const { data: discussions, isLoading } = useGetDiscussion(interactionId, {
        enabled: interactionId !== undefined && interactionId !== null,
    });

    useEffect(() => {
        if (latestMessageRef.current) {
            latestMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [discussions]);

    const groupedDiscussions =
        discussions?.interaction?.discussions?.reduce((acc, message) => {
            const date = format(new Date(message.created_on), 'dd MMM yyyy');
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(message);
            return acc;
        }, {}) || {};

    const sortedChatHistory = Object.entries(groupedDiscussions).sort(
        ([dateA], [dateB]) => new Date(dateA) - new Date(dateB)
    );

    const discussionsList = discussions?.interaction?.discussions || [];
    const lastMessage = discussionsList.sort(
        (a, b) => new Date(a.created_on) - new Date(b.created_on)
    )[discussionsList.length - 1];
    const isLastMessageFromMe = lastMessage?.user_id === user?.id;

    const isPublisher = (discussions?.interaction?.publisher_id || request?.publisher) === user?.id;

    const displayOtherPersonaName = isPublisher
        ? discussions?.interaction?.interactor_name || request?.name || 'User'
        : discussions?.interaction?.publisher_name ||
          request?.publisher_name ||
          request?.name ||
          'User';

    const discussionDisabled = (isPublisher && discussionsList.length === 0) || isLastMessageFromMe;

    return (
        <div className=' w-full h-full flex flex-col  '>
            {/* chat window header  */}
            <div className='flex gap-2 justify-between items-start w-full pt-1 pb-2 sm:pb-4 px-4 border-b border-gray-200 '>
                <div className='flex items-center gap-2'>
                    {discussions?.interaction?.image || request?.image ? (
                        <img
                            src={discussions?.interaction?.image || request?.image}
                            alt={request?.item_name || 'Item'}
                            className='w-10 h-10 rounded-full object-cover'
                        />
                    ) : (
                        <span className='p-[6px] bg-primary/10 rounded-full'>
                            <PiSquaresFour size={30} className='text-primary' />
                        </span>
                    )}
                    <div className='flex flex-col items-start gap-0'>
                        <div className='flex flex-wrap items-center gap-2'>
                            <h5 className='font-bold max-sm:text-sm'>{displayOtherPersonaName}</h5>
                            <span className='bg-primary/10 py-1 px-2 rounded-full text-primary font-bold uppercase text-[8px] sm:text-[10px]'>
                                {isPublisher ? 'Interactor' : 'Publisher'}
                            </span>
                            {isPublisher &&
                                discussions?.interaction?.show_contact === 1 &&
                                discussions?.interaction?.phone_number &&
                                discussions?.interaction?.phone_number !== 'N/A' && (
                                    <span className='text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-full'>
                                        <a
                                            href={`tel:${discussions.interaction.phone_number}`}
                                            className='hover:underline'
                                        >
                                            {discussions.interaction.phone_number}
                                        </a>
                                    </span>
                                )}
                        </div>
                        <span className='font-bold text-[10px] sm:text-xs text-primary uppercase'>
                            RE:{' '}
                            {discussions?.interaction?.item_name ||
                                request?.item_name ||
                                'Request Item'}
                        </span>
                    </div>
                </div>

                <button
                    className='bg-white p-2 rounded-full shadow-lg'
                    onClick={() => {
                        setIsOpen(false);
                        setChatWindow(false);
                    }}
                >
                    <IoMdClose size={20} className='text-gray-500' />
                </button>
            </div>

            {/* chat window */}
            <div className=' bg-gray-100/40 h-full px-2 sm:px-4 flex flex-col gap-4 overflow-y-auto'>
                <div className='bg-white border border-gray-100 mt-2 sm:mt-4 p-3 sm:p-4 flex flex-col items-start gap-1 rounded-3xl shadow-sm'>
                    <span className='uppercase font-extrabold text-[10px] text-gray-500'>
                        Request context
                    </span>
                    <h4 className='text-sm sm:text-base font-extrabold text-black capitalize'>
                        {discussions?.interaction?.item_name || request?.item_name}
                    </h4>
                    <span className='text-[10px] sm:text-xs text-gray-500 font-semibold'>
                        The conversation is regarding the request for "
                        {discussions?.interaction?.item_name || request?.item_name}".
                    </span>
                </div>

                <div className='mt-auto flex flex-col py-3 pr-3 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-rounded-md scrollbar-thumb-secondary scrollbar-track-rounded-md '>
                    {isLoading ? (
                        <div className='flex-1 flex flex-col items-center justify-center text-gray-400 opacity-60 min-h-[100px]'>
                            <span className='font-semibold text-sm'>Loading...</span>
                        </div>
                    ) : sortedChatHistory.length > 0 ? (
                        sortedChatHistory.map(([date, messages]) => (
                            <div key={date} className='py-2 w-full flex flex-col gap-2'>
                                <span className='w-full text-center text-[10px] uppercase font-bold text-gray-400 '>
                                    {date}
                                </span>

                                {messages
                                    ?.slice()
                                    .sort((a, b) => new Date(a.created_on) - new Date(b.created_on))
                                    .map((message, i) => (
                                        <div
                                            key={i}
                                            className={`w-fit max-w-[80%] py-2 ${message.user_id === user.id ? 'ml-auto' : ''}`}
                                            ref={
                                                i === messages.length - 1 ? latestMessageRef : null
                                            }
                                        >
                                            <Discussion
                                                message={message}
                                                time={message.created_on}
                                            />
                                        </div>
                                    ))}
                            </div>
                        ))
                    ) : (
                        <div className='flex-1 flex flex-col items-center justify-center text-gray-400 opacity-60 min-h-[100px]'>
                            <span className='font-semibold text-sm'>Start a conversation...</span>
                        </div>
                    )}
                </div>
            </div>

            {/* chat input */}
            <div className='w-full mt-auto border-t'>
                {isLoading ? (
                    <div className=' flex flex-col items-center justify-center text-gray-400 opacity-60 min-h-[100px]'>
                        <span className='font-semibold text-sm'>Loading...</span>
                    </div>
                ) : (
                    <DiscussionInput
                        requestId={requestId}
                        interactionId={interactionId}
                        role={isPublisher ? 'publisher' : 'interactor'}
                        disabled={discussionDisabled}
                        discussionsList={discussionsList}
                        interaction={discussions?.interaction}
                    />
                )}
            </div>
        </div>
    );
};

export default InteractionWindow;
