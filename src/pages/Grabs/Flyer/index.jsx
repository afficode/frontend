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

		const node = contentRef.current;

		// 3.6 inches at 300 DPI = 1080px
		const targetSize = 600;

		const timeout = setTimeout(() => {
			toPng(node, {
				cacheBust: true,
				width: targetSize,
				height: targetSize,
				pixelRatio: 1,
				style: {
					width: `${targetSize}px`,
					height: `${targetSize}px`,
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
					console.error(err);
				});
		}, 4000);

		return () => clearTimeout(timeout);
	}, [contentRef, ad?.data?.title, notify]);

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
		<section className="px-8 py-24 bg-gray-200 min-h-screen flex items-center justify-center">
			<div className="w-full max-w-2xl mx-auto">
				<div
					ref={contentRef}
					className="flex flex-col bg-primary p-4"
					style={{ width: '600px', height: '600px' }}
				>
					{/* Logo - Compact */}
					<div className="mb-2">
						<img src={BoonfuLogo} className="w-10 h-10" alt="Boonfu Logo" />
					</div>

					{/* Title - Compact */}
					<div className="w-full text-center bg-white border-2 border-secondary rounded-2xl py-1 px-2 mb-2">
						<h3 className="font-bold uppercase text-sm leading-tight">{ad?.data?.title}</h3>
					</div>

					{/* Main Image - Takes most space */}
					<div
						className="bg-white flex items-center justify-center border-2 border-secondary mb-2"
						style={{ height: '340px' }}
					>
						<img
							src={ad?.data?.images[0]?.path}
							className="w-full h-full object-cover"
							alt={ad?.data?.title}
						/>
					</div>

					{/* Details Section - Compact two columns */}
					<div className="flex gap-2 mb-2">
						<div className="flex-1 text-white space-y-0.5">
							<p className="font-bold text-xs leading-tight capitalize">{ad?.data?.ad_condition}</p>
							<p className="font-bold text-xs leading-tight capitalize">{ad?.data?.transmission}</p>
							<p className="font-bold text-xs leading-tight capitalize">
								{ad?.data?.mileage
									? `${toMoney(ad?.data?.mileage)}km`
									: ad?.data?.vehicle_features
									? ad?.data?.vehicle_features[0]
									: ad?.data?.make}
							</p>
						</div>
						<div className="flex-1 text-white space-y-0.5">
							<p className="px-2 py-0.5 border border-white font-bold text-xs leading-tight">
								₦{toMoney(ad?.data?.price, true)}
							</p>
							<p className="font-bold text-xs leading-tight capitalize">{ad?.data?.color}</p>
						</div>
					</div>

					{/* Description - Compact */}
					<div className="bg-gray-200 py-1 px-2 text-center text-xs mb-2">
						100% Accident free, xSE Fullest option
					</div>

					{/* Footer - Compact */}
					<div className="text-center text-white">
						<p className="text-xs leading-tight">Visit: www.boonfu.com</p>
					</div>
				</div>

				<div className="w-full mt-8 text-center">
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
