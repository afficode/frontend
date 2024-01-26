import { NotificationCheck, NotificationCool, NotificationInfo } from '../../assets/svgs';

const Notification = ({ status, message }) => {
	return (
		<div
			className={`${
				status === 'success' ? 'bg-green-600' : status === 'error' ? 'bg-red-600' : 'bg-primary'
			} flex justify-center items-center gap-3 py-4 px-8 rounded-lg 	`}
		>
			{status === 'success' ? (
				<img src={NotificationCheck} alt="/" />
			) : status === 'error' ? (
				<img src={NotificationInfo} alt="/" />
			) : (
				<img src={NotificationCool} alt="/" />
			)}

			<p className="text-white font-semibold whitespace-nowrap">{message}</p>
		</div>
	);
};

export default Notification;
