import { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/FormComponents/Input';
import * as Yup from 'yup';
import { MdLogin } from 'react-icons/md';
import { LoginHook } from '../../hooks/AuthHook';
import { Approutes } from '../../constants';
import { Button as FlowbiteButton } from 'flowbite-react';
import useAuth from '../../context/UserContext';
import { SpinnerSkeleton, Spinner } from '../../components';
import { useNotify } from '../../hooks';

const Login = ({ id }) => {
	const { login } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams] = useSearchParams();

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
			const submit = await LoginHook({ ...values, type: 'user' }, setSubmitting);
			if (submit?.success) {
				// the login from the useAuth tied to a context hook, will update localStorage and set user to Login
				login(submit);
				navigate(location.state?.from || searchParams.get('next') || Approutes.home, {
					replace: true,
				});
				// return window.location.reload();
			} else {
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
						heading={'You’re being logged on.'}
						body={'...learn more about the Grab system too 😊.'}
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
						<h2 className="my-4 text-xl lg:text-4xl">Sign In</h2>
						<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
							{(formik) => (
								<Form>
									<div className="form-control">
										<Input
											className={inputClass}
											type="email"
											name="email"
											id={`${id}-login-email`}
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
											id={`${id}-login-password`}
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
											disabled={!formik.isValid || formik.isSubmitting}
										>
											{formik.isSubmitting ? (
												<>
													<Spinner color={'secondary'} /> &emsp;{' '}
													<span className="my-auto text-xl">Submitting Data...</span>{' '}
												</>
											) : (
												<span className="flex w-full text-base lg:text-lg text-white">
													Login &nbsp; <MdLogin className="my-auto text-lg text-white lg:text-2xl" />
												</span>
											)}
										</FlowbiteButton>
									</div>
								</Form>
							)}
						</Formik>
						<div className="w-full my-2 font-bold text-center lg:my-8 hover:underline text-primary text-base lg:text-lg">
							<Link to={Approutes.forgotPassword}>Forgot your Password?</Link>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Login;

const inputClass =
	'input input-bordered border-black w-full bg-gray-100 text-black text-sm lg:text-base rounded-none my-2 input-md lg:input-lg';
