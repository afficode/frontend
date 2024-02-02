import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/FormComponents/Input';
import * as Yup from 'yup';
import { MdLogin } from 'react-icons/md';
import { LoginHook } from '../../hooks/AuthHook';
import { Apple, Facebook, Google } from '../../assets/svgs';
import { Button } from '../../ui';
import { Approutes } from '../../constants';
import { Button as FlowbiteButton } from 'flowbite-react';
import useAuth from '../../context/UserContext';
import { SpinnerSkeleton, Spinner } from '../../components';
import { getRedirectLink } from '../../utils';
import { useNotify } from '../../hooks';

const Login = () => {
	const { login } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const initialValues = {
		email: '',
		password: '',
	};

	const validationSchema = Yup.object({
		email: Yup.string().required('Email field is required').email('Invalid email address'),
		password: Yup.string()
			.required()
			.min(8, 'Password must be 8 characters long')
			.matches(/[0-9]/, 'Password requires a number')
			.matches(/[a-z]/, 'Password requires a lowercase letter')
			.matches(/[A-Z]/, 'Password requires an uppercase letter'),
	});
	const notify = useNotify();

	const onSubmit = async (values, { setSubmitting }) => {
		setIsLoading(true);
		setTimeout(async () => {
			const submit = await LoginHook(values, setSubmitting);
			if (submit?.success) {
				login(submit);

				notify('Welcome to Affi. \n\nYour world of endless possibilities', 'success');
				console.log(window.location);
				if (window.location === getRedirectLink()) {
					return navigate(Approutes.welcome);
				}
				return navigate(getRedirectLink() || Approutes.welcome, {
					replace: true,
				});
			} else {
				// toast.error(submit.message);
				notify(submit.message, 'error');
			}
			setIsLoading(false);
		}, 3000);
	};
	return (
		<div className="w-full ">
			{isLoading ? (
				<div className="mt-4 lg:mt-20">
					<SpinnerSkeleton
						heading={'You are been Logged In...'}
						body={'Do you know we provide Affiliate Marketing. You can also open a shop with us 😊'}
						type={'spin'}
						color={'#2686CE'}
						height={250}
						width={250}
					/>
				</div>
			) : (
				<>
					<div className="w-[90%] mx-auto">
						{' '}
						<h2 className="text-xl lg:text-4xl my-4">Sign In</h2>
						<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
							{(formik) => (
								<Form>
									<div className="form-control">
										<Input
											className={inputClass}
											type="email"
											name="email"
											id="email"
											placeholder="email@email.com"
											// autoComplete="off"
											{...formik.getFieldProps('email')}
										/>
									</div>

									<div className="form-control">
										<Input
											className={inputClass}
											type="password"
											name="password"
											id="password"
											placeholder="Password"
											{...formik.getFieldProps('password')}
										/>
									</div>

									<div className=" form-control">
										<FlowbiteButton
											type="submit"
											aria-disabled="true"
											className={` text-white text-normal lg:text-lg border-0 bg-primary btn-md lg:btn-lg hover:bg-primary/80 ${
												!formik.isValid || !formik.dirty ? 'cursor-not-allowed' : 'cursor-pointer'
											}`}
											disabled={!formik.isValid || !formik.dirty ? 'disabled' : ''}
										>
											{formik.isSubmitting ? (
												<>
													<Spinner color={'secondary'} /> &emsp;{' '}
													<span className="my-auto text-xl">Submitting Data...</span>{' '}
												</>
											) : (
												<span className="text-lg w-full flex lg:text-2xl">
													Login &nbsp; <MdLogin className="text-lg my-auto lg:text-2xl" />
												</span>
											)}
										</FlowbiteButton>
									</div>
								</Form>
							)}
						</Formik>
						<div className="w-full font-bold my-2 lg:my-8 hover:underline text-primary text-md lg:text-2xl text-center">
							<Link to={Approutes.forgotPassword}>Forgot your Password?</Link>
						</div>
					</div>

					<div className="w-[80%] mx-auto my-4 lg:my-8 p-[0.1rem] bg-black"></div>

					<div className="w-[85%] mx-auto my-4">
						<p className="w-full text-center text-md lg:text-2xl">Or Connect with:</p>

						<Button className="mt-6 w-full px-4 py-[.7rem] text-white bg-[#0F8EEF] flex items-center hover:brightness-90">
							<img src={Facebook} alt="apple logo" className="mr-auto" />{' '}
							<span className="text-center font-semibold w-full">Continue with Facebook</span>
						</Button>

						<Button className="mt-6 w-full px-4 py-[.7rem] text-white bg-black flex items-center hover:brightness-90">
							<img src={Apple} alt="apple logo" className="mr-auto" />{' '}
							<span className="text-center font-semibold w-full">Continue with Apple</span>
						</Button>

						<Button className="mt-6 w-full px-4 py-[.7rem] border border-black text-black bg-white flex items-center hover:brightness-90">
							<img src={Google} alt="apple logo" className="mr-auto" />{' '}
							<span className="text-center font-semibold w-full">Continue with Google</span>
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

export default Login;

const inputClass =
	'input input-bordered border-black w-full bg-gray-100 text-black text-lg lg:text-xl rounded-none my-2 input-md lg:input-lg';
