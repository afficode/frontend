import { useEffect } from 'react';
import { Advertise, JoinUs } from '../../assets/svgs';
import { ScrollToTop } from '../../utils';
import { useLocation } from 'react-router-dom';
import { BOONFU_ADDRESS, BOONFU_LEGAL_MAIL, BOONFU_MAIL, frontendLink } from '../../constants';

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

                    <h6 className="text-center text-white text-semibold mt-4">
						Boonfu Limited – Empowering Digital Commerce Through Community and Choice
                    </h6>
                </div>
            </div>

            {/* our story */}
            <div id="about-us" className={`${sectionStyles} scroll-mt-[92px] flex flex-col gap-4`}>
                <h4 className="text-primary">Overview</h4>

                <p>
					Boonfu Limited (operating via boonfu.com and associated domains such as boonfu.site) is a
					Nigerian-registered digital marketplace platform headquartered at Plot 1B, Opeyemi Rotimi
					Famakinwa Close, Ajomale Zone, Opic, Lagos State (RC Number: 7379214). We operate as a
					Customer-to-Customer (C2C) online marketplace with integrated affiliate-driven urgency sales
					capabilities, uniquely designed to accelerate transactions while creating earning opportunities
					for digital marketers.
                </p>

                <h4 className="text-primary">Our Mission </h4>

                <p>
					To drive a next-generation digital commerce ecosystem that is adaptable, intuitive, and powered
					by user choice—where sellers achieve faster, safer sales, buyers discover trusted listings, and
					digital marketers (“Grabbers”) monetize their networks ethically and transparently.
                </p>

                <h4 className="text-primary">Our Vision </h4>

                <p>
					To become Nigeria’s most trusted peer-to-peer trading and micro-entrepreneurship platform by
					blending marketplace efficiency with decentralized affiliate marketing to fostering financial
					inclusion, digital literacy, and community-driven commerce.
                </p>

                <h4 className="text-primary">Core Solutions & Services</h4>

                <p>
					At the heart of Boonfu is a simple yet powerful vision: to transform how Nigerians buy, sell,
					and earn in the digital economy. We’ve built more than just a marketplace—we’ve engineered a
					dynamic ecosystem where urgency meets opportunity. Whether you're a seller needing to move an
					item quickly, a buyer seeking trusted deals, or a digital marketer (Grabber) looking to
					monetize your network, Boonfu provides the tools, security, and incentive structure to make
					every interaction fast, fair, and financially rewarding—all within a platform designed for
					Nigeria’s unique digital commerce landscape. <br /> <br /> Our core solution and services
					include:
                    <br />
                    <br />
                    <ol className={orderedListStyles}>
                        <li>
                            <b>C2C Marketplace Platform:</b> Boonfu enables private individuals and small businesses to
							list, discover, and transact in a wide range of goods including electronics, fashion, home
							appliances, vehicles, real estate etc. through a secure, user-friendly interface.
                        </li>
                        <li>
                            <b>The Grab Feature – Our Urgency Engine:</b> The Grab Feature is Boonfu’s proprietary
							affiliate-powered sales accelerator, designed for sellers who need to sell quickly and
							Grabbers who want to earn real income from their networks.
                        </li>
                        <li>
                            <b>Escrow Payment Protection:</b> To mitigate fraud and build trust, Boonfu acts as a neutral
							intermediary for Grab-enabled transactions:
                            <ul className="list-disc list-inside">
                                <li>Buyers pay into a secure platform-held account.</li>
                                <li>
									Funds are released to the seller only after buyer confirmation of receipt or expiry of the
									inspection window.
                                </li>
                                <li>
									This service is provided at no additional cost to users who opt for the Grab Feature.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <b>Digital Earning Pathways for Grabbers:</b> Independent marketers can register as Grabbers
							to:
                            <ul className="list-disc list-inside">
                                <li>Browse “grabbable” listings with visible commission rates.</li>
                                <li>Earn 60% of the locked commission (for other categories) upon successful sale.</li>
                                <li>Earn 80% of the locked commission (for vehicles & properties) upon successful sale.</li>
                                <li>Receive automated payouts to their Boonfu Wallet, withdrawable to bank accounts.</li>
                                <li>Access optional training and performance analytics to optimize their outreach.</li>
                            </ul>
                        </li>

                        <li>
                            <b>Promotional Services:</b> Beyond organic reach, sellers may purchase featured placements,
							homepage banners, or social media spotlights to amplify visibility—subject to separate
							promotional terms.
                        </li>
                    </ol>
                </p>

                <h4 className="text-primary">Community Commitment</h4>

                <p>
					We foster a safe, inclusive, and accountable trading environment. Prohibited items (e.g.,
					weapons, counterfeit goods, illegal substances) are strictly barred. Users violating platform
					rules face warnings, ad removal, or account suspension.
                </p>
            </div>

            <div
                className={`${sectionStyles}  flex justify-center gap-24 max-md:flex-col max-md:items-center`}
            >
                <div className="flex items-center gap-8 p-6 bg-gray-300 shadow-xl">
                    <img src={Advertise} className="w-[6rem]" alt="/" />
                    <h4>Advertise With Us</h4>
                </div>
                <div className="flex items-center gap-8 p-6 bg-gray-300 shadow-xl">
                    <img src={JoinUs} className="w-[6rem]" alt="/" />
                    <h4>Join Us</h4>
                </div>
            </div>

            {/* our vision and mission */}
            <div id="advertise" className={`${sectionStyles} scroll-mt-[92px] flex flex-col gap-4`}>
                <h4 className="text-primary">How Advertise with us works!</h4>
                <p>
					Boonfu is a Customer-to-Customer (C2C) digital marketplace that connects Sellers, Buyers, and
					independent marketers called Grabbers. Whether you want to sell quickly, earn commissions, or
					buy securely, here’s how the platform works:
                </p>

                <ol className="list-decimal list-inside">
                    <li>
                        <b>Creating an Account</b>
                        <ul className="list-disc list-inside pl-4">
                            <p>For Everyone (Sellers, Buyers & Grabbers):</p>
                            <li>
								Visit{' '}
                                <a href={frontendLink} className="text-secondary">
                                    {frontendLink}
                                </a>
                            </li>
                            <li>
								Click “Sign Up” and provide:
                                <ul className="list-disc list-inside pl-6">
                                    <li>First Name</li>
                                    <li>Last Name</li>
                                    <li>A valid email address,</li>
                                    <li>A Nigerian phone number.</li>
                                    <li>Set a secured password</li>
                                    <li>Set Location</li>
                                    <li>And create your account</li>
                                </ul>
                            </li>
                            <li>Go to the email account you provided to verify your email </li>
                            <li>
								Navigate back to{' '}
                                <a href={frontendLink} className="text-secondary">
                                    {frontendLink}
                                </a>{' '}
								and Log-in{' '}
                            </li>
                            <li>Your account is now ready! No fees to register.</li>
                        </ul>
                    </li>
                    <li>
                        <b>Funding Your Wallet (Deposit)</b>
                        <p>Required only for Sellers using the Grab Feature or Grabbers receiving commissions.</p>
                        <ul className="list-disc list-inside pl-4">
                            <li>Log in and go to your Boonfu Wallet (found in your dashboard).</li>
                            <li>Click “Fund Wallet” and choose a payment method (bank transfer, card, etc.).</li>
                            <li>Enter the amount and complete the transaction.</li>
                            <li>Funds appear instantly in your Available Balance.</li>
                            <li>For Grab listings, funds will be locked automatically when you activate the feature.</li>
                        </ul>
                    </li>

                    <li>
                        <b>Listing a Product (For Sellers)</b>
                        <p>Post any item—electronics, fashion, vehicles, property, and more:</p>
                        <ul className="list-disc list-inside pl-4">
                            <li>Click “Post Advert” on your dashboard.</li>
                            <li>
								Fill in the listing details:
                                <ul className="list-disc list-inside pl-6">
                                    <li>Item title, description, category,</li>
                                    <li>Clear photos,</li>
                                    <li>Price and location.</li>
                                </ul>
                            </li>
                            <li>
								Choose listing type:
                                <ul className="list-disc list-inside pl-6">
                                    <li>Basic Listing: Free </li>
                                    <li>
										Grab Feature: Paid urgency option (requires wallet deposit—see Enabling Grab Feature)
                                    </li>
                                </ul>
                            </li>
                            <li>Review and publish your listing.</li>
                        </ul>
                    </li>
                    <li>
                        <b>Enabling the Grab Feature (Urgent Sale)</b>
                        <p>Sell faster with Boonfu’s affiliate-powered urgency engine:</p>
                        <ul className="list-disc list-inside pl-4">
                            <li>During listing, toggle “Enable Grab Feature”.</li>
                            <li>
								Fund your wallet with the required deposit:
                                <ul className="list-disc list-inside pl-6">
                                    <li>10% of item price for general items (e.g., ₦10,000 for a ₦100,000 phone),</li>
                                    <li>1% of item price for vehicles & properties (e.g., ₦100,000 for a ₦10,000,000 car).</li>
                                </ul>
                            </li>
                            <li>Once funded, your listing goes live with “Grab” status.</li>
                            <li>
								Real-time alerts are sent to all active Grabbers, who can now share/promote your
								listings/item.
                            </li>
                            <li>Your deposit is locked for 1 month.</li>
                            <li>All Grab transactions are protected by Boonfu Escrow (zero cost).</li>
                        </ul>
                        <p className="pl-4 mt-2 font-semibold">If the Item Sells via a Grabber:</p>
                        <ul className="list-disc list-inside pl-4">
                            <li>The buyer pays through Boonfu’s mandatory, zero-cost Escrow system.</li>
                            <li>
								Upon payment confirmation and buyer pickup (within 24 hours), the entire locked deposit is
								converted into commission.
                            </li>
                            <li>60% is automatically credited to the Grabber’s Wallet.</li>
                            <li>40% is retained by Boonfu as platform service fee.</li>
                            <li>
								Seller receives the full item price (minus any bank charges), with no additional cost.
                            </li>
                        </ul>
                        <p className="pl-4 mt-2 font-semibold">If the Item Does NOT Sell Within 1 Month:</p>
                        <ul className="list-disc list-inside pl-4">
                            <li>The seller receives a “Take Action” notification before downgrade.</li>
                            <li>
								Options include:
                                <ul className="list-disc list-inside pl-6">
                                    <li>
										Downgrade to Basic Listing: Advert remains live for another month at no extra cost (90% of
										deposit refunded).
                                    </li>
                                    <li>
										Reduce Price by ≥10%: Qualifies for a new 1-month Grab promotion (new deposit required
										based on revised price).
                                    </li>
                                </ul>
                            </li>
                            <li>
								If no action is taken, the listing is downgraded automatically. 10% administrative fee is
								deducted from the locked deposit; 90% is unlocked for your withdrawal.
                            </li>
                        </ul>
                        <p className="pl-4 mt-2 font-semibold">Cancellation (Vehicles/Properties Only):</p>
                        <ul className="list-disc list-inside pl-4">
                            <li>Sellers may cancel within 7 days of posting.</li>
                            <li>5% admin fee applies; 95% is released as withdrawable balance.</li>
                        </ul>
                    </li>
                    <li>
                        <b>Becoming a Grabber (Affiliate Marketer)</b>
                        <p>Earn commissions by promoting listings:</p>
                        <ul className="list-disc list-inside pl-4">
                            <li>Register and log in (same as Seller/Buyer).</li>
                            <li>
								Provide you social media handle(s) (The channels where you intent to promote the listings)
                            </li>
                            <li>Go to the “Grabber Dashboard” (or browse live “Grab” listings).</li>
                            <li>No application needed—all users can become Grabbers instantly.</li>
                            <li>Start browsing new “grabbable” items with visible commission rates.</li>
                        </ul>
                    </li>
                    <li>
                        <b>Promoting a Product (as a Grabbers)</b>
                        <p>Share. Earn. Repeat.</p>
                        <ul className="list-disc list-inside pl-4">
                            <li>Find a listing you want to promote.</li>
                            <li>Click “Grab” → a unique affiliate link is generated.</li>
                            <li>Share this link on WhatsApp, Instagram, Facebook, blogs, or email.</li>
                            <li>
								When a buyer clicks your link and completes payment via Escrow, you earn:
                                <ul className="list-disc list-inside pl-6">
                                    <li>60% of the Seller’s locked deposit (e.g., ₦6,000 from a ₦10,000 deposit).</li>
                                    <li>
										Commissions are only paid after Escrow completion (buyer confirms pickup or 24-hour window
										expires).
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <b>Escrow Service (Secure Payment Protection)</b>
                        <p>Mandatory for all Grab-enabled transactions:</p>
                        <ul className="list-disc list-inside pl-4">
                            <li>Buyer pays → funds are held in Boonfu’s secure Escrow account (not sent to Seller).</li>
                            <li>Seller’s contact details are revealed only after payment confirmation.</li>
                            <li>Buyer must pick up the item within 24 hours and confirm receipt.</li>
                            <li>
								After confirmation (or 24-hour expiry):
                                <ul className="list-disc list-inside pl-6">
                                    <li>Funds are released to the Seller,</li>
                                    <li>60% of the commission is credited to the Grabber’s Wallet.</li>
                                </ul>
                            </li>
                        </ul>
                        <p className="pl-4 mt-2 font-semibold">If buyer fails to pick up within 24 hours:</p>
                        <ul className="list-disc list-inside pl-4">
                            <li>Transaction is cancelled,</li>
                            <li>Item is relisted,</li>
                            <li>Buyer gets a refund minus ₦1,000 admin fee.</li>
                        </ul>
                        <p className="pl-4 mt-2 italic font-semibold">
							Note: Escrow is only available for Grab listings. Standard listings are direct peer-to-peer
							deals with no payment protection.
                        </p>
                    </li>
                    <li>
                        <b>Withdrawing Funds</b>
                        <p>For Sellers (unsold Grab listings) & Grabbers (earned commissions):</p>
                        <ul className="list-disc list-inside pl-4">
                            <li>Go to your Boonfu Wallet.</li>
                            <li>
								Ensure the balance is “Withdrawable” (i.e., not locked in an active listing). Grab listings
								must be closed or expired before withdrawal.
                            </li>
                            <li>Click “Withdraw”, enter your bank details, and submit.</li>
                            <li>Funds are processed and sent to your account within 24–48 hours.</li>
                        </ul>
                        <p className="pl-4 mt-2 italic font-semibold">
							Note: You cannot withdraw funds locked for an active Grab listing.
                        </p>
                    </li>
                </ol>
            </div>

            {/* why choose us */}
            <div id="jobs" className={`${sectionStyles} scroll-mt-[92px] flex flex-col gap-4`}>
                <h4 className="text-primary">Join us / Jobs</h4>
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
                        <b>Create Your Profile</b>: Sign up and create your job seeker profile on Boonfu.com.
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

            <div
                id="candidate-privacy-policy"
                className={`${sectionStyles} scroll-mt-[92px] flex flex-col gap-4`}
            >
                <h4 className="text-primary">Candidate Privacy Policy</h4>

                <p>
					Boonfu Ltd is committed to safeguarding the personal information of all job applicants. We take
					your privacy seriously and ensure that all data is handled in accordance with applicable data
					protection regulations. <br /> This Candidate Privacy Policy explains how we collect, use, and
					protect your personal data throughout the recruitment process.
                </p>

                <h6 className="mt-4 font-bold ">Data Controller</h6>
                <p>
                    {' '}
					Boonfu Limited, a company registered in Nigeria, is the data controller responsible for your
					personal information.
                </p>

                <h6 className="mt-4 font-bold ">Collection and Use of Personal Data</h6>
                <p>
					Personal data refers to any information that can identify you directly or indirectly. During
					the recruitment process, we may collect and process the following:
                </p>

                <ul className="list-disc list-inside">
                    <h6 className="my-4 font-bold">Benefits of Using Boonfu Marketplace</h6>

                    <li>Full name</li>
                    <li>Location</li>
                    <li>Phone number</li>
                    <li>Email address</li>
                    <li>Curriculum Vitae (CV)</li>
                    <li>Work history and prior experience</li>
                    <li>Educational background</li>
                </ul>

                <p>We may also collect information on how you learned about the job opportunity.</p>

                <h6 className="mt-4 font-bold">Purpose of Processing</h6>
                <p>Your personal data is processed strictly for recruitment-related purposes, including:</p>

                <ul className="list-disc list-inside">
                    <li>Assessing your suitability for the position you applied for</li>
                    <li>Communicating with you regarding your application</li>
                    <li>Managing and documenting the recruitment process</li>
                    <li>
						With your consent, your data may also be retained for consideration for future job openings
						within Boonfu or its affiliates. This allows us to contact you if a suitable position becomes
						available, even if we are unable to offer you a role at present.
                    </li>
                </ul>

                <h6 className="mt-4 font-bold">Your Rights</h6>
                <p>You have the following rights regarding your personal data:</p>

                <ul className="list-disc list-inside">
                    <li>The right to request access to your personal data</li>
                    <li>The right to request correction or rectification</li>
                    <li>The right to request deletion of your data</li>
                    <li>The right to object to the processing of your data</li>
                    <li>The right to request data portability</li>
                </ul>

                <p>
					To exercise any of these rights, please contact us at{' '}
                    <a className="text-secondary" href={`mailto:${BOONFU_MAIL}`}>
                        {BOONFU_MAIL}
                    </a>
                </p>

                <h6 className="mt-4 font-bold">Contact</h6>
                <ul className="list-disc list-inside">
                    <li>
						Legal:{' '}
                        <a className="text-secondary" href={`mailto:${BOONFU_LEGAL_MAIL}`}>
                            {BOONFU_LEGAL_MAIL}
                        </a>
                    </li>
                    <li>
						Support:{' '}
                        <a className="text-secondary" href={`mailto:${BOONFU_MAIL}`}>
                            {BOONFU_MAIL}
                        </a>
                    </li>
                    <li>Registered Office: {BOONFU_ADDRESS}</li>
                </ul>

                <h6 className="mt-4 font-bold">Changes to This Policy</h6>
                <p>
					Boonfu Ltd reserves the right to update or modify this Privacy Policy as necessary. Any changes
					will be posted on this page.
                </p>
            </div>

            <div className={`${sectionStyles}  flex flex-col gap-4`}>
                <h4 className="text-primary">Legal & Operational Compliance </h4>

                <p>Boonfu is committed to full compliance with Nigerian regulatory frameworks, including:</p>
                <ul className="list-disc list-inside">
                    <li>
						The Nigeria <b>Data Protection Act (NDPA) 2023</b>, implementing robust data governance, user
						consent mechanisms, and breach notification protocols.
                    </li>
                    <li>
                        <b>The Federal Competition and Consumer Protection Act (FCCPA)</b>, ensuring fair advertising,
						transparent pricing, and consumer redress.
                    </li>
                    <li>
                        <b>Central Bank of Nigeria (CBN)</b> guidelines on payment intermediation and escrow
						operations.
                    </li>
                </ul>

                <p>
					All platform activities are governed by clear, accessible policies—continuously reviewed for
					legal alignment and user protection.
                </p>

                <h4 className="text-primary">Contact Us</h4>

                <p>For inquiries, support, or partnership opportunities:</p>

                <ul className="list-disc list-inside">
                    <li>
                        <b>Customer Support:</b>{' '}
                        <a className="text-secondary" href={`mailto:${BOONFU_MAIL}`}>
                            {BOONFU_MAIL}
                        </a>
                    </li>
                    <li>
                        <b>Legal & Compliance:</b>{' '}
                        <a className="text-secondary" href={`mailto:${BOONFU_LEGAL_MAIL}`}>
                            {BOONFU_LEGAL_MAIL}
                        </a>
                    </li>
                    <li>
						Registered Address: Plot 1B, Opeyemi Rotimi Famakinwa Close, Ajomale Zone, Opic, Lagos State,
						Nigeria.
                    </li>
                </ul>

                <p>Boonfu — Where Selling Meets Speed, and Sharing Meets Earnings</p>
            </div>

            <ScrollToTop />
        </section>
    );
};

export default AboutUs;

const sectionStyles = 'px-[4rem] py-8 max-sm:px-4';
const orderedListStyles = 'text-base leading-relaxed dark:text-gray-400 list-decimal pl-6';
