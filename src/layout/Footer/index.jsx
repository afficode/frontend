import { Link } from 'react-router-dom';
import { Approutes } from '../../constants';

// icons
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
	return (
		<footer className="bg-primary mt-16">
			<section className=" w-full px-[1.5rem] lg:px-[4rem] max-w-[1380px] mx-auto">
				<div className=" text-white flex flex-col gap-[1.5rem] md:gap-[3rem] py-8">
					<div className="grid grid-cols-1 items-center gap-[1rem] md:gap-0 md:grid-cols-3 md:divide-x-4 divide-white">
						<div className="col-span-2 md:mr-[2rem] lg:mr-[8rem] space-y-2">
							<h3 className="text-start">Transact with peace of mind on Boonfu</h3>
							<p className="text-justify p-lg">
								Indigenous platform for listing; services, cars and vehicles, properties, own an online
								shop-saving you from the hassle of site building, Agency freelancing and enlisting items
								(goods and products) for transactional purposes.
							</p>
						</div>
						<div className="flex flex-col items-center justify-center gap-3 text-center">
							<h3>Social</h3>
							<div className="flex gap-4">
								<Link
									to={'https://web.facebook.com/profile.php?id=61550635179141'}
									rel="noopener noreferrer"
									target="_blank"
									className="hover:text-secondary"
								>
									<FaFacebook size={28} />
								</Link>
								<Link
									to={'https://twitter.com/affi_ng88124'}
									rel="noopener noreferrer"
									target="_blank"
									className="hover:text-secondary"
								>
									<FaTwitter size={28} />
								</Link>
								<Link
									to={'https://www.instagram.com/contactaffi/'}
									rel="noopener noreferrer"
									target="_blank"
									className="hover:text-secondary"
								>
									<FaInstagram size={28} />
								</Link>
							</div>
						</div>
					</div>

					{/* footer lists  */}
					<div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
						<ul className="flex flex-col ">
							<h6 className="px-2 md:px-8 text-2xl opacity-[.7] font-normal whitespace-nowrap mb-3">
								About US
							</h6>
							<li className={listStyles}>About Boonfu</li>
							<li className={listStyles}>Advertise With Us</li>
							<li className={listStyles}>Jobs</li>
							<li className={listStyles}>Media</li>
							<li className={listStyles}>Privacy Policy</li>
							<li className={listStyles}>Terms & Conditions</li>
						</ul>
						<div className="w-2 h-7 bg-white mx-auto max-lg:hidden"></div>
						<ul className="flex flex-col ">
							<h6 className="px-2 md:px-8 text-2xl opacity-[.7] font-normal whitespace-nowrap mb-3">
								Help & Support
							</h6>
							<li className={listStyles}>Contact Us</li>
							<li className={listStyles}>FAQs</li>
							<li className={listStyles}>Safety Guides</li>
						</ul>
						<div className="w-2 h-7 bg-white mx-auto max-lg:hidden"></div>
						<ul className="flex flex-col ">
							<h6 className="px-2 md:px-8 text-2xl opacity-[.7] font-normal whitespace-nowrap mb-3">
								Boonfu Extra
							</h6>
							<li className={listStyles}>Grab System</li>
							<li className={listStyles}>Logistics Services</li>
							<li className={listStyles}>My Shop</li>
						</ul>
					</div>

					{/* copyright */}
					<p className="text-center md:text-start">
						&copy; Copyright 2024{' '}
						<b>
							<Link to={'/'}>Boonfu.ng</Link>
						</b>
						. All rights reserved.
					</p>
				</div>
			</section>
		</footer>
	);
};

export default Footer;

const listStyles =
	'capitalize cursor-pointer text-white text-sm md:text-base font-medium py-[.3rem] px-2 md:px-8 hover:text-secondary transition-colors whitespace-nowrap';
