import { format } from 'date-fns';
import useAuth from '../../../context/UserContext';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { getDiscussionText } from '../../../utils';

const Discussion = ({ message, time }) => {
    const { user } = useAuth();
    const isMyMessage = message.user_id === user.id;

    return (
        <div className='flex flex-col items-end gap-1 w-full'>
            <span
                className={`uppercase text-[10px] text-gray-500 font-bold ${isMyMessage ? 'ml-auto' : 'mr-auto'}`}
            >
                {message.user_definition}
            </span>
            <div
                className={`${isMyMessage ? 'bg-primary text-white shadow-md ml-auto' : 'bg-white text-gray-800 shadow-sm border border-gray-100 mr-auto'}  ${
                    isMyMessage
                        ? 'rounded-l-3xl rounded-br-3xl rounded-tr-sm'
                        : 'rounded-r-3xl rounded-bl-3xl rounded-tl-sm'
                } px-4 py-2 min-w-[8rem] max-w-[20rem] flex flex-col relative `}
            >
                {message.images?.length > 0 && (
                    <div className='flex flex-wrap gap-1 mt-1 mb-2'>
                        {message.images?.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt='attachment'
                                className='w-full max-w-[250px] object-cover rounded-lg shadow-sm'
                                width={250}
                                height={250}
                            />
                        ))}
                    </div>
                )}
                {message.user_option && (
                    <p
                        className={`self-start whitespace-normal break-words text-sm font-medium ${isMyMessage ? 'text-white' : 'text-gray-800'}`}
                    >
                        {getDiscussionText(message.user_option)}
                    </p>
                )}
                <div
                    className={`flex items-center gap-1 ${isMyMessage ? 'self-end' : 'self-end'} mt-1`}
                >
                    <span
                        className={`text-[10px] font-medium ${isMyMessage ? 'text-blue-100' : 'text-gray-400'}`}
                    >
                        {format(new Date(time), 'HH:mm')}
                    </span>
                    {isMyMessage && (
                        <IoCheckmarkDoneSharp
                            size={14}
                            // className={message.read_status === 0 ? 'text-blue-100' : 'text-white'}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Discussion;
