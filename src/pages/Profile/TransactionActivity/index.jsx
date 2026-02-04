import { useState } from 'react';
import { useGetOrders, useGetEscrowDetails } from '../../../hooks';
import { Modal } from '../../../ui';
import { format, parseISO } from 'date-fns';
import { SpinnerSkeleton } from '../../../components';
import { IoCalendarSharp, IoReorderFourSharp } from 'react-icons/io5';
import {  TbStatusChange } from 'react-icons/tb';
import { BsCashCoin } from 'react-icons/bs';
import ShowSellerContact from '../../Checkout/PickUp/ShowSellerContact';
import NavigatePayment from './NavigatePayment';

import { PiUserListFill } from 'react-icons/pi';
import { MdManageHistory } from 'react-icons/md';
import { ImCheckboxChecked } from 'react-icons/im';
const TransactionActivity = () => {
    const [pickupEscrowModal, setPickupEscrowModal] = useState(false);
    const [pickupEscrowOrderId, setPickupEscrowOrderId] = useState(null);

    const { data: allOrders, isLoading } = useGetOrders();

    const {
        data: escrowDetails,
        isLoading: escrowLoading,
        isError: escrowError,
        error: escrowErrorData,
    } = useGetEscrowDetails(pickupEscrowOrderId);

    const handleEscrowSelfPickUp = (id) => {
        setPickupEscrowOrderId(id);
        setPickupEscrowModal(true);
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
            <div className="max-w-6xl w-full mx-auto px-4 py-8 space-y-4 bg-[#D9D9D9] rounded-lg">
                <h3>Transaction Activity</h3>

                <div className="bg-white rounded-lg p-4 space-y-2 w-full">
                    <h5 className="text-lg font-semibold text-center">Activities</h5>
                    <div className="overflow-x-auto w-full">
                        {allOrders?.sortedOrders?.length > 0 ? (
                            <table className="min-w-max w-full table-auto">
                                <thead className="bg-primary text-white w-full">
                                    <tr className="p-2 w-full ">
                                        <th className="border-2 border-white">
                                            <span className="flex p-2 gap-1 items-center justify-center">
                                                <MdManageHistory className='text-xl' />
                                            </span>
                                        </th>
                                        <th className="border-2 border-white">
                                            <span className="flex p-2 gap-1 items-center">
                                                <IoCalendarSharp />
												Date
                                            </span>
                                        </th>
                                        <th className="border-2 border-white ">
                                            <span className="flex gap-1 items-center">
                                                <IoReorderFourSharp />
												Order(s){' '}
                                            </span>
                                        </th>
                                        {/* <th className="border-2 border-white ">
											<span className="flex gap-1 items-center px-2">
												<TbTruckDelivery /> Delivery type{' '}
											</span>
										</th> */}
                                        <th className="border-2 border-white ">
                                            <span className="flex gap-1 items-center justify-center">
                                                <TbStatusChange /> Status{' '}
                                            </span>
                                        </th>
                                        <th className="border-2 border-white">
                                            <span className="flex gap-1 items-center justify-center">
                                                <BsCashCoin /> Payment Status{' '}
                                            </span>
                                        </th>
                                        <th className="border-2 border-white">
                                            <span className="flex gap-1 items-center justify-center">
                                                <TbStatusChange /> Delivery Status{' '}
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allOrders?.sortedOrders?.map((order) => (
                                        <tr
                                            key={order.id}
                                            role="button"
                                            onClick={() => {
                                                if (
                                                    order.escrow_type === 'self_pickup' &&
													order.stage === 'init' &&
													order?.delivery_status.toLowerCase() === 'in discussion'
                                                ) {
                                                    handleEscrowSelfPickUp(order.id);
                                                }

                                                if (order.escrow_type === 'self_pickup' && order.price && order.paid === 0) {
                                                    handleEscrowSelfPickUp(order.id);
                                                }
                                            }}
                                            className={`hover:bg-gray-100 ${order.escrow_type === 'self_pickup' &&
												order.stage === 'init' &&
												order?.delivery_status.toLowerCase() === 'in discussion'
                                                ? 'cursor-pointer'
                                                : 'cursor-not-allowed'
                                            }`}
                                        >
                                            <td className="border-2 border-white bg-gray-50 flex items-center justify-center">
                                                {order?.has_pending_refund === 1 ? <span className="loading loading-spinner text-warning"></span> : order.escrow_type === 'self_pickup' &&
													order.stage === 'init' &&
													order?.delivery_status.toLowerCase() === 'in discussion'
                                                    ? <PiUserListFill className='text-primary text-xl' />
                                                    : <ImCheckboxChecked className='text-success text-xl' />}
                                            </td>
                                            <td className='border-2 border-white'>{format(parseISO(order?.created_at), 'd MMMM ')}</td>
                                            <td className="capitalize border-2 border-white">{order?.title}</td>
                                            {/* <td className="border-2 border-white">
												{order?.escrow_type
													.split('_')
													.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
													.join(' ')}
											</td> */}
                                            <td className={`w-max  border-2 border-white text-center capitalize rounded-none  ${order?.stage === 'init'
                                                ? 'badge-primary'
                                                : order?.stage === 'release'
                                                    ? 'badge-success'
                                                    : order?.stage === 'refund'
                                                        ? 'badge-secondary'
                                                        : 'badge-success'
                                            }`}>
                                                <span>
                                                    {order.escrow_type === 'self_pickup' && order.paid === 1
                                                        ? (order?.stage === 'init' ? 'Paid' : order?.stage === 'refund' ? 'Refunded' : order?.stage === 'release' ? 'Credited Buyer' : order?.stage) ?? 'escrow_service'
                                                        : `${order?.stage}` ?? 'escrow_service'}
                                                </span>
                                            </td>
                                            <td className={`w-max text-center border-2 border-white capitalize ${order?.has_pending_refund === 1 ? 'badge-error' : order?.escrow_type === 'self_pickup' && order?.status === 'success' ? 'badge-success' : 'badge-warning'}`}>
                                                {order?.escrow_type === 'self_pickup' && (
                                                    <>

                                                        {order?.has_pending_refund === 1 ? (
                                                            <span>Refund Processing</span>
                                                        ) : order?.escrow_type === 'self_pickup' && order?.status === 'success' ? (
                                                            <span>success</span>
                                                        ) : (
                                                            <span>pending</span>
                                                        )}
                                                    </>
                                                )}
                                            </td>
                                            <td className={`w-max  text-center border-2 border-white ${order?.delivery_status.toLowerCase() === 'in discussion' ? 'badge-primary' : order?.delivery_status.toLowerCase() === 'done' ? 'badge-success' : ''}`}>
                                                {order?.delivery_status && (
                                                    <span>
                                                        {order?.delivery_status}
                                                    </span>
                                                )}
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

            {pickupEscrowOrderId && (
                <Modal
                    isOpen={pickupEscrowModal}
                    setIsOpen={setPickupEscrowModal}
                    modalHeader={false}
                    className={' max-w-[720px] p-0 bg-secondary'}
                >
                    {escrowLoading ? (
                        <div className="flex items-center justify-center h-40">
                            <SpinnerSkeleton />
                        </div>
                    ) : escrowError ? (
                        <NavigatePayment
                            grabber_id={escrowErrorData?.response?.data?.grabber_id}
                            ad_id={escrowErrorData?.response?.data?.ad_id}
                            closeModal={setPickupEscrowModal}
                            isPaymentError={escrowErrorData?.status === 402 ? true : false}
                        />
                    ) : (
                        <ShowSellerContact
                            pickup_address={escrowDetails?.escrow.pickup_address}
                            pickup_state={escrowDetails?.escrow.pickup_state}
                            pickup_mobile={escrowDetails?.escrow.pickup_mobile}
                            ad_owner_name={escrowDetails?.escrow.ad_owner_name}
                            escrow_id={escrowDetails?.escrow.id}
                            has_pending_refund={escrowDetails?.escrow.has_pending_refund || 0}
                        />
                    )}
                </Modal>
            )}
        </section>
    );
};

export default TransactionActivity;
