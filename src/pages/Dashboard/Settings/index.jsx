import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DashboardHeader } from '../../../components';
import { useEffect, useState } from 'react';
import { Button, InputGroup } from '../../../ui';
import { EditPencil, UploadDoc } from '../../../assets/svgs';
import LoadingScreen from './LoadingScreen';
import { MdClose } from 'react-icons/md';
import { useNotify } from '../../../hooks';

const Settings = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [toggleEdit, setToggleEdit] = useState({
		profile: true,
		account: true,
	});
	const allowedExtensions = ['.pdf', '.doc', '.docx', '.txt'];
	const notify = useNotify();
	// formData values and validation
	const initialValues = {
		page_name: 'Kola Autos',
		username: 'affi.ng/adeolalawal',
		display_name: 'Kols Wheels',
		third_party_management: 'Instruction for third-party manageent',
		shop_owner_name: 'Kolawole Amope',
		personal_contact: 'sijuadelawal@gmail.com',
		id_type: 'State your means of ID.',
		id_document: '',
	};

	const validationSchema = Yup.object({
		page_name: Yup.string().required('Required'),
		username: Yup.string().required('Required'),
		display_name: Yup.string().required('Required'),
		third_party_management: Yup.string().required('Required'),
		shop_owner_name: Yup.string().required('Required'),
		personal_contact: Yup.string().required('Required').email('Invalid email address'),
		id_type: Yup.string().required('Required'),
	});

	// submit function
	const handleSave = (values) => {
		const formData = { ...values, username: `Boonfu.com/${values.username}` };

		setToggleEdit(() => ({
			profile: true,
			account: true,
		}));
	};

	const formik = useFormik({
		initialValues,
		onSubmit: handleSave,
		validationSchema,
	});

	const handleFileChange = (e) => {
		const file = e.currentTarget.files[0];
		if (
			!file.type.startsWith('image/') &&
			!allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
		) {
			notify('Invalid file type. Please select an image or a document.', 'error');
		} else {
			formik.setFieldValue('id_document', file);
		}
	};

	const handleRemoveFile = () => {
		formik.setFieldValue('id_document', '');
	};

	// loading screen timeout
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, []);

	if (isLoading) {
		return (
			<>
				<DashboardHeader />
				<LoadingScreen />;
			</>
		);
	}

	return (
		<div>
			<DashboardHeader />

			{/* General profile settings container */}
			<div className="flex flex-col my-8 md:px-2 lg:px-4">
				<div className="flex justify-between border-b border-black/30">
					<h4>General profile settings</h4>
					<div
						onClick={() => setToggleEdit((prev) => ({ ...prev, profile: false }))}
						className="flex gap-1 items-center text-primary text-lg font-medium cursor-pointer"
					>
						<img src={EditPencil} alt="/" className="w-4" />
						<span>Edit</span>
					</div>
				</div>
				{/* max-md:flex-col md:items-center md:justify-between */}
				<form className="w-full lg:w-[600px]">
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm mt-2" htmlFor="page_name">
							Page name
						</label>
						<InputGroup
							name="page_name"
							type="text"
							className={`${toggleEdit.profile && inputStyle} `}
							disabled={toggleEdit.profile}
							value={formik.values.page_name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMsg={
								formik.touched.page_name && formik.errors.page_name ? formik.errors.page_name : null
							}
						/>
					</div>
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm mt-2" htmlFor="username">
							Username
						</label>
						<InputGroup
							name="username"
							type="text"
							className={`${toggleEdit.profile && inputStyle} `}
							disabled={toggleEdit.profile}
							value={formik.values.username}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMsg={formik.touched.username && formik.errors.username ? formik.errors.username : null}
						/>
					</div>
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm mt-2" htmlFor="display_name">
							Display name
						</label>
						<InputGroup
							name="display_name"
							type="text"
							className={`${toggleEdit.profile && inputStyle} `}
							disabled={toggleEdit.profile}
							value={formik.values.display_name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMsg={
								formik.touched.display_name && formik.errors.display_name
									? formik.errors.display_name
									: null
							}
						/>
					</div>
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm mt-2" htmlFor="third_party_management">
							Third-Party Management{' '}
						</label>
						<InputGroup
							name="third_party_management"
							type="text"
							className={`${toggleEdit.profile && inputStyle} `}
							disabled={toggleEdit.profile}
							value={formik.values.third_party_management}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMsg={
								formik.touched.third_party_management && formik.errors.third_party_management
									? formik.errors.third_party_management
									: null
							}
						/>
					</div>
				</form>
			</div>

			{/* General account settings container */}
			<div className="flex flex-col my-8 md:px-2 lg:px-4">
				<div className="flex justify-between border-b border-black/30">
					<h4>General Account settings</h4>
					<div
						onClick={() => setToggleEdit((prev) => ({ ...prev, account: false }))}
						className="flex gap-1 items-center text-primary text-lg font-medium cursor-pointer"
					>
						<img src={EditPencil} alt="/" className="w-4" />
						<span>Edit</span>
					</div>
				</div>

				<form className="w-full lg:w-[600px]">
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm mt-2" htmlFor="shop_owner_name">
							Shop Owner’s Name
						</label>
						<InputGroup
							name="shop_owner_name"
							type="text"
							className={`${toggleEdit.account && inputStyle} `}
							disabled={toggleEdit.account}
							value={formik.values.shop_owner_name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMsg={
								formik.touched.shop_owner_name && formik.errors.shop_owner_name
									? formik.errors.shop_owner_name
									: null
							}
						/>
					</div>
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm mt-2" htmlFor="personal_contact">
							Personal Contact
						</label>
						<InputGroup
							name="personal_contact"
							type="email"
							className={`${toggleEdit.account && inputStyle} `}
							disabled={toggleEdit.account}
							value={formik.values.personal_contact}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMsg={
								formik.touched.personal_contact && formik.errors.personal_contact
									? formik.errors.personal_contact
									: null
							}
						/>
					</div>
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm mt-2" htmlFor="id_type">
							Account verification
						</label>
						<InputGroup
							name="id_type"
							type="text"
							className={`${toggleEdit.account && inputStyle} `}
							disabled={toggleEdit.account}
							value={formik.values.id_type}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errorMsg={formik.touched.id_type && formik.errors.id_type ? formik.errors.id_type : null}
						/>
					</div>
					<div className="flex max-md:flex-col md:items-center md:justify-between  border-b border-black/10">
						<label className="max-md:text-sm mt-2" htmlFor="id_document">
							Upload Required Documents
						</label>
						{toggleEdit.account ? (
							<p className={`${inputStyle} py-4 px-3 text-start min-w-[14rem]`}>
								{formik?.values.id_document ? formik.values.id_document.name : 'No file chosen'}
							</p>
						) : (
							<div className="flex items-center gap-4 min-w-[14rem] ">
								<div className={`${formik?.values.id_document && 'group'} relative max-md:px-4 md:ml-auto`}>
									<p>{formik?.values.id_document ? formik.values.id_document.name : 'Select a file'}</p>
									<div className="w-4 h-4 flex items-center justify-center rounded-full bg-gray-100 absolute right-0 top-[-1rem] cursor-pointer opacity-0 group-hover:opacity-100 transition-all">
										<MdClose size={12} onClick={handleRemoveFile} />
									</div>
								</div>
								<InputGroup name="id_document" type="file" onChange={handleFileChange}>
									<img src={UploadDoc} alt="/" className="w-12 " />
								</InputGroup>
							</div>
						)}
						{/* <input
							type="file"
							name="id_document"
							className={`${toggleEdit.account && inputStyle} `}
							disabled={toggleEdit.account}
							onChange={handleFileChange}
							onBlur={formik.handleBlur}
						/> */}
					</div>
				</form>
			</div>

			<div className="mb-16 px-4 sm:w-[300px] max-sm:mx-auto">
				<Button
					type="submit"
					variant="primary"
					size="full"
					disabled={!formik.isValid || (toggleEdit.profile && toggleEdit.account)}
					onClick={formik.handleSubmit}
				>
					Save changes
				</Button>
			</div>
		</div>
	);
};

export default Settings;

const inputStyle = 'border-transparent font-medium my-0';

// Settings form data

/*
{
		page_name: 'Kola Autos',
		username: 'affi.ng/adeolalawal',
		display_name: 'Kols Wheels',
		shop_owner_name: 'Kolawole Amope',
		personal_contact: 'sijuadelawal@gmail.com',
		id_type: 'State your means of ID.',
		id_document: '',
		(third_party_management: '',) should be ignored for now
}
*/
