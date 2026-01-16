import { BOONFU_LEGAL_MAIL, BOONFU_MAIL } from '../../constants';
import { Button } from '../../ui';

const TermsAndCondition = ({
	setIsOpen,
	isOpen,
	rulesRef,
	termsRef,
	customerRef,
	returnRef,
	promotionRef,
}) => {
	return (
		<div ref={termsRef} className="space-y-4 text-justify">
			<div className="flex flex-col items-center justify-center ">
				<p className="text-primary">[Effective Date: 22 December 2025]</p>
				<p className="text-primary">[Last Updated: 22 December 2025]</p>
			</div>
			<h4>1. INTRODUCTION</h4>
			<p className={textStyles}>
				1.1 Before registering or using the Boonfu website, you are required to carefully read,
				understand, and accept these Terms and Conditions (“T&C”), as they govern your access to and use
				of our Services (as defined below). Your continued use of or access to the Services constitutes
				your full acceptance of these Terms. If you do not agree with any part of these Terms, you must
				not use or access the Services in any manner.
				<br />
				<br />
				1.2 These T&C constitute a legally binding agreement between:
				<br />
				<br />
				<b>You</b>, the user of the Platform (“<b>you</b>,” “<b>your</b>”); and
				<br />
				<br />
				Boonfu Limited (hereinafter referred to as <b> “Boonfu,” “we,” “our,” or “us”</b>), which
				expression shall, where the context permits, include its legal representatives, successors, and
				assigns.
				<br />
				<br />
				1.3 These Terms govern your use of and access to the Boonfu website and any affiliated websites,
				applications, or digital platforms owned and operated by us (collectively referred to as the
				“Platform”), as well as all related features, content, tools, and services offered through it
				(collectively, the “Services”).
			</p>
			<h4 ref={rulesRef}>2. WHO WE ARE</h4>
			<p className={textStyles}>
				2.1 The Platform is operated by Boonfu Limited, the trading name of boonfu.com, a company
				registered under the laws of the Federal Republic of Nigeria with registration number RC
				7379214.
			</p>

			<ul className={listStyles}>
				<li>
					<b>Email</b>: <a href={`mailto:${BOONFU_LEGAL_MAIL}`}>{BOONFU_LEGAL_MAIL}</a> (for
					legal/compliance matters)
				</li>
				<li>
					<b>Support</b>: <a href={`mailto:${BOONFU_MAIL}`}>{BOONFU_MAIL}</a>
				</li>
				<li>
					<b>Registered Address</b>: As above
				</li>
			</ul>
			<p className={textStyles}>
				We reserve the right to revise or update these Terms of Use (“T&C”) at any time by amending this
				document. You are advised to review the Platform periodically to ensure that you are familiar
				with the most current version of the T&C, as continued use of the Platform constitutes
				acceptance of any such revisions.
				<br />
				<br />
				Unless the context otherwise requires:
			</p>
			<ul className={listStyles}>
				<li>
					References to an <b>individual</b> include his/her/their personal representatives.
				</li>
				<li>
					Words importing the <b>singular</b> include the plural and vice versa.
				</li>
				<li>
					References to any <b>gender</b> include all other genders.
				</li>
			</ul>

			<p className={textStyles}>
				2.2 <b>Definitions</b>: In these Terms of Use, unless the context otherwise requires, the
				following words and expressions shall have the meanings set out below:
			</p>
			<ul className={listStyles}>
				<li>
					<b>“Boonfu Platform”</b> or <b>“Platform”</b>: The website boonfu.com and all affiliated mobile
					applications operated by Boonfu.
				</li>
				<li>
					<b>“Grab Feature”</b>: A premium, opt-in marketing tool that enables Sellers to accelerate
					sales by allowing Grabbers to promote their listings via affiliate links.
				</li>
				<li>
					<b>“Sellers”</b>: Users who list items for sale on the Platform.
				</li>
				<li>
					<b>“Buyers”</b>: Users who purchase items listed on the Platform.
				</li>
				<li>
					<b>“Grabbers”</b>: Independent affiliate marketers who share “grabbable” listings to earn
					commissions.
				</li>
				<li>
					<b>“Boonfu Wallet”</b>: A virtual account within the Platform used to hold, lock, and transact
					funds for Grab promotions and commissions.
				</li>
				<li>
					<b>“Escrow Service”</b>: Boonfu’s mandatory payment-holding mechanism for all Grab-enabled
					transactions.
				</li>
				<li>
					<b>“Locked Balance”</b>: Funds reserved in a Seller’s Wallet to secure a Grab listing.
				</li>
				<li>
					<b>“Basic Listing”</b>: A standard, non-promoted advertisement without Grab visibility.
				</li>
				<li>
					<b>“Nigerian Naira (₦)”</b>: The sole currency used for all transactions, fees, and commissions
					on the Platform.
				</li>
			</ul>

			<h4>3. SERVICES PROVIDED BY BOONFU</h4>
			<p className={textStyles}>
				Boonfu agrees to provide the following services to the Client under this Agreement:
			</p>
			<ul className={listStyles}>
				<li>
					3.1 <b>C2C Marketplace</b>: A peer-to-peer platform for listing and discovering goods (e.g.,
					electronics, vehicles, real estate, service).
				</li>
				<li>
					3.2 <b>Grab Feature</b>: A performance-based urgency sales engine that:
					<ul className={listStyles}>
						<li>
							Requires Sellers to fund a commission deposit (10% for general items; 1% for
							vehicles/properties) into their Locked Balance.
						</li>
						<li>Grants Grabbers real-time access to share listings via trackable affiliate links.</li>
						<li>
							Automatically pays 60% of the commission to the successful Grabber upon Escrow completion.
						</li>
					</ul>
				</li>
				<li>
					3.3 <b>Escrow Service</b>: A zero-cost, mandatory payment security mechanism for all Grab
					transactions:
					<ul className={listStyles}>
						<li>Buyer pays into Platform-held Escrow.</li>
						<li>Seller details disclosed only after payment confirmation.</li>
						<li>
							Buyer must arrange self-pickup within 24 hours; failure triggers refund (minus ₦1,000 admin
							fee) and relisting.
						</li>
					</ul>
				</li>
				<li>
					3.4 <b>Grabber Network</b>: A community of independent marketers who drive external traffic and
					earn commissions based on verified sales.
				</li>
				<li>
					3.5 <b>Promotional Services</b>: Optional paid visibility boosts (e.g., homepage banners,
					featured listings), governed by the Promotional Service Agreement.
				</li>
			</ul>
			<h4>4. USER ACCOUNTS & WALLET</h4>
			<ul className={listStyles}>
				<li>
					4.1 <b>Account Registration</b>: Users must register an account using a valid email address and
					mobile number. Both must be verified via One-Time Password (OTP) before full access to Platform
					features is granted.
				</li>
				<li>
					4.2 <b>Boonfu Wallet</b>: Boonfu operates exclusively on a digital wallet system—there is no
					token-based posting mechanism. The Boonfu Wallet serves as the central financial hub for all
					user transactions and includes the following functionalities:
					<ul className={listStyles}>
						<li>
							<b>Deposits</b>: Users may fund their wallet via supported payment methods to enable Grab
							Feature activation.
						</li>
						<li>
							<b>Withdrawals</b>: Funds may be withdrawn to the user’s registered bank account, subject to
							advert status and platform rules.
						</li>
						<li>
							<b>Transaction History</b>: All financial activities—including deposits, commission earnings,
							administrative deductions, and withdrawals—are recorded and accessible in real time within
							the user’s transaction history.
						</li>
					</ul>
				</li>
				<li>
					4.3 <b>Wallet Requirements for Grab Feature</b>
					<ul className={listStyles}>
						<li>
							4.3.1 To activate the Grab Feature, the Seller must ensure their wallet contains sufficient
							funds to cover the required commission deposit:
							<ul className={listStyles}>
								<li>10% of the listed price for general items, or</li>
								<li>1% of the listed price for vehicles and properties.</li>
							</ul>
						</li>
						<li>
							4.3.2 This amount is automatically placed in a Locked Balance upon listing publication and
							remains reserved for the duration of the Grab promotion period (one month).
						</li>
						<li>
							4.3.3 Withdrawal requests for funds tied to active Grab listings will be rejected until the
							associated advert is deactivated or expires.
						</li>
					</ul>
				</li>
				<li>
					4.4 <b>Account Security</b>: You are solely responsible for maintaining the confidentiality of
					your login credentials and for all actions performed under your account. Boonfu strongly
					advises enabling additional security measures (e.g., strong passwords, device trust settings)
					and promptly reporting any unauthorized access to{' '}
					<a href={`mailto:${BOONFU_MAIL}`}>{BOONFU_MAIL}</a>
				</li>
			</ul>

			<h4>5. GRAB FEATURE TERMS</h4>
			<ul className={listStyles}>
				<li>
					5.1 <b>Activation</b>:
					<ul className={listStyles}>
						<li>
							Seller must pre-fund Wallet with 10% (general) or 1% (vehicles/properties) of listed price.
						</li>
						<li>Deposit is locked for 1 calendar month.</li>
					</ul>
				</li>
				<li>
					5.2 <b>Outcomes</b>:
					<ul className={listStyles}>
						<li>
							If sold via Grabber: Full deposit becomes commission (60% to Grabber, 40% to Platform). No
							refund.
						</li>
						<li>
							If unsold after 1 month: Seller receives “Take Action” notice.
							<ul className={listStyles}>
								<li>Downgrade to Basic Listing: 90% of deposit refunded; 10% admin fee retained.</li>
								<li>Reduce price by ≥10%: Qualifies for new 1-month Grab cycle (new deposit required).</li>
								<li>
									Cancellation (Vehicles/Properties only): Permitted within 7 days; 5% admin fee; 95%
									refunded.
								</li>
							</ul>
						</li>
					</ul>
				</li>

				<li>
					5.3 <b>Escrow Mandatory</b>: All Grab transactions must use Boonfu Escrow. Bypassing Escrow
					voids commission eligibility.
				</li>
			</ul>

			<h4>6. PURPOSE</h4>
			<ul className={listStyles}>
				<li>
					6.1 <b>Purpose</b>
					<ul className={listStyles}>
						<li>
							6.1.1 These Terms and Conditions (“T&C”) and any other agreements between you and Boonfu
							constitute a legally binding contract that governs your access to and use of the Platform.
							These T&C, including any amendments or variations, shall take effect upon publication on the
							Platform or on such other date as may be expressly communicated.
						</li>
						<li>
							6.1.2 The Platform is intended solely for individuals aged 18 years and above. Any access to
							or use of the Platform by persons under the age of 18 is unauthorized, unlicensed, and a
							violation of these T&C. By accessing or using the Platform, you represent and warrant that
							you are at least 18 years old and possess the legal capacity to enter into binding
							agreements.
						</li>
					</ul>
				</li>
			</ul>

			<h4>7. ACCEPTANCE AND USE</h4>
			<ul className={listStyles}>
				<li>
					7.1 <b>Acceptance</b>
					<ul className={listStyles}>
						<li>
							7.1.1 These T&C govern your use of all products, services, content, and information made
							available by Boonfu through the Platform. By downloading, registering, accessing, or using
							the Platform, you acknowledge that you have read, understood, and agreed to be legally bound
							by these T&C and our Privacy Policy. If you do not agree with any provision of these T&C or
							our Privacy Policy, you must not access or use the Platform. During the sign-up process, you
							will be required to click on the “REGISTER” button, which constitutes your explicit
							acceptance of these T&C and the Privacy Policy and governs your subsequent access to and use
							of the Platform.
						</li>
						<li>
							7.1.2 By registering an account on the Platform, you agree to comply with and be bound by all
							applicable Terms of Use, policies, and operational rules governing the Platform’s
							functionality and services.
						</li>
					</ul>
				</li>
				<li>
					7.2 <b>Use of the Boonfu Platform</b>
					<ul className={listStyles}>
						<li>
							7.2.1 Your use of the Platform is governed by the version of the T&C in effect at the time of
							access or use. Boonfu reserves the right to amend, modify, or update these T&C at any time,
							with or without prior notice. Continued access or use of the Platform following the
							publication of an updated version constitutes your acceptance of the amended T&C.
						</li>
						<li>
							7.2.2 You acknowledge and agree that the Platform and all related Services are offered
							exclusively through electronic means. Any inquiries, issues, or complaints relating to the
							Platform must be directed to Boonfu through the designated customer support email provided on
							the Platform.
						</li>
					</ul>
				</li>
			</ul>

			<h4>8. ACCESS TO BOONFU PLATFORM</h4>
			<ul className={listStyles}>
				<li>
					8.1 <b>Platform Access and Purpose</b>:
					<ul className={listStyles}>
						<li>
							Boonfu provides its services exclusively through electronic means via boonfu.com and
							affiliated mobile applications. The Platform is designed as a Customer-to-Customer (C2C)
							digital marketplace that facilitates the listing, discovery, and transaction of
							goods—including electronics, fashion, vehicles, and real estate—while also enabling
							performance-based affiliate marketing through the proprietary “Grab Feature.”
						</li>
						<li>
							To access and use the Platform’s full functionality, you must register and create a verified
							User Profile. By registering, you confirm that you meet the eligibility criteria for one or
							more of the following defined user roles:
						</li>
					</ul>
				</li>
				<li>
					8.2 <b>Definition of User Roles</b>
					<ul className={listStyles}>
						<li>
							(a) <b>Seller</b>: A Seller is a registered User who lists items for sale on the Platform.
							Sellers may:
							<ul className={listStyles}>
								<li>Post Basic Listings (standard advertisements), or</li>
								<li>
									Activate the Grab Feature to enable urgent, affiliate-driven promotion of their items.
								</li>
								<li>
									Sellers are solely responsible for the accuracy, legality, and condition of their listings.
									By activating the Grab Feature, Sellers automatically opt into the mandatory Escrow Service
									and agree to the Customer Service Agreement governing Grab-enabled transactions.
								</li>
							</ul>
						</li>
						<li>
							(b) <b>Buyer</b>: A Buyer is a registered User who browses, contacts, and purchases items
							listed on the Platform. Buyers who engage with Grab-enabled listings must complete payment
							through Boonfu’s Escrow Service. Upon payment confirmation, Buyers are required to initiate
							contact with the Seller and arrange self-pickup within 24 hours. Failure to do so may result
							in transaction cancellation, relisting of the item, and a refund minus a ₦1,000
							administrative fee.
						</li>
						<li>
							(c) <b>Grabber</b>: A Grabber is a registered User who acts as an independent affiliate
							marketer. Grabbers:
							<ul className={listStyles}>
								<li>Receive real-time notifications of newly posted Grab-enabled listings,</li>
								<li>May “Grab” any eligible listing to generate a unique, trackable affiliate link,</li>
								<li>
									Share these links across external platforms (e.g., WhatsApp, Instagram, blogs) to drive
									traffic and sales.
								</li>
								<li>
									Earn 60% of the commission deposit (IF item is under “other general categories) only upon
									successful sale and Escrow completion of that item.
								</li>
								<li>
									Earn 80% of the commission deposit (IF item is under “cars and Property categories) only
									upon successful sale and Escrow completion of that item.
								</li>
								<li>
									Grabbers are not employees, agents, or partners of Boonfu. They operate under the Grabber
									Service Agreement and are required to represent listings truthfully and avoid spam or
									misleading promotion.
								</li>
							</ul>
						</li>
					</ul>
				</li>
				<li>
					8.3 <b>Verification and Compliance</b>
					<ul className={listStyles}>
						<li>
							8.3.1 To create a User Profile on the Platform, you will be required to provide a valid Full
							Name, email address, Nigerian mobile number and your Location (collectively, “Personal
							Information”).
						</li>
						<li>
							8.3.2 You agree to provide information that is true, accurate, current, and complete, and you
							authorize Boonfu to verify such information through independent sources as may be available
							to us. You shall promptly update your Personal Information via the Platform in the event of
							any change or modification to ensure it remains accurate and up to date.
						</li>
						<li>
							8.3.3 To access and use the Platform, you must register and create a User Profile. Your email
							address will serve as your username, and you will be required to create a password for secure
							access. Boonfu maintains physical, electronic, and procedural safeguards in compliance with
							applicable data protection and regulatory standards to protect users’ non-public Personal
							Information. You are solely responsible for maintaining the confidentiality and security of
							your login credentials (username and password) and for all activities conducted under your
							User Profile. While Boonfu takes reasonable measures to protect your Personal Information,
							you acknowledge that you bear full responsibility for any unauthorized access, disclosure, or
							misuse of your information resulting from your own negligence, inaction, or carelessness. You
							must notify Boonfu immediately if you become aware of any unauthorized disclosure, loss,
							theft, or compromise of your login credentials or Personal Information.
						</li>
						<li>
							8.3.4 Boonfu reserves the right to request additional information or documentation from you
							at any time in connection with your use of the Platform. Failure to provide the requested
							information within the stipulated timeframe may result in suspension, restriction, or
							termination of your access to the Platform.
						</li>
						<li>
							8.3.5 Boonfu reserves the right, at its sole discretion, to decline, restrict, or revoke your
							access to the Platform at any stage, without prior notice or obligation to provide reasons,
							except as may be required by applicable law.
						</li>
						<li>
							8.3.6 The Services offered by Boonfu are provided electronically via our website and mobile
							application. You acknowledge and agree that you are not entitled to receive or demand any
							in-person service delivery at Boonfu’s office unless expressly permitted by Us at our
							discretion.
						</li>
						<li>
							8.3.7 Upon successful completion of the registration process, you will be deemed to have
							established a User Profile, granting you access to use the Platform in accordance with these
							T&C.
						</li>
					</ul>
				</li>
			</ul>

			<h4>9. PROHIBITED USES</h4>
			<p className={textStyles}>
				9.1 You agree that you shall not, whether directly or indirectly, engage in any activity or use
				the Platform in any manner that:
			</p>
			<ul className={listStyles}>
				<li>
					9.1.1 Causes damage to, interferes with, or places an unreasonable or disproportionate load on
					Boonfu’s servers, networks, or any connected systems, or otherwise disrupts the proper
					functioning or accessibility of the Platform;
				</li>
				<li>
					9.1.2 Involves or facilitates any illegal, unlawful, or malicious activity, including but not
					limited to money laundering, terrorism financing, fraud, identity theft, racketeering, or any
					other criminal conduct prohibited under the laws of the Federal Republic of Nigeria or any
					other applicable jurisdiction;
				</li>
				<li>
					9.1.3 Involves impersonating any person or entity, misrepresenting your affiliation with any
					person or organization, or providing false, misleading, or fraudulent information;
				</li>
				<li>
					9.1.4 Involves posting, uploading, or transmitting any material, data, or content for which you
					have not obtained all necessary licenses, consents, or authorizations;
				</li>
				<li>
					9.1.5 Involves Posting prohibited items (e.g., weapons, counterfeit goods, illegal substances).
				</li>
				<li>
					9.1.6 Constitutes, encourages, or promotes conduct that would be considered a criminal offense,
					gives rise to civil liability, or otherwise violates any applicable law or regulation in
					Nigeria or elsewhere;
				</li>
				<li>
					9.1.7 Involves unauthorized access to, or use of, another user’s account, profile, or data, or
					any attempt to solicit or obtain another user’s login credentials or personal information.
				</li>
				<li>
					9.1.8 Boonfu reserves the right, at its sole discretion, to suspend or terminate your access to
					the Platform if it suspects or determines that you have engaged, or attempted to engage, in any
					of the prohibited activities described above.
				</li>
				<li>
					9.1.9 In addition, Boonfu reserves the right to take any appropriate civil or criminal action
					against you and to report any such activity to relevant authorities. Boonfu shall not be liable
					for any loss, damage, or consequence arising from your breach or misuse of the Platform or
					Services.
				</li>
			</ul>

			<h4>10. COMMUNICATION</h4>
			<p className={textStyles}>
				You consent to receive all notifications, notices, records, statements, updates, communications,
				and any other information relating to your use of the Platform electronically (“
				<b>Correspondence and Communication</b>”). Where applicable, you shall be responsible for any
				charges, costs, or expenses associated with the delivery of such Correspondence and
				Communication to you.
			</p>

			<h4>11. TRANSMISSION OF PERSONAL INFORMATION</h4>
			<p className={textStyles}>
				11.1 Your use of the Platform may require the transmission of your personal information to
				third-party service providers. By using the Platform, you expressly consent to such transmission
				and acknowledge that this consent remains valid for each subsequent use of the Platform. You
				further agree that we may, at our discretion, request additional information from you to verify
				your identity, assess your eligibility, or facilitate your continued use of the Platform.
			</p>
			<p className={textStyles}>
				11.2 The collection, transmission, processing, and analysis of your personal data shall be
				conducted in compliance with the Nigeria Data Protection Regulation (NDPR) 2019 and any other
				applicable data protection laws in force.
			</p>

			<h4>12. USAGE MONITORING</h4>
			<p className={textStyles}>
				We reserve the right to access, archive, and monitor your use of the Platform in accordance with
				the laws of the Federal Republic of Nigeria. By using the Platform, you acknowledge and consent
				to such monitoring for purposes including but not limited to ensuring service quality,
				maintaining system security, evaluating performance, or verifying compliance with these Terms
				and Conditions.
			</p>
			<p className={textStyles}>
				You agree that our monitoring activities do not grant you any cause of action or right regarding
				how such monitoring is conducted or enforced. You further agree that{' '}
				<b>
					Boonfu shall not be liable for any loss or damage arising from, or related to, our monitoring
					of your Platform usage.
				</b>
			</p>

			<h4>13. COPYRIGHT, TRADEMARK, AND OTHER INTELLECTUAL PROPERTY RIGHTS</h4>
			<p className={textStyles}>
				You acknowledge that the Platform and all related content are protected by applicable copyright,
				trademark, patent, trade secret, proprietary, and other intellectual property laws, all of which
				remain valid and enforceable across all forms, media, and technologies, whether existing or
				subsequently developed.
			</p>
			<p className={textStyles}>
				Accordingly, you may not copy, distribute, reproduce, modify, or create derivative works of any
				part of the Platform—including but not limited to text, graphics, user interface design, or
				logos—except where expressly authorized in writing by us.
			</p>
			<p className={textStyles}>
				You must not use any part of the Platform’s content for commercial purposes without first
				obtaining a license or written authorization from us. Where such authorization or license is
				granted, our status as the owner or author of the Platform content must always be properly
				acknowledged.
			</p>

			<h4>14. CONNECTIVITY</h4>
			<p className={textStyles}>
				You are solely responsible for the means through which you access the Platform. You acknowledge
				that your hardware, software, internet connection, telecommunications provider, or other
				third-party systems involved in connecting you to the Platform may not perform as intended.
			</p>
			<p className={textStyles}>
				We shall not be liable for any loss, damage, or disruption caused by viruses, malware, or other
				technologically harmful materials that may infect your hardware, software, or data as a result
				of your use of the Platform or your downloading of any content from it.
			</p>

			<h4>15. INDEMNIFICATION</h4>
			<ul className={listStyles}>
				<li>
					15.1 You acknowledge that the Platform is not a fully secure medium for transmitting
					information and agree that any risks associated with loss, interception, or unauthorized access
					to information are borne solely by you. Boonfu shall not be held liable for any resulting loss
					or damage.
				</li>
				<li>
					15.2 Boonfu shall not be liable for any damages or injuries arising from or in connection with
					your use or inability to use the Platform, including but not limited to: system unavailability,
					performance failure, data loss or corruption, damage to property (including loss of profit or
					goodwill), business interruption, errors, omissions, defects, communication failures, or delays
					in operation or transmission.
				</li>
				<li>
					15.3 You agree to fully indemnify and hold harmless Boonfu, its directors, officers, employees,
					partners, successors, and assigns from and against any and all claims, actions, proceedings,
					damages, losses, costs, or expenses (including legal fees) arising from or related to your use
					or misuse of the Platform.
				</li>
			</ul>

			<h4>16. AVAILABILITY OF THE PLATFORM AND SERVICES</h4>
			<ul className={listStyles}>
				<li>
					16.1 While we have invested significant resources in developing and maintaining the Platform,
					occasional technical issues such as slowdowns, glitches, or system crashes may occur. We may
					also need to temporarily restrict access to certain parts of the Platform to perform
					maintenance or upgrades, which will typically be scheduled during off-peak hours. While we
					strive to keep the Platform available seven days a week, we do not guarantee uninterrupted
					access at all times.
				</li>
				<li>
					16.2 We continuously enhance and improve the services offered through the Platform and reserve
					the right to modify, suspend, or discontinue any part of the Platform or its services, either
					temporarily or permanently, with or without prior notice to you.
				</li>
			</ul>

			<h4>17. TERMINATION AND WITHDRAWAL</h4>
			<ul className={listStyles}>
				<li>
					17.1 <b>Termination</b>
					<ul className={listStyles}>
						<li>
							17.1.1 You acknowledge and agree that Boonfu may, at its sole discretion, restrict, suspend,
							or terminate your access to all or any part of the Platform, or your rights under these T&C,
							at any time, with or without cause, including but not limited to any breach of these T&C, and
							without prior notice.
						</li>
						<li>
							17.1.2 Boonfu will fully cooperate with law enforcement authorities or court orders
							requesting or directing disclosure of the identity of any user who posts, publishes, or
							otherwise makes available content or information that is believed to violate these T&C.
						</li>
						<li>
							17.1.3 Any suspension, termination, or cancellation of your access to the Platform does not
							relieve you of obligations under these T&C, including but not limited to provisions
							concerning ownership, indemnification, and limitation of liability, which are intended to
							survive such suspension, termination, or cancellation.
						</li>
					</ul>
				</li>
				<li>
					17.2 <b>Withdrawal</b>: You may withdraw from the Platform at any time by deleting your account
					in accordance with the procedures provided on the Platform.
				</li>
			</ul>

			<h4>18. REPRESENTATIONS AND WARRANTIES</h4>
			<p className={textStyles}>By using the Platform, you represent and warrant that:</p>
			<ul className={listStyles}>
				<li>18.1 You have read, understood, and agree to be bound by these T&C;</li>
				<li>18.2 You are at least 18 years of age;</li>
				<li>
					18.3 All Personal Information and other information provided to Boonfu is true, accurate,
					authentic, current, and complete;
				</li>
				<li>
					18.4 You grant Boonfu the right to use your Personal Information in accordance with these T&C;
				</li>
				<li>
					18.5 You agree to comply with and be bound by these T&C, which are without prejudice to any
					other rights Boonfu may have under the laws of the Federal Republic of Nigeria or otherwise;
				</li>
				<li>
					18.6 You shall not assign or transfer your rights under these T&C without Boonfu’s prior
					written approval;
				</li>
				<li>
					18.7 Your acceptance and use of the Platform does not violate any applicable law in Nigeria or
					any contract or obligation to which you are a party; and
				</li>
				<li>
					18.8 If you are accepting these T&C on behalf of a company, organization, or other legal
					entity, you have the authority or consent to do so on behalf of that entity.
				</li>
			</ul>

			<h4>19. LIMITATION OF LIABILITY AND DISCLAIMER OF WARRANTIES</h4>
			<ul className={listStyles}>
				<li>
					19.1 <b>Limitation of Liability</b>: You acknowledge and agree that Boonfu is not a party to
					any transactions, relationships, or disputes between you and Buyers, Sellers or Grabbers. We do
					not pre-screen these parties and are not responsible for any fraudulent, unlawful, or
					unauthorized transactions, communications, or engagements involving them.
				</li>
				<li>
					19.2 We exclude all liability arising from any actions we may take in response to breaches of
					our Services. Your sole remedy for dissatisfaction with the Platform is to cease using the
					Platform.
					<p className={textStyles + ' mt-2'}>
						Under no circumstances shall Boonfu Limited be liable for any direct, indirect, incidental,
						consequential, special, punitive, or exemplary damages (collectively, “Excluded Damages”)
						arising out of or in connection with your use of, or inability to use, the Platform. This
						includes, without limitation:
					</p>
					<ul className={listStyles}>
						<li>
							Loss of anticipated profits, sales, business, business opportunity, savings, revenue,
							goodwill, reputation, or data;
						</li>
						<li>
							Any failure of performance, denial of service, cyber-attack, interruption, defect, operator
							errors, inconvenience, or delay in operation or transmission;
						</li>
						<li>
							Business interruption; failure of electronic or mechanical equipment or communication lines
							(including telephone and internet);
						</li>
						<li>
							Severe or extraordinary weather events (including floods, earthquakes, or other acts of God);
						</li>
						<li>
							Fire, war, insurrection, terrorist acts, riots, labor disputes, accidents, emergencies, or
							government actions;
						</li>
						<li>
							Theft, destruction, unauthorized access, alteration, or use of your information, equipment,
							or property by third parties;
						</li>
						<li>
							Any disputes, losses, or damages arising from your interactions or transactions with Sellers,
							Buyers or Grabbers.
						</li>
					</ul>
				</li>
				<li>
					19.3 Maximum liability is capped at the greater of:
					<ul className={listStyles}>
						<li>₦50,000, or</li>
						<li>Total fees paid by you in the last 12 months.</li>
					</ul>
				</li>
				<li>
					19.4 <b>Disclaimer of Warranties</b>:
					<ul className={listStyles}>
						<li>
							19.4.1 The Platform is provided on an “as is” and “as available” basis, without warranties of
							any kind, whether express or implied. Neither Boonfu, nor its officers, directors, employees,
							or agents, guarantee the accuracy, reliability, completeness, or usefulness of any
							information, content, or materials available on the Platform.
						</li>
						<li>
							19.4.2 We do not warrant that the Platform will meet your specific needs or expectations, or
							that your access to the Platform will be uninterrupted, secure, or error-free.
						</li>
						<li>
							19.4.3 Your interactions with Sellers, Buyers and Grabbers through the Platform are entirely
							at your own risk. Boonfu does not guarantee the smoothness, legality, or outcome of any
							business transactions, communications, or engagements you may have with such parties.
						</li>
						<li>
							19.4.4 You acknowledge that any use of the Platform, including engagements with Sellers,
							Buyers and Grabbers, is at your sole risk, and Boonfu shall not be liable for any loss,
							damage, or disputes arising from such interactions or transactions.
						</li>
					</ul>
				</li>
			</ul>

			<h4>20. THIRD-PARTY SERVICE PROVIDERS</h4>
			<ul className={listStyles}>
				<li>
					20.1 To facilitate your use of the Platform, Boonfu may utilize the services of third-party
					service providers. You acknowledge that Boonfu is not responsible for the services, actions,
					privacy policies, or practices of any third-party service provider.
				</li>
				<li>
					20.2 You must review and accept the terms of use of any third-party service provider before
					using their services through the Platform. If you do not accept their terms, you must refrain
					from using their services. Boonfu will make reasonable efforts to communicate any changes,
					amendments, or variations to the terms of third-party service providers to you promptly.
				</li>
			</ul>

			<h4>21. THIRD-PARTY SERVICE PROVIDERS DISCLAIMER</h4>
			<ul className={listStyles}>
				<li>
					21.1 You acknowledge that these T&C govern only the Platform and services provided by Boonfu,
					and do not govern the services of third-party service providers. Your use of such third-party
					services is entirely at your own risk.
				</li>
				<li>
					21.2 Boonfu’s decision to integrate or allow the use of third-party services does not
					constitute an endorsement of their content, products, or services. Boonfu does not control
					third-party service providers, and there is no agency, partnership, or joint venture
					relationship between Boonfu and any third-party service provider.
				</li>
				<li>
					21.3 Boonfu expressly disclaims all liability for the accuracy, reliability, completeness, or
					usefulness of any service or information provided by third-party service providers. Boonfu does
					not guarantee that third-party services will be secure, uninterrupted, or error-free, and shall
					not be liable for any damages resulting from your use of such services.
				</li>
				<li>
					21.4 Any dispute, claim, controversy, or complaint arising from your use of third-party
					services must be resolved in accordance with the terms of the applicable third-party service
					provider.
				</li>
			</ul>

			<h4>22. GOVERNING LAW AND DISPUTE RESOLUTION</h4>
			<ul className={listStyles}>
				<li>
					22.1 <b>Governing Law</b>: These T&C shall be governed by and construed in accordance with the
					laws of the Federal Republic of Nigeria.
				</li>
				<li>
					22.2 <b>Dispute Resolution</b>: Any claim, controversy, complaint, or dispute arising out of or
					in connection with your use of the Platform (a “Dispute”) shall first be addressed by mutual
					consultation between you and Boonfu.
				</li>
				<li>
					22.3 If the Dispute cannot be resolved within 30 (thirty) days, it shall be submitted to
					arbitration in accordance with the Arbitration and Mediation Act, 2023. The parties shall
					jointly appoint a sole arbitrator. If the parties cannot agree on an arbitrator within 14
					(fourteen) days of notice, any party may apply to the Chairman of the Chartered Institute of
					Arbitrators, UK (Nigeria Branch) to appoint an arbitrator.
				</li>
				<li>
					22.4 The place of arbitration shall be Lagos State, Nigeria, and the proceedings shall be
					conducted in English. The resulting arbitral award shall be final and binding, and judgment may
					be entered in any court with jurisdiction.
				</li>
				<li>
					22.5 Notwithstanding the above, Boonfu reserves the exclusive right to initiate legal
					proceedings in any Nigerian court regarding any Dispute.
				</li>
			</ul>

			<h4>23. SEVERABILITY AND MISCELLANEOUS PROVISIONS</h4>
			<ul className={listStyles}>
				<li>
					23.1 <b>Severability</b>: If any provision of these T&C is deemed unlawful, void, or
					unenforceable, the remaining provisions shall remain in full force and effect. Failure to
					enforce any provision shall not constitute a waiver of that provision or any other right.
				</li>
				<li>
					23.2 <b>Compliance with Law</b>: You agree to comply with all applicable laws, rules, and
					regulations governing your use of the Platform.
				</li>
				<li>
					23.3 <b>Assignment and Relationship</b>: Boonfu may assign its rights and obligations under
					these T&C without your consent. The relationship between you and Boonfu is strictly that of
					independent contractors, and nothing in these T&C shall be construed to create an agency,
					employment, partnership, or joint venture relationship.
				</li>
			</ul>
			<h4 ref={returnRef}>24. RETURN/REFUND POLICY</h4>
			<ul className={listStyles}>
				<li>
					24.1 <b>INTRODUCTION</b>: Boonfu operates as a Customer-to-Customer (C2C) online marketplace.
					This means Boonfu does not sell, own, or ship any items listed on the Platform. Instead,
					individual Sellers post listings, and Buyers connect directly with them to arrange
					transactions. Because of this peer-to-peer model, returns are not managed by Boonfu. However,
					to promote trust and reduce disputes—especially in high-velocity “Grab Feature” sales, Boonfu
					provides a mandatory Escrow Service that holds buyer payment securely until item condition and
					handover are confirmed. This Return Policy explains why most transactions are final sale, how
					Escrow acts as your primary protection, the limited circumstances under which a return or
					cancellation may occur, and your responsibilities as a Buyer or Seller. By using Boonfu, you
					acknowledge that you understand and accept this policy.
				</li>
				<li>
					24.2 <b>NO STANDARD RETURN RIGHTS</b>: All transactions on Boonfu are considered FINAL SALE
					unless otherwise agreed between the Buyer and Seller. This is because Boonfu facilitates
					peer-to-peer transactions involving items that may be new, used, or pre-owned. Sellers are
					private individuals, not commercial entities and therefore do not operate return or exchange
					systems. All sales are fulfilled via buyer-arranged self-pickup; Boonfu does not manage
					shipping, delivery, or logistics. Boonfu does not enforce, facilitate, or guarantee returns,
					exchanges, or repairs. Any such arrangement must be mutually agreed upon by the Buyer and
					Seller outside of the Platform.
				</li>
				<li>
					24.3 <b>ESCROW SERVICE: YOUR TRANSACTION SAFEGUARD</b>: While returns are not standard,
					Grab-enabled listings include Boonfu’s mandatory Escrow Service designed to prevent the need
					for returns by ensuring payment is only released after the Buyer confirms receipt.
					<ul className={listStyles}>
						<li>
							<b>How Escrow Protects You:</b>
							<ul className={listStyles}>
								<li>
									<b>Buyer:</b> Your payment is held by Boonfu—not the Seller—until you physically inspect
									the item at pickup.
								</li>
								<li>
									<b>Seller:</b> You only receive funds after the Buyer confirms satisfaction (or the 24-hour
									window expires without dispute).
								</li>
								<li>
									<b>Grabber:</b> Commission is only paid after successful Escrow completion, ensuring fair
									reward.
								</li>
							</ul>
						</li>
						<li>
							<b>Important:</b> If the item does not match the listing description, you (the Buyer) must
							raise the issue BEFORE confirming receipt in Escrow. Once confirmed, the transaction is final
							and no return or refund will be processed by Boonfu.
						</li>
					</ul>
				</li>
				<li>
					24.4 <b>EXCEPTION: FAILED PICKUP (BUYER DEFAULT)</b>: If a Buyer fails to pick up the item
					within 24 hours of Escrow payment confirmation:
					<ul className={listStyles}>
						<li>The transaction is automatically cancelled,</li>
						<li>The item is relisted,</li>
						<li>
							The Buyer receives a refund of the item price, minus a ₦1,000 administrative fee (to cover
							bank and processing costs).
						</li>
					</ul>
					This is not a return—it is a transaction reversal due to non-completion. No item was exchanged,
					so no physical return occurs.
				</li>
				<li>
					24.5 <b>SELLER RESPONSIBILITIES</b>: Sellers must:
					<ul className={listStyles}>
						<li>Provide accurate photos, descriptions, and condition details,</li>
						<li>Be available for pickup within 24 hours of payment confirmation,</li>
						<li>Not misrepresent the item (e.g., hiding defects or claiming “new” for used goods).</li>
					</ul>
					If a Seller is found to have deliberately misled a Buyer, Boonfu may suspend the Seller’s
					account and support the Buyer in recovering funds via Escrow (if dispute is raised before
					confirmation), but will not force a return of the item.
				</li>
				<li>
					24.6 <b>BUYER RESPONSIBILITIES</b>: Buyers must:
					<ul className={listStyles}>
						<li>Inspect the item thoroughly at pickup,</li>
						<li>Confirm or dispute within the Escrow window,</li>
						<li>Not confirm payment if the item is significantly different from the listing.</li>
					</ul>
					Once you click “Confirm Receipt,” you waive all claims, and no return or refund will be
					entertained.
				</li>
				<li>
					24.7 <b>NON-GRAB (STANDARD) LISTINGS</b>: For non-Grab listings, Escrow is NOT available. These
					are direct peer-to-peer deals with no payment protection from Boonfu. Returns are entirely at
					the discretion of the Seller. Boonfu will not intervene in disputes or assist with returns for
					non-Grab transactions. We strongly recommend using the Grab Feature for high-value or urgent
					sales to activate Escrow protection.
				</li>
				<li>
					24.8 <b>PROHIBITED ITEMS & FRAUD</b>: If an item is found to be counterfeit, illegal, or
					dangerously misrepresented, Boonfu may remove the listing, ban the user, and report to
					authorities, but will not process a return—as Boonfu is not a party to the transaction.
				</li>
				<li>
					24.9 <b>QUESTIONS OR DISPUTES?</b>: Contact the other party directly first. If unresolved and
					the transaction used Grab + Escrow, report the case through the Escrow Dispute Channel on the
					site within 24 hours of payment with evidence (photos, chat logs). For non-Grab deals, Boonfu
					offers no dispute resolution.
					<p className={textStyles}>
						<b>Remember:</b> Boonfu is a matchmaking platform, not a store. Use Grab + Escrow for payment
						security. Inspect before confirming. Returns are not standard—protection happens upfront, not
						after sale.
					</p>
				</li>
			</ul>

			<h4 ref={customerRef}>25. CUSTOMER SERVICE AGREEMENT</h4>
			<p className={textStyles}>
				This Customer Service Agreement (“Agreement”) is a legally binding contract between Boonfu
				Limited, a company duly registered under the laws of the Federal Republic of Nigeria with
				Registration Number RC 7379214, and having its registered office at Plot 1B, Opeyemi Rotimi
				Famakinwa Close, Ajomale Zone, Opic, Lagos State, Nigeria (hereinafter referred to as “Boonfu”,
				“we”, “us”, or “our”), and you, the Seller (hereinafter referred to as “Client”, “you”, or
				“your”), who activates the Grab Feature on the Boonfu Platform. By activating the Grab Feature
				for any listing, you expressly acknowledge that you have read, understood, and agree to be bound
				by the terms of this Agreement, as well as Boonfu’s Terms of Use, Privacy Policy, Escrow Policy,
				and Refund & Return Policy (collectively, the “Policies”), all of which are incorporated herein
				by reference and form an integral part of this Agreement.
			</p>
			<ul className={listStyles}>
				<li>
					25.1 <b>DEFINITIONS</b>: For the purposes of this Agreement, the following terms shall have the
					meanings set forth below:
					<ul className={listStyles}>
						<li>
							<b>“Agreement”</b>: This Customer Service Agreement, including all schedules and annexes.
						</li>
						<li>
							<b>“Basic Listing”</b>: A standard, non-promoted advertisement without Grab visibility or
							Escrow protection.
						</li>
						<li>
							<b>“Boonfu Platform” or “Platform”</b>: The website boonfu.com and all affiliated mobile
							applications operated by Boonfu.
						</li>
						<li>
							<b>“Client”</b>: A registered user who lists items for sale and activates the Grab Feature.
						</li>
						<li>
							<b>“Escrow Service”</b>: Boonfu’s mandatory, zero-cost payment-holding mechanism for all
							Grab-enabled transactions.
						</li>
						<li>
							<b>“Grab Feature”</b>: A premium marketing and urgency sales tool that enables Sellers to
							accelerate sales via Boonfu’s network of independent affiliate marketers (“Grabbers”).
						</li>
						<li>
							<b>“Grabber”</b>: An independent affiliate marketer who shares “grabbable” listings via
							trackable links to earn commissions.
						</li>
						<li>
							<b>“Locked Balance”</b>: Funds reserved in the Client’s Boonfu Wallet to secure a Grab
							listing (10% for general items; 1% for vehicles/properties).
						</li>
						<li>
							<b>“Self-Pickup”</b>: The method of item handover, wherein the Buyer collects the item
							directly from the Seller within 24 hours of payment confirmation.
						</li>
						<li>
							<b>“Nigerian Naira (₦)”</b>: The sole currency for all fees, commissions, deposits, and
							transactions on the Platform.
						</li>
					</ul>
				</li>
				<li>
					25.2 <b>SERVICES PROVIDED BY BOONFU</b>: Boonfu agrees to provide the following services to the
					Client under this Agreement:
					<ul className={listStyles}>
						<li>
							<b>25.2.1 Grab Feature Activation & Promotion</b>: Upon Client’s request and successful
							funding of the required Locked Balance, Boonfu shall designate the listing as “grabbable.”
							The listing shall be promoted for one (1) calendar month via internal visibility enhancements
							(e.g., featured placement, search prioritization), real-time alerts to all active Grabbers,
							and eligibility forinclusion in Boonfu’s external marketing campaigns (e.g., social media,
							email digests).
						</li>
						<li>
							<b>25.2.2 Mandatory Escrow Service</b>: All Grab-enabled transactions must use Boonfu’s
							Escrow Service. Boonfu shall receive and securely hold Buyer payment in a segregated account,
							disclose Seller contact details only after payment confirmation, and release funds to the
							Seller only upon Buyer confirmation of receipt.
						</li>
						<li>
							<b>25.2.3 Affiliate (Grabber) Commission Management</b>: Boonfu shall automatically track,
							calculate, and disburse commissions to Grabbers. 60% of the locked balance is credited to the
							successful Grabber’s wallet, 40% is retained by Boonfu as platform service fee. For
							vehicles/properties, 80% of the locked balance is credited to the successful Grabber’s wallet
							while 20% is retained by Boonfu as platform service fee. Payout occurs only after Escrow
							completion.
						</li>
						<li>
							<b>25.2.4 Advert Lifecycle Management</b>: At the end of the 1-month Grab period, Boonfu
							shall notify the Client via email and dashboard (“Take Action” alert) and offer two options:
							Downgrade to Basic Listing (Advert remains live for 1 additional month at no cost; 90% of
							Locked Balance refunded, 10% retained as admin fee) OR Reduce Price by ≥10% (Qualifies for
							new 1-month Grab cycle; new Locked Balance calculated on revised price).
						</li>
					</ul>
				</li>
				<li>
					25.3 <b>CLIENT OBLIGATIONS</b>:
					<ul className={listStyles}>
						<li>
							<b>25.3.1 Accurate Listings</b>: Client shall provide truthful, complete, and non-misleading
							descriptions, photos, and condition details. Client shall not list prohibited items (e.g.,
							weapons, counterfeit goods, illegal substances).
						</li>
						<li>
							<b>25.3.2 Wallet Funding & Financial Responsibility</b>: Client must ensure sufficient Locked
							Balance before publishing: 10% of listed price for general items (e.g., phones, furniture),
							1% of listed price for vehicles and properties. Client acknowledges that the Locked Balance
							is not a fee but a commission deposit.
						</li>
						<li>
							<b>25.3.3 Self-Pickup Coordination</b>: Client shall be available to meet Buyers within 24
							hours of payment confirmation. Client shall not demand additional payments, deposits, or fees
							outside the Platform.
						</li>
						<li>
							<b>25.3.4 Compliance with Laws</b>: Client warrants compliance with all applicable Nigerian
							laws, including FCCPC Consumer Protection Regulations, NDPA 2023 (where personal data is
							shared), and Criminal Code (regarding fraud and misrepresentation).
						</li>
					</ul>
				</li>
				<li>
					25.4 <b>FEES, DEPOSITS, AND REFUNDS</b>:
					<ul className={listStyles}>
						<li>
							<b>25.4.1 Grab Listing Deposit</b>: Deposit is automatically locked upon listing activation.
							If sold via Grabber: 100% retained as commission (60% to Grabber, 40% to Boonfu).
						</li>
						<li>
							<b>25.4.2 Unsold Listings</b>: After 1 month: 10% administrative fee deducted; 90% unlocked
							for withdrawal.
						</li>
						<li>
							<b>25.4.3 Cancellation (Vehicles/Properties Only)</b>: Permitted only within 7 days of
							listing: 5% admin fee, 95% released as withdrawable balance.
						</li>
						<li>
							<b>25.4.4 Non-Refundable Scenarios</b>: Boonfu shall not issue refunds for listings removed
							due to policy violations or listings with basic subscription packages.
						</li>
					</ul>
				</li>
				<li>
					25.5 <b>ESCROW SERVICE: TERMS & LIMITATIONS</b>: Escrow is mandatory and automatic for all Grab
					listings. Boonfu does not inspect or verify item condition—only payment security. Once Buyer
					confirms receipt (or 24-hour window expires), the transaction is final. Boonfu is not liable
					for disputes arising from item quality, misrepresentation, or post-handover issues. Non-Grab
					listings are not covered by Escrow and are conducted at Client’s and Buyer’s sole risk.
				</li>
				<li>
					25.6 <b>INTELLECTUAL PROPERTY</b>: By posting content, Client grants Boonfu a non-exclusive,
					worldwide, perpetual, irrevocable, royalty-free, sublicensable license to display, promote, and
					distribute listings across all channels (including Grabber-shared platforms), and modify or
					adapt content for marketing, analytics, or algorithmic optimization. Client retains ownership
					but warrants they have full rights to post the content.
				</li>
				<li>
					25.7 <b>LIMITATION OF LIABILITY</b>: Boonfu acts as a facilitator, not a party to the sale. To
					the fullest extent permitted by Nigerian law, Boonfu shall not be liable for item authenticity,
					safety, legality, or existence, conduct of Buyers or Grabbers, or indirect, incidental, or
					consequential damages (e.g., lost profits, goodwill). Maximum aggregate liability is capped at
					the greater of ₦50,000 or total fees paid by Client in the 12 months preceding the claim.
				</li>
				<li>
					25.8 <b>TERM, TERMINATION, AND SURVIVAL</b>:
					<ul className={listStyles}>
						<li>
							<b>25.8.1 Term</b>: This Agreement remains in effect while Client has active Grab listings.
						</li>
						<li>
							<b>25.8.2 Termination by Boonfu</b>: Boonfu may immediately suspend or terminate Client
							access for policy violations, fraud or suspicious activity, or repeated misrepresentation.
						</li>
						<li>
							<b>25.8.3 Survival</b>: Sections on Liability, IP, Escrow, Indemnification, and
							Confidentiality shall survive termination.
						</li>
					</ul>
				</li>
				<li>
					25.9 <b>INDEMNIFICATION</b>: Client agrees to indemnify, defend, and hold harmless Boonfu from
					any claim, demand, or loss (including legal fees) arising from Client’s breach of this
					Agreement, misrepresentation of item condition or legality, or violation of Nigerian law or
					third-party rights.
				</li>
				<li>
					25.10 <b>GOVERNING LAW & DISPUTE RESOLUTION</b>:
					<ul className={listStyles}>
						<li>
							<b>25.10.1 Governing Law</b>: This agreement shall be governed by and construed in accordance
							with the laws of the Federal Republic of Nigeria.
						</li>
						<li>
							<b>25.10.2 Dispute Resolution</b>: Any claim, controversy, complaint, or dispute arising out
							of or in connection with your use of the Platform (a “Dispute”) shall first be addressed by
							mutual consultation between you and Boonfu.
						</li>
						<li>
							<b>25.10.3 Arbitration</b>: If the Dispute cannot be resolved within 30 (thirty) days, it
							shall be submitted to arbitration in accordance with the Arbitration and Mediation Act, 2023.
							The parties shall jointly appoint a sole arbitrator. If the parties cannot agree on an
							arbitrator within 14 (fourteen) days of notice, any party may apply to the Chairman of the
							Chartered Institute of Arbitrators, UK (Nigeria Branch) to appoint an arbitrator.
						</li>
					</ul>
				</li>
				<li>
					25.11 <b>MISCELLANEOUS</b>:
					<ul className={listStyles}>
						<li>
							<b>25.11.1 Entire Agreement</b>: This Agreement, together with the incorporated Policies,
							constitutes the entire understanding between the parties.
						</li>
						<li>
							<b>25.11.2 Amendments</b>: Boonfu may update this Agreement upon 30 days’ notice via Platform
							posting. Continued use constitutes acceptance.
						</li>
						<li>
							<b>25.11.3 Assignment</b>: Boonfu may assign this Agreement without consent. Client may not
							assign without Boonfu’s prior written approval.
						</li>
						<li>
							<b>25.11.4 Severability</b>: If any clause is held unenforceable, the remainder shall remain
							in full force.
						</li>
						<li>
							<b>25.11.5 Independent Contractor Status</b>: Grabbers are independent contractors. Nothing
							herein creates an employment, partnership, or agency relationship between Boonfu and Client.
						</li>
					</ul>
				</li>
				<li>
					25.12 <b>ACCEPTANCE</b>: By clicking “Activate Grab Feature”, you confirm you are at least 18
					years old, acknowledge you have read and accepted this Agreement and all incorporated Policies,
					agree to the mandatory Escrow, 24-hour Self-Pickup, and commission structure, and waive all
					claims against Boonfu for losses arising from your use of the Grab Feature, except as
					prohibited by Nigerian law.
				</li>
			</ul>

			<h4 ref={promotionRef}>26. PROMOTIONAL SERVICE AGREEMENT</h4>
			<p className={textStyles}>
				This Promotional Service Agreement (“Agreement”) is a legally binding contract between Boonfu
				Limited, a company duly registered under the laws of the Federal Republic of Nigeria with
				Registration Number RC 7379214, and having its registered office at Plot 1B, Opeyemi Rotimi
				Famakinwa Close, Ajomale Zone, Opic, Lagos State, Nigeria (hereinafter referred to as “Boonfu”,
				“we”, “us”, or “our”), and you, the Client (hereinafter referred to as “you”, “your”, or
				“Seller”), who purchases promotional visibility services on the Boonfu Platform. By purchasing
				or activating any Promotional Service via the Boonfu Platform, you expressly acknowledge that
				you have read, understood, and agree to be bound by the terms of this Agreement, as well as
				Boonfu’s Terms of Use, Privacy Policy, and Customer Service Agreement (collectively, the
				“Policies”), all of which are incorporated herein by reference.
			</p>
			<ul className={listStyles}>
				<li>
					26.1 <b>DEFINITIONS</b>:
					<ul className={listStyles}>
						<li>
							<b>“Agreement”</b>: This Promotional Service Agreement, including all schedules and annexes.
						</li>
						<li>
							<b>“Boonfu Platform” or “Platform”</b>: The websites boonfu.com and affiliated mobile
							applications.
						</li>
						<li>
							<b>“Client”</b>: A registered Seller who purchases Promotional Services to enhance listing
							visibility.
						</li>
						<li>
							<b>“Promotional Services”</b>: Paid on-platform visibility enhancements, including but not
							limited to Featured Listing Placement (top of category or homepage), Highlighted Adverts
							(badges, color coding, priority in search results), Dedicated Banner Ads (on relevant
							Platform pages), and Urgent Sale Tagging (distinct visual indicator).
						</li>
						<li>
							<b>“Promotion Period”</b>: The duration (in days or weeks) for which the Promotional Service
							remains active, as selected and paid for by the Client.
						</li>
					</ul>
					<p className="mt-2 text-sm italic">
						Note: Promotional Services are strictly limited to the Boonfu Platform only. Boonfu does not
						promote listings on external channels (e.g., Instagram, Facebook, WhatsApp, or email
						newsletters) unless separately agreed under a different service contract.
					</p>
				</li>
				<li>
					26.2 <b>PROMOTIONAL SERVICE POLICY</b>:
					<ul className={listStyles}>
						<li>
							<b>26.2.1 Engagement of Promotional Services</b>: The Client may elect to purchase
							Promotional Services directly through the Boonfu Platform dashboard. Activation occurs
							immediately upon successful payment and wallet deduction. The selected listing will be
							elevated in visibility for the full Promotion Period.
						</li>
						<li>
							<b>26.2.2 Scope of Promotion</b>: All Promotional Services operate exclusively within the
							Boonfu Platform. Boonfu will deploy the selected promotional format (e.g., homepage banner,
							featured tag) as described at the point of purchase. No external marketing (social media,
							email, paid ads) is included unless explicitly offered and labeled as a separate “External
							Promotion Package” (which is not currently available).
						</li>
						<li>
							<b>26.2.3 No Guarantee of Sales or Performance</b>: While Boonfu will implement the
							Promotional Service as described, Boonfu makes no representations or warranties regarding
							increase in inquiries, views, or sales, Buyer interest or transaction completion, or ROI or
							marketing effectiveness. The Client acknowledges that all commercial outcomes are at their
							sole risk.
						</li>
						<li>
							<b>26.2.4 Client Responsibilities</b>: The Client must ensure their listing contains accurate
							title, description, and pricing, lawful, non-misleading photos and media, and no prohibited
							items (e.g., counterfeit, illegal, or dangerous goods). Boonfu reserves the right to reject a
							promotional purchase if the listing violates Platform policies, or deactivate Promotional
							Services without refund if content is later found to be unlawful or misleading.
						</li>
						<li>
							<b>26.2.5 Fees and Payment</b>: Fees are deducted from the Client’s Boonfu Wallet at the time
							of selection. Partial refunds are issued for early deactivation (5% of locked amount).
							Additional or extended promotional periods require a new purchase.
						</li>
						<li>
							<b>26.2.6 Indemnification</b>: The Client agrees to indemnify, defend, and hold harmless
							Boonfu from any claims, liabilities, damages, or legal costs arising from inaccurate,
							unlawful, or infringing content in the promoted listing, misrepresentation of item condition
							or availability, or violation of Nigerian law (including FCCPC advertising standards).
						</li>
					</ul>
				</li>
				<li>
					26.3 <b>INTELLECTUAL PROPERTY</b>:
					<ul className={listStyles}>
						<li>
							<b>26.3.1 License</b>: By listing an item, the Client grants Boonfu a limited, non-exclusive,
							royalty-free license to display and feature the listing content solely within the Boonfu
							Platform for promotional purposes.
						</li>
						<li>
							<b>26.3.2 Ownership</b>: Boonfu does not claim ownership of Client content but reserves the
							right to format, resize, or adapt it for technical compatibility (e.g., banner dimensions).
						</li>
					</ul>
				</li>
				<li>
					26.4 <b>LIMITATION OF LIABILITY</b>:
					<ul className={listStyles}>
						<li>
							<b>26.4.1 Liability Cap</b>: Boonfu’s total liability under this Agreement is limited to the
							fee paid by the Client for the Promotional Service.
						</li>
						<li>
							<b>26.4.2 Exclusions</b>: In no event shall Boonfu be liable for lost profits, business
							interruption, or opportunity cost, indirect, incidental, or consequential damages, or failure
							of expected results from promotion.
						</li>
						<li>
							<b>26.4.3 Application</b>: This limitation applies even if Boonfu has been advised of the
							possibility of such damages.
						</li>
					</ul>
				</li>
				<li>
					26.5 <b>TERM & TERMINATION</b>:
					<ul className={listStyles}>
						<li>
							<b>26.5.1 Term</b>: This Agreement commences upon payment and ends upon expiry of the
							Promotion Period.
						</li>
						<li>
							<b>26.5.2 Termination for Cause</b>: Boonfu may terminate or suspend Promotional Services
							immediately if the listing violates Platform policies, fraud or misuse is detected, or the
							Client fails to maintain an active account.
						</li>
						<li>
							<b>26.5.3 No Refunds</b>: No refunds will be issued upon termination for cause.
						</li>
					</ul>
				</li>
				<li>
					26.6 <b>GOVERNING LAW & DISPUTE RESOLUTION</b>:
					<ul className={listStyles}>
						<li>
							<b>26.6.1 Governing Law</b>: This agreement shall be governed by and construed in accordance
							with the laws of the Federal Republic of Nigeria.
						</li>
						<li>
							<b>26.6.2 Dispute Resolution</b>: Any claim, controversy, complaint, or dispute arising out
							of or in connection with your use of the Platform (a “Dispute”) shall first be addressed by
							mutual consultation between you and Boonfu.
						</li>
						<li>
							<b>26.6.3 Arbitration</b>: If the Dispute cannot be resolved within 30 (thirty) days, it
							shall be submitted to arbitration in accordance with the Arbitration and Mediation Act, 2023.
							The parties shall jointly appoint a sole arbitrator. If the parties cannot agree on an
							arbitrator within 14 (fourteen) days of notice, any party may apply to the Chairman of the
							Chartered Institute of Arbitrators, UK (Nigeria Branch) to appoint an arbitrator.
						</li>
					</ul>
				</li>
				<li>
					26.7 <b>MISCELLANEOUS</b>:
					<ul className={listStyles}>
						<li>
							<b>26.7.1 Entire Agreement</b>: This document, together with the incorporated Policies,
							constitutes the full agreement.
						</li>
						<li>
							<b>26.7.2 Amendments</b>: Boonfu may update these terms with 30 days’ notice on the Platform.
						</li>
						<li>
							<b>26.7.3 Assignment</b>: Client may not assign this Agreement. Boonfu may assign at its
							discretion.
						</li>
						<li>
							<b>26.7.4 Severability</b>: If any provision is unenforceable, the remainder remains valid.
						</li>
					</ul>
				</li>
				<li>
					26.8 <b>ACCEPTANCE</b>: By clicking “Purchase Promotion”, you confirm you are at least 18 years
					old, acknowledge that promotion is limited to the Boonfu website only, understand that fees are
					non-refundable, and accept that sales outcomes are not guaranteed.
				</li>
			</ul>

			<div className="mt-6 text-center">
				<Button
					type="button"
					onClick={() => setIsOpen(!isOpen)}
					variant="primary"
					size="small"
					className="rounded-md"
				>
					Done 🙂
				</Button>
			</div>
		</div>
	);
};

export default TermsAndCondition;

const textStyles = 'text-base leading-relaxed text-gray-500 dark:text-gray-400';
const listStyles = 'text-base leading-relaxed text-gray-500 dark:text-gray-400 list-disc pl-6';
const orderedListStyles =
	'text-base leading-relaxed text-gray-500 dark:text-gray-400 list-decimal pl-6';
