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

export const useStates = () => {
	const fetchStates = () => axios.get(`${backendLink}api/states`).then((res) => res?.data);

	return useQuery('all-states', fetchStates, CACHE_CONFIG);
};

export const useLga = (state_id) => {
	const fetchLga = () => axios.get(`${backendLink}api/lga/${state_id}`).then((res) => res?.data);

	return useQuery(['all-lga', state_id], fetchLga, {
		...CACHE_CONFIG,
		enabled: !!state_id,
	});
};

export const fetchStates = () => {
	const states = () => axios.get(`${backendLink}api/states`).then((res) => res?.data);

	return useQuery('states', states, CACHE_CONFIG);
};

export const fetchLGA = () => {
	const lga = () => axios.get(`${backendLink}api/lga`).then((res) => res?.data);
	return useQuery('lga', lga, CACHE_CONFIG);
};
