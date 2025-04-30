import { useAddBankAccount, useBanks, useNotify } from '../../../../hooks';
import { Button, InputGroup } from '../../../../ui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Cancel } from '../../../../assets/svgs';

const NewAccount = () => {
	const { data } = useBanks();

	const { mutate } = useAddBankAccount();
	const allBanks = data?.data;

	const bankOptions = [
		{ value: '', key: 'Select a bank' }, // Default option
		...(allBanks && Array.isArray(allBanks)
			? allBanks.map((a) => ({ value: a.code, key: a.name }))
			: []), // Map only if allBanks is an array
	];

	const notify = useNotify();

	// new account formik
	const formikNewAccount = useFormik({
		initialValues: {
			name: '',
			account_number: '',
			type: 'nuban',
			bank_code: '',
			currency: 'NGN',
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Account name is required'),
			account_number: Yup.string().required('Account number is required'),
			bank_code: Yup.string().required('Bank is required'),
		}),
		onSubmit: (values) => {
			mutate(values, {
				onSuccess: (data) => {
					notify('Account added successfully', 'success');
				},
				onError: (error) => {
					notify(error?.response?.data.message, 'error');
				},
			});
		},
	});

	return (
		<div>
			<h3 className="mb-8">Withdraw to a New Account </h3>
			<form onSubmit={formikNewAccount.handleSubmit} className="space-y-3 max-w-[24rem]">
				<div className="flex flex-col">
					<label htmlFor="bank_code" className="mb-[-7px] font-bold">
						Select Bank
					</label>

					<div className="relative max-w-sm">
						<InputGroup
							name="bank_code"
							id="bank_code"
							type="select"
							optionLists={bankOptions}
							placeholder={'Enter account number'}
							autoComplete="off"
							className={'customSelectInput'}
							value={formikNewAccount.values.bank_code}
							onChange={formikNewAccount.handleChange}
							onBlur={formikNewAccount.handleBlur}
							errorMsg={
								formikNewAccount.touched.bank_code && formikNewAccount.errors.bank_code
									? formikNewAccount.errors.bank_code
									: null
							}
						/>
					</div>
				</div>

				<div className="flex flex-col">
					<label htmlFor="account_number" className="mb-[-7px] font-bold">
						Account
					</label>
					<div className="relative max-w-sm">
						<InputGroup
							name="account_number"
							id="account_number"
							type="text"
							// amount
							placeholder={'Enter account number'}
							autoComplete="off"
							className={'customAmountInput !text-left !pl-3'}
							value={formikNewAccount.values.account_number}
							onChange={formikNewAccount.handleChange}
							onBlur={formikNewAccount.handleBlur}
							errorMsg={
								formikNewAccount.touched.account_number && formikNewAccount.errors.account_number
									? formikNewAccount.errors.account_number
									: null
							}
							cancelButton={
								<button
									onClick={() => {
										formikNewAccount.setFieldValue('account_number', '');
									}}
									type="button"
									className="absolute right-2 inset-y-0 my-auto h-fit "
								>
									<img src={Cancel} alt="/" className="w-4" />
								</button>
							}
						/>
					</div>
				</div>
				<div className="flex flex-col">
					<label htmlFor="name" className="mb-[-7px] font-bold">
						Account Name
					</label>
					<div className="relative max-w-sm">
						<InputGroup
							name="name"
							id="name"
							type="text"
							placeholder={'Enter account name'}
							autoComplete="off"
							className={'customAmountInput !text-left !pl-3'}
							value={formikNewAccount.values.name}
							onChange={formikNewAccount.handleChange}
							onBlur={formikNewAccount.handleBlur}
							errorMsg={
								formikNewAccount.touched.name && formikNewAccount.errors.name
									? formikNewAccount.errors.name
									: null
							}
							cancelButton={
								<button
									onClick={() => {
										formikNewAccount.setFieldValue('name', '');
									}}
									type="button"
									className="absolute right-2 inset-y-0 my-auto h-fit "
								>
									<img src={Cancel} alt="/" className="w-4" />
								</button>
							}
						/>
					</div>
				</div>

				<Button
					type="submit"
					variant={'secondary'}
					size={'full'}
					className={'max-w-sm font-bold rounded-xl'}
					disabled={
						!formikNewAccount.isValid || formikNewAccount.dirty === false || formikNewAccount.isSubmitting
					}
					loading={formikNewAccount.isSubmitting}
				>
					Add Account
				</Button>
			</form>
		</div>
	);
};

export default NewAccount;

const savedBankAccountList = [
	{
		id: 1,
		name: 'Zenith Bank',
		expiry: '20/29',
		number: '**** **** **** 0112',
	},
	{
		id: 2,
		name: 'EcoBank',
		expiry: '20/29',
		number: '**** **** **** 2211',
	},
];
