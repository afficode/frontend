import { useEffect, useState } from 'react';
import { ProfileBanner } from '../../../assets/images';
import { CameraBlue, EditPencil } from '../../../assets/svgs';
import { DashboardHeader } from '../../../components';
import { Button, InputGroup } from '../../../ui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoadingScreen from './LoadingScreen';
import { toast } from 'react-toastify';
import { MdClose } from 'react-icons/md';

const Profile = () => {
	const [toggleEdit, setToggleEdit] = useState({
		about: true,
		bio: true,
		cover_image: true,
	});
	const [isLoading, setIsLoading] = useState(true);

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
			cover_image: true,
		}));
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSave,
		validationSchema,
	});

	const handleFileChange = (e) => {
		const file = e.currentTarget.files[0];
		if (file && file.type.startsWith('image/')) {
			if (file.size <= 1024 * 1024) {
				formik.setFieldValue('cover_image', file);
				setToggleEdit((prev) => ({ ...prev, cover_image: false }));
			} else {
				toast.error('File size must be less than 1MB');
			}
		} else {
			toast.error('Only image files are allowed');
		}
	};

	const handleRemoveFile = () => {
		formik.setFieldValue('cover_image', '');
		setToggleEdit((prev) => ({ ...prev, cover_image: false }));
	};

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, []);

	if (isLoading) {
		return (
			<>
				<DashboardHeader />
				<LoadingScreen />;
			</>
		);
	}

	return (
		<div>
			<DashboardHeader />

			{/* banner */}
			<div className="relative w-full h-[20rem] my-4">
				{formik?.values.cover_image ? (
					<div className="w-full h-full relative group">
						<img
							src={URL.createObjectURL(formik.values.cover_image)}
							alt="/"
							className="w-full h-full mx-auto object-fit rounded-xl"
						/>
						<div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 absolute right-2 top-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-all">
							<MdClose size={15} onClick={handleRemoveFile} />
						</div>
					</div>
				) : (
					<img src={ProfileBanner} alt="/" className="w-full h-full mx-auto object-fit rounded-xl" />
				)}
				<form encType="multipart/form-data">
					<InputGroup type="file" name="cover_image" onChange={handleFileChange}>
						<img src={CameraBlue} alt="/" className="absolute right-0 bottom-[-20px] w-[3rem]" />
					</InputGroup>
				</form>
			</div>

			{/* aboutme container */}
			<div className="flex flex-col my-8 md:px-2 lg:px-4">
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

				<form className="w-full lg:w-[600px]">
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm max-md:mt-2" htmlFor="name">
							Name
						</label>
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
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm max-md:mt-2" htmlFor="business_title">
							Business Title
						</label>
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
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm max-md:mt-2" htmlFor="business_location">
							Business Location
						</label>
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
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm max-md:mt-2" htmlFor="established">
							Established
						</label>
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
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm max-md:mt-2" htmlFor="email_address">
							E-mail
						</label>
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
			<div className="flex flex-col my-8 md:px-2 lg:px-4">
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

				<form>
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

			<div className="mb-16 px-4 sm:w-[200px] max-sm:mx-auto">
				<Button
					type="submit"
					variant="primary"
					size="full"
					onClick={formik.handleSubmit}
					disabled={!formik.isValid || (toggleEdit.about && toggleEdit.bio && toggleEdit.cover_image)}
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
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm max-md:mt-2" htmlFor="name">Name</label>
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
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm max-md:mt-2" htmlFor="business_title">Business Title</label>
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
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm max-md:mt-2" htmlFor="business_location">Business Location</label>
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
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm max-md:mt-2" htmlFor="established">Established</label>
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
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm max-md:mt-2" htmlFor="email_adress">E-mail</label>
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

/*

		cover_image: Yup.mixed()
			.test('fileType', 'Only image files are allowed', (value) => {
				if (!value) return true; // Allow empty files (no validation)
				return (
					value && value.type.startsWith('image/') // Check if the file is an image
				);
			})
			.test('fileSize', 'File size must be less than 1MB', (value) => {
				if (!value) return true; // Allow empty files (no validation)
				return value && value.size <= 1024 * 1024; // Check if the file size is <= 1MB
			}),
		// .required('Image file is required'),
*/
