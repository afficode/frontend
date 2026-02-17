import { useNavigate } from 'react-router-dom';
import { NotificationCheck, NotificationCool, NotificationInfo } from '../../assets/svgs';

const Notification = ({ status, message, link }) => {
    const navigate = useNavigate();

    return link ? (
        <div
            role={'button'}
            onClick={() => navigate(link)}
            className={`${
                status === 'success'
                    ? 'bg-green-600 text-white'
                    : status === 'error'
                        ? 'bg-red-600 text-white'
                        : 'bg-[#fff7d8] text-[#866C44]'
            } flex justify-center items-center gap-3 py-2 max-xl:mx-2 sm:py-4 px-2 sm:px-8 rounded-lg 	`}
        >
            {status === 'success' ? (
                <img src={NotificationCheck} alt="/" />
            ) : status === 'error' ? (
                <img src={NotificationInfo} alt="/" />
            ) : (
                <img src={NotificationCool} alt="/" />
            )}

            <p className="font-semibold xl:whitespace-nowrap">{message}</p>
        </div>
    ) : (
        <div
            className={`${
                status === 'success'
                    ? 'bg-green-600 text-white'
                    : status === 'error'
                        ? 'bg-red-600 text-white'
                        : 'bg-[#fff7d8] text-[#866C44]'
            } flex justify-center items-center gap-3 py-2 max-xl:mx-2 sm:py-4 px-2 sm:px-8 rounded-lg 	`}
        >
            {status === 'success' ? (
                <img src={NotificationCheck} alt="/" />
            ) : status === 'error' ? (
                <img src={NotificationInfo} alt="/" />
            ) : (
                <img src={NotificationCool} alt="/" />
            )}

            <p className="font-semibold xl:whitespace-nowrap">{message}</p>
        </div>
    );
};

export default Notification;
