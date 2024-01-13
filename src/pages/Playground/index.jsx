import { useState } from 'react';
import { Button, InputGroup, Notification } from '../../ui';
import { FormControl } from '../../components';
import { Field, Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { ToggleSwitch } from 'flowbite-react';
import { useNotify } from '../../hooks';

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
		engine_size: [],
	};
	const validationSchema = Yup.object({
		name: Yup.string().required('Required'),
		description: Yup.string().required('Required'),
		selectOption: Yup.string().required('Required'),
		radioOption: Yup.string().required('Required'),
		checkboxOption: Yup.array().min(1, 'Select at least one option').required('Required'),
		birthDate: Yup.date().required('Required').nullable(),
		images: Yup.array().min(1, 'At least one image is required').required(),
		// .test('FILE_TYPE', 'Unsupported Format', (value) => {
		// 	if (value) {
		// 		return ['image/png', 'image/jpeg', 'imgae/jpg'].includes(value.type);
		// 	}
		// })
		// .test('FILE_SIZE', 'Too big!', (value) => value && value < 1024 * 1024),
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

	const notify = useNotify();

	const clickHandler = () => {
		notify('Hello world', 'success', {
			position: 'top-center',
		});
	};

	//input group

	const initialFormValues = {
		name: '',
		description: '',
		bio: '',
		age: '',
	};

	const formik = useFormik({
		initialValues: initialFormValues,
		onSubmit: (values) => {
			console.log(values);
		},
		validate: (values) => {
			let errors = {};

			if (!values.name) {
				errors.name = 'Required';
			}

			if (!values.description) {
				errors.description = 'Required';
			}
			if (!values.bio) {
				errors.bio = 'Required';
			}

			if (!values.age) {
				errors.age = 'Required';
			}
			return errors;
		},
	});

	return (
		<div className="w-full max-w-5xl mx-auto">
			<div className="w-full text-black ">
				<h1 className="my-4 text-center ">Playground</h1>

				<div className="p-6 space-y-12">
					<div>
						<h3 className="text-center text-primary">Buttons</h3>

						<div className="w-[50rem]">
							<p className="truncate">
								Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo excepturi mollitia tenetur
								maiores dolorem ipsa veritatis animi? Tempore modi voluptatum iure beatae sequi, quasi quos
								doloribus excepturi quis dolores adipisci.
							</p>
						</div>

						{/* <h5>Props </h5> */}
						<div className="flex flex-wrap justify-center gap-12 my-3">
							<div className="text-center ">
								<p>variant - primary</p>
								<Button variant="primary" className="my-4 text-lg font-bold rounded-full">
									+ Follow
								</Button>
							</div>
							<div className="text-center ">
								<p>variant - secondary, size - small</p>
								<Button variant="secondary" size={'small'} className="my-4 text-lg font-bold rounded-full">
									+ Follow
								</Button>
							</div>

							<div className="text-center ">
								<p>variant - subtle</p>
								<Button variant="subtle" size={'full'} className="my-4 text-lg font-bold rounded-full">
									+ Follow
								</Button>
							</div>
							<div className="text-center ">
								<p>variant - outline</p>
								<Button variant="outline" className="my-4 text-lg font-bold rounded-full">
									Other Shops
								</Button>
							</div>
							<div className="text-center ">
								<p>variant - primary, loading - true, size - full</p>
								<Button
									loading={true}
									variant="primary"
									size={'full'}
									className="my-4 text-lg font-bold rounded-full"
								>
									Submit
								</Button>
							</div>
						</div>
					</div>

					<div>
						<h3>InputGroup</h3>

						<div>
							<form onSubmit={formik.handleSubmit}>
								<InputGroup
									name="name"
									value={formik.values.name}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									errorMsg={formik.touched.name && formik.errors.name ? formik.errors.name : null}
								/>
								<InputGroup
									name="description"
									value={formik.values.description}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									errorMsg={
										formik.touched.description && formik.errors.description ? formik.errors.description : null
									}
								/>
							</form>
							<form onSubmit={formik.handleSubmit}>
								<InputGroup
									name="bio"
									value={formik.values.bio}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									errorMsg={formik.touched.bio && formik.errors.bio ? formik.errors.bio : null}
								/>
								<InputGroup
									name="age"
									value={formik.values.age}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									errorMsg={formik.touched.age && formik.errors.age ? formik.errors.age : null}
								/>
							</form>

							<Button variant={'primary'} onClick={formik.handleSubmit} type="submit">
								Submit
							</Button>
						</div>
					</div>

					<div>
						<h3 className="text-center text-primary">Toggle</h3>

						<div className="flex flex-col items-center justify-center my-6">
							<p className="py-2 text-center">
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
						<h3 className="text-center text-primary">Notification bar</h3>

						<div className="flex flex-col items-center justify-center my-6">
							<Notification status={'success'} message={'Login success!'} />

							<Button variant={'primary'} onClick={clickHandler} className={'my-8 rounded-md'}>
								Click me
							</Button>
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
											<p className="py-0 my-0">control - input, type - text, required - true</p>
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
												type="checkbox"
											/>
											<FormControl control="datepicker" name="birthDate" label="Pick a date" />

											<ToggleSwitch
												checked={formik.values.isVisible}
												name="isVisible"
												onChange={(e) => formik.setFieldValue('isVisible', e)}
												className={formik.values.isVisible ? 'custom-toggle' : ''}
											/>

											<Button
												loading={loading}
												type="submit"
												variant="primary"
												size="full"
												className="my-4 text-lg font-bold rounded-sm"
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
