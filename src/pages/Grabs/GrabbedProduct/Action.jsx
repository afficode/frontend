import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStates } from '../../../hooks';
import { toSelectOptions } from '../../../utils';
import { Button, InputGroup, Modal } from '../../../ui';
import {
	BankTransfer,
	DeliveryQuote,
	Info,
	InfoYellow,
	Location,
	Paypal,
	SingleArrowRight,
	Visa,
} from '../../../assets/svgs';
import { Form, Formik } from 'formik';
import { date, Schema } from 'yup';
import { Approutes } from '../../../constants';

const Action = () => {
	const { data: states } = useStates();
	const statesOptions = toSelectOptions(states, 'states', 'Select your state');

	const [formData, setFormData] = useState({
		delivery_option: '',
	});

	// form modals
	const [inspectionModalOpen, setInspectionModalOpen] = useState(false);
	const [quoteFormModalOpen, setQuoteFormModalOpen] = useState(false);
	const [quoteModalOpen, setQuoteModalOpen] = useState(false);

	// inspection scheduling form for cars and properties
	const [inspectionData, setInspectionData] = useState({
		user_id: '',
		date: '',
		start_time: '',
		end_time: '',
	});
	const handleInspectionChange = (e) => {
		const { name, value } = e.target;
		setInspectionData({ ...inspectionData, [name]: value });
	};

	const handleInspectionSubmit = (e) => {
		e.preventDefault();
		inspectionData;
	};
	// inspection scheduling end

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
		console.log(quoteFormData);

		setQuoteFormModalOpen(false);
		setQuoteModalOpen(true);
	};
	// boonfu delivery form end

	const isGeneral = true;
	return (
		<>
			{isGeneral ? (
				<aside
					className={
						isGeneral
							? 'w-full  md:w-[40%] xl:w-[30%] border-2 border-gray-400 p-2 lg:p-4 flex flex-col justify-between'
							: 'w-full self-end h-[550px] md:w-[40%] xl:w-[30%] border-2 border-gray-400 px-2 py-4 lg:p-4 flex flex-col justify-between'
					}
				>
					<p className="pb-2 border-b border-black/40 border-1">
						NOTE:{' '}
						<span className="italic text-primary">
							This Item does not deliver outside of seller’s state.
						</span>
					</p>
					<div className="pb-4 space-y-4 border-b border-black/40 border-1">
						<div className="p-3 font-semibold text-center bg-gray-300 rounded-lg">
							Ready to Buy Item Now?
						</div>

						<div>
							<p className="font-semibold">Select delivery option:</p>

							<form className="mt-1">
								<div className="flex items-center space-x-4">
									<input
										type="radio"
										name={'delivery'}
										id={'delivery'}
										value={'delivery'}
										checked={formData.delivery_option === 'delivery'}
										onChange={(e) => setFormData({ ...formData, delivery_option: e.target.value })}
										className={``}
									/>
									<label htmlFor={'delivery'} className="flex items-center gap-2">
										Boonfu Delivery
										<div className="dropdown">
											<img tabIndex={0} src={InfoYellow} alt="/" className="w-4 cursor-pointer" />
											<div
												tabIndex={0}
												className="dropdown-content transform translate-y-[-25%] md:translate-y-[2%] translate-x-[-54%] md:translate-x-[-80%] lg:translate-x-[-70%]  bg-secondary border-4 p-4 w-screen max-w-[340px] sm:max-w-[580px] z-[100000]"
											>
												<div className="space-y-2 text-start">
													<h4>Boonfu Delivery.</h4>
													<p>
														Delivery with boonfu is handled by our third-party logistic company. Delivery of a
														particular product/item is done in the state where it is sold. NO inter-state delivery
														is available, for now.
													</p>
													<p>
														To get a quote for cost of delivery,{' '}
														<button className="underline text-primary">click quote form</button> fill and you get
														your quote in minutes.
													</p>
													<p>Delivery fee is paid alongside cost of item or product being purchased.</p>
													<p>
														Return of Item or Product that DOES NOT meet expectation with strong proof is covered
														by the seller.
													</p>
													<p>
														If you change your mind after payment and shipment is initiated, you would pay
														administrative charge of one thousand five hundred naira (₦1,500) and get the refund
														of your balance.
													</p>
												</div>
											</div>
										</div>
									</label>
								</div>

								<div className="flex items-center space-x-4">
									<input
										type="radio"
										name={'pickup'}
										id={'pickup'}
										value={'pickup'}
										checked={formData.delivery_option === 'pickup'}
										onChange={(e) => setFormData({ ...formData, delivery_option: e.target.value })}
										className={``}
									/>
									<label htmlFor={'pickup'} className="flex items-center gap-2">
										Pick up by self{' '}
										<div className="dropdown">
											<img tabIndex={0} src={InfoYellow} alt="/" className="w-4 cursor-pointer" />
											<div
												tabIndex={0}
												className="dropdown-content transform translate-y-[-25%] md:translate-y-[2%] translate-x-[-47%] sm:translate-x-[-30%] md:translate-x-[-90%] lg:translate-x-[-70%]  bg-secondary border-4 p-4 w-screen max-w-[340px] sm:max-w-[580px] z-[100000]"
											>
												<div className="space-y-2 text-start">
													<h4>Pick up by self</h4>
													<p>Dear Buyer,</p>
													<p>
														Please note that seller’s information is ONLY revealed and released to you upon the
														recipt of your payment
													</p>
													<p>
														Thorough inspection of the item is to be done by YOU onsite of item’s pick up, after
														which you would CONFIRM satisfactory state or not of item.
													</p>
													<p>
														Self-pick up is to be done and closed within 24hrs. It is in your best interest to
														either confirm satfisfactory state of item or not within 24hrs, as after 24hrs, Fund
														for item shall be released to seller and that transaction CLOSED!
													</p>
												</div>
											</div>
										</div>
									</label>
								</div>

								<button type="button" className="mt-2 font-medium text-black underline">
									T & C’s apply, please read!
								</button>

								<div className="mb-2 space-y-3">
									<Button
										onClick={() => setQuoteFormModalOpen(true)}
										disabled={formData.delivery_option === '' ? true : false}
										type="button"
										variant={'primary'}
										size={'full'}
										className={'flex items-center justify-center gap-4 rounded-3xl mt-4'}
									>
										Place Order
									</Button>
									<Button
										disabled={true}
										variant={'primary'}
										size={'full'}
										className={'flex items-center justify-center gap-4 rounded-3xl mt-4 z-[-1]'}
									>
										Inquire about Item
									</Button>
								</div>
							</form>

							{formData.delivery_option === 'delivery' ? (
								<Modal
									isOpen={quoteFormModalOpen}
									setIsOpen={setQuoteFormModalOpen}
									headerText={'Thanks for choosing Boonfu delivery service.'}
									headerStye={'italic mb-[-1rem]'}
									headerSize={'text'}
									className={'bg-secondary max-w-[600px] '}
								>
									<div className="mb-2">
										Please enter in your location and other details for this delivery service.
									</div>
									<form
										autoComplete="off"
										className="flex flex-col space-y-4"
										onSubmit={handleQuoteFormSubmit}
									>
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
								</Modal>
							) : (
								<Modal
									isOpen={quoteFormModalOpen}
									setIsOpen={setQuoteFormModalOpen}
									headerText={'Pick up by self'}
									headerSize={'text'}
									headerStye={'underline'}
									className={'bg-secondary max-w-[600px] '}
								>
									<div className="space-y-4">
										<p className="m">Dear Buyer,</p>

										<div>
											<p>Thanks for your order, Kindly find the details of seller below.</p>
											<p>Please call right away to arrange a pick up.</p>
										</div>

										<div className="space-y-2">
											<div className="grid items-center grid-cols-3">
												<p>Pick up address : </p>
												<span className="col-span-2 flex items-center gap-2 p-2 rounded-md bg-[#333] text-white">
													<img src={Location} alt="/" className="w-4" />
													12b, Alade market avenue, Ikeja Lagos.
												</span>
											</div>
											<div className="grid items-center grid-cols-3">
												<p>Mobile: </p>
												<span className="col-span-2  flex items-center gap-2 p-2 rounded-md bg-[#333] text-white">
													+234 8033456236
												</span>
											</div>
											<div className="grid items-center grid-cols-3">
												<p>Name: </p>
												<span className="col-span-2 flex items-center gap-2 p-2 rounded-md bg-[#333] text-white">
													Mr Kunle Kalejaiye
												</span>
											</div>
										</div>

										<p className="py-4">
											Should you experience any difficulty in reaching the above contact, please chat at us @{' '}
											<span className="text-primary">Boonfuchat</span>
										</p>

										<p>
											Sales department, <br />
											Boonfu
										</p>
									</div>
								</Modal>
							)}

							{/* delivery quote modal */}
							<Modal
								isOpen={quoteModalOpen}
								setIsOpen={setQuoteModalOpen}
								modalHeader={false}
								className={' max-w-fit p-0 bg-primary'}
							>
								<div className="bg-primary p-4 text-white w-[300px]">
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

									<p className="border-y border-black py-1 text-lg my-4 font-semibold">Cost : #3,500</p>

									<div className="flex justify-between gap-2 my-2 max-w-full">
										<Button
											variant={'grey'}
											size={'small'}
											onClick={() => setQuoteModalOpen(false)}
											className="flex-1  !px-2"
										>
											Back
										</Button>
										<Link to={Approutes.grab.checkout} className="flex-1 ">
											<Button variant={'secondary'} size={'small'} className=" w-ful">
												Continue
											</Button>
										</Link>
									</div>
								</div>
							</Modal>
						</div>
					</div>

					<div>
						<h6 className="my-2 font-bold ">Buy with confidence</h6>
						<p className="pb-2">
							Payments made on Boonfu.com is secured with strict SSL encryption and data protection
							protocols
						</p>
						<div className="flex items-center pt-1 border-t border-black/40 border-1">
							Payments:{' '}
							<span className="flex items-center gap-3">
								{' '}
								<img src={Visa} alt="/" />
								<img src={Paypal} alt="/" />
								<img src={BankTransfer} alt="/" />
							</span>
						</div>
					</div>
				</aside>
			) : (
				<aside
					className={
						isGeneral
							? 'w-full  md:w-[40%] xl:w-[30%] border-2 border-gray-400 p-2 lg:p-4 flex flex-col justify-between'
							: 'w-full self-end h-[550px] md:w-[40%] xl:w-[30%] border-2 border-gray-400 px-2 py-4 lg:p-4 flex flex-col justify-between'
					}
				>
					<div className="flex flex-col gap-4">
						<Button
							variant={'secondary'}
							size={'full'}
							className={
								'flex items-center justify-center gap-4 rounded-xl font-semibold hover:opacity-100'
							}
						>
							Seller’s contact
							<div className="dropdown dropdown-hover">
								<img tabIndex={0} src={Info} alt="/" className="w-4" />
								<div
									tabIndex={0}
									className="dropdown-content transform translate-y-[10%] translate-x-[-80%]  bg-secondary border-4 p-4 w-screen max-w-[320px] sm:max-w-[480px]"
								>
									<div className="space-y-2 text-start">
										<h4>Seller’s Contact Reveal.</h4>
										<p>
											Sellers are ONLY able to reveal their contacts WHEN your inspection date and time is
											convenient for them.
										</p>
										<p>
											Please watch-out for response from sellers via your message inbox, as sellers might
											decline your set date and tend to pick a suitable date which works for them.
										</p>
									</div>
								</div>
							</div>
						</Button>
						<Button
							variant={'primary'}
							size={'full'}
							className={'flex items-center justify-center gap-4 rounded-xl'}
							onClick={() => setInspectionModalOpen(true)}
						>
							Schedule inspection
						</Button>
						{/* inspection modal  */}
						<Modal
							isOpen={inspectionModalOpen}
							setIsOpen={setInspectionModalOpen}
							headerText={'Welcome to : Inspection scheduling'}
							headerStye={'text-start capitalize '}
							headerSize={'small'}
							className={'bg-secondary max-w-[600px]'}
						>
							<form className="flex flex-col space-y-4" onSubmit={handleInspectionSubmit}>
								<label htmlFor="user_id" className="flex flex-col font-medium">
									Please enter your user ID;
									<input
										type="text"
										name="user_id"
										id="user_id"
										placeholder="crystalgush"
										value={inspectionData.user_id}
										onChange={handleInspectionChange}
									/>
								</label>
								<label htmlFor="date" className="flex flex-col font-medium">
									Select inspectation date
									<input
										type="date"
										name="date"
										id="date"
										placeholder="29.10.2024"
										value={inspectionData.date}
										onChange={handleInspectionChange}
									/>
								</label>

								<div className="flex items-center">
									<label htmlFor="start_time" className="flex flex-col font-medium">
										Start Time
										<input
											type="time"
											name="start_time"
											id="start_time"
											placeholder="11 : 00am"
											value={inspectionData.start_time}
											onChange={handleInspectionChange}
										/>
									</label>
									<label htmlFor="end_time" className="flex flex-col font-medium">
										End Time
										<input
											type="time"
											name="end_time"
											id="end_time"
											placeholder="4 : 00pm"
											value={inspectionData.end_time}
											onChange={handleInspectionChange}
										/>
									</label>
								</div>

								<div className="space-y-4">
									<p>
										Please be double sure of the date and inspection time set, as you might not have the
										opportunity to re-schedule another one for <b className="text-white">free</b>.
									</p>
									<div className="flex items-center gap-6">
										<Button type="submit" variant={'primary'} size={'small'}>
											Submit
										</Button>
										<Button
											type="button"
											onClick={() => setInspectionModalOpen(false)}
											variant={'plain'}
											size={'small'}
										>
											Cancel
										</Button>
									</div>
								</div>
							</form>
						</Modal>

						<div className="flex items-center justify-between p-3 border rounded-xl border-primary">
							<h6 className="font-semibold">Inspection reports</h6>
							<Link to={Approutes.grab.inspectionLog}>
								<span className="flex items-center gap-2 underline text-primary">
									see <img src={SingleArrowRight} className="w-[0.5rem]" alt="/" />
								</span>
							</Link>
						</div>
					</div>

					<div>
						<h6 className="my-2 font-bold text-center">Keeping Safe</h6>
						<ol className="list-[lower-roman] pl-4">
							<li> Carryout inspection by yourself and ensure to go along with a technician</li>
							<li> Thoroughly check all documents and verify authenticity before payment</li>
							<li> Do not inspect/pay in a public place, office or seller’s home is advised!.</li>
							<li> Do not commit funds in advance for vehicle you have not inspected.</li>
						</ol>
					</div>
				</aside>
			)}
		</>
	);
};

export default Action;

// quote form data schema
{
	buyer_address: 'Lekki';
	buyer_name: 'Mr Ayo';
	buyer_phone: '+2349039085228';
	delivery_type: 'normal';
	note: "Here's a note";
	seller_address: '13 Ayanlaja Street';
	state: '22';
}
