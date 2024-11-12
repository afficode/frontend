import {useEffect, useMemo, useState} from 'react';
import { ProfileBanner } from '../../../assets/images';
import { CameraBlue, EditPencil } from '../../../assets/svgs';
import { DashboardHeader } from '../../../components';
import { Button, InputGroup } from '../../../ui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoadingScreen from './LoadingScreen';
import { toast } from 'react-toastify';
import { MdClose } from 'react-icons/md';
import { toSelectOptions } from '../../../utils';

import useAuth from '../../../context/UserContext.jsx'
import { useStates } from "../../../hooks/index.js";

import {uploadImage} from "../../../utils/index.js";

import { userUpdate} from "../../../hooks/index.js";
import {useNotify} from "../../../hooks/index.js";

const Profile = () => {
	const { data: states } = useStates();
	const statesOptions = toSelectOptions(states, 'states', 'Select your state');
	const [toggleEdit, setToggleEdit] = useState({
		about: true,
		bio: true,
		cover_image: true,
	});
	const { data } = useStates();
	const state = useMemo( () => data?.map(state => ({value: state?.state_id, key: state?.name})), [data])
	const [isLoading, setIsLoading] = useState(true);
	const { user } = useAuth();
	const { mutate, isLoading: isUpdating } = userUpdate('dashboard/update_user');
	const notify = useNotify();

	const initialValues = {
		name: user ? user?.firstname + ' ' + user?.lastname : '',
		phone: 81234567892,
		business_title: user?.business_title || '',
		location: user?.location || '',
		established: user ? `Since ${new Date(user?.joined_on).getFullYear()}` : '',
		email: user?.email || '',
		bio: user?.bio || '',
		cover_image: '',
	};

	const validationSchema = Yup.object({
		name: Yup.string().required('Required'),
		phone: Yup.number()
			.typeError('Phone number must not contain +234, but start with 0XXXXXXXXXX')
			.required()
			.positive()
			.integer()
			.min(1000000000, 'Phone number must be 11 or 12 digit 08012345678')
			.max(99999999999, 'Phone number must be 11 or 12 digit 08012345678'),
		location: Yup.string().required('Required'),
		established: Yup.string().required('Required'),
		email_address: Yup.string().required('Required').email('Invalid email address'),
		bio: Yup.string().required('Required'),
	});

	const handleSave = async (values) => {
		try {
			let profile_image;
			delete values.email;
			delete values.established;
			delete values.name;


			if (values?.cover_image) {
				// TODO: Delete Old image if new one is uploaded.
				profile_image = await uploadImage(values?.cover_image, 'cover_image');
				values = { ...values, cover_image: profile_image }
			} else {
				delete values.cover_image;
			}
			await mutate(values, {
				onSuccess: (data) => {
					notify(data?.message, 'success');
				},
				onError: (error) => {
					notify(error?.message, 'error');
				}
			});

			setToggleEdit(() => ({
				about: true,
				bio: true,
				cover_image: true,
			}));
		} catch (e) {
			console.log(e)
		}
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

	if (isLoading || isUpdating) {
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
					<img src={user?.cover_image?.path || ProfileBanner} alt="/" className="w-full h-full mx-auto object-fit rounded-xl" />
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
							disabled={true}
							value={user?.firstname + " " + user?.lastname}
						/>
					</div>
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm max-md:mt-2" htmlFor="phone">
							Contact Number
						</label>
						<InputGroup
							name="phone"
							type="number"
							className={`${toggleEdit.about && inputStyle} `}
							disabled={toggleEdit.about}
							value={formik.values.phone}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMsg={formik.touched.phone && formik.errors.phone ? formik.errors.phone : null}
						/>
					</div>
					{
						toggleEdit?.about ? (<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
							<label className="max-md:text-sm max-md:mt-2" htmlFor="user_location">
								Business Location
							</label>
							<InputGroup
								name="user_location"
								type="text"
								className={`${toggleEdit.about && inputStyle} `}
								disabled={true}
								value={user?.user_location}
							/>
						</div>) : (<div
							className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
							<label className="max-md:text-sm max-md:mt-2" htmlFor="business_location">
								Change Location
							</label>
							<InputGroup
								name="location"
								type="select"
								optionLists={state}
								className={`${toggleEdit.about && inputStyle} `}
								disabled={toggleEdit.about}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								errorMsg={
									formik.touched.location && formik.errors.location
										? formik.errors.location
										: null
								}
							/>
						</div>)
					}
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm max-md:mt-2" htmlFor="established">
							Established
						</label>
						<InputGroup
							name="established"
							type="text"
							className={`${toggleEdit.about && inputStyle} `}
							disabled={true}
							value={`Since ${new Date(user?.joined_on).getFullYear()}`}

						/>
					</div>
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm max-md:mt-2" htmlFor="email">
						E-mail
						</label>
						<InputGroup
							name="email"
							type="email"
							className={`${toggleEdit.about && inputStyle} `}
							disabled={true}
							value={user?.email}

						/>
					</div>
				</form>
			</div>

			{/* Bio container */}
			<div className="flex flex-col my-8 md:px-2 lg:px-4">
				<div className="flex justify-between border-b border-black/30">
					<h4>Bio</h4>
					<div
						onClick={() => setToggleEdit((prev) => ({...prev, bio: false}))}
						className="flex gap-1 items-center text-primary text-lg font-medium cursor-pointer"
					>
						<img src={EditPencil} alt="/" className="w-4"/>
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
		email: 'lawal@gmail.com',
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
						<label className="max-md:text-sm max-md:mt-2" htmlFor="phone">Business Title</label>
						<input
							type="text"
							id="phone"
							name="phone"
							value={aboutData?.phone}
							onChange={handleAboutChange}
							className={toggleEdit.about ? 'border-transparent font-semibold' : ''}
							disabled={toggleEdit.about}
						/>
					</div>
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm max-md:mt-2" htmlFor="location">Business Location</label>
						<input
							type="text"
							id="location"
							name="location"
							value={aboutData?.location}
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
							value={aboutData?.email}
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
// 	phone: 'Auto Dealer',
// 	location: 'Lagos State',
// 	established: 'Since 2008',
// 	email: 'sijuadelawal@gmail.com',
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
