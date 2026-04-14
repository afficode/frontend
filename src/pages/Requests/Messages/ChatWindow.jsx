import { PiSquaresFour } from 'react-icons/pi';
import Message from './Message';
import MessageInput from './MessageInput';
import { IoMdClose } from "react-icons/io";


const ChatWindow = () => {

    return (
        <div className=' w-full h-full flex flex-col  '>
            {/* chat window header  */}
            <div className='flex gap-2 justify-between items-start w-full p-4 border-b border-gray-200 '>
                <div className='flex items-center gap-2'>
                    <span className='p-[6px] bg-primary/10 rounded-full'>
                        <PiSquaresFour size={30} className="text-primary" />
                    </span>
                    <div className='flex flex-col items-start gap-0'>
                        <div className='flex items-center gap-2'>
                            <h4 className=''>Samuel Ezeja</h4>
                            <span className='bg-primary/10 py-1 px-2 rounded-full text-primary font-semibold uppercase text-[10px]'>Publisher</span>
                        </div>
                        <span className='font-semibold text-xs text-primary uppercase'>RE: Mechanic keyboard</span>
                    </div>
                </div>

                <button className='bg-white p-2 rounded-full shadow-lg'>
                    <IoMdClose size={20} className='text-gray-500' />
                </button>
            </div>

            {/* chat window */}
            <div className='bg-gray-100/30 h-full'>
                <div className='mt-auto flex flex-col py-3 pr-3 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-rounded-md scrollbar-thumb-secondary scrollbar-track-rounded-md '>
                    {/* {sortedChatHistory?.map(([date, messages]) => (
                        <div key={date} className='py-2 w-full flex flex-col gap-2'>
                            <span className='w-full text-center text-xs text-white '>
                                {date}
                            </span>

                            {messages?.map((message, i) => (
                                <div
                                    key={i}
                                    className={`w-fit max-w-[80%] py-2 ${message.sender === user.id ? 'ml-auto' : ''}`}
                                    ref={i === messages.length - 1 ? latestMessageRef : null}
                                >
                                    <Message
                                        key={i}
                                        message={message}
                                        time={message.message_updated_on}
                                    />
                                </div>
                            ))}
                        </div>
                    ))} */}
                </div>
            </div>

            {/* chat input */}
            <div className='w-full mt-auto border-t border-gray-200'>
                <MessageInput />
            </div>
        </div>


    );
};

export default ChatWindow;
