import { PiSquaresFour } from 'react-icons/pi';
import { formatTimeAgo, getDiscussionText } from '../../../utils';
import useMessageContext from '../../../context/MessageContext';
import useAuth from '../../../context/UserContext';

const InteractionList = ({ data, isActive, handleSelectInteraction }) => {
    const displayMessage = data?.last_user_option
        ? getDiscussionText(data.last_user_option)
        : 'Start a conversation...';
    const { user } = useAuth();
    const { onlineUsers } = useMessageContext();

    const isPublisher = data?.publisher_id === user?.id;
    const displayName = isPublisher
        ? data?.interactor_name || data?.name || 'User'
        : data?.publisher_name || data?.name || 'User';

    const otherUserId =
        data?.publisher_id === user?.id
            ? data?.interactor_id
            : data?.interactor_id === user?.id
                ? data?.publisher_id
                : null;
    const isOnline = onlineUsers.includes(otherUserId);

    return (
        <div
            onClick={() => handleSelectInteraction(data)}
            className={`flex items-start gap-4 w-full border rounded-xl hover:border-primary hover:shadow-lg p-4 cursor-pointer transition-all ${isActive ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-200 bg-white'}`}
        >
            {data?.image ? (
                <img
                    src={data?.image}
                    alt={data?.item_name || 'Item'}
                    className='w-10 h-10 rounded-full object-cover shadow-sm'
                />
            ) : (
                <span className='p-[6px] bg-primary/10 rounded-full group-hover/con:bg-primary'>
                    <PiSquaresFour size={30} className='text-primary group-hover/con:text-white' />
                </span>
            )}

            <div className='flex flex-col items-start gap-1 w-full flex-grow overflow-hidden'>
                <div className='flex items-center justify-between w-full'>
                    <span className='text-[10px] font-semibold text-gray-400 truncate uppercase'>
                        {displayName}
                    </span>
                    <span
                        className={`w-2 h-2 ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'} rounded-full`}
                        title='User status'
                    />
                </div>
                <h4 className='text-sm font-extrabold text-gray-800 truncate w-full'>
                    {data?.item_name || 'Request Item'}
                </h4>
                <div className='flex items-center justify-between w-full mt-1'>
                    <span className='text-xs font-medium text-gray-500 truncate w-[70%]'>
                        {displayMessage}
                    </span>
                    <span className='text-[10px] text-gray-400 font-semibold whitespace-nowrap'>
                        {formatTimeAgo(data?.updated_on)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default InteractionList;
