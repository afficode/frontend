import { useQuery, useMutation } from 'react-query';
import { privateAxios } from '../utils';
import { backendLink } from '../constants';

export const useCreateSchedule = () => {
    const createSchedule = (schedule) => privateAxios.post(`${backendLink}schedule`, schedule).then((res) => res?.data);

    return useMutation(['create-schedule'], createSchedule);
};

export const useUpdateSchedule = (schedule_id) => {
    const updateSchedule = (schedule) => privateAxios.put(`${backendLink}schedule/${schedule_id}`, schedule).then((res) => res?.data);

    return useMutation(['update-schedule', schedule_id], updateSchedule);
};

export const useGetSchedules = (options) => {
    const getSchedules = () => privateAxios.get(`${backendLink}schedule`).then((res) => res?.data);

    return useQuery(['get-schedules'], getSchedules, {
        refetchInterval: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        ...options,
    });
};

export const useGetSchedule = (ad_id, options) => {
    const getSchedule = () => privateAxios.get(`${backendLink}schedule/${ad_id}`).then((res) => res?.data);

    return useQuery(['get-schedule', ad_id], getSchedule, {
        refetchInterval: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        ...options,
    });
};

export const useGetAdsSchedule = (ad_id) => {
    const getAdsSchedule = () => privateAxios.get(`${backendLink}schedule/ad/${ad_id}`).then((res) => res?.data);

    return useQuery(['get-ads-schedule', ad_id], getAdsSchedule, {
        refetchInterval: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    });
};
