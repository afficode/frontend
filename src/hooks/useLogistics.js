import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { backendLink } from '../constants';

export const useLogisticsRegister = () => {
	const register = (data) =>
		axios.post(`${backendLink}logistic/register`, data).then((res) => res?.data);

	return useMutation(['logistics-register'], register);
};

export const useLogisticsLogin = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data) => {
			const response = await axios.post(`${backendLink}logistic/login`, data);
			return response.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['logistics']);
		},
	});
};

export const useGetOrders = () => {
	return useQuery('orders', async () => {
		const response = await axios.get(`${backendLink}logistic/orders`);
		return response.data;
	});
};
