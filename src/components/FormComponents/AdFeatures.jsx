import { InfoYellow, Naira } from '../../assets/svgs';
import { Field } from 'formik';
import { Button, InputGroup, Modal } from '../../ui';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { inspectableCategories } from '../../constants/Category';
import { getCommission, toMoney } from '../../utils';

const AdFeatures = (props) => {
	const { name, price, subCat, address, setAddress, categoryId, feature, ...rest } = props;

	const { hash, pathname } = useLocation();
	const [showGrab, setShowGrab] = useState(pathname.startsWith('/update-ad') ?? false);
	const [grabModal, setGrabModal] = useState(false);
	const [showCalc, setShowCalc] = useState(false);

	const { boonfuCommission } = getCommission(price, subCat);

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

	const otherFeature = false;

	return (
		<div
			id="post-package"
			className={`scroll-mt-[100px] bg-white  ${
				showGrab && !showCalc
					? 'mb-32 transition-all'
					: showGrab && showCalc
						? 'mb-48 transition-all'
						: ''
			}`}
		>
			{/* other posting package */}
			<div className="relative">
				<div className="overflow-auto px-3 py-8 ">
					{otherFeature && (
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
														<div className="flex items-center "></div>
													</td>
												</tr>
											);
										});
									}}
								</Field>
							</tbody>
						</table>
					)}

					{/* grab feature */}
					<div
						className={`${' transform translate-x-[-1.2%] transition-all duration-500 opacity-100'} sm:space-y-6 space-y-6 sm:p-8 p-4 absolute top-0 max-sm:left-1 bg-white z-10 w-full `}
					>
						{showGrab && (
							<>
								<div className="space-y-3">
									<div className="flex items-center gap-2 ">
										<h4 className="text-primary ">Use “Grab Feature” ? </h4>

										<button type="button" onClick={() => setGrabModal(true)}>
											<img tabIndex={0} src={InfoYellow} className="w-4 cursor-pointer" alt="info" />
										</button>
									</div>

									<div className="flex max-sm:flex-col md:items-center sm:gap-6 gap-2 ">
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
																	option.value === '3'
																		? () => {
																				setGrabModal(true);
																				setShowCalc(true);
																			}
																		: () => {
																				setGrabModal(false);
																				setShowCalc(false);
																			}
																}
															/>
															<label htmlFor={option.value}>{option.key}</label>

															{option.value === '3' && (
																<Modal
																	isOpen={grabModal}
																	setIsOpen={setGrabModal}
																	padding={false}
																	className={'bg-secondary max-w-[720px] px-4'}
																	modalHeader={false}
																>
																	<div className=" text-black space-y-3">
																		<h3>Grab Feature</h3>

																		{inspectableCategories.includes(parseInt(subCat)) ? (
																			<ol>
																				<div>
																					<span className="flex items-center gap-1">
																						💰{' '}
																						<li className="list-decimal ml-4 font-semibold !text-base">How It Works</li>
																					</span>
																					<p className="ml-10">
																						To use the Grab Feature, you need to fund your wallet with 1% of your Item’s
																						price. Example: If your item costs ₦10,000,000, you’ll deposit ₦100,000. This
																						1% serves as the Grab Feature commission.
																					</p>
																				</div>
																				<div>
																					<span className="flex items-center gap-1">
																						📅 <li className="list-decimal ml-4 font-semibold !text-base">Duration</li>
																					</span>
																					<p className="ml-10">
																						Your advert will be aggressively promoted by our Grabbers for 1 month.
																					</p>
																				</div>
																				<div>
																					<span className="flex items-center gap-1">
																						💵{' '}
																						<li className="list-decimal ml-4 font-semibold !text-base">
																							If the Item Doesn’t Sell
																						</li>
																					</span>
																					<div className="ml-10">
																						If:
																						<ul className="ml-6">
																							<li className="list-disc"> Our Grabbers don’t sell your item, or </li>
																							<li className="list-disc">You sell it outside this platform, </li>
																						</ul>
																						you’ll get 90% of your deposit back, while 10% is charged as administrative
																						fee.
																					</div>
																				</div>
																				<div>
																					<span className="flex items-center gap-1">
																						🎉{' '}
																						<li className="list-decimal ml-4 font-semibold !text-base">
																							If the Item Is Sold by a Grabber
																						</li>
																					</span>
																					<p className="ml-10">
																						If a Grabber sells your item, your 1% deposit becomes the sales commission.
																						(No refund applies in this case.)
																					</p>
																				</div>
																				<div>
																					<span className="flex items-center gap-1">
																						🚫
																						<li className="list-decimal ml-4 font-semibold !text-base">
																							If You Cancel Your Advert
																						</li>
																					</span>
																					<p className="ml-10">
																						If you choose to cancel or close your advert, this can ONLY be done in the
																						first week of posting the advert, 5% of your deposit will be charged as
																						administrative fee, and the balance will be made available as “withdrawable”
																					</p>
																				</div>
																				<div>
																					<span className="flex items-center gap-1">
																						🔒
																						<li className="list-decimal ml-4 font-semibold !text-base">
																							Withdrawing Funds
																						</li>
																					</span>
																					<p className="ml-10">
																						You can’t request a withdrawal while your advert is still active. Please close
																						the advert first, then place your withdrawal request
																					</p>
																				</div>
																			</ol>
																		) : (
																			<ol>
																				<div>
																					<li className="list-decimal ml-4 font-semibold !text-base">
																						Grab Listing Fee
																					</li>
																					<p className="ml-4">
																						The required Grab Listing Fee will be automatically deducted from your Boonfu
																						Wallet Balance. You must fund your wallet with the required amount before you
																						can publish an advert using the Grab Feature.
																					</p>
																				</div>
																				<div>
																					<li className="list-decimal ml-4 font-semibold !text-base">
																						Marketing & Promotion Duration
																					</li>
																					<p className="ml-4">
																						Items listed with the Grab Feature receive intensive marketing and promotion
																						both within and outside the Boonfu platform.This premium promotion runs for a
																						period of one (1) month.
																					</p>
																				</div>
																				<div>
																					<li className="list-decimal ml-4 font-semibold !text-base">
																						If the Item Does Not Sell Within 1 Month
																					</li>
																					<p className="ml-4">
																						If your item is not sold within the 1-month Grab period, you have two options:
																					</p>
																					<ol className="ml-4">
																						<div>
																							<li className="list-decimal ml-4 font-semibold">
																								Downgrade to Basic Listing
																							</li>
																							<p className="ml-4">
																								You can switch the advert from Grab to a standard Basic Listing while
																								maintaining the original price of item for another one month.
																							</p>
																						</div>
																						<div>
																							<li className="list-decimal ml-4 font-semibold">
																								Review the Price for Another 1 Months
																							</li>
																							<p className="ml-4">
																								IF you adjust (reduce) the item’s price by at least 10%, it qualifies for an
																								additional one (1) month promotion with Grab feature.
																							</p>
																						</div>
																					</ol>
																				</div>
																			</ol>
																		)}

																		{!inspectableCategories.includes(parseInt(subCat)) && (
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
																		)}
																	</div>
																</Modal>
															)}
														</div>
													);
												});
											}}
										</Field>
									</div>
								</div>

								{showCalc && (
									<div className="flex items-center flex-wrap sm:gap-16 gap-8">
										<div className="">
											<h6 className="font-semibold">Price of item :</h6>
											<div className="border border-black flex items-center gap-2 max-w-[22rem] ">
												<span className="flex items-center gap-1  p-2 w-full font-bold text-base">
													<img src={Naira} alt="/" />
													{price ? toMoney(price) : '00'}
												</span>
											</div>
										</div>

										<div className="">
											<h6 className="font-semibold ">Grab listing fee</h6>
											<div className=" flex items-center gap-2 max-w-[22rem] ">
												<span className="flex items-center gap-1 border-2 border-primary p-2 w-full font-bold text-base">
													<img src={Naira} alt="Naira symbol" />
													{boonfuCommission && toMoney(boonfuCommission)}
												</span>
											</div>
										</div>
									</div>
								)}
							</>
						)}

						<div className={'flex justify-center w-full  px-8'}>
							<Button
								type="button"
								variant={'primary'}
								className="bg-red-600 text-white text-center font-semibold"
								onClick={() => setShowGrab(!showGrab)}
							>
								{showGrab ? 'Back' : 'Need to sell Urgently?'}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdFeatures;

const featureList = [
	{
		key: 'Basic',
		value: '0',
		color: 'bg-secondary text-black',
		info: 'Basic posting package.',
	},
	{
		key: 'Feature Ad',
		value: '1',
		color: 'bg-primary text-white',
		info: 'Each category listing features yours on TOP.',
	},
	{
		key: 'Spotlight',
		value: '2',
		color: 'bg-green-600 text-white',
		info: ' Your AD is  placed on Boonfu homepage + Priority given.',
	},
];
const grabOptions = [
	{ key: 'Yes', value: '3' },
	{ key: 'No', value: '0' },
];
