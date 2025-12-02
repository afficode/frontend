import { Link } from 'react-router-dom';
import { Approutes } from '../../constants';
import { useRef, useState } from 'react';
import { TermsAndCondition } from '../../components';
import { Modal } from '../../ui';

// icons
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
	const ref = useRef(null);

	//to scroll into terms and condition document
	const [isOpen, setIsOpen] = useState(false);
	const termsRef = useRef(null);
	const rulesRef = useRef(null);
	const privacyRef = useRef(null);

	const handleScrollTo = (ref) => {
		if (!isOpen) {
			setIsOpen(true);
			setTimeout(() => {
				ref.current.scrollIntoView({ behavior: 'smooth' });
			}, 1000); // Add a delay to ensure the component is rendered before scrolling
		} else {
			ref.current.scrollIntoView({ behavior: 'smooth' });
		}
	};
	return (
		<footer className="bg-primary mt-16">
			<section className=" w-full px-[1.5rem] lg:px-[4rem] max-w-[1380px] mx-auto">
				<div className=" text-white flex flex-col gap-[1.5rem] md:gap-[3rem] py-8">
					<div className="grid grid-cols-1 items-center">
						<div className="col-span-2  space-y-2">
							<h3 className="text-start">Transact with peace of mind on Boonfu</h3>
							<p className="text-justify p-lg">
								Shop and sell securely with Boonfu's escrow protection (Grab) - your funds are safe until
								delivery is confirmed. Our verified marketplace ensures trustworthy transactions, while
								real-time tracking keeps you in control. Sellers can boost sales through our Grab Feature,
								where independent marketers promote your products for commission-on-sale. Enjoy instant
								dispute resolution and worry-free commerce. At Boonfu, security and growth go hand-in-hand!{' '}
								<br />
								#SecureTransactions #EarnWithBoonfu
							</p>
						</div>
					</div>

					{/* footer lists  */}
					<div className="grid max-[450px]:grid-cols-1 grid-cols-2 lg:grid-cols-4 gap-6 justify-between">
						<ul className="flex flex-col ">
							<h6 className="px-2 md:px-8 text-2xl opacity-[.7] font-normal whitespace-nowrap mb-3">
								About US
							</h6>
							<Link to={`${Approutes.aboutUs}#about-us`}>
								<li className={listStyles}>About Boonfu</li>
							</Link>
							<Link to={`${Approutes.aboutUs}#advertise`}>
								<li className={listStyles}>Advertise With Us</li>
							</Link>
							<Link to={`${Approutes.aboutUs}#jobs`}>
								<li className={listStyles}>Jobs</li>
							</Link>

							<Link to={Approutes.media}>
								<li className={listStyles}>Media</li>
							</Link>
							<Link to={Approutes.privacyPolicy}>
								<li className={listStyles}>Privacy Policy</li>
							</Link>
							<li onClick={() => handleScrollTo(termsRef)} className={listStyles}>
								Terms & Conditions
							</li>
						</ul>

						<ul className="flex flex-col ">
							<h6 className="px-2 md:px-8 text-2xl opacity-[.7] font-normal whitespace-nowrap mb-3">
								Help & Support
							</h6>
							<Link to={Approutes.contactUs}>
								<li className={listStyles}>Contact Us</li>
							</Link>
							<Link to={Approutes.underConstruction}>
								<li className={listStyles}>FAQs</li>
							</Link>
							<Link to={Approutes.safety}>
								<li className={listStyles}>Safety Guides</li>
							</Link>
						</ul>
						<ul className="flex flex-col ">
							<h6 className="px-2 md:px-8 text-2xl opacity-[.7] font-normal whitespace-nowrap mb-3">
								Boonfu Extra
							</h6>
							<Link to={Approutes.grab.home}>
								<li className={listStyles}>Grab System</li>
							</Link>
						</ul>
						<ul className="flex flex-col ">
							<h6 className="px-2 md:px-8 text-2xl opacity-[.7] font-normal whitespace-nowrap mb-3">
								Social
							</h6>
							<div className="flex gap-4 px-2 md:px-8">
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
						</ul>
					</div>

					{/* copyright */}
					<p className="text-center md:text-start">
						&copy; Copyright 2025{' '}
						<b>
							<Link to={'/'}>Boonfu.com</Link>
						</b>
						. All rights reserved.
					</p>
				</div>
				{/* terms and condition modal */}
				<Modal isOpen={isOpen} setIsOpen={setIsOpen} headerText="Terms of Service">
					<TermsAndCondition
						rulesRef={rulesRef}
						termsRef={termsRef}
						privacyRef={privacyRef}
						setIsOpen={setIsOpen}
						isOpen={isOpen}
					/>
				</Modal>
			</section>
		</footer>
	);
};

export default Footer;

const listStyles =
	'capitalize cursor-pointer text-white text-sm md:text-base font-medium py-[.3rem] px-2 md:px-8 hover:text-secondary transition-colors whitespace-nowrap';
