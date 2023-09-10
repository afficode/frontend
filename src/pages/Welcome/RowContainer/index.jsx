import { BsFastForwardFill } from 'react-icons/bs';
import {
	SportCar,
	Furniture,
	HairDryer,
	House,
	KitchenTools,
	Spa,
	Store,
	Tailor,
	Toyota,
} from '../../../assets/images';
import { Card } from '../../../components';

const RowContainer = ({ title }) => {
	return (
		<section className="px-4 md:px-[4rem] py-6">
			<div className="flex items-center justify-between pb-4">
				<h3 className="w-full font-normal">{title}</h3>
				<span className="font-semibold capitalize cursor-pointer whitespace-nowrap max-sm:text-sm text-blue hover:underline">
					See More
					<BsFastForwardFill className="inline ml-2 max-sm:text-base text-[25px]" />
				</span>
			</div>
			<div className="grid grid-cols-1 gap-4 place-items-center sm:grid-cols-2 lg:grid-cols-3">
				{title === 'Discover more...'
					? discoverMoreData.map((item) => <CardDetails key={item.title} {...item} />)
					: title === 'Categories'
					? categoriesData.map((item) => <Card key={item.title} {...item} />)
					: shopsData.map((item) => <Card key={item.title} {...item} />)}
			</div>
		</section>
	);
};

export default RowContainer;

const CardDetails = ({ title, location, img, car, price }) => {
	return (
		<div className=" max-w-[18rem] sm:max-w-[25rem] h-[22rem] border border-black/25 shadow-sm cursor-pointer hover:shadow-lg transition-all  ease-in-out">
			<img className=" w-full h-[70%] object-cover" src={img} alt="/" />
			<div className="px-4 py-2">
				{car ? (
					<div className="flex items-center gap-2 xl:gap-4 ">
						<p className="card-text">{car.year}</p>
						<span className="w-1 h-1 bg-black rounded-full " />
						<p className="card-text">{car.mileage}</p>
						<span className="w-1 h-1 bg-black rounded-full" />
						<p className="card-text">{car.fuel}</p>
					</div>
				) : (
					<span className="card-text">{price}</span>
				)}
				<p className="card-text">{title}</p>
				<p className="card-text">{location}</p>
			</div>
		</div>
	);
};

// ₦

const categoriesData = [
	{
		img: SportCar,
		title: 'Cars & Automobiles',
	},
	{
		img: House,
		title: 'Properties',
	},
	{
		img: Furniture,
		title: 'Furnitures',
	},
];

const shopsData = [
	{
		img: Tailor,
		title: 'Tasha Stitches',
	},
	{
		img: Spa,
		title: 'Wendy’s SPA',
	},
	{
		img: Store,
		title: 'K & K Kiddies Store.',
	},
];

const discoverMoreData = [
	{
		img: HairDryer,
		title: 'Hair dryer.',
		price: '₦60,000',
		location: 'Idumota, Lagos.',
	},
	{
		img: Toyota,
		title: 'Toyota Corola',
		// price: '₦60,000',
		location: 'Idumota, Lagos.',
		car: {
			year: '2008',
			mileage: '120,000 miles',
			fuel: 'Petrol',
		},
	},
	{
		img: KitchenTools,
		title: 'Kitchen Ware',
		price: '₦60,000',
		location: 'Abuja.',
	},
];