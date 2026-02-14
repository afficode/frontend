import { useState } from 'react';
import { noimage } from '../../../assets/images';
import ChatWindow from './ChatWindow';
import useAuth from '../../../context/UserContext';
import useMessageContext from '../../../context/MessageContext';
import { IoIosChatboxes } from 'react-icons/io';
import { useEffect } from 'react';
import { BiMenu } from 'react-icons/bi';
import { useSearchParams } from 'react-router-dom';
import { queryStrings } from '../../../constants';

const Messages = () => {
    const { chats, onlineUsers, readMessage } = useMessageContext();

    const { user } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();

    const chat_viewed = (chat_id) => {
        const chat = chats?.find((chat) => chat?.chat_id === chat_id);
        const receiver = chat?.user_a !== user.id ? chat?.user_a : chat?.user_b;
        if (chat.sender !== user.id) {
            // meaning he is the one who sent the last message.
            readMessage(chat_id, receiver);
        }
    };

    useEffect(() => {
        // console.log(onlineUsers);
    }, [onlineUsers]);

    const [chatsUi, setChatsUi] = useState(false);

    return (
        <div className="max-w-[1224px] my-6 mx-auto px-2 w-full">
            <div className="hidden max-sm:flex  w-full px-4 py-2">
                {chatsUi ? (
                    <h6 className="text-primary font-semibold ">My messages</h6>
                ) : (
                    <button onClick={() => setChatsUi(true)} className="text-primary">
                        <BiMenu size={30} />
                    </button>
                )}
            </div>
            <div className="hidden gap-4 max-sm:flex ">
                {chatsUi ? (
                    <aside className="flex flex-col w-full px-3 overflow-y-auto h-[calc(100vh-15rem)]  scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-secondary">
                        {chats?.map((ad, i) => (
                            <div
                                key={i}
                                className={`px-4 py-2 transition-all border-t-2 border-gray-200 cursor-pointer h-5rem hover:bg-primary/30 ${
                                    ad.chat_id === searchParams.get(queryStrings.chat)
                                        ? 'bg-primary/30'
                                        : ''
                                }`}
                                onClick={() => {
                                    setSearchParams({ [queryStrings.chat]: ad.chat_id });
                                    chat_viewed(ad.chat_id);
                                    setChatsUi(false);
                                }}
                            >
                                <div className="w-full ">
                                    <div className="flex w-full gap-2 ">
                                        <div className="w-[5rem] h-[5rem] !p-2 rounded-full bg-white flex items-center justify-center overflow-x-hidden">
                                            <img
                                                src={
                                                    ad?.image[0]?.filename?.startsWith('vehicles')
                                                        ? noimage
                                                        : ad?.image[0]?.path || noimage
                                                }
                                                alt={ad?.image[0]?.filename}
                                                className=" w-full h-full max-w-[4rem] max-h-[4rem] object-contain "
                                            />
                                        </div>
                                        {/* name, ad, last msg  */}
                                        <div className="w-[calc(100%-5rem)] py-2">
                                            <div className="flex items-center justify-between w-full">
                                                <h6 className="text-sm  truncate">
                                                    {ad.user_a !== user.id
                                                        ? ad.user_a_name
                                                        : ad.user_b_name}{' '}
                                                </h6>

                                                {onlineUsers?.includes(
                                                    ad.user_a !== user.id
                                                        ? ad.user_a.toString()
                                                        : ad.user_b.toString()
                                                ) ? (
                                                        <div className="p-1 text-[0.65rem] text-green-800 bg-green-200 rounded-full animate-bounce">
                                                        Online
                                                        </div>
                                                    ) : (
                                                        <div className="p-1 text-[0.65rem] text-red-800 bg-red-200 rounded-full">
                                                        Offline
                                                        </div>
                                                    )}
                                            </div>

                                            <h6 className="font-medium capitalize truncate">
                                                {ad.title}
                                            </h6>
                                            <div className="flex items-center gap-1">
                                                {ad.read_status === 0 && ad.sender !== user.id && (
                                                    <span className="p-1 rounded-full bg-primary" />
                                                )}
                                                <p
                                                    className={`text-xs truncate ${ad.read_status !== 1 ? 'text-gray-500' : ''}`}
                                                >
                                                    <span className="italic">
                                                        {user.id === ad.sender ? 'You:' : ''}
                                                    </span>{' '}
                                                    {ad.last_message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </aside>
                ) : (
                    <div className="flex-1 ">
                        {!searchParams.get(queryStrings.chat) ? (
                            <div className="bg-primary/90 w-full sm:w-full h-[calc(100vh-15rem)] overflow-x-auto rounded-xl pt-1 pb-4 px-1 flex flex-col items-center justify-center ">
                                <span>
                                    <IoIosChatboxes className="my-4 text-[10rem] text-white" />
                                </span>
                                <h1 className="text-lg lg:text-xl 2xl:text-2xl text-white text-center">
                                    Please select a chat to start conversation
                                </h1>
                            </div>
                        ) : (
                            <ChatWindow
                                chat_data={chats}
                                chat_id={searchParams.get(queryStrings.chat)}
                                title={chats && chats[0]?.title}
                            />
                        )}
                    </div>
                )}
            </div>

            <div className="flex gap-4 max-sm:hidden ">
                <aside className="flex flex-col min-w-[18rem] max-lg:w-[18rem] lg:w-[22rem] px-3 overflow-y-auto h-[calc(100vh-15rem)]  scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-secondary">
                    {chats?.map((ad, i) => (
                        <div
                            key={i}
                            className={`px-4 py-2 transition-all border-t-2 border-gray-200 cursor-pointer h-5rem hover:bg-primary/30 ${
                                ad.chat_id === searchParams.get(queryStrings.chat)
                                    ? 'bg-primary/30'
                                    : ''
                            }`}
                            onClick={() => {
                                chat_viewed(ad.chat_id);
                                setSearchParams({ [queryStrings.chat]: ad.chat_id });
                            }}
                        >
                            <div className="w-full ">
                                <div className="flex w-full gap-2 ">
                                    <div className="w-[5rem] h-[5rem] !p-2 rounded-full bg-white flex items-center justify-center overflow-x-hidden">
                                        <img
                                            src={
                                                ad?.image[0]?.filename?.startsWith('vehicles')
                                                    ? noimage
                                                    : ad?.image[0]?.path || noimage
                                            }
                                            alt={ad?.image[0]?.filename}
                                            className=" w-full h-full max-w-[4rem] max-h-[4rem] object-contain "
                                        />
                                    </div>
                                    {/* name, ad, last msg  */}
                                    <div className="w-[calc(100%-5rem)] py-2">
                                        <div className="flex items-center justify-between w-full">
                                            <h6 className="text-sm  truncate">
                                                {ad.user_a !== user.id
                                                    ? ad.user_a_name
                                                    : ad.user_b_name}{' '}
                                            </h6>

                                            {onlineUsers?.includes(
                                                ad.user_a !== user.id
                                                    ? ad.user_a.toString()
                                                    : ad.user_b.toString()
                                            ) ? (
                                                    <div className="p-1 text-[0.65rem] text-green-800 bg-green-200 rounded-full animate-bounce">
                                                    Online
                                                    </div>
                                                ) : (
                                                    <div className="p-1 text-[0.65rem] text-red-800 bg-red-200 rounded-full">
                                                    Offline
                                                    </div>
                                                )}
                                        </div>

                                        <h6 className="font-medium capitalize truncate text-base">
                                            {ad.title}
                                        </h6>
                                        <div className="flex items-center gap-1 ">
                                            {ad.read_status === 0 && ad.sender !== user.id && (
                                                <span className="p-1 rounded-full bg-primary" />
                                            )}
                                            <p
                                                className={`text-xs truncate ${ad.read_status !== 1 ? 'text-gray-500' : ''}`}
                                            >
                                                <span className="italic">
                                                    {user.id === ad.sender ? 'You:' : ''}
                                                </span>{' '}
                                                {ad.last_message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </aside>

                <div className="flex-1 ">
                    {!searchParams.get(queryStrings.chat) ? (
                        <div className="bg-primary/90 w-full sm:w-full h-[calc(100vh-15rem)] overflow-x-auto rounded-xl pt-1 pb-4 px-1 flex flex-col items-center justify-center ">
                            <span>
                                <IoIosChatboxes className="my-4 text-[10rem] text-white" />
                            </span>
                            <h1 className="text-lg lg:text-xl 2xl:text-2xl text-white text-center">
                                Please select a chat to start conversation
                            </h1>
                        </div>
                    ) : (
                        <ChatWindow
                            chat_data={chats}
                            chat_id={searchParams.get(queryStrings.chat)}
                            title={chats && chats[0]?.title}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Messages;
