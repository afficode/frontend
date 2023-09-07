import { Property, Sale, Services, Vehicles } from '../../../assets/images';

const Hero = () => {
	return (
		<section className="custom-hero min-h-[79vh] w-full hero relative max-lg:pt-8 max-lg:pb-12">
			<div className=" h-full pb-[3rem] px-10 sm:px-4 flex max-lg:grid max-lg:grid-cols-2 max-lg:gap-6 max-sm:grid-cols-1 items-end gap-2 ">
				{cardData.map((card, index) => (
					<Card key={index} {...card} />
				))}
			</div>
			<div className="absolute bottom-[2rem] lg:bottom-[2.5rem] lg:w-[30%]">
				<button className="btn hover:bg-yellow/80 bg-yellow rounded-3xl w-full text-lg sm:text-xl capitalize">
					Set up a Shop Today!
				</button>
			</div>
		</section>
	);
};

export default Hero;

const Card = ({ title, image, description, action }) => {
	return (
		<div className="w-full sm:max-w-[19rem] h-[24rem] flex flex-col items-center hero-card text-center justify-between  border border-black px-4 py-6 bg-white">
			<h3 className="xl:whitespace-nowrap">{title}</h3>
			<img src={image} alt="for sale image" className="w-[11rem] h-[9rem] object-contain" />
			<p className="card-text">{description}</p>
			<button className="btn rounded-3xl hover:bg-yellow/80 bg-yellow capitalize mt-4 text-lg">{action}</button>
		</div>
	);
};

const cardData = [
	{
		title: 'For Sale',
		image: Sale,
		description: 'Buy, Sell and Make Money on Isowo.ng. \nGenuine products await you.',
		action: 'Transact Now',
	},
	{
		title: 'Services',
		image: Services,
		description: 'Hire verified professionals  for all your service needs Today!',
		action: 'Search Now',
	},
	{
		title: 'Property',
		image: Property,
		description: 'Buy, Rent and Lease property. Also, find verified agents near you, across Nigeria',
		action: 'Start Now',
	},
	{
		title: 'Cars & Vehicles',
		image: Vehicles,
		description: 'Find thousands of vehicles and automobiles as Buyer, Seller and a Dealer.',
		action: 'Explore Now',
	},
];
