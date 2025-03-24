<<<<<<< HEAD
import { useMutation, useQuery } from 'react-query';
import { backendLink } from '../constants';
import { privateAxios } from '../utils';

export const useEscrow = () => {
=======
import { useMutation } from 'react-query';
import { backendLink } from '../constants';
import { privateAxios } from '../utils';

const useEscrow = () => {
>>>>>>> 695d2806c863dc99c939ab728928d749cac899a3
	const pay = (data) => privateAxios.post(`${backendLink}escrow/pay`, data).then((res) => res?.data);

	return useMutation(['escrow-pay'], pay);
};

<<<<<<< HEAD
export const useSendOrder = () => {
	const sendOrder = (data) =>
		privateAxios.post(`${backendLink}order`, data).then((res) => res?.data);

	return useMutation(['send-order'], sendOrder);
};

export const useGetOrders = () => {
	const fetchOrders = () => privateAxios.get(`${backendLink}order`).then((res) => res?.data);

	return useQuery('all-orders', fetchOrders, {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchInterval: false,
	});
};
=======
export default useEscrow;
>>>>>>> 695d2806c863dc99c939ab728928d749cac899a3
