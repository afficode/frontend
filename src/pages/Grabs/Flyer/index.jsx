import { BoonfuLogo } from '../../../assets/images';
import { useParams } from 'react-router-dom';
import { Button } from '../../../ui';
import { useCallback, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { ScrollToTop, toMoney } from '../../../utils';
import { fetchProduct, useNotify } from '../../../hooks';
import { SpinnerSkeleton } from '../../../components';

const GrabFlyer = () => {
	const { ad_id } = useParams();
	const contentRef = useRef(null);
	const notify = useNotify();
	const [isLoading, setIsLoading] = useState(false);
	const { data: ad, isAdLoading, isError } = fetchProduct(ad_id);

	const handlePrint = useCallback(() => {
		setIsLoading(true);

		if (contentRef.current === null) {
			return;
		}
		// notify(
		// 	"Note: Mozilla Firefox browser doesn't generate flyer well. Please use Chromium browsers like Edge, Chrome, Brave etc.",
		// 	'Info',
		// 	{ timeout: 4000 }
		// );

		const node = contentRef.current;
		const width = node.scrollWidth;
		const height = node.scrollHeight;

		const timeout = setTimeout(() => {
			toPng(node, {
				cacheBust: true,
				width,
				height, // natural height
				style: {
					height: `${height}px`,
					transform: 'none', 
					maxWidth: 'unset', 
				},
			})
				.then((dataUrl) => {
					const link = document.createElement('a');
					link.download = `${ad?.data?.title}-BF.png`;
					link.href = dataUrl;
					link.click();
					setIsLoading(false);
				})
				.catch((err) => {
					notify('An error occured while trying to print', 'error');
					setIsLoading(false);
				});
		}, 4000);

		return () => clearTimeout(timeout);
	}, [contentRef]);

	if (isAdLoading) {
		return (
			<div className="h-screen">
				<SpinnerSkeleton />
			</div>
		);
	} else if (isError) {
		return <div className="h-screen">Product not found</div>;
	}

	return (
		<section className="px-8 py-24 bg-gray-200 ">
			<div className="w-full h-full lg:w-[800px] mx-auto">
				<div ref={contentRef} className="flex flex-1  flex-col  bg-primary px-8 py-4">
					<div className="mb-6">
						<img src={BoonfuLogo} className="w-16" alt="Boonfu Logo" />
					</div>

					<div className="flex flex-col items-center gap-4 mb-2">
						<div className="w-full text-center bg-white border-4 border-secondary rounded-3xl p-2">
							<h3 className="font-bold uppercase">{ad?.data?.title}</h3>
						</div>

						<div className="bg-white w-max h-max flex items-center justify-center border-2 border-secondary ">
							<img
								src={ad?.data?.images[0]?.path}
								className="h-[347px] w-full max-sm:h-full max-sm:w-full  object-cover"
								alt={ad?.data?.title}
							/>
						</div>
					</div>

					<div className="flex items-start justify-between mb-4">
						<div className="flex-1">
							<p className="text-white font-bold text-2xl capitalize">{ad?.data?.ad_condition}</p>
							<p className="text-white font-bold text-2xl capitalize">{ad?.data?.transmission}</p>
							<p className="text-white font-bold text-2xl capitalize">
								{ad?.data?.mileage
									? `Mileage: ${toMoney(ad?.data?.mileage)}km`
									: ad?.data?.vehicle_features
									? ad?.data?.vehicle_features[0]
									: ad?.data?.make}
							</p>
						</div>
						<div className="flex-1 flex flex-col items-start w-full">
							<p className="w-full px-2 py-1 border-2 border-white text-white font-bold text-2xl">
								Price: ₦{toMoney(ad?.data?.price, true)}
							</p>
							<p className="text-white font-bold text-2xl capitalize">{ad?.data?.color}</p>
						</div>
					</div>

					<div className="bg-gray-200 p-2 text-center text:lg sm:text-2xl  mb-4">
						100% Accident free, xSE Fullest option.....
					</div>

					<div className="text-center  font-thin text-white">
						<p className="text-2xl">Click on the link below or visit:</p>
						<p className="text-2xl">www.boonfu.com</p>
					</div>
				</div>

				<div className="w-full mt-12 text-center">
					<Button variant={'primary'} onClick={handlePrint} disabled={isLoading} loading={isLoading}>
						Print
					</Button>
				</div>

				<ScrollToTop />
			</div>
		</section>
	);
};

export default GrabFlyer;
