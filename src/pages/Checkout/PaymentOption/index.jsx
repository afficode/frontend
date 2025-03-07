import { toMoney } from '../../../utils';
import { Button } from '../../../ui';
import { useEscrow, useNotify } from '../../../hooks';
import { useParams } from 'react-router-dom';
import useAuth from '../../../context/UserContext';

const PaymentOption = ({ result, paymentOption, setPaymentOption, setStage }) => {
	const { mutate: pay, isLoading } = useEscrow();

	const { grabber_id, ad_id } = useParams();
	const { user } = useAuth();

	// console.log(user);

	const notify = useNotify();

	const handlePay = () => {
		pay(
			{
				amount: result?.data?.price,
				grabber_id: grabber_id,
				ad_id: ad_id,
				user_id: user?.id,
				payment_method: paymentOption === 'paystack' ? 'paystack' : 'wallet',
				stage: 'init',
				callback_url: 'https://boonfu.site/my-account/payment-success',
			},
			{
				onSuccess: (data) => {
					console.log(data);

					notify(data?.message, 'success');
					setStage(2);
				},
				onError: (error) => {
					console.log(error);

					notify(error?.response?.data?.message, 'error');
				},
			}
		);
	};

	return (
		<section className="border border-black">
			<h5 className="py-2 px-4 font-bold bg-gray-300">Payment options (select)</h5>

			<div className="px-4 py-6 bg-white">
				{/* select payment option  */}
				<div className="flex justify-between ">
					<div className="flex  gap-2">
						<input
							type="radio"
							name={'paystack'}
							id={'paystack'}
							value={'paystack'}
							checked={paymentOption === 'paystack'}
							onChange={(e) => setPaymentOption(e.target.value)}
							className={`mt-1 cursor-pointer`}
						/>
						<label htmlFor="paystack" className=" cursor-pointer">
							Paystack
							{/* <div className="flex gap-2 items-center">
								<img src={Visa} alt="/" className="w-8" />
								<img src={Mastercard} alt="/" className="w-6" />
							</div> */}
						</label>
					</div>

					<div className="flex  gap-2">
						<input
							type="radio"
							name={'boonfu_wallet'}
							id="boonfu_wallet"
							value={'boonfu_wallet'}
							checked={paymentOption === 'boonfu_wallet'}
							onChange={(e) => setPaymentOption(e.target.value)}
							className={`mt-1 cursor-pointer`}
						/>
						<label htmlFor="boonfu_wallet" className="cursor-pointer">
							Boonfu wallet
						</label>
					</div>
				</div>

				{/* paystack option ui */}
				{paymentOption === 'paystack' && (
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
									<td>{toMoney(result?.data?.price)}</td>
								</tr>
							</tfoot>
						</table>
						<div>
							<Button
								type="button"
								onClick={handlePay}
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
				)}

				{/* boonfu wallet option ui */}
				{paymentOption === 'boonfu_wallet' && (
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
									<td>{toMoney(result?.data?.price)}</td>
								</tr>
							</tfoot>
						</table>
						<div>
							<Button
								type="button"
								onClick={handlePay}
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
				)}
			</div>
		</section>
	);
};

export default PaymentOption;
