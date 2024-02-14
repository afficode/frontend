import { format } from 'date-fns';
import useAuth from '../../../context/UserContext';
import { TiTick } from 'react-icons/ti';

const Message = ({ message, time }) => {
	const { user } = useAuth();

	// console.log(message);

	return (
		<div className="bg-gray-200 px-3 py-1 rounded-l-2xl rounded-t-2xl min-w-[8rem] flex flex-col justify-between relative ">
			<span
				className={` font-semibold text-sm text-black truncate ${
					message.sender === user.id ? 'right-2' : 'left-1'
				}`}
			>
				{message.sender === user.id ? 'You' : message.sender_name}
			</span>
			<p className="self-start whitespace-normal break-all">{message.content}</p>
			<div className="ml-auto flex items-center">
				<span className=" text-xs font-light">{format(new Date(time), 'dd-MMM-yyyy HH:mm')}</span>
				{message.sender === user.id && (
					<span>
						{
							<TiTick
								size={18}
								className={message.read_status === 0 ? 'text-gray-600' : 'text-green-400'}
							/>
						}
					</span>
				)}
			</div>
		</div>
	);
};

export default Message;
