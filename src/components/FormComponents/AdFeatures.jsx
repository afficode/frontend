import { Coin } from '../../assets/images';
import { InfoYellow, Naira } from '../../assets/svgs';
import { Field } from 'formik';
import { Button, InputGroup, Modal } from '../../ui';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
	grabbableCategories,
	inspectableCategories,
	pickupCategories,
} from '../../constants/Category';
import { getCommission, toMoney } from '../../utils';

const AdFeatures = (props) => {
	const { name, price, subCat, address, setAddress, categoryId, feature, ...rest } = props;

	const [showGrab, setShowGrab] = useState(feature === '3' ? true : false);
	const { hash } = useLocation();
	const [grabModal, setGrabModal] = useState(false);

	const { boonfuCommission } = getCommission(price);

	useEffect(() => {
		if (hash) {
			const element = document.querySelector(hash);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}
	}, [hash]);

	const handleAddressChange = (e) => {
		setAddress(e.target.value);
	};

	return (
		<div id="post-package" className="scroll-mt-[100px] bg-white py-8 my-4">
			<div className="flex flex-col items-center py-2 text-center">
				<h3 className="text-center">Select Suitable Posting package for your ad.</h3>
				<h6>
					( You have to select <b>ONLY ONE</b> option. <b>NOTE: These packages keep your ads for 2weeks, after
						which the site notifies you of renewal  or delete IF item is sold.</b> )
				</h6>
			</div>
			<hr className="border-black" />

			{/* other posting package */}
			<div className="relative">
				<div className="overflow-auto px-3 py-8 ">
					<table className="table-fixed border-collapse border-spacing-0 min-w-[600px] w-full posting-package-table">
						<tbody>
							{/* {featureList?.map((option) => {
							return ( */}
							<Field name={name}>
								{({ field }) => {
									return featureList?.map((option) => {
										return (
											<tr key={option.value} className="flex">
												<td className="flex items-center gap-4">
													<input
														{...field}
														{...rest}
														type="radio"
														id={option.value}
														value={option.value}
														checked={field.value === option.value}
													/>
													<label
														htmlFor={option.value}
														className={`${option.color} uppercase flex justify-center w-[10rem] py-1`}
													>
														{option.key}
													</label>
												</td>
												<td className="flex-1">{option.info}</td>
												<td className="flex justify-end items-end">
													{/* onClick={() => setTokenModal(true)} */}
													<div className="flex items-center ">
														<img src={Coin} alt="/" className="w-[1.8rem] mx-2" />
														<b className="w-8">{option.coin}</b>
													</div>

													{/* <Modal isOpen={tokenModal} setIsOpen={setTokenModal}>
																<TokenPurchase />
															</Modal> */}
												</td>
											</tr>
										);
									});
								}}
							</Field>
							{/* // })} */}
						</tbody>
					</table>

					{/* grab feature */}
					<div
						className={`${showGrab
							? ' transform translate-x-[-1.2%] transition-all duration-500 opacity-100'
							: ' transform translate-x-[150%] transition-all duration-500 opacity-0'
							} space-y-6 p-8 absolute top-0 bg-white z-10 w-full `}
					>
						<div className="space-y-2">
							<div className="flex items-center gap-2 ">
								<h4 className="text-primary ">Use “Grab Feature” ? </h4>

								<button onClick={() => setGrabModal(true)}>
									<img tabIndex={0} src={InfoYellow} className="w-4 cursor-pointer" alt="/" />
								</button>
							</div>

							<div className="flex max-sm:flex-col md:items-center gap-6 ">
								<Field name={name}>
									{({ field }) => {
										return grabOptions.map((option) => {
											return (
												<div key={option.value} className="space-x-4 flex items-center">
													<input
														{...field}
														{...rest}
														type="radio"
														id={option.value}
														value={option.value}
														checked={option.value === field.value}
														className={``}
														onClick={
															option.value === '3' && !pickupCategories.includes(parseInt(subCat))
																? () => setGrabModal(true)
																: () => setGrabModal(false)
														}
													/>
													<label htmlFor={option.value}>{option.key}</label>

													{option.value === '3' && !pickupCategories.includes(parseInt(subCat)) && (
														<Modal
															isOpen={grabModal}
															setIsOpen={setGrabModal}
															padding={false}
															className={'bg-secondary max-w-fit px-4'}
															modalHeader={false}
														>
															<div className=" text-black space-y-3">
																<h3>Grab Feature</h3>

																<p>
																	The Grab Feature is a secure escrow system where the platform holds payment until
																	the buyer confirms satisfactory pick-up or delivery of the item. Sellers provide
																	the pick-up location in advance (belwo), ensuring transparency and efficiency. Once
																	the buyer approves the transaction, funds are released to the seller, offering
																	peace of mind for buyers and guaranteed payments for sellers. This feature builds
																	trust, streamlines transactions and enhances security for all parties involved.
																</p>

																<form autoComplete="off" className="flex flex-col space-y-2">
																	<label htmlFor="seller_address" className="flex flex-col space-y-1 font-medium">
																		<span className="flex items-center ">Address of item pick up</span>
																		<InputGroup
																			type="text"
																			name="address"
																			id="address"
																			autoComplete={'off'}
																			className={'w-full '}
																			required
																			value={address}
																			onChange={handleAddressChange}
																		/>
																	</label>
																	{/* <label htmlFor="seller_address" className="flex flex-col space-y-1 font-medium">
																	<span className="flex items-center ">City</span>
																	<InputGroup
																		type="text"
																		name="city"
																		id="city"
																		autoComplete={'off'}
																		className={'w-full '}
																		required
																		// value={quoteFormData.seller_address}
																		// onChange={handleQuoteFormChange}
																	/>
																</label> */}

																	<div className="w-full flex items-end justify-end pt-4">
																		<Button
																			variant={'primary'}
																			size={'small'}
																			type="button"
																			onClick={() => setGrabModal(false)}
																		>
																			Submit to continue
																		</Button>
																	</div>
																</form>
															</div>
														</Modal>
													)}
												</div>
											);
										});
									}}
								</Field>

								{/* <div className=" bg-secondary border-4 p-4 ">
									Using the grab feature? Please read the terms and condition
								</div> */}
							</div>
						</div>

						<div className="flex items-center flex-wrap gap-16">
							{!inspectableCategories.includes(parseInt(subCat)) && (
								<div className="">
									<h6 className="font-semibold">Price of item :</h6>
									<div className="border border-black flex items-center gap-2 max-w-[22rem] ">
										<span className="flex items-center gap-1  p-2 w-full font-bold text-xl">
											<img src={Naira} alt="/" />
											{price ? toMoney(price) : '00'}
										</span>
									</div>
								</div>
							)}

							{inspectableCategories.includes(parseInt(subCat)) ? (
								<div>
									<h6 className="font-semibold ">To pay: Fixed Commission:</h6>
									<div className=" flex items-center gap-2 max-w-[22rem] ">
										<span className="flex items-center gap-3 border border-black bg-[#D9D9D9] p-2 w-full font-bold text-xl">
											<img src={Coin} alt="/" className="w-8 h-8" />
											10
										</span>
									</div>
								</div>
							) : (
								<div className="">
									<h6 className="font-semibold ml-14">To pay: Grab Commission:</h6>
									<div className=" flex items-center gap-2 max-w-[22rem] ">
										<span className="flex items-center space-x-2 border-2 border-primary p-2 font-bold text-xl">
											%
										</span>
										<span className="flex items-center gap-1 border-2 border-primary p-2 w-full font-bold text-xl">
											<img src={Naira} alt="/" />
											{boonfuCommission && toMoney(boonfuCommission)}
										</span>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{grabbableCategories.includes(parseInt(categoryId)) && (
				<div
					className={
						showGrab
							? 'flex justify-between items-center w-full mt-[8rem] sm:mt-[6rem] px-8'
							: 'flex justify-center w-full mt-[8rem] sm:mt-[6rem] px-8'
					}
				>
					<Button
						type="button"
						variant={'primary'}
						className="bg-red-600 text-white text-center font-semibold"
						onClick={() => setShowGrab(!showGrab)}
					>
						{showGrab ? 'Back' : 'Need to sell Urgently?'}
					</Button>
					{/* {showGrab && (
						<Button
							type="button"
							variant={'primary'}
							className=" text-white text-center font-semibold"
							// onClick={() => setShowGrab(!showGrab)}
						>
							Pay to Continue
						</Button>
					)} */}
				</div>
			)}
		</div>
	);
};

export default AdFeatures;

const featureList = [
	{
		key: 'Basic',
		value: '0',
		coin: '3.5',
		color: 'bg-secondary text-black',
		info: 'Basic posting package.',
	},
	{
		key: 'Feature Ad',
		value: '1',
		coin: '5',
		color: 'bg-primary text-white',
		info: 'Each category listing features yours on TOP.',
	},
	{
		key: 'Spotlight',
		value: '2',
		coin: '7',
		color: 'bg-green-600 text-white',
		info: ' Your AD is  placed on Boonfu homepage + Priority given.',
	},
];
const grabOptions = [
	{ key: 'Yes', value: '3' },
	{ key: 'No', value: '-1' },
];
