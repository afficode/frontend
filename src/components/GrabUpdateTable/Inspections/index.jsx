import { Button, Modal } from '../../../ui';
import { useGetAdsSchedule, useGetSchedule } from '../../../hooks';
import { format, parse, parseISO } from 'date-fns';
import { useState } from 'react';
import InspectorCard from '../../InspectorCard';

const Inspections = ({ ad }) => {
	const { data: schedulesResult } = useGetAdsSchedule(ad?.id);

	const [inspectionModal, setInspectionModal] = useState(false);

	const [adId, setAdId] = useState(null);
	const { data: schedule, isLoading: scheduleLoading } = useGetSchedule(adId, {
		enabled: !!adId,
	});

	const handleClick = (id) => {
		setAdId(id);
		setInspectionModal(true);
	};

	return (
		<section className="my-8 space-y-4">
			<h4>Grab Update</h4>

			<Modal
				isOpen={inspectionModal}
				setIsOpen={setInspectionModal}
				padding={false}
				className={'max-w-fit px-4'}
			>
				<InspectorCard data={schedule} ad_id={ad?.id} isLoading={scheduleLoading} />
			</Modal>

			<div className="w-full border border-black/30 overflow-x-auto">
				<table className="w-full table  overflow-x-auto">
					<thead>
						<tr className=" text-center font-bold text-base text-black">
							<th>Inspection Date</th>

							<th>Time Range</th>

							<th>Latest Update </th>

							<th></th>
						</tr>
					</thead>
					{schedulesResult?.schedules.length > 0 ? (
						<tbody className="text-center">
							{schedulesResult?.schedules.map((schedule, i) => {
								const latest = schedule?.bookings.length - 1;
								const latestBooking = schedule?.bookings[latest];

								const getRemarkMessage = (remark) => {
									switch (remark) {
										case 'reschedule':
											return 'Reschedule';
										case 'confirmed':
											return 'Confirmed Date & Time.';
										case 'not_interested':
											return 'Not interested in the inspection.';
										case 'withdrawn':
											return 'Withdrawn from the site.';
										case 'not_available':
											return 'Item no longer available.';
										case 'view_contact':
											return 'You can view the contact now.';
										case 'ok':
											return 'Ok';
										default:
											return '';
									}
								};
								return (
									<tr key={i}>
										<td>{format(parseISO(latestBooking.date), 'EEEE d, MMMM yyyy')}</td>
										<td className="lowercase">
											{format(parse(latestBooking.time.from, 'HH:mm', new Date()), 'h:mma')} -{' '}
											{format(parse(latestBooking.time.to, 'HH:mm', new Date()), 'h:mma')}
										</td>
										<td>
											{latestBooking.user_id === ad?.owner ? (
												<span className=" text-xs bg-primary/50 px-2 rounded-lg ">You</span>
											) : (
												<span className=" text-xs bg-secondary/50 px-2 rounded-lg ">Inspector</span>
											)}{' '}
											<br />
											<span>{getRemarkMessage(latestBooking.remark)}</span>
										</td>
										<td className="font-bold">
											<Button
												onClick={() => handleClick(schedule.id)}
												variant={'primary'}
												size={'small'}
												className={'rounded-md'}
											>
												View
											</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
					) : null}
				</table>

				{schedulesResult?.schedules.length === 0 && (
					<div className="h-40 flex items-center justify-center text-primary font-bold">
						No Inspection Booked Yet
					</div>
				)}
			</div>
		</section>
	);
};

export default Inspections;
