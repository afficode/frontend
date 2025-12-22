import { Link, useParams } from 'react-router-dom';
import { TbCurrencyNaira } from 'react-icons/tb';
import { noimage } from '../../../assets/images';
import { Carousel } from 'flowbite-react';
import { FaCamera } from 'react-icons/fa';
import OverviewPills from '../../Products/View/OverviewPills';
import { convertKeyToName, numberWithCommas, ScrollToTop } from '../../../utils';
import Action from './Action';
import { fetchProduct, useCheckOrder } from '../../../hooks';
import { SpinnerSkeleton } from '../../../components';
import { inspectableCategories } from '../../../constants/Category';
import useAuth from '../../../context/UserContext';
import { Approutes } from '../../../constants';

const GrabbedProduct = () => {
	const { grabber_id, ad_id } = useParams();
	let grabberId;

	if (grabber_id) {
		grabberId = grabber_id.slice(2);
	}
	const { user } = useAuth();

	const { data: result, isLoading } = fetchProduct(ad_id);

	const category = result?.data?.category;

	const shouldFetch = !!user && !!category && !inspectableCategories.includes(category);

	const {
		data: checkOrder,
		isError,
		error,
		isLoading: checking,
	} = useCheckOrder(ad_id, {
		enabled: shouldFetch,
	});

	if (isLoading || checking)
		return (
			<div className="h-screen">
				<SpinnerSkeleton />
			</div>
		);

	if (user?.id === result?.data?.user_id) {
		location.replace(`${Approutes.product.initial}/${ad_id}`);
	}

	if (isError) {
		if (error?.response?.status === 403) {
			return (
				<div className="flex items-center justify-center w-full h-[70vh]">
					<div className="flex flex-col gap-4 w-full h-max max-w-[600px] text-center p-4 bg-white">
						<div className="bg-secondary p-4 space-y-2">
							<h3>🔒 Restricted Access Notice</h3>

							<p>
								This ad is currently locked due to an active transaction. To protect both buyers and
								sellers, listings become temporarily unavailable once a purchase is in progress.
							</p>
						</div>

						<div className="space-y-4 text-start">
							<h4 className="text-center">What You Can Do:</h4>

							<ul>
								<li>✅ Browse similar available items</li>
								<li>✅ Check back in 24-48 hours if the deal falls through</li>
								<li>✅ Contact support@boonfu.com for urgent inquiries</li>
							</ul>

							<p>Thank you for understanding our secure transaction process!</p>
						</div>
					</div>
				</div>
			);
		} else if (error?.response?.status === 401) {
			location.replace(Approutes.auth.initial);
		}
	}

	if (checkOrder?.status === 200) {
		if (checkOrder?.data?.type === 'self_pickup') {
			location.replace(`${Approutes.checkout.usePickup(grabber_id, ad_id)}`);
		}
	}

	if (result) {
		return (
			<section className="w-full p-4 lg:p-8">
				<div className="flex flex-col gap-4 p-4 mb-6 rounded-xl bg-primary">
					<h4 className="text-white">
						Welcome to: <span className="capitalize">{result?.data.title}</span>,{' '}
						{result.data?.location.split(',')[1]} - Page
					</h4>
					{grabber_id && (
						<h5 className="flex justify-center max-sm:flex-col max-sm:items-center p-2 bg-white">
							You were directed here by:
							<span className="px-2 text-primary"> {`BF${grabberId}`}</span>{' '}
						</h5>
					)}
				</div>
				<div className="flex flex-col w-full h-full gap-2  lg:flex-row md:gap-8 line-clamp-1">
					{/* product display */}

					<div className="w-full  flex flex-col justify-between">
						<div className="w-full mb-2">
							<div className="flex items-center justify-between w-full  font-bold uppercase ">
								<h3 className="capitalize">{result?.data.title} </h3>
							</div>

							<div className="flex items-center justify-between">
								<p className="w-full  whitespace-nowrap">
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
						<div className="relative rounded-none w-full h-full mt-1">
							{result.data?.images.length > 0 ? (
								<Carousel className="h-full max-lg:h-[300px] md:min-h-[470px]    rounded-none">
									{result.data?.images?.map((img, index) => (
										<img
											src={img.path}
											alt={img.filename}
											key={index * 3}
											className="rounded-t-sm rounded-b-none object-cover"
										/>
									))}
								</Carousel>
							) : (
								<img src={noimage} alt="no image" className="object-cover w-full h-full md:h-[470px] " />
							)}

							<div className="absolute bottom-0 flex w-full h-10 py-2 pl-6 text-white rounded-none bg-black/50">
								<span className="flex px-2 my-auto border-2 border-white">
									<FaCamera className="mt-1 text-sm" />
									&nbsp; &nbsp; <span className="my-auto text-sm"> {result?.data.images.length}</span>
								</span>
							</div>
						</div>
					</div>

					<div className="xl:w-[40%] lg:self-end h-full ">
						<Action
							isGeneral={inspectableCategories.includes(result?.data.category) ? false : true}
							ad={result?.data}
						/>
					</div>
				</div>

				{/* description and overview */}
				<div className="flex flex-col p-2 my-2 bg-gray-200 xl:p-6 xl:my-4">
					<div className="flex flex-col items-start justify-start w-full gap-2 tracking-tighter lg:tracking-normal line-clamp-1">
						<h2 className="text-xl xl:2xl">Description</h2>

						<p className="bg-white p-4 min-h-[100px] w-full text-justify text-lg border-t-4 border-t-primary whitespace-pre-line">
							{result?.data?.description}
						</p>
					</div>

					<div className="flex flex-col items-start justify-start w-full gap-2 my-2">
						<h2 className="text-xl tracking-tighter lg:tracking-normal">Overview</h2>

						<div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{convertKeyToName(result?.data)?.map((val, index) => (
								<OverviewPills overview={val} key={index} />
							))}
						</div>
					</div>
				</div>
				<ScrollToTop />
			</section>
		);
	}

	return <div>Product not found</div>;
};

export default GrabbedProduct;
