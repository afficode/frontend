import { Link, NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ManSmiling } from '../../assets/images';
import { CameraSmall } from '../../assets/svgs';
import { Approutes } from '../../constants';
import { Button, InputGroup } from '../../ui';
import useAuth from '../../context/UserContext';

const Sidebar = () => {
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

	const handleFileChange = (event) => {
		formik.setFieldValue('profile_image', event.currentTarget.files[0]);
	};

	const { user } = useAuth();

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
					{/* <Button variant="plain" size="small" className="font-medium">
						Switch Mode
					</Button> */}
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
	{
		name: 'Go to website',
		link: Approutes.home,
	},
];
