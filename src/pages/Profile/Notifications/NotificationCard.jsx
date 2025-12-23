import { IoMdTime } from 'react-icons/io';
import { AiFillCloseSquare } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Approutes } from '../../../constants';
import { useNotifications } from '../../../context/Notification';

const NotificationCard = ({ feature, body, time, id, adId, isRead }) => {
	const navigate = useNavigate();
	const { markAsRead } = useNotifications();

	return (
		<div
			role="button"
			onClick={() => {
				markAsRead(id);
				navigate(
					feature === 'inspection_log'
						? Approutes.grab.inspectionLog
						: feature === 'escrow_refund'
						? Approutes.profile.transactions
						: feature === 'escrow_refund_resolved'
						? Approutes.profile.transactions
						: feature === 'ads'
						? Approutes.product.initial + '/' + adId
						: feature === 'message'
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
						className={`px-2 py-1 ${
							feature === 'escrow_refund'
								? 'bg-orange-500'
								: feature === 'inspection_log'
								? 'bg-purple-500'
								: 'bg-green-500'
						} text-white w-fit text-xs rounded-md`}
					>
						{feature === 'escrow_refund'
							? 'Escrow Refund'
							: feature === 'escrow_refund_resolved'
							? 'Escrow Refund Resolved'
							: feature === 'ads'
							? 'Ad Notification'
							: feature === 'inspection_log'
							? 'Inspection'
							: 'General Notification'}
					</span>

					<div className="sm:hidden max-[420px]:justify-end flex items-center justify-start gap-1 text-xs text-gray-400">
						<IoMdTime className="text-gray-400" /> {format(new Date(time), "d MMM yyyy 'at' h:mm a")}
					</div>
				</div>

				<div>
					{/* <h6 className="text-sm font-bold text-gray-600">New message: Heyy sup</h6> */}

					<p className="text-sm ellipsis-text w-full text-gray-500">{body}</p>
				</div>

				{/* <h5 className="font-semibold text-sm text-secondary">Allen Ugo</h5> */}
			</div>

			<div className="max-sm:hidden flex items-center justify-start gap-1 text-xs text-gray-400">
				<IoMdTime className="text-gray-400" /> {format(new Date(time), "d MMM yyyy 'at' h:mm a")}
			</div>
		</div>
	);
};

export default NotificationCard;
