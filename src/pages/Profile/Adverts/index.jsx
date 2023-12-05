import { useState } from 'react';
import AdCard from './AdCard';
import { Button } from '../../../ui';
import { Link } from 'react-router-dom';
import { Approutes } from '../../../constants';

const Adverts = () => {
	const [filteredAd, setFilteredAd] = useState('all');

	return (
		<div className="max-w-[1224px] mx-auto px-4 my-10">
			<div className="py-6 px-2 lg:px-8 space-y-8 border-black/30 border rounded-3xl mb-12">
				<div className="flex justify-between items-center flex-wrap">
					<div
						onClick={() => setFilteredAd('all')}
						className={`${
							filteredAd === 'all'
								? 'bg-primary text-white lg:py-2 lg:px-6 py-1 px-4'
								: 'lg:py-2 lg:px-6 py-1 px-4'
						} cursor-pointer max-sm:text-sm`}
					>
						All <span>[17]</span>
					</div>
					<div
						onClick={() => setFilteredAd('promoted')}
						className={`${
							filteredAd === 'promoted'
								? 'bg-primary text-white lg:py-2 lg:px-6 py-1 px-4'
								: 'text-primary lg:py-2 lg:px-6 py-1 px-4'
						} cursor-pointer max-sm:text-sm`}
					>
						Promoted <span>[8]</span>
					</div>
					<div
						onClick={() => setFilteredAd('reviewing')}
						className={`${
							filteredAd === 'reviewing'
								? 'bg-primary text-white lg:py-2 lg:px-6 py-1 px-4'
								: 'text-secondary lg:py-2 lg:px-6 py-1 px-4'
						} cursor-pointer max-sm:text-sm`}
					>
						Reviewing <span>[0]</span>
					</div>
					<div
						onClick={() => setFilteredAd('decline')}
						className={`${
							filteredAd === 'decline'
								? 'bg-primary text-white lg:py-2 lg:px-6 py-1 px-4'
								: 'text-[#D60949] lg:py-2 lg:px-6 py-1 px-4'
						} cursor-pointer max-sm:text-sm`}
					>
						Decline <span>[0]</span>
					</div>
					<div
						onClick={() => setFilteredAd('draft')}
						className={`${
							filteredAd === 'draft'
								? 'bg-primary text-white lg:py-2 lg:px-6 py-1 px-4'
								: ' lg:py-2 lg:px-6 py-1 px-4'
						} cursor-pointer max-sm:text-sm`}
					>
						Draft <span>[2]</span>
					</div>
					<div
						onClick={() => setFilteredAd('closed')}
						className={`${
							filteredAd === 'closed'
								? 'bg-primary text-white lg:py-2 lg:px-6 py-1 px-4'
								: 'text-black/50 lg:py-2 lg:px-6 py-1 px-4'
						} cursor-pointer max-sm:text-sm`}
					>
						Closed <span>[7]</span>
					</div>
				</div>
				<div className="max-w-[400px] mx-auto">
					<Link to={Approutes.dashboard.performance}>
						<Button variant={'primary'} size={'full'} className={'rounded-xl'}>
							Advert Performance
						</Button>
					</Link>
				</div>
			</div>
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-6">
				<AdCard />
				<AdCard />
				<AdCard />
				<AdCard />
				<AdCard />
				<AdCard />
				<AdCard />
				<AdCard />
			</div>
		</div>
	);
};

export default Adverts;

// status, images, item_name, price, promoted_till, reach, clicks, phone_views, chats

// adverts page data format from backend
/*
	[
		{
			item_name: '',
			price: '',
			status: '',
			item_images: [],
			promoted_till: '',
			reach: '',
			clicks: '',
			phone_views: '',
			chats: '',
		},
	]
*/
