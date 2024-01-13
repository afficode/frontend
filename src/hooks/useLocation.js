import { useQuery } from 'react-query';
import axios from 'axios';
import { backendLink } from '../constants';

export const useStates = () => {
	const fetchStates = () => axios.get(`${backendLink}api/states`).then((res) => res?.data);

	return useQuery('all-states', fetchStates);
};

export const useLga = (state_id) => {
	// console.log(state_id);
	const fetchLga = () => axios.get(`${backendLink}api/lga/${state_id}`).then((res) => res?.data);

	return useQuery(['all-lga', state_id], fetchLga);
};
