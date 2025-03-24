import axios from 'axios';
import { useMutation } from 'react-query';
import { backendLink } from '../constants';

export const useLogisticsSignup = () => {
	const register = (data) =>
		axios.post(`${backendLink}logistics/register`, data).then((res) => res?.data);

	return useMutation(['logistics-register'], register);
};

export const useLogisticsLogin = () => {
	const login = (data) => axios.post(`${backendLink}logistics/login`, data).then((res) => res?.data);

	return useMutation(['logistics-login'], login);
};
