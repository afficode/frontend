import { Link } from 'react-router-dom';
import {
	ArrowRight,
	GrabDashboard,
	GrabIcon,
	GrabPage,
	GrabProfile,
	GrabSave,
} from '../../../assets/svgs';
import { Button } from '../../../ui';
import { Gown, Rolex, Sneakers } from '../../../assets/images';
import { Approutes } from '../../../constants';
import { ScrollToTop } from '../../../utils';
import useAuth from '../../../context/UserContext';

const GrabberHome = () => {
	const { user } = useAuth();

	return (
		<section className="min-h-screen text-center max-w-[1024px] space-y-6 mx-auto mb-16">
			<h2 className="py-4 uppercase">Grabber</h2>

			<div className="lg:h-[600px] grab-home">
				<div className="flex justify-between w-full h-full gap-6 max-lg:items-center max-lg:flex-col">
					<p className="w-[200px] p-lg lg:mt-16">What drives you to want to achieve success?</p>
					<p className="w-[200px] p-lg lg:mt-16">
						There isn’t limit to what you can achieve on{' '}
						<Link to={Approutes.home} className="text-primary">
							Boonfu.com
						</Link>
					</p>
				</div>
			</div>

			<h2 className="px-4 text-left">
				<b>Welcome, {user?.firstname}!</b>
			</h2>

			<div className="p-6 space-y-4 bg-gray-300 rounded-lg">
				<h4 className="text-primary">START MAKING RESIDUAL INCOME, STEADY!</h4>
				<p className="max-w-[720px] mx-auto">
					You have taken the first major step in creating Grabber’s account on Boonfu, now it is time to
					scout for products of interests, share grabbed items/products and watch your sales commission
					grow.......
				</p>
			</div>

			<div className="p-4 space-y-6 bg-gray-700 md:p-8 rounded-t-3xl">
				<div className="text-white">
					<h4>Kickstart Your Journey Now.</h4>
					<p>Click any of the pages below to explore Boonfu.com as a Grabber </p>
				</div>

				<div className="flex justify-between gap-6 overflow-auto">
					<div className="flex flex-col items-center gap-8 p-4 bg-gray-300 rounded-t-xl">
						<h5>Profile</h5>
						<div className="space-y-2">
							<img src={GrabProfile} alt="/" className="w-[8rem] mb-4 mx-auto" />
							<Link to={Approutes.grab.profile}>
								<Button variant="secondary" size={'small'} className={'whitespace-nowrap'}>
									View and edit
								</Button>
							</Link>
						</div>
					</div>
					<div className="flex flex-col items-center gap-8 p-4 bg-gray-300 rounded-t-xl">
						<h5>Dashboard</h5>
						<div className="space-y-2">
							<img src={GrabDashboard} alt="/" className="w-[8rem] mb-4 mx-auto" />
							<Link to={Approutes.grab.dashboard}>
								<Button variant="secondary" size={'small'} className={'whitespace-nowrap'}>
									Do more here
								</Button>
							</Link>
						</div>
					</div>
					<div className="flex flex-col items-center gap-8 p-4 bg-gray-300 rounded-t-xl">
						<h5>Grab Page</h5>
						<div className="space-y-2">
							<img src={GrabPage} alt="/" className="w-[6.3rem] mb-4 mx-auto" />
							<Link to={Approutes.grab.products}>
								<Button variant="secondary" size={'small'} className={'whitespace-nowrap'}>
									Start Earning{' '}
								</Button>
							</Link>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-3">
					<Link
						to={Approutes.grab.products}
						className="ml-auto text-white transition-all hover:underline"
					>
						<button className="flex items-center gap-2 ">
							<span>Load Grabable Products</span>
							<img src={ArrowRight} className="w-4" alt="/" />
						</button>
					</Link>

					<div className="flex flex-wrap items-center justify-between gap-6">
						{data.map((item, i) => (
							<div key={i} className="relative flex mx-auto flex-col w-[250px] bg-white">
								<button>
									<img src={GrabSave} alt="/" className="absolute w-8 top-2 left-2" />
								</button>
								<button>
									<img src={GrabIcon} alt="/" className="absolute w-8 top-2 right-2" />
								</button>
								<img src={item.img} alt="/" className="w-full h-[200px] " />
								<h6 className="px-2 font-semibold text-left">{item.title}</h6>
								<Button variant={'primary'} size={'small'} className={'mt-8 mb-2 w-fit mx-auto'}>
									Click for info
								</Button>
							</div>
						))}
					</div>
				</div>
			</div>
			<ScrollToTop />
		</section>
	);
};

export default GrabberHome;

const data = [
	{
		img: Gown,
		title: 'Apparel Gown',
	},
	{
		img: Sneakers,
		title: 'Sketchers Trainers',
	},
	{
		img: Rolex,
		title: 'Rolex Watch for Men',
	},
	{
		img: Gown,
		title: 'Apparel Gown',
	},
	{
		img: Sneakers,
		title: 'Sketchers Trainers',
	},
	{
		img: Rolex,
		title: 'Rolex Watch for Men',
	},
	{
		img: Gown,
		title: 'Apparel Gown',
	},
	{
		img: Sneakers,
		title: 'Sketchers Trainers',
	},
	{
		img: Rolex,
		title: 'Rolex Watch for Men',
	},
];
