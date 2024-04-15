import { useQuery, useMutation } from 'react-query';
import { privateAxios } from '../utils';
import { backendLink } from '../constants';

export const useCreateAd = () => {
	const createAd = (ad) => privateAxios.post(`${backendLink}ads`, ad).then((res) => res?.data);

	return useMutation(['creatAd'], createAd);
};

export const useUpdateAd = (adId) => {
	const updateAd = (ad) =>
		privateAxios.put(`${backendLink}ads/${adId}`, ad).then((res) => res?.data);

	return useMutation(['updateAd', adId], updateAd);
};

export const useGetAds = () => {
	const getAds = () => privateAxios.get(`${backendLink}ads`).then((res) => res?.data);

	return useQuery(['getAds'], getAds);
};

export const useGetAd = (id) => {
	const getAd = () => privateAxios.get(`${backendLink}ads/${id}`).then((res) => res?.data);

	return useQuery(['getAd', id], getAd);
};

export const useMyAds = () => {
	const getUserAds = () => privateAxios.get(`${backendLink}ads/user`).then((res) => res?.data);

	return useQuery(['getUserAds'], getUserAds);
};

export const useFeedback = (endpoint) => {
	const createFeedback = (feedback) => privateAxios.post(`${backendLink}ads/${endpoint}`, feedback).then(res => res?.data);
	
	return useMutation(['createFeedback'], createFeedback);
}

export const fetchFeedbacks = (ads_id, enable = false) => {
	const getFeedbacks = () => privateAxios.get(`ads/feedback/${ads_id}`);

	return useQuery(["feedbacks", ads_id], getFeedbacks, {
		enabled: enable
	})
}