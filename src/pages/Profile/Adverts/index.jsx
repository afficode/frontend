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

    const adsData = ads?.active_ads.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

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
						All <span>[{ads?.total_ads}]</span>
                    </div>
                    <div
                        onClick={() => setFilteredAd('active')}
                        className={`${
                            filteredAd === 'active'
                                ? 'bg-primary text-white lg:py-2 lg:px-6 py-1 px-4'
                                : 'text-green-500 lg:py-2 lg:px-6 py-1 px-4'
                        } cursor-pointer max-sm:text-sm`}
                    >
						Active <span>[{ads?.active_ads.length || 0}]</span>
                    </div>
                    <div
                        onClick={() => setFilteredAd('in_review')}
                        className={`${
                            filteredAd === 'in_review'
                                ? 'bg-primary text-white lg:py-2 lg:px-6 py-1 px-4'
                                : 'text-primary lg:py-2 lg:px-6 py-1 px-4'
                        } cursor-pointer max-sm:text-sm`}
                    >
						In Review <span>[{ads?.processing_ads.length || 0}]</span>
                    </div>
                    <div
                        onClick={() => setFilteredAd('blocked')}
                        className={`${
                            filteredAd === 'blocked'
                                ? 'bg-primary text-white lg:py-2 lg:px-6 py-1 px-4'
                                : 'text-[#D60949] lg:py-2 lg:px-6 py-1 px-4'
                        } cursor-pointer max-sm:text-sm`}
                    >
						Blocked <span>[{ads?.blocked_ads.length || 0}]</span>
                    </div>
                    <div
                        onClick={() => setFilteredAd('sold')}
                        className={`${
                            filteredAd === 'sold'
                                ? 'bg-primary text-white lg:py-2 lg:px-6 py-1 px-4'
                                : 'text-black/50 lg:py-2 lg:px-6 py-1 px-4'
                        } cursor-pointer max-sm:text-sm`}
                    >
						Closed <span>[{ads?.sold_ads.length || 0}]</span>
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
                    {ads && ads.total_ads > 0 ? (
                        filteredAd === 'active' ? (
                            adsData
                                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                .map((ad) => (
                                    <AdCard
                                        key={ad.id}
                                        title={ad.title}
                                        images={ad.images}
                                        active={ad.active}
                                        price={ad.price}
                                        views={ad.views}
                                        adId={ad.id}
                                        chats={ad.chats}
                                        available={ad.available}
                                        feature={ad.feature}
                                        grab_activity={ad.grab_activity}
                                    />
                                ))
                        ) : filteredAd === 'blocked' ? (
                            ads.blocked_ads
                                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                .map((ad) => (
                                    <AdCard
                                        key={ad.id}
                                        title={ad.title}
                                        images={ad.images}
                                        active={ad.active}
                                        price={ad.price}
                                        views={ad.views}
                                        adId={ad.id}
                                        chats={ad.chats}
                                        available={ad.available}
                                        feature={ad.feature}
                                        grab_activity={ad.grab_activity}
                                    />
                                ))
                        ) : filteredAd === 'in_review' ? (
                            ads.processing_ads
                                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                .map((ad) => (
                                    <AdCard
                                        key={ad.id}
                                        title={ad.title}
                                        images={ad.images}
                                        active={ad.active}
                                        price={ad.price}
                                        views={ad.views}
                                        adId={ad.id}
                                        chats={ad.chats}
                                        available={ad.available}
                                        feature={ad.feature}
                                        grab_activity={ad.grab_activity}
                                    />
                                ))
                        ) : filteredAd === 'sold' ? (
                            ads.sold_ads
                                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                .map((ad) => (
                                    <AdCard
                                        key={ad.id}
                                        title={ad.title}
                                        images={ad.images}
                                        active={ad.active}
                                        price={ad.price}
                                        views={ad.views}
                                        adId={ad.id}
                                        chats={ad.chats}
                                        available={ad.available}
                                        feature={ad.feature}
                                        grab_activity={ad.grab_activity}
                                    />
                                ))
                        ) : (
                            [
                                ...(ads.sold_ads ?? []),
                                ...(ads.active_ads ?? []),
                                ...(ads.blocked_ads ?? []),
                                ...(ads.processing_ads ?? []),
                            ]
                                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                .map((ad) => (
                                    <AdCard
                                        key={ad.id}
                                        title={ad.title}
                                        images={ad.images}
                                        active={ad.active}
                                        price={ad.price}
                                        views={ad.views}
                                        adId={ad.id}
                                        chats={ad.chats}
                                        available={ad.available}
                                        feature={ad.feature}
                                        grab_activity={ad.grab_activity}
                                    />
                                ))
                        )
                    ) : (
                        <div>
                            <p className="text-center font-bold">
								Sorry, You don't have any Advert yet. Please post one.
                            </p>
                        </div>
                    )}
                </div>
            )}

            <ScrollToTop />
        </div>
    );
};

export default Adverts;
