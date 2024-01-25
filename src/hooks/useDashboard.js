import { useQuery } from 'react-query';
import { privateAxios } from '../utils';

export const useUserAds = () => {
	const fetchUserAds = () => privateAxios.get('/dashboard').then((res) => res?.data);

	return useQuery('user-ads', fetchUserAds);
};
