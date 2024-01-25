import { useQuery } from 'react-query';
import axios from 'axios';
import { backendLink } from '../constants';

export const useCategories = () => {
	const fetchCategories = () => axios.get(`${backendLink}categories`).then((res) => res?.data);

	return useQuery('all-categories', fetchCategories);
};

export const useSubCategories = (category_id) => {
	const fetchSubCategories = () =>
		axios.get(`${backendLink}categories/${category_id}/subcategories`).then((res) => res?.data);

	return useQuery(['subcategories', category_id], fetchSubCategories);
};

export const useCategory = (id) => {
	const fetchCategory = () => axios.get(`${backendLink}categories/${id}`).then((res) => res?.data);

	return useQuery(['category', id], fetchCategory);
};
