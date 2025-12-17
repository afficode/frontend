import { Button, Modal } from '../../ui';
import { useState } from 'react';
import PaymentOption from './PaymentOption';
import { useParams } from 'react-router-dom';
import { SpinnerSkeleton } from '../../components';
import { fetchProduct } from '../../hooks';
import { toMoney } from '../../utils';

const Checkout = () => {
	const [paymentModal, setPaymentModal] = useState(false);

	const { grabber_id, ad_id } = useParams();
	const { data: result, isLoading } = fetchProduct(ad_id);

	if (isLoading)
		return (
			<div className="h-screen">
				<SpinnerSkeleton />
			</div>
		);

	return (
		<section className="mx-6 my-4">
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

export default Checkout;
