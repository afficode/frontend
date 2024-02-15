import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Approutes } from '../../../constants';
import { fetchProduct } from '../../../hooks';
import Breadcrumb from '../../../components/Breadcrumb';
import { TbCurrencyNaira } from 'react-icons/tb';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { noimage } from '../../../assets/images';
import { Carousel } from 'flowbite-react';
import { FaCamera } from 'react-icons/fa';
import useAuth from '../../../context/UserContext';
import ChatForm from './ChatForm';
import ViewProduct from '../../../components/Skeleton/ViewProduct';
import {
	numberWithCommas,
	decodeProductId,
	convertKeyToName,
} from '../../../utils/dataManipulations';
import { toast } from 'react-toastify';
import OverviewPills from './OverviewPills';
import { formatDistance } from 'date-fns';
import { ScrollToTop } from '../../../utils';
import { HiInformationCircle } from 'react-icons/hi';
import ContactAdmin from './ContactAdmin';
import { Alert } from 'flowbite-react';
import SaveProduct from '../Default/SaveProduct';
import { getSaves } from '../../../hooks/useSaves';
import { FaHandshake, FaHandshakeSlash } from "react-icons/fa6";
import { GrabIcon, NegotiableIcon } from '../../../ui';

const index = () => {
	const { id } = useParams();
	const [items, setItems] = useState(null);
	const [revealNumber, setRevealNumber] = useState(false);
	const [revealEmail, setRevealEmail] = useState(false);
	const { isLogin, user } = useAuth();
	const { data: result, isLoading } = fetchProduct(decodeProductId(id));
	const { data, isLoading: saveLoading } = getSaves();

	useEffect(() => {
		if (result?.data) {
			setItems(() => [
				{ name: 'Home', link: Approutes.home },
				{ name: 'Products', link: Approutes.product.initial },
				{ name: result?.data?.title },
			]);
		}
	}, [isLoading, saveLoading]);

	return isLoading ? (
		<ViewProduct />
	) : (
		<section className="w-full p-2 lg:p-4">
			{result?.data.active === '0' && (
				<div className="w-[90%] lg:w-[70%] my-3 mx-auto">
					<Alert additionalContent={<ContactAdmin />} color="warning" icon={HiInformationCircle}>
						<span className="font-medium text-red-600">Ad Blocked: </span>{' '}
						<span className="underline"> Change a few things up and try submitting again.</span>
					</Alert>
				</div>
			)}
			<header className="w-full">
				<Breadcrumb items={items} className={'text-md breadcrumbs text-primary'} />
			</header>

			<section className="flex flex-col w-full gap-2 md:flex-row md:gap-8 line-clamp-1">
				<main className="w-full md:w-[60%] xl:w-[70%] flex flex-col">
					<div className="w-full my-2 ml-2">
						<div className="flex items-center justify-between w-full my-2 font-bold uppercase text-md md:text-2xl xl:text-3xl">
							<span className="">{result.data?.title}</span>
							<span className=" flex items-center gap-2 lg: gap-8 my-auto">
							<NegotiableIcon negotiable={result.data?.negotiable} />
                  
                  			
							{((isLogin && (parseInt(result.data?.owner) !== parseInt(user?.id))) || !isLogin) && 
								<>
									<GrabIcon className="text-green-400 cursor-pointer tooltip tooltip-success tooltip-bottom" data-tip="Grab Product" />
									<SaveProduct ads_id={decodeProductId(id)} />
								</>
								
							}
							</span>
						</div>

						<div className="flex items-center justify-between">
							<p className="w-full">
								<Link
									to={`/products/search?lga=${result.data?.lga_id}`}
									className="text-primary hover:underline"
								>
									{result.data?.location.split(',')[0]}
								</Link>{' '}
								|{' '}
								<Link
									to={`/products/search?state_id=${result.data?.state_id}`}
									className="text-primary hover:underline"
								>
									{result.data?.location.split(',')[1]}
								</Link>
							</p>
							<p className="flex items-center justify-end w-full pr-2 font-bold">
								<TbCurrencyNaira className="font-bold text-black" />
								{numberWithCommas(result.data?.price)}
							</p>
						</div>
					</div>{' '}
					<div className="w-full mx-auto mt-1">
						<div className="relative rounded-none ">
							{result.data?.images.length > 0 ? (
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
							) : (
								<img src={noimage} alt="no image" className="rounded-sm " />
							)}
							<div className="absolute bottom-0 flex w-full h-10 py-2 pl-6 text-white rounded-none bg-black/50">
								<span className="flex px-2 my-auto border-2 border-white">
									<FaCamera className="mt-1 text-sm" />
									&nbsp; &nbsp; <span className="my-auto text-sm"> {result.data?.images.length}</span>
								</span>
							</div>
						</div>
					</div>
				</main>
				<aside className="w-full md:w-[40%] xl:w-[30%] border-2 border-gray-400 p-2 lg:p-4">
					<h2 className="w-full text-lg font-bold md:text-xl 2xl:text-3xl">{result.data?.firstname}</h2>
					<p className="text-lg">
						Since{' '}
						{formatDistance(new Date(new Date(`${result.data?.joined_on}`)), Date.now(), {
							includeSeconds: true,
							addSuffix: true,
						})}
					</p>
					<hr className="h-px my-2 bg-gray-700 border-black border-1" />
					<div className="w-full text-lg tracking-tighter lg:text-xl">
						<p className="w-full">Contact {result.data?.firstname} </p>
						<div className="flex items-center justify-between">
							<p className="my-2 text-xl lg:text-2xl ">
								<span className="text-xl font-bold">
									{revealNumber ? result.data?.number : `${result.data?.number.substring(0, 3)}XXXXXXXX`}
								</span>
							</p>

							<button
								className="font-bold text-black bg-white rounded-none btn btn-sm hover:bg-primary hover:text-white hover:border-0 hover:rounded-sm "
								onClick={() => {
									isLogin && result?.data?.contact_type.includes('phone')
										? setRevealNumber(!revealNumber)
										: toast.warn('Please login to reveal phone number');
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
						{result?.data?.contact_type.includes('email') && (
							<div className="flex items-center justify-between w-full">
								<p
									className={`my-2 w-full overflow-scroll ${revealEmail ? 'tooltip tooltip-primary' : ''}`}
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
						)}
					</div>
					<ChatForm ad_id={result?.data?.id} owner={result?.data?.owner} active={result?.data?.active} />
				</aside>
			</section>
			<section className="flex flex-col p-2 my-2 bg-gray-200 xl:p-6 xl:my-4">
				<div className="flex flex-col items-start justify-start w-full gap-2 tracking-tighter lg:tracking-normal line-clamp-1">
					<h2 className="text-xl xl:2xl">Description</h2>
					<p className="bg-white p-4 min-h-[100px] text-justify text-lg border-t-4 border-t-primary whitespace-pre-line">
						{result?.data?.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
						minus quibusdam. Soluta vero doloribus iste sint sunt minima praesentium, asperiores, facere
						dolorum eaque voluptate fugiat molestias? Provident harum nostrum omnis! 
						
						Lorem ipsum, dolor
						sit amet consectetur adipisicing elit. Dolorem veniam molestiae, perspiciatis modi facilis
						labore soluta ipsa eveniet mollitia, molestias quod rem non culpa hic laborum minima. Soluta,
						ducimus vero?
					</p>
				</div>
				<div className="flex flex-col items-start justify-start w-full gap-2 my-2">
					<h2 className="text-xl tracking-tighter lg:tracking-normal">Overview</h2>

					<div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{convertKeyToName(result?.data).map((val, index) => (
							<OverviewPills overview={val} ad={result?.data} key={index} />
						))}
					</div>
				</div>
			</section>
			<ScrollToTop />
		</section>
	);
};

export default index;
