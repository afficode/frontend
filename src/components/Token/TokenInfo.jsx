import React, { useEffect } from 'react';
import { privateAxios, toMoney } from '../../utils';
import { Button } from '../../ui';
import { backendLink } from '../../constants';

const TokenInfo = ({ setStage }) => {
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const res = await privateAxios.get(`${backendLink}token/total_coin`);
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="space-y-4 text-center">
			<h4>
				You currently have <b>10x</b> token
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
