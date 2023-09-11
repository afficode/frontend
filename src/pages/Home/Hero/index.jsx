import { Property, Sale, Services, Vehicles } from '../../../assets/images';

const Hero = () => {
	return (
		<section className="px-4 pt-16 pb-12 hero bg-gradient-to-r from-blue/30 via-blue/90 to-blue/40">
			<div className="mt-16 mb-4">
				<div className="flex gap-4 max-lg:grid max-lg:grid-cols-2 max-lg:gap-6 max-sm:grid-cols-1 ">
					{cardData.map((card, index) => (
						<Card key={index} {...card} />
					))}
				</div>
				<div className="max-w-[30rem] mx-auto mt-6 lg:mt-[-3rem]">
					<button className="w-full text-lg capitalize border-none btn hover:bg-yellow hover:border-black/50 hover:border-solid bg-yellow rounded-3xl sm:text-xl ">
						Set up a Shop Today!
					</button>
				</div>
			</div>
		</section>
	);
};

export default Hero;

const Card = ({ title, image, description, action }) => {
	return (
		<div className="w-full sm:max-w-[18rem] h-[23rem] flex flex-col items-center hero-card text-center justify-between rounded-md px-4 py-6 bg-white shadow-md cursor-pointer hover:scale-105 hover:shadow-lg transition-all ">
			<h3 className="xl:whitespace-nowrap">{title}</h3>
			<img src={image} alt="for sale image" className="w-[11rem] h-[9rem] object-contain" />
			<p className="card-text">{description}</p>
			<button className="mt-4 text-lg capitalize border-none btn rounded-3xl hover:border-black/50 hover:border-solid hover:bg-yellow/90 bg-yellow">
				{action}
			</button>
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
