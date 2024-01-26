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
