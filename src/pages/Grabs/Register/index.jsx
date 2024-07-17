import { useNotify, useStates } from '../../../hooks';
import { Button, InputGroup } from '../../../ui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ScrollToTop, api, privateAxios, toSelectOptions } from '../../../utils';
import { FacebookBlue, Instagram, Tiktok, Twitter, Whatsapp } from '../../../assets/svgs';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Approutes } from '../../../constants';

const GrabRegister = () => {
	const { data: states } = useStates();
	const statesOptions = toSelectOptions(states, 'states', 'Select your state');
	const [isDisplayNameTaken, setIsDisplayNameTaken] = useState(false);

	const navigate = useNavigate();
	const notify = useNotify();

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

	const initialValues = {
		display_name: '',
		current_location: '',
		bio: '',
		x_page: '',
		facebook: '',
		whatsapp: '',
		instagram: '',
		tiktok: '',
	};

	const validationSchema = Yup.object({
		display_name: Yup.string()
			.required('Required')
			.test('checkDisplayName', 'Display name is already taken', function () {
				return isDisplayNameTaken;
			}),
		current_location: Yup.string().required('Required'),
		bio: Yup.string().required('Required'),
		x_page: Yup.string().required('Required'),
		facebook: Yup.string().required('Required'),
		whatsapp: Yup.string().required('Required'),
		instagram: Yup.string().required('Required'),
		tiktok: Yup.string().required('Required'),
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values, { setSubmitting, resetForm }) => {
			try {
				setSubmitting(true);
				// Submit the form data to the backend endpoint
				const response = await privateAxios.post('/grab/become_grabber', values);
				console.log('Form submission successful!', response.data);
				notify('You are now a grabber!', 'success');
				resetForm();

				// Delay navigation after form submission
				setTimeout(() => {
					navigate(Approutes.logout); // Navigate to home route after timeout
				}, 2000); // Adjust timeout delay as needed (2000 milliseconds = 2 seconds)
			} catch (error) {
				console.error('Form submission error:', error);
				notify('Something went wrong, check the links and try again', 'error');
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
		}
	};

	return (
		<section className="text-center ">
			<h3 className="py-6">Creating your Grabber’s Account</h3>

			<div className="max-w-[1024px] rounded-lg mx-auto h-full mb-12 grab-bg py-8 pr-6">
				<form
					onSubmit={formik.handleSubmit}
					className=" bg-white max-w-[500px] ml-auto h-fit p-6 rounded-lg"
				>
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
								errorMsg={formik.touched.facebook && formik.errors.facebook ? formik.errors.facebook : null}
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
								errorMsg={formik.touched.whatsapp && formik.errors.whatsapp ? formik.errors.whatsapp : null}
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
							disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
						>
							Create a Grabber Account in Seconds.
						</Button>
					</div>
				</form>
			</div>
			<ScrollToTop />
		</section>
	);
};

export default GrabRegister;
