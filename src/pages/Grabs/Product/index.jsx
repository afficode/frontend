import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TbCurrencyNaira } from 'react-icons/tb';
import { IoCopy, IoCopyOutline } from 'react-icons/io5';
import { noimage } from '../../../assets/images';
import { FaCamera } from 'react-icons/fa';
import OverviewPills from '../../Products/View/OverviewPills';
import { convertKeyToName, formatAdId, numberWithCommas, ScrollToTop } from '../../../utils';
import GrabHeader from '../GrabHeader';
import { Approutes } from '../../../constants';
import { Button } from '../../../ui';
import { Download } from '../../../assets/svgs';
import { fetchProduct, useNotify } from '../../../hooks';
import { Carousel } from 'flowbite-react';
import { SpinnerSkeleton } from '../../../components';
import useAuth from '../../../context/UserContext';

const GrabProduct = () => {
	const frontendLink = 'http://89.107.60.191';

	const notify = useNotify();
	const [copied, setCopied] = useState(false);

	const { ad_id } = useParams();

	const { user } = useAuth();

	const grabLink = useMemo(
		() => `${frontendLink}${Approutes.grab.grabbedProduct(`bf${user.grabber.id}`, ad_id)}`,
		[ad_id, user.grabber.id]
	);

	const { data: result, isLoading, isError } = fetchProduct(ad_id);

	const handleCopy = () => {
		navigator?.clipboard
			.writeText(grabLink)
			.then(() => {
				notify('Link copied to clipboard', 'success');
				setCopied(true);
			})
			.catch((err) => {
				// console.log(err);
				notify('Failed to copy link', 'error');
			});
	};

	if (isLoading) {
		return (
			<div className="h-screen">
				<SpinnerSkeleton />
			</div>
		);
	} else if (isError) {
		return <div className="h-screen">Product not found</div>;
	}

	if (result) {
		return (
			<section>
				<GrabHeader text="Grabbed Item preview" />
				<div className="w-full p-2 my-4 text-center text-white bg-red-500 whitespace-nowrap">
					<h4>Commission : #200,000.00</h4>
				</div>
				<div className="flex flex-col w-full h-full gap-2 xl:flex-row xl:gap-4 line-clamp-1">
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
						<div className="relative rounded-none w-full  h-full mt-1">
							{result?.data?.images.length > 0 ? (
								<Carousel className="h-full max-lg:h-[300px] md:min-h-[470px]  rounded-none">
									{result.data?.images.map((img, index) => (
										<img
											src={img.path}
											alt={img.filename}
											key={index * 3}
											className="rounded-t-sm rounded-b-none object-cover"
										/>
									))}
								</Carousel>
							) : (
								<img src={noimage} alt="no image" className="object-cover w-full h-full " />
							)}

							<div className="absolute bottom-0 flex w-full h-10 py-2 pl-6 text-white rounded-none bg-black/50">
								<span className="flex px-2 my-auto border-2 border-white">
									<FaCamera className="mt-1 text-sm" />
									&nbsp; &nbsp; <span className="my-auto text-sm"> {result?.data.images.length}</span>
								</span>
							</div>
						</div>
					</div>

					<aside className="w-full h-[350px]  xl:w-[45%] border-2 border-gray-400 p-2 lg:p-4 flex flex-col justify-between">
						<div className="">
							<h6 className="w-full text-lg font-bold text-center md:text-xl 2xl:text-3xl">
								Product ID: {formatAdId(result.data?.id)}
							</h6>

							<hr className="h-px my-2 border-black/40 border-1" />

							<div className="w-full tracking-tighter">
								<div className="flex justify-between">
									<p className="p-lg">Category </p>
									<p className="font-semibold p-lg text-primary">{result?.data.parent_category}</p>
								</div>
							</div>
						</div>

						<div>
							<hr className="h-px my-2 border-black/40 border-1" />
							<div className="mb-6">
								<p className="p-lg">Grab Link</p>

								<div className="flex items-center justify-between">
									<p className="text-primary w-[16rem] truncate">{grabLink ? grabLink : null}</p>
									<div>
										{copied ? (
											<button>
												<IoCopy className="cursor-pointer" size={20} />
											</button>
										) : (
											<button onClick={handleCopy}>
												<IoCopyOutline className="cursor-pointer" size={20} />
											</button>
										)}
									</div>
								</div>
							</div>
							<div className="flex flex-col gap-4">
								<Button
									variant={'primary'}
									size={'full'}
									className={'flex items-center justify-center gap-4 rounded-xl'}
								>
									<img src={Download} alt="/" className="w-8" />
									Download images{' '}
								</Button>
							</div>
						</div>
					</aside>
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
							{convertKeyToName(result?.data).map((val, index) => (
								<OverviewPills overview={val} key={index} />
							))}
						</div>
					</div>
				</div>

				{/* bottom buttons  */}
				<div className="flex gap-6 my-8 max-sm:flex-col">
					<Link to={Approutes.grab.flyer} target="_blank" className="flex-1">
						<Button className={'bg-[#047F73] text-white px-8 py-[.75rem] w-full  font-semibold text-xl'}>
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
	}

	return <div>Product not found</div>;
};

export default GrabProduct;
