import React from 'react';
import Details from './Details';

const TransactionActivity = () => {
	return (
		<section className="w-full flex flex-col items-center gap-6">
			<div className="w-max mx-auto px-4 py-8 space-y-4 bg-[#D9D9D9]">
				<h2>Transaction Activity</h2>

				<div className="bg-white rounded-lg p-4 space-y-2">
					<h5 className="text-lg font-semibold">Activities</h5>

					<div className="overflow-x-auto w-full">
						<table>
							<thead className="bg-primary text-white ">
								<tr className="p-2">
									<th>Date</th>
									<th>Order(s)</th>
									<th>Delivery type</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>10.11.25</td>
									<td>JBL Headphone 0127846253HD</td>
									<td>Boonfu delivery</td>
									<td>Order placed</td>
								</tr>
								<tr>
									<td>10.11.25</td>
									<td>JBL Headphone 0127846253HD</td>
									<td>Boonfu delivery</td>
									<td>Order placed</td>
								</tr>
								<tr>
									<td>10.11.25</td>
									<td>JBL Headphone 0127846253HD</td>
									<td>Boonfu delivery</td>
									<td>Order placed</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<Details />
		</section>
	);
};

export default TransactionActivity;
