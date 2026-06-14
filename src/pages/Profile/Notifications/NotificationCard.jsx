import { IoMdTime } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useNotifications } from '../../../context/Notification';
import useAuth from '../../../context/UserContext';
import { getNotificationBadgeColor, getNotificationRoute } from '../../../utils';

const NotificationCard = ({ feature, body, time, id, adId, isRead, metadata }) => {
    const navigate = useNavigate();
    const { markAsRead } = useNotifications();
    const { user } = useAuth();

    return (
        <div
            role='button'
            onClick={() => {
                markAsRead(id);
                navigate(getNotificationRoute(feature, metadata, adId, user.id));
            }}
            className={`${isRead === 1 ? 'bg-white' : 'bg-primary/20'
                } w-full h-full p-2 sm:p-4 flex items-start rounded-md gap-3 border-t-2 border-t-gray-200 mb-2`}
        >
            {/* details  */}
            <div className='flex flex-col gap-2 justify-between flex-1'>
                <div className='flex items-center max-[420px]:items-stretch max-[420px]:flex-col-reverse justify-between gap-4 max-[420px]:gap-2'>
                    <span
                        className={`px-2 py-1 capitalize ${getNotificationBadgeColor(feature)} text-white w-fit text-xs rounded-md`}
                    >
                        {feature.split('_').join(' ')}
                    </span>

                    <div className='sm:hidden max-[420px]:justify-end flex items-center justify-start gap-1 text-xs text-gray-400'>
                        <IoMdTime className='text-gray-400' />{' '}
                        {format(new Date(time), "d MMM yyyy 'at' h:mm a")}
                    </div>
                </div>

                <div>
                    <p className='text-sm ellipsis-text w-full text-gray-500'>{body}</p>
                </div>
            </div>

            <div className='max-sm:hidden flex items-center justify-start gap-1 text-xs text-gray-400'>
                <IoMdTime className='text-gray-400' />{' '}
                {format(new Date(time), "d MMM yyyy 'at' h:mm a")}
            </div>
        </div>
    );
};

export default NotificationCard;
