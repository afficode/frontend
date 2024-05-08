import { useState } from 'react';
import { Button, InputGroup } from '../../ui';
import { privateAxios } from '../../utils';
import { Approutes, frontendLink } from '../../constants';


const BuyToken = () => {
	const [formData, setFormData] = useState({
		amount: '',
	});

	const handleChnage = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await privateAxios.post('/token/purchase', {
				...formData,
				amount: parseInt(formData.amount),
			});

			const data = res?.data;
			window.location.replace(data.url);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="space-y-4 text-center">
			<form onSubmit={handleSubmit}>
				<label htmlFor="amount" className="text-lg font-semibold">
					Enter amount to buy
				</label>
				<InputGroup
					name={'amount'}
					type={'number'}
					placeholder={'₦000'}
					value={formData.amount}
					onChange={handleChnage}
				/>

				<Button
					variant={'secondary'}
					onClick={handleSubmit}
					disabled={formData.amount > 0 ? false : true}
					className={'mt-4'}
				>
					{' '}
					Buy <b>{formData.amount > 0 && `${formData.amount / 1000}`}</b> token(s){' '}
				</Button>
			</form>
		</div>
	);
};

export default BuyToken;
