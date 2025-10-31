import { useState } from 'react';
import BuyToken from './BuyToken';
import TokenInfo from './TokenInfo';
import { Modal } from '../../ui';

const TokenPurchase = ({ isOpen, setIsOpen }) => {
	const [stage, setStage] = useState(1);
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen} className="!w-max">
			<div>
				{stage === 1 && <TokenInfo setStage={setStage} />}
				{stage === 2 && <BuyToken isOpen={isOpen} setIsOpen={setIsOpen} />}
				{/* {stage === 3 && (

			)} */}
			</div>
		</Modal>
	);
};

export default TokenPurchase;
