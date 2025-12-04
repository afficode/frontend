import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { backendLink } from '../constants';
import { privateAxios } from '../utils';

export const useBanks = () => {
	const fetchBanks = () => axios.get(`${backendLink}api/banks`).then((res) => res?.data);

	return useQuery('all-banks', fetchBanks, {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchInterval: false,
	});
};

export const useTransactions = (params) => {
	const fetchTransactions = () =>
		privateAxios.get(`payment/transactions`, { params }).then((res) => res?.data);

	return useQuery(['all-transactions', params], fetchTransactions, {
		// staleTime: 1000 * 60 * 60, // 1 hour, or set it longer as needed
		// cacheTime: 1000 * 60 * 60 * 24, // Keep the data in the cache for 24 hours
		refetchOnWindowFocus: false, // Disable automatic refetching when the window is focused
		refetchOnReconnect: false,
		refetchOnMount: false,
		refetchInterval: false,
	});
};

export const useDeposit = () => {
	const deposit = (data) =>
		privateAxios.post(`${backendLink}payment/deposit`, data).then((res) => res?.data);

	return useMutation(['deposit'], deposit);
};

export const useWithdraw = () => {
	const withdraw = (data) => privateAxios.post(`payment/withdraw`, data).then((res) => res?.data);

	return useMutation(['withdraw'], withdraw);
};

export const useAddBankAccount = () => {
	const addBankAccount = (data) =>
		privateAxios.post(`${backendLink}payment/add_bank_account`, data).then((res) => res?.data);

	return useMutation(['add-bank-account'], addBankAccount);
};

export const useAccountBalance = () => {
	const fetchAccountBalance = () => privateAxios.get(`payment/account`).then((res) => res.data);

	return useQuery(['account-balance'], fetchAccountBalance, {
		// staleTime: 1000 * 60 * 60, // 1 hour, or set it longer as needed
		// cacheTime: 1000 * 60 * 60 * 24, // Keep the data in the cache for 24 hours
		refetchOnWindowFocus: false, // Disable automatic refetching when the window is focused
		refetchOnReconnect: false,
		refetchOnMount: false,
		refetchInterval: false,
	});
};
