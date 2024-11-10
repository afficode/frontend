import { useState } from 'react';
import BuyToken from './BuyToken';
import TokenInfo from './TokenInfo';

const TokenPurchase = ({ isOpen, setIsOpen }) => {
	const [stage, setStage] = useState(1);
	return (
		<div>
			{stage === 1 && <TokenInfo setStage={setStage} />}
			{stage === 2 && <BuyToken isOpen={isOpen} setIsOpen={setIsOpen} />}
			{/* {stage === 3 && (

			)} */}
		</div>
	);
};

export default TokenPurchase;
