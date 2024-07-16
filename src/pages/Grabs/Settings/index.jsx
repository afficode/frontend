import { useState } from 'react';
import { EditPencil } from '../../../assets/svgs';
import { Button, InputGroup, Modal } from '../../../ui';
import { privateAxios, toSelectOptions } from '../../../utils';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNotify, useStates } from '../../../hooks';
import { ToggleSwitch } from 'flowbite-react';
import GrabHeader from '../GrabHeader';
import { useDebouncedCallback } from 'use-debounce';
import { FacebookBlue, Instagram, Tiktok, Twitter, Whatsapp } from '../../../assets/svgs';
import useAuth from '../../../context/UserContext';

const GrabSettings = () => {
	const { data: states } = useStates();
	const statesOptions = toSelectOptions(states, 'states', 'Select your state');
	const [isDisplayNameTaken, setIsDisplayNameTaken] = useState(false);
	const [editModal, setEditModal] = useState(false);

	const notify = useNotify();
	const { user } = useAuth();

	const checkDisplayName = async (displayName) => {
		try {
			const response = await privateAxios.get(`/grab/verify_display_name/${displayName}`);
			return response.data.success;
		} catch (error) {
			console.error('Error checking display name', error);
			return false;
		}
	};

	const handleDisplayName = useDebouncedCallback(async (displayName) => {
		const taken = await checkDisplayName(displayName);
		console.log(taken);
		setIsDisplayNameTaken(taken);
	}, 100);

	const [selectedDisplayName, setSelectedDislayName] = useState(null);

	const initialValues = {
		display_name: user?.display_name,
		current_location: user?.current_location,
		bio: user?.bio,
		x_page: user?.x_page,
		facebook: user?.facebook,
		whatsapp: user?.whatsapp,
		instagram: user?.instagram,
		tiktok: user?.tiktok,
	};

	// const validationSchema =

	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object({
			...(selectedDisplayName !== user.display_name && {
				display_name: Yup.string()
					.required('Required')
					.test('checkDisplayName', 'Display name is already taken', function () {
						return isDisplayNameTaken;
					}),
			}),
			display_name: Yup.string().required('Required'),
			current_location: Yup.string().required('Required'),
			bio: Yup.string().required('Required'),
			x_page: Yup.string().required('Required'),
			facebook: Yup.string().required('Required'),
			whatsapp: Yup.string().required('Required'),
			instagram: Yup.string().required('Required'),
			tiktok: Yup.string().required('Required'),
		}),
		onSubmit: async (values, { setSubmitting, resetForm }) => {
			try {
				setSubmitting(true);
				// Submit the form data to the backend endpoint
				const response = await privateAxios.put('/grab/update_grabbers_data', values);
				console.log('Form submission successful!', response.data);
				notify('Your grabber account has been updated!', 'success');
				resetForm();

				setEditModal(false);
			} catch (error) {
				console.error('Form submission error:', error);
				notify('Something went wrong, check the links and try again', 'error');
			} finally {
				// Ensure to set submitting state to false after submission attempt
				setSubmitting(false);
			}
		},
	});

	const formik2 = useFormik({
		initialValues: {
			new_product: false,
			sold_product: false,
			link_visited: false,
			purchase_from_link: false,
			commission_credited: false,
			coin_low: false,
			news_update: false,
			sms_notification: false,
			email_notification: false,
			subscription_package: false,
			feedback_message: false,
		},
		onSubmit: async (values, { setSubmitting }) => {
			try {
				setSubmitting(true);
				// console.log(values);
				// Submit the form data to the backend endpoint
				const response = await privateAxios.put('/grab/setting', values);
				console.log('Settings saved successfully!', response.data);
				notify('Settings saved successfully!', 'success');
			} catch (error) {
				console.error('Form submission error:', error);
				notify('Something went wrong, try again', 'error');
			} finally {
				// Ensure to set submitting state to false after submission attempt
				setSubmitting(false);
			}
		},
	});

	const handleChange = (e) => {
		formik.handleChange(e);
		if (e.target.name === 'display_name') {
			handleDisplayName(e.target.value);
			setSelectedDislayName(e.target.value);
		}
	};

	return (
		<section className="mb-12 space-y-8 ">
			<GrabHeader text="Grab Account settings" />

			<div className="p-6 my-6 space-y-12 bg-gray-300">
				<div className="flex items-center justify-between pb-4 border-b border-gray-400">
					<span className="text-lg font-semibold">Update Social handle / Accounts</span>
					<button onClick={() => setEditModal(true)}>
						<img src={EditPencil} className="w-4" alt="/" />
					</button>
					<Modal isOpen={editModal} setIsOpen={setEditModal}>
						<form onSubmit={formik.handleSubmit} className=" bg-gray-300 mx-auto  p-6 rounded-lg">
							<div className="flex  md:gap-4 md:justify-between  max-md:flex-col max-md:items-start">
								<label htmlFor="display_name" className="font-semibold mt-4">
									Display Name
								</label>
								<InputGroup
									name="display_name"
									type="text"
									placeholder="Enter a display name"
									className="w-[250px]"
									value={formik.values.display_name}
									onChange={handleChange}
									onBlur={formik.handleBlur}
									errorMsg={
										formik.touched.display_name && formik.errors.display_name
											? formik.errors.display_name
											: null
									}
								/>
							</div>

							<div className="flex  justify-between w-full max-md:flex-col max-md:items-start ">
								<label htmlFor="current_location" className="font-semibold mt-4">
									Location
								</label>
								<InputGroup
									name="current_location"
									type="select"
									className="w-[250px]"
									optionLists={statesOptions}
									value={formik.values.current_location}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									errorMsg={
										formik.touched.current_location && formik.errors.current_location
											? formik.errors.current_location
											: null
									}
								/>
							</div>
							<div className="flex  justify-between w-full max-md:flex-col max-md:items-start ">
								<label htmlFor="bio" className="font-semibold mt-4">
									Bio
								</label>
								<InputGroup
									name="bio"
									type="textarea"
									className="w-[250px]"
									value={formik.values.bio}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									errorMsg={formik.touched.bio && formik.errors.bio ? formik.errors.bio : null}
								/>
							</div>
							<div className="flex flex-col">
								<label className="font-semibold text-left">Social Media Handles:</label>
								<div className="flex  gap-4 md:justify-between ">
									<label className="md:pr-8 md:ml-auto" htmlFor="x_page">
										<img src={Twitter} alt="/" className="w-8" />
									</label>
									<InputGroup
										name="x_page"
										type="text"
										className="w-[250px]"
										value={formik.values.x_page}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										errorMsg={formik.touched.x_page && formik.errors.x_page ? formik.errors.x_page : null}
									/>
								</div>

								<div className="flex  gap-4 md:justify-between ">
									<label className="md:pr-8 md:ml-auto" htmlFor="facebook">
										<img src={FacebookBlue} alt="/" className="w-8" />
									</label>
									<InputGroup
										name="facebook"
										type="text"
										className="w-[250px]"
										value={formik.values.facebook}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										errorMsg={
											formik.touched.facebook && formik.errors.facebook ? formik.errors.facebook : null
										}
									/>
								</div>
								<div className="flex  gap-4 md:justify-between ">
									<label className="md:pr-8 md:ml-auto" htmlFor="whatsapp">
										<img src={Whatsapp} alt="/" className="w-8" />
									</label>
									<InputGroup
										name="whatsapp"
										type="text"
										className="w-[250px]"
										value={formik.values.whatsapp}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										errorMsg={
											formik.touched.whatsapp && formik.errors.whatsapp ? formik.errors.whatsapp : null
										}
									/>
								</div>
								<div className="flex  gap-4 md:justify-between ">
									<label className="md:pr-8 md:ml-auto" htmlFor="instagram">
										<img src={Instagram} alt="/" className="w-8" />
									</label>
									<InputGroup
										name="instagram"
										type="text"
										className="w-[250px]"
										value={formik.values.instagram}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										errorMsg={
											formik.touched.instagram && formik.errors.instagram ? formik.errors.instagram : null
										}
									/>
								</div>
								<div className="flex  gap-4 mb-4 md:justify-between ">
									<label className="md:pr-8 md:ml-auto" htmlFor="tiktok">
										<img src={Tiktok} alt="/" className="w-8" />
									</label>
									<InputGroup
										name="tiktok"
										type="text"
										className="w-[250px]"
										value={formik.values.tiktok}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										errorMsg={formik.touched.tiktok && formik.errors.tiktok ? formik.errors.tiktok : null}
									/>
								</div>
							</div>
							<div className="py-8 space-y-4">
								<Button
									type="submit"
									variant={'primary'}
									loading={formik.isSubmitting}
									disabled={formik.isSubmitting}
								>
									Update your Grabber Account.
								</Button>
							</div>
						</form>
					</Modal>
				</div>

				<div className="flex items-center justify-between border-b border-gray-400">
					<span className="text-lg font-semibold">Update Location</span>
					<button onClick={() => setEditModal(true)}>
						<img src={EditPencil} className="w-4" alt="/" />
					</button>
				</div>
			</div>

			{/* notification settings  */}
			<form onSubmit={formik2.handleSubmit} className="space-y-3 ">
				<h3 className="my-6">Notification</h3>

				<div className="flex items-center justify-between p-6 bg-gray-300">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> New Product Listing for Grabbers
					</div>

					<ToggleSwitch
						checked={formik2.values.new_product}
						name="new_product"
						onChange={(e) => {
							formik2.setFieldValue('new_product', e);
						}}
						className={formik2.values.new_product ? 'custom-toggle' : ''}
					/>
				</div>

				<div className="flex items-center justify-between p-6 bg-gray-300">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> Sold Product
					</div>

					<ToggleSwitch
						checked={formik2.values.sold_product}
						name="sold_product"
						onChange={(e) => {
							formik2.setFieldValue('sold_product', e);
						}}
						className={formik2.values.sold_product ? 'custom-toggle' : ''}
					/>
				</div>
				<div className="flex items-center justify-between p-6 bg-gray-300">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> New Visitor from Link
					</div>

					<ToggleSwitch
						checked={formik2.values.link_visited}
						name="link_visited"
						onChange={(e) => {
							formik2.setFieldValue('link_visited', e);
						}}
						className={formik2.values.link_visited ? 'custom-toggle' : ''}
					/>
				</div>
				<div className="flex items-center justify-between p-6 bg-gray-300">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> Purchase made from Link
					</div>

					<ToggleSwitch
						checked={formik2.values.purchase_from_link}
						name="purchase_from_link"
						onChange={(e) => {
							formik2.setFieldValue('purchase_from_link', e);
						}}
						className={formik2.values.purchase_from_link ? 'custom-toggle' : ''}
					/>
				</div>

				<div className="flex items-center justify-between p-6 bg-gray-300">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> Commission credited to my account
					</div>

					<ToggleSwitch
						checked={formik2.values.commission_credited}
						name="commission_credited"
						onChange={(e) => {
							formik2.setFieldValue('commission_credited', e);
						}}
						className={formik2.values.commission_credited ? 'custom-toggle' : ''}
					/>
				</div>

				<div className="flex items-center justify-between p-6 bg-gray-300">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> Coins below one (1.00)
					</div>

					<ToggleSwitch
						checked={formik2.values.coin_low}
						name="coin_low"
						onChange={(e) => {
							formik2.setFieldValue('coin_low', e);
						}}
						className={formik2.values.coin_low ? 'custom-toggle' : ''}
					/>
				</div>

				<div className="flex items-center justify-between p-6 bg-gray-300">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> Grabbers News and Updates
					</div>

					<ToggleSwitch
						checked={formik2.values.news_update}
						name="news_update"
						onChange={(e) => {
							formik2.setFieldValue('news_update', e);
						}}
						className={formik2.values.news_update ? 'custom-toggle' : ''}
					/>
				</div>
				<div className="flex items-center justify-between p-6 bg-gray-300">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> SMS notifications
					</div>

					<ToggleSwitch
						checked={formik2.values.sms_notification}
						name="sms_notification"
						onChange={(e) => {
							formik2.setFieldValue('sms_notification', e);
						}}
						className={formik2.values.sms_notification ? 'custom-toggle' : ''}
					/>
				</div>

				<div className="flex items-center justify-between p-6 bg-gray-300">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> Email notifications
					</div>

					<ToggleSwitch
						checked={formik2.values.email_notification}
						name="email_notification"
						onChange={(e) => {
							formik2.setFieldValue('email_notification', e);
						}}
						className={formik2.values.email_notification ? 'custom-toggle' : ''}
					/>
				</div>

				<div className="flex items-center justify-between p-6 bg-gray-300">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> Subscription package
					</div>

					<ToggleSwitch
						checked={formik2.values.subscription_package}
						name="subscription_package"
						onChange={(e) => {
							formik2.setFieldValue('subscription_package', e);
						}}
						className={formik2.values.subscription_package ? 'custom-toggle' : ''}
					/>
				</div>
				<div className="flex items-center justify-between p-6 bg-gray-300">
					<div className="text-lg font-semibold">
						<span className="text-primary">Turn notification for:</span> Feedback messages
					</div>

					<ToggleSwitch
						checked={formik2.values.feedback_message}
						name="feedback_message"
						onChange={(e) => {
							formik2.setFieldValue('feedback_message', e);
						}}
						className={formik2.values.feedback_message ? 'custom-toggle' : ''}
					/>
				</div>
				<Button
					type="submit"
					variant={'primary'}
					loading={formik2.isSubmitting}
					disabled={formik2.isSubmitting}
				>
					Submit
				</Button>
			</form>
		</section>
	);
};

export default GrabSettings;
