import secureLocalStorage from 'react-secure-storage';
import { userReducerOptions } from '../reducers/userReducer';
import { Approutes } from '../constants';

// Set items to local storage
export const setUser = (user) => {
    secureLocalStorage.setItem(userReducerOptions.USER, user);
};

export const setRefreshToken = (refresh_token) => {
    secureLocalStorage.setItem(userReducerOptions.REFRESH_TOKEN, refresh_token);
};

export const setToken = (token) => {
    secureLocalStorage.setItem(userReducerOptions.ACCESS_TOKEN, token);
};

export const setReducerInitialState = (initialState) => {
    secureLocalStorage.setItem(userReducerOptions.INITIAL_STATE, initialState);
};

// clear Local storage
export const clearLocalStorage = () => {
    secureLocalStorage.clear();
};

// get stored item
export const getUserFromLocalStorage = () => {
    return secureLocalStorage.getItem(userReducerOptions.USER);
};

export const getToken = () => {
    return secureLocalStorage.getItem(userReducerOptions.ACCESS_TOKEN);
};

export const getRefreshToken = () => {
    return secureLocalStorage.getItem(userReducerOptions.REFRESH_TOKEN);
};

export const getReducerInitialState = () => {
    return secureLocalStorage.getItem(userReducerOptions.INITIAL_STATE);
};

// store the previous link before redirecting user to login
export const setRedirectLink = (link) => {
    if (link !== Approutes.auth.initial) {
        secureLocalStorage.setItem(userReducerOptions.REDIRECT_LINK, link);
    }
};

export const getRedirectLink = () => {
    return secureLocalStorage.getItem(userReducerOptions.REDIRECT_LINK);
};
