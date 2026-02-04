import { format } from 'date-fns';
import useAuth from '../../../context/UserContext';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';

const Message = ({ message, time }) => {
    const { user } = useAuth();

    return (
        <div className="flex items-center gap-1">
            {message.sender === user.id && (
                <span className=" text-xs font-light text-white">{format(new Date(time), 'HH:mm')}</span>
            )}
            <div
                className={`${message.offer === 1 ? 'bg-secondary' : 'bg-gray-200'}  ${
                    message.sender === user.id ? 'rounded-l-2xl rounded-t-2xl' : 'rounded-r-2xl rounded-b-2xl'
                } px-3 py-1  min-w-[8rem] flex gap-2 justify-between relative `}
            >
                <p className="self-start whitespace-normal break-all text-base font-light">{message.content}</p>
            </div>
            {message.sender === user.id && (
                <span className="h-full self-end">
                    {
                        <IoCheckmarkDoneSharp
                            size={18}
                            className={message.read_status === 0 ? 'text-gray-600' : 'text-green-400'}
                        />
                    }
                </span>
            )}
            {message.sender !== user.id && (
                <span className="text-white text-xs font-light">{format(new Date(time), 'HH:mm')}</span>
            )}
        </div>
    );
};

export default Message;
