import { useState } from 'react';
import { Button, InputGroup } from '../../ui';
import { useBuyCoin, useNotify } from '../../hooks';
import { useQueryClient } from 'react-query';
import { toMoney } from '../../utils';

const BuyToken = ({ setIsOpen }) => {
	const [formData, setFormData] = useState({
		coin_value: '',
	});

	const { mutate } = useBuyCoin();
	const queryClient = useQueryClient();

	const notify = useNotify();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		mutate(formData, {
			onSuccess: (data) => {
				queryClient.invalidateQueries('total-coin');
				setFormData(() => ({ coin_value: '' }));
				setIsOpen(() => false);
				notify(data?.message, 'success');
			},
			onError: (error) => {
				notify(error?.response?.data.message, 'error');
			},
		});
	};

	return (
		<div className="space-y-4 text-center">
			<form onSubmit={handleSubmit} className="px-4">
				<label htmlFor="coin_value" className="text-lg font-semibold">
					Enter token amount to buy
				</label>
				<InputGroup
					name={'coin_value'}
					id={'coin_value'}
					type={'number'}
					placeholder={'00'}
					value={formData.coin_value}
					onChange={handleChange}
				/>

				<Button
					variant={'secondary'}
					onClick={handleSubmit}
					disabled={formData.coin_value > 0 ? false : true}
					className={'mt-4'}
				>
					{' '}
					Pay <b>{formData.coin_value > 0 && `₦${toMoney(formData.coin_value * 1000, false)}`}</b>{' '}
				</Button>
			</form>
		</div>
	);
};

export default BuyToken;
