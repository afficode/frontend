import { useNotifications } from '../../../context/Notification';
import NotificationCard from './NotificationCard';

const Notifications = () => {
	const { notifications } = useNotifications();

	if (notifications.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-[60vh]">
				<div className="text-center">
					<h2 className="text-xl font-bold mb-2 text-primary">You are all caught up!</h2>
					<p className="text-gray-500">You have no notifications at the moment.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-[1024px] mx-auto px-2 sm:px-4 my-10">
			<div className="flex flex-col">
				{notifications.map((item) => (
					<NotificationCard
						key={item.notification_id}
						feature={item.feature}
						body={item.body}
						time={item.created_at}
						id={item.notification_id}
						isRead={item.is_read}
						adId={item.metadata?.ad_id}
						metadata={item?.metadata}
					/>
				))}
			</div>
		</div>
	);
};

export default Notifications;
