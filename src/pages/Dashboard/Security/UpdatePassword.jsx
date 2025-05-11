import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../../ui';
import { FormControl } from '../../../components';
import { updateUserPassword, useNotify } from '../../../hooks';
import { Approutes } from '../../../constants';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = ({ setIsOpen }) => {
	const { mutate } = updateUserPassword();
	const notify = useNotify();
	const navigate = useNavigate();

	const initialValues = {
		password: '',
		confirmPassword: '',
	};

	const validationSchema = Yup.object({
		password: Yup.string()
			.required('Required')
			.min(8, 'Password must be 8 characters long')
			.matches(/[0-9]/, 'Password requires a number')
			.matches(/[a-z]/, 'Password requires a lowercase letter')
			.matches(/[A-Z]/, 'Password requires an uppercase letter'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password'), null], 'Must match "New password" field ')
			.required('Required'),
	});

	const onSubmit = (values, { setSubmitting, resetForm }) => {
		mutate(values, {
			onSuccess: (data) => {
				notify(data.message, 'success');
				resetForm();
				setSubmitting(false);
				setIsOpen(false);
			},
			onError: (error) => {
				// notify(error?.response?.data?.message, 'error');
				if (error.response.data.errorCode === 422) {
					notify('Session timeout, Login again', 'error');
					navigate(Approutes.auth.initial);
				} else {
					notify(error.response.data.message, 'error');
				}
			},
		});
	};

	return (
		<div>
			<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
				{(formik) => {
					return (
						<Form className="px-1 mt-1 space-y-4">
							<FormControl
								control="input"
								type="password"
								name="password"
								placeholder="New password"
								className={'w-full rounded-[.3rem]'}
							/>
							<FormControl
								control="input"
								type="password"
								name="confirmPassword"
								placeholder="Confirm new password"
								className={'w-full rounded-[.3rem]'}
							/>

							<Button
								type="submit"
								variant="primary"
								size="full"
								className={' rounded-[.3rem]'}
								loading={formik.isSubmitting}
							>
								Done
							</Button>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

export default UpdatePassword;
