import { useState } from 'react';

import Deposit from './Deposit';
import Withdraw from './Withdraw';
import { ArrowDownWhite } from '../../assets/svgs';

const Account = () => {
	const [transactionType, setTransactionType] = useState('deposit');

	return (
		<div className="min-h-screen p-8">
			<div>{transactionType === 'deposit' ? <Deposit /> : <Withdraw />}</div>
		</div>
	);
};

export default Account;
