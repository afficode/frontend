import { useQuery, useMutation, useQueryClient } from 'react-query';
import { privateAxios } from '../utils';
import { backendLink } from '../constants';

const CACHE_CONFIG = {
    staleTime: Infinity,
    cacheTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
};

export const useGrabAd = () => {
    const queryClient = useQueryClient();

    const grabAd = (ad) => privateAxios.post(`${backendLink}grab`, ad).then((res) => res?.data);

    return useMutation(['grab-ad'], grabAd, {
        onSuccess: () => {
            queryClient.invalidateQueries(['get-grabs']);

            queryClient.invalidateQueries(['grab-dashboard']);
        },
    });
};

export const useGetGrabs = () => {
    const getGrabs = () => privateAxios.get(`${backendLink}grab`).then((res) => res?.data);

    return useQuery(['get-grabs'], getGrabs, CACHE_CONFIG);
};

export const useGrabDashboard = () => {
    const grabDashboard = () =>
        privateAxios.get(`${backendLink}grab/dashboard`).then((res) => res?.data);

    return useQuery(['grab-dashboard'], grabDashboard, CACHE_CONFIG);
};

export const useInspectionUpdate = () => {
    const inspectionUpdate = (data) => privateAxios.post(`${backendLink}grab/payment_request`, data).then((res) => res?.data);

    return useMutation(['inspection-update'], inspectionUpdate);
};