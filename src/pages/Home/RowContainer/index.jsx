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
		<section className="w-full px-4 md:px-[2rem] py-8">
			<div className="relative flex items-center w-full pb-2">
				<h2 className="max-sm:text-2xl sm:mx-auto ">{title}</h2>
				<span className="absolute right-0 font-semibold capitalize cursor-pointer whitespace-nowrap text-primary hover:underline">
					{title === 'Shops' ? 'Visit Shops' : 'View More'}
					<BsFastForwardFill className="inline ml-2 max-sm:text-base text-[25px]" />
				</span>
			</div>
			<div className="relative w-full pb-8">
				<div className="py-4 bg-primary/20 md:px-4">
					<Carousel renderDotsOutside responsive={responsive} showDots={true}>
						{title === 'Shops'
							? Array(12)
									.fill(1)
									.map((_) => <ShopsCard key={uuidv4()} />)
							: Array(12)
									.fill(1)
									.map((_) => <FeaturedProductsCard key={uuidv4()} />)}
					</Carousel>
				</div>
			</div>
		</section>
	);
};

export default RowContainer;

const ShopsCard = () => {
	return (
		<div className="max-w-[11rem] max-h-[14rem] sm:w-[13rem] sm:h-[16rem] relative group rounded-lg">
			<img
				className="object-cover h-full min-w-full rounded-lg opacity-80 group-hover:opacity-100"
				src={Car}
				alt="/"
			/>
			<div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-between py-2">
				<div className="mx-auto text-center text-white">
					<h4 className="font-semibold">Jokals Cars</h4>
					<span className="block font-semibold">[40 cars]</span>
					<div className="flex gap-2">
						<HiStar size={26} className="text-secondary" />
						<HiStar size={26} className="text-secondary" />
						<HiStar size={26} className="text-secondary" />
						<HiStar size={26} />
						<HiStar size={26} />
					</div>
				</div>
				<button className="py-0 mx-4 text-black capitalize border-none btn bg-secondary/90 hover:bg-secondary/90">
					Visit Shop
				</button>
			</div>
		</div>
	);
};

const FeaturedProductsCard = () => {
	return (
		<div className="max-w-[11rem] max-h-[14rem]  sm:w-[13rem] sm:h-[16rem] flex items-center justify-center rounded-lg border-l-4 border-r-4 border-l-secondary border-r-secondary">
			<img className="object-cover min-w-full rounded-lg max-h-fit" src={Car} alt="/" />
			<div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-between py-2 w-[11rem]">
				<div className="mt-auto text-center">
					<button className="px-4 mb-1 text-black capitalize border-none  btn bg-secondary/90 hover:bg-secondary/90">
						View Product
					</button>
				</div>
			</div>
		</div>
	);
};
