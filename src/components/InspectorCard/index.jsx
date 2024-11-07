import { useMemo } from 'react';
import { Inspector } from '../../assets/svgs';
import { Button, InputGroup } from '../../ui';
import { useFormik } from 'formik';
import { format, parse, parseISO } from 'date-fns';
import {
	useCreateSchedule,
	useGetSchedule,
	useGetSchedules,
	useNotify,
	useUpdateSchedule,
} from '../../hooks';
import useAuth from '../../context/UserContext';
import { useQueryClient } from 'react-query';

const InspectorCard = ({ data, isLoading }) => {
	const { mutate, isLoading: submitting } = useUpdateSchedule(data?.schedules?.id);

	// console.log('ad schedules', data?.schedules);

	const latest = data?.schedules?.bookings.length - 1;
	const latestBooking = data?.schedules?.bookings[latest];

	console.log('latest', latestBooking?.date);

	const { user } = useAuth();
	// console.log('data', data?.schedules?.owner);
	const notify = useNotify();
	const queryClient = useQueryClient();

	const initialValues = {
		// user_id: user.id,
		owner: data?.schedules?.owner,
		ad_id: data?.schedules?.ad_id,
		remark: '',
		date: '',
		time: {
			from: '',
			to: '',
		},
	};

	const handleSubmit = (values, { resetForm }) => {
		let formData;
		if (values.remark === 'reschedule') {
			formData = {
				...values,
			};
		} else {
			formData = {
				...values,
				date: latestBooking?.date,
				time: {
					from: latestBooking?.time?.from,
					to: latestBooking?.time?.to,
				},
			};
		}

		// console.log('formdata', formData);

		mutate(formData, {
			onSuccess: (data) => {
				notify(data?.message, 'success');
				queryClient.invalidateQueries('get-schedule');
				resetForm();
			},
			onError: (error) => {
				console.log(error);
				notify(error?.response.data.message, 'error');
			},
		});
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		enableReinitialize: true,
	});

	console.log('formik', initialValues);

	const showDateInput = useMemo(() => {
		if (formik.values.remark === 'reschedule') {
			return true;
		}
		return false;
	}, [formik.values.remark]);

	const from = parse(formik.values.time.from, 'HH:mm', new Date());
	const to = parse(formik.values.time.to, 'HH:mm', new Date());

	return (
		<div className="max-w-[500px] border  p-4">
			<div className="flex items-center justify-between">
				{user?.id === data?.schedules?.owner ? (
					<h4 className="">Inspector’s schedule :</h4>
				) : (
					<h4 className="">Response from: {data?.schedules?.ad_details.title}</h4>
				)}
				<img src={Inspector} alt="/" className="w-12" />
			</div>

			<div className="space-y-2">
				{data?.schedules?.bookings.map((booking) => {
					return (
						<div key={booking.id} className="bg-secondary px-2 py-4 sm:p-4 rounded-lg italic	sm:mr-6">
							<div className="flex items-center gap-2">
								{booking?.remark === 'reschedule' ? (
									<p>Rescheduled Date & Time.</p>
								) : booking?.remark === 'confirmed' ? (
									<p>Confirmed Date & Time.</p>
								) : booking?.remark === 'not_interested' ? (
									<p>Not interested in the inspection.</p>
								) : booking?.remark === 'withdrawn' ? (
									<p>Withdrawn from the site.</p>
								) : booking?.remark === 'not_available' ? (
									<p>Item no longer available.</p>
								) : booking?.remark === 'view_contact' ? (
									<p>You can view the contact now.</p>
								) : booking?.remark === 'ok' && data?.schedules?.owner === user?.id ? (
									<>
										<p>Inspector:</p>
										<p>{data?.schedules?.buyer_name}</p>
									</>
								) : null}
							</div>

							<div className="flex items-center gap-2">
								<p>For:</p>
								<p className="capitalize">{data?.schedules?.ad_details.title}</p>
							</div>
							<div className="flex items-center gap-2">
								<p>
									{latestBooking?.remark === 'reschedule' &&
									booking?.remark === 'reschedule' &&
									latestBooking?.id === booking?.id
										? 'New'
										: null}{' '}
									Date:
								</p>

								<p> {format(parseISO(booking?.date), 'dd.MM.yyyy')}</p>
							</div>
							<div className="flex items-center gap-2">
								<p>
									{latestBooking?.remark === 'reschedule' &&
									booking?.remark === 'reschedule' &&
									latestBooking?.id === booking?.id
										? 'New'
										: null}{' '}
									Time:
								</p>
								<p className="lowercase">
									{format(parse(booking.time.from, 'HH:mm', new Date()), 'h:mma')} to{' '}
									{format(parse(booking.time.to, 'HH:mm', new Date()), 'h:mma')}
								</p>
							</div>
						</div>
					);
				})}

				{/* <div className="bg-secondary px-2 py-4 sm:p-4 rounded-lg italic	sm:mr-6">
					<div className="flex items-center gap-2">
						<p>Rescheduled Date & Time.</p>
					</div>

					<div className="flex items-center gap-2">
						<p>For:</p>
						<p>Black Toyota Corolla 2022 Inspection</p>
					</div>
					<div className="flex items-center gap-2">
						<p>New Date:</p>
						<p> 02.11.2024</p>
					</div>
					<div className="flex items-center gap-2">
						<p>New Time:</p>
						<p> 1pm to 4pm</p>
					</div>
				</div> */}
			</div>

			<div className=" border-t border-black/40 py-4 mt-4">
				{user?.id === data?.schedules?.owner ? (
					<h4 className="capitalize">
						{data?.schedules?.ad_details.title} <span className="lowercase">reply</span>:
					</h4>
				) : (
					<h4>Inspector's reply:</h4>
				)}

				<form onSubmit={formik.handleSubmit}>
					<InputGroup
						name={'remark'}
						type={'select'}
						label={'Select a response'}
						moreInfo={'Select a response'}
						value={formik.values.remark}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						optionLists={
							user?.id === data?.schedules?.owner ? sellerResponseOptions : buyerResponseOptions
						}
						className={'customSelectInput'}
					/>
					{showDateInput && (
						<>
							<InputGroup
								name={'date'}
								type={'date'}
								label={'Reschedule Date'}
								value={formik.values.date}
								onChange={formik.handleChange}
								moreInfo={'Select a date and the time range you will be available '}
								onBlur={formik.handleBlur}
								className={'customSelectInput'}
							/>
							<div className="flex gap-6 ">
								<InputGroup
									name={'time.from'}
									type={'time'}
									label={'From'}
									value={formik.values.time.from}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className={'customSelectInput'}
								/>
								<InputGroup
									name={'time.to'}
									type={'time'}
									label={'To'}
									// moreInfo={'Choose a time range you would be available'}
									value={formik.values.time.to}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className={'customSelectInput'}
								/>
							</div>

							{formik.values.time.from && formik.values.time.to ? (
								<div>
									<p>
										Selected time range: <b>{format(from, 'h:mm a')}</b> - <b>{format(to, 'h:mm a')}</b>
									</p>
								</div>
							) : null}
						</>
						// <InputGroup
						// 	name={'reschedule_date'}
						// 	type={'textarea'}
						// 	label={'Reschedule Date'}
						// 	moreInfo={'Input the date you want to reschedule to.'}
						// 	rows={'2'}
						// 	value={formData.reschedule_date}
						// 	onChange={handleChange}
						// 	className={'customSelectInput'}
						// />
					)}

					{latestBooking?.user_id === user?.id ? (
						<Button
							onClick={() => {
								notify("You can't send another response, patiently wait for a reply", 'error');
							}}
							variant={'primary'}
							type="button"
							// disabled={true}
							className={'rounded-lg mt-4'}
						>
							Send
						</Button>
					) : (
						<Button variant={'primary'} type="submit" loading={submitting} className={'rounded-lg mt-4'}>
							Send
						</Button>
					)}
				</form>
			</div>
		</div>
	);
};

export default InspectorCard;
// 'ok', 'reschedule', 'not_interested', 'confirmed', 'not_available', 'withdrawn', 'view_contact'
const sellerResponseOptions = [
	{ value: '', key: 'Select a response' },
	{
		key: 'I can do this time and date (reschedule now).',
		value: 'reschedule',
	},
	// { value: 'I confirm Date & Time', key: 'I confirm Date & Time' },
	// {
	// 	value: 'I am not available for this inspection ',
	// 	key: 'I am not available for this inspection ',
	// },
	{ value: 'withdrawn', key: 'Withdrawn from site' },
	{ value: 'not_available', key: 'Item no longer available' },
	{ value: 'view_contact', key: 'You can View my contact now.' },
];
const buyerResponseOptions = [
	{ value: '', key: 'Select a response' },
	{
		key: 'Ok, that’s fine by me, please confirm.',
		value: 'ok',
	},
	{ value: 'not_interested', key: 'I am no longer interested.' },
	{ value: 'reschedule', key: 'I have to reschedule' },
];
