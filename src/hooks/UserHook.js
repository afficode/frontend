import { getUserFromLocalStorage, privateAxios } from '../utils';
import { backendLink } from '../constants/index.js';
import { useMutation } from 'react-query';

export const isLoggedIn = () => {
    const user = getUserFromLocalStorage();
    if (!user) {
        return false;
    }
    return true;
};

export const userUpdate = (endpoint) => {
    const updateUserData = (data) =>
        privateAxios.put(`${backendLink}${endpoint}`, data).then((res) => res?.data);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation(['updateUserData'], updateUserData);
};
