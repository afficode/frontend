import { Link } from 'react-router-dom';
import { RedCar } from '../../../assets/images';
import Message from './Message';
import MessageInput from './MessageInput';
import { useMessages } from '../../../hooks';
// import { io } from 'socket.io-client';
// import { backendLink } from '../../../constants';
import { getToken } from '../../../utils';
import useAuth from '../../../context/UserContext';

const ChatWindow = ({ chat_id, chat_data }) => {
	const { user } = useAuth();
	// const token = getToken();

	// console.log(chat_id);

	const { data: messageData, isLoading } = useMessages(chat_id);

	const data = chat_data?.chats.find((chat) => chat.chat_id === chat_id);

	// console.log(messageData);

	// const socket = io(`${backendLink}/messages/${chat_id}`, {
	// 	auth: {
	// 		token: token,
	// 	},
	// });

	return (
		<div className="bg-primary min-w-[380px] sm:w-full h-[calc(100vh-15rem)] overflow-x-auto rounded-xl pt-1 pb-4 px-1 flex flex-col justify-between ">
			{/* chat window header  */}
			<div className="flex justify-between w-full px-1 py-1 bg-gray-100 sm:py-2 rounded-xl shadow-lg">
				<Link>
					<div className="flex gap-2 ">
						<img src={RedCar} alt={'/'} className="w-[3rem] h-[3rem]  object-fit rounded-full " />
						<div className="py-2 ">
							<h6 className="font-medium ">{isLoading ? 'Loading...' : data?.title}</h6>
						</div>
					</div>
				</Link>

				<div></div>
			</div>

			{/* chat window */}
			<div className="flex flex-col py-3 pr-3 overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-rounded-md scrollbar-thumb-secondary scrollbar-track-rounded-md">
				{messageData?.messages.map((message, i) => (
					<div
						key={i}
						className={`w-fit max-w-[80%] py-2 ${message.sender === user.id ? 'ml-auto' : ''}`}
					>
						<Message key={i} message={message.content} time={message.message_updated_on} />
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

// messageData

// const messageData = [
// 	{
// 		sender: 58,
// 		sender_name: 'Samuel Ezeja',
// 		content: 'Hi, is this still available?',
// 		chat: 12,
// 		message_updated_on: '2023-11-30T10:44:55.000Z',
// 	},
// 	{
// 		sender: 61,
// 		sender_name: 'Godstime Agholor',
// 		content: 'Yes, its available',
// 		chat: 12,
// 		message_updated_on: '2023-11-30T10:44:55.000Z',
// 	},
// 	{
// 		sender: 58,
// 		sender_name: 'Samuel Ezeja',
// 		content: 'How much is it?',
// 		chat: 12,
// 		message_updated_on: '2023-11-30T10:44:55.000Z',
// 	},
// 	{
// 		sender: 58,
// 		sender_name: 'Samuel Ezeja',
// 		content: 'How reliable is this?',
// 		chat: 12,
// 		message_updated_on: '2023-11-30T10:44:55.000Z',
// 	},
// 	{
// 		sender: 61,
// 		sender_name: 'Godstime Agholor',
// 		content: 'The amount is 50k, and its reliable. I have it for 5 years',
// 		chat: 12,
// 		message_updated_on: '2023-11-30T10:44:55.000Z',
// 	},
// 	{
// 		sender: 58,
// 		sender_name: 'Samuel Ezeja',
// 		content: 'It is negotiable? 40K',
// 		chat: 12,
// 		message_updated_on: '2023-11-30T10:44:55.000Z',
// 	},
// 	{
// 		sender: 61,
// 		sender_name: 'Godstime Agholor',
// 		content: 'Please I can go more than 50k, am saving to buy another Game disk',
// 		chat: 12,
// 		message_updated_on: '2023-11-30T10:44:55.000Z',
// 	},
// ];
