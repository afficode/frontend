import { useMutation, useQuery } from 'react-query';
import { backendLink } from '../constants';
import { privateAxios } from '../utils';

export const useEscrow = () => {
	const pay = (data) => privateAxios.post(`${backendLink}escrow/pay`, data).then((res) => res?.data);

	return useMutation(['escrow-pay'], pay);
};

export const useQuotedPay = (id) => {
	const pay = (data) =>
		privateAxios.post(`${backendLink}order/pay/${id}`, data).then((res) => res?.data);

	return useMutation(['quoted-pay'], pay);
};

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

export const useGetOrder = (id) => {
	const getOrder = () => privateAxios.get(`${backendLink}order/${id}`).then((res) => res?.data);

	return useQuery(['get-order', id], getOrder, {
		refetchInterval: false,
		refetchOnWindowFocus: false,
		refetchIntervalInBackground: false,
	});
};

export const useCheckOrder = (ad_id) => {
	const checkOrder = () => privateAxios.get(`${backendLink}order/ad/${ad_id}`).then((res) => res);

	return useQuery(['check-order', ad_id], checkOrder, {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchInterval: false,
	});
};
