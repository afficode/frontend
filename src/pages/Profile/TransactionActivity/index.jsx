import React, { useState } from 'react';
import Details from './Details';
import { useGetOrder, useGetOrders } from '../../../hooks';
import { Modal } from '../../../ui';
import { format, parseISO } from 'date-fns';
import { SpinnerSkeleton } from '../../../components';

const TransactionActivity = () => {
	const [orderModal, setOrderModal] = useState(false);
	const [orderId, setOrderId] = useState(null);

	const { data: allOrders, isLoading } = useGetOrders();
	const { data: order, isLoading: orderLoading } = useGetOrder(orderId ?? '', {
		enabled: !!orderId,
	});

	const handleOrderClick = (id) => {
		setOrderId(id);
		setOrderModal(true);
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-72">
				<SpinnerSkeleton />
			</div>
		);
	}

	return (
		<section className="w-full flex flex-col items-center gap-6">
			<div className="w-max mx-auto px-4 py-8 space-y-4 bg-[#D9D9D9]">
				<h2>Transaction Activity</h2>

				<div className="bg-white rounded-lg p-4 space-y-2">
					<h5 className="text-lg font-semibold">Activities</h5>

					<div className="overflow-x-auto w-full">
						{allOrders?.orders?.length > 0 ? (
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
									{allOrders?.orders?.map((order) => (
										<tr
											key={order.id}
											role="button"
											onClick={() => handleOrderClick(order.id)}
											className="hover:bg-gray-100 "
										>
											<td>{format(parseISO(order?.updated_at), 'd MMMM ')}</td>
											<td>{order?.title}</td>
											<td>Boonfu delivery</td>
											<td>
												{order.price && order.paid === 0
													? 'Order Quoted'
													: order.price && order.paid === 1
													? 'Order placed'
													: !order.price && order.paid === 0
													? 'Waiting for Quote'
													: ''}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<p>No activity to display</p>
						)}
					</div>
				</div>
			</div>

			{orderId && (
				<Modal
					isOpen={orderModal}
					setIsOpen={setOrderModal}
					modalHeader={false}
					className={' max-w-[720px] p-0'}
				>
					{orderLoading ? (
						<div className="flex items-center justify-center h-40">
							<SpinnerSkeleton />
						</div>
					) : (
						<Details data={order} />
					)}
				</Modal>
			)}
		</section>
	);
};

export default TransactionActivity;
