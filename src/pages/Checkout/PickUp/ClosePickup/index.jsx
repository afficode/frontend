import React, { useRef, useState } from 'react';
import { CloseIcon, Location, ThankYou } from '../../../../assets/svgs';
import { Button, InputGroup } from '../../../../ui';
import { Link } from 'react-router-dom';
import { Approutes } from '../../../../constants';

const ClosePickup = () => {
	const stage = 5;
	const inputLength = 6;
	const [code, setCode] = useState(Array(inputLength).fill(''));
	const inputsRef = useRef([]);
	const [formData, setFormData] = useState({
		cancel_reason: '',
		other_reason: '',
	});

	// Handle single key press/change
	const handleOtpChange = (e, index) => {
		const value = e.target.value;

		// Allow only alphanumeric single character
		if (!/^[0-9a-zA-Z]{0,1}$/.test(value)) return;

		const newCode = [...code];
		newCode[index] = value;
		setCode(newCode);

		if (value && inputsRef.current[index + 1]) {
			inputsRef.current[index + 1].focus();
		}
	};

	// Handle key up to detect backspace and focus previous
	const handleKeyUp = (e, index) => {
		if (e.key === 'Backspace' && !code[index] && inputsRef.current[index - 1]) {
			inputsRef.current[index - 1].focus();
		}
	};

	// Handle paste
	const handlePaste = (e) => {
		e.preventDefault();
		const pasteData = (e.clipboardData || window.clipboardData).getData('text');
		const chars = pasteData.replace(/\D/g, '').split('');

		const newCode = [...code];
		chars.forEach((char, i) => {
			if (i < inputLength) {
				newCode[i] = char;
			}
		});
		setCode(newCode);

		// Focus the next empty input
		const firstEmptyIndex = newCode.findIndex((c) => c === '');
		if (firstEmptyIndex !== -1 && inputsRef.current[firstEmptyIndex]) {
			inputsRef.current[firstEmptyIndex].focus();
		} else if (inputsRef.current[inputLength - 1]) {
			inputsRef.current[inputLength - 1].focus();
		}
	};

	const handleOtpSubmit = (e) => {
		e.preventDefault();
		const joined = code.join('');
		console.log('Submit to backend:', joined);
		// Your API call here
	};

	const handleCancelOrder = () => {};

	return (
		<div className="py-10">
			{stage === 1 ? (
				<div className="border border-black py-6 px-12 w-max mx-auto text-center space-y-2">
					<h2 className="text-2xl">Buyer Pick Up In Progress</h2>
					<div className="flex flex-col items-center">
						<h6 className="font-semibold text-base">Mukesh Stores.</h6>
						<div className="flex items-center gap-1">
							<img src={Location} alt="map" className="w-4 h-4" />
							Oregun, Ikeja
						</div>
						<p>+234(0) 8136145896</p>
					</div>
					<div className="border border-black py-4 px-8 flex flex-col gap-4">
						<h6 className="text-base font-semibold">Iphone 14 Pro Max</h6>

						<div className="flex flex-col gap-2">
							<Button className={'bg-[#047F73] py-[.65rem] px-[2.8rem] text-white'}>
								Complete and Pick Order
							</Button>
							<Button variant={'grey'}>Cancel Order</Button>
						</div>
					</div>
				</div>
			) : stage === 2 ? (
				<div className="border border-black p-6 w-max mx-auto  space-y-4 max-w-[450px]">
					<h6 className="text-base font-semibold text-center">Complete and Pick-up Order</h6>
					<div className="p-2 bg-gray-200 text-start">
						<p>
							Having Inspected this Item thorouhly, I can confirm that Item met my expectations and I am
							happy to pick it up.
						</p>
					</div>
					<form onSubmit={handleOtpSubmit} className="flex flex-col items-center space-y-4">
						<div className="flex mb-2 space-x-2 rtl:space-x-reverse">
							{code.map((value, index) => (
								<input
									key={index}
									type="text"
									maxLength="1"
									value={value}
									onChange={(e) => handleOtpChange(e, index)}
									onKeyUp={(e) => handleKeyUp(e, index)}
									onPaste={index === 0 ? handlePaste : undefined}
									ref={(el) => (inputsRef.current[index] = el)}
									className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
									required
								/>
							))}
						</div>
						<Button type="submit" className={'bg-[#047F73] py-[.65rem] px-[2.8rem] text-white'}>
							Finish to pick-up
						</Button>
					</form>
				</div>
			) : stage === 3 ? (
				<div className="border border-black p-6 w-max mx-auto  space-y-4 max-w-[450px] text-center relative">
					<button className="absolute top-2 right-2" onClick={() => console.log('Close')}>
						<img src={CloseIcon} alt="close" className="w-6" />
					</button>
					<div className="flex items-center justify-center ">
						<img src={ThankYou} alt="thank you" />
					</div>

					<h6 className="text-primary border-b-2 border-secondary  pb-2">FOR YOUR PURCHASE</h6>

					<div>
						<p>We hope you love it!.</p>
						<p>Kindly leave a review and tag us on Insta for a chance to get featured!</p>
						<p>@boonfu.com</p>
					</div>
				</div>
			) : null}

			{stage === 4 && (
				<div className="border border-black p-6 w-max mx-auto  space-y-4 max-w-[450px] text-center ">
					<h6 className="text-base font-semibold text-center">Cancel Order</h6>
					<div className="p-2 bg-gray-200 text-start">
						<p>Please select atleast one of the following reason(s) for the cancellation request.</p>
					</div>

					<form className="">
						<InputGroup
							type={'radio'}
							value={formData.cancel_reason}
							onChange={(e) => {
								setFormData({ ...formData, cancel_reason: e.target.value });
								console.log('Selected reason:', e.target.value);
							}}
							optionLists={[
								{ key: 'Item not as described', value: 'not_as_described' },
								{ key: 'Seller did not show up', value: 'seller_no_show' },
								{ key: 'Item damaged', value: 'item_damaged' },
								{ key: 'Other', value: 'other' },
							]}
						/>

						{formData.cancel_reason === 'other' && (
							<InputGroup
								type="text"
								name="other_reason"
								id="other_reason"
								placeholder="Please write here"
								value={formData.other_reason || ''}
								onChange={(e) => setFormData({ ...formData, other_reason: e.target.value })}
								className="mt-2"
							/>
						)}

						<div className="mt-8">
							<Button type="submit" className={'bg-[#047F73] py-[.65rem] px-[2.8rem] text-white'}>
								Submit
							</Button>
						</div>
					</form>
				</div>
			)}

			{stage === 5 && (
				<div className="flex flex-col items-center  space-y-12">
					<div className="border border-black p-6 w-max mx-auto  space-y-4 max-w-[450px] text-center relative">
						<button className="absolute top-2 right-2" onClick={() => console.log('Close')}>
							<img src={CloseIcon} alt="close" className="w-6" />
						</button>
						<div className="flex items-center justify-center ">
							<h5 className="border-b border-b-black font-semibold text-2xl">Thanks for the response</h5>
						</div>

						<div>
							<p>
								We sincerely apologise that you had to cancel your order. This would be critically looked
								into. IF resolution is a refund, It should hit your account within three (3) working days.
							</p>

							<p className="mt-2">
								Kindly leave a review and tag us on Insta for a chance to get featured!
							</p>

							<p>@boonfu.com</p>
						</div>
					</div>

					<div className="flex flex-col items-center space-y-4">
						<h6 className="text-primary text-xl">To Initiate a refund, Please click the button below.</h6>

						<Link to={Approutes.refundForm}>
							<Button type="button" variant={'primary'} size={'small'}>
								Refund Request Form
							</Button>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default ClosePickup;
