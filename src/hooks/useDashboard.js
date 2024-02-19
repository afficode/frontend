import { useQuery } from 'react-query';
import { privateAxios } from '../utils';

export const useUserAds = (params) => {
	const fetchUserAds = () => privateAxios.get('/dashboard', { params }).then((res) => res?.data);

	return useQuery(['user-ads', params], fetchUserAds);
};
