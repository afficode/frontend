import { useQuery, useMutation } from 'react-query';
import { privateAxios } from '../utils';

export const useUserAds = (params) => {
    const fetchUserAds = () => privateAxios.get('/dashboard', { params }).then((res) => res?.data);

    return useQuery(['user-ads', params], fetchUserAds, {
        refetchInterval: false,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: false,
    });
};

export const useVerifyPhoneNumber = (method) => {
    const sendPhoneNumberCode = (data) =>
        privateAxios[method]('auth/verify_phone', data).then((res) => res?.data);

    return useMutation(['verify-phone-number'], sendPhoneNumberCode);
};
