import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Modal as ModalUi } from '../../../ui';
import {
	BankTransfer,
	Info,
	InfoYellow,
	Paypal,
	SingleArrowRight,
	Visa,
} from '../../../assets/svgs';
import { Approutes } from '../../../constants';
// import InquiryChat from './Modals/InquiryChat';
import InspectionSchedule from './Modals/InspectionSchedule';
import { useGetSchedules } from '../../../hooks';
import Modal from '../../Products/View/Modal.jsx';
import ReportAd from '../../Products/View/ReportAd';
import { BiSolidMessageRoundedDetail } from 'react-icons/bi';
import useAuth from '../../../context/UserContext';

const Action = ({ isGeneral, ad }) => {
	const { data } = useGetSchedules();
	const { isLogin, user } = useAuth();
	const category = ad?.category.toString();
	const { grabber_id, ad_id } = useParams();

	const [formData, setFormData] = useState({
		delivery_option: '',
	});

	const hasBookedSchedule = data?.schedules.some((schedule) => schedule.ad_id === ad.id);

	// form modals
	const [inspectionModalOpen, setInspectionModalOpen] = useState(false);

	// const [inquiryModal, setInquiryModal] = useState(false);

	return (
		<>
			<aside
				className={
					isGeneral
						? 'w-full  border-2 border-gray-400 p-2 lg:p-4 flex flex-col justify-between'
						: 'w-full self-end h-full   border-2 border-gray-400 px-2 py-4 lg:p-4 flex flex-col justify-between'
				}
			>
				{isGeneral ? (
					<>
						<p className="pb-2 border-b border-black/40 border-1">
							NOTE:{' '}
							<span className="italic text-primary">
								This Item does not deliver outside of seller’s state.
							</span>
						</p>
						<div className="pb-4 space-y-4 border-b border-black/40 border-1">
							<div>
								<p className="font-semibold">Select delivery option:</p>

								<form className="mt-1">
									{category.startsWith(54) ? null : (
										<div className="flex items-center space-x-4">
											<input
												type="radio"
												name={'delivery'}
												id={'delivery'}
												value={'delivery'}
												checked={formData.delivery_option === 'delivery'}
												onChange={(e) => {
													setFormData({ ...formData, delivery_option: e.target.value });
												}}
												className={``}
											/>
											<label htmlFor={'delivery'} className="flex items-center gap-2">
												Boonfu Delivery
												<div className="dropdown dropdown-hover">
													<img tabIndex={0} src={InfoYellow} alt="/" className="w-4 cursor-pointer" />
													<div
														tabIndex={0}
														className="dropdown-content transform translate-y-[-25%] md:translate-y-[2%] translate-x-[-54%] md:translate-x-[-80%] lg:translate-x-[-70%]  bg-secondary border-4 p-4 w-screen max-w-[340px] sm:max-w-[580px] z-[100000]"
													>
														<div className="space-y-2 text-start">
															<h4>Boonfu Delivery.</h4>
															<p>
																Delivery with boonfu is handled by our third-party logistic company. Delivery of a
																particular product/item is done in the state where it is sold. NO inter-state
																delivery is available, for now.
															</p>
															<p>
																To get a quote for cost of delivery,{' '}
																<button className="underline text-primary">click quote form</button> fill and you
																get your quote in minutes.
															</p>
															<p>Delivery fee is paid alongside cost of item or product being purchased.</p>
															<p>
																Return of Item or Product that DOES NOT meet expectation with strong proof is
																covered by the seller.
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
									)}

									<div className="flex items-center space-x-4">
										<input
											type="radio"
											name={'pickup'}
											id={'pickup'}
											value={'pickup'}
											checked={formData.delivery_option === 'pickup'}
											onChange={(e) => {
												setFormData({ ...formData, delivery_option: e.target.value });
											}}
											className={``}
										/>
										<label htmlFor={'pickup'} className="flex items-center gap-2">
											Pick up by self{' '}
											<div className="dropdown dropdown-hover">
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
										<Link
											to={`${Approutes.useCheckout(grabber_id, ad_id)}?delivery=${
												formData.delivery_option === 'delivery' ? true : false
											}`}
										>
											<Button
												disabled={formData.delivery_option === '' ? true : false}
												type="button"
												variant={'primary'}
												size={'full'}
												className={'flex items-center justify-center gap-4 rounded-3xl mt-4'}
											>
												Place Order
											</Button>
										</Link>
										{/* <Button
											type="button"
											onClick={() => setInquiryModal(true)}
											variant={'primary'}
											size={'full'}
											className={'flex items-center justify-center gap-4 rounded-3xl mt-4 z-[-1]'}
										>
											Inquire about Item
										</Button> */}
										<Modal
											modalHeader={true}
											children={<ReportAd ad_id={ad?.id} />}
											headerText={'Feedback / Abuse'}
											className={`w-full px-2 py-3 my-2 text-lg tracking-tighter rounded-3xl text-white bg-slate-600 hover:bg-slate-500 line-clamp-1 ${
												!isLogin && 'cursor-not-allowed'
											}`}
											disabled={!isLogin || ad?.active === '0' || user?.id === ad?.owner}
											type="button"
											buttonChild={
												<>
													<span className="flex items-center gap-2 justify-center">
														Feedback <BiSolidMessageRoundedDetail className="my-auto" />
													</span>
												</>
											}
										/>
									</div>
								</form>

								{/* <ModalUi
									isOpen={inquiryModal}
									setIsOpen={setInquiryModal}
									modalHeader={false}
									className={' max-w-fit p-0 '}
								>
									<InquiryChat ad={ad} />
								</ModalUi> */}
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
					</>
				) : (
					<>
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

							{hasBookedSchedule ? (
								<div className="flex items-center justify-between p-3 border rounded-xl border-primary">
									<h6 className="font-semibold">Inspection reports</h6>
									<Link to={Approutes.grab.inspectionLog}>
										<span className="flex items-center gap-2 underline text-primary">
											see <img src={SingleArrowRight} className="w-[0.5rem]" alt="/" />
										</span>
									</Link>
								</div>
							) : (
								<Button
									variant={'primary'}
									size={'full'}
									className={'flex items-center justify-center gap-4 rounded-xl'}
									onClick={() => setInspectionModalOpen(true)}
								>
									Schedule inspection
								</Button>
							)}

							{/* inspection ModalUi  */}
							<ModalUi
								isOpen={inspectionModalOpen}
								setIsOpen={setInspectionModalOpen}
								headerText={'Welcome to : Inspection scheduling'}
								headerStye={'text-start capitalize '}
								headerSize={'small'}
								className={'bg-secondary max-w-[600px]'}
							>
								<InspectionSchedule setInspectionModalOpen={setInspectionModalOpen} ad={ad} />
							</ModalUi>
						</div>

						<div className="mt-3">
							<h6 className="my-2 font-bold text-center">Keeping Safe</h6>
							<ol className="list-[lower-roman] pl-4">
								<li> Carryout inspection by yourself and ensure to go along with a technician</li>
								<li> Thoroughly check all documents and verify authenticity before payment</li>
								<li> Do not inspect/pay in a public place, office or seller’s home is advised!.</li>
								<li> Do not commit funds in advance for vehicle you have not inspected.</li>
							</ol>
						</div>
					</>
				)}
			</aside>
		</>
	);
};

export default Action;

{
	/* // <aside
	// 	className={
	// 		isGeneral
	// 			? 'w-full    border-2 border-gray-400 p-2 lg:p-4 flex flex-col justify-between'
	// 			: 'w-full  h-full  border-2 border-gray-400 px-2 py-4 lg:p-4 flex flex-col justify-between'
	// 	}
	// >
	
	// </aside> */
}
// quote form data schema
// {
// 	buyer_address: 'Lekki';
// 	buyer_name: 'Mr Ayo';
// 	buyer_phone: '+2349039085228';
// 	delivery_type: 'normal';
// 	note: "Here's a note";
// 	seller_address: '13 Ayanlaja Street';
// 	state: '22';
// }
