import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { DashboardHeader, FormControl } from '../../../components';
import { Button } from '../../../ui';

const PrivacyPolicy = () => {
	const initialValues = {
		activity_access: '',
		contact_access: '',
	};

	const validationSchema = Yup.object({
		activity_access: Yup.string().required('Required'),
		contact_access: Yup.string().required('Required'),
	});

	const onSubmit = (values) => {
		console.log(values);
	};

	return (
		<div>
			<DashboardHeader />

			{/* Privacy Settings container */}
			<div className="flex flex-col my-8 md:px-2 lg:px-4">
				<div className="flex justify-between border-b border-black/30">
					<h4>Privacy Settings</h4>
				</div>

				<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
					{(formik) => {
						return (
							<Form className=" ">
								<div className="max-md:mt-6 flex max-md:flex-col md:items-center md:gap-8  border-b border-black/10">
									<h6 className="font-semibold w-[14rem]">Your Activity</h6>
									<p>Manage profile and activity, Who can see your posts, adverts etc.</p>

									<div className="md:ml-auto">
										<FormControl control="select" name="activity_access" options={activityAccessOptions} />
									</div>
								</div>

								<div className="max-md:mt-6 flex max-md:flex-col md:items-center md:gap-8  border-b border-black/10">
									<h6 className="font-semibold w-[14rem]">Help people find and contact you</h6>
									<p>Who can connect with you, who can look you up using your phone number and email.</p>

									<div className="md:ml-auto">
										<FormControl control="select" name="contact_access" options={contactAccessOptions} />
									</div>
								</div>

								<div className="w-[200px] mt-12">
									<Button type="submit" variant="primary" size="full">
										Save
									</Button>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default PrivacyPolicy;

const activityAccessOptions = [
	{ key: 'Everyone', value: 'everyone' },
	{ key: 'Public', value: 'public' },
	{ key: 'Only me', value: 'only me' },
];
const contactAccessOptions = [
	{ key: 'Everyone', value: 'everyone' },
	{ key: 'Public', value: 'public' },
	{ key: 'Only me', value: 'only me' },
];

// PrivacyPolicy form data

/* 
	{
		activity_access: '',
		contact_access: '',
	}
*/
