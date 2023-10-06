import { useState } from 'react';
import { Button } from '../../ui';
import { FormControl } from '../../components';
import { Form, Formik } from 'formik';
// import * as Yup from 'yup';
import * as Yup from 'yup';
import { ToggleSwitch } from 'flowbite-react';

const Playground = () => {
	const [loading, setLoading] = useState(false);
	const [checked, setChecked] = useState(false);

	const initialValues = {
		name: '',
		description: '',
		selectOption: '',
		radioOption: '',
		checkboxOption: [],
		images: [],
		birthDate: null,
		isVisible: false,
	};
	const validationSchema = Yup.object({
		name: Yup.string().required('Required'),
		description: Yup.string().required('Required'),
		selectOption: Yup.string().required('Required'),
		radioOption: Yup.string().required('Required'),
		checkboxOption: Yup.array().required('Required'),
		birthDate: Yup.date().required('Required').nullable(),
		images: Yup.array()
			.required('At least one image is required')
			.of(
				Yup.mixed().test('fileFormat', 'Unsupported Format', (value) => {
					if (!value) {
						return true; // Allow empty values
					}
					// Ensure that every selected file is an image
					return value.type.startsWith('image/');
				})
			),
	});

	const onSubmit = (values, { resetForm }) => {
		setLoading(true);
		setTimeout(() => {
			console.log('Form data', values);
			console.log('Saved data', JSON.parse(JSON.stringify(values)));
			setLoading(false);
			resetForm();
		}, 3000);
	};

	return (
		<div className="w-full max-w-5xl mx-auto">
			<div className=" w-full text-black">
				<h1 className=" text-center my-4">Playground</h1>

				<div className="p-6 space-y-12">
					<div>
						<h3 className=" text-center text-primary">Buttons</h3>

						{/* <h5>Props </h5> */}
						<div className="flex gap-12 flex-wrap justify-center my-3">
							<div className=" text-center">
								<p>variant - primary</p>
								<Button variant="primary" className="my-4 text-lg rounded-full font-bold">
									+ Follow
								</Button>
							</div>
							<div className=" text-center">
								<p>variant - secondary, size - small</p>
								<Button variant="secondary" size={'small'} className="my-4 text-lg rounded-full font-bold">
									+ Follow
								</Button>
							</div>

							<div className=" text-center">
								<p>variant - subtle</p>
								<Button variant="subtle" size={'full'} className="my-4 text-lg rounded-full font-bold">
									+ Follow
								</Button>
							</div>
							<div className=" text-center">
								<p>variant - outline</p>
								<Button variant="outline" className="my-4 text-lg rounded-full font-bold">
									Other Shops
								</Button>
							</div>
							<div className=" text-center">
								<p>variant - primary, loading - true, size - full</p>
								<Button
									loading={true}
									variant="primary"
									size={'full'}
									className="my-4 text-lg rounded-full font-bold"
								>
									Submit
								</Button>
							</div>
						</div>
					</div>

					<div>
						<h3 className=" text-center text-primary ">Toggle</h3>

						<div className="flex flex-col justify-center items-center my-6">
							<p className="text-center py-2">
								<b>ToggleSwitch</b> from flowbite
							</p>
							<ToggleSwitch
								checked={checked}
								// name="isVisible"
								onChange={(e) => setChecked(e)}
							/>
						</div>
					</div>

					<div>
						<h3 className="text-center text-primary">FormControl</h3>

						{/* <h5>Props </h5> */}
						<div>
							<Formik
								initialValues={initialValues}
								onSubmit={onSubmit}
								validationSchema={validationSchema}
							>
								{(formik) => {
									return (
										<Form>
											<p className="my-0 py-0">control - input, type - text, required - true</p>
											<FormControl
												control="input"
												name="name"
												type="text"
												label="Enter your name"
												placeholder="Enter your name"
												required={true}
											/>
											<FormControl control="imageinput" name="images" type="file" label="Enter your images" />

											<FormControl control="textarea" name="description" type="text" label="Description" />

											<FormControl
												control="select"
												options={dropdownOptions}
												name="selectOption"
												label="Select an option"
												required={true}
											/>
											<FormControl
												control="radio"
												options={radioOptions}
												name="radioOption"
												label="Radio topic"
												required={true}
											/>
											<FormControl
												control="checkbox"
												options={checkboxOptions}
												name="checkboxOption"
												label="Checkbox topic"
											/>
											<FormControl control="datepicker" name="birthDate" label="Pick a date" />

											<ToggleSwitch
												checked={formik.values.isVisible}
												name="isVisible"
												onChange={(e) => formik.setFieldValue('isVisible', e)}
											/>

											<Button
												loading={loading}
												type="submit"
												variant="primary"
												size="full"
												className="my-4 text-lg rounded-sm font-bold"
											>
												Submit
											</Button>
										</Form>
									);
								}}
							</Formik>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Playground;

const dropdownOptions = [
	{ key: 'Select an option', value: '' },
	{ key: 'Option 1', value: 'option1' },
	{ key: 'Option 2', value: 'option2' },
	{ key: 'Option 3', value: 'option3' },
];

const radioOptions = [
	{ key: 'Option 1', value: 'rOption1' },
	{ key: 'Option 2', value: 'rOption2' },
	{ key: 'Option 3', value: 'rOption3' },
];

const checkboxOptions = [
	{ key: 'Option 1', value: 'cOption1' },
	{ key: 'Option 2', value: 'cOption2' },
	{ key: 'Option 3', value: 'cOption3' },
];
