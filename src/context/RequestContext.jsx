import { createContext, useContext, useEffect, useMemo } from 'react';
import { manager } from '../utils/socket';
import useAuth from './UserContext';
import { useQueryClient } from 'react-query';
import { getRefreshToken } from '../utils';

const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
    const socket = useMemo(
        () =>
            manager.socket('/request', {
                auth: (cb) => {
                    cb({
                        token: getRefreshToken(),
                    });
                },
            }),
        []
    );

    const { isLogin } = useAuth();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!isLogin) {
            if (socket.active) {
                socket.disconnect();
            }
            return;
        }

        if (!socket.connected) {
            socket.connect();
        }

        const handleUpdateInteractions = () => {
            queryClient.invalidateQueries(['get-interactions']);
            queryClient.invalidateQueries(['get-discussion']);
        };

        socket.on('interactions', handleUpdateInteractions);

        return () => {
            socket.off('interactions', handleUpdateInteractions);
        };
    }, [isLogin, socket, queryClient]);

    useEffect(() => {
        return () => {
            if (socket.active) socket.disconnect();
        };
    }, [socket]);

    return <RequestContext.Provider value={{ socket }}>{children}</RequestContext.Provider>;
};

export const useRequestContext = () => {
    const context = useContext(RequestContext);
    if (context === undefined) {
        throw new Error('useRequestContext must be used within the RequestContext. Check App.js.');
    }
    return context;
};
