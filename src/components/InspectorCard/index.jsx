import { useMemo } from 'react';
import { Inspector } from '../../assets/svgs';
import { Button, InputGroup } from '../../ui';
import { useFormik } from 'formik';
import { format, parse } from 'date-fns';
import { useCreateSchedule, useGetSchedule, useGetSchedules } from '../../hooks';

const InspectorCard = () => {
	const { data } = useGetSchedules();

	const { mutate, isLoading: submitting } = useCreateSchedule();

	// console.log(data);

	const handleSubmit = (values, { resetForm }) => {
		// console.log(values);

		const formData = {
			...values,
		};

		mutate(formData, {
			onSuccess: (data) => {
				// console.log(data);
				resetForm();
			},
			onError: (error) => {
				// console.log(error);
			},
		});
	};

	const formik = useFormik({
		initialValues: {
			remark: '',
			date: '',
			time: {
				from: '',
				to: '',
			},
		},
		onSubmit: handleSubmit,
	});

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
				<h4 className="">Inspector’s schedule :</h4>
				<img src={Inspector} alt="/" className="w-12" />
			</div>

			<div className="space-y-2">
				<div className="bg-secondary px-2 py-4 sm:p-4 rounded-lg italic	sm:mr-6">
					<div className="flex items-center gap-2">
						<p>Inspector:</p>
						<p>Godstime</p>
					</div>

					<div className="flex items-center gap-2">
						<p>For:</p>
						<p>Black Toyota Corolla 2022 Inspection</p>
					</div>
					<div className="flex items-center gap-2">
						<p>Date:</p>
						<p> 29.10.2024</p>
					</div>
					<div className="flex items-center gap-2">
						<p>Time:</p>
						<p> 10am to 2pm</p>
					</div>
				</div>

				<div className="bg-secondary px-2 py-4 sm:p-4 rounded-lg italic	sm:mr-6">
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
				</div>
			</div>

			<div className=" border-t border-black/40 py-4 mt-4">
				<h4>Black Toyota Camry reply:</h4>
				<form onSubmit={formik.handleSubmit}>
					<InputGroup
						name={'remark'}
						type={'select'}
						label={'Select a response'}
						moreInfo={'Select a response'}
						value={formik.values.remark}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						optionLists={buyerResponseOptions}
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

					<Button variant={'primary'} type="submit" loading={submitting} className={'rounded-lg mt-4'}>
						Send
					</Button>
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
		value: 'confirmed',
	},
	{ value: 'not_interested', key: 'I am no longer interested.' },
	{ value: 'reschedule', key: 'I have to reschedule' },
];
