import { Link } from 'react-router-dom';
import { noimage } from '../../../assets/images';
import Message from './Message';
import MessageInput from './MessageInput';

import useAuth from '../../../context/UserContext';
import { useEffect, useLayoutEffect, useRef } from 'react';
import useMessageContext from '../../../context/MessageContext';
import { useMessages } from '../../../hooks';
import { encodeProductId } from '../../../utils';

const ChatWindow = ({ chat_id, chat_data, title }) => {
	const { user } = useAuth();

	const data = chat_data?.find((chat) => chat.chat_id === chat_id);
	const { data: messageData } = useMessages(chat_id);
	// ref to scroll to latest message
	const latestMessageRef = useRef(null);
	useLayoutEffect(() => {
		if (latestMessageRef.current) {
			latestMessageRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'end',
			});
		}
	}, [messageData]);

	return (
		<div className="bg-primary min-w-[380px] sm:w-full h-[calc(100vh-15rem)] overflow-x-auto rounded-xl pt-1 pb-4 px-1 flex flex-col justify-between ">
			{/* chat window header  */}
			<div className="flex justify-between w-full px-1 py-1 bg-gray-100 shadow-lg sm:py-2 rounded-xl">
				<Link to={`/product/${encodeProductId(data?.ad_id)}`}>
					<div className="flex gap-2 ">
						<img
							src={
								data?.image[0].filename?.startsWith('vehicles') ? noimage : data?.image[0].path || noimage
							}
							alt={'/'}
							className="w-[3rem] h-[3rem]  object-fit rounded-full "
						/>
						<div className="py-2 ">
							<h6 className="font-medium capitalize">{data?.title ? data.title : title}</h6>
						</div>
					</div>
				</Link>
			</div>

			{/* chat window */}
			<div className="flex flex-col py-3 pr-3 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-rounded-md scrollbar-thumb-secondary scrollbar-track-rounded-md ">
				{messageData?.messages.map((message, i) => (
					<div
						key={i}
						className={`w-fit max-w-[80%] py-2 ${message.sender === user.id ? 'ml-auto' : ''}`}
						ref={i === messageData.messages.length - 1 ? latestMessageRef : null}
					>
						<Message key={i} message={message} time={message.message_updated_on} />
					</div>
				))}
			</div>

			{/* chat input */}
			<div className="ml-auto w-full sm:w-[70%] mt-3 ">
				<MessageInput id={chat_id} />
			</div>
		</div>
	);
};

export default ChatWindow;
