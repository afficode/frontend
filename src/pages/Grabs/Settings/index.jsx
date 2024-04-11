import React from 'react';
import { EditPencil } from '../../../assets/svgs';
import { InputGroup } from '../../../ui';
import { toSelectOptions } from '../../../utils';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useStates } from '../../../hooks';
import { ToggleSwitch } from 'flowbite-react';
import GrabHeader from '../GrabHeader';

const GrabSettings = () => {
	const { data: states } = useStates();
	const statesOptions = toSelectOptions(states, 'states', 'Select your state');

	const initialValues = {
		location: '',
		phone: '',
		social: {
			twitter: '',
			facebook: '',
			whatsapp: '',
			instagram: '',
			tiktok: '',
		},
		email_address: '',
		password: '',
		new_product: false,
		sold_product: false,
		new_visitor: false,
		purchase: false,
		commission: false,
		low_coins: false,
		news_updates: false,
		sms: false,
		email_notification: false,
		subscription: false,
		feedback: false,
	};

	const validationSchema = Yup.object({
		location: Yup.string().required('Required'),
		phone: Yup.number().required('Required'),
		social: {
			twitter: Yup.string().required('Required'),
			facebook: Yup.string().required('Required'),
			whatsapp: Yup.number().required('Required'),
			instagram: Yup.string().required('Required'),
			tiktok: Yup.string().required('Required'),
		},
		email_address: Yup.string().required('Required').email('Invalid email address'),
	});

	const handleSubmit = (values) => {
		console.log(values);
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSubmit,
		validationSchema,
	});

	return (
		<section className="space-y-8 mb-12 ">
			<GrabHeader text="Grab Account settings" />

			<div className="bg-gray-300 p-6 my-6 space-y-12">
				<div className="border-b border-gray-400 flex justify-between items-center">
					<span className="text-lg font-semibold">Update email</span>
					<button>
						<img src={EditPencil} className="w-4" alt="/" />
					</button>
				</div>
				<div className="border-b border-gray-400 flex justify-between items-center">
					<span className="text-lg font-semibold">Update Password</span>
					<button>
						<img src={EditPencil} className="w-4" alt="/" />
					</button>
				</div>
				<div className="border-b border-gray-400 flex justify-between items-center">
					<span className="text-lg font-semibold">Update Social handle / Accounts</span>
					<button>
						<img src={EditPencil} className="w-4" alt="/" />
					</button>
				</div>
				<div className="border-b border-gray-400 flex justify-between items-center">
					<span className="text-lg font-semibold">Update Phone Number</span>
					<button>
						<img src={EditPencil} className="w-4" alt="/" />
					</button>
				</div>
				<div className="border-b border-gray-400 flex justify-between items-center">
					<span className="text-lg font-semibold">Update Location</span>
					<InputGroup
						name="location"
						type="select"
						className="w-[250px]"
						optionLists={statesOptions}
						value={formik.values.location}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						errorMsg={formik.touched.location && formik.errors.location ? formik.errors.location : null}
					/>
				</div>
			</div>

			<div className="  space-y-3">
				<h3 className="my-6">Notification</h3>

				<div className="bg-gray-300 p-6 flex items-center justify-between">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> New Product Listing for Grabbers
					</div>

					<ToggleSwitch
						checked={formik.values.new_product}
						name="new_product"
						onChange={(e) => {
							formik.setFieldValue('new_product', e);
						}}
						className={formik.values.new_product ? 'custom-toggle' : ''}
					/>
				</div>

				<div className="bg-gray-300 p-6 flex items-center justify-between">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> Sold Product
					</div>

					<ToggleSwitch
						checked={formik.values.sold_product}
						name="sold_product"
						onChange={(e) => {
							formik.setFieldValue('sold_product', e);
						}}
						className={formik.values.sold_product ? 'custom-toggle' : ''}
					/>
				</div>
				<div className="bg-gray-300 p-6 flex items-center justify-between">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> New Visitor from Link
					</div>

					<ToggleSwitch
						checked={formik.values.new_visitor}
						name="new_visitor"
						onChange={(e) => {
							formik.setFieldValue('new_visitor', e);
						}}
						className={formik.values.new_visitor ? 'custom-toggle' : ''}
					/>
				</div>
				<div className="bg-gray-300 p-6 flex items-center justify-between">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> Purchase made from Link
					</div>

					<ToggleSwitch
						checked={formik.values.purchase}
						name="purchase"
						onChange={(e) => {
							formik.setFieldValue('purchase', e);
						}}
						className={formik.values.purchase ? 'custom-toggle' : ''}
					/>
				</div>

				<div className="bg-gray-300 p-6 flex items-center justify-between">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> Commission credited to my account
					</div>

					<ToggleSwitch
						checked={formik.values.commission}
						name="commission"
						onChange={(e) => {
							formik.setFieldValue('commission', e);
						}}
						className={formik.values.commission ? 'custom-toggle' : ''}
					/>
				</div>

				<div className="bg-gray-300 p-6 flex items-center justify-between">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> Coins below one (1.00)
					</div>

					<ToggleSwitch
						checked={formik.values.low_coins}
						name="low_coins"
						onChange={(e) => {
							formik.setFieldValue('low_coins', e);
						}}
						className={formik.values.low_coins ? 'custom-toggle' : ''}
					/>
				</div>

				<div className="bg-gray-300 p-6 flex items-center justify-between">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> Grabbers News and Updates
					</div>

					<ToggleSwitch
						checked={formik.values.news_updates}
						name="news_updates"
						onChange={(e) => {
							formik.setFieldValue('news_updates', e);
						}}
						className={formik.values.news_updates ? 'custom-toggle' : ''}
					/>
				</div>
				<div className="bg-gray-300 p-6 flex items-center justify-between">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> SMS notifications
					</div>

					<ToggleSwitch
						checked={formik.values.sms}
						name="sms"
						onChange={(e) => {
							formik.setFieldValue('sms', e);
						}}
						className={formik.values.sms ? 'custom-toggle' : ''}
					/>
				</div>

				<div className="bg-gray-300 p-6 flex items-center justify-between">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> Email notifications
					</div>

					<ToggleSwitch
						checked={formik.values.email_notification}
						name="email_notification"
						onChange={(e) => {
							formik.setFieldValue('email_notification', e);
						}}
						className={formik.values.email_notification ? 'custom-toggle' : ''}
					/>
				</div>

				<div className="bg-gray-300 p-6 flex items-center justify-between">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> Subscription package
					</div>

					<ToggleSwitch
						checked={formik.values.subscription}
						name="subscription"
						onChange={(e) => {
							formik.setFieldValue('subscription', e);
						}}
						className={formik.values.subscription ? 'custom-toggle' : ''}
					/>
				</div>
				<div className="bg-gray-300 p-6 flex items-center justify-between">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> Feedback messages
					</div>

					<ToggleSwitch
						checked={formik.values.feedback}
						name="feedback"
						onChange={(e) => {
							formik.setFieldValue('feedback', e);
						}}
						className={formik.values.feedback ? 'custom-toggle' : ''}
					/>
				</div>
			</div>
		</section>
	);
};

export default GrabSettings;
