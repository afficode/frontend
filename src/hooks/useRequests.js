import { useMutation, useQuery, useQueryClient } from 'react-query';
import { backendLink } from '../constants';
import { api, privateAxios } from '../utils';

export const useGetRequests = (params) => {
    const getRequests = () => api.get(`${backendLink}request`, { params }).then((res) => res?.data);

    return useQuery(['get-requests', params], getRequests, {
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
    });
};

export const useGetUserRequests = (options) => {
    const getUserRequests = () =>
        privateAxios.get(`${backendLink}request/user`).then((res) => res?.data);

    return useQuery(['get-user-requests'], getUserRequests, {
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchInterval: false,
        refetchIntervalInBackground: false,
        ...options,
    });
};

export const useGetRequest = (requestId, options) => {
    const getRequest = () =>
        privateAxios.get(`${backendLink}request/${requestId}`).then((res) => res?.data);

    return useQuery(['get-request', requestId], getRequest, {
        ...options,
    });
};

export const useAddRequest = () => {
    const queryClient = useQueryClient();

    const addRequest = (data) =>
        privateAxios.post(`${backendLink}request`, data).then((res) => res?.data);

    return useMutation(['add-request'], addRequest, {
        onSuccess: () => {
            queryClient.invalidateQueries(['get-requests']);
            queryClient.invalidateQueries(['get-user-requests']);
        },
    });
};

export const useUpdateRequest = (requestId) => {
    const queryClient = useQueryClient();

    const updateRequest = (data) =>
        privateAxios.put(`${backendLink}request/${requestId}`, data).then((res) => res?.data);

    return useMutation(['update-request', requestId], updateRequest, {
        onSuccess: () => {
            queryClient.invalidateQueries(['get-requests']);
            queryClient.invalidateQueries(['get-request', requestId]);
            queryClient.invalidateQueries(['get-user-requests']);
        },
    });
};

export const useDeleteRequest = (requestId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (requestId) =>
            privateAxios.delete(`${backendLink}request/${requestId}`).then((res) => res?.data),
        onSuccess: () => {
            queryClient.invalidateQueries(['get-user-requests']);
            queryClient.invalidateQueries(['get-request', requestId]);
            queryClient.invalidateQueries(['get-requests']);
        },
    });
};

// discussions apis
export const useGetInteractions = (options) => {
    const getInteractions = () =>
        privateAxios.get(`${backendLink}interaction/user`).then((res) => res?.data);

    return useQuery(['get-interactions'], getInteractions, {
        ...options,
    });
};

export const useGetInteraction = (request_id, options) => {
    const getInteraction = () =>
        privateAxios
            .get(`${backendLink}interaction/request/${request_id}`)
            .then((res) => res?.data);

    return useQuery(['get-interaction', request_id], getInteraction, {
        retry: false,
        ...options,
    });
};

export const useCreateInteraction = (request_id) => {
    const queryClient = useQueryClient();

    const createInteraction = (data) =>
        privateAxios.post(`${backendLink}interaction/${request_id}`, data).then((res) => res?.data);

    return useMutation(['create-interaction'], createInteraction, {
        onSuccess: () => {
            queryClient.invalidateQueries(['get-interactions']);
            queryClient.invalidateQueries(['get-interaction', request_id]);
        },
    });
};

export const useSendDiscussion = () => {
    const queryClient = useQueryClient();
    const sendDiscussion = (data) =>
        privateAxios.post(`${backendLink}discussion`, data).then((res) => res?.data);

    return useMutation(['send-discussion'], sendDiscussion, {
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries([
                'get-discussion',
                variables?.interaction_id ?? variables?.get?.('interaction_id'),
            ]);
        },
    });
};

export const useGetDiscussion = (interaction_id, options) => {
    const getDiscussion = () =>
        privateAxios.get(`${backendLink}discussion/${interaction_id}`).then((res) => res?.data);

    return useQuery(['get-discussion', interaction_id], getDiscussion, {
        ...options,
    });
};
