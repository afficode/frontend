import { useState, useMemo } from 'react';
import { noimage } from '../../../assets/images';
import { useChats, useMessages } from '../../../hooks';
import ChatWindow from './ChatWindow';
import useAuth from '../../../context/UserContext';
import useMessageContext from '../../../context/MessageContext';
import { IoIosChatboxes } from 'react-icons/io';
import { useEffect } from 'react';

const Messages = () => {

	const { chats, onlineUsers, readMessage } = useMessageContext();

	const { user } = useAuth();

	// id to fetch for a particular chat messages
	const [chatId, setChatId] = useState(null);

	const chat_viewed = (chat_id) => {
		const chat = chats?.find((chat) => chat?.chat_id === chat_id);
		const receiver = chat?.user_a !== user.id ? chat?.user_a : chat?.user_b;
		if (chat.sender !== user.id) {
			// meaning he is the one who sent the last message.
			readMessage(chat_id, receiver);
		}
	};

	useEffect(() => {}, [onlineUsers]);

	return (
		<div className="max-w-[1224px] my-6 mx-auto px-2 overflow-x-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400">
			<div className="flex gap-4 ">
				<aside className="flex flex-col min-w-[18rem] max-lg:w-[18rem] lg:w-[22rem] px-3 overflow-y-auto h-[calc(100vh-15rem)]  scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-secondary">
					{chats?.map((ad, i) => (
						<div
							key={i}
							className={`px-4 py-2 transition-all border-t-2 border-gray-200 cursor-pointer h-5rem hover:bg-primary/30 ${
								chatId === null && ad.chat_updated_on === chats[0].chat_updated_on
									? 'bg-primary/30'
									: ad.chat_id === chatId
									? 'bg-primary/30'
									: ''
							}`}
							onClick={() => {
								setChatId(ad.chat_id);
								chat_viewed(ad.chat_id);
							}}
						>
							<div className="w-full ">
								<div className="flex w-full gap-2 ">
									<img
										src={
											ad?.image[0]?.filename?.startsWith('vehicles') ? noimage : ad?.image[0]?.path || noimage
										}
										alt={ad?.image[0]?.filename}
										className="w-[5rem] h-[5.5rem] object-fit rounded-l-lg rounded-b-lg overflow-x-hidden"
									/>
									{/* name, ad, last msg  */}
									<div className="w-[calc(100%-5rem)] py-2">
										<div className="flex items-center justify-between w-full">
											<h6 className="text-base font-medium">
												{ad.user_a != user.id ? ad.user_a_name : ad.user_b_name}{' '}
											</h6>

											{onlineUsers?.includes(
												ad.user_a != user.id ? ad.user_a.toString() : ad.user_b.toString()
											) ? (
												<div className="p-1 text-xs text-green-800 bg-green-200 rounded-full animate-bounce">
													Online
												</div>
											) : (
												<div className="p-1 text-xs text-red-800 bg-red-200 rounded-full">Offline</div>
											)}
										</div>

										<h6 className="font-medium capitalize truncate">{ad.title}</h6>
										<div className="flex items-center gap-1">
											{ad.read_status === 0 && ad.sender !== user.id && (
												<span className="p-1 rounded-full bg-primary" />
											)}
											<p className={`text-sm truncate ${ad.read_status !== 1 ? 'text-gray-500' : ''}`}>
												<span className="italic">{user.id === ad.sender ? 'You:' : ''}</span> {ad.last_message}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</aside>

				<div className="flex-1 ">
					{!chatId ? (
						<div className="bg-primary/90 min-w-[380px] sm:w-full h-[calc(100vh-15rem)] overflow-x-auto rounded-xl pt-1 pb-4 px-1 flex flex-col items-center justify-center ">
							<span>
								<IoIosChatboxes className="my-4 text-[10rem]" />
							</span>
							<h1 className="text-lg lg:text-xl 2xl:text-2xl">
								Please select a chat to start conversation
							</h1>
						</div>
					) : (
						<ChatWindow
							chat_id={chatId}
							// messageData={messageData}
							chat_data={chats}
							title={chats && chats[0]?.title}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Messages;

// messages data format from backend

// const chatData = [
// 	{
// 		chat_id: 4,
// 		ad_id: 9,
// 		image: [
// 			RedCar,
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/0bcb6d6d-3374-46ea-bec5-88d5a5b24955-corolla5.jpg.jpg',
// 				filename: 'vehicles/0bcb6d6d-3374-46ea-bec5-88d5a5b24955-corolla5.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/77989311-6796-4662-8965-1fd8ed54396f-corolla6.jpg.jpg',
// 				filename: 'vehicles/77989311-6796-4662-8965-1fd8ed54396f-corolla6.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/4d18769d-a354-43a4-b635-88827c1c983c-corolla7.jpg.jpg',
// 				filename: 'vehicles/4d18769d-a354-43a4-b635-88827c1c983c-corolla7.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/056dae41-fcc9-4117-bb63-6430accef5fe-corolla8.jpg.jpg',
// 				filename: 'vehicles/056dae41-fcc9-4117-bb63-6430accef5fe-corolla8.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/ccc27428-7362-4642-84f3-f7a240e2b063-corolla10.jpg.jpg',
// 				filename: 'vehicles/ccc27428-7362-4642-84f3-f7a240e2b063-corolla10.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/46dd5c30-ad86-4697-a75d-e42c367b0600-corolla11.jpg.jpg',
// 				filename: 'vehicles/46dd5c30-ad86-4697-a75d-e42c367b0600-corolla11.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/9b6b1d81-e20f-4b15-bbda-6a16970ed0e3-corolla12.jpg.jpg',
// 				filename: 'vehicles/9b6b1d81-e20f-4b15-bbda-6a16970ed0e3-corolla12.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/c754c1d2-634b-495d-b429-9d9fd804ece4-corolla13.jpg.jpg',
// 				filename: 'vehicles/c754c1d2-634b-495d-b429-9d9fd804ece4-corolla13.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/d1280927-5d2d-427e-ad7f-1b7e2071e5b9-corrola9.jpg.jpg',
// 				filename: 'vehicles/d1280927-5d2d-427e-ad7f-1b7e2071e5b9-corrola9.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/29a8f7f4-0ab4-4984-bd66-4f166e180550-corrolla-15.jpg.jpg',
// 				filename: 'vehicles/29a8f7f4-0ab4-4984-bd66-4f166e180550-corrolla-15.jpg',
// 			},
// 		],
// 		owner: 58,
// 		sender: 58,
// 		user_a: 58,
// 		user_b: 28,
// 		user_a_name: 'Samuel Ezeja',
// 		user_b_name: 'Samuel Ezeja',
// 		title: 'Brand New Mercedes-Benz GLB 2023',
// 		last_message: 'Please I can go more than 50k, am saving to buy another Game disk',
// 		chat_updated_on: '2023-11-30T10:35:46.000Z',
// 	},
// 	{
// 		chat_id: 1,
// 		ad_id: 8,
// 		image: [
// 			RedCar,
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/0bcb6d6d-3374-46ea-bec5-88d5a5b24955-corolla5.jpg.jpg',
// 				filename: 'vehicles/0bcb6d6d-3374-46ea-bec5-88d5a5b24955-corolla5.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/77989311-6796-4662-8965-1fd8ed54396f-corolla6.jpg.jpg',
// 				filename: 'vehicles/77989311-6796-4662-8965-1fd8ed54396f-corolla6.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/4d18769d-a354-43a4-b635-88827c1c983c-corolla7.jpg.jpg',
// 				filename: 'vehicles/4d18769d-a354-43a4-b635-88827c1c983c-corolla7.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/056dae41-fcc9-4117-bb63-6430accef5fe-corolla8.jpg.jpg',
// 				filename: 'vehicles/056dae41-fcc9-4117-bb63-6430accef5fe-corolla8.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/ccc27428-7362-4642-84f3-f7a240e2b063-corolla10.jpg.jpg',
// 				filename: 'vehicles/ccc27428-7362-4642-84f3-f7a240e2b063-corolla10.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/46dd5c30-ad86-4697-a75d-e42c367b0600-corolla11.jpg.jpg',
// 				filename: 'vehicles/46dd5c30-ad86-4697-a75d-e42c367b0600-corolla11.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/9b6b1d81-e20f-4b15-bbda-6a16970ed0e3-corolla12.jpg.jpg',
// 				filename: 'vehicles/9b6b1d81-e20f-4b15-bbda-6a16970ed0e3-corolla12.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/c754c1d2-634b-495d-b429-9d9fd804ece4-corolla13.jpg.jpg',
// 				filename: 'vehicles/c754c1d2-634b-495d-b429-9d9fd804ece4-corolla13.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/d1280927-5d2d-427e-ad7f-1b7e2071e5b9-corrola9.jpg.jpg',
// 				filename: 'vehicles/d1280927-5d2d-427e-ad7f-1b7e2071e5b9-corrola9.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/29a8f7f4-0ab4-4984-bd66-4f166e180550-corrolla-15.jpg.jpg',
// 				filename: 'vehicles/29a8f7f4-0ab4-4984-bd66-4f166e180550-corrolla-15.jpg',
// 			},
// 		],
// 		owner: 28,
// 		sender: 28,
// 		user_a: 28,
// 		user_b: 58,
// 		user_a_name: 'Samuel Ezeja',
// 		user_b_name: 'Samuel Ezeja',
// 		title: 'God of War',
// 		last_message: 'Please I can go more than 50k, am saving to buy another Game disk',
// 		chat_updated_on: '2023-11-30T10:01:23.000Z',
// 	},
// 	{
// 		chat_id: 10,
// 		ad_id: 11,
// 		image: [
// 			RedCar,
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/0bcb6d6d-3374-46ea-bec5-88d5a5b24955-corolla5.jpg.jpg',
// 				filename: 'vehicles/0bcb6d6d-3374-46ea-bec5-88d5a5b24955-corolla5.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/77989311-6796-4662-8965-1fd8ed54396f-corolla6.jpg.jpg',
// 				filename: 'vehicles/77989311-6796-4662-8965-1fd8ed54396f-corolla6.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/4d18769d-a354-43a4-b635-88827c1c983c-corolla7.jpg.jpg',
// 				filename: 'vehicles/4d18769d-a354-43a4-b635-88827c1c983c-corolla7.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/056dae41-fcc9-4117-bb63-6430accef5fe-corolla8.jpg.jpg',
// 				filename: 'vehicles/056dae41-fcc9-4117-bb63-6430accef5fe-corolla8.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/ccc27428-7362-4642-84f3-f7a240e2b063-corolla10.jpg.jpg',
// 				filename: 'vehicles/ccc27428-7362-4642-84f3-f7a240e2b063-corolla10.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/46dd5c30-ad86-4697-a75d-e42c367b0600-corolla11.jpg.jpg',
// 				filename: 'vehicles/46dd5c30-ad86-4697-a75d-e42c367b0600-corolla11.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/9b6b1d81-e20f-4b15-bbda-6a16970ed0e3-corolla12.jpg.jpg',
// 				filename: 'vehicles/9b6b1d81-e20f-4b15-bbda-6a16970ed0e3-corolla12.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/c754c1d2-634b-495d-b429-9d9fd804ece4-corolla13.jpg.jpg',
// 				filename: 'vehicles/c754c1d2-634b-495d-b429-9d9fd804ece4-corolla13.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/d1280927-5d2d-427e-ad7f-1b7e2071e5b9-corrola9.jpg.jpg',
// 				filename: 'vehicles/d1280927-5d2d-427e-ad7f-1b7e2071e5b9-corrola9.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/29a8f7f4-0ab4-4984-bd66-4f166e180550-corrolla-15.jpg.jpg',
// 				filename: 'vehicles/29a8f7f4-0ab4-4984-bd66-4f166e180550-corrolla-15.jpg',
// 			},
// 		],
// 		owner: 28,
// 		sender: 28,
// 		user_a: 28,
// 		user_b: 58,
// 		user_a_name: 'Samuel Ezeja',
// 		user_b_name: 'Samuel Ezeja',
// 		title: 'Call of Duty',
// 		last_message: 'Please I can go more than 50k, am saving to buy another Game disk',
// 		chat_updated_on: '2023-11-30T10:10:00.000Z',
// 	},
// 	{
// 		chat_id: 12,
// 		ad_id: 10,
// 		image: [
// 			RedCar,
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/0bcb6d6d-3374-46ea-bec5-88d5a5b24955-corolla5.jpg.jpg',
// 				filename: 'vehicles/0bcb6d6d-3374-46ea-bec5-88d5a5b24955-corolla5.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/77989311-6796-4662-8965-1fd8ed54396f-corolla6.jpg.jpg',
// 				filename: 'vehicles/77989311-6796-4662-8965-1fd8ed54396f-corolla6.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/4d18769d-a354-43a4-b635-88827c1c983c-corolla7.jpg.jpg',
// 				filename: 'vehicles/4d18769d-a354-43a4-b635-88827c1c983c-corolla7.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/056dae41-fcc9-4117-bb63-6430accef5fe-corolla8.jpg.jpg',
// 				filename: 'vehicles/056dae41-fcc9-4117-bb63-6430accef5fe-corolla8.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/ccc27428-7362-4642-84f3-f7a240e2b063-corolla10.jpg.jpg',
// 				filename: 'vehicles/ccc27428-7362-4642-84f3-f7a240e2b063-corolla10.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/46dd5c30-ad86-4697-a75d-e42c367b0600-corolla11.jpg.jpg',
// 				filename: 'vehicles/46dd5c30-ad86-4697-a75d-e42c367b0600-corolla11.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/9b6b1d81-e20f-4b15-bbda-6a16970ed0e3-corolla12.jpg.jpg',
// 				filename: 'vehicles/9b6b1d81-e20f-4b15-bbda-6a16970ed0e3-corolla12.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/c754c1d2-634b-495d-b429-9d9fd804ece4-corolla13.jpg.jpg',
// 				filename: 'vehicles/c754c1d2-634b-495d-b429-9d9fd804ece4-corolla13.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/d1280927-5d2d-427e-ad7f-1b7e2071e5b9-corrola9.jpg.jpg',
// 				filename: 'vehicles/d1280927-5d2d-427e-ad7f-1b7e2071e5b9-corrola9.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/29a8f7f4-0ab4-4984-bd66-4f166e180550-corrolla-15.jpg.jpg',
// 				filename: 'vehicles/29a8f7f4-0ab4-4984-bd66-4f166e180550-corrolla-15.jpg',
// 			},
// 		],
// 		owner: 61,
// 		sender: 61,
// 		user_a: 61,
// 		user_b: 58,
// 		user_a_name: 'Godstime Agholor',
// 		user_b_name: 'Samuel Ezeja',
// 		title: 'New Toyota Corolla 2024',
// 		last_message: 'Please I can go more than 50k, am saving to buy another Game disk',
// 		chat_updated_on: '2023-11-30T11:04:25.000Z',
// 	},
// 	{
// 		chat_id: 14,
// 		ad_id: 13,
// 		image: [
// 			RedCar,
// 			{
// 				path: 'https://res......jpg',
// 				filename: 'vehicle/vehicle_name.jpg',
// 			},
// 			{
// 				path: 'https://res......jpg',
// 				filename: 'vehicle/vehicle_name.jpg',
// 			},
// 		],
// 		owner: 62,
// 		sender: 62,
// 		user_a: 62,
// 		user_b: 58,
// 		user_a_name: 'Godstime Agholor',
// 		user_b_name: 'Samuel Ezeja',
// 		title: 'Neatly used Toyota Camry 2022',
// 		last_message: 'Please I can go more than 50k, am saving to buy another Game disk',
// 		chat_updated_on: '2023-11-30T11:04:40.000Z',
// 	},
// 	{
// 		chat_id: 6,
// 		ad_id: 9,
// 		image: [
// 			RedCar,
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/0bcb6d6d-3374-46ea-bec5-88d5a5b24955-corolla5.jpg.jpg',
// 				filename: 'vehicles/0bcb6d6d-3374-46ea-bec5-88d5a5b24955-corolla5.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/77989311-6796-4662-8965-1fd8ed54396f-corolla6.jpg.jpg',
// 				filename: 'vehicles/77989311-6796-4662-8965-1fd8ed54396f-corolla6.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/4d18769d-a354-43a4-b635-88827c1c983c-corolla7.jpg.jpg',
// 				filename: 'vehicles/4d18769d-a354-43a4-b635-88827c1c983c-corolla7.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/056dae41-fcc9-4117-bb63-6430accef5fe-corolla8.jpg.jpg',
// 				filename: 'vehicles/056dae41-fcc9-4117-bb63-6430accef5fe-corolla8.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/ccc27428-7362-4642-84f3-f7a240e2b063-corolla10.jpg.jpg',
// 				filename: 'vehicles/ccc27428-7362-4642-84f3-f7a240e2b063-corolla10.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/46dd5c30-ad86-4697-a75d-e42c367b0600-corolla11.jpg.jpg',
// 				filename: 'vehicles/46dd5c30-ad86-4697-a75d-e42c367b0600-corolla11.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/9b6b1d81-e20f-4b15-bbda-6a16970ed0e3-corolla12.jpg.jpg',
// 				filename: 'vehicles/9b6b1d81-e20f-4b15-bbda-6a16970ed0e3-corolla12.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/c754c1d2-634b-495d-b429-9d9fd804ece4-corolla13.jpg.jpg',
// 				filename: 'vehicles/c754c1d2-634b-495d-b429-9d9fd804ece4-corolla13.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/d1280927-5d2d-427e-ad7f-1b7e2071e5b9-corrola9.jpg.jpg',
// 				filename: 'vehicles/d1280927-5d2d-427e-ad7f-1b7e2071e5b9-corrola9.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/29a8f7f4-0ab4-4984-bd66-4f166e180550-corrolla-15.jpg.jpg',
// 				filename: 'vehicles/29a8f7f4-0ab4-4984-bd66-4f166e180550-corrolla-15.jpg',
// 			},
// 		],
// 		owner: 58,
// 		sender: 58,
// 		user_a: 58,
// 		user_b: 60,
// 		user_a_name: 'Samuel Ezeja',
// 		user_b_name: 'Samuel Ezeja',
// 		title: 'Brand New Mercedes-Benz GLB 2023',
// 		last_message: 'Please I can go more than 50k, am saving to buy another Game disk',
// 		chat_updated_on: '2023-11-30T10:35:53.000Z',
// 	},
// 	{
// 		chat_id: 5,
// 		ad_id: 9,
// 		image: [
// 			RedCar,
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/0bcb6d6d-3374-46ea-bec5-88d5a5b24955-corolla5.jpg.jpg',
// 				filename: 'vehicles/0bcb6d6d-3374-46ea-bec5-88d5a5b24955-corolla5.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/77989311-6796-4662-8965-1fd8ed54396f-corolla6.jpg.jpg',
// 				filename: 'vehicles/77989311-6796-4662-8965-1fd8ed54396f-corolla6.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/4d18769d-a354-43a4-b635-88827c1c983c-corolla7.jpg.jpg',
// 				filename: 'vehicles/4d18769d-a354-43a4-b635-88827c1c983c-corolla7.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/056dae41-fcc9-4117-bb63-6430accef5fe-corolla8.jpg.jpg',
// 				filename: 'vehicles/056dae41-fcc9-4117-bb63-6430accef5fe-corolla8.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/ccc27428-7362-4642-84f3-f7a240e2b063-corolla10.jpg.jpg',
// 				filename: 'vehicles/ccc27428-7362-4642-84f3-f7a240e2b063-corolla10.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/46dd5c30-ad86-4697-a75d-e42c367b0600-corolla11.jpg.jpg',
// 				filename: 'vehicles/46dd5c30-ad86-4697-a75d-e42c367b0600-corolla11.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/9b6b1d81-e20f-4b15-bbda-6a16970ed0e3-corolla12.jpg.jpg',
// 				filename: 'vehicles/9b6b1d81-e20f-4b15-bbda-6a16970ed0e3-corolla12.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/c754c1d2-634b-495d-b429-9d9fd804ece4-corolla13.jpg.jpg',
// 				filename: 'vehicles/c754c1d2-634b-495d-b429-9d9fd804ece4-corolla13.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/d1280927-5d2d-427e-ad7f-1b7e2071e5b9-corrola9.jpg.jpg',
// 				filename: 'vehicles/d1280927-5d2d-427e-ad7f-1b7e2071e5b9-corrola9.jpg',
// 			},
// 			{
// 				path:
// 					'https://res.cloudinary.com/samchik/image/upload/v1697464871/vehicles/29a8f7f4-0ab4-4984-bd66-4f166e180550-corrolla-15.jpg.jpg',
// 				filename: 'vehicles/29a8f7f4-0ab4-4984-bd66-4f166e180550-corrolla-15.jpg',
// 			},
// 		],
// 		owner: 58,
// 		sender: 58,
// 		user_a: 58,
// 		user_b: 61,
// 		user_a_name: 'Samuel Ezeja',
// 		user_b_name: 'Godstime Agholor',
// 		title: 'Brand New Mercedes-Benz GLB 2023',
// 		last_message: 'Please I can go more than 50k, am saving to buy another Game disk',
// 		chat_updated_on: '2023-11-30T10:35:59.000Z',
// 	},
// ];
