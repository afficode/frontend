import { useEffect } from 'react';
import { Advertise, JoinUs } from '../../assets/svgs';
import { ScrollToTop } from '../../utils';
import { useLocation } from 'react-router-dom';

const AboutUs = () => {
	const { hash } = useLocation();

	useEffect(() => {
		if (hash) {
			const element = document.querySelector(hash);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}
	}, [hash]);

	return (
		<section className="w-full mb-12">
			<div className="pt-1">
				<div className=" py-12 px-4 sm:px-[4rem] m-2 rounded-md about">
					<h1 className="text-center text-white uppercase">About Us</h1>
				</div>
			</div>

			{/* our story */}
			<div id="about-us" className={`${sectionStyles} scroll-mt-[92px] flex flex-col gap-4`}>
				<h3 className="text-primary">About Boonfu</h3>

				<p>
					Welcome to Boonfu.ng, your premier online marketplace in Nigeria, Africa, where convenience
					meets quality. At Boonfu.ng, we are more than just a platform; we are a community-driven
					marketplace committed to empowering people (Grabbers), local businesses and connecting buyers
					with a diverse range of products and services. Founded with the vision of revolutionizing the
					online marketplace landscape in Nigeria, Boonfu.ng is dedicated to providing a seamless
					shopping experience tailored to the unique needs and preferences of our customers. Whether
					you're searching for cars & vehicles, fashion-forward apparel, artisanal crafts, cutting-edge
					electronics, or essential everyday items, Boonfu.ng offers a comprehensive selection to cater
					to every lifestyle. What sets us apart is our unwavering commitment to fostering economic
					growth and sustainability within our local communities. By enlisting all that is to be sold,
					showcased and traded among the people of Nigeria and talented artisans there are, we not only
					promote indigenous craftsmanship but also contribute to the socio-economic development of our
					nation.
				</p>

				<p>
					Our platform is designed with user convenience in mind, featuring intuitive navigation, secure
					payment options, and responsive customer support to ensure a hassle-free enlisting of items &
					products and shopping experience from start to finish. Whether you're browsing from the comfort
					of your home or on the go, Boonfu.ng is your one-stop destination for all your day-to-day
					essentials and shopping needs. Join us in our mission to redefine online marketplace in
					Nigeria. Experience the convenience, diversity, and authenticity that Boonfu.ng has to offer,
					and become a part of our growing community today.
				</p>
			</div>

			<div
				className={`${sectionStyles}  flex justify-center gap-24 max-md:flex-col max-md:items-center`}
			>
				<div className="flex items-center gap-8 p-6 bg-gray-300 shadow-xl">
					<img src={Advertise} className="w-[6rem]" alt="/" />
					<h3>Advertise With Us</h3>
				</div>
				<div className="flex items-center gap-8 p-6 bg-gray-300 shadow-xl">
					<img src={JoinUs} className="w-[6rem]" alt="/" />
					<h3>Join Us</h3>
				</div>
			</div>

			{/* our vision and mission */}
			<div id="advertise" className={`${sectionStyles} scroll-mt-[92px] flex flex-col gap-4`}>
				<h3 className="text-primary">How Advertise with us works!</h3>
				<p>
					Explore how Boonfu.ng Marketplace can help you achieve your advertising objectives and connect
					with a highly receptive audience. Jump on the “Post an Ad” and begin your journey toward
					enhanced brand visibility, quick sales and right engagement.
				</p>

				<p>
					Boonfu.ng is a trusted platform dedicated to exploring the latest trends in fashion, vehicles
					and other products enlisted by entrepreneurs. With a commitment to continuously improve this
					site for the betterment of members and fostering community engagement, we empower our audience
					to stay informed and inspired in an ever-evolving digital landscape
				</p>

				<ol className="list-decimal list-inside">
					<h6 className="my-4 font-bold">Why Choose Boonfu.ng Marketplace?</h6>
					<li>
						<b>Targeted Audience</b>: Engage with a niche audience deeply interested in the product .
						enlisted, through unmatched algorithm this platform has been designed to.
					</li>
					<li>
						<b>Effective Reach</b>: Amplify your brand's visibility and products/items among influencers
						and early adopters who actively seek genuine services and products.
					</li>
					<li>
						<b>Flexible Options</b>: Choose from a range of advertising solutions tailored to meet your
						specific marketing goals and budget.
					</li>
					<li>
						<b>Authentic Engagement</b>: Benefit from genuine interactions and <b>feedback</b> from our .
						engaged community, ensuring your message resonates effectively.
					</li>
					<li>
						<b>Grab Feature</b>: Use the Grab feature to reach even audiences beyond Boonfu website,m
						guaranteeing almost instantaneous closing transactions.
					</li>
				</ol>

				<p>
					Boonfu is your one-stop leading marketplace where buying, selling and also making money takes
					place. We offering a curated selection of products and services that are most sought-after with
					reasonable prices. With a focus on genuine product and quality, handsomely rewarded commission
					on Grab-sales too, we provide a platform where consumers and brands converge to discover and
					explore the latest items there are on the market, this also boast of a stress-free,
					grab-and-post for commission system for all, to make good commissions on sales of products when
					re-shared for marketing purposes
				</p>
			</div>

			{/* our platform */}
			{/* <div className={`${sectionStyles} flex flex-col gap-8`}>
				<h3 className="text-center text-primary">Our Platform</h3>

				<div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
					<div className="px-8 py-8 border-r border-black/30">
						<span className="block text-4xl font-semibold text-primary">9.2m</span>
						<p>Lorem ipsum dolor sit amet.</p>
					</div>
					<div className="px-8 py-8 max-md:border-r max-md:border-black/30 lg:border-r lg:border-black/30">
						<span className="block text-4xl font-semibold text-primary">9.2m</span>
						<p>Lorem ipsum dolor sit amet.</p>
					</div>
					<div className="px-8 py-8 border-r border-black/30">
						<span className="block text-4xl font-semibold text-primary">9.2m</span>
						<p>Lorem ipsum dolor sit amet.</p>
					</div>
					<div className="px-8 py-8 max-md:border-r max-md:border-black/30">
						<span className="block text-4xl font-semibold text-primary">9.2m</span>
						<p>Lorem ipsum dolor sit amet.</p>
					</div>
					<div className="px-8 py-8 border-r border-black/30">
						<span className="block text-4xl font-semibold text-primary">9.2m</span>
						<p>Lorem ipsum dolor sit amet.</p>
					</div>
					<div className="px-8 py-8 max-md:border-r max-md:border-black/30 lg:border-r lg:border-black/30">
						<span className="block text-4xl font-semibold text-primary">9.2m</span>
						<p>Lorem ipsum dolor sit amet.</p>
					</div>
					<div className="px-8 py-8 border-r border-black/30">
						<span className="block text-4xl font-semibold text-primary">9.2m</span>
						<p>Lorem ipsum dolor sit amet.</p>
					</div>
					<div className="px-8 py-8 max-md:border-r max-md:border-black/30">
						<span className="block text-4xl font-semibold text-primary">9.2m</span>
						<p>Lorem ipsum dolor sit amet.</p>
					</div>
				</div>

				<div className="text-center ">
					<p className="font-thin">
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, perspiciatis! Sapiente
						dolorem libero dicta sint ut fugit odio vero quod.
					</p>

					<Button variant="subtle" size="small" className="my-4 font-semibold rounded-3xl">
						Advertise with us
					</Button>
				</div>
			</div> */}

			{/* why choose us */}
			<div id="jobs" className={`${sectionStyles} scroll-mt-[92px] flex flex-col gap-4`}>
				<h3 className="text-primary">Join us / Jobs</h3>
				<h6 className="font-bold ">Find Your Next Tech Career </h6>
				<p>
					Are you searching for exciting job opportunities in the tech industry? Boonfu Marketplace
					offers a dedicated platform where tech professionals, startups, and companies converge to
					discover and apply for rewarding positions.
				</p>

				<ol className="list-decimal list-inside">
					<h6 className="my-4 font-bold">Why Choose Boonfu Marketplace for Jobs?</h6>

					<li>
						<b>Tech-Centric Focus</b>: Access a curated selection of job openings specifically tailored
						for roles in technology, digital innovation, and entrepreneurship.
					</li>
					<li>
						<b>Diverse Opportunities</b>: Explore a variety of positions ranging from software development
						and engineering to marketing, UX/UI design, and more.
					</li>
					<li>
						<b>Startup Environment</b>: Connect with startups and innovative companies looking to hire
						dynamic talent to drive their growth and success.
					</li>
					<li>
						<b>Easy Application Process</b>: Apply directly through our platform, making job hunting
						streamlined and efficient.
					</li>
				</ol>

				<ul className="list-disc list-inside">
					<h6 className="my-4 font-bold">Benefits of Using Boonfu Marketplace</h6>

					<li>
						<b> Industry Insights</b>: Stay informed with insights into the latest trends and
						opportunities within the tech sector.
					</li>
					<li>
						<b>Networking Opportunities</b>: Build connections with industry professionals and expand your
						professional network.
					</li>
					<li>
						<b> Career Development</b>: Access resources and articles that empower you to excel in your
						tech career.
					</li>
				</ul>

				<ol className="list-decimal list-inside">
					<h6 className="my-4 font-bold">How to Explore Jobs on Boonfu Marketplace</h6>

					<li>
						<b>Create Your Profile</b>: Sign up and create your job seeker profile on Boonfu.ng.
					</li>
					<li>
						<b>Search and Apply</b>: Browse through job listings, filter by category or location, and
						apply to positions that match your skills and interests.
					</li>
					<li>
						<b>Stay Updated</b>: Receive notifications about new job postings and updates relevant to your
						job search.
					</li>
				</ol>

				<h6 className="mt-4 font-bold ">Start Your Career in Tech.</h6>
				<p>
					Whether you’re a seasoned professional or just starting out in the tech industry, Boonfu
					Marketplace is here to help you discover exciting opportunities and take your career to new
					heights.
				</p>
			</div>

			<ScrollToTop />
		</section>
	);
};

export default AboutUs;

const sectionStyles = 'px-[4rem] py-8 max-sm:px-4';
