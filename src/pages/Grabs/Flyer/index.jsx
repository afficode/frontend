import { BoonfuLogo, CarBlack } from '../../../assets/images';
import { ArrowDown, Location, Web } from '../../../assets/svgs';
import { Link } from 'react-router-dom';
import { Button } from '../../../ui';
import { useCallback, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { ScrollToTop } from '../../../utils';
import { useNotify } from '../../../hooks';

const GrabFlyer = () => {
	const contentRef = useRef(null);
	const notify = useNotify();
	const [isLoading, setIsLoading] = useState(false);

	const handlePrint = useCallback(() => {
		setIsLoading(true);

		if (contentRef.current === null) {
			return;
		}
		notify(
			"Note: Mozilla Firefox browser doesn't generate flyer well. Please use Chromium browsers like Edge, Chrome, Brave etc.",
			'Info',
			{ timeout: 4000 }
		);

		const timeout = setTimeout(() => {
			toPng(contentRef.current, { cacheBust: true })
				.then((dataUrl) => {
					const link = document.createElement('a');
					link.download = 'my-image-name.png';
					link.href = dataUrl;
					link.click();
					setIsLoading(false);
				})
				.catch((err) => {
					// console.log(err);
					notify('An error occured while trying to print', 'error');
					setIsLoading(false);
				});
		}, 4000);

		return () => clearTimeout(timeout);
	}, [contentRef]);

	return (
		<div className="px-8 py-24 bg-gray-200">
			<div ref={contentRef} className="grid flex-1 w-full lg:w-[1050px] grid-cols-2 mx-auto ">
				<div className="flex flex-col p-3 sm:p-6 bg-secondary ">
					<div className="mb-6">
						<img src={BoonfuLogo} className="w-16" alt="Boonfu Logo" />
					</div>

					<div className="flex flex-col items-center gap-4">
						<div className="bg-white max-w-[350px] max-h-[320px] flex items-center justify-center border-4 border-primary rounded-3xl">
							{' '}
							<img src={CarBlack} className="w-full p-6" alt="" />
						</div>
						<div className="bg-white max-w-[350px] max-h-[320px] flex items-center justify-center border-4 border-primary rounded-3xl">
							{' '}
							<img src={CarBlack} className="w-full p-6 " alt="" />
						</div>
					</div>

					<div className="flex flex-col gap-4 items-center my-6 max-w-[350px] mx-auto">
						<div className="w-full p-3 font-semibold text-center text-black border-4 border-primary">
							More Pictures
						</div>
						<img src={ArrowDown} className="sm:w-6 w-4" alt="/" />
						<div className="flex items-center gap-2 font-semibold text-black">
							<img src={Web} className="w-8" alt="/" />
							<Link to={'/'}>www.boonfu.com</Link>
						</div>
					</div>
				</div>

				<div className="flex flex-col justify-between flex-1 h-full px-4 sm:px-8 py-3 sm:py-6 flyer-bg">
					<div className="ml-auto font-semibold text-black/9 max-sm:text-xs">Grabber id : T0006</div>

					<div className="space-y-8 mb-[6rem]">
						<div className="relative w-full px-2 sm:px-6 py-3 sm:py-[2rem] space-y-2 font-semibold text-black">
							<div className="absolute top-0 left-0 w-full h-[4rem] border-[2.5px] sm:border-4 sm:border-b-0 border-b-0 border-primary" />

							<h1 className="sm:block hidden">2015 Lexus GX460</h1>
							<h2 className="sm:hidden">2015 Lexus GX460</h2>

							<div className="flex sm:divide-x-2 sm:divide-black flex-wrap ml-[-1rem] max-sm:text-xs">
								<span className="px-4 uppercase whitespace-nowrap">foreign used</span>
								<span className="px-4 uppercase">automatic</span>
							</div>
							<div className="flex items-center gap-2 whitespace-nowrap max-sm:text-xs">
								<img src={Location} className="sm:w-4 w-3" alt="/" />
								<span className="uppercase">Ikeja, Lagos</span>
							</div>
							<div className="absolute bottom-0 left-0 w-full h-[4rem] border-[2.5px] border-t-0 sm:border-4 sm:border-t-0 border-primary" />
						</div>

						<div className="space-y-2">
							<div className="w-full py-3 px-2 text-xl font-semibold text-center text-black border-[2.5px] sm:border-4 border-primary max-sm:text-xs ">
								PRICE: 26,000,000.00
							</div>
							<div className="flex items-center gap-2 text-black">
								<span className="p-[.5rem] sm:p-[.7rem] bg-primary"></span>{' '}
								<p className="sm:p-lg">Negotiable</p>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-8 py-6">
						<p className="text-center text-black sm:p-lg">
							For more Inquiries about this post, kindly click the below button or search the web
							www.boonfu.com with the ID at the top corner of this post.
						</p>
						<Button variant={'primary'} className={'rounded-full font-semibold max-sm:text-xs'}>
							CLICK HERE
						</Button>
					</div>
				</div>
			</div>

			<div className="w-full mt-12 text-center">
				<Button variant={'primary'} onClick={handlePrint} disabled={isLoading}>
					Print
				</Button>
			</div>

			<ScrollToTop />
		</div>
	);
};

export default GrabFlyer;
