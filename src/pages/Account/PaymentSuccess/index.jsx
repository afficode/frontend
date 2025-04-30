import { Link, useLocation } from 'react-router-dom';
import { BoonfuLogo } from '../../../assets/images';

const PaymentSuccess = () => {
	const location = useLocation();

	const queryParams = new URLSearchParams(location.search);

	const amount = queryParams.get('amount');
	const reference = queryParams.get('reference');

	return (
		<div className="h-screen flex flex-col items-center justify-center space-y-6 text-center px-4">
			<img src={BoonfuLogo} alt="Boonfu" />
			<h4 className="text-primary font-bold ">Your transaction was successful</h4>
			<table className="table  max-w-[25rem] border border-b border-b-gray-500">
				<thead className="text-bold text-primary ">
					<tr>
						<th>Amount (₦)</th>
						<th>Reference ID</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{amount}</td>
						<td>{reference}</td>
					</tr>
				</tbody>
			</table>
			<p className="font-semibold text-sm">
				If you're not redirected in 5sec, Click here to go home{' '}
				<Link to={'/'} className="text-secondary font-bold underline">
					Boonfu Website
				</Link>
			</p>
		</div>
	);
};

export default PaymentSuccess;
