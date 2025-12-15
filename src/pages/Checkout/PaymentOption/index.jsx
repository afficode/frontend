import { toMoney } from '../../../utils';
import { Button } from '../../../ui';
import { useEscrow, useNotify } from '../../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../../context/UserContext';
import { Approutes } from '../../../constants';

const PaymentOption = ({ result }) => {
	const { mutate: pay, isLoading } = useEscrow();

	const { grabber_id, ad_id } = useParams();
	const { user } = useAuth();

	const adPrice = Number(result?.data?.price);

	const notify = useNotify();
	const navigate = useNavigate();

	const handlePickupPay = () => {
		pay(
			{
				amount: adPrice,
				grabber_id: grabber_id && grabber_id,
				ad_id: ad_id,
				user_id: user?.id,
				payment_method: 'wallet',
				stage: 'init',
				callback_url: 'https://boonfu.site/checkout/payment-success',
				escrow_type: 'self_pickup',
			},
			{
				onSuccess: (data) => {
					notify(data?.message, 'success');
					if (data?.payment_payload) {
						navigate(
							Approutes.checkout.paymentSuccess +
								`?transaction_id=${data?.payment_payload?.payment_id}&ad_title=${data?.payment_payload?.ad_title}`
						);
					}
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
						</tbody>
						<tfoot>
							<tr>
								<td>Order Total</td>
								<td>{toMoney(adPrice)}</td>
							</tr>
						</tfoot>
					</table>
					<div>
						<Button
							type="button"
							onClick={handlePickupPay}
							variant={'primary'}
							size={'full'}
							className={'rounded-2xl font-bold text-xl'}
							loading={isLoading}
							disabled={isLoading}
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
