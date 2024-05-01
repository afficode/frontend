import { useState } from 'react';
import BuyToken from './BuyToken';
import TokenInfo from './TokenInfo';

const TokenPurchase = () => {
	const [stage, setStage] = useState(1);
	return (
		<div>
			{stage === 1 && <TokenInfo setStage={setStage} />}
			{stage === 2 && <BuyToken />}
			{/* {stage === 3 && (

			)} */}
		</div>
	);
};

export default TokenPurchase;
