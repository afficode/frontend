import { useQuery } from 'react-query';
import axios from 'axios';
import { backendLink } from '../constants';

const useCategories = () => {
	const fetchCategories = () => axios.get(`${backendLink}categories`).then((res) => res?.data);

	return useQuery('all-categories', fetchCategories, {
		refetchInterval: false
	});
};

export default useCategories;