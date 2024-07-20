import { useFormik } from 'formik';
import { EditPencil } from '../../../assets/svgs';
import useAuth from '../../../context/UserContext';
import { Button, InputGroup } from '../../../ui';
import { useState } from 'react';
import * as Yup from 'yup';

const Details = () => {
	const [toggleEdit, setToggleEdit] = useState({
		contact: true,
		business: true,
	});
	const { user } = useAuth();

	// console.log(user);

	const initialValues = {
		email_address: user?.email,
		password: '',
		number: user?.number,
		location: 'Lagos',
		business_category: 'Agriculture',
	};

	const validationSchema = Yup.object({
		email_address: Yup.string().required('Required').email('Invalid email address'),
	});

	const handleSave = (values) => {
		// console.log(values);
		setToggleEdit(() => ({
			contact: true,
			business: true,
		}));
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSave,
		validationSchema,
	});

	return (
		<div className="px-4 sm:px-12">
			<div className="flex justify-between py-4 border-b border-black/30">
				<h2>
					{user?.firstname} {user?.lastname}
				</h2>
			</div>

			<div className="flex flex-col gap-6  py-4 border-b border-black/30">
				<div className="flex justify-between ">
					<h4>Contact details</h4>
					<div
						onClick={() => setToggleEdit((prev) => ({ ...prev, contact: false }))}
						className="flex gap-1 items-center text-primary text-lg font-medium cursor-pointer"
					>
						<img src={EditPencil} alt="/" className="w-4" />
						<span>Edit</span>
					</div>
				</div>

				<div className="flex max-sm:flex-col gap-6 sm:gap-16">
					<div className="space-y-1">
						<label className="text-black/60" htmlFor="email_address">
							Login email:
						</label>
						<p>{formik.values.email_address}</p>
					</div>
					<div className="space-y-1">
						<label className="text-black/60" htmlFor="password">
							Password
						</label>
						{toggleEdit.contact ? (
							<p>**********</p>
						) : (
							<InputGroup
								name="password"
								type="email"
								value={formik.values.password}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								errorMsg={formik.touched.password && formik.errors.password ? formik.errors.password : null}
							/>
						)}
					</div>
				</div>

				<div className="space-y-1">
					<label className="text-black/60" htmlFor="number">
						Contact number{' '}
					</label>
					{toggleEdit.contact ? (
						<p>{formik.values.number}</p>
					) : (
						<InputGroup
							name="number"
							type="text"
							value={formik.values.number}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMsg={formik.touched.number && formik.errors.number ? formik.errors.number : null}
						/>
					)}
				</div>
			</div>

			<div className="flex flex-col gap-6  py-4 border-b border-black/30">
				<div className="flex justify-between ">
					<h4>Business details</h4>
					<div
						onClick={() => setToggleEdit((prev) => ({ ...prev, business: false }))}
						className="flex gap-1 items-center text-primary text-lg font-medium cursor-pointer"
					>
						<img src={EditPencil} alt="/" className="w-4" />
						<span>Edit</span>
					</div>
				</div>

				<div className="space-y-1">
					<label className="text-black/60" htmlFor="business_category">
						Business Category
					</label>
					{toggleEdit.business ? (
						<p>{formik.values.business_category}</p>
					) : (
						<InputGroup
							name="business_category"
							type="text"
							value={formik.values.business_category}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMsg={
								formik.touched.business_category && formik.errors.business_category
									? formik.errors.business_category
									: null
							}
						/>
					)}
				</div>

				<div className="space-y-1">
					<label className="text-black/60" htmlFor="location">
						Location
					</label>
					{toggleEdit.business ? (
						<p>{formik.values.location}</p>
					) : (
						<InputGroup
							name="location"
							type="text"
							value={formik.values.location}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMsg={formik.touched.location && formik.errors.location ? formik.errors.location : null}
						/>
					)}
				</div>
			</div>

			<div className="my-8 sm:w-[200px] max-sm:mx-auto">
				<Button
					type="submit"
					variant="primary"
					size="full"
					onClick={formik.handleSubmit}
					disabled={!formik.isValid || (toggleEdit.business && toggleEdit.contact)}
				>
					Save
				</Button>
			</div>
		</div>
	);
};

export default Details;

const inputStyle = 'border-transparent font-medium ';
