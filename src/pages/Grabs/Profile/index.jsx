import React from 'react';
import { Button } from '../../../ui';
import {
	EditPencil,
	FacebookBlue,
	Instagram,
	ListArrow,
	Location,
	Tiktok,
	Twitter,
	Whatsapp,
} from '../../../assets/svgs';
import { ManSmiling, noimage } from '../../../assets/images';
import { HiOutlineStar, HiStar } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { ScrollToTop } from '../../../utils';
import GrabHeader from '../GrabHeader';

const GrabProfile = () => {
	return (
		<div>
			<GrabHeader text="GRABBER’S PROFILE" />
			{/* <Button
				className={'flex items-center gap-1 text-primary ml-auto my-4'}
				variant={'grey'}
				size={'small'}
			>
				<img src={EditPencil} className="w-3" alt="" /> <b> Edit..</b>
			</Button> */}

			<div className="flex max-lg:flex-col gap-6 mt-8">
				<div className=" w-full rounded-2xl border-4 border-gray-400 flex flex-col items-center mx-auto p-4">
					<img
						src={ManSmiling}
						className="w-[150px] h-[150px] md:w-[200px]  rounded-full md:h-[200px] border-2 border-primary"
						alt="/"
					/>
					<h4>Akindele Adams</h4>
					<div className="flex gap-2">
						<HiStar size={26} className="text-primary" />
						<HiStar size={26} className="text-primary" />
						<HiStar size={26} className="text-primary" />
						<HiStar size={26} className="text-primary" />
						<HiStar size={26} className="text-primary" />
						{/* <HiOutlineStar size={26} className="text-primary" />
						<HiOutlineStar size={26} className="text-primary" /> */}
					</div>
					<div className="flex items-center gap-2">
						<img src={Location} alt="/" className="w-3" />
						<p className="">Ikeja, Lagos State.</p>
					</div>
					<div className="flex items-center gap-2 mt-4">
						<Link>
							<img src={Twitter} alt={`Go to twitter`} className="w-8" />
						</Link>
						<Link>
							<img src={FacebookBlue} alt={`Go to twitter`} className="w-8" />
						</Link>
						<Link>
							<img src={Whatsapp} alt={`Go to twitter`} className="w-8" />
						</Link>
						<Link>
							<img src={Tiktok} alt={`Go to twitter`} className="w-8" />
						</Link>
						<Link>
							<img src={Instagram} alt={`Go to twitter`} className="w-8" />
						</Link>
					</div>

					<div>
						<div className="flex items-center gap-2 my-8">
							<p className="p-lg">Grab ID:</p>
							<p className="text-primary p-lg">KKelvin.is.ng</p>
						</div>

						<p className="p-lg">2 Years since Joined</p>
					</div>
				</div>

				<div className=" w-full rounded-2xl border-4 border-gray-400 flex flex-col items-center mx-auto p-4">
					<h4>About Me</h4>
					<p className=" text-justify">
						I have Bachelors in marketing with five (5) years of cognitive experience. i have performed
						greatly in this space, on and offline. My approach to marketing is un-matched, as i combine
						alot of parameters to achieving my goals. What is important to me is goals set and met. I
						highlighted my area of strength for productive delivery of my service. I believe with my
						promptness, duggedness and relentless efforts towards pushing your products and services out
						there. For me, It’s a WIN-WIN.
					</p>
				</div>

				{/* <div className="mx-auto md:w-[500px] w-full flex flex-col items-start">
					<h4 className="">Grab Interest(s)</h4>

					<ul className="my-4">
						<li className="flex gap-2">
							<img src={ListArrow} alt="/" className="w-3" />
							Automobile
						</li>
						<li className="flex gap-2">
							<img src={ListArrow} alt="/" className="w-3" />
							Agriculture
						</li>
						<li className="flex gap-2">
							<img src={ListArrow} alt="/" className="w-3" />
							Electronics
						</li>
						<li className="flex gap-2">
							<img src={ListArrow} alt="/" className="w-3" />
							Fashion
						</li>
					</ul>

					<button className="flex items-center gap-2 mb-4">
						<div className="flex items-center justify-center w-6 h-6 text-2xl border border-gray-400 text-primary">
							<span>+</span>
						</div>
						<div>Add more</div>
					</button>
				</div>

				<div className="mx-auto flex flex-col gap-4 md:w-[500px] w-full my-6">
					<Button variant={'plain'} className={'border-2 border-black/50 shadow-none '}>
						Message
					</Button>
					<Button variant={'plain'} className={'border-2 border-black/50 shadow-none '}>
						Connect
					</Button>
				</div> */}
			</div>
			<ScrollToTop />
		</div>
	);
};

export default GrabProfile;
