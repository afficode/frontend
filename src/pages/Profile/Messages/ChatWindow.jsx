import { Link } from 'react-router-dom';
import { noimage } from '../../../assets/images';
import Message from './Message';
import MessageInput from './MessageInput';
import useAuth from '../../../context/UserContext';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useMessages } from '../../../hooks';
import { Button } from '../../../ui';
import { BiPhoneCall } from 'react-icons/bi';
import { slugGeneratorForAdIdWithName, toMoney } from '../../../utils';

const ChatWindow = ({ chat_id, chat_data, title }) => {
	const { user } = useAuth();

	const [showContact, setShowContact] = useState(false);

	useEffect(() => {
		setShowContact(false);
	}, [chat_id]);

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

	const groupedMessages = messageData?.messages?.reduce((acc, message) => {
		const dateKey = new Date(message.message_updated_on).toDateString();

		if (!acc[dateKey]) {
			acc[dateKey] = [];
		}
		acc[dateKey].push(message);
		return acc;
	}, {});

	return (
		<div className='bg-primary w-full sm:w-full h-[calc(100vh-15rem)]  rounded-xl pt-1 pb-4 px-1 flex flex-col  '>
			{/* chat window header  */}
			<h5 className='text-center p-2 text-base font-semibold text-white'>{user?.id === data?.user_a ? data?.user_b_name : data?.user_a_name}</h5>
			<div className='flex gap-2 justify-between items-center flex-wrap w-full px-2 py-1 bg-gray-100 shadow-lg sm:py-2 rounded-xl'>
				<Link to={`/product/${slugGeneratorForAdIdWithName(data?.title, data?.ad_id)}`} className='max-w-max w-full'>
					<div className='flex gap-2 items-center'>
						<img src={data?.image[0].filename?.startsWith('vehicles') ? noimage : data?.image[0].path || noimage} alt={data?.title || 'product'} className='w-[3rem] h-[3rem]  object-fit rounded-full ' />
						<div className=' flex flex-col gap-1 w-full'>
							<h6 className=' capitalize text-base leading-4 break-all break-words'>{data?.title ? data.title : title}</h6>
							<h5 className='font-semibold text-sm'>₦{toMoney(data?.price, true)}</h5>
						</div>
					</div>
				</Link>

				{showContact ? (
					<a href={`tel:${user?.id === data?.user_a ? data?.user_b_phone : data?.user_a_phone}`} className='text-primary pr-2 font-medium text-sm hover:underline flex items-center gap-1'>
						<BiPhoneCall />

						{user?.id === data?.user_a ? data?.user_b_phone : data?.user_a_phone}
					</a>
				) : (
					<Button onClick={() => setShowContact(true)} variant={'primary'} size={'small'} className={'!py-[0.125rem] px-[1rem] h-max leading-6 rounded-md text-sm whitespace-nowrap'}>
						View contact
					</Button>
				)}
			</div>

			{/* chat window */}
			<div className='mt-auto flex flex-col py-3 pr-3 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-rounded-md scrollbar-thumb-secondary scrollbar-track-rounded-md '>
				{groupedMessages &&
					Object.entries(groupedMessages)?.map(([date, messages]) => (
						<div key={date} className='py-2 w-full flex flex-col gap-2'>
							<span className='w-full text-center text-xs text-white '>{date}</span>

							{messages?.map((message, i) => (
								<div key={i} className={`w-fit max-w-[80%] py-2 ${message.sender === user.id ? 'ml-auto' : ''}`} ref={i === messages.length - 1 ? latestMessageRef : null}>
									<Message key={i} message={message} time={message.message_updated_on} />
								</div>
							))}
						</div>
					))}
			</div>

			{/* chat input */}
			<div className='ml-auto w-full sm:w-[70%] mt-3 '>
				<MessageInput id={chat_id} />
			</div>
		</div>
	);
};

export default ChatWindow;
