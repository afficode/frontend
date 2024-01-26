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

export const fetchStates = () => {
        const states = () => axios.get(`${backendLink}api/states`).then((res) => res?.data);;

        return useQuery('states', states, {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchInterval: false
  });
}

export const fetchLGA = () => {
        const lga = () => axios.get(`${backendLink}api/lga`).then((res) => res?.data);;
        return useQuery('lga', lga, {
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                refetchInterval: false
  });
}