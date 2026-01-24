import { useQuery, useMutation, useQueryClient } from 'react-query';
import { privateAxios } from '../utils';
import { backendLink } from '../constants';

const CACHE_CONFIG = {
	staleTime: Infinity, // Never auto-refresh, only on invalidation
	cacheTime: 30 * 60 * 1000, // Keep in cache for 30 minutes after unmount
	refetchOnWindowFocus: false,
	refetchOnMount: false,
	refetchInterval: false,
	refetchIntervalInBackground: false,
};

export const getSaves = (enable = false) => {
	const getSaved = () => privateAxios.get(`${backendLink}ads/saves`).then((res) => res?.data);

	return useQuery('saved', getSaved, {
		enabled: enable,
		...CACHE_CONFIG,
	});
};

export const saveAd = () => {
	const queryClient = useQueryClient();

	const saveAd = (ads_id) => privateAxios.post(`ads/saveAd`, ads_id).then((res) => res?.data);

	return useMutation(['saveAd'], saveAd, {
		onSuccess: () => {
			queryClient.invalidateQueries('saved');
		},
	});
};

export const unSaveAd = async ({ queryKey }) => {
	const [_, ads_id] = queryKey;
	return await privateAxios.get(`ads/unSaveAd?ads_id=${ads_id}`).then((res) => res?.data);
};

// DONE: Unsave all Ads
export const unSaveAll = async () => {
	return await privateAxios.get(`ads/unSaveAll`).then((res) => res?.data);
};
