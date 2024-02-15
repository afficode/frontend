import { useState } from 'react';
import AdCard from './AdCard';
import { Button } from '../../../ui';
import { Link } from 'react-router-dom';
import { Approutes } from '../../../constants';
import { useMyAds } from '../../../hooks';
import { ScrollToTop } from '../../../utils';
import LoadingScreen from './LoadingScreen';

const Adverts = () => {
	const [filteredAd, setFilteredAd] = useState('all');

	const { data: ads, isLoading } = useMyAds();

	const adsData = ads?.active_ads.sort((a, b) => b.id - a.id);
	// console.log(adsData);

	return (
		<div className="max-w-[1224px] mx-auto px-4 my-10">
			<div className="px-2 py-6 mb-12 space-y-8 border lg:px-8 border-black/30 rounded-3xl">
				<div className="flex flex-wrap items-center justify-between">
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
			{isLoading ? (
				<LoadingScreen />
			) : (
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
					{adsData?.map((ad) => (
						<AdCard
							key={ad?.id}
							title={ad?.title}
							images={ad?.images}
							active={ad?.active}
							price={ad?.price}
							views={ad.views}
							subscribe={ad?.subscribe}
							adId={ad?.id}
						/>
					))}
				</div>
			)}

			<ScrollToTop />
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
