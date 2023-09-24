import { useQuery } from 'react-query';
import axios from 'axios';

const useCategories = () => {
	const fetchCategories = () => axios.get(`${BASE_URL}/categories`).then((res) => res?.data);

	return useQuery('all-categories', fetchCategories);
};

export default useCategories;

const BASE_URL = 'http://109.237.25.252:4000';
