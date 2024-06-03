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
					console.log(err);
					notify('An error occured while trying to print', 'error');
					setIsLoading(false);
				});
		}, 4000);

		return () => clearTimeout(timeout);
	}, [contentRef]);

	return (
		<div className="px-8 py-24 bg-gray-200">
			<div ref={contentRef} className="grid flex-1 w-full grid-cols-2 mx-auto ">
				<div className="flex flex-col p-6 bg-secondary ">
					<div className="mb-6">
						<img src={BoonfuLogo} className="w-16" alt="Boonfu Logo" />
					</div>

					<div className="flex flex-col items-center gap-4">
						<div className="bg-white w-[350px] h-[320px] flex items-center justify-center border-4 border-primary rounded-3xl">
							{' '}
							<img src={CarBlack} className="w-full p-6" alt="" />
						</div>
						<div className="bg-white w-[350px] h-[320px] flex items-center justify-center border-4 border-primary rounded-3xl">
							{' '}
							<img src={CarBlack} className="w-full p-6 " alt="" />
						</div>
					</div>

					<div className="flex flex-col gap-4 items-center my-6 w-[350px] mx-auto">
						<div className="w-full p-3 font-semibold text-center text-black border-4 border-primary">
							More Pictures
						</div>
						<img src={ArrowDown} className="w-6" alt="/" />
						<div className="flex items-center gap-2 font-semibold text-black">
							<img src={Web} className="w-8" alt="/" />
							<Link to={'/'}>www.boonfu.com</Link>
						</div>
					</div>
				</div>

				<div className="flex flex-col justify-between flex-1 h-full px-8 py-6 flyer-bg">
					<div className="ml-auto font-semibold text-black/9">Grabber id : T0006</div>

					<div className="space-y-8 mb-[6rem]">
						<div className="relative px-6 py-[2rem] space-y-2 font-semibold text-black">
							<div className="absolute top-0 left-0 w-full h-[4rem] border-4 border-b-0 border-primary" />

							<h1>2015 Lexus GX460</h1>
							<div className="flex gap-4 divide-x-2 divide-black wrap ml-[-1rem]">
								<span className="pl-4 uppercase whitespace-nowrap">foreign used</span>
								<span className="pl-4 uppercase">automatic</span>
							</div>
							<div className="flex items-center gap-2 whitespace-nowrap">
								<img src={Location} className="w-4" alt="/" />
								<span className="uppercase">Ikeja, Lagos</span>
							</div>
							<div className="absolute bottom-0 left-0 w-full h-[4rem] border-4 border-t-0 border-primary" />
						</div>

						<div className="space-y-2">
							<div className="w-full p-3 text-xl font-semibold text-center text-black border-4 border-primary">
								PRICE: 26,000,000.00
							</div>
							<div className="flex items-center gap-2 text-black">
								<span className="p-[.7rem] bg-primary"></span> <p className="p-lg">Negotiable</p>
							</div>
						</div>
					</div>

					<div className="flex flex-col gap-8 py-6">
						<p className="text-center text-black p-lg">
							For more Inquiries about this post, kindly click the below button or search the web
							www.boonfu.com with the ID at the top corner of this post.
						</p>
						<Button variant={'primary'} className={'rounded-full font-semibold'}>
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
