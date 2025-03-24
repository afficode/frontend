import { useEffect, useState } from 'react';
import { Button, InputGroup, Modal } from '../../../ui';
import { fetchProduct, useNotify, useSendOrder, useStates } from '../../../hooks';
import { toMoney, toSelectOptions } from '../../../utils';
import { useParams } from 'react-router-dom';
import { SpinnerSkeleton } from '../../../components';
import { ArrowScrollDown, DeliveryQuote, LogIcon } from '../../../assets/svgs';
import PaymentOption from '../PaymentOption';
import useAuth from '../../../context/UserContext';
import { v4 as uuidv4 } from 'uuid';

const Delivery = () => {
	const { data: states } = useStates();
	const statesOptions = toSelectOptions(states, 'states', 'Select your state');

	const [stage, setStage] = useState(1);
	const { user } = useAuth();

	const { grabber_id, ad_id } = useParams();
	const { data: result, isLoading } = fetchProduct(ad_id);
	const [paymentModal, setPaymentModal] = useState(false);
	const [quoteLoading, setQuoteLoading] = useState(false);
	const orderId = uuidv4();

	console.log(result);

	useEffect(() => {}, []);

	const { mutate, isLoading: orderLoading } = useSendOrder();

	const handleOrder = () => {};

	// boonfu delivery form for general products
	const [orderData, setOrderData] = useState({
		order_id: orderId,
		buyer_id: user?.id,
		seller_id: result?.data?.user_id ?? result?.data?.user_id,
		ad_id: Number(ad_id) ?? Number(ad_id),
		buyer_address: '',
		state: '',
		// delivery_type: '',
		note: '',
	});

	const handleOrderFormChange = (e) => {
		const { name, value } = e.target;
		setOrderData({ ...orderData, [name]: value });
	};

	const notify = useNotify();

	const handleOrderSubmit = (e) => {
		e.preventDefault();
		console.log(orderData);

		const { state, ...rest } = orderData;

		const formData = {
			...rest,
			state: Number(state),
		};

		mutate(formData, {
			onSuccess: (data) => {
				console.log(data);
				notify(data?.message, 'success');
				setQuoteLoading(true);
			},
			onError: (error) => {
				console.log(error);
				notify(error?.response?.data?.message, 'error');
			},
		});
	};

	if (isLoading)
		return (
			<div className="h-screen">
				<SpinnerSkeleton />
			</div>
		);

	return (
		<section className="mx-6 my-4">
			{stage !== 2 ? (
				<div className="space-y-6">
					<h3 className="py-4 text-center">Place Order review page</h3>

					<div className="max-w-[720px] mx-auto space-y-6">
						{/* Review item */}
						<section className="border border-black">
							<h5 className="py-2 px-4 font-bold bg-gray-300">Review Item</h5>

							<div className="px-4 pt-2 pb-6">
								<h6 className="text-black/60 py-2">Grabber ID: {grabber_id}</h6>
								<div className="flex gap-6">
									<img
										src={result?.data?.images[0]?.path}
										alt={result?.data?.images[0]?.filename}
										className="w-16 h-16"
									/>
									<div className="flex flex-col gap-6">
										<div>
											<p className="uppercase">
												{result?.data.title} {result?.data?.color && `(, ${result?.data?.color})`}
											</p>
											<p className="font-bold">{toMoney(result?.data?.price)}</p>
										</div>

										<div>
											<h6 className="font-bold mb-1">Delivery</h6>
											<p>Service: Boonfu delivery</p>
											<p>Type: Express delivery (Same day)</p>
											<p className="flex items-center gap-2 font-semibold text-primary mt-2">
												Pay to Get a Quote <img src={ArrowScrollDown} alt="arrow down" className="w-4" />
											</p>
										</div>
									</div>
								</div>
							</div>

							<div className=" p-3 max-w-[300px] ">
								<Button
									variant={'primary'}
									size={'small'}
									className=" w-full"
									onClick={() => setPaymentModal(true)}
								>
									Pay
								</Button>
							</div>
						</section>

						{/* Quote form  */}
						{/* <Delivery setQuoteLoading={setQuoteLoading} /> */}

						{/* Delivery Quote */}
					</div>

					<div className="flex items-center  gap-2">
						<img src={LogIcon} alt="Quote log" className="w-4 h-4" />
						<p className="text-primary ">View Quote Log page</p>
					</div>
				</div>
			) : (
				<div className="max-w-[720px] mx-auto py-6">
					<div className="bg-secondary p-4">
						<div className="mb-6 space-y-1">
							<p className="italic">Thanks for choosing Boonfu delivery service.</p>
							<p className="italic">
								Please fill the quote form below to enable us generate accurate delivery quote for you.
							</p>
						</div>
						<form autoComplete="off" className="flex flex-col space-y-4" onSubmit={handleOrderSubmit}>
							{/* <label htmlFor="seller_address" className="flex flex-col font-medium">
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
									value={orderData.seller_address}
									onChange={handleOrderFormChange}
								/>
							</label> */}

							{/* <hr className=" border-1 border-black" /> */}
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
									value={orderData.buyer_address}
									onChange={handleOrderFormChange}
								/>
							</label>
							<label htmlFor="state" className="flex flex-col font-medium">
								State
								<InputGroup
									name="state"
									id="state"
									type={'select'}
									autoComplete={'off'}
									className={'mt-0'}
									optionLists={statesOptions}
									value={orderData.state}
									onChange={handleOrderFormChange}
								/>
							</label>

							{/* <div className="flex flex-col font-medium">
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
											checked={orderData.delivery_type === 'express'}
											onChange={handleOrderFormChange}
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
											checked={orderData.delivery_type === 'normal'}
											onChange={handleOrderFormChange}
										/>
										Normal
									</label>
								</div>
							</div> */}
							<label htmlFor="note" className="flex flex-col font-medium">
								Leave a note
								<textarea
									type="text"
									name="note"
									id="note"
									value={orderData.note}
									onChange={handleOrderFormChange}
									rows={4}
									cols={10}
								/>
							</label>

							<Button
								type="submit"
								variant={'primary'}
								size={'small'}
								loading={orderLoading}
								disabled={orderLoading}
							>
								Get a Quote
							</Button>
						</form>
					</div>

					{/* Delivery Quote */}
					<div className="bg-primary p-4 text-white w-[300px] mx-auto">
						<h6 className="text-center">Your delivery quote</h6>

						<div className="flex items-center gap-4 my-4">
							<div className="flex-1 space-y-1">
								<div>
									<p>From: </p>
									<div className="bg-gray-300 text-black text-center p-2">Amuwo-odofin</div>
								</div>
								<div>
									<p>To: </p>
									<div className="bg-gray-300 text-black text-center p-2">Lekki Phase 1</div>
								</div>
							</div>

							<img src={DeliveryQuote} alt="delivery quote" className="w-16" />
						</div>

						<p className="border-y border-white py-1 text-lg my-4 font-semibold">Cost : #3,500</p>

						<div className="flex items-center  justify-center gap-2 my-2 max-w-full">
							{/* <Button
										variant={'grey'}
										size={'small'}
										onClick={() => s(false)}
										className="flex-1  !px-2"
									>
										Back
									</Button> */}
							<Button
								variant={'secondary'}
								size={'small'}
								className=" w-full"
								onClick={() => setPaymentModal(true)}
							>
								Continue
							</Button>
						</div>
					</div>
				</div>
			)}

			<Modal
				isOpen={quoteLoading}
				setIsOpen={setQuoteLoading}
				modalHeader={false}
				className={' max-w-fit p-0 bg-white'}
			>
				<div className="flex flex-col items-center justify-center space-y-4 p-4">
					<SpinnerSkeleton />
					<p>Please wait while your delivery quote is being generated</p>
					<p className="text-sm max-w-[300px] text-center">
						This may take between <span className="text-primary font-semibold">2 to 3 minutes</span>,
						please bear with us
					</p>
				</div>
			</Modal>
			<Modal
				isOpen={paymentModal}
				setIsOpen={setPaymentModal}
				modalHeader={false}
				className={' max-w-[720px] p-0 bg-white'}
			>
				<PaymentOption result={result} />
			</Modal>
		</section>
	);
};

export default Delivery;
