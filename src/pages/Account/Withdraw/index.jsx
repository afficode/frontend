import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, InputGroup, Modal } from '../../../ui';
import { ArrowRightBlack, Cancel } from '../../../assets/svgs';
import { FaCcVisa } from 'react-icons/fa';
import NewAccount from './NewAccount';
import { useNotify, useWithdraw } from '../../../hooks';
import { useQueryClient } from 'react-query';

const Withdraw = () => {
	const [newBankAccount, setNewBankAccount] = useState(false);

	const [selectedBank, setSelectedBank] = useState('');
	const queryClient = useQueryClient();

	const { mutate } = useWithdraw();

	const notify = useNotify();

	// Withdraw formik
	const formikWithdraw = useFormik({
		initialValues: {
			// preferred_payout: {},
			amount: '',
		},
		validationSchema: Yup.object({
			amount: Yup.number().required('Amount is required').min(500, 'Minimum amount is 500'),
		}),
		onSubmit: (values, { setSubmitting, resetForm }) => {
			// console.log('Submitted values:', values);

			mutate(values, {
				onSuccess: (data) => {
					// console.log('Withdraw data:', data);
					notify(data.message, 'success');
					queryClient.invalidateQueries('account-balance');
					queryClient.invalidateQueries('all-transactions');
					resetForm();
					setSubmitting(false);
				},
				onError: (error) => {
					setSubmitting(false);
					// console.log(error);
					notify(error.response.data.message, 'error');
				},
			});
		},
	});
	const handleWithdrawChange = (bank) => {
		// console.log(bank);
		setSelectedBank(bank);
		formikWithdraw.setFieldValue('preferred_payout', bank);
	};

	return (
		<div>
			<form onSubmit={formikWithdraw.handleSubmit} className="space-y-3 max-w-[24rem]">
				<div className="flex flex-col">
					<label htmlFor="bank" className="mb-[-7px] font-bold">
						Withdraw to:
					</label>

					<div className="dropdown dropdown-bottom dropdown-center ">
						<button
							type="button"
							tabIndex={0}
							className="customSelectInput p-2 mt-2 text-left flex justify-between items-center text-black/50 "
						>
							<span>{selectedBank ? selectedBank?.name : 'Select Account'}</span>{' '}
							<img src={ArrowRightBlack} className="w-4 h-4" alt="/" />
						</button>
						<ul
							tabIndex={0}
							className="dropdown-content  z-[1] menu  shadow bg-white   w-96 flex flex-col justify-between"
						>
							<div>
								<div className="bg-secondary text-center p-2">Bank Cards/Accounts</div>
								{savedBankAccountList.map((bank) => (
									<li
										onClick={() => handleWithdrawChange(bank)}
										key={bank?.id}
										tabIndex={0}
										className="cursor-pointer font-medium border-b border-b-transparent pb-0 hover:border-black/30  whitespace-nowrap flex flex-row items-center justify-between"
									>
										<div>
											<FaCcVisa size={25} /> {bank?.name}
										</div>{' '}
										<div>({bank?.number.toString().slice(-4)})</div>
									</li>
								))}
							</div>

							<button
								className="border border-secondary rounded-lg mt-8 p-2"
								onClick={() => setNewBankAccount(true)}
							>
								Withdraw to a new bank account
							</button>
						</ul>
					</div>
				</div>

				<div className="flex flex-col">
					<label htmlFor="amount" className="mb-[-7px] font-bold">
						Amount
					</label>
					<div className="relative max-w-sm">
						<InputGroup
							name="amount"
							id="amount"
							type="number"
							amount="NGN"
							autoComplete="off"
							className={'customAmountInput '}
							value={formikWithdraw.values.amount}
							onChange={formikWithdraw.handleChange}
							onBlur={formikWithdraw.handleBlur}
							errorMsg={
								formikWithdraw.touched.amount && formikWithdraw.errors.amount
									? formikWithdraw.errors.amount
									: null
							}
							cancelButton={
								<button
									onClick={() => {
										formikWithdraw.resetForm();
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
						!formikWithdraw.isValid || formikWithdraw.dirty === false || formikWithdraw.isSubmitting
					}
					loading={formikWithdraw.isSubmitting}
				>
					Withdraw
				</Button>
			</form>

			<Modal isOpen={newBankAccount} setIsOpen={setNewBankAccount}>
				<NewAccount />
			</Modal>
		</div>
	);
};

export default Withdraw;

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
