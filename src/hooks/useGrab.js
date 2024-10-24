import { useQuery, useMutation } from 'react-query';
import { privateAxios } from '../utils';
import { backendLink } from '../constants';

export const useGrabAd = () => {
	const grabAd = (ad) => privateAxios.post(`${backendLink}grab`, ad).then((res) => res?.data);

	return useMutation(['grab-ad'], grabAd);
};

export const useGetGrabs = () => {
	const getGrabs = () => privateAxios.get(`${backendLink}grab`).then((res) => res?.data);

	return useQuery(['get-grabs'], getGrabs, {
		refetchInterval: false,
		refetchOnWindowFocus: false,
		refetchIntervalInBackground: false,
	});
};
