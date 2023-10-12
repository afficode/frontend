import { useState } from 'react';
import { ProfileBanner } from '../../../assets/images';
import { CameraBlue, EditPencil } from '../../../assets/svgs';
import { DashboardHeader } from '../../../components';
import { Button, InputGroup } from '../../../ui';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Profile = () => {
	const [toggleEdit, setToggleEdit] = useState({
		about: true,
		bio: true,
	});

	const initialValues = {
		name: 'Adeola Lawal',
		business_title: 'Auto Dealer',
		business_location: 'Lagos State',
		established: 'Since 2008',
		email_address: 'sijuadelawal@gmail.com',
		bio: 'bio here',
		cover_image: '',
	};

	const validationSchema = Yup.object({
		name: Yup.string().required('Required'),
		business_title: Yup.string().required('Required'),
		business_location: Yup.string().required('Required'),
		established: Yup.string().required('Required'),
		email_address: Yup.string().required('Required').email('Invalid email address'),
		bio: Yup.string().required('Required'),
	});

	const handleSave = (values) => {
		console.log(values);
		setToggleEdit(() => ({
			about: true,
			bio: true,
		}));
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSave,
		validationSchema,
	});

	return (
		<div>
			<DashboardHeader />
			{/* banner */}
			<div className="relative w-full h-[20rem] my-2">
				<img src={ProfileBanner} alt="/" className="w-full h-full mx-auto object-fit rounded-xl" />
				<img src={CameraBlue} alt="/" className="absolute right-0 bottom-[-20px] w-[3rem]" />
			</div>

			{/* aboutme container */}
			<div className="flex flex-col my-8 px-4">
				<div className="flex justify-between border-b border-black/30">
					<h4>About Me</h4>
					<div
						onClick={() => setToggleEdit((prev) => ({ ...prev, about: false }))}
						className="flex gap-1 items-center text-primary text-lg font-medium cursor-pointer"
					>
						<img src={EditPencil} alt="/" className="w-4" />
						<span>Edit</span>
					</div>
				</div>

				<form className="w-[500px]">
					<div className="flex items-center justify-between">
						<label htmlFor="name">Name</label>
						<InputGroup
							name="name"
							type="text"
							className={`${toggleEdit.about && inputStyle} `}
							disabled={toggleEdit.about}
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMsg={formik.touched.name && formik.errors.name ? formik.errors.name : null}
						/>
					</div>
					<div className="flex items-center justify-between">
						<label htmlFor="business_title">Business Title</label>
						<InputGroup
							name="business_title"
							type="text"
							className={`${toggleEdit.about && inputStyle} `}
							disabled={toggleEdit.about}
							value={formik.values.business_title}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMsg={
								formik.touched.business_title && formik.errors.business_title
									? formik.errors.business_title
									: null
							}
						/>
					</div>
					<div className="flex items-center justify-between">
						<label htmlFor="business_location">Business Location</label>
						<InputGroup
							name="business_location"
							type="text"
							className={`${toggleEdit.about && inputStyle} `}
							disabled={toggleEdit.about}
							value={formik.values.business_location}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMsg={
								formik.touched.business_location && formik.errors.business_location
									? formik.errors.business_location
									: null
							}
						/>
					</div>
					<div className="flex items-center justify-between">
						<label htmlFor="established">Established</label>
						<InputGroup
							name="established"
							type="text"
							className={`${toggleEdit.about && inputStyle} `}
							disabled={toggleEdit.about}
							value={formik.values.established}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMsg={
								formik.touched.established && formik.errors.established ? formik.errors.established : null
							}
						/>
					</div>
					<div className="flex items-center justify-between">
						<label htmlFor="email_address">E-mail</label>
						<InputGroup
							name="email_address"
							type="email"
							className={`${toggleEdit.about && inputStyle} `}
							disabled={toggleEdit.about}
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
				</form>
			</div>

			{/* Bio container */}
			<div className="flex flex-col my-8 px-4">
				<div className="flex justify-between border-b border-black/30">
					<h4>Bio</h4>
					<div
						onClick={() => setToggleEdit((prev) => ({ ...prev, bio: false }))}
						className="flex gap-1 items-center text-primary text-lg font-medium cursor-pointer"
					>
						<img src={EditPencil} alt="/" className="w-4" />
						<span>Edit</span>
					</div>
				</div>

				<form className="">
					<InputGroup
						name="bio"
						type="textarea"
						className={`${toggleEdit.bio && inputStyle} p-2`}
						disabled={toggleEdit.bio}
						value={formik.values.bio}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						errorMsg={formik.touched.bio && formik.errors.bio ? formik.errors.bio : null}
					/>
				</form>
			</div>

			<div className="mb-16 px-4 w-[200px]">
				<Button
					type="submit"
					variant="primary"
					size="full"
					disabled={toggleEdit.about && toggleEdit.bio}
					onClick={formik.handleSubmit}
				>
					Save
				</Button>
			</div>
		</div>
	);
};

export default Profile;

const inputStyle = 'border-transparent font-medium ';

// profile formdata

/* 
	{
		name: 'Adeola Lawal',
		bussiness_title: 'Auto Dealer',
		bussiness_location: 'Lagos State',
		established: 'Since 2008',
		email_address: 'lawal@gmail.com',
		bio: 'bio here',
		cover_image: 'cover image here',
	}

*/

/*
	<form className="flex flex-col gap-3 mt-4 w-[500px]">
					<div className="flex items-center justify-between">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							value={aboutData?.name}
							onChange={handleAboutChange}
							className={toggleEdit.about ? 'border-transparent font-semibold' : ''}
							disabled={toggleEdit.about}
						/>
					</div>
					<div className="flex items-center justify-between">
						<label htmlFor="business_title">Business Title</label>
						<input
							type="text"
							id="business_title"
							name="business_title"
							value={aboutData?.business_title}
							onChange={handleAboutChange}
							className={toggleEdit.about ? 'border-transparent font-semibold' : ''}
							disabled={toggleEdit.about}
						/>
					</div>
					<div className="flex items-center justify-between">
						<label htmlFor="business_location">Business Location</label>
						<input
							type="text"
							id="business_location"
							name="business_location"
							value={aboutData?.business_location}
							onChange={handleAboutChange}
							className={toggleEdit.about ? 'border-transparent font-semibold' : ''}
							disabled={toggleEdit.about}
						/>
					</div>
					<div className="flex items-center justify-between">
						<label htmlFor="established">Established</label>
						<input
							type="text"
							id="established"
							name="established"
							value={aboutData?.established}
							onChange={handleAboutChange}
							className={toggleEdit.about ? 'border-transparent font-semibold' : ''}
							disabled={toggleEdit.about}
						/>
					</div>
					<div className="flex items-center justify-between">
						<label htmlFor="email_adress">E-mail</label>
						<input
							type="email"
							id="email_adress"
							name="email_adress"
							value={aboutData?.email_address}
							onChange={handleAboutChange}
							className={toggleEdit.about ? 'border-transparent font-semibold' : ''}
							disabled={toggleEdit.about}
						/>
					</div>
				</form>
*/

/*
		<div>
					<textarea
						name="bio"
						id="bio"
						cols="30"
						rows="5"
						placeholder="Describe yourself and business generally"
						value={aboutData?.bio}
						onChange={handleAboutChange}
						className={toggleEdit.bio ? 'border-transparent font-semibold' : 'p-4'}
						disabled={toggleEdit.bio}
					></textarea>
				</div>
*/

// const [aboutData, setAboutData] = useState({
// 	name: 'Adeola Lawal',
// 	business_title: 'Auto Dealer',
// 	business_location: 'Lagos State',
// 	established: 'Since 2008',
// 	email_address: 'sijuadelawal@gmail.com',
// 	bio: '',
// });

// const handleAboutChange = (e) => {
// 	const name = e.target.name;
// 	const value = e.target.value;

// 	setAboutData((prev) => ({ ...prev, [name]: value }));
// };
