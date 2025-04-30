import axios from 'axios';
import { backendLink } from '../constants';
import { api, privateAxios } from '../utils/axios';
import { useMutation } from 'react-query';

export const RegistrationHook = async (values, setSubmitting, endpoint) => {
	setSubmitting(true);
	let regStatus;
	await axios
		.post(`${backendLink}auth/${endpoint}`, values)
		.then(({ data }) => {
			regStatus = data;
		})
		.catch(({ response }) => {
			regStatus = { success: false, ...response.data, status: response.status };
		});
	return regStatus;
};

export const LoginHook = async (values, setSubmitting) => {
	setSubmitting(true);
	let userUpdate;
	await api
		.post(`auth/login`, values)
		.then(({ data }) => {
			if (data.success) {
				userUpdate = data;
			}
		})
		.catch(({ response }) => {
			userUpdate = { success: false, ...response.data };
		});
	return userUpdate;
};

export const TokenHook = async (values, endpoint, token, setSubmitting) => {
	setSubmitting !== undefined && setSubmitting(true);
	let returnData;
	await axios
		.post(`${backendLink}auth/${endpoint}`, values, {
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
		.then(({ data }) => {
			// success data gotten
			if (data.success) {
				returnData = data;
			}
		})
		.catch(({ response }) => {
			returnData = { success: false, ...response.data };
		});

	return returnData;
};

export const updateUserInfo = async () => {
	var returnedData;

	axios.post();
};

export const updateUserPassword = () => {
	const userPassword = (values) =>
		privateAxios.post(`${backendLink}auth/change_password`, values).then((res) => res?.data);

	return useMutation(['updateUserPassword'], userPassword);
};
