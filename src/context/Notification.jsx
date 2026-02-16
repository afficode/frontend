// NotificationContext.js
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import useAuth from './UserContext';
import { getRefreshToken } from '../utils';
import { manager } from '../utils/socket';
import { useNotify } from '../hooks';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const { isLogin } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const notify = useNotify();
    const unread = useMemo(
        () => notifications.filter((notification) => !notification.is_read).length,
        [notifications]
    );

    const socket = manager.socket('/notification', {
        auth: (cb) => {
            cb({
                token: getRefreshToken(),
            });
        },
    });

    socket.on('notifications', (data) => {
        const newNotifications = data.filter(
            (notification) =>
                !notifications.some((n) => n.notification_id === notification.notification_id)
        );
        if (newNotifications.length === 0) {
            return;
        }

        setNotifications(data);
    });

    useEffect(() => {
        if (!isLogin) {
            setNotifications([]);
            if (socket.active) {
                socket.disconnect();
            }
            return;
        }

        if (!socket.connected) {
            socket.connect();
        }

        const handleNotifications = (data) => {
            setNotifications(Array.isArray(data) ? data : []);
        };

        const handleConnectError = (error) => {
            if (error?.message === 'Unauthorized!') {
                notify('Please login again to continue', 'error');
            }
        };

        socket.on('notifications', handleNotifications);
        socket.on('connect_error', handleConnectError);

        // eslint-disable-next-line consistent-return
        return () => {
            if (!isLogin) {
                socket.disconnect();
            }
        };
    }, [isLogin, socket]);

    const markAsRead = (notificationId) => {
        if (!socket.connected) {
            socket.connect();
        }
        if (socket.connected) {
            socket.emit('read_notification', notificationId, (res) => {
                if (!res?.success) {
                    notify(res?.message || 'Something went wrong.', 'error');
                }
            });
        } else {
            notify('Please reload the browser and try again', 'error');
        }
    };

    return (
        <NotificationContext.Provider value={{ notifications, markAsRead, unread }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
