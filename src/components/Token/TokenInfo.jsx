import { toMoney } from '../../utils';
import { Button } from '../../ui';
import { useTotalCoin } from '../../hooks';

const TokenInfo = ({ setStage }) => {
	const { data } = useTotalCoin();

	return (
		<div className="space-y-4 text-center">
			<h4>
				You currently have <b className="text-primary">{data?.coin.token}</b> token(s)
			</h4>
			<h6>
				To buy more token, click the button below. <br />
				<em className="text-secondary text-sm"> Note: 0.5 token = ₦{toMoney(500)}</em> <br />
				<em className="text-secondary text-sm"> 1 token = ₦{toMoney(1000)}</em>
			</h6>
			<div>
				<Button onClick={() => setStage(2)} variant={'secondary'} size={'small'}>
					Buy more
				</Button>
			</div>
		</div>
	);
};

export default TokenInfo;
