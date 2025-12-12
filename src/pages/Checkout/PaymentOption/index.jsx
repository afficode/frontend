import { toMoney } from '../../../utils';
import { Button } from '../../../ui';
import { useEscrow, useNotify, useQuotedPay } from '../../../hooks';
import { useLocation, useParams } from 'react-router-dom';
import useAuth from '../../../context/UserContext';
import { frontendLink } from '../../../constants';

const PaymentOption = ({ result, quotePrice, orderId }) => {
	const { mutate: pay, isLoading } = useEscrow();

	const { grabber_id, ad_id } = useParams();
	const { user } = useAuth();
	const { pathname } = useLocation();

	const escrow_type = pathname.split('/')[2];

	const total = Number(result?.data?.price) + Number(quotePrice || 0);

	const notify = useNotify();

	const { mutateAsync: payEscrow, isLoading: escrowLoading } = useEscrow();
	const { mutateAsync: payQuoted, isLoading: quoteLoading } = useQuotedPay(orderId);

	const handlePay = async () => {
		try {
			const escrowPromise = payEscrow({
				amount: Number(result?.data?.price),
				grabber_id,
				ad_id,
				user_id: user?.id,
				payment_method: 'wallet',
				stage: 'init',
				callback_url: `${frontendLink}checkout/payment-success`,
				escrow_type: escrow_type === 'delivery' ? 'boonfu_delivery' : 'self_pickup',
			});
			const quotedPromise = payQuoted({ ad_id: ad_id });
			const [escrowData, quotedData] = await Promise.all([escrowPromise, quotedPromise]);

			notify('Payments successful', 'success');
		} catch (error) {
			notify(error?.response?.data?.message || 'Something went wrong', 'error');
		}
	};

	const handlePickupPay = () => {
		pay(
			{
				amount: Number(result?.data?.price),
				grabber_id: grabber_id,
				ad_id: ad_id,
				user_id: user?.id,
				payment_method: 'wallet',
				stage: 'init',
				callback_url: 'https://boonfu.site/checkout/payment-success',
				// callback_url: 'http://localhost:5173/checkout/payment-success',
				escrow_type: escrow_type === 'delivery' ? 'boonfu_delivery' : 'self_pickup',
			},
			{
				onSuccess: (data) => {
					console.log(data);
					// notify('Please pay', 'success');
					// window.location.replace(data?.url);
					// setStage(2);
				},
				onError: (error) => {
					notify(error?.response?.data?.message, 'error');
				},
			}
		);
	};

	return (
		<section className="border border-black">
			<h5 className="py-2 px-4 font-bold bg-gray-300">Payment</h5>

			<div className="px-4 py-6 bg-white">
				{/* select payment option  */}
				<p className="text-sm italic mb-4">
					Note: This payment will be deducted from your Boonfu wallet. Please ensure you have sufficient
					balance.
				</p>

				<div className=" mt-6 border-2 border-primary  !px-2 !py-4 h-fit space-y-6 max-w-[400px] mx-auto mb-4">
					<table className="w-full ">
						<tbody className="border-b border-black/30">
							<tr>
								<td>Item</td>
								<td>{toMoney(result?.data?.price)}</td>
							</tr>
							{quotePrice > 0 && (
								<tr>
									<td>Quote</td>
									<td>{toMoney(quotePrice)}</td>
								</tr>
							)}
						</tbody>
						<tfoot>
							<tr>
								<td>Order Total</td>
								<td>{toMoney(total)}</td>
							</tr>
						</tfoot>
					</table>
					<div>
						<Button
							type="button"
							onClick={escrow_type === 'pickup' ? handlePickupPay : handlePay}
							variant={'primary'}
							size={'full'}
							className={'rounded-2xl font-bold text-xl'}
							loading={escrowLoading || quoteLoading || isLoading}
							disabled={escrowLoading || quoteLoading || isLoading}
						>
							Confirm and pay
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PaymentOption;
