import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ScrollToTop } from '../../utils';
import { BOONFU_ADDRESS, BOONFU_LEGAL_MAIL, BOONFU_MAIL } from '../../constants';

const GrabSystem = () => {
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
		<div className="space-y-6 px-4 py-2 sm:py-4 text-justify">
			<div className="bg-primary py-12 px-4 sm:px-[4rem] m-2 rounded-md text-center text-white">
				<h1 className="text-white">Grabber Service Agreement</h1>
				<p className="mt-2">
					[Effective Date: 22 December 2025] <br />
					[Last Updated: 22 December 2025]
				</p>
			</div>

			<ol className={`${orderedListStyles} sm:!px-[4rem]`}>
				<Link to="#overview" className="w-max block">
					<li>Overview</li>
				</Link>
				<Link to="#definitions" className="w-max block">
					<li>Definitions</li>
				</Link>
				<Link to="#services-provided" className="w-max block">
					<li>Services Provided by Grabber</li>
				</Link>
				<Link to="#commission-structure" className="w-max block">
					<li>Commission Structure & Payment Terms</li>
				</Link>
				<Link to="#escrow-guarantee" className="w-max block">
					<li>Escrow Guarantee</li>
				</Link>
				<Link to="#grabber-conduct" className="w-max block">
					<li>Grabber Conduct & Obligations</li>
				</Link>
				<Link to="#training-support" className="w-max block">
					<li>Training & Support</li>
				</Link>
				<Link to="#intellectual-property" className="w-max block">
					<li>Intellectual Property</li>
				</Link>
				<Link to="#limitation-liability" className="w-max block">
					<li>Limitation of Liability</li>
				</Link>
				<Link to="#indemnification" className="w-max block">
					<li>Indemnification</li>
				</Link>
				<Link to="#term-termination" className="w-max block">
					<li>Term & Termination</li>
				</Link>
				<Link to="#governing-law" className="w-max block">
					<li>Governing Law & Dispute Resolution</li>
				</Link>
				<Link to="#miscellaneous" className="w-max block">
					<li>Miscellaneous</li>
				</Link>
				<Link to="#acceptance" className="w-max block">
					<li>Acceptance</li>
				</Link>
				<Link to="#contact" className="w-max block">
					<li>Contact</li>
				</Link>
			</ol>

			<div className="space-y-4 sm:px-[4rem]">
				<h4 id="overview" className="scroll-mt-[130px]">
					Overview
				</h4>
				<p className={textStyles}>
					This Grabber Service Agreement ("Agreement") is a legally binding contract between Boonfu
					Limited, a company duly registered under the laws of the Federal Republic of Nigeria with
					Registration Number RC 7379214, and having its registered office at Plot 1B, Opeyemi Rotimi
					Famakinwa Close, Ajomale Zone, Opic, Lagos State, Nigeria (hereinafter referred to as "Boonfu",
					"we", "us", or "our"), and you, the Grabber (hereinafter referred to as "you", "your", or
					"Affiliate"), who registers on the Boonfu Platform and utilizes the "Grab" Feature to promote
					listings.
				</p>

				<p className={textStyles}>
					By clicking "Grab" on any eligible listing or otherwise activating affiliate sharing
					functionality on the Platform, you expressly acknowledge that you have read, understood, and
					agree to be bound by the terms of this Agreement, as well as Boonfu's Terms of Use, Privacy
					Policy, Cookie Policy, and Customer Service Agreement (collectively, the "Policies"), all of
					which are incorporated herein by reference.
				</p>

				<h4 id="definitions" className="scroll-mt-[130px]">
					Definitions
				</h4>
				<p className={textStyles}>
					For the purposes of this Agreement, the following terms shall have the meanings set forth
					below:
				</p>
				<ul className={listStyles}>
					<li>
						<b>Affiliate or Grabber:</b> An independent user who shares "grabbable" listings via trackable
						links to earn commissions.
					</li>
					<li>
						<b>Basic Listing:</b> A standard advertisement without Grab visibility or Escrow protection.
					</li>
					<li>
						<b>Boonfu Platform or Platform:</b> The website boonfu.com and all affiliated mobile
						applications.
					</li>
					<li>
						<b>Client or Seller:</b> A user who lists an item and activates the Grab Feature.
					</li>
					<li>
						<b>Commission:</b> The earnings payable to a Grabber upon successful completion of a
						Grab-enabled sale.
					</li>
					<li>
						<b>Escrow Service:</b> Boonfu's mandatory, zero-cost payment-holding mechanism for all Grab
						transactions.
					</li>
					<li>
						<b>Grab Feature:</b> A proprietary marketing tool that enables Sellers to accelerate sales via
						affiliate promotion.
					</li>
					<li>
						<b>Locked Balance:</b> The commission deposit (10% for general items; 1% for
						vehicles/properties) reserved in the Seller's wallet.
					</li>
					<li>
						<b>Nigerian Naira (₦):</b> The sole currency for all commissions, transactions, and fees.
					</li>
					<li>
						<b>Self-Pickup:</b> The method of handover wherein the Buyer collects the item directly from
						the Seller within 24 hours of payment confirmation.
					</li>
				</ul>

				<h4 id="services-provided" className="scroll-mt-[130px]">
					Services Provided by Grabber
				</h4>

				<p className={`${textStyles} font-semibold`}>Role of the Grabber</p>
				<p className={textStyles}>
					You act as an independent affiliate marketer, not an employee, agent, or partner of Boonfu.
					Your primary duties include: browsing "grabbable" listings on the Platform, selecting items to
					promote based on commission appeal and market relevance, and sharing official, trackable
					affiliate links exclusively via your Boonfu dashboard across external channels (e.g., WhatsApp,
					Instagram, blogs, email).
				</p>

				<p className={`${textStyles} font-semibold mt-4`}>Non-Exclusivity</p>
				<p className={textStyles}>
					You are free to promote any number of listings, cease promotion at any time, and operate other
					affiliate programs concurrently. Boonfu imposes no exclusivity or minimum performance
					requirements.
				</p>

				<h4 id="commission-structure" className="scroll-mt-[130px]">
					Commission Structure & Payment Terms
				</h4>

				<p className={`${textStyles} font-semibold`}>Commission Calculation</p>
				<ul className={listStyles}>
					<li>For other categories: 60% of 10% of the listed price = 6% of item value.</li>
					<li>For vehicles/properties: 80% of 1% of the listed price = 8% of item value.</li>
					<li>
						The full commission is derived from the Seller's Locked Balance, which is reserved at listing
						activation.
					</li>
				</ul>

				<p className={`${textStyles} font-semibold mt-4`}>Payment Trigger</p>
				<p className={textStyles}>
					Commissions are only payable upon successful Escrow completion, defined as: Buyer payment
					confirmed by Boonfu, Buyer confirms receipt of the item, or the 24-hour Self-Pickup window
					expires without dispute.
				</p>

				<p className={`${textStyles} font-semibold mt-4`}>Wallet Crediting</p>
				<p className={textStyles}>
					Approved commissions are automatically credited to your Boonfu Wallet in Nigerian Naira (₦).
					Funds are withdrawable to your registered bank account once the transaction is finalized.
				</p>

				<p className={`${textStyles} font-semibold mt-4`}>No Payment for Incomplete Transactions</p>
				<p className={textStyles}>
					You shall not receive commission if: the Buyer fails to pick up within 24 hours (transaction
					reversed), the listing is cancelled by the Seller before sale, the item is sold outside the
					Platform, or the sale occurs via a non-Grabber channel.
				</p>

				<h4 id="escrow-guarantee" className="scroll-mt-[130px]">
					Escrow Guarantee
				</h4>
				<p className={textStyles}>
					To protect your promotional efforts, all Grab-enabled sales are processed through Boonfu's
					mandatory Escrow Service. This ensures: Buyer payment is secured before handover, commission
					funds are reserved and available upon successful closure, and neither Seller nor Buyer can
					bypass your affiliate link once a click is recorded.
				</p>
				<p className={textStyles}>
					You acknowledge that Escrow is the sole mechanism validating your commission eligibility.
				</p>

				<h4 id="grabber-conduct" className="scroll-mt-[130px]">
					Grabber Conduct & Obligations
				</h4>
				<p className={textStyles}>You agree to:</p>

				<p className={`${textStyles} font-semibold mt-4`}>Accurate Representation</p>
				<p className={textStyles}>
					Use only the images, title, and description provided by the Seller on the Platform. Do not
					alter, exaggerate, or misrepresent item condition, price, or availability.
				</p>

				<p className={`${textStyles} font-semibold mt-4`}>Anti-Spam Policy</p>
				<p className={textStyles}>
					Share links responsibly and contextually. Do not engage in bulk messaging, automated posting,
					or platform flooding that could result in link blacklisting or brand harm.
				</p>

				<p className={`${textStyles} font-semibold mt-4`}>Compliance with Law</p>
				<p className={textStyles}>
					Comply with all applicable Nigerian laws, including: FCCPC Advertising Guidelines (truth in
					marketing), NDPA 2023 (if collecting user data externally), and Criminal Code (regarding fraud
					or impersonation).
				</p>

				<p className={`${textStyles} font-semibold mt-4`}>Account Security</p>
				<p className={textStyles}>
					Maintain confidentiality of your login credentials. Notify{' '}
					<a className="text-secondary" href={`mailto:${BOONFU_MAIL}`}>
						{BOONFU_MAIL}
					</a>{' '}
					immediately of any unauthorized access.
				</p>

				<h4 id="training-support" className="scroll-mt-[130px]">
					Training & Support
				</h4>

				<p className={`${textStyles} font-semibold`}>Capacity Building</p>
				<p className={textStyles}>
					Boonfu may, at its discretion, offer digital marketing webinars, performance analytics
					dashboards, and best-practice guides for conversion optimization. These resources are optional
					and provided to enhance your success.
				</p>

				<p className={`${textStyles} font-semibold mt-4`}>Communication</p>
				<p className={textStyles}>
					Training schedules and materials will be delivered via your registered email, in-app
					notifications, and dashboard announcements.
				</p>

				<h4 id="intellectual-property" className="scroll-mt-[130px]">
					Intellectual Property
				</h4>
				<p className={textStyles}>
					You are granted a limited, non-exclusive, non-transferable license to use Boonfu's listing
					content solely for the purpose of affiliate promotion via official links.
				</p>
				<p className={textStyles}>
					You may not: reproduce Boonfu's logo, UI, or branding, create derivative listings, or use
					scraped or unofficial content.
				</p>

				<h4 id="limitation-liability" className="scroll-mt-[130px]">
					Limitation of Liability
				</h4>
				<p className={textStyles}>
					Boonfu does not guarantee sales, traffic, or earnings. You acknowledge that commissions are
					performance-based and not assured.
				</p>
				<p className={textStyles}>
					To the fullest extent permitted by Nigerian law, Boonfu shall not be liable for: loss of
					anticipated earnings, third-party platform restrictions (e.g., Instagram link blocking), or
					Seller misrepresentation or Buyer fraud.
				</p>
				<p className={textStyles}>
					Maximum aggregate liability is capped at the greater of ₦50,000 or total commissions paid to
					you in the last 12 months.
				</p>

				<h4 id="indemnification" className="scroll-mt-[130px]">
					Indemnification
				</h4>
				<p className={textStyles}>
					You agree to indemnify and hold harmless Boonfu from any claim, demand, or loss (including
					legal fees) arising from: your breach of this Agreement, misrepresentation of a listing, spam
					or fraudulent promotion tactics, or violation of Nigerian law or third-party rights.
				</p>

				<h4 id="term-termination" className="scroll-mt-[130px]">
					Term & Termination
				</h4>

				<p className={`${textStyles} font-semibold`}>Term</p>
				<p className={textStyles}>
					This Agreement remains in effect while you maintain an active Grabber account.
				</p>

				<p className={`${textStyles} font-semibold mt-4`}>Termination by Boonfu</p>
				<p className={textStyles}>
					Boonfu may immediately suspend or terminate your account for: spam or abusive sharing,
					misrepresentation of listings, fraudulent activity, or repeated policy violations. Outstanding
					commissions from completed transactions will still be paid.
				</p>

				<p className={`${textStyles} font-semibold mt-4`}>Survival</p>
				<p className={textStyles}>
					Sections on Liability, IP, Indemnification, and Confidentiality survive termination.
				</p>

				<h4 id="governing-law" className="scroll-mt-[130px]">
					Governing Law & Dispute Resolution
				</h4>

				<p className={`${textStyles} font-semibold`}>Governing Law</p>
				<p className={textStyles}>
					This agreement shall be governed by and construed in accordance with the laws of the Federal
					Republic of Nigeria.
				</p>

				<p className={`${textStyles} font-semibold mt-4`}>Dispute Resolution</p>
				<p className={textStyles}>
					Any claim, controversy, complaint, or dispute arising out of or in connection with your use of
					the Platform (a "Dispute") shall first be addressed by mutual consultation between you and
					Boonfu.
				</p>
				<p className={textStyles}>
					If the Dispute cannot be resolved within 30 (thirty) days, it shall be submitted to arbitration
					in accordance with the Arbitration and Mediation Act, 2023. The parties shall jointly appoint a
					sole arbitrator. If the parties cannot agree on an arbitrator within 14 (fourteen) days of
					notice, any party may apply to the Chairman of the Chartered Institute of Arbitrators, UK
					(Nigeria Branch) to appoint an arbitrator.
				</p>

				<h4 id="miscellaneous" className="scroll-mt-[130px]">
					Miscellaneous
				</h4>

				<p className={`${textStyles} font-semibold`}>Entire Agreement</p>
				<p className={textStyles}>
					This Agreement, together with the incorporated Policies, constitutes the entire understanding
					between the parties.
				</p>

				<p className={`${textStyles} font-semibold mt-4`}>Amendments</p>
				<p className={textStyles}>
					Boonfu may update this Agreement upon 30 days' notice via Platform posting. Continued use
					constitutes acceptance.
				</p>

				<p className={`${textStyles} font-semibold mt-4`}>Assignment</p>
				<p className={textStyles}>
					You may not assign this Agreement. Boonfu may assign without consent.
				</p>

				<p className={`${textStyles} font-semibold mt-4`}>Independent Contractor Status</p>
				<p className={textStyles}>
					You are an independent contractor. Nothing herein creates employment, partnership, or agency.
				</p>

				<p className={`${textStyles} font-semibold mt-4`}>Severability</p>
				<p className={textStyles}>
					If any clause is unenforceable, the remainder shall remain in full force.
				</p>

				<h4 id="acceptance" className="scroll-mt-[130px]">
					Acceptance
				</h4>
				<p className={textStyles}>By clicking "Grab" on any listing, you:</p>
				<ul className={listStyles}>
					<li>Confirm you are at least 18 years old.</li>
					<li>Acknowledge you have read and accepted this Agreement and all incorporated Policies.</li>
					<li>Understand that commission is only paid upon Escrow completion.</li>
					<li>Agree to promote listings truthfully and responsibly.</li>
				</ul>

				<h4 id="contact" className="scroll-mt-[130px]">
					Contact
				</h4>
				<p className={textStyles}>
					<b>Legal:</b>{' '}
					<a className="text-secondary" href={`mailto:${BOONFU_LEGAL_MAIL}`}>
						{BOONFU_LEGAL_MAIL}
					</a>
				</p>
				<p className={textStyles}>
					<b>Support:</b>{' '}
					<a className="text-secondary" href={`mailto:${BOONFU_MAIL}`}>
						{BOONFU_MAIL}
					</a>
				</p>
				<p className={textStyles}>
					<b>Registered Office:</b> {BOONFU_ADDRESS}
				</p>
			</div>

			<ScrollToTop />
		</div>
	);
};

export default GrabSystem;

const textStyles = 'text-base leading-relaxed text-gray-500 dark:text-gray-400';
const listStyles = 'text-base leading-relaxed text-gray-500 dark:text-gray-400 list-disc pl-6';
const orderedListStyles =
	'text-base leading-relaxed text-primary dark:text-gray-400 list-decimal pl-6';
