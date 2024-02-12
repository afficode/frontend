import { useQuery } from 'react-query';
import { privateAxios } from '../utils';

export const useUserAds = (created_at) => {
	const fetchUserAds = () => privateAxios.get('/dashboard').then((res) => res?.data);

	return useQuery(['user-ads', created_at], fetchUserAds);
};
