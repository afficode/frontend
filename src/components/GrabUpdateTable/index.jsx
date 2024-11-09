import { Button, InputGroup } from '../../ui';
import { Approutes } from '../../constants';
import { Link } from 'react-router-dom';
import { useGetAdsSchedule } from '../../hooks';
import { format, parse, parseISO } from 'date-fns';

const GrabUpdateTable = ({ ad }) => {
	const { data: schedulesResult } = useGetAdsSchedule(ad?.id);

	return ad?.category === 5001 || ad?.category === 5002 ? (
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
						{schedulesResult?.schedules.map((schedule) => {
							const latest = schedule?.bookings.length - 1;
							const latestBooking = schedule?.bookings[latest];
							// console.log('latest', latestBooking);

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
								<tr>
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
										<Link to={Approutes.grab.inspectionLog}>
											<Button variant={'primary'} size={'small'} className={'rounded-md'}>
												View
											</Button>
										</Link>
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
	) : (
		<div className="w-full border border-black  overflow-x-auto">
			<table className="w-full table table-fixed overflow-x-auto">
				<thead>
					<tr className=" text-center font-bold text-base text-black">
						<th>Date</th>

						<th>Location</th>

						<th>Visitor</th>

						<th>Amount offering (#)</th>
					</tr>
				</thead>
				<tbody className="text-center">
					<tr>
						<td>25.12.2024</td>
						<td>Lagos State</td>
						<td>crystal</td>
						<td className="font-bold">100,000.00</td>
					</tr>
					<tr>
						<td>25.12.2024</td>
						<td>Lagos State</td>
						<td>crystal</td>
						<td className="font-bold">100,000.00</td>
					</tr>
					<tr>
						<td>25.12.2024</td>
						<td>Lagos State</td>
						<td>crystal</td>
						<td className="font-bold">100,000.00</td>
					</tr>
				</tbody>
			</table>

			<div className="mb-4">
				<div className="mt-8 bg-secondary px-6 py-2">
					<p>
						Given the amounts offered, would you like to adjust your price? If YES, please click on adjust
						price to key in a new amount and hit submit button when you are done.
					</p>
				</div>

				<form className="flex justify-between items-center py-4 px-6">
					<div className="flex items-end gap-6">
						<Button type="button" variant={'grey'}>
							Adjust Price
						</Button>

						<label>
							New Price (₦)
							<InputGroup type={'number'} className={'!my-[-.5rem] font-bold'} />
						</label>
					</div>

					<Button type="submit " variant={'primary'} className={'rounded-lg'}>
						Submit
					</Button>
				</form>
			</div>
		</div>
	);
};

export default GrabUpdateTable;
