import { useMutation, useQuery } from 'react-query';
import { backendLink } from '../constants';
import { privateAxios } from '../utils';

export const useEscrow = () => {
    const pay = (data) => privateAxios.post(`${backendLink}escrow/pay`, data).then((res) => res?.data);

    return useMutation(['escrow-pay'], pay);
};

export const useGetOrders = () => {
    const fetchOrders = () => privateAxios.get(`${backendLink}order`).then((res) => res?.data);

    return useQuery('all-orders', fetchOrders, {
        refetchOnWindowFocus: true,
        refetchOnMount: true,
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

export const useGetEscrowDetails = (id) => {
    const getEscrowDetails = () =>
        privateAxios.get(`${backendLink}escrow/pickup_details/${id}`).then((res) => res?.data);

    return useQuery(['get-details', id], getEscrowDetails, {
        refetchInterval: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        enabled: !!id,
    });
};

export const useCheckOrder = (ad_id, options) => {
    const checkOrder = () => privateAxios.get(`${backendLink}order/ad/${ad_id}`).then((res) => res);

    return useQuery(['check-order', ad_id], checkOrder, {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchInterval: false,
        ...options,
    });
};

export const useRequestOtp = () => {
    const request = (data) =>
        privateAxios.post(`${backendLink}otp/request`, data).then((res) => res?.data);

    return useMutation(['request-otp'], request);
};

export const useEscrowRelease = () => {
    const release = (data) =>
        privateAxios.post(`${backendLink}escrow/release`, data).then((res) => res?.data);

    return useMutation(['escrow-release'], release);
};

export const useRefund = (id) => {
    const refund = (data) =>
        privateAxios.post(`${backendLink}escrow/refund/${id}`, data).then((res) => res?.data);

    return useMutation(['refund'], refund);
};
