import { ArrowRightBlack, RedirectIcon, SuccessTick } from '../../../assets/svgs';
import { PaymentSuccessful } from '../../../assets/images';
import { Approutes } from '../../../constants';
import { Link } from 'react-router-dom';

const PaymentSuccess = ({ grabber_id, ad_id, ad }) => {
	return (
		<div className="max-w-[720px] py-6 px-4 flex flex-col gap-8 m-auto ">
			<div className="flex flex-col items-center gap-4">
				<img src={PaymentSuccessful} className="w-[180px]" alt="Payment successful" />
				<div className="space-y-2 text-center">
					<h3>Payment Successful</h3>
					<p>Successfully paid: {ad?.data?.price}</p>
				</div>
			</div>

			<div className="space-y-2">
				<h4>Transaction info</h4>
				<table className="w-full border border-black/50 ">
					<tbody>
						<tr>
							<td>Transaction ID</td>
							<td>1234567890</td>
						</tr>
						<tr>
							<td>Item paid for</td>
							<td>{ad?.data?.title}</td>
						</tr>
						<tr>
							<td>Date</td>
							<td>23 April, 2025</td>
						</tr>
						<tr>
							<td>Type of transaction</td>
							<td>Bank transfer</td>
						</tr>
						<tr>
							<td>Delivery type</td>
							<td>Boonfu Delivery</td>
						</tr>
						<tr>
							<td>Grabber ID</td>
							<td>12903BF</td>
						</tr>
						<tr>
							<td>Status</td>
							<td>
								<div className="flex items-center gap-1 bg-[#047F7370] py-1 px-2 font-medium rounded-xl w-fit">
									<img src={SuccessTick} className="w-4" alt="successful" />
									<span>Success</span>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="space-y-6">
				<div className="flex items-center justify-between border-b border-black/50">
					<button className="flex items-center gap-2">
						<img src={RedirectIcon} className="w-4" alt="rethinking?" />
						Change delivery type
					</button>
					<img src={ArrowRightBlack} className="w-2" alt="Arrow right" />
				</div>
				<div className="flex items-center justify-between border-b border-black/50">
					<Link to={Approutes.profile.transactions}>
						<button className="flex items-center gap-2 text-primary">
							<img src={RedirectIcon} className="w-4" alt="rethinking?" />
							View your order(s)
						</button>
					</Link>
					<img src={ArrowRightBlack} className="w-2" alt="Arrow right" />
				</div>
			</div>
		</div>
	);
};

export default PaymentSuccess;
