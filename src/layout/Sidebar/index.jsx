import { Link, NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ManSmiling } from '../../assets/images';
import { CameraSmall } from '../../assets/svgs';
import { Approutes } from '../../constants';
import { Button, InputGroup } from '../../ui';
import useAuth from '../../context/UserContext';
import { useNotify, userUpdate } from '../../hooks';

const Sidebar = () => {
	const { mutate, isLoading } = userUpdate('dashboard/update_user');
	const notify = useNotify();
	const { user, updateUserInfo } = useAuth();

	const initialValues = {
		profile_image: null,
	};

	const validationSchema = Yup.object({
		profile_image: Yup.mixed()
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
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
	});

	const handleFileChange = async (event) => {
		const file = event.currentTarget.files[0];

		let profile_image;

		try {
			if (file && file.type.startsWith('image/')) {
				if (file.size <= 1024 * 1024) {
					// TODO: Delete Old image if new one is uploaded.

					console.log('Profile image', file);
					profile_image = await uploadImage(file, 'profile_image');

					console.log('Profile image uploaded', profile_image);

					formik.setFieldValue('profile_image', file);
				} else {
					notify('File size must be less than 1MB', 'error');
				}
			} else {
				notify('Please upload an image file', 'error');
			}
		} catch (e) {
			notify('Something went wrong...', 'error');
		}

		const formData = { ...formik.values, profile_image: profile_image };

		console.log('from data', formData);

		mutate(formData, {
			onSuccess: async (data) => {
				if (formik.values.profile_image) {
					let _publicId = user?.profile_image?.filename.split('.');
					_publicId.pop();
					let publicId = _publicId.join('.');
					await deleteImages(publicId);
				}
				updateUserInfo(data?.user);
				notify(data?.message, 'success');
			},
			onError: (error) => {
				notify(error?.message, 'error');
			},
		});
	};

	return (
		<aside className="w-[15rem] h-full bg-[#D9D9D9] rounded-r-[2.5rem] flex flex-col items-center text-center max-lg:hidden">
			<div className="w-full pb-2 mt-2 space-y-4 border-b border-black/30 ">
				<div className="relative w-[9rem] h-[9rem] mx-auto">
					{formik?.values.profile_image ? (
						<img
							src={URL.createObjectURL(formik.values.profile_image)}
							alt="/"
							className="w-full h-full mx-auto rounded-full object-fit "
						/>
					) : (
						<img src={ManSmiling} alt="" className="w-full h-full mx-auto rounded-full object-fit " />
					)}

					<form encType="multipart/form-data">
						<InputGroup
							type="file"
							name="profile_image"
							onChange={handleFileChange}
							errorMsg={
								formik.touched.profile_image && formik.errors.profile_image
									? formik.errors.profile_image
									: null
							}
						>
							<img src={CameraSmall} alt="" className="absolute bottom-0 right-0 cursor-pointer" />
						</InputGroup>
					</form>
				</div>

				<div>
					<h4 className="capitalize">
						{user.firstname} {user.lastname}
					</h4>
					<p className="font-semibold capitalize">Auto Dealer</p>
				</div>
			</div>

			<nav className="flex flex-col justify-between flex-1 w-full px-4 my-6">
				<ul className="flex flex-col gap-1 sidebar-list">
					{navList.map((navItem) => (
						<NavLink key={navItem.name} to={navItem.link}>
							<li className="w-full py-1 transition rounded-md p-lg hover:bg-white">{navItem.name}</li>
						</NavLink>
					))}
				</ul>

				<ul className="mb-2 space-y-4">
					<Link to={Approutes.logout}>
						<Button variant="plain" size="small" className="font-medium" title="Log out">
							Log Out
						</Button>
					</Link>
					<Button variant="plain" size="small" className="font-medium" title="Deactivate your account">
						Deactivate Account{' '}
					</Button>
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;

const navList = [
	{
		name: 'Performance',
		link: Approutes.dashboard.performance,
	},
	{
		name: 'Profile',
		link: Approutes.dashboard.profile,
	},
	{
		name: 'Settings',
		link: Approutes.dashboard.settings,
	},
	{
		name: 'Security & Login',
		link: Approutes.dashboard.security,
	},

	{
		name: 'Privacy/Policy',
		link: Approutes.dashboard.privacyPolicy,
	},
	{
		name: 'Help',
		link: Approutes.dashboard.help,
	},
	// {
	// 	name: 'Go to website',
	// 	link: Approutes.home,
	// },
];
