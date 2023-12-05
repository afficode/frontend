import { format } from 'date-fns';

const Message = ({ message, time }) => {
	return (
		<div className="bg-gray-200 px-3 py-1 rounded-l-2xl rounded-t-2xl min-w-[8rem] flex flex-col justify-between ">
			<p className="self-start ">{message}</p>
			<span className="ml-auto text-xs font-light">{format(new Date(time), 'dd-MMM-yyyy HH:mm')}</span>
		</div>
	);
};

export default Message;
