import { Coin } from '../../assets/images';
import { InfoYellow } from '../../assets/svgs';
import { Field } from 'formik';
import { Button } from '../../ui';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const AdFeatures = (props) => {
	const { name, ...rest } = props;
	const [showGrab, setShowGrab] = useState(false);
	const { hash } = useLocation();

	useEffect(() => {
		if (hash) {
			const element = document.querySelector(hash);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}
	}, [hash]);

	return (
		<div id="post-package" className="scroll-mt-[100px] bg-white py-8 my-4">
			<div className="flex flex-col items-center py-2">
				<h3 className="text-center">Select Suitable Posting package for your ad.</h3>
				<h6>
					( You have to select <b>ONLY ONE</b> option )
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
									// console.log(field);
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
						className={`${
							showGrab
								? ' transform translate-x-[-1.2%] transition-all duration-500 opacity-100'
								: ' transform translate-x-[150%] transition-all duration-500 opacity-0'
						} space-y-6 p-8 absolute top-0 bg-white z-10 w-full `}
					>
						<div className="space-y-2">
							<div className="flex items-center gap-2 ">
								<h4 className="text-primary ">Use “Grab Feature” ? </h4>

								<div className="dropdown dropdown-top z-50 ">
									<img tabIndex={0} src={InfoYellow} className="w-4 cursor-pointer" alt="/" />
									<div
										tabIndex={0}
										className="dropdown-content transform translate-y-[100%] translate-x-[-80%] sm:translate-x-[-50%] lg:translate-x-[8%] bg-secondary border-4 p-4 w-screen max-w-[320px] sm:max-w-[600px]"
									>
										<div className="space-y-2">
											<h4>Grab Feature</h4>
											<p>
												This is Boonfu’s affiliate marketing system whereby our “Grabbers” pick your
												item/product for massive offline and other channels marketing.
											</p>
											<p>
												{' '}
												Your Item with “Grab feature” is open to about a thousand (1000+) grabbers to market for
												you, this means your item won’t be seating on our website BUT rather gains massive reach
												to guarantee <b>“Almost Instant Sale”</b>.
											</p>
											<p>You may want to try this feature out too.</p>
										</div>
									</div>
								</div>
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
													/>
													<label htmlFor={option.value}>{option.key}</label>
												</div>
											);
										});
									}}
								</Field>

								{/* <div className=" bg-secondary border-4 p-4 ">
									Using the grab feature? Please read the terms and condition
								</div> */}

								<div className="dropdown dropdown-top ">
									<Button
										type="button"
										variant="secondary"
										className={'max-w-[22rem] md:ml-[12rem] shadow-xl shadow-blue-100 max-sm:!px-4'}
									>
										Using the grab feature? Please read the terms and condition
									</Button>
									<div
										tabIndex={0}
										className="dropdown-content transform translate-y-[100%] translate-x-[-10%] sm:translate-x-[-50%] lg:translate-x-[8%] bg-secondary border-4 p-4 w-screen max-w-[320px] sm:max-w-[600px]"
									>
										<div className="space-y-2">
											<h4>Grab Feature</h4>
											<p>
												This is Boonfu’s affiliate marketing system whereby our “Grabbers” pick your
												item/product for massive offline and other channels marketing.
											</p>
											<p>
												{' '}
												Your Item with “Grab feature” is open to about a thousand (1000+) grabbers to market for
												you, this means your item won’t be seating on our website BUT rather gains massive reach
												to guarantee <b>“Almost Instant Sale”</b>.
											</p>
											<p>You may want to try this feature out too.</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="">
							<h6 className="font-semibold">Grabber’s commission. (in coin)</h6>
							<div className="bg-gray-300 p-2 border border-black max-w-[15rem]">
								<span className="flex items-center space-x-2">
									<img src={Coin} alt="/" className="w-[1.8rem] mx-2" />{' '}
									<span className="text-xl font-semibold text-[#333]">10</span>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex justify-center w-full mt-[8rem] sm:mt-[6rem]">
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
	);
};

export default AdFeatures;

const featureList = [
	{
		key: 'Basic',
		value: '0',
		coin: '2.5',
		color: 'bg-secondary text-black',
		info: 'Basic posting package.',
	},
	{
		key: 'Feature Ad',
		value: '1',
		coin: '4.5',
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
