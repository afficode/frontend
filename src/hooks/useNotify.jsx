import { toast } from 'react-toastify';
import { Notification } from '../ui';

const useNotify = () => {
	return (message, status, link, toastOptions) =>
		toast(<Notification message={message} status={status} link={link} />, toastOptions);
};

export default useNotify;
