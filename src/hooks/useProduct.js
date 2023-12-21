import { useQuery } from 'react-query';
import axios from 'axios';
import { backendLink } from '../constants';

export const useProduct = () => {
	const fetchProduct = () => axios.get(`${backendLink}ads`).then((res) => res?.data);

	return useQuery('all-product', fetchProduct, {
		refetchInterval: 120000
	});
};

export const fetchProduct = (ad_id) => {
	const fetchSingleProduct = () => axios.get(`${backendLink}ads/${ad_id}`).then((res) => res?.data);

	return useQuery(['fetch-product', ad_id], fetchSingleProduct, {
		refetchInterval: 180000
	});
}