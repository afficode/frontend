import { useMutation } from 'react-query';
import { backendLink } from '../constants';
import { privateAxios } from '../utils';

const useEscrow = () => {
	const pay = (data) => privateAxios.post(`${backendLink}escrow/pay`, data).then((res) => res?.data);

	return useMutation(['escrow-pay'], pay);
};

export default useEscrow;
