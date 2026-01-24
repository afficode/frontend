import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ScrollToTop } from '../../utils';
import { BOONFU_MAIL } from '../../constants';

const PrivacyPolicy = () => {
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
		<div className="space-y-6 px-4 py-2 sm:py-4 sm:text-justify">
			<div className="bg-primary py-12 px-4 sm:px-[4rem] m-2 rounded-md text-center text-white">
				<h1 className="text-white ">Privacy Policy</h1>
				<p className="mt-2">
					[Effective Date: 22 December 2025] <br />
					[Last Updated: 22 December 2025]
				</p>
			</div>

			<ol className={`${orderedListStyles} sm:!px-[4rem]`}>
				<Link to="#intro" className="w-max block">
					<li>Introduction</li>
				</Link>
				<Link to="#collection-of-your-information" className="w-max block">
					<li>Collection of Your Information</li>
				</Link>
				<Link to="#use-of-your-information" className="w-max block">
					<li>Use of Your Information</li>
				</Link>
				<Link to="#your-rights" className="w-max block">
					<li>Your Rights</li>
				</Link>
				<Link to="#disclosure-of-your-information" className="w-max block">
					<li>Disclosure of Your Information</li>
				</Link>
				<Link to="#tracking-technologies" className="w-max block">
					<li>Tracking Technologies</li>
				</Link>
				<Link to="#security-of-your-information" className="w-max block">
					<li>Security of Your Information</li>
				</Link>
				<Link to="#policy-for-children" className="w-max block">
					<li>Policy for Children</li>
				</Link>
				<Link to="#international-transfer-of-personal-data" className="w-max block">
					<li>International Transfer of Personal Data</li>
				</Link>
				<Link to="#control-for-do-not-track-features" className="w-max block">
					<li>Control for Do-Not-Track Features</li>
				</Link>
				<Link to="#contact-us" className="w-max block">
					<li>Contact</li>
				</Link>
			</ol>

			<div className="space-y-4 sm:px-[4rem]">
				<p className={textStyles}>
					Boonfu Limited is duly registered in Nigeria with location address, 22 Channels TV Avenue,
					Isheri Community, Lagos State. Your privacy is of utmost important to us and this Policy
					outlines how your data is collected, used and disclosed. Be rest assured that your information
					with us is protected when you use our services (website) and related features.
				</p>

				<h4 id="intro" className="scroll-mt-[130px]">
					Introduction
				</h4>
				<p className={textStyles}>
					Boonfu Limited ("Boonfu") respects the privacy of our users. This Privacy Policy explains how
					we collect, use, disclose, and safeguard your information when you visit our website
					https://Boonfu.site/ including any other media form, media channel, mobile website, or mobile
					application related or connected thereto (collectively, the "Site"). Please read this privacy
					policy carefully. We reserve the right to make changes to this Privacy Policy at any time and
					for any reason. We will alert you about any changes by updating the "Last Updated" date of this
					Privacy Policy and through a pop-up notification on the Site. Any changes or modifications will
					be effective immediately upon posting the updated Privacy Policy on the Site. You are required
					to ensure that the information you provide to us is complete, accurate and up to date.
				</p>

				<h4 id="collection-of-your-information" className="scroll-mt-[130px]">
					Collection of Your Information
				</h4>
				<p className={textStyles}>
					We may collect information about you in a variety of ways including through using forms, email,
					physical requests, cookies and web tokens. The information we may collect on the Site includes:
				</p>
				<ul className={listStyles}>
					<li>
						<b>Personal Data:</b> Personally identifiable information, such as your name, address, email
						address, and telephone number, and demographic information, such as your age, gender,
						hometown, and interests, that you voluntarily give to us when you register with the Site or
						when you choose to participate in various activities related to the Site such as online chat,
						registration, Buying, Selling up and Grabbing etc. You are under no obligation to provide us
						with personal information of any kind; however, your refusal to do so may prevent you from
						using certain features of the Site.
					</li>
					<li>
						<b>Derivative Data:</b> Information our servers automatically collect when you access the
						Site, such as your IP address, your browser type, your operating system, your access times,
						and the pages you have viewed directly before and after accessing the Site and other
						interactions with the website and other users via server log files, as well as any other
						information you choose to provide.
					</li>
					<li>
						<b>Financial Data:</b> We do not store any financial information, such as data related to your
						payment method (e.g. valid credit card number, card brand, expiration date). Otherwise, all
						financial information is stored by our payment processor and you are encouraged to review
						their privacy policy and contact them directly for responses to your questions.
					</li>
					<li>
						<b>Mobile Device Data:</b> Device information, such as your mobile device ID, model, and
						manufacturer, and information about the location of your device if you access the Site from a
						mobile device.
					</li>
					<li>
						<b>Third-Party Data:</b> Information from third parties, such as personal information or
						network friends, if you connect your account to the third party and grant the Site permission
						to access this information.
					</li>
					<li>
						<b>Data from Contests, Giveaways, and Surveys:</b> Personal and other information you may
						provide when entering contests or giveaways and/or responding to surveys.
					</li>
				</ul>

				<h4 id="use-of-your-information" className="scroll-mt-[130px]">
					Use of Your Information
				</h4>
				<p className={textStyles}>
					Having accurate information about you permits us to provide you with a smooth, efficient, and
					customized experience. Specifically, we may use information collected about you via the Site
					to:
				</p>
				<ul className={listStyles}>
					<li>
						<b>Facilitate C2C Transactions:</b> Enable Buyers and Sellers to connect, list items,
						communicate, and complete secure transactions via the Boonfu Escrow system.
					</li>
					<li>
						<b>Operate the Grab Feature:</b> Notify Grabbers of eligible listings, track affiliate link
						performance, and automatically distribute commissions upon successful sales.
					</li>
					<li>
						<b>Manage Your Boonfu Wallet:</b> Process deposits, maintain locked balances for Grab
						listings, execute commission payouts, and enable withdrawals in accordance with Platform
						rules.
					</li>
					<li>
						<b>Provide Transaction Security:</b> Prevent fraud, verify user identities, monitor suspicious
						activity, and protect against unauthorized access or financial misconduct.
					</li>
					<li>
						<b>Deliver Personalized Experience:</b> Recommend relevant listings, suggest Grab
						opportunities based on your interests, and tailor content to your usage patterns.
					</li>
					<li>
						<b>Communicate with You:</b> Send service-related notifications (e.g., "Take Action" alerts
						for expiring Grab listings), payment confirmations, pickup reminders, policy updates, and
						support responses.
					</li>
					<li>
						<b>Improve Platform Performance:</b> Monitor site traffic, analyze user behaviour, and
						optimize features like search, listing visibility, and mobile responsiveness.
					</li>
					<li>
						<b>Conduct Internal Analytics:</b> Compile aggregated, anonymized data for business planning,
						marketing effectiveness, and regulatory reporting—without identifying individual users.
					</li>
					<li>
						<b>Enforce Platform Policies:</b> Detect and act on violations of our Terms, including
						prohibited items, spam, misrepresentation, or misuse of the Grab or Escrow systems.
					</li>
					<li>
						<b>Support Dispute Resolution:</b> Investigate and mediate buyer-seller or Grabber-related
						disputes, including failed pickups or commission allocation issues.
					</li>
					<li>
						<b>Comply with Legal Obligations:</b> Fulfil statutory requirements under Nigerian law,
						including anti-money laundering (AML) checks, tax reporting, and data subject access requests
						under the Nigeria Data Protection Act (NDPA) 2023.
					</li>
					<li>
						<b>Offer Promotional Services:</b> Notify you of optional paid promotions (e.g., Featured
						Listings, homepage banners) if you opt in or meet eligibility criteria.
					</li>
				</ul>

				<p className={`${textStyles} font-semibold mt-6`}>
					Legal Bases for Processing Your Personal Data
				</p>
				<p className={textStyles}>
					We may process your personal data on one or more lawful grounds, depending on the specific
					purpose for which we are using your personal data. Kindly contact us at{' '}
					<a className="text-secondary" href={`mailto:${BOONFU_MAIL}`}>
						{BOONFU_MAIL}
					</a>{' '}
					if you need further details or clarity about the specific legal ground, we are relying on to
					process your personal information where more than one ground has been stated. We will rely on
					any of the legal bases listed below depending on the processing activities:
				</p>

				<p className={`${textStyles} font-semibold mt-4`}>Consent and Access Rights</p>
				<p className={textStyles}>
					We will ask you for your consent in certain processing activities. We may obtain your consent
					using a form or through a tick box exercise. Where we obtain your consent, kindly note that you
					can withdraw your consent at any time, and we will comply by not further processing your
					personal data.
				</p>
				<ul className={`${listStyles} ml-6`}>
					<li>
						If we intend to use your data for a purpose which is different from the purpose for which your
						data was obtained, we will seek your consent prior to the use of your data for that other
						purpose.
					</li>
					<li>
						In the event of any merger, acquisition or other arrangement whereby Boonfu sells or transfers
						all, or a portion of its business or assets (including in the event of a reorganization,
						dissolution or liquidation) to third parties, you hereby consent that your personal data held
						with Boonfu can be transferred or assigned to third parties who may become the controllers
						and/or processors of your personal data that was held by Boonfu prior to such merger,
						acquisition or other arrangement. Boonfu shall at all times ensure that you are notified when
						your personal data is intended to be transferred to third parties in the circumstances
						outlined in this clause.
					</li>
					<li>
						No consent shall be sought, given or accepted in any circumstance that may engender direct or
						indirect propagation of atrocities, hate, child rights violation, criminal acts and
						anti-social conducts.
					</li>
					<li>
						You may withdraw your consent, in writing, at any time and may request access to your personal
						information in our possession at{' '}
						<a className="text-secondary" href={`mailto:${BOONFU_MAIL}`}>
							{BOONFU_MAIL}
						</a>
					</li>
					<li>
						We can, however, deny you access to the information where we determine that your request is
						unreasonable.
					</li>
					<li>
						You reserve the right to request the modification or amendment of your personal data in our
						possession.
					</li>
					<li>
						In all cases of access or modification / amendment of personal information, we shall request
						sufficient identification to enable us to confirm that you are the owner of the data sought to
						be accessed or modified / amended.
					</li>
				</ul>

				<p className={`${textStyles} font-semibold mt-4`}>Other Legal Bases</p>
				<p className={textStyles}>
					We rely on the following other lawful basis to process your personal data:
				</p>
				<ul className={`${listStyles} ml-6`}>
					<li>
						We may process your personal data in order to fulfil the contract you have entered with us, or
						we have entered with your company or take pre-contractual steps at your instruction.
					</li>
					<li>
						We may rely on our legitimate interest to process your personal data to tailor our services to
						suit your need.
					</li>
					<li>We may process your personal data where the law mandates us to do so.</li>
					<li>We may process your personal data to protect your vital interest or another person</li>
					<li>
						We may process your personal data for the performance of a task carried out in the public
						interest or in the exercise of official authority vested in us
					</li>
				</ul>

				<h4 id="your-rights" className="scroll-mt-[130px]">
					Your Rights
				</h4>
				<p className={textStyles}>
					You have rights in relation to the way we handle your personal data. These include the
					following rights:
				</p>
				<ul className={listStyles}>
					<li>
						where the legal basis of our processing is consent, to withdraw that consent at any time;
					</li>
					<li>to ask for access to the personal data that we hold;</li>
					<li>to prevent our use of the personal data for direct marketing purposes;</li>
					<li>to object to our processing of personal data in limited circumstances; and</li>
					<li>
						to ask us to erase personal data without delay:
						<ul className={`${listStyles} ml-6`}>
							<li>
								if it is no longer necessary in relation to the purposes for which it was collected or
								otherwise processed;
							</li>
							<li>
								if the only legal basis of processing is consent and that consent has been withdrawn and
								there is no other legal basis on which we can process that personal data;
							</li>
							<li>
								if you object to our processing where the legal basis is the pursuit of a legitimate
								interest, or the public interest and we can show no overriding legitimate grounds or
								interest; and
							</li>
							<li>if the processing is unlawful.</li>
						</ul>
					</li>
					<li>to ask us to rectify inaccurate data or to complete incomplete data;</li>
					<li>
						to restrict processing in specific circumstances e.g. where there is a complaint about
						accuracy;
					</li>
					<li>
						the right not to be subject to decisions based solely on automated processing, including
						profiling, except where necessary for entering into, or performing, a contract, with Boonfu;
						it is based on your explicit consent and is subject to safeguards; or is authorized by law and
						is also subject to safeguards;
					</li>
					<li>
						to prevent processing that is likely to cause damage or distress to you or anyone else;
					</li>
					<li>to data portability;</li>
					<li>
						to be notified of a personal data breach which is likely to result in high risk to their
						rights and freedoms;
					</li>
					<li>
						to make a complaint to the Nigeria Data Protection Commission or any other regulatory body;
						and
					</li>
					<li>
						In limited circumstances, receive or ask for their personal data to be transferred to a Third
						Party (e.g. another company which the client has dealing with) in a structured, commonly used
						and machine-readable format.
					</li>
				</ul>

				<h4 id="disclosure-of-your-information" className="scroll-mt-[130px]">
					Disclosure of Your Information
				</h4>
				<p className={textStyles}>
					We may share information we have collected about you in certain situations. Your information
					may be disclosed as follows:
				</p>
				<ul className={listStyles}>
					<li>
						<b>By Law or to Protect Rights:</b> If we believe the release of information about you is
						necessary to respond to legal process, to investigate or remedy potential violations of our
						policies, or to protect the rights, property, and safety of others, we may share your
						information as permitted or required by any applicable law, rule, or regulation. This includes
						exchanging information with other entities for fraud protection and credit risk reduction.
					</li>
					<li>
						<b>Third-Party Service Providers:</b> We may share your information with third parties that
						perform services for us or on our behalf, including payment processing, data analysis, email
						delivery, hosting services, customer service, and marketing assistance.
					</li>
					<li>
						<b>Marketing Communications:</b> With your consent, or with an opportunity for you to withdraw
						consent, we may share your information with third parties for marketing purposes, as permitted
						by law.
					</li>
					<li>
						<b>Interactions with Other Users:</b> If you interact with other users of the Site, those
						users may see your name, profile photo, and descriptions of your activity, including sending
						invitations to other users, chatting with other users, liking posts, following blogs.
					</li>
					<li>
						<b>Online Postings:</b> When you post comments, contributions or other content to the Site,
						your posts may be viewed by all users and may be publicly distributed outside the Site and our
						mobile application in perpetuity.
					</li>
					<li>
						<b>Third-Party Advertisers:</b> We may use third-party advertising companies to serve ads when
						you visit the Site. These companies may use information about your visits to the Site and
						other websites that are contained in web cookies in order to provide advertisements about
						goods and services of interest to you.
					</li>
					<li>
						<b>Affiliates:</b> We may share your information with our affiliates, in which case we will
						require those affiliates to honor this Privacy Policy. Affiliates include our parent company
						and any subsidiaries, joint venture partners or other companies that we control or that are
						under common control with us.
					</li>
					<li>
						<b>Business Partners:</b> We may share your information with our business partners to offer
						you certain products, services or promotions.
					</li>
					<li>
						<b>Other Third Parties:</b> We may share your information with partner platforms, advertisers
						and investors for the purpose of conducting general business analysis. We may also share your
						information with such third parties for marketing purposes, as permitted by law.
					</li>
					<li>
						<b>Sale or Bankruptcy:</b> If we reorganize or sell all or a portion of our assets, undergo a
						merger, or are acquired by another entity, we may transfer your information to the successor
						entity. If we go out of business or enter bankruptcy, your information would be an asset
						transferred or acquired by a third party. You acknowledge that such transfers may occur and
						that the transferee may decline honor commitments we made in this Privacy Policy. We are not
						responsible for the actions of third parties with whom you share personal or sensitive data,
						and we have no authority to manage or control third-party solicitations. If you no longer wish
						to receive correspondence, emails or other communications from third parties, you are
						responsible for contacting the third party directly.
					</li>
				</ul>

				<h4 id="tracking-technologies" className="scroll-mt-[130px]">
					Tracking Technologies
				</h4>
				<p className={`${textStyles} font-semibold`}>Cookies and Web Beacons</p>
				<p className={textStyles}>
					We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site
					to help customize the Site and improve your experience. When you access the, your personal
					information is not collected through the use of tracking technology. Most browsers are set to
					accept cookies by default. You can remove or reject cookies, but be aware that such action
					could affect the availability and functionality of the Site. You may not decline web beacons.
					However, they can be rendered ineffective by declining all cookies or by modifying your web
					browser's settings to notify you each time a cookie is tendered, permitting you to accept or
					decline cookies on an individual basis. For more information on how we use cookies, please
					refer to our Cookie Policy posted on the Site, which is incorporated into this Privacy Policy.
					By using the Site, you agree to be bound by our Cookie Policy.
				</p>

				<p className={`${textStyles} font-semibold mt-4`}>Internet-Based Collection</p>
				<p className={textStyles}>
					Additionally, we may use third-party software to serve ads on the site, implement email
					marketing campaigns, and manage other interactive marketing initiatives for our clients. This
					third-party software may use cookies or similar tracking technology to help manage and optimize
					your online experience with us.
				</p>

				<p className={`${textStyles} font-semibold mt-4`}>Website Analytics</p>
				<p className={textStyles}>
					We may also partner with selected third-party vendors, such as Google Analytics, to allow
					tracking technologies and remarketing services on the Site through the use of first party
					cookies and third-party cookies, to, among other things, analyze and track users' use of the
					Site, determine the popularity of certain content and better understand online activity. By
					accessing the Site, you consent to the collection and use of your information by these
					third-party vendors. You are encouraged to review their privacy policy and contact them
					directly for responses to your questions. We do not transfer personal information to these
					third-party vendors. However, if you do not want any information to be collected and used by
					tracking technologies, you can visit the third-party vendor or the Network Advertising
					Initiative Opt-Out Tool or Digital Advertising Alliance Opt-Out Tool. You should be aware that
					getting a new computer, installing a new browser, upgrading an existing browser, or erasing or
					otherwise altering your browser's cookies files may also clear certain opt-out cookies,
					plug-ins, or settings.
				</p>

				<p className={`${textStyles} font-semibold mt-4`}>Third-Party Websites</p>
				<p className={textStyles}>
					The Site may contain links to third-party websites and applications of interest, including
					advertisements and external services, that are not affiliated with us. Once you have used these
					links to leave the Site, any information you provide to these third parties is not covered by
					this Privacy Policy, and we cannot guarantee the safety and privacy of your information.
					Boonfu, therefore, makes no warranties or representations, express or implied about the safety
					of such linked websites, the third parties they are owned and operated by, and the suitability
					or quality of information contained on them. Before visiting and providing any information to
					any third-party websites, you should inform yourself of the privacy policies and practices (if
					any) of the third party responsible for that website, and should take those steps necessary to,
					in your discretion, protect the privacy of your information. We are not responsible for the
					content or privacy and security practices and policies of any third parties, including other
					sites, services or applications that may be linked to or from the Site.
				</p>

				<h4 id="security-of-your-information" className="scroll-mt-[130px]">
					Security of Your Information
				</h4>
				<p className={textStyles}>
					We use administrative, technical, and physical security measures to help protect your personal
					information. While we have taken reasonable steps to secure the personal information you
					provide to us, please be aware that despite our efforts, no security measures are perfect or
					impenetrable, and no method of data transmission can be guaranteed against any interception or
					other type of misuse. Any information disclosed online or electronically is vulnerable to
					interception and misuse by unauthorized parties.
				</p>

				<p className={`${textStyles} font-semibold mt-4`}>Third Party Access</p>
				<p className={textStyles}>
					Boonfu will only share personal information with other companies, entities or individuals in
					the following limited circumstances:
				</p>
				<ul className={`${listStyles} ml-6`}>
					<li>We have your consent.</li>
					<li>
						We provide such information to other professional advisers or other trusted businesses or
						persons for the purpose of processing personal information on our behalf. We require that
						these parties agree to process such information based on our instructions and in compliance
						with this Privacy Policy and any other appropriate confidentiality and security measures.
					</li>
					<li>
						We have a good faith belief that access, use, preservation or disclosure of such information
						is reasonably necessary to (i) satisfy any applicable law, regulation, legal process or
						enforceable governmental request, (ii) enforce applicable terms of service, including
						investigation of potential violations thereof, (iii) detect, prevent, or otherwise address
						fraud, security or technical issues, or (iv) protect against imminent harm to the rights,
						property or safety of Boonfu, its users or the public as required or permitted by law.
					</li>
				</ul>
				<p className={textStyles}>
					Boonfu is at all times, responsible for the security and appropriate use of that data as long
					as it remains with Boonfu.
				</p>

				<p className={`${textStyles} font-semibold mt-4`}>Personal Data Protection Principles</p>
				<p className={textStyles}>
					When we process your personal data, we are guided by the following principles, which require
					personal data to be:
				</p>
				<ul className={`${listStyles} ml-6`}>
					<li>
						processed lawfully, fairly, in a transparent manner and with respect for the dignity of the
						human person.
					</li>
					<li>
						collected only for specified, explicit and legitimate purposes and not further processed in a
						manner incompatible with those purposes.
					</li>
					<li>
						adequate, relevant and limited to what is necessary in relation to the purposes for which it
						is processed.
					</li>
					<li>accurate and where necessary kept up to date.</li>
					<li>
						removed or not kept in a form that permits identification of data subject for longer than is
						necessary for the purposes for which the personal data is processed.
					</li>
					<li>
						processed in a manner that ensures its security, using appropriate technical and
						organizational measures to protect against unauthorized or unlawful processing and against
						accidental loss, destruction or damage.
					</li>
				</ul>

				<h4 id="policy-for-children" className="scroll-mt-[130px]">
					Policy for Children
				</h4>
				<p className={textStyles}>
					We do not knowingly solicit information from or market to children under the age of 18. If you
					become aware of any data, we have collected from children under the age of 18, please contact
					us at{' '}
					<a className="text-secondary" href={`mailto:${BOONFU_MAIL}`}>
						{BOONFU_MAIL}
					</a>
				</p>

				<h4 id="international-transfer-of-personal-data" className="scroll-mt-[130px]">
					International Transfer of Personal Data
				</h4>
				<p className={textStyles}>
					We may transfer your personal data outside Nigeria in certain circumstances. We will always
					ensure adequate protection of your data in these circumstances. Whenever we are transferring
					your personal data outside Nigeria to countries deemed not to have adequate data protection
					law, we will comply with the appropriate safeguards which the law has provided such as the use
					of standard contractual clauses, binding corporate rule or other lawful bases provided by the
					law. Please contact us if you want further information on the specific mechanism used by us
					when transferring your personal data out of Nigeria.
				</p>

				<h4 id="control-for-do-not-track-features" className="scroll-mt-[130px]">
					Control for Do-Not-Track Features
				</h4>
				<p className={`${textStyles} font-semibold`}>Account Information</p>
				<p className={textStyles}>
					You may at any time review or change the information in your account or terminate your account
					by:
				</p>
				<ul className={`${listStyles} ml-6`}>
					<li>Logging into your account settings and updating your account</li>
					<li>Contacting us using the contact information provided below</li>
				</ul>
				<p className={textStyles}>
					Upon your request to terminate your account, we will deactivate or delete your account and
					information from our active databases. However, some information may be retained in our files
					to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of
					Use and/or comply with legal requirements. Emails and Communications If you no longer wish to
					receive correspondence, emails, or other communications from us, you may opt-out by:
				</p>
				<ul className={`${listStyles} ml-6`}>
					<li>Noting your preferences at the time you register your account with the Site</li>
					<li>Logging into your account settings and updating your preferences.</li>
					<li>Contacting us using the contact information provided below</li>
				</ul>
				<p className={textStyles}>
					If you no longer wish to receive correspondence, emails, or other communications from third
					parties, you are responsible for contacting the third party directly.
				</p>

				<p className={`${textStyles} font-semibold mt-4`}>Data Retention</p>
				<p className={textStyles}>
					Boonfu shall retain and use your Personal Data only as long as is necessary to implement,
					administer and manage your request and contract with Boonfu and a maximum of 10 years after the
					expiration or termination of the contract or as required to comply with legal or regulatory
					obligations, including under tax and security laws. At your request, at any time, your Personal
					Data which is in the custody of Boonfu may be deleted unless we are required by law to retain
					such information for a certain period of time so at to comply with our obligations under the
					law.
				</p>

				<h4 id="contact-us" className="scroll-mt-[130px]">
					Contact
				</h4>
				<p className={textStyles}>
					If you have questions or comments about this Privacy Policy, please contact us at{' '}
					<a className="text-secondary" href={`mailto:${BOONFU_MAIL}`}>
						{BOONFU_MAIL}
					</a>
				</p>
			</div>

			<ScrollToTop />
		</div>
	);
};

export default PrivacyPolicy;

const textStyles = 'text-base leading-relaxed text-gray-500 dark:text-gray-400';
const listStyles = 'text-base leading-relaxed text-gray-500 dark:text-gray-400 list-disc pl-6';
const orderedListStyles =
	'text-base leading-relaxed text-primary dark:text-gray-400 list-decimal pl-6';
