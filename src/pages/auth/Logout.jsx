import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollToTop, getRefreshToken } from '../../utils';
import { backendLink } from '../../constants';
import { api } from '../../utils/axios';
import useAuth from '../../context/UserContext';
import { SpinnerSkeleton } from '../../components';

import useMessageContext from '../../context/MessageContext';
import { useQueryClient } from 'react-query';

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { disconnect_socket } = useMessageContext();
    const queryClient = useQueryClient();

    useEffect(() => {
        const logoutBackend = async () => {
            try {
                await api.post(
                    `${backendLink}auth/logout`,
                    {
                        refreshToken: getRefreshToken(),
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${getRefreshToken()}`,
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                    }
                );
            } catch (error) {}
            logout();
            disconnect_socket();
            queryClient.clear();
            navigate('/auth', { replace: 'true' });
        };
        setTimeout(() => {
            logoutBackend();
        }, 4000);
    }, []);

    return (
        <div className='my-16 lg:my-20'>
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
