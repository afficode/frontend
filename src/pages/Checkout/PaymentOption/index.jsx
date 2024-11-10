import React from 'react';
import {
	BoonfuLogo,
	Mastercard,
	MastercardLogo,
	Paypal,
	Visa,
	VisaLogo,
} from '../../../assets/images';
import { HiOutlineSignal } from 'react-icons/hi2';
import { formatCardNumber } from '../../../utils';
import { Button, InputGroup } from '../../../ui';
import { Cancel, CopyBlack, LoadingYellow, Padlock } from '../../../assets/svgs';

const PaymentOption = ({
	paymentOption,
	setPaymentOption,
	inputValue,
	setInputValue,
	setCardType,
	cardType,
	formikCard,
	formikDeposit,
	setTransactionType,
	transactionType,
	handleAmountChange,
	handleAmountBlur,
	formikWithdraw,
	handleWithdrawChange,
	handleWithdrawBlur,
}) => {
	return (
		<section className="border border-black">
			<h5 className="py-2 px-4 font-bold bg-gray-300">Payment options (select)</h5>

			<div className="px-4 py-6 bg-white">
				{/* select payment option  */}
				<div className="flex justify-between ">
					<div className="flex  gap-2">
						<input
							type="radio"
							name={'card_payment'}
							id={'card_payment'}
							value={'card'}
							checked={paymentOption === 'card'}
							onChange={(e) => setPaymentOption(e.target.value)}
							className={`mt-1`}
						/>
						<label htmlFor="card_payment" className="">
							Card Payment{' '}
							<div className="flex gap-2 items-center">
								<img src={Visa} alt="/" className="w-8" />
								<img src={Mastercard} alt="/" className="w-6" />
							</div>
						</label>
					</div>

					<div className="flex  gap-2">
						<input
							type="radio"
							name={'bank_transfer'}
							id="bank_transfer"
							value={'transfer'}
							checked={paymentOption === 'transfer'}
							onChange={(e) => setPaymentOption(e.target.value)}
							className={`mt-1`}
						/>
						<label htmlFor="bank_transfer" className="">
							Bank transfer
						</label>
					</div>

					<div className="flex  gap-2">
						<input
							type="radio"
							name={'paypal'}
							id={'paypal'}
							value={'paypal'}
							checked={paymentOption === 'paypal'}
							onChange={(e) => setPaymentOption(e.target.value)}
							className={`mt-1`}
						/>
						<label htmlFor="paypal" className="">
							<img src={Paypal} alt="/" className="w-[4rem]" />
						</label>
					</div>
				</div>

				{/* card payment option ui */}
				{paymentOption === 'card' && (
					<div className="my-[2.5rem] space-y-3 flex max-sm:flex-col sm:flex gap-12">
						<div className="sm:space-y-4 max-sm:flex max-sm:items-center max-sm:gap-4 flex-wrap">
							<button onClick={() => setCardType('Visa')} type="button" className="flex flex-col gap-5">
								<DebitCard
									active={cardType === 'Visa' ? true : false}
									title={'Visa'}
									type={'visa'}
									number={'4848234617839084'}
									name={'Emiliano Martens'}
								/>
							</button>

							<button onClick={() => setCardType('Master')} type="button" className="flex flex-col gap-5">
								<DebitCard
									active={cardType === 'Visa' ? false : true}
									title={'MaterCard'}
									type={'master'}
									number={'4848234617839084'}
									name={'Emiliano Martens'}
								/>
							</button>
						</div>

						<form onSubmit={formikCard.handleSubmit} className="space-y-8 w-full">
							<div className="space-y-2">
								<p>Pay using {cardType} Debit Card </p>
								{cardType === 'Visa' ? (
									<img className="w-12" src={VisaLogo} alt="/" />
								) : (
									<img className="w-12" src={Mastercard} alt="/" />
								)}
							</div>

							<div className="flex flex-col">
								<label htmlFor="debit_card" className="mb-[-7px]">
									Debit card
								</label>
								<InputGroup
									name="debit_card"
									id="debit_card"
									type="number"
									autoComplete="off"
									className={'customCardInput'}
									value={formikCard.values.debit_card}
									onChange={formikCard.handleChange}
									onBlur={formikCard.handleBlur}
									errorMsg={
										formikCard.touched.debit_card && formikCard.errors.debit_card
											? formikCard.errors.debit_card
											: null
									}
								/>
							</div>

							<div className="flex flex-col">
								<label htmlFor="name" className="mb-[-7px]">
									Name
								</label>
								<InputGroup
									name="name"
									id="name"
									type="text"
									autoComplete="off"
									className={'customCardInput'}
									value={formikCard.values.name}
									onChange={formikCard.handleChange}
									onBlur={formikCard.handleBlur}
									errorMsg={
										formikCard.touched.name && formikCard.errors.name ? formikCard.errors.name : null
									}
								/>
							</div>

							<div className="flex justify-between max-sm:flex-col max-sm:gap-8">
								<div className="flex flex-col">
									<label htmlFor="expiration_date" className="mb-[-7px]">
										Expiration date
									</label>
									<InputGroup
										name="expiration_date"
										id="expiration_date"
										type="date"
										autoComplete="off"
										className={'customCardInput'}
										value={formikCard.values.expiration_date}
										onChange={formikCard.handleChange}
										onBlur={formikCard.handleBlur}
										errorMsg={
											formikCard.touched.expiration_date && formikCard.errors.expiration_date
												? formikCard.errors.expiration_date
												: null
										}
									/>
								</div>
								<div className="flex flex-col">
									<label htmlFor="cvv" className="mb-[-7px]">
										CVV
									</label>
									<InputGroup
										name="cvv"
										id="cvv"
										type="password"
										className={'customCardInput'}
										value={formikCard.values.cvv}
										onChange={formikCard.handleChange}
										onBlur={formikCard.handleBlur}
										errorMsg={formikCard.touched.cvv && formikCard.errors.cvv ? formikCard.errors.cvv : null}
									/>
								</div>
							</div>

							<div className="flex justify-between">
								<label className="flex items-center gap-3">
									<input type="checkbox" />
									Save Card
								</label>
								<Button variant={'primary'} size={'small'} className={'rounded-lg px-12!'}>
									Pay
								</Button>
							</div>

							<div className="bg-secondary p-6 text-center rounded-lg">
								Would you like to save your card for faster checkout in future transactions? <br /> Your
								information will be securely stored for your convenience.
							</div>
						</form>
					</div>
				)}

				{/* bank transfer option ui */}
				{paymentOption === 'transfer' && (
					<div className="my-[2.5rem] space-y-3 ">
						<BankTransfer />

						<div className="flex items-center justify-center gap-2 pt-20">
							<img src={Padlock} alt="/" className="w-4" />
							<p>
								Secured by <b>Paystack</b>
							</p>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default PaymentOption;

const DebitCard = ({ title, type, number, name, active }) => {
	return (
		<div
			className={`${
				type === 'master'
					? ' max-lg:max-w-[195px] max-lg:h-[100px] max-lg:p-2 w-[320px] h-[160px]  flex flex-col justify-between p-4 rounded-lg text-white bg-gray-500'
					: ' max-lg:max-w-[195px] max-lg:h-[100px] max-lg:p-2 w-[320px] h-[160px] border  flex flex-col justify-between p-4 rounded-lg '
			} ${active && 'outline outline-4 outline-secondary'}`}
		>
			<div className="flex justify-between items-center">
				{title && <h4 className="italic max-lg:!text-sm">{title}</h4>}{' '}
				<HiOutlineSignal className="ml-auto max-lg:text-sm text-lg" />
			</div>

			<div className="">
				<p className="lg:p-lg text-start font-semibold max-lg:text-xs">{formatCardNumber(number, 4)}</p>
				<div className="flex items-center justify-between">
					<div className="uppercase ">
						<p className=" flex items-center justify-end gap-1">
							<span className="font-light text-xs leading-[0.75rem]">
								Valid <br className="hidden lg:block" />
								Thru
							</span>
							<span className="text-lg leading-[1.5rem] max-lg:text-xs font-semibold">xx/xx</span>
						</p>
						<p className="lg:text-lg text-xs whitespace-nowrap lg:leading-[1.5rem] font-semibold">
							{name}
						</p>
					</div>
					{type === 'visa' ? (
						<img src={VisaLogo} alt="/" className="lg:w-16 w-6" />
					) : (
						<img src={MastercardLogo} alt="/" className="lg:w-16 w-6" />
					)}
				</div>
			</div>
		</div>
	);
};

const BankTransfer = () => {
	return (
		<div className="relative bg-[#D9D9D9] h-[42rem]">
			<h4 className="uppercase font-semibbold pt-10 px-6">Bank transfer</h4>
			<div className="absolute top-4 left-[30%] bg-white  h-full border border-black w-[72%] p-4">
				<div className="flex items-center justify-between">
					<img src={BoonfuLogo} alt="/" />

					<div>
						<p>2563563iutgj3767889.....</p>
						<p>Pay NGN 20,000.00</p>
					</div>
				</div>
				<p className="text-center my-4">Transfer NGN 20,000.00 to Paystack Checkout</p>

				<div className="bg-[#D9D9D9] p-4 rounded-lg space-y-8">
					<div>
						<p className="uppercase">Bank name</p>
						<p>Paystack Checkout</p>
					</div>

					<div>
						<p className="uppercase">Account number</p>
						<div className="flex justify-between items-center">
							<p>25635633767889</p>
							<img src={CopyBlack} alt="/" className="w-4" />
						</div>
					</div>

					<div>
						<p className="uppercase">Amount</p>
						<div className="flex justify-between items-center">
							<p>NGN 20,000.00</p>
							{/* <img src={CopyBlack} alt="/" className="w-4" /> */}
						</div>
					</div>
				</div>

				<div className="flex flex-col items-center text-center space-y-4 ">
					<p className="mt-4">Use this account for this transaction ONLY</p>
					<img src={LoadingYellow} alt="/" className="w-16" />
					<p>
						Expires in <span className="text-secondary">10:23</span>
					</p>

					<Button variant={'subtle'} size={'full'} className={'my-6'}>
						I have sent this money
					</Button>
				</div>
			</div>
		</div>
	);
};
