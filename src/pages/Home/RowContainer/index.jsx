import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Car } from '../../../assets/images';
import { Approutes, responsive } from '../../../constants';
import { v4 as uuidv4 } from 'uuid';
import { noimage } from '../../../assets/images';

// icons
import { HiStar } from 'react-icons/hi';
import { BsFastForwardFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const RowContainer = ({ title, link, data }) => {
	return (
		<section className="w-full px-4 md:px-[2rem] py-8">
			<div className="relative flex items-center w-full pb-2">
				<h2 className="max-sm:text-2xl sm:mx-auto ">{title}</h2>
				<span className="absolute right-0 font-semibold capitalize cursor-pointer whitespace-nowrap text-primary hover:underline">
					{title === 'Shops' ? (
						<Link to={Approutes.underConstruction}>Visit Shops</Link>
					) : (
						<Link to={link}>View More</Link>
					)}
					<BsFastForwardFill className="inline ml-2 max-sm:text-base text-[25px]" />
				</span>
			</div>
			<div className="relative w-full pb-8">
				<div className="py-4 bg-primary/20 md:px-4">
					<Carousel renderDotsOutside responsive={responsive} showDots={true}>
						{title !== 'Shops'
							? data && data.length > 0
								? data.map((product) => <FeaturedProductsCard key={uuidv4()} product={product} />)
								: Array(12)
										.fill(1)
										.map((_) => <FeaturedProductsCard key={uuidv4()} />)
							: Array(12)
									.fill(1)
									.map((_) => <ShopsCard key={uuidv4()} />)}
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

const FeaturedProductsCard = ({ product }) => {
	return (
		<Link
			to={`${Approutes.product.initial}/${product?.id}`}
			className="max-w-[11rem] max-h-[14rem]  sm:w-[13rem] sm:h-[16rem] flex flex-col items-center justify-center rounded-lg bg-white "
		>
			<img
				className="object-cover min-w-full h-[8rem] rounded-t-lg"
				src={product?.images[0]?.path || noimage}
				alt="/"
			/>

			<div
				className=" flex flex-col  justify-between py-2 w-[11rem] my-auto tooltip tooltip-secondary"
				data-tip={product?.title.toUpperCase()}
			>
				<p className="line-clamp-1 uppercase mx-auto text-center ">{product?.title}</p>
				<button className="py-0 mx-4 my-auto rounded-lg text-black capitalize border-none btn-sm bg-secondary/90 hover:bg-secondary/90 mt-4 hover:text-[#FBFBFB]">
					View more
				</button>
			</div>
		</Link>
	);
};
