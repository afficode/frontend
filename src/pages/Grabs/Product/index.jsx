import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TbCurrencyNaira } from 'react-icons/tb';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { CarBlack, noimage } from '../../../assets/images';
// import { Carousel } from 'flowbite-react';
import { FaCamera } from 'react-icons/fa';
import useAuth from '../../../context/UserContext';
import ChatForm from '../../Products/View/ChatForm';
// import ViewProduct from '../../../components/Skeleton/ViewProduct';
// import {
// 	numberWithCommas,
// 	decodeProductId,
// 	convertKeyToName,
// } from '../../../utils/dataManipulations';
// import { toast } from 'react-toastify';
import OverviewPills from '../../Products/View/OverviewPills';
// import { formatDistance } from 'date-fns';
import { ScrollToTop } from '../../../utils';
import GrabHeader from '../GrabHeader';
import { Approutes } from '../../../constants';
import { Button } from '../../../ui';
// import { HiInformationCircle } from 'react-icons/hi';
// import ContactAdmin from './ContactAdmin';
// import { Alert } from 'flowbite-react';
// import SaveProduct from '../Default/SaveProduct';
// import { getSaves } from '../../../hooks/useSaves';
// import { NegotiableIcon } from '../../../ui';
// import { useNotify } from '../../../hooks';

const GrabProduct = () => {
	const { id } = useParams();
	const [items, setItems] = useState(null);
	const [revealNumber, setRevealNumber] = useState(false);
	const [revealEmail, setRevealEmail] = useState(false);
	const { isLogin, user } = useAuth();
	// const { data: result, isLoading } = fetchProduct(decodeProductId(id));
	// const { data, isLoading: saveLoading } = getSaves();
	// useEffect(() => {
	// 	if (result?.data) {
	// 		setItems(() => [
	// 			{ name: 'Home', link: Approutes.home },
	// 			{ name: 'Products', link: Approutes.product.initial },
	// 			{ name: result?.data?.title },
	// 		]);
	// 	}
	// }, [isLoading, saveLoading]);

	// isLoading ? (
	// 	<ViewProduct />
	// )
	return (
		<section className="w-full p-4 lg:p-8">
			{/* {result?.data.active === '0' && user.id === result?.data.owner && (
				<div className="w-[90%] lg:w-[70%] my-3 mx-auto">
					<Alert additionalContent={<ContactAdmin />} color="warning" icon={HiInformationCircle}>
						<span className="font-medium text-red-600">Ad Blocked: </span>{' '}
						<span className="underline"> Change a few things up and try submitting again.</span>
					</Alert>
				</div>
			)} */}

			<GrabHeader size="h2" text="Grabbed Item preview" />
			<div className="flex flex-col w-full gap-2 mt-6 md:flex-row md:gap-8 line-clamp-1">
				<div className="w-full md:w-[60%] xl:w-[70%] flex flex-col">
					<div className="w-full p-3 space-y-3 text-center text-white bg-red-500 whitespace-nowrap">
						<h4>Commission : #200,000.00</h4>
					</div>
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
					<div className="w-full mx-auto mt-1">
						<div className="relative rounded-none ">
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
							<img src={CarBlack} alt="no image" className="w-full rounded-sm" />

							<div className="absolute bottom-0 flex w-full h-10 py-2 pl-6 text-white rounded-none bg-black/50">
								<span className="flex px-2 my-auto border-2 border-white">
									<FaCamera className="mt-1 text-sm" />
									&nbsp; &nbsp; <span className="my-auto text-sm"> 4</span>
								</span>
							</div>
						</div>
					</div>
				</div>

				<aside className="w-full md:w-[40%] xl:w-[30%] border-2 border-gray-400 p-2 lg:p-4">
					<h2 className="w-full text-lg font-bold md:text-xl 2xl:text-3xl">Lawal</h2>
					<div className="flex items-center justify-between">
						<p className="text-lg">
							Since{' '}
							{/* {formatDistance(new Date(new Date(`${result.data?.joined_on}`)), Date.now(), {
							includeSeconds: true,
							addSuffix: true,
						})} */}
							2 years ago
						</p>

						<Link to={Approutes.grab.products} className="text-primary hover:underline">
							See more
						</Link>
					</div>

					<hr className="h-px my-2 bg-gray-700 border-black border-1" />

					<div className="w-full text-lg tracking-tighter lg:text-xl">
						<p className="w-full">Contact Lawal </p>
						{/* {result?.data?.contact_type.includes('phone') && ( */}
						<div className="flex items-center justify-between">
							<p className="my-2 text-xl lg:text-2xl ">
								<span className="text-xl font-bold">{revealNumber ? '09123456789' : `0912XXXXXXXX`}</span>
							</p>

							<button
								className="font-bold text-black bg-white rounded-none btn btn-sm hover:bg-primary hover:text-white hover:border-0 hover:rounded-sm "
								onClick={() => {
									// if (isLogin && result?.data?.contact_type.includes('phone')) {
									setRevealNumber(!revealNumber);
									// } else {
									// 	toast.warn('Please login to reveal phone number');
									// }
								}}
							>
								{!revealNumber ? (
									<span className="flex items-center justify-center">
										<IoEye /> &nbsp; Reveal{' '}
									</span>
								) : (
									<span className="flex items-center justify-center">
										<IoEyeOff /> &nbsp; Hide
									</span>
								)}
							</button>
						</div>
						{/* )} */}
						{/* {result?.data?.contact_type.includes('email') && (
							<div className="flex items-center justify-between w-full">
								<p
									className={`my-2 w-full overflow-x-scroll ${revealEmail ? 'tooltip tooltip-primary' : ''}`}
									data-tip={revealEmail ? result.data?.email : ''}
								>
									<span className="pr-1 text-xl font-bold">
										{revealEmail && result.data?.email !== null
											? result.data?.email
											: `${result?.data?.email.substring(0, 3)}XXXXXXXX`}
									</span>
								</p>

								<button
									className="font-bold text-black bg-white rounded-none btn btn-sm hover:bg-primary hover:text-white hover:border-0 hover:rounded-sm "
									onClick={() => {
										isLogin && result?.data?.contact_type.includes('email')
											? setRevealEmail(!revealEmail)
											: toast.warn('Please login to reveal Ads owner email');
									}}
								>
									{!revealEmail ? (
										<span className="flex items-center justify-center">
											<IoEye /> &nbsp; Reveal{' '}
										</span>
									) : (
										<span className="flex items-center justify-center">
											<IoEyeOff /> &nbsp; Hide
										</span>
									)}
								</button>
							</div>
						)} */}
					</div>
					{/* ad_id={result?.data?.id} owner={result?.data?.owner} active={result?.data?.active} */}
					<ChatForm />
				</aside>
			</div>

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

			<div className="flex gap-6 my-8">
				<Link to={Approutes.grab.flyer} className="flex-1">
					<Button className={'bg-[#047F73] text-white px-8 w-full h-full font-semibold text-xl'}>
						Generate Post Now
					</Button>
				</Link>
				<Link to={Approutes.grab.products} className="flex-1">
					<Button variant={'grey'} className={' w-full h-full font-semibold text-xl'}>
						Close
					</Button>
				</Link>
			</div>

			<ScrollToTop />
		</section>
	);
};

export default GrabProduct;

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
