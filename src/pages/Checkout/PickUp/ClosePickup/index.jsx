import { useEffect, useRef, useState } from 'react';
import { CloseIcon, Location, ThankYou } from '../../../../assets/svgs';
import { Button, InputGroup, Modal } from '../../../../ui';
import { useParams } from 'react-router-dom';
import { useGetEscrowDetails, useNotify, useRequestOtp, useVerifyOtp } from '../../../../hooks';
import { SpinnerSkeleton } from '../../../../components';
import RefundForm from '../../RefundForm';

const ClosePickup = () => {
	const { escrow_id } = useParams();
	const [stage, setStage] = useState(1);
	const [timer, setTimer] = useState(300);
	const [isExpired, setIsExpired] = useState(false);
	const [refundModal, setRefundModal] = useState(false);
	const inputLength = 6;
	const [code, setCode] = useState(Array(inputLength).fill(''));
	const inputsRef = useRef([]);
	const [formData, setFormData] = useState({
		escrow_reason: '',
		other_reason: '',
	});

	const {
		data: escrowDetails,
		isLoading: escrowLoading,
		isError: escrowError,
		error: escrowErrorData,
	} = useGetEscrowDetails(escrow_id);

	useEffect(() => {
		if (timer === 0) {
			setIsExpired(true);
			return;
		}

		const interval = setInterval(() => {
			setTimer((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [timer]);

	const notify = useNotify();
	const { mutate: requestOtp, isLoading } = useRequestOtp();

	const completePickup = () => {
		const data = {
			id: escrow_id,
			service: 'self_pickup',
			type: 'request',
		};

		requestOtp(data, {
			onSuccess: (data) => {
				notify(data?.message, 'success');
				setTimer(300);
				setIsExpired(false);
				setStage(2);
			},
			onError: (error) => {
				notify(error?.response.data.message, 'error');
			},
		});
	};

	const resendOtp = () => {
		const data = {
			id: escrow_id,
			service: 'self_pickup',
			type: 'resend',
		};

		requestOtp(data, {
			onSuccess: (data) => {
				notify(data?.message, 'success');
				setTimer(300);
				setIsExpired(false);
			},
			onError: (error) => {
				notify(error?.response.data.message, 'error');
			},
		});
	};

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

	const { mutate: verifyOtp, isLoading: isVerifying } = useVerifyOtp();

	const handleOtpSubmit = (e) => {
		e.preventDefault();
		const joined = code.join('');
		// Your API call here

		const data = {
			otp: joined,
			service: 'self_pickup',
		};

		verifyOtp(data, {
			onSuccess: (data) => {
				notify(data?.message, 'success');
				setStage(3);
			},
			onError: (error) => {
				notify(error?.response.data.message, 'error');
			},
		});
	};

	const handleCancelOrder = (e) => {
		e.preventDefault();
		if (formData.escrow_reason || formData.other_reason) {
			setStage(5);
		} else {
			return;
		}
	};

	if (escrowLoading) {
		return (
			<div className="flex items-center justify-center h-72">
				<SpinnerSkeleton />
			</div>
		);
	}

	return (
		<div className="py-10">
			{stage === 1 && (
				<div className="px-4">
					<div className="border border-black py-6 px-6 md:px-12 max-w-full sm:max-w-[450px]	 mx-auto text-center space-y-2">
						<h2 className="text-2xl">Buyer Pick Up In Progress</h2>
						<div className="flex flex-col items-center">
							<h6 className="font-semibold text-base">{escrowDetails?.escrow.ad_owner_name}.</h6>
							<div className="flex items-center gap-1">
								<img src={Location} alt="map" className="w-4 h-4" />
								{escrowDetails?.escrow.pickup_address}, {escrowDetails?.escrow.pickup_state}.
							</div>
							<p>{escrowDetails?.escrow.pickup_mobile}</p>
						</div>
						<div className="border border-black py-4 px-8 flex flex-col gap-4">
							<h6 className="text-base font-semibold capitalize">{escrowDetails?.escrow.ad_title}</h6>

							<div className="flex flex-col gap-2">
								<Button
									className={'bg-[#047F73] py-[.65rem] sm:px-[2.8rem] text-white'}
									onClick={completePickup}
									loading={isLoading}
									disabled={isLoading}
								>
									Complete and Pick Order
								</Button>
								<Button variant={'grey'} onClick={() => setStage(4)}>
									Cancel Order
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}

			{stage === 2 && (
				<div className="px-4">
					<div className="border border-black p-6 w-max mx-auto  space-y-4 max-w-full sm:max-w-[450px]">
						<h6 className="text-base font-semibold text-center">Complete and Pick-up Order</h6>
						<div className="p-2 bg-gray-200 text-start">
							<p>
								Having Inspected this Item thoroughly, I can confirm that Item met my expectations and I am
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
							<div className="flex flex-col gap-2">
								<Button
									type="submit"
									loading={isVerifying}
									disabled={isVerifying}
									className={'bg-[#047F73] py-[.65rem] px-[2.8rem] text-white'}
								>
									Finish to pick-up
								</Button>
								<Button
									variant={'grey'}
									onClick={resendOtp}
									loading={isLoading}
									disabled={!isExpired || isLoading}
								>
									Resend OTP
								</Button>
								<p className="text-center text-sm mt-4">
									OTP expires in: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
								</p>
							</div>
						</form>
					</div>
				</div>
			)}

			{stage === 3 && (
				<div className="px-4">
					<div className="border border-black p-6 w-max mx-auto  space-y-4 max-w-full sm:max-w-[450px] text-center relative">
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
				</div>
			)}

			{stage === 4 && (
				<div className="px-4">
					<div className="border border-black p-6 w-max mx-auto   space-y-4 max-w-full sm:max-w-[450px] text-center relative ">
						<h6 className="text-base font-semibold text-center">Cancel Order</h6>

						<button className="absolute top-[-0.5rem] right-2" onClick={() => setStage(1)}>
							<img src={CloseIcon} alt="close" className="w-6" />
						</button>
						<div className="p-2 bg-gray-200 text-start">
							<p>Please select atleast one of the following reason(s) for the cancellation request.</p>
						</div>
						<form onSubmit={handleCancelOrder} className="">
							<div className="flex flex-col gap-2">
								<label className="flex flex-row justify-between items-center text-start">
									<span>Item is completely different from what I saw online</span>
									<input
										type="radio"
										name="escrow_reason"
										value="item_different"
										checked={formData.escrow_reason === 'item_different'}
										onChange={(e) => setFormData({ ...formData, escrow_reason: e.target.value })}
									/>
								</label>

								<label className="flex flex-row justify-between items-center">
									<span>I changed my mind</span>
									<input
										type="radio"
										name="escrow_reason"
										value="changed_mind"
										checked={formData.escrow_reason === 'changed_mind'}
										onChange={(e) => setFormData({ ...formData, escrow_reason: e.target.value })}
									/>
								</label>

								<label className="flex flex-row justify-between items-center">
									<span>Damaged or Defective Product</span>
									<input
										type="radio"
										name="escrow_reason"
										value="damaged"
										checked={formData.escrow_reason === 'damaged'}
										onChange={(e) => setFormData({ ...formData, escrow_reason: e.target.value })}
									/>
								</label>

								<label className="flex flex-row justify-between items-center">
									<span>Decided for alternative item</span>
									<input
										type="radio"
										name="escrow_reason"
										value="alternative_decision"
										checked={formData.escrow_reason === 'alternative_decision'}
										onChange={(e) => setFormData({ ...formData, escrow_reason: e.target.value })}
									/>
								</label>

								<label className="flex flex-row justify-between items-center">
									<span>Seller asked to cancel</span>
									<input
										type="radio"
										name="escrow_reason"
										value="seller_requested"
										checked={formData.escrow_reason === 'seller_requested'}
										onChange={(e) => setFormData({ ...formData, escrow_reason: e.target.value })}
									/>
								</label>

								<label className="flex flex-row justify-between items-center">
									<span>Seller’s attitude puts me off</span>
									<input
										type="radio"
										name="escrow_reason"
										value="seller_attitude"
										checked={formData.escrow_reason === 'seller_attitude'}
										onChange={(e) => setFormData({ ...formData, escrow_reason: e.target.value })}
									/>
								</label>

								<label className="flex flex-row justify-between items-center">
									<span>Other</span>
									<input
										type="radio"
										name="escrow_reason"
										value="other"
										checked={formData.escrow_reason === 'other'}
										onChange={(e) => setFormData({ ...formData, escrow_reason: e.target.value })}
									/>
								</label>
							</div>

							{formData.escrow_reason === 'other' && (
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
				</div>
			)}

			{stage === 5 && (
				<>
					<div className="flex flex-col items-center  space-y-12 px-4">
						<div className="border border-black p-6 w-max mx-auto  space-y-4 max-w-full sm:max-w-[450px] text-center relative">
							<button className="absolute top-2 right-2" onClick={() => setStage(4)}>
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
							<h6 className="text-primary text-xl">
								To Initiate a refund, Please click the button below.
							</h6>

							<Button
								type="button"
								variant={'primary'}
								size={'small'}
								onClick={() => setRefundModal(true)}
							>
								Refund Request Form
							</Button>
						</div>
					</div>
					<Modal
						isOpen={refundModal}
						setIsOpen={setRefundModal}
						modalHeader={false}
						className={' max-w-[720px] p-0 '}
					>
						<RefundForm
							escrowDetails={escrowDetails?.escrow}
							escrowReason={
								formData?.escrow_reason === '' ? formData.other_reason : formData.escrow_reason
							}
						/>
					</Modal>
				</>
			)}
		</div>
	);
};

export default ClosePickup;
