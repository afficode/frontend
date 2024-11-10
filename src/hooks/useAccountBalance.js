import { useMemo } from 'react';
import { useAccountBalance } from './usePayment';

const useBalance = () => {
	const { data } = useAccountBalance();

	const balance = useMemo(() => {
		return data?.account?.balance;
	}, [data]);

	return balance;
};

export default useBalance;
