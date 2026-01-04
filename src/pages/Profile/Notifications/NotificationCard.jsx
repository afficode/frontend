import { IoMdTime } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Approutes } from '../../../constants';
import { useNotifications } from '../../../context/Notification';
import useAuth from '../../../context/UserContext';

const NotificationCard = ({ feature, body, time, id, adId, isRead, metadata, user_id }) => {
	const navigate = useNavigate();
	const { markAsRead } = useNotifications();
	const { user } = useAuth();

	return (
		<div
			role="button"
			onClick={() => {
				markAsRead(id);
				navigate(
					feature.includes('inspection_log') && metadata && metadata?.ad_owner === user.id
						? Approutes.product.initial + '/' + adId
						: feature.includes('inspection_log')
						? Approutes.grab.inspectionLog
						: feature.includes('escrow')
						? Approutes.profile.transactions
						: feature.includes('ads')
						? Approutes.product.initial + '/' + adId
						: feature.includes('message')
						? Approutes.profile.messages
						: null
				);
			}}
			className={`${
				isRead === 1 ? 'bg-white' : 'bg-primary/20'
			} w-full h-full p-2 sm:p-4 flex items-start rounded-md gap-3 border-t-2 border-t-gray-200 mb-2`}
		>
			{/* details  */}
			<div className="flex flex-col gap-2 justify-between flex-1">
				<div className="flex items-center max-[420px]:items-stretch max-[420px]:flex-col-reverse justify-between gap-4 max-[420px]:gap-2">
					<span
						className={`px-2 py-1 capitalize ${
							feature.includes('escrow_refund_resolved')
								? 'bg-green-500'
								: feature.includes('inspection_log')
								? 'bg-purple-500'
								: feature.includes('message')
								? 'bg-blue-500'
								: feature.includes('escrow_refund')
								? 'bg-orange-500'
								: 'bg-green-500'
						} text-white w-fit text-xs rounded-md`}
					>
						{feature.split('_').join(' ')}
					</span>

					<div className="sm:hidden max-[420px]:justify-end flex items-center justify-start gap-1 text-xs text-gray-400">
						<IoMdTime className="text-gray-400" /> {format(new Date(time), "d MMM yyyy 'at' h:mm a")}
					</div>
				</div>

				<div>
					<p className="text-sm ellipsis-text w-full text-gray-500">{body}</p>
				</div>
			</div>

			<div className="max-sm:hidden flex items-center justify-start gap-1 text-xs text-gray-400">
				<IoMdTime className="text-gray-400" /> {format(new Date(time), "d MMM yyyy 'at' h:mm a")}
			</div>
		</div>
	);
};

export default NotificationCard;
