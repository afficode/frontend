import { useNavigate } from 'react-router-dom';
import { RegistrationHook } from '../../hooks/AuthHook';
import { Button } from 'flowbite-react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Input from '../../components/FormComponents/Input';
import { FaEnvelope } from 'react-icons/fa';
import { Spinner } from '../../components';
import { notifySuccess, notifyError } from '../../ui/ErrorToast';

const ReverifyEmail = ({ endpoint }) => {
	const navigate = useNavigate();
	const notifyErr = (message) => notifyError(message);
	const notifySuc = (message) => notifySuccess(message);
	const initialValues = { email: '' };
	const validationSchema = Yup.object({
		email: Yup.string().required('Email is required').email('Invalid email address'),
	});

	const onSubmit = async (values, { setSubmitting }) => {
		const backendEndpoint = endpoint !== undefined ? endpoint : 'resend_verification';
		const submit = await RegistrationHook(values, setSubmitting, backendEndpoint);
		if (submit?.success) {
			notifySuc(submit.message);
			return navigate('/', { replace: true });
		} else {
			if (submit?.status === 401) {
				notifyErr('Email not found');
			} else {
				notifyErr(submit?.message);
			}
		}
		// notifyErr(submit.message);
	};

	return (
		<div className="w-full">
			<div className="p-2 lg:p-4">
				<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
					{(formik) => (
						<Form>
							<Input
								type="email"
								name="email"
								id="email"
								placeholder="email@email.com"
								className="input input-bordered border-black w-full bg-gray-100 text-black text-lg lg:text-xl rounded-none my-2 input-md"
								{...formik.getFieldProps('email')}
							/>
							<Button
								size="lg"
								type="submit"
								className="text-black bg-primary w-[60%] mx-auto text-md lg:text-2xl my-2"
								disabled={!formik.isValid || !formik.dirty ? 'disabled' : ''}
							>
								{!formik.isSubmitting ? (
									<>
										<span className="text-lg">Verify</span> &emsp; <FaEnvelope className="my-auto" />
									</>
								) : (
									<>
										<Spinner color="white" /> &emsp;
										<span className="pl-3 text-white">Sending Email... </span>
									</>
								)}
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default ReverifyEmail;
