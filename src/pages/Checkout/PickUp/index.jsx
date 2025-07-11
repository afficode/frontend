import { useParams } from 'react-router-dom';
import { fetchProduct, useCheckOrder } from '../../../hooks';
import { useMemo, useState } from 'react';
import { toMoney } from '../../../utils';
import { Button, InputGroup, Modal } from '../../../ui';
import PaymentOption from '../PaymentOption';
import { SpinnerSkeleton } from '../../../components';
import ShowSellerContact from './ShowSellerContact';

const PickUp = () => {
	const { grabber_id, ad_id } = useParams();
	const { data: result, isLoading } = fetchProduct(ad_id);
	const [paymentModal, setPaymentModal] = useState(false);
	const [agreed, setAgreed] = useState(false);

	const { data: checkOrder, isLoading: checking, isError, error } = useCheckOrder(ad_id);

	console.log('checkOrder', checkOrder);

	const stage = useMemo(() => {
		if (checkOrder?.payment_status === 'success') {
			return 2;
		} else {
			return 1;
		}
	}, [checkOrder]);

	if (isLoading || checking)
		return (
			<div className="h-screen">
				<SpinnerSkeleton />
			</div>
		);

	if (isError) {
		if (error?.response?.status === 403) {
			return (
				<div className="flex items-center justify-center w-full h-[70vh]">
					<div className="flex flex-col gap-4 w-full h-max max-w-[600px] text-center p-4 bg-white">
						<div className="bg-secondary p-4 space-y-2">
							<h3>🔒 Restricted Access Notice</h3>

							<p>
								This ad is currently locked due to an active transaction. To protect both buyers and
								sellers, listings become temporarily unavailable once a purchase is in progress.
							</p>
						</div>

						<div className="space-y-4 text-start">
							<h4 className="text-center">What You Can Do:</h4>

							<ul>
								<li>✅ Browse similar available items</li>
								<li>✅ Check back in 24-48 hours if the deal falls through</li>
								<li>✅ Contact support@boonfu.com for urgent inquiries</li>
							</ul>

							<p>Thank you for understanding our secure transaction process!</p>
						</div>
					</div>
				</div>
			);
		} else if (error?.response?.status === 401) {
			location.replace(Approutes.auth.initial);
		}
	}

	return (
		<section className="mx-6 my-4">
			{stage !== 2 ? (
				<div>
					<h3 className="py-4">You are on: Boonfu Checkout</h3>

					<div className="flex flex-col space-y-6 lg:space-y-4 w-full md:w-[80%] mx-auto">
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

										<div className="border border-black/40 p-2 md:p-4 bg-secondary text-justify ">
											At Boonfu Marketplace, we are committed to ensuring a secure and efficient transaction
											experience for both buyers and sellers. The following policy applies to transactions
											involving self pick-up:
											<ol className="list-decimal ml-4 pl-4">
												<li>
													<h4 className="">Self Pick-Up Responsibility:</h4>
													<p className="">
														When a buyer opts for self pick-up after making payment for an item, it is the buyer's
														responsibility to initiate contact with the seller and arrange for pick-up within 24
														hours of payment confirmation.
													</p>
												</li>
												<li>
													<h4 className="">Failure to Arrange Pick-Up:</h4>
													<p className="">
														If the buyer fails to arrange or complete the pick-up within the 24-hour window, the
														transaction will be considered unfulfilled.
													</p>
												</li>
												<li>
													<h4 className="">Refund Process and Administrative Fee:</h4>
													<div className="">
														<span className="block">In such cases:</span>
														<ul>
															<li>The item will be relisted on the platform.</li>
															<li>
																The payment will be refunded to the originating account, minus a ₦1000
																administrative fee to cover bank charges, processing and platform handling costs.
															</li>
														</ul>
													</div>
												</li>
											</ol>
										</div>
										<div className="flex items-center justify-start gap-4">
											<InputGroup
												type="checkbox"
												name="agreed"
												id="agreed"
												onChange={(e) => setAgreed(e.target.checked)}
											/>
											<span>Agree to policy</span>
										</div>
									</div>
								</div>
							</div>
						</section>
						<div className="w-full lg:w-1/2 border-black  !px-2 !py-4 h-fit space-y-6">
							<table className="w-full ">
								<tbody className="border-b border-black/30">
									<tr>
										<td>Item</td>
										<td className="text-right">{toMoney(result?.data?.price)}</td>
									</tr>
								</tbody>
								<tfoot>
									<tr>
										<td>Order Total</td>
										<td className="text-right">{toMoney(result?.data?.price)}</td>
									</tr>
								</tfoot>
							</table>
							<div>
								<Button
									type="button"
									onClick={() => setPaymentModal(true)}
									variant={'primary'}
									className={'rounded-2xl font-bold text-xl'}
									disabled={!agreed}
								>
									Confirm and pay
								</Button>
							</div>
						</div>
					</div>
					<Modal
						isOpen={paymentModal}
						setIsOpen={setPaymentModal}
						modalHeader={false}
						className={' max-w-[720px] p-0 bg-white'}
					>
						<PaymentOption result={result} />
					</Modal>
				</div>
			) : (
				<ShowSellerContact
					pickup_address={checkOrder?.data.pickup_address}
					pickup_state={checkOrder?.data.pickup_state}
					pickup_mobile={checkOrder?.data.pickup_mobile}
					ad_owner_name={checkOrder?.data.ad_owner_name}
					escrow_id={checkOrder?.data.escrow_id}
				/>
			)}
		</section>
	);
};

export default PickUp;
