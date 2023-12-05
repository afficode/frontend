import { useState } from 'react';
import { EditPencilBlack } from '../../../assets/svgs';
import { useSendMessage } from '../../../hooks';
// import { io } from 'socket.io-client';
// import { backendLink } from '../../../constants';
// import useAuth from '../../../context/UserContext';
// import { getToken } from '../../../utils';

// icon
import { AiOutlineSend } from 'react-icons/ai';

const MessageInput = ({ id }) => {
	// const socket = io(`${backendLink}`, {});

	// socket.io.on('error', (error) => {
	// 	console.log(error);
	// });

	const [formData, setFormData] = useState({
		chat_id: null,
		content: '',
	});
	// const { token } = getToken();
	// console.log(token);

	const { mutate, isLoading } = useSendMessage();

	const handleSubmitChat = (e) => {
		e.preventDefault();

		mutate(formData, {
			onSuccess: (data) => {
				console.log(data);
			},
		});
		setFormData({
			chat_id: null,
			content: '',
		});
	};

	return (
		<form className="flex w-full px-2" onSubmit={handleSubmitChat}>
			<div className="relative w-full">
				<label
					htmlFor={`chat_${id}`}
					className="absolute w-4 transform -translate-y-1/2 top-1/2 left-2"
				>
					<img src={EditPencilBlack} alt="/" />
				</label>
				<input
					type="text"
					name={`chat_${id}`}
					id={`chat_${id}`}
					autoComplete="off"
					placeholder="type here"
					className="rounded-r-2xl rounded-b-2xl pl-[2rem] w-full focus:border-secondary "
					value={formData.content}
					onChange={(e) => setFormData({ chat_id: id, content: e.target.value })}
				/>
			</div>

			<button type="submit" className="mx-4 text-white transition-all hover:text-secondary">
				<AiOutlineSend size={30} />
			</button>
		</form>
	);
};

export default MessageInput;
