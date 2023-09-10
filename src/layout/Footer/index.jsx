import { Link } from 'react-router-dom';
import { Approutes } from '../../constants';

// icons
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
	return (
		<footer className="bg-blue">
			<section className=" w-full px-[1.5rem] lg:px-[4rem] max-w-[1380px] mx-auto">
				<div className="text-white flex flex-col gap-[1.5rem] md:gap-[3rem] py-8">
					<div className="grid grid-cols-1 items-center gap-[1rem] md:gap-0 md:grid-cols-3 md:divide-x-4 divide-white">
						<div className="col-span-2 md:mr-[2rem] lg:mr-[8rem] space-y-2">
							<h3 className="text-center md:text-start">Transact with peace of mind on Affi</h3>
							<p className="card-text">
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
									className="hover:text-yellow"
								>
									<FaFacebook size={28} />
								</Link>
								<Link
									to={'https://twitter.com/affi_ng88124'}
									rel="noopener noreferrer"
									target="_blank"
									className="hover:text-yellow"
								>
									<FaTwitter size={28} />
								</Link>
								<Link
									to={'https://www.instagram.com/contactaffi/'}
									rel="noopener noreferrer"
									target="_blank"
									className="hover:text-yellow"
								>
									<FaInstagram size={28} />
								</Link>
							</div>
						</div>
					</div>

					{/* footer lists  */}
					<ul className="flex flex-wrap items-center w-full divide-x-8 divide-white max-md:justify-center">
						<Link to={Approutes.aboutUs}>
							<li className={`${listStyles} md:pl-0 `}>About US</li>
						</Link>
						<Link to={'/'}>
							<li className={listStyles}>Agency Resources</li>
						</Link>
						<Link to={'/'}>
							<li className={listStyles}>Terms of Use</li>
						</Link>
						<Link to={'/'}>
							<li className={listStyles}>Broker Resources</li>
						</Link>
						<Link to={'/'}>
							<li className={listStyles}>Privacy Policy</li>
						</Link>
						<Link to={'/'}>
							<li className={listStyles}>Media Coverage</li>
						</Link>
						<Link to={'/'}>
							<li className={listStyles}>Mobile</li>
						</Link>
					</ul>

					{/* copyright */}
					<p className="text-center md:text-start">
						&copy; Copyright 2023{' '}
						<b>
							<Link to={'/'}>Affi</Link>
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
	'capitalize cursor-pointer text-white text-sm md:text-base font-medium py-[.3rem] px-2 md:px-8 hover:text-yellow transition-colors ';
