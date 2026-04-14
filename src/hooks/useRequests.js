import { useMutation, useQuery, useQueryClient } from "react-query";
import { backendLink } from "../constants";
import { api, privateAxios } from "../utils";

export const useGetRequests = () => {
    const getRequests = () => api.get(`${backendLink}request`).then((res) => res?.data);

    return useQuery(['get-requests'], getRequests, {
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000, 
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
    });
};

export const useGetUserRequests = () => {
    const getUserRequests = () => privateAxios.get(`${backendLink}request/user`).then((res) => res?.data);

    return useQuery(['get-user-requests'], getUserRequests, {
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000, 
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
    });
};

export const useGetRequest = (requestId) => {
    const getRequest = () => privateAxios.get(`${backendLink}request/${requestId}`).then((res) => res?.data);

    return useQuery(['get-request', requestId], getRequest);
};

export const useAddRequest = () => {
    const addRequest = (data) =>
        privateAxios.post(`${backendLink}request`, data).then((res) => res?.data);

    return useMutation(['add-request'], addRequest);
};

export const useUpdateRequest = (requestId) => {
    const queryClient = useQueryClient()

    const updateRequest = (data) =>
        privateAxios.put(`${backendLink}request/${requestId}`, data).then((res) => res?.data);

    return useMutation(['update-request', requestId], updateRequest, {
         onSuccess: () => {
            queryClient.invalidateQueries(['get-request', requestId]);
            queryClient.invalidateQueries(['get-user-request']);
        },
    });
};

export const useDeleteRequest = (requestId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (requestId) => privateAxios.delete(`${backendLink}request/${requestId}`).then((res) => res?.data),
        onSuccess: () => {
            queryClient.invalidateQueries(['get-user-requests']);
            queryClient.invalidateQueries(['get-request', requestId]);
            queryClient.invalidateQueries(['get-requests']);
        },
    });
};
