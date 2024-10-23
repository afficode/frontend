import { toMoney } from '../../utils';
import { Button } from '../../ui';
import { useTotalCoin } from '../../hooks';

const TokenInfo = ({ setStage }) => {
	const { data } = useTotalCoin();

	return (
		<div className="space-y-4 text-center">
			<h4>
				You currently have <b>{data?.coin.token}</b> token
			</h4>
			<h6>
				To buy more token, click the button below. <br />
				<b> Note: 0.5 token = ₦{toMoney(500)}</b> <br />
				<b> 1 token = ₦{toMoney(1000)}</b>
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
