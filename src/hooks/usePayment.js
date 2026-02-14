import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { backendLink } from '../constants';
import { privateAxios } from '../utils';

export const useBanks = () => {
    const fetchBanks = () => axios.get(`${backendLink}api/banks`).then((res) => res?.data);

    return useQuery('all-banks', fetchBanks, {
        staleTime: 60 * 60 * 1000, // 1 hour
        cacheTime: 2 * 60 * 60 * 1000, // 2 hours
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false,
    });
};

export const useTransactions = (params) => {
    const fetchTransactions = () =>
        privateAxios.get('payment/transactions', { params }).then((res) => res?.data);

    return useQuery(['all-transactions', params], fetchTransactions, {
        staleTime: Infinity,
        cacheTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false,
    });
};

export const useDeposit = () => {
    const deposit = (data) =>
        privateAxios.post(`${backendLink}payment/deposit`, data).then((res) => res?.data);

    return useMutation(['deposit'], deposit);
};

export const useWithdraw = () => {
    const withdraw = (data) => privateAxios.post('payment/withdraw', data).then((res) => res?.data);

    return useMutation(['withdraw'], withdraw);
};

export const useAddBankAccount = () => {
    const addBankAccount = (data) =>
        privateAxios.post(`${backendLink}payment/add_bank_account`, data).then((res) => res?.data);

    return useMutation(['add-bank-account'], addBankAccount);
};

export const useAccountBalance = () => {
    const fetchAccountBalance = () => privateAxios.get('payment/account').then((res) => res.data);

    return useQuery(['account-balance'], fetchAccountBalance, {
        staleTime: Infinity,
        cacheTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false,
    });
};

export const useFetchPayouts = () => {
    const fetchPayouts = () => privateAxios.get('payment/payouts').then((res) => res?.data);

    return useQuery(['payouts'], fetchPayouts, {
        staleTime: Infinity,
        cacheTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchInterval: false,
    });
};
