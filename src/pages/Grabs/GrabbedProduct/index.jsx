import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TbCurrencyNaira } from 'react-icons/tb';
import { IoCopy, IoCopyOutline } from 'react-icons/io5';
import { CarBlack } from '../../../assets/images';
// import { Carousel } from 'flowbite-react';
import { FaCamera } from 'react-icons/fa';
import OverviewPills from '../../Products/View/OverviewPills';
import { ScrollToTop } from '../../../utils';
import { Button } from '../../../ui';
import { BankTransfer, Paypal, Visa } from '../../../assets/svgs';
import { FormControl } from '../../../components';
import { Form, Formik } from 'formik';

const GrabbedProduct = () => {
	return (
		<section className="w-full p-4 lg:p-8">
			<div className="flex flex-col gap-4 p-4 rounded-xl bg-primary">
				<h4 className="text-white">Welcome to: 5-BEDROOM DUPLEX, LAGOS - Page</h4>
				<h5 className="flex justify-center p-2 bg-white">
					You were directed here by: <span className="px-2 text-primary"> BF1346</span>{' '}
				</h5>
			</div>

			<div className="flex flex-col w-full h-full gap-2 mt-6 md:flex-row md:gap-8 line-clamp-1">
				<div className="w-full md:w-[60%]  xl:w-[70%] flex flex-col">
					<div className="w-full my-2 ml-2">
						<div className="flex items-center justify-between w-full my-2 font-bold uppercase ">
							<h3 className="">2021 Toyota Camry, BLACK </h3>
						</div>

						<div className="flex items-center justify-between">
							<p className="w-full">
								<Link
									// to={`/products/search?lga=${result.data?.lga_id}`}
									className="text-primary hover:underline"
								>
									{/* {result.data?.location.split(',')[0]} */}
									Ojodu Berger
								</Link>{' '}
								|{' '}
								<Link
									// to={`/products/search?state_id=${result.data?.state_id}`}
									className="text-primary hover:underline"
								>
									{/*{result.data?.location.split(',')[1]} */}
									Lagos State.
								</Link>
							</p>
							<p className="flex items-center justify-end w-full pr-2 font-bold">
								<TbCurrencyNaira className="font-bold text-black" />
								{/*								{numberWithCommas(result.data?.price)}
								 */}
								26,000,000
							</p>
						</div>
					</div>{' '}
					<div className="relative rounded-none w-full xl:h-[550px] mt-1">
						{/*{result.data?.images.length > 0 ? (
								<Carousel className="h-[250px] md:h-[650px] rounded-none">
									{result.data?.images.map((img, index) => (
										<img
											src={img.path}
											alt={img.filename}
											key={index * 3}
											className="rounded-t-sm rounded-b-none "
										/>
									))}
								</Carousel>
                           ) : (*/}
						<img src={CarBlack} alt="no image" className="object-cover w-full h-full " />

						<div className="absolute bottom-0 flex w-full h-10 py-2 pl-6 text-white rounded-none bg-black/50">
							<span className="flex px-2 my-auto border-2 border-white">
								<FaCamera className="mt-1 text-sm" />
								&nbsp; &nbsp; <span className="my-auto text-sm"> 4</span>
							</span>
						</div>
					</div>
				</div>

				<aside className="w-full h-[550px] md:w-[40%] xl:w-[30%] border-2 border-gray-400 p-2 lg:p-4 flex flex-col justify-between">
					<p className="pb-2 border-b border-black/40 border-1">
						NOTE:{' '}
						<span className="italic text-primary">
							This Item does not deliver outside of seller’s state.
						</span>
					</p>
					{/* <hr className="h-px my-2 border-black/40 border-1" /> */}
					<div className="pb-4 space-y-4 border-b border-black/40 border-1">
						<div className="p-3 font-semibold text-center bg-gray-300 rounded-lg">
							Ready to Buy Item Now?
						</div>

						<div>
							<p className="font-semibold">Select delivery option:</p>

							<Formik initialValues={{ delivery_option: ' ' }}>
								{(formik) => {
									return (
										<Form>
											<FormControl
												control="checkbox"
												// label="Delivery Option"
												name="delivery_option"
												options={[
													{ key: 'Pickup', value: 'pickup' },
													{ key: 'Delivery', value: 'delivery' },
												]}
											/>
										</Form>
									);
								}}
							</Formik>
						</div>
						<Button
							variant={'primary'}
							size={'full'}
							className={'flex items-center justify-center gap-4 rounded-3xl'}
						>
							Place Order
						</Button>
					</div>

					<div className="">
						<h6 className="my-2 font-bold ">Buy with confidence</h6>
						<p className="pb-2">
							Payments made on Boonfu.com is secured with strict SSL encryption and data protection
							protocols
						</p>
						<div className="flex items-center pt-1 border-t border-black/40 border-1">
							Payments:{' '}
							<span className="flex items-center gap-3">
								{' '}
								<img src={Visa} alt="/" />
								<img src={Paypal} alt="/" />
								<img src={BankTransfer} alt="/" />
							</span>
						</div>
					</div>
				</aside>
				{/* <aside className="w-full h-[550px] md:w-[40%] xl:w-[30%] border-2 border-gray-400 p-2 lg:p-4 flex flex-col justify-between">
					<div className="flex flex-col gap-4">
						<Button
							variant={'secondary'}
							size={'full'}
							className={'flex items-center justify-center gap-4 rounded-xl font-semibold'}
						>
							Seller’s contact
							<img src={Info} alt="/" className="w-4" />
						</Button>
						<Button
							variant={'primary'}
							size={'full'}
							className={'flex items-center justify-center gap-4 rounded-xl'}
						>
							Schedule inspection
						</Button>
						<div className="flex items-center justify-between p-3 border rounded-xl border-primary">
							<h6 className="font-semibold">Inspection reports</h6>
							<Link>
								<span className="flex items-center gap-2 underline text-primary">
									see <img src={SingleArrowRight} className="w-[0.5rem]" alt="/" />
								</span>
							</Link>
						</div>
					</div>

					<div>
						<h6 className="my-2 font-bold text-center">Keeping Safe</h6>
						<ol className="list-[lower-roman] pl-4">
							<li> Carryout inspection by yourself and ensure to go along with a technician</li>
							<li> Thoroughly check all documents and verify authenticity before payment</li>
							<li> Do not inspect/pay in a public place, office or seller’s home is advised!.</li>
							<li> Do not commit funds in advance for vehicle you have not inspected.</li>
						</ol>
					</div>
				</aside> */}
			</div>

			{/* description and overview */}
			<div className="flex flex-col p-2 my-2 bg-gray-200 xl:p-6 xl:my-4">
				<div className="flex flex-col items-start justify-start w-full gap-2 tracking-tighter lg:tracking-normal line-clamp-1">
					<h2 className="text-xl xl:2xl">Description</h2>

					<p className="bg-white p-4 min-h-[100px] w-full text-justify text-lg border-t-4 border-t-primary whitespace-pre-line">
						{/* {result?.data?.description} */}
						This car is in perfect condition with all elements of it intact. Going for the best price you
						can find on the market.
					</p>
				</div>

				<div className="flex flex-col items-start justify-start w-full gap-2 my-2">
					<h2 className="text-xl tracking-tighter lg:tracking-normal">Overview</h2>

					<div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{/* {convertKeyToName(result?.data).map((val, index) => ( */}
						{/* overview={val} ad={result?.data} key={index} */}

						{/* ))} */}
						{overview.map((val, index) => (
							<OverviewPills overview={val} key={index} />
						))}
					</div>
				</div>
			</div>

			<ScrollToTop />
		</section>
	);
};

export default GrabbedProduct;

const overview = [
	{
		name: 'condition',
		value: ['nigerian used'],
	},
	{
		name: 'year',
		value: ['2021'],
	},
	{
		name: 'mileage',
		value: ['107,000'],
	},
	{
		name: 'transmission',
		value: ['automatic'],
	},
	{
		name: 'doors',
		value: ['4'],
	},
	{
		name: 'fuel',
		value: ['petrol'],
	},
	{
		name: 'seats',
		value: ['5'],
	},
	{
		name: 'model',
		value: ['camry'],
	},
	{
		name: 'body type',
		value: ['sedan'],
	},
	{
		name: 'make',
		value: ['toyota'],
	},
	{
		name: 'engine size',
		value: ['1.8L'],
	},
];
