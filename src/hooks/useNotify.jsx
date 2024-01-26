import { toast } from 'react-toastify';
import { Notification } from '../ui';

const useNotify = () => {
	return (message, status, toastOptions) =>
		toast(<Notification message={message} status={status} />, toastOptions);
};

export default useNotify;
