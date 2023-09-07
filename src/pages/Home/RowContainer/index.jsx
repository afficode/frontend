import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Car } from '../../../assets/images';
import { responsive } from '../../../constants';
import { v4 as uuidv4 } from 'uuid';

// icons 
import { HiStar } from 'react-icons/hi';
import { BsFastForwardFill } from 'react-icons/bs';

const RowContainer = ({ title }) => {
	return (
		<section className="w-full px-4 md:px-[4rem] py-8">
			<div className="flex items-center relative pb-2 w-full">
				<h2 className="max-sm:text-2xl sm:mx-auto ">{title}</h2>
				<span className="absolute right-0 whitespace-nowrap font-semibold capitalize cursor-pointer  text-green hover:underline">
					Visit Shops
					<BsFastForwardFill className="inline ml-2 max-sm:text-base text-[25px]" />
				</span>
			</div>
			<div className="pb-8 w-full relative">
				<div className="carousel-con md:px-12 py-4 ">
					<Carousel renderDotsOutside responsive={responsive} showDots={true}>
						{title === 'Shops' ? Array(12)
							.fill(1)
							.map((_) => (
								 <ShopsCard key={uuidv4()} />
							)) : Array(12).fill(1).map((_) => (<FeaturedProductsCard key={uuidv4} />))}
					</Carousel>
				</div>
			</div>
		</section>
	);
};

export default RowContainer;

const ShopsCard = () => {
	return (
		<div className="w-[13rem] h-[16rem] relative group rounded-lg">
			<img
				className=" min-w-full h-full object-cover opacity-80 group-hover:opacity-100 rounded-lg"
				src={Car}
				alt="/"
			/>
			<div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-between py-2">
				<div className="text-white text-center mx-auto">
					<h4 className="font-semibold">Jokals Cars</h4>
					<span className="block font-semibold">[40 cars]</span>
					<div className="flex gap-2">
						<HiStar size={26} className="text-yellow" />
						<HiStar size={26} className="text-yellow" />
						<HiStar size={26} className="text-yellow" />
						<HiStar size={26} />
						<HiStar size={26} />
					</div>
				</div>
				<button className="btn capitalize text-white bg-green border-none py-0 mx-4 hover:bg-green">
					Visit Shop
				</button>
			</div>
		</div>
	);
};

const FeaturedProductsCard = () => {
	return (
		<div className="w-[13rem] h-[16rem] flex items-center justify-center rounded-lg border-l-4 border-r-4 border-l-yellow border-r-yellow">
			<img className=" min-w-full max-h-fit object-cover rounded-lg" src={Car} alt="/" />
		</div>
	);
};
