import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TbCurrencyNaira } from 'react-icons/tb';
import { IoCopy, IoCopyOutline } from 'react-icons/io5';
import { CarBlack } from '../../../assets/images';
// import { Carousel } from 'flowbite-react';
import { FaCamera } from 'react-icons/fa';
import OverviewPills from '../../Products/View/OverviewPills';
import { ScrollToTop } from '../../../utils';
import GrabHeader from '../GrabHeader';
import { Approutes } from '../../../constants';
import { Button } from '../../../ui';
import { Chat, Download, Share } from '../../../assets/svgs';
import { useNotify } from '../../../hooks';

const GrabProduct = () => {
	let grabLink = 'boonfu.com/bf1346/201344';
	const notify = useNotify();
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard
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
	return (
		<section className="w-full p-4 lg:p-8">
			<GrabHeader size="h2" text="Grabbed Item preview" />

			<div className="flex flex-col w-full h-full gap-2 mt-6 md:flex-row md:gap-8 line-clamp-1">
				<div className="w-full md:w-[60%]  xl:w-[70%] flex flex-col">
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

				<aside className="w-full h-[350px] md:w-[40%] xl:w-[30%] border-2 border-gray-400 p-2 lg:p-4 flex flex-col justify-between">
					<div className="">
						<h6 className="w-full text-lg font-bold text-center md:text-xl 2xl:text-3xl">
							Product ID:201344
						</h6>

						<hr className="h-px my-2 border-black/40 border-1" />

						<div className="w-full tracking-tighter">
							{/* <div className="flex justify-between">
								<p className="p-lg">Date Posted </p>
								<p className="p-lg">22.04.2024 </p>
							</div> */}
							<div className="flex justify-between">
								<p className="p-lg">Category </p>
								<p className="font-semibold p-lg text-primary">Cars & Vehicles </p>
							</div>
						</div>
					</div>

					<div>
						<hr className="h-px my-2 border-black/40 border-1" />
						<div className="mb-6">
							<p className="p-lg">Grab Link</p>

							<div className="flex items-center justify-between">
								<p className="text-primary">{grabLink}</p>
								<div>
									{copied ? (
										<IoCopy className="cursor-pointer" size={20} />
									) : (
										<IoCopyOutline onClick={handleCopy} className="cursor-pointer" size={20} />
									)}
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-4">
							{/* <Button
								variant={'primary'}
								size={'full'}
								className={'flex items-center justify-center gap-4 rounded-xl'}
							>
								<img src={Chat} alt="/" className="w-8" />
								Chat Boonfu
							</Button>
							<Button
								variant={'primary'}
								size={'full'}
								className={'flex items-center justify-center gap-4 rounded-xl'}
							>
								<img src={Share} alt="/" className="w-8" />
								Share Now
							</Button> */}
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
