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
	console.log(ads);

	return (
		<div className="max-w-[1224px] mx-auto px-4 my-10">
			<div className="px-2 py-6 mb-12 space-y-8 border lg:px-8 border-black/30 rounded-3xl">
				<div className="flex flex-wrap items-center justify-between">
					<div
						onClick={() => setFilteredAd('all')}
						className={`${filteredAd === 'all'
							? 'bg-primary text-white lg:py-2 lg:px-6 py-1 px-4'
							: 'lg:py-2 lg:px-6 py-1 px-4'
							} cursor-pointer max-sm:text-sm`}
					>
						All <span>[{ads?.total_ads}]</span>
					</div>
					<div
						onClick={() => setFilteredAd('active')}
						className={`${filteredAd === 'active'
							? 'bg-primary text-white lg:py-2 lg:px-6 py-1 px-4'
							: 'text-green-500 lg:py-2 lg:px-6 py-1 px-4'
							} cursor-pointer max-sm:text-sm`}
					>
						Active <span>[{ads?.active_ads?.length || 0}]</span>
					</div>
					{/* <div
						onClick={() => setFilteredAd('reviewing')}
						className={`${filteredAd === 'reviewing'
							? 'bg-primary text-white lg:py-2 lg:px-6 py-1 px-4'
							: 'text-secondary lg:py-2 lg:px-6 py-1 px-4'
							} cursor-pointer max-sm:text-sm`}
					>
						Reviewing <span>[0]</span>
					</div> */}
					<div
						onClick={() => setFilteredAd('blocked')}
						className={`${filteredAd === 'blocked'
							? 'bg-primary text-white lg:py-2 lg:px-6 py-1 px-4'
							: 'text-[#D60949] lg:py-2 lg:px-6 py-1 px-4'
							} cursor-pointer max-sm:text-sm`}
					>
						Blocked <span>[{ads?.blocked_ads?.length || 0}]</span>
					</div>
					{/* <div
						onClick={() => setFilteredAd('draft')}
						className={`${filteredAd === 'draft'
							? 'bg-primary text-white lg:py-2 lg:px-6 py-1 px-4'
							: ' lg:py-2 lg:px-6 py-1 px-4'
							} cursor-pointer max-sm:text-sm`}
					>
						Draft <span>[2]</span>
					</div> */}
					<div
						onClick={() => setFilteredAd('sold')}
						className={`${filteredAd === 'sold'
							? 'bg-primary text-white lg:py-2 lg:px-6 py-1 px-4'
							: 'text-black/50 lg:py-2 lg:px-6 py-1 px-4'
							} cursor-pointer max-sm:text-sm`}
					>
						Closed <span>[{ads?.sold_ads?.length || 0}]</span>
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
					{(ads && ads?.total_ads > 0) ? (filteredAd === 'active' ? adsData?.map((ad) => (
						<AdCard
							key={ad?.id}
							title={ad?.title}
							images={ad?.images}
							active={ad?.active}
							price={ad?.price}
							views={ad.views}
							subscribe={ad?.subscribe}
							adId={ad?.id}
							chats={ad?.chats}
							paid={ad?.paid}
						/>
					)) : filteredAd === 'blocked' ? ads?.blocked_ads?.map((ad) => (
						<AdCard
							key={ad?.id}
							title={ad?.title}
							images={ad?.images}
							active={ad?.active}
							price={ad?.price}
							views={ad.views}
							subscribe={ad?.subscribe}
							adId={ad?.id}
							chats={ad?.chats}
							paid={ad?.paid}

						/>
					)) : filteredAd === 'sold' ? ads?.sold_ads?.map((ad) => (
						<AdCard
							key={ad?.id}
							title={ad?.title}
							images={ad?.images}
							active={ad?.active}
							price={ad?.price}
							views={ad.views}
							subscribe={ad?.subscribe}
							adId={ad?.id}
							chats={ad?.chats}
							paid={ad?.paid}
						/>
					)) : [...(ads?.sold_ads ?? []),
					...(ads?.active_ads ?? []),
					...(ads?.blocked_ads ?? [])].sort((a, b) => b.id - a.id).map((ad) => (
						<AdCard
							key={ad?.id}
							title={ad?.title}
							images={ad?.images}
							active={ad?.active}
							price={ad?.price}
							views={ad.views}
							subscribe={ad?.subscribe}
							adId={ad?.id}
							chats={ad?.chats}
							paid={ad?.paid}
						/>
					))) : (
						<div>
							<p className="text-center font-bold">Sorry, You don't have any Advert yet. Please post one.</p>
						</div>)}
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
