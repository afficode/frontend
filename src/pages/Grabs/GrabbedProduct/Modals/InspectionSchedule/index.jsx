import { Button } from '../../../../../ui';
import useAuth from '../../../../../context/UserContext';
import { Approutes } from '../../../../../constants';
import { useFormik } from 'formik';
import { useCreateSchedule, useNotify } from '../../../../../hooks';
import { format, parse } from 'date-fns';

const InspectionSchedule = ({ setInspectionModalOpen, ad }) => {
	const { user } = useAuth();
	// console.log(ad);

	const notify = useNotify();

	const { mutate, isLoading } = useCreateSchedule();
	// console.log(user);

	// inspection scheduling form for cars and properties

	const handleInspectionSubmit = async (values, { resetForm }) => {
		// console.log(values);

		const formData = {
			...values,
			user_id: user.id,
			owner: ad?.owner,
			ad_id: ad?.id,
			category: ad?.category,
			remark: 'ok',
		};

		if (!user.isLogin) {
			notify("You don't have an account with Boonfu, Create one to book inspection", 'error');

			setTimeout(() => {
				navigate(Approutes.auth.initial);
			}, 2000);
		} else {
			// console.log('data to submit', formData);
			mutate(formData, {
				onSuccess: (data) => {
					// console.log(data);
					notify('Inspection Booked successfully', 'success');
					resetForm();
					setTimeout(() => {
						navigate(Approutes.grab.inspectionLog);
					}, 2000);
				},
				onError: (error) => {
					notify(error?.response.data.message, 'error', {
						toastId: 'inspection-error',
					});
				},
			});
		}
	};
	// inspection scheduling end

	const formik = useFormik({
		initialValues: {
			date: '',
			time: {
				from: '',
				to: '',
			},
		},
		onSubmit: handleInspectionSubmit,
	});

	const from = parse(formik.values.time.from, 'HH:mm', new Date());
	const to = parse(formik.values.time.to, 'HH:mm', new Date());

	return (
		<div>
			<form className="flex flex-col space-y-4" onSubmit={formik.handleSubmit}>
				<label htmlFor="user_id" className="flex flex-col font-medium">
					Firstname
					<input
						type="text"
						name="user_id"
						id="user_id"
						placeholder="crystalgush"
						value={user.firstname}
						disabled
					/>
				</label>
				<label htmlFor="date" className="flex flex-col font-medium">
					Select inspectation date
					<input
						type="date"
						name="date"
						id="date"
						placeholder="29.10.2024"
						value={formik.values.date}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
				</label>

				<div className="flex items-center">
					<label htmlFor="start_time" className="flex flex-col font-medium">
						Time (From - To)
						<div className="flex items-center gap-4">
							<input
								type="time"
								name="time.from"
								id="time"
								placeholder="11 : 00am"
								value={formik.values.time.from}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							<input
								type="time"
								name="time.to"
								id="time"
								placeholder="1 : 00pm"
								value={formik.values.time.to}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</div>
					</label>
				</div>

				{formik.values.time.from && formik.values.time.to ? (
					<div>
						<p>
							Selected time range: <b>{format(from, 'h:mm a')}</b> - <b>{format(to, 'h:mm a')}</b>
						</p>
					</div>
				) : null}

				<div className="space-y-4">
					<p>
						Please be double sure of the date and inspection time set, as you might not have the
						opportunity to re-schedule another one for <b className="text-white">free</b>.
					</p>
					<div className="flex items-center gap-6">
						<Button
							type="submit"
							variant={'primary'}
							size={'small'}
							loading={formik.isSubmitting || isLoading}
							disabled={!formik.dirty || formik.isSubmitting}
						>
							Submit
						</Button>
						<Button
							type="button"
							onClick={() => setInspectionModalOpen(false)}
							variant={'plain'}
							size={'small'}
						>
							Cancel
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default InspectionSchedule;
