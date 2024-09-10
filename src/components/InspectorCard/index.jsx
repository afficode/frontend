import { useState } from 'react';
import { Inspector } from '../../assets/svgs';
import { Button, InputGroup } from '../../ui';

const InspectorCard = () => {
	const [formData, setFormData] = useState({
		response: '',
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(formData);
	};

	return (
		<div className="max-w-[500px] border  p-4">
			<div className="flex items-center justify-between">
				<h4 className="">Inspector:</h4>
				<img src={Inspector} alt="/" className="w-12" />
			</div>

			<div className="bg-secondary px-2 py-4 sm:p-4 rounded-lg italic	sm:mr-6">
				<div className="flex items-center gap-2">
					<p>From:</p>
					<p>Crystal gush</p>
				</div>

				<div className="flex items-center gap-2">
					<p>For:</p>
					<p>Black Toyota Corolla 2022 Inspection</p>
				</div>
				<div className="flex items-center gap-2">
					<p>Date:</p>
					<p> 29.10.2024</p>
				</div>
				<div className="flex items-center gap-2">
					<p>Time:</p>
					<p> 10am to 2pm</p>
				</div>
			</div>

			<div className=" border-t border-black/40 py-4 mt-4">
				<h4>Seller:</h4>
				<form onSubmit={handleSubmit}>
					<InputGroup
						name={'response'}
						type={'select'}
						label={'Select a response'}
						value={formData.response}
						onChange={handleChange}
						optionLists={responseOptions}
						className={'customSelectInput'}
					/>

					<Button variant={'primary'} type="submit" className={'rounded-lg'}>
						Send
					</Button>
				</form>
			</div>
		</div>
	);
};

export default InspectorCard;

const responseOptions = [
	{ value: '', key: 'Select a response' },
	{ value: 'Sold', key: 'Sold' },
	{ value: 'I confirm Date & Time', key: 'I confirm Date & Time' },
	{
		value: 'I am not available for this inspection ',
		key: 'I am not available for this inspection ',
	},
	{ value: 'Withdrawn from site', key: 'Withdrawn from site' },
	{ value: 'Price has changed', key: 'Price has changed' },
];
