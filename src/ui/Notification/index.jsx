import { NotificationCheck, NotificationCool, NotificationInfo } from '../../assets/svgs';

const Notification = ({ status, message }) => {
	return (
		<div
			className={`${
				status === 'success'
					? 'bg-green-600 text-white'
					: status === 'error'
					? 'bg-red-600 text-white'
					: 'bg-[#fff7d8] text-[#866C44]'
			} flex justify-center items-center gap-3 py-4 px-8 rounded-lg 	`}
		>
			{status === 'success' ? (
				<img src={NotificationCheck} alt="/" />
			) : status === 'error' ? (
				<img src={NotificationInfo} alt="/" />
			) : (
				<img src={NotificationCool} alt="/" />
			)}

			<p className="font-semibold whitespace-nowrap">{message}</p>
		</div>
	);
};

export default Notification;
