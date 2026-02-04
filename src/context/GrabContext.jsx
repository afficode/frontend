import { useContext, createContext, useEffect, useState } from 'react';

import useAuth from './UserContext';
import { getRefreshToken } from '../utils';
import { manager } from '../utils/socket';
import { useNotify } from '../hooks';

const GrabContext = createContext();

export const GrabProvider = ({ children }) => {
    const { isLogin } = useAuth();
    const [grabs, setGrabs] = useState([]);
    const notify = useNotify();
    const socket = manager.socket('/grabber', {
        auth: (cb) => {
            cb({
                token: getRefreshToken(),
            });
        },
    });

    socket.on('connect', () => { /* empty */ });
    socket.on('grabs', (grabs) => {
        setGrabs(() => [...grabs]);
    });

    const grabAd = (adId) => {
        socket.emit('grab_ad', adId);
    };

    const unGrabAd = async (adId) => {
        socket.emit('ungrab_ad', adId, (response) => {
            if (!response.success) {
                notify(response.message, 'info');
            }
            if (response.success) {
                notify(response.message, 'success');
                // eslint-disable-next-line no-unsafe-optional-chaining
                setGrabs(() => [...response?.grabs]);
            }
        });
    };

    const disconnect_socket = () => {
        socket.disconnect();
    };

    useEffect(() => {
        if (!isLogin) {
            return;
        }

        if (!socket.active) {
            socket.connect();
        }

        const handleConnectError = (error) => {
            if (error?.message === 'Unauthorized!') {
                notify('Please try to login again to continue!', 'error');
            }
        };

        socket.on('error', handleConnectError);
        socket.on('connect_error', handleConnectError);

        // eslint-disable-next-line consistent-return
        return () => {
            socket.disconnect();
        };
    }, [isLogin, notify, socket]);

    return (
        <GrabContext.Provider
            value={{
                grabs,
                grabAd,
                unGrabAd,
                disconnect_socket,
            }}
        >
            {children}
        </GrabContext.Provider>
    );
};
const useGrabContext = () => {
    const context = useContext(GrabContext);

    if (context === undefined) {
        throw new Error('useGrabContext must be used within the MessageContext. Check main.js.');
    }

    return context;
};

export default useGrabContext;
