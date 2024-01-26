import axios from 'axios';
import { getRefreshToken, getToken, setRedirectLink, setToken } from './localstorage';
import { Approutes, backendLink } from '../constants';
import { Navigate } from 'react-router-dom';

export const api = axios.create({
	baseURL: backendLink,
	withCredentials: true,
});

export const privateAxios = axios.create({
	baseURL: backendLink,
	withCredentials: true,
});

privateAxios.interceptors.request.use(
	(config) => {
		const token = getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

privateAxios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		// check if the return status is 401
		if (error.response.status === 401 && !originalRequest._retry) {
			//console.log(getRefreshToken())
			// set the retry parameter
			originalRequest._retry = true;
			// make a request to the refresh token api in the backend to get the api.
			try {
				const response = await axios.get(`${backendLink}auth/refresh`, {
					headers: {
						Authorization: `Bearer ${getRefreshToken()}`,
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				});
				const { token } = response.data;
				setToken(token);
				originalRequest.headers.Authorization = `Bearer ${token}`;
				return axios(originalRequest);
			} catch (error) {
				setRedirectLink(window.location.href);
				//return window.location.assign(Approutes.auth.initial)
				return Promise.reject(error);
			}
		}
		//return window.location.assign(Approutes.auth.initial)
		return Promise.reject(error);
	}
);

// export default privateAxios;
