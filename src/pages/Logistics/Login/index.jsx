import { Button, InputGroup } from '../../../ui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNotify } from '../../../hooks';
import { Link, useNavigate } from 'react-router-dom';
import { LogisticsSignup } from '../../../assets/images';

const LogisticLogin = () => {
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

	const formik = useFormik({
		initialValues,
		validationSchema: validationSchema,
		onSubmit: async (values, { setSubmitting, resetForm }) => {
			try {
				setSubmitting(true);

				// Submit the form data to the backend endpoint\
				notify('You are now a grabber!', 'success');
				resetForm();

				// Delay navigation after form submission
				setTimeout(() => {
					navigate(Approutes.logout); // Navigate to home route after timeout
				}, 2000); // Adjust timeout delay as needed (2000 milliseconds = 2 seconds)
			} catch (error) {
				// console.error('Form submission error:', error);
				notify(error.response.data.message, 'error');
			} finally {
				// Ensure to set submitting state to false after submission attempt
				setSubmitting(false);
			}
		},
	});

	return (
		<div className="min-h-screen py-8 px-12 space-y-6 ">
			<h2 className="text-3xl text-center ">Welcome to Boonfu Logistic Service Portal </h2>

			<section className="h-full flex items-stretch ">
				<div className="w-full flex-1 bg-[#047F73] flex flex-col justify-between gap-4  p-4 rounded-l-xl">
					<div className="flex flex-col items-center justify-center text-center  text-white ">
						<h1 className="font-bold">Welcome back</h1>
						<p>
							Don't have an account?{' '}
							<Link to={'#'} className="text-secondary">
								Sign up
							</Link>
						</p>
					</div>

					<form onSubmit={formik.handleSubmit} className="h-full flex flex-col justify-between gap-4">
						<div className="space-y-4">
							<div>
								<label htmlFor="company_name" className="text-white ">
									Email address
								</label>
								<InputGroup
									name="email"
									type="email"
									value={formik.values.email}
									onChange={formik.handleChange}
								/>
							</div>
							<div>
								<label htmlFor="company_name" className="text-white ">
									Password
								</label>
								<InputGroup
									name="password"
									type="password"
									value={formik.values.password}
									onChange={formik.handleChange}
								/>
							</div>
						</div>

						<Button variant={'secondary'} type="submit">
							Sign In
						</Button>
					</form>
				</div>

				<div className=" w-full flex-1 flex items-center justify-center bg-[#2686CE78] p-2  rounded-r-xl">
					<img
						src={LogisticsSignup}
						alt="Logistics signup"
						className="w-[440px] h-[440px] object-cover"
					/>
				</div>
			</section>
		</div>
	);
};

export default LogisticLogin;
