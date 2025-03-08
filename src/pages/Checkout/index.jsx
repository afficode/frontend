import { Button, Modal } from '../../ui';
import { ArrowScrollDown, DeliveryQuote, LogIcon } from '../../assets/svgs';
import { useState } from 'react';
import PaymentOption from './PaymentOption';
import { useParams, useSearchParams } from 'react-router-dom';
import Delivery from './Delivery';
import { SpinnerSkeleton } from '../../components';
import PaymentSuccess from './PaymentSuccess';
import { fetchProduct } from '../../hooks';
import { toMoney } from '../../utils';

const Checkout = () => {
	const [paymentOption, setPaymentOption] = useState('paystack');
	const { grabber_id, ad_id } = useParams();

	const [stage, setStage] = useState(1);

	const [searchParams] = useSearchParams();
	const deliveryMode = searchParams.get('delivery');
	const [quoteLoading, setQuoteLoading] = useState(false);
	const [paymentModal, setPaymentModal] = useState(false);

	const { data: result, isLoading } = fetchProduct(ad_id);

	if (isLoading)
		return (
			<div className="h-screen">
				<SpinnerSkeleton />
			</div>
		);

	return stage !== 2 ? (
		<section className="mx-6 my-4">
			{deliveryMode === 'true' ? (
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
												Get a Quote <img src={ArrowScrollDown} alt="arrow down" className="w-4" />
											</p>
										</div>
									</div>
								</div>
							</div>
						</section>

						{/* Quote form  */}
						<Delivery setQuoteLoading={setQuoteLoading} />

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

					<div className="flex items-center  gap-2">
						<img src={LogIcon} alt="Quote log" className="w-4 h-4" />
						<p className="text-primary ">View Quote Log page</p>
					</div>
				</div>
			) : (
				<>
					<h3 className="py-4">You are on: Boonfu Checkout</h3>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
						{/* left containers  */}
						<div className="lg:col-span-2 space-y-6 lg:space-y-4">
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
										<div className="flex flex-col gap-4">
											<div>
												<p className="uppercase">{result?.data?.title}</p>
												<p className="font-bold">{toMoney(result?.data?.price)}</p>
											</div>
											<hr className="border-1 border-black/30" />
											<div>
												<h6 className="font-bold mb-1">Delivery</h6>
												<p>
													Type: <span className="text-[#047F73] font-semibold">Self pick-up</span>
												</p>
											</div>

											<div className="border border-black/40 p-2">
												Please ensure to arrange a pick up <br /> within 12-hours of payment.
											</div>
										</div>
									</div>
								</div>
							</section>

							{/* Payment method */}
							{/* <PaymentOption
								paymentOption={paymentOption}
								setPaymentOption={setPaymentOption}
								inputValue={inputValue}
								setInputValue={setInputValue}
								setCardType={setCardType}
								cardType={cardType}
								formikCard={formikCard}
							/> */}
						</div>

						{/* right container  */}
						<div className="lg:col-span-1 border border-black  !px-2 !py-4 h-fit space-y-6">
							<table className="w-full ">
								<tbody className="border-b border-black/30">
									<tr>
										<td>Item</td>
										<td>{toMoney(result?.data?.price)}</td>
									</tr>
								</tbody>
								<tfoot>
									<tr>
										<td>Order Total</td>
										<td>{toMoney(result?.data?.price)}</td>
									</tr>
								</tfoot>
							</table>
							<div>
								<Button
									type="button"
									onClick={() => setPaymentModal(true)}
									variant={'primary'}
									size={'full'}
									className={'rounded-2xl font-bold text-xl'}
								>
									Confirm and pay
								</Button>
							</div>
						</div>
					</div>
				</>
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
				<PaymentOption
					result={result}
					paymentOption={paymentOption}
					setPaymentOption={setPaymentOption}
					setStage={setStage}
				/>
			</Modal>
		</section>
	) : (
		<PaymentSuccess grabber_id={grabber_id} ad_id={ad_id} ad={result} />
	);
};

export default Checkout;

// const data = [
// 	{
// 		title: 'Visa',
// 		type: 'visa',
// 		number: '4848 2346 1783 9084',
// 		name: 'Emiliano Martens',
// 	},
// ];

{
	/* Deliver to  */
}
{
	/* <section className="border border-black">
								<h5 className="py-2 px-4 font-bold bg-gray-300">Deliver to:</h5>

								<form onSubmit={formikDelivery.handleSubmit} className=" bg-white px-4 py-6 space-y-4">
									<div className="">
										<label htmlFor="country" className="font-semibold">
											Country <span title="Required">*</span>
										</label>
										<InputGroup
											name="country"
											type="text"
											placeholder="Enter a display name"
											className="w-[250px]"
											value={formikDelivery.values.country}
											disabled={edit === false && true}
											onChange={formikDelivery.handleChange}
											onBlur={formikDelivery.handleBlur}
											// errorMsg={
											// 	formikDelivery.touched.country && formikDelivery.errors.country
											// 		? formikDelivery.errors.country
											// 		: null
											// }
										/>
									</div>

									<div className="">
										<label htmlFor="state" className="font-semibold">
											State <span title="Required">*</span>
										</label>
										<InputGroup
											name="state"
											type="select"
											className="w-[250px]"
											optionLists={statesOptions}
											value={formikDelivery.values.state}
											disabled={edit === false && true}
											onChange={formikDelivery.handleChange}
											onBlur={formikDelivery.handleBlur}
											errorMsg={
												formikDelivery.touched.state && formikDelivery.errors.state
													? formikDelivery.errors.state
													: null
											}
										/>
									</div>

									<div className="">
										<label htmlFor="street_address" className="font-semibold">
											Street address <span title="Required">*</span>
										</label>
										<InputGroup
											name="street_address"
											type="text"
											placeholder="Enter street address"
											className="w-[250px]"
											value={formikDelivery.values.street_address}
											disabled={edit === false && true}
											onChange={formikDelivery.handleChange}
											onBlur={formikDelivery.handleBlur}
											errorMsg={
												formikDelivery.touched.street_address && formikDelivery.errors.street_address
													? formikDelivery.errors.street_address
													: null
											}
										/>
									</div>
									<div className="">
										<label htmlFor="name" className="font-semibold">
											Name <span title="Required">*</span>
										</label>
										<InputGroup
											name="name"
											type="text"
											placeholder="Enter name"
											className="w-[250px]"
											value={formikDelivery.values.name}
											disabled={edit === false && true}
											onChange={formikDelivery.handleChange}
											onBlur={formikDelivery.handleBlur}
											errorMsg={
												formikDelivery.touched.name && formikDelivery.errors.name
													? formikDelivery.errors.name
													: null
											}
										/>
									</div>
									<div className="">
										<label htmlFor="phone_number" className="font-semibold">
											Phone Number <span title="Required">*</span>
										</label>
										<InputGroup
											name="phone_number"
											type="text"
											placeholder="Enter phone number"
											className="w-[250px]"
											value={formikDelivery.values.phone_number}
											disabled={edit === false && true}
											onChange={formikDelivery.handleChange}
											onBlur={formikDelivery.handleBlur}
											errorMsg={
												formikDelivery.touched.phone_number && formikDelivery.errors.phone_number
													? formikDelivery.errors.phone_number
													: null
											}
										/>
									</div>

									<div className="py-8  flex items-center gap-4">
										<Button type="button" variant={'primary'} size={'small'} onClick={() => setEdit(false)}>
											Save
										</Button>
										<Button
											type="button"
											variant={'plain'}
											className={'flex items-center gap-2 border border-black '}
											size={'small'}
											onClick={() => setEdit(true)}
										>
											Edit <img src={EditPencilBlack} alt="/" className="w-3" />
										</Button>
									</div>
								</form>
							</section> */
}
