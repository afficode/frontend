import { format } from 'date-fns';
import useAuth from '../../../context/UserContext';

const Message = ({ message, time }) => {
	const { user } = useAuth();

	return (
		<div className="bg-gray-200 px-3 py-1 rounded-l-2xl rounded-t-2xl min-w-[8rem] flex flex-col justify-between relative">
			<span
				className={`absolute top-[-1rem] font-extrabold text-sm text-white ${
					message.sender === user.id ? 'right-2' : 'left-1'
				}`}
			>
				{message.sender === user.id ? 'You' : message.sender_name}
			</span>
			<p className="self-start ">{message.content}</p>
			<span className="ml-auto text-xs font-light">{format(new Date(time), 'dd-MMM-yyyy HH:mm')}</span>
		</div>
	);
};

export default Message;
