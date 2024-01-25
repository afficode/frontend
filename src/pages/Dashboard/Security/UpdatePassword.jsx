import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../../ui';
import { FormControl } from '../../../components';

const UpdatePassword = () => {
	const initialValues = {
		old_password: '',
		new_password: '',
		confirm_password: '',
	};

	const validationSchema = Yup.object({
		old_password: Yup.string().required('Required'),
		new_password: Yup.string()
			.required('Required')
			.min(8, 'Password must be 8 characters long')
			.matches(/[0-9]/, 'Password requires a number')
			.matches(/[a-z]/, 'Password requires a lowercase letter')
			.matches(/[A-Z]/, 'Password requires an uppercase letter'),
		confirm_password: Yup.string()
			.oneOf([Yup.ref('new_password'), null], 'Must match "New password" field ')
			.required('Required'),
	});

	const onSubmit = (values) => {
		console.log(values);
	};
	return (
		<div>
			<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
				{(formik) => {
					return (
						<Form className="px-1 space-y-4 mt-1">
							<FormControl
								control="input"
								type="password"
								name="old_password"
								placeholder="Old password"
								className={'w-full rounded-[.3rem]'}
							/>
							<FormControl
								control="input"
								type="password"
								name="new_password"
								placeholder="New password"
								className={'w-full rounded-[.3rem]'}
							/>
							<FormControl
								control="input"
								type="password"
								name="confirm_password"
								placeholder="Confirm new password"
								className={'w-full rounded-[.3rem]'}
							/>

							<Button type="submit" variant="primary" size="full" className={' rounded-[.3rem]'}>
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

// update password form data

/* 
	{
		old_password: '',
		new_password: '',
		confirm_password: '',
	}
*/
