import { useQuery, useMutation, useQueryClient } from 'react-query';
import { privateAxios } from '../utils';
import { backendLink } from '../constants';

export const useCreateAd = () => {
	const queryClient = useQueryClient();
	const createAd = (ad) => privateAxios.post(`${backendLink}ads/`, ad).then((res) => res?.data);

	return useMutation(['createAd'], createAd, {
		onSuccess: () => {
			queryClient.invalidateQueries(['getUserAds']);
		},
	});
};

export const useUpdateAd = (adId) => {
	const queryClient = useQueryClient();

	const updateAd = (ad) =>
		privateAxios.put(`${backendLink}ads/${adId}`, ad).then((res) => res?.data);

	return useMutation(['updateAd', adId], updateAd, {
		onSuccess: () => {
			queryClient.invalidateQueries(['getAd', adId]);
			queryClient.invalidateQueries(['getUserAds']);
		},
	});
};

export const useGetAds = () => {
	const getAds = () => privateAxios.get(`${backendLink}ads`).then((res) => res?.data);

	return useQuery(['getAds'], getAds, {
		staleTime: 5 * 60 * 1000,
		cacheTime: 10 * 60 * 1000, // 10 minutes
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchInterval: false,
		refetchIntervalInBackground: false,
	});
};

export const useGetAd = (id) => {
	const getAd = () => privateAxios.get(`${backendLink}ads/${id}`).then((res) => res?.data);

	return useQuery(['getAd', id], getAd, {
		staleTime: 5 * 60 * 1000, // 5 minutes
		cacheTime: 10 * 60 * 1000, // 10 minutes
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchInterval: false,
		refetchIntervalInBackground: false,
		enabled: !!id,
	});
};

export const useMyAds = () => {
	const getUserAds = () => privateAxios.get(`${backendLink}ads/user`).then((res) => res?.data);

	return useQuery(['getUserAds'], getUserAds, {
		staleTime: Infinity,
		cacheTime: 30 * 60 * 1000,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchInterval: false,
		refetchIntervalInBackground: false,
	});
};

export const useFeedback = (endpoint) => {
	const queryClient = useQueryClient();

	const createFeedback = (feedback) =>
		privateAxios.post(`${backendLink}ads/${endpoint}`, feedback).then((res) => res?.data);

	return useMutation(['createFeedback'], createFeedback, {
		onSuccess: (_, variables) => {
			// Invalidate feedbacks for the specific ad
			if (variables.ads_id) {
				queryClient.invalidateQueries(['feedbacks', variables.ads_id]);
			}
		},
		refetchInterval: false,
		refetchOnWindowFocus: false,
		refetchIntervalInBackground: false,
	});
};

export const fetchFeedbacks = (ads_id, enable = false) => {
	const getFeedbacks = () => privateAxios.get(`ads/feedback/${ads_id}`);

	return useQuery(['feedbacks', ads_id], getFeedbacks, {
		enabled: enable && !!ads_id,
		staleTime: Infinity,
		cacheTime: 30 * 60 * 1000,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchInterval: false,
		refetchIntervalInBackground: false,
	});
};

export const fetchRemarks = (ads_id, enabled = false) => {
	const getRemarks = () => privateAxios.get(`ads/remarks/${ads_id}`);
	return useQuery(['remarks', ads_id], getRemarks, {
		enabled: enabled && !!ads_id,
		staleTime: Infinity, // Never auto-refresh, only on invalidation
		cacheTime: 30 * 60 * 1000, // Keep in cache for 30 minutes after unmount
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchInterval: false,
		refetchIntervalInBackground: false,
	});
};

export const postRemark = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (remark) =>
			privateAxios.post('/ads/user/remark', remark, {
				onSuccess: (_, variables) => {
					// Invalidate remarks for the specific ad
					if (variables.ads_id) {
						queryClient.invalidateQueries(['remarks', variables.ads_id]);
					}
				},
			}),
	});
};

export const deleteAd = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (ads_id) => privateAxios.delete(`/ads/${ads_id}`).then((res) => res?.data),
		onSuccess: (data, ads_id) => {
			queryClient.invalidateQueries(['getUserAds']);
			queryClient.invalidateQueries(['getAd', ads_id]);
			queryClient.invalidateQueries(['getAds']);
		},
	});
};
