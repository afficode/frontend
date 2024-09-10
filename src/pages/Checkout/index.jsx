import { Car, Mastercard, MastercardLogo, Paypal, Visa, VisaLogo } from '../../assets/images';
import { useStates } from '../../hooks';
import { Button, InputGroup } from '../../ui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { formatCardNumber, formatCurrency, toSelectOptions } from '../../utils';
import { Cancel, EditPencilBlack } from '../../assets/svgs';
import { useState } from 'react';
import { HiOutlineSignal } from 'react-icons/hi2';
import { set } from 'date-fns';
import PaymentOption from './PaymentOption';

const Checkout = () => {
	const { data: states } = useStates();
	const statesOptions = toSelectOptions(states, 'states', 'Select your state');
	const [edit, setEdit] = useState(false);
	const [paymentOption, setPaymentOption] = useState('card');

	const [cardType, setCardType] = useState('Visa');

	const initialValuesDelivery = {
		country: 'Nigeria',
		state: '5',
		street_address: '4, Kuleju street, old arena hub.',
		name: 'Mr Kunle Kalejaiye',
		phone_number: '+23480334555555',
	};

	const validationSchemaDelivery = Yup.object({
		country: Yup.string().required('Required'),
		state: Yup.string().required('Required'),
		street_address: Yup.string().required('Required'),
		name: Yup.string().required('Required'),
		phone_number: Yup.string().required('Required'),
	});

	const formikDelivery = useFormik({
		initialValues: initialValuesDelivery,
		validationSchema: validationSchemaDelivery,
		onSubmit: async (values) => {
			console.log(values);
		},
	});

	// card payment formik
	const initialValuesCard = {
		debit_card: '',
		name: '',
		expiration_date: '',
		cvv: '',
	};

	const validationSchemaCard = Yup.object({
		debit_card: Yup.number().required('Required'),
		name: Yup.string().required('Required'),
		expiration_date: Yup.string().required('Required'),
		cvv: Yup.string().required('Required'),
	});

	const formikCard = useFormik({
		initialValues: initialValuesCard,
		validationSchema: validationSchemaCard,
		onSubmit: async (values) => {
			console.log(values);
		},
	});

	const [inputValue, setInputValue] = useState('');

	// Deposit formik
	const formikDeposit = useFormik({
		initialValues: {
			amount: '',
		},
		onSubmit: (values) => {
			console.log('Submitted values:', values);
		},
	});
	const handleAmountChange = (e) => {
		const rawValue = e.target.value.replace(/,/g, ''); // Remove commas for proper parsing

		if (!isNaN(rawValue) || rawValue === '') {
			setInputValue(rawValue);
			formikDeposit.setFieldValue('amount', rawValue);
		}
	};

	const handleAmountBlur = (e) => {
		const formattedValue = formatCurrency(inputValue);
		setInputValue(formattedValue);
		formikDeposit.setFieldValue('amount', formattedValue);
	};

	// Withdraw formik
	const formikWithdraw = useFormik({
		initialValues: {
			bank: '',
			amount: '',
		},
		onSubmit: (values) => {
			console.log('Submitted values:', values);
		},
	});
	const handleWithdrawChange = (e) => {
		const rawValue = e.target.value.replace(/,/g, ''); // Remove commas for proper parsing

		if (!isNaN(rawValue) || rawValue === '') {
			setInputValue(rawValue);
			formikWithdraw.setFieldValue('amount', rawValue);
		}
	};

	const handleWithdrawBlur = (e) => {
		const formattedValue = formatCurrency(inputValue);
		setInputValue(formattedValue);
		formikWithdraw.setFieldValue('amount', formattedValue);
	};

	const [transactionType, setTransactionType] = useState('deposit');

	return (
		<section className="mx-6 my-4">
			<h3 className="py-4">You are on: Boonfu Checkout</h3>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
				{/* left containers  */}
				<div className="lg:col-span-2 space-y-6 lg:space-y-4">
					{/* Review item */}
					<section className="border border-black">
						<h5 className="py-2 px-4 font-bold bg-gray-300">Review Item</h5>

						<div className="px-4 pt-2 pb-6">
							<h6 className="text-black/60 py-2">Grabber ID: AYO23415</h6>
							<div className="flex gap-6">
								<img src={Car} alt="/" className="w-16 h-16" />
								<div className="flex flex-col gap-6">
									<div>
										<p className="uppercase">JBL Headphone, Black</p>
										<p className="font-bold">150,000.00</p>
									</div>

									<div>
										<h6 className="font-bold mb-1">Delivery</h6>
										<p>Service: Boonfu delivery</p>
										<p>Type: Express delivery (Same day)</p>
										<p className="font-bold">150,000.00</p>
										<hr className="text-black/60 w-full my-3" />
										<p>Note : Please leave item with neighbour (Mr Kola - 07034xxxxxxx)</p>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Deliver to  */}
					<section className="border border-black">
						<h5 className="py-2 px-4 font-bold bg-gray-300">Deliver to:</h5>

						<form onSubmit={formikDelivery.handleSubmit} className=" bg-white px-4 py-6 space-y-4">
							<div className="">
								<label htmlFor="country" className="font-semibold">
									Country <span title="Required">*</span>
								</label>
								<InputGroup
									name="country"
									type="text"
									placeholder="Enter a display name"
									className="w-[250px]"
									value={formikDelivery.values.country}
									disabled={edit === false && true}
									onChange={formikDelivery.handleChange}
									onBlur={formikDelivery.handleBlur}
									// errorMsg={
									// 	formikDelivery.touched.country && formikDelivery.errors.country
									// 		? formikDelivery.errors.country
									// 		: null
									// }
								/>
							</div>

							<div className="">
								<label htmlFor="state" className="font-semibold">
									State <span title="Required">*</span>
								</label>
								<InputGroup
									name="state"
									type="select"
									className="w-[250px]"
									optionLists={statesOptions}
									value={formikDelivery.values.state}
									disabled={edit === false && true}
									onChange={formikDelivery.handleChange}
									onBlur={formikDelivery.handleBlur}
									errorMsg={
										formikDelivery.touched.state && formikDelivery.errors.state
											? formikDelivery.errors.state
											: null
									}
								/>
							</div>

							<div className="">
								<label htmlFor="street_address" className="font-semibold">
									Street address <span title="Required">*</span>
								</label>
								<InputGroup
									name="street_address"
									type="text"
									placeholder="Enter street address"
									className="w-[250px]"
									value={formikDelivery.values.street_address}
									disabled={edit === false && true}
									onChange={formikDelivery.handleChange}
									onBlur={formikDelivery.handleBlur}
									errorMsg={
										formikDelivery.touched.street_address && formikDelivery.errors.street_address
											? formikDelivery.errors.street_address
											: null
									}
								/>
							</div>
							<div className="">
								<label htmlFor="name" className="font-semibold">
									Name <span title="Required">*</span>
								</label>
								<InputGroup
									name="name"
									type="text"
									placeholder="Enter name"
									className="w-[250px]"
									value={formikDelivery.values.name}
									disabled={edit === false && true}
									onChange={formikDelivery.handleChange}
									onBlur={formikDelivery.handleBlur}
									errorMsg={
										formikDelivery.touched.name && formikDelivery.errors.name
											? formikDelivery.errors.name
											: null
									}
								/>
							</div>
							<div className="">
								<label htmlFor="phone_number" className="font-semibold">
									Phone Number <span title="Required">*</span>
								</label>
								<InputGroup
									name="phone_number"
									type="text"
									placeholder="Enter phone number"
									className="w-[250px]"
									value={formikDelivery.values.phone_number}
									disabled={edit === false && true}
									onChange={formikDelivery.handleChange}
									onBlur={formikDelivery.handleBlur}
									errorMsg={
										formikDelivery.touched.phone_number && formikDelivery.errors.phone_number
											? formikDelivery.errors.phone_number
											: null
									}
								/>
							</div>

							<div className="py-8  flex items-center gap-4">
								<Button type="button" variant={'primary'} size={'small'} onClick={() => setEdit(false)}>
									Save
								</Button>
								<Button
									type="button"
									variant={'plain'}
									className={'flex items-center gap-2 border border-black '}
									size={'small'}
									onClick={() => setEdit(true)}
								>
									Edit <img src={EditPencilBlack} alt="/" className="w-3" />
								</Button>
							</div>
						</form>
					</section>

					{/* Payment method */}
					<PaymentOption
						paymentOption={paymentOption}
						setPaymentOption={setPaymentOption}
						inputValue={inputValue}
						setInputValue={setInputValue}
						setCardType={setCardType}
						cardType={cardType}
						formikCard={formikCard}
						formikDeposit={formikDeposit}
						setTransactionType={setTransactionType}
						transactionType={transactionType}
						handleAmountChange={handleAmountChange}
						handleAmountBlur={handleAmountBlur}
						formikWithdraw={formikWithdraw}
						handleWithdrawChange={handleWithdrawChange}
						handleWithdrawBlur={handleWithdrawBlur}
					/>
				</div>

				{/* right container  */}
				<div className="lg:col-span-1 border border-black  !px-2 !py-4 h-fit space-y-6">
					{/* <aside className="border border-black px-2 py-4 ">
						<div className="flex justify-between">
							<p>Item</p>
							<p>#150,000.00</p>
						</div>
						<div className="flex justify-between">
							<p>Delivery</p>
							<p>#150,000.00</p>
						</div>
						<hr />
						<div className="flex justify-between">
							<p>Order Total</p>
							<p>#300,000.00</p>
						</div>

						<div className="mx-2 mt-4  text-center">
							<Button variant={'grey'} size={'full'} className={'rounded-2xl font-bold text-xl'}>
								Confirm and pay
							</Button>
						</div>
					</aside> */}
					<table className="w-full ">
						<tbody className="border-b border-black/30">
							<tr>
								<td>Item</td>
								<td>#150,000.00</td>
							</tr>
							<tr>
								<td>Delivery</td>
								<td>#3,500.00</td>
							</tr>
						</tbody>
						<tfoot>
							<tr>
								<td>Order Total</td>
								<td>#153,500.00</td>
							</tr>
						</tfoot>
					</table>
					<div>
						<Button variant={'grey'} size={'full'} className={'rounded-2xl font-bold text-xl'}>
							Confirm and pay
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Checkout;

const data = [
	{
		title: 'Visa',
		type: 'visa',
		number: '4848 2346 1783 9084',
		name: 'Emiliano Martens',
	},
];
