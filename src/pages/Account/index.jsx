import { useState } from 'react';

import Deposit from './Deposit';
import Withdraw from './Withdraw';

const Account = () => {
    const [transactionType] = useState('deposit');

    return (
        <div className='min-h-screen p-8'>
            <div>{transactionType === 'deposit' ? <Deposit /> : <Withdraw />}</div>
        </div>
    );
};

export default Account;
