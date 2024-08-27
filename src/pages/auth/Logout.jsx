import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollToTop, getToken } from '../../utils';
import { backendLink } from '../../constants';
import { api } from '../../utils/axios';
import useAuth from '../../context/UserContext';
import { SpinnerSkeleton } from '../../components';
import { useNotify } from '../../hooks';

import useMessageContext from '../../context/MessageContext';

const Logout = () => {
	const notify = useNotify();
	const { logout } = useAuth();
	const navigate = useNavigate();
	const { disconnect_socket } = useMessageContext();

	useEffect(() => {
		// notifyInf(
		//   "You are been logout. Allow us clean up your space against Hackers."
		// );
		const logoutBackend = async () => {
			await api
				.get(`${backendLink}auth/logout`, {
					headers: {
						Authorization: `Bearer ${getToken()}`,
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				})
				.then(({ data }) => {
					const { message } = data;
					notify(message, 'success');
					return;
				})
				.catch(({ response }) => {
					const { message } = response.data;
					if (message !== undefined) {
						notify(message, 'error');
					} else {
						notify('Something went wrong.', 'error');
					}
				});
			// remove the user details from localStorage
			//clearLocalStorage();
			logout();
			disconnect_socket();
			navigate('/', { replace: 'true' });
		};
		setTimeout(() => {
			logoutBackend();
		}, 4000);

		return;
	}, []);

	return (
		<div className="my-16 lg:my-20">
			<SpinnerSkeleton
				heading={'Logout in Process...'}
				body={
					'Our Logout is done securely. We are cleaning up your space to keep you safe from Hackers. We hope to see you soon. Bye 🙋‍♂️'
				}
				type={'spin'}
				color={'#2686CE'}
				height={250}
				width={250}
			/>
			<ScrollToTop />
		</div>
	);
};

export default Logout;
