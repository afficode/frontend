import { Link } from 'react-router-dom';
import { Property, Sale, Services, Vehicles } from '../../../assets/images';
import { Approutes } from '../../../constants/routes';
const Hero = () => {
	return (
		<section className="px-4 lg:pt-16 pb-12 hero bg-gradient-to-b from-primary/20 via-primary/60 to-white">
			<div className="mt-16 mb-4">
				<div className="flex gap-4 max-lg:grid max-lg:grid-cols-2 max-lg:gap-6 max-sm:grid-cols-1 ">
					{cardData.map((card, index) => (
						<Card key={index} {...card} />
					))}
				</div>
				<div className="max-w-[30rem] mx-auto mt-6 lg:mt-[-3rem]">
					<Link to={Approutes.product.initial}>
						<button
							// onClick={Approutes.underConstruction}
							className="w-full text-lg capitalize border-none btn text-white hover:bg-secondary hover:border-black/50 hover:border-solid bg-secondary rounded-3xl sm:text-xl "
						>
							View Ads
						</button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Hero;

const Card = ({ title, image, description, action, link }) => {
	return (
		<div className="w-full sm:max-w-[18rem] h-[23rem] flex flex-col items-center hero-card text-center justify-between rounded-md px-4 py-6 bg-white shadow-md cursor-pointer hover:scale-105 hover:shadow-lg transition-all ">
			<h3 className="xl:whitespace-nowrap">{title}</h3>
			<img src={image} alt="for sale image" className="w-[11rem] h-[9rem] object-contain" />
			<p className="p-lg ">{description}</p>
			<Link
				to={link}
				className="mt-4 text-lg capitalize border-none btn rounded-3xl hover:border-black/50 hover:border-solid hover:bg-secondary/90 bg-secondary px-8 text-white"
			>
				{action}
			</Link>
		</div>
	);
};

const cardData = [
	{
		title: 'Fashion',
		image: Sale,
		description: 'We bring beauty to you. \nGenuine products await you.',
		action: 'Transact Now',
		link: `${Approutes.product.category}/${btoa(55)}`,
	},
	{
		title: 'Services',
		image: Services,
		description: 'Hire verified professionals  for all your service needs Today!',
		action: 'Search Now',
		link: `${Approutes.product.category}/${btoa(52)}`,
	},
	{
		title: 'Property',
		image: Property,
		description: 'Buy, Rent and Lease property. Also, find verified agents near you, across Nigeria',
		action: 'Start Now',
		link: `${Approutes.product.category}/${btoa(51)}`,
	},
	{
		title: 'Cars & Vehicles',
		image: Vehicles,
		description: 'Find thousands of vehicles and automobiles as Buyer, Seller and a Dealer.',
		action: 'Explore Now',
		link: `${Approutes.product.category}/${btoa(50)}`,
	},
];
