import { useQuery } from 'react-query';
import axios from 'axios';
import { backendLink } from '../constants';

export const useProduct = (params) => {
	const fetchProduct = () => axios.get(`${backendLink}ads`, { params }).then((res) => res?.data);

	return useQuery(['all-product', params], fetchProduct, {
		refetchOnWindowFocus: false,
		refetchInterval: 180000,
	});
};

export const fetchProduct = (ad_id) => {
	const fetchSingleProduct = () => axios.get(`${backendLink}ads/${ad_id}`)
	

	return useQuery(['fetch-product', ad_id], fetchSingleProduct, {
		refetchInterval: 180000,
	});
}

export const fetchCategorySummary = (cat_id)  => {
	const fetchCatSummary = () => axios.get(`${backendLink}ads/cat_summary/${cat_id}`).then((res) => res?.data);
	
	return useQuery(['fetchCatSummary', cat_id], fetchCatSummary, {
		refetchInterval: 5000,
	})
}