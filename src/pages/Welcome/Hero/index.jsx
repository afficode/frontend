import { Link } from 'react-router-dom';

// icons
import { AiOutlineInfo } from 'react-icons/ai';

const Hero = () => {
	const firstTimer = true;

	return (
		<section className=" bg-blue flex flex-col gap-12 py-12 px-2 sm:px-8 m-2 rounded-md">
			<h1 className="max-sm:text-center text-white">Welcome, Gideon</h1>
			<span className="block text-white text-center text-base md:text-xl">
				Tons of opportunities await you!. <br />
				Please choose your next action below.
			</span>

			<div className="max-w-full flex flex-col md:flex-row gap-4 mx-auto">
				<div className={firstTimer ? 'dropdown dropdown-top dropdown-hover' : ''}>
					<Link to={''}>
						<button className="btn w-[15rem] text-lg rounded-xl shadow-lg capitalize hover:bg-yellow/80 bg-yellow border-none">
							Set up a Shop Now
						</button>
					</Link>

					<div
						tabIndex={0}
						className={
							firstTimer
								? `dropdown-content transform -translate-x-[18%] min-h-fit w-[22rem]  z-[10] p-6 bg-white shadow-md rounded-3xl`
								: 'hidden'
						}
					>
						<div className="w-[3.2rem] h-[3.2rem] bg-blue flex justify-center items-center border-yellow border-4 rounded-full absolute right-0 top-[-1rem]">
							<AiOutlineInfo size={34} className="text-white" />
						</div>
						<h4 className="text-blue text-center whitespace-nowrap">Setting Up A Shop</h4>
						<div className="pt-2">
							<p className="mb-2">It takes less than 5-mins to set up your account for success on AFFI.</p>
							<span className="max-sm:text-sm">Benefits;</span>
							<ul className="flex flex-col pl-6 list-disc pt-0 max-sm:text-sm text-base">
								<li>We drive clients to your store, constantly</li>
								<li>You can have as many stores as you would like.</li>
								<li>Monthly low-rate subscription.</li>
								<li>And so on.</li>
							</ul>
						</div>
					</div>
				</div>

				<div className={firstTimer ? 'dropdown dropdown-top dropdown-hover' : ''}>
					<Link to={''}>
						<button className="btn w-[15rem] text-lg rounded-xl shadow-lg capitalize text-white hover:bg-opacity-95 border-white grab-btn">
							I am a Grabber
						</button>
					</Link>

					<div
						tabIndex={0}
						className={
							firstTimer
								? `dropdown-content transform -translate-x-[18%] min-h-fit w-[22rem]  z-[10] p-6 bg-white shadow-md rounded-3xl`
								: 'hidden'
						}
					>
						<div className="w-[3.2rem] h-[3.2rem] bg-blue flex justify-center items-center border-yellow border-4 rounded-full absolute right-0 top-[-1rem]">
							<AiOutlineInfo size={34} className="text-white" />
						</div>
						<h4 className=" text-blue text-center whitespace-nowrap">Becoming A Grabber</h4>
						<div className="pt-2  ">
							<p className="mb-2 ">As a grabber, you can do the following:</p>
							<ul className="flex flex-col pl-6 list-disc pt-0 max-sm:text-sm text-base">
								<li>
									Pick products/items and market on featured page or as the case may be, for share of the
									sale.
								</li>
								<li>
									You can communicate with product/item owner directly to advise, discuss more on product
									picked for marketing.
								</li>
								<li>You make steady, passive income as a Grabber.</li>
							</ul>
						</div>
					</div>
				</div>

				<div className={firstTimer ? 'dropdown dropdown-top dropdown-hover' : ''}>
					<Link to={''}>
						<button className="btn w-[15rem] text-lg rounded-xl shadow-lg capitalize hover:bg-white/80 bg-white border-none">
							Quick Post
						</button>
					</Link>

					<div
						tabIndex={0}
						className={
							firstTimer
								? `dropdown-content transform -translate-x-[18%] min-h-fit w-[22rem]  z-[10] p-6 bg-white shadow-md rounded-3xl`
								: 'hidden'
						}
					>
						<div className="w-[3.2rem] h-[3.2rem] bg-blue flex justify-center items-center  border-yellow border-4 rounded-full absolute right-0 top-[-1rem]">
							<AiOutlineInfo size={34} className="text-white" />
						</div>
						<h4 className=" text-blue text-center whitespace-nowrap">Quick Post</h4>
						<div className="pt-2">
							<p className="mb-4">I have an item/product to post for sale, Quickly.</p>
							<p className="mb-4">Please click the Quick post to enlist your product on this platform.</p>
							<p className="mb-4">
								Be rest assured that your product won’t be sitting around for too long.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
