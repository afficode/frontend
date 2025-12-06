import { useQuery } from 'react-query';
import axios from 'axios';
import { backendLink } from '../constants';

const CACHE_CONFIG = {
	staleTime: 60 * 60 * 1000, // 1 hour - data stays fresh
	cacheTime: 2 * 60 * 60 * 1000, // 2 hours - keep in cache
	refetchOnWindowFocus: false,
	refetchOnMount: false,
	refetchOnReconnect: false,
	refetchInterval: false,
};

export const useCategories = () => {
	const fetchCategories = () => axios.get(`${backendLink}categories`).then((res) => res?.data);

	return useQuery('all-categories', fetchCategories, CACHE_CONFIG);
};

// export default useCategories;
export const useSubCategories = (category_id) => {
	const fetchSubCategories = () =>
		axios.get(`${backendLink}categories/${category_id}/subcategories`).then((res) => res?.data);

	return useQuery(['subcategories', category_id], fetchSubCategories, {
		...CACHE_CONFIG,
		enabled: !!category_id, // Only fetch if category_id exists
	});
};

export const useCategory = (id) => {
	const fetchCategory = () => axios.get(`${backendLink}categories/${id}`).then((res) => res?.data);

	return useQuery(['category', id], fetchCategory, {
		...CACHE_CONFIG,
		enabled: !!id,
	});
};
