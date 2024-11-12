import { useEffect, useState } from 'react';
import { EditPencil, LoginLock, Password } from '../../../assets/svgs';
import { DashboardHeader } from '../../../components';
import { Button, Modal } from '../../../ui';
import UpdatePassword from './UpdatePassword';
import { ToggleSwitch } from 'flowbite-react';
import { useFormik } from 'formik';
import LoadingScreen from './LoadingScreen';
import { AiFillNotification } from 'react-icons/ai';

const Security = () => {
	const [isOpen, setIsOpen] = useState(false);

	const formik = useFormik({
		initialValues: {
			remember_password: false,
			login_failure_alert: false,
		},
		onSubmit: (values) => {
			// console.log(values);
		},
	});

	// loading screen timeout
	const [isLoading, setIsLoading] = useState(true);
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

			{/* Security and login container */}
			<div className="flex flex-col my-8 md:px-2 lg:px-4">
				<div className="flex justify-between border-b border-black/30">
					<h4>Security and Login</h4>
				</div>

				<div className="border-b border-black/30">
					<div className="w-full px-4 py-2 my-4 bg-gray-200">
						<h5 className="font-semibold">Login</h5>
					</div>

					<div className="flex items-center w-full gap-2 mt-2 sm:gap-8">
						<img src={Password} alt="/" className="w-6 sm:w-[2.5rem]" />
						<div>
							<h6 className="font-medium">Update Password</h6>
							<p>Use a strong password that is not repeated on other account</p>
						</div>
						<div
							className="flex items-center gap-1 ml-auto text-lg font-medium cursor-pointer text-primary"
							onClick={() => setIsOpen(true)}
						>
							<img src={EditPencil} alt="/" className="w-4" />
							<span>Edit</span>
						</div>
					</div>

					<div className="flex items-center w-full gap-2 my-4 sm:gap-8">
						<img src={LoginLock} alt="/" className="w-6 sm:w-[2.5rem]" />
						<div>
							<h6 className="font-medium">Save your login info</h6>
							<p>You can choose to “Save password or Remember Password”</p>
						</div>
						<div className="ml-auto" title="Check to remember password.">
							<ToggleSwitch
								checked={formik.values.remember_password}
								name="remember_password"
								onChange={(e) => {
									formik.setFieldValue('remember_password', e);
								}}
								className={formik.values.remember_password ? 'custom-toggle' : ''}
							/>
						</div>
					</div>
				</div>

				<div className="pb-4 my-4 border-b border-black/30">
					<div className="w-full px-4 py-2 my-4 bg-gray-200">
						<h5 className="font-semibold">Setting Up Extra Security</h5>
					</div>

					<div className="flex items-center w-full gap-2 mt-2 sm:gap-8">
						<div className="w-6 sm:w-[2.5rem]">
							<AiFillNotification className="text-xl sm:text-4xl" />
						</div>
						<div>
							<h6 className="font-medium">Get notification about unrecognized logins</h6>
							<p>You will be notified if a login is made from a device or browser you don’t use</p>
						</div>
						<div className="ml-auto" title="Check to get notified.">
							<ToggleSwitch
								checked={formik.values.login_failure_alert}
								name="login_failure_alert"
								onChange={(e) => formik.setFieldValue('login_failure_alert', e)}
								className={formik.values.login_failure_alert ? 'custom-toggle' : ''}
							/>
						</div>
					</div>
				</div>

				<div className="sm:w-[200px] px-4 mt-8">
					<Button
						variant="primary"
						size={'full'}
						type="submit"
						onClick={formik.handleSubmit}
						className=""
					>
						Save
					</Button>
				</div>
			</div>

			<Modal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				headerText="UPDATE PASSWORD"
				className={'max-w-[500px]'}
			>
				<UpdatePassword setIsOpen={setIsOpen} />
			</Modal>
		</div>
	);
};

export default Security;
