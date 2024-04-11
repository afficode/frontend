import { useStates } from '../../../hooks';
import { Button, InputGroup } from '../../../ui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ScrollToTop, toSelectOptions } from '../../../utils';
import { FacebookBlue, Instagram, Tiktok, Twitter, Whatsapp } from '../../../assets/svgs';
import { Link } from 'react-router-dom';
import { Approutes } from '../../../constants';

const GrabRegister = () => {
	const { data: states } = useStates();
	const statesOptions = toSelectOptions(states, 'states', 'Select your state');

	const initialValues = {
		display_name: '',
		location: '',
		phone: '',
		dob: '',
		gender: '',
		social: {
			twitter: '',
			facebook: '',
			whatsapp: '',
			instagram: '',
			tiktok: '',
		},
		email_address: '',
		password: '',
	};

	const validationSchema = Yup.object({
		display_name: Yup.string().required('Required'),
		location: Yup.string().required('Required'),
		phone: Yup.number().required('Required'),
		dob: Yup.string().required('Required'),
		gender: Yup.string().required('Required'),
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

	console.log(formik);

	return (
		<section className="text-center ">
			<h3 className="py-6">Creating your Grabber’s Account</h3>

			<div className="max-w-[1024px] rounded-lg mx-auto h-full mb-12 grab-bg py-8 pr-6">
				<form className=" bg-white max-w-[500px] ml-auto h-fit p-6 rounded-lg">
					<div className="flex md:gap-4 md:justify-between md:items-center max-md:flex-col max-md:items-start">
						<label htmlFor="display_name" className="font-semibold">
							Display Name
						</label>
						<InputGroup
							name="display_name"
							type="text"
							className="w-[250px]"
							value={formik.values.display_name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMsg={
								formik.touched.display_name && formik.errors.display_name
									? formik.errors.display_name
									: null
							}
						/>
					</div>

					<div className="flex items-center justify-between w-full max-md:flex-col max-md:items-start ">
						<label htmlFor="location" className="font-semibold">
							Location
						</label>
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

					<div className="flex items-center justify-between w-full max-md:flex-col max-md:items-start ">
						<label htmlFor="phone" className="font-semibold">
							Phone Number
						</label>
						<InputGroup
							name="phone"
							type="number"
							className="w-[250px]"
							value={formik.values.phone}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMsg={formik.touched.phone && formik.errors.phone ? formik.errors.phone : null}
						/>
					</div>

					<div className="flex items-center justify-between w-full max-md:flex-col max-md:items-start ">
						<label htmlFor="dob" className="font-semibold">
							Date of Birth
						</label>
						<InputGroup
							name="dob"
							type="date"
							className="w-[250px]"
							value={formik.values.dob}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMsg={formik.touched.dob && formik.errors.dob ? formik.errors.dob : null}
						/>
					</div>

					<div className="flex items-center justify-between w-full max-md:flex-col max-md:items-start ">
						<label htmlFor="gender" className="font-semibold">
							Gender
						</label>
						<InputGroup
							name="gender"
							type="select"
							className="w-[250px]"
							optionLists={[
								{ key: 'Select your gender', value: '' },
								{ key: 'Male', value: 'male' },
								{ key: 'Female', value: 'female' },
							]}
							value={formik.values.gender}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMsg={formik.touched.gender && formik.errors.gender ? formik.errors.gender : null}
						/>
					</div>

					<div className="flex flex-col">
						<label className="font-semibold text-left">Social Media Handles:</label>
						<div className="flex items-center gap-4 md:justify-between ">
							<label className="md:pr-8 md:ml-auto" htmlFor="twitter">
								<img src={Twitter} alt="/" className="w-8" />
							</label>
							<InputGroup
								name="twitter"
								type="text"
								className="w-[250px]"
								value={formik.values.social.twitter}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								errorMsg={
									formik.touched.social?.twitter && formik.errors.social?.twitter
										? formik.errors.social?.twitter
										: null
								}
							/>
						</div>

						<div className="flex items-center gap-4 md:justify-between ">
							<label className="md:pr-8 md:ml-auto" htmlFor="facebook">
								<img src={FacebookBlue} alt="/" className="w-8" />
							</label>
							<InputGroup
								name="facebook"
								type="text"
								className="w-[250px]"
								value={formik.values.social?.facebook}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								errorMsg={
									formik.touched.social?.facebook && formik.errors.social?.facebook
										? formik.errors.social?.facebook
										: null
								}
							/>
						</div>
						<div className="flex items-center gap-4 md:justify-between ">
							<label className="md:pr-8 md:ml-auto" htmlFor="whatsapp">
								<img src={Whatsapp} alt="/" className="w-8" />
							</label>
							<InputGroup
								name="whatsapp"
								type="number"
								className="w-[250px]"
								value={formik.values.social?.whatsapp}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								errorMsg={
									formik.touched.social?.whatsapp && formik.errors.social?.whatsapp
										? formik.errors.social?.whatsapp
										: null
								}
							/>
						</div>
						<div className="flex items-center gap-4 md:justify-between ">
							<label className="md:pr-8 md:ml-auto" htmlFor="instagram">
								<img src={Instagram} alt="/" className="w-8" />
							</label>
							<InputGroup
								name="instagram"
								type="text"
								className="w-[250px]"
								value={formik.values.social?.instagram}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								errorMsg={
									formik.touched.social?.instagram && formik.errors.social?.instagram
										? formik.errors.social?.instagram
										: null
								}
							/>
						</div>
						<div className="flex items-center gap-4 mb-4 md:justify-between ">
							<label className="md:pr-8 md:ml-auto" htmlFor="tiktok">
								<img src={Tiktok} alt="/" className="w-8" />
							</label>
							<InputGroup
								name="tiktok"
								type="text"
								className="w-[250px]"
								value={formik.values.social?.tiktok}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								errorMsg={
									formik.touched.social?.tiktok && formik.errors.social?.tiktok
										? formik.errors.social?.tiktok
										: null
								}
							/>
						</div>
					</div>

					<div className="flex items-center md:gap-4 md:justify-between max-md:flex-col max-md:items-start">
						<label htmlFor="email_address" className="font-semibold">
							Email Address
						</label>
						<InputGroup
							name="email_address"
							type="email"
							className="w-[250px]"
							value={formik.values.email_address}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMsg={
								formik.touched.email_address && formik.errors.email_address
									? formik.errors.email_address
									: null
							}
						/>
					</div>

					<div className="flex items-center md:gap-4 md:justify-between max-md:flex-col max-md:items-start">
						<label htmlFor="password" className="font-semibold">
							Password{' '}
						</label>
						<InputGroup
							name="password"
							type="password"
							className="w-[250px]"
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMsg={formik.touched.password && formik.errors.password ? formik.errors.password : null}
						/>
					</div>

					<div className="py-8 space-y-4">
						<Button variant={'primary'}>Create a Grabber Account in Seconds.</Button>
						<div>
							Already have a Grabber Account?{' '}
							<Link to={Approutes.grab.profile} className="text-primary">
								Login Now
							</Link>
						</div>
					</div>
				</form>
			</div>
			<ScrollToTop />
		</section>
	);
};

export default GrabRegister;
