import { useState } from 'react';
import { Button, InputGroup } from '../../../../../ui';
import { useStates } from '../../../../../hooks';
import { toSelectOptions } from '../../../../../utils';

const Delivery = () => {
	const { data: states } = useStates();
	const statesOptions = toSelectOptions(states, 'states', 'Select your state');

	// boonfu delivery form for general products
	const [quoteFormData, setQuoteFormData] = useState({
		seller_address: '',
		buyer_address: '',
		buyer_state: '',
		buyer_name: '',
		buyer_phone: '',
		delivery_type: '',
		note: '',
	});

	const handleQuoteFormChange = (e) => {
		const { name, value } = e.target;
		setQuoteFormData({ ...quoteFormData, [name]: value });
	};

	const handleQuoteFormSubmit = (e) => {
		e.preventDefault();
		// console.log(quoteFormData);

		setQuoteFormModalOpen(false);
		setQuoteModalOpen(true);
	};

	return (
		<div>
			<div className="mb-2">
				Please enter in your location and other details for this delivery service.
			</div>
			<form autoComplete="off" className="flex flex-col space-y-4" onSubmit={handleQuoteFormSubmit}>
				<label htmlFor="seller_address" className="flex flex-col font-medium">
					<span className="flex items-center ">
						<b className="pr-2">From: </b> Seller’s address
					</span>
					<InputGroup
						type="text"
						name="seller_address"
						id="seller_address"
						autoComplete={'off'}
						placeholder="Amuwo-odofin"
						className={'w-full '}
						value={quoteFormData.seller_address}
						onChange={handleQuoteFormChange}
					/>
				</label>
				<label htmlFor="buyer_address" className="flex flex-col font-medium">
					<span className="flex items-center ">
						<b className="pr-2">To: </b> Buyer’s address
					</span>
					<InputGroup
						type="text"
						name="buyer_address"
						id="buyer_address"
						autoComplete={'off'}
						className={'w-full '}
						placeholder="Lekki Phase 1"
						value={quoteFormData.buyer_address}
						onChange={handleQuoteFormChange}
					/>
				</label>
				<label htmlFor="buyer_state" className="flex flex-col font-medium">
					State
					<InputGroup
						name="buyer_state"
						id="buyer_state"
						type={'select'}
						autoComplete={'off'}
						className={'mt-0'}
						optionLists={statesOptions}
						value={quoteFormData.buyer_state}
						onChange={handleQuoteFormChange}
					/>
				</label>
				<label htmlFor="buyer_name" className="flex flex-col font-medium">
					Buyer's name
					<InputGroup
						type="text"
						name="buyer_name"
						id="buyer_name"
						autoComplete={'off'}
						className={'w-full '}
						placeholder="Mr Kunle Kalejaiye"
						value={quoteFormData.buyer_name}
						onChange={handleQuoteFormChange}
					/>
				</label>
				<label htmlFor="buyer_phone" className="flex flex-col font-medium">
					Buyer's Phone Number
					<InputGroup
						type="number"
						name="buyer_phone"
						id="buyer_phone"
						autoComplete={'off'}
						className={'w-full '}
						placeholder="+234 803 xxxxxxxx"
						value={quoteFormData.buyer_phone}
						onChange={handleQuoteFormChange}
					/>
				</label>
				<div className="flex flex-col font-medium">
					Delivery type
					<div className="flex px-2 gap-6 items-center">
						<label htmlFor="delivery_type_express" className="flex items-center gap-2">
							<input
								type="radio"
								name="delivery_type"
								id="delivery_type_express"
								option={[
									{ key: 'Express', value: 'express' },
									{ key: 'Normal', value: 'normal' },
								]}
								value={'express'}
								checked={quoteFormData.delivery_type === 'express'}
								onChange={handleQuoteFormChange}
							/>
							Express
						</label>
						<label htmlFor="delivery_type_normal" className="flex items-center gap-2">
							<input
								type="radio"
								name="delivery_type"
								id="delivery_type_normal"
								option={[
									{ key: 'Express', value: 'express' },
									{ key: 'Normal', value: 'normal' },
								]}
								value={'normal'}
								checked={quoteFormData.delivery_type === 'normal'}
								onChange={handleQuoteFormChange}
							/>
							Normal
						</label>
					</div>
				</div>
				<label htmlFor="note" className="flex flex-col font-medium">
					Leave a note
					<textarea
						type="text"
						name="note"
						id="note"
						value={quoteFormData.note}
						onChange={handleQuoteFormChange}
						rows={4}
						cols={10}
					/>
				</label>

				<Button type="submit" variant={'primary'} size={'small'}>
					Get a Quote
				</Button>
			</form>
		</div>
	);
};

export default Delivery;
