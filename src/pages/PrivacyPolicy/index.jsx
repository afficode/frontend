import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ScrollToTop } from '../../utils';
import { Approutes } from '../../constants';

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
		<div className="space-y-6 px-4 py-2 sm:py-4 text-justify">
			<div className="bg-primary py-12 px-4 sm:px-[4rem] m-2 rounded-md text-center text-white">
				<h1 className="text-white ">Privacy Policy</h1>
			</div>

			<ol className={`${orderedListStyles} sm:!px-[4rem]`}>
				<Link to="#intro">
					<li>Introduction</li>
				</Link>
				<Link to="#your-shared-information">
					<li>Your Shared Information</li>
				</Link>
				<Link to="#information-you-submit-to-us">
					<li>Information You Submit to Us.</li>
				</Link>
				<Link to="#legal">
					<li>Legal Basis for Processing</li>
				</Link>
				<Link to="#international-transfers">
					<li>International Transfers</li>
				</Link>
				<Link to="#marketing-communications">
					<li>Marketing Communications</li>
				</Link>
				<Link to="#data-security">
					<li>Data Security</li>
				</Link>
				<Link to="#data-retention-and-deletion">
					<li>Data Retention and Deletion on Boonfu</li>
				</Link>
				<Link to="#use-of-cookies-and-tracking-technology-on-boonfu">
					<li>Use of Cookies and Tracking Technology on Boonfu</li>
				</Link>
				<Link to="#data-subject-rights">
					<li>Data Subject Rights</li>
				</Link>
				<Link to="#things-we-do-with-your-information">
					<li>Things We do With Your Information</li>
				</Link>
				<Link to="#contact-us">
					<li>Contact Us</li>
				</Link>
				<Link to="#changes-to-this-notice">
					<li>Changes to this Notice</li>
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
					Our Privacy Notice applies to all the users of our online platform whether you're a Grabber,
					surfing listings, posting advertisements, or contacting other Users. The goal is to be
					transparent about how we handle your data and to give you control over your personal
					information on this platform.
				</p>
				<h4 id="your-shared-information" className="scroll-mt-[130px]">
					Your Shared Information
				</h4>
				<p className={textStyles}>
					It is not our culture to sell your personal data. However, we may sometimes share your
					information with our trusted allies who help us deliver our Services. This includes; payment
					processors, cloud hosting providers, courier services, customer support platforms, and
					analytics services. These third parties have the duty to handle your information in accordance
					with applicable data protection laws and only for the purposes we specify and that ONLY.
					<br /> <br />
					In some cases, we may disclose information if required by law, court order, or other legal
					processes, or if we believe such disclosure is necessary to protect our rights or the safety of
					our Users or others. We may share your personal data in the event of company restructuring or
					sale of the business where your personal data will be used for the same purpose.
				</p>
				<h4 id="information-you-submit-to-us" className="scroll-mt-[130px]">
					Information You Submit to Us
				</h4>
				<p className={textStyles}>
					Using our services, We may collect some of your personal information, to be provided to us
					directly:
				</p>

				<p className={`${textStyles} font-bold`}>Classes of Personal Information Submitted:</p>
				<ul className={listStyles}>
					<li>
						<b>Identity Data: </b>Name, user name
					</li>
					<li>
						<b>Contact Data:</b> Email address, phone number, correspondence address
					</li>
					<li>
						<b>Content Data: </b> Information you submit when creating listings or communicating with
						other Users which may also contain personal information.
					</li>
					<li>
						<b>Financial Data: </b> For example, if you make a purchase or complete a transaction, we may
						also collect payment details though through third-party payment providers and the any credit
						card details are not stored on our servers.
					</li>
					<li>
						<b>Transaction Data: </b> Details about payments to and from you and other transaction details
						for the provision of Services
					</li>
					<li>
						<b>Technical Data: </b> IP address, login data, browser type and version, time zone setting,
						location, operating system and device information.
					</li>
					<li>
						<b>Profile Data: </b> Username, password, searches, favourites, ratings, preferences,
						feedback, and survey responses.
					</li>
					<li>
						<b>Usage Data: </b> Information about how you use our website and Services.
					</li>
					<li>
						<b>Marketing & Communications Data: </b> Your preferences in receiving marketing from us and
						our third parties, and your communication preferences.
					</li>
				</ul>

				<h4 id="legal" className="scroll-mt-[130px]">
					Legal Basis for Processing
				</h4>
				<p className={textStyles}>
					Boonfu will process your personal data in accordance with applicable data protection laws,
					including the Nigeria General Data Protection Regulation and the Data Protection Act 2023.
				</p>

				<p className={`${textStyles}`}>We rely on the following legal bases:</p>
				<ul className={listStyles}>
					<li>
						<b>Consent –</b> for sending marketing communications or using non-essential cookies;
					</li>
					<li>
						<b>Contractual necessity –</b> when processing is necessary to provide the Service or to
						fulfil a User agreement;
					</li>
					<li>
						<b>Legitimate interests –</b> such as improving our platform, preventing fraud, and ensuring
						the safety and security of our Users;
					</li>
					<li>
						<b>Legal obligations –</b> where we are required to retain or disclose data to comply with
						applicable laws or respond to lawful requests.
					</li>
				</ul>

				<h4 id="international-transfers" className="scroll-mt-[130px]">
					International Transfers
				</h4>
				<p className={textStyles}>
					If your personal information is transferred outside of Nigeria, West Africa Area, or other
					countries without adequate data protection laws, we will ensure that such transfers are carried
					out in accordance with applicable legal requirements of the location it is transferred. Such as
					Standard Contractual Clauses (SCCs) or other approved transfer mechanisms that offer adequate
					protection for your information.
					<br /> <br /> If you are located outside the country where our servers are located, please note
					that your information may be transferred to and processed in countries that may not provide the
					same level of data protection. In such cases, we ensure that appropriate safeguards, such as
					SCCs or other legal mechanisms, are in place.
				</p>

				<h4 id="marketing-communications" className="scroll-mt-[130px]">
					Marketing communications
				</h4>
				<p className={textStyles}>
					If you do not wish to receive marketing or change your communication preferences from us, you
					can unsubscribe via the My Details page on web or contact us as described in the Contact Us
					section below. To change your preferences for push notifications, search alerts, new messages
					and Boonfu notification alerts this can be done on your Boonfu account.
					<br />
					<br />
					If you request that we stop processing some or all of your personal information or you withdraw
					(where applicable) your consent for our use or disclosure of your personal information for
					purposes set out in this privacy notice, we might not be able to provide you all of the
					Services and customer support offered to our Users and authorized under this privacy notice and
					our Terms of Use.
					<br />
					<br />
					If you do not wish to participate in our advertising personalization programs, you can opt-out
					by following the directions provided below, or through the programs described in our User
					Cookie Notice. The effect of an opt-out will be to stop personalized advertising, but it will
					still allow the collection of personal information as otherwise described in this privacy
					notice. We do not allow third parties to track or collect your personal information on our
					sites for their own advertising purposes, without your consent.
				</p>

				<h4 id="data-security" className="scroll-mt-[130px]">
					Data Security
				</h4>
				<p className={textStyles}>
					We are committed to protecting your personal data and have implemented appropriate technical
					and organizational measures to prevent unauthorized access, disclosure, alteration, or
					destruction. These include secure servers, encryption protocols, access controls, and regular
					security reviews. However, no online service can guarantee complete security, so we encourage
					you to take care in protecting your login credentials and account.
				</p>

				<h4 id="data-retention-and-deletion" className="scroll-mt-[130px]">
					Data Retention and Deletion on Boonfu
				</h4>
				<p className={textStyles}>
					At Boonfu, we retain your personal information only for as long as is necessary to fulfil the
					purposes outlined in this Privacy Notice including providing the Service, complying with our
					legal obligations, resolving disputes and enforcing our agreements.
					<br />
					<br />
					Account-related data is typically retained while your account remains active. Transactional
					records, communication logs, and other legally relevant data may be retained for longer periods
					where required by applicable law, such as tax, regulatory or anti-fraud obligations.
					<br />
					<br />
					You have the right to request the deletion of your personal data, ask us for copies of your
					personal information or rectify your records. These can be requested by using the Contact Us
					section. Upon receiving a verified request, we will action via our active systems unless we are
					required or permitted to retain or refuse under applicable law.
					<br />
					<br />
					<em>
						Please note that in some cases, certain information may be retained in backup archives for a
						limited time, or as necessary for legitimate business interests or legal compliance. Where
						deletion is not possible (e.g., where data must be retained for financial reporting or fraud
						prevention), we will securely store the information and isolate it from further use.
					</em>
				</p>

				<h4 id="use-of-cookies-and-tracking-technology-on-boonfu" className="scroll-mt-[130px]">
					Use of Cookies and Tracking Technologies on Boonfu
				</h4>
				<p className={textStyles}>
					Boonfu uses cookies and similar technologies to recognize your browser or device, keep you
					signed in, remember your preferences and analyze site usage. These technologies also help us
					serve relevant ads and measure the effectiveness of marketing campaigns. You can manage or
					disable cookies through your browser settings. For more details, see our User Cookie Notice.
				</p>

				<h4 id="data-subject-rights" className="scroll-mt-[130px]">
					Data Subject Rights
				</h4>
				<p className={textStyles}>
					Under certain circumstances, you have rights under data protection laws. Not all rights are
					absolute and depending on where you are located, not all rights are given to you.
				</p>

				<p className={`${textStyles}`}>You can do the following:</p>
				<ul className={listStyles}>
					<li>
						<b>Request access to your personal data:</b> this means requesting information held about you
						by Boonfu.
					</li>
					<li>
						<b>Request correction of your personal data:</b> this means fixing inaccurate information
						about you.
					</li>
					<li>
						<b> Request erasure of your personal data:</b> this means asking to delete information about
						you.
					</li>
					<li>
						<b>Object to processing of your personal data:</b> this means refusing use of your data for
						specific purposes.
					</li>
					<li>
						<b>Request restriction of processing your personal information:</b> this means limiting how
						your data is used.
					</li>
					<li>
						<b>Request transfer of your personal information ("data portability"):</b>this means moving
						your data elsewhere securely.
					</li>
					<li>
						<b>Right to withdraw consent:</b> this means you can stop data use anytime where consent is
						relied upon.
					</li>
					<li>
						<b>Automated decision making:</b> This is where decisions are made about you by automated
						means. We do not carry out automated decision making which results in legal or similarly
						significant effect.
					</li>
				</ul>

				<p className={textStyles}>
					You won't pay a fee to access your data or exercise rights, unless requests are unfounded,
					repetitive or excessive of which we may also refuse your request. We may request ID to confirm
					your identity for security. We aim to respond within one month but may take longer for complex
					or multiple requests. If you wish to make a request you may use the{' '}
					<a className="text-secondary underline" href={Approutes.contactUs}>
						Contact Us
					</a>{' '}
					form.
				</p>

				<h4 id="things-we-do-with-your-information" className="scroll-mt-[130px]">
					{' '}
					Things We do With Your Information
				</h4>
				<p className={textStyles}>
					We use your personal information to operate, provide, develop, and improve the products and
					services that we offer our customers. These purposes include:
				</p>

				<ul className={listStyles}>
					<li>
						<b>To Prevention Fraud and enhance Security.</b> We use personal information to prevent and
						detect fraud and abuse in order to protect the security of our customers, Boonfu, and others.
					</li>
					<li>
						<b>Advertising.</b> We use your personal information to display interest-based ads for
						features, products, and services that might be of interest to you. We do not use information
						that personally identifies you to display interest-based ads. To learn more, please read our
						Interest-Based Ads notice.
					</li>
					<li>
						<b>Product Recommendations and personalization.</b> We use your personal information to
						recommend features, products, and services that might be of interest to you, identify your
						preferences, and personalize your experience with Boonfu Services.
					</li>
					<li>
						<b>Provide, troubleshoot, and improve Boonfu Services.</b> We use your personal information to
						provide functionality, analyze performance, fix errors, and improve the usability and
						effectiveness of the Boonfu Services.
					</li>
					<li>
						<b>Purchase and delivery of products and services.</b> We use your personal information to
						take and handle orders, deliver products and services, process payments, and communicate with
						you about orders, products and services, and promotional offers, e.t.c
					</li>
					<li>
						<b>Communicate with you.</b> We use your personal information to communicate with you in
						relation to Boonfu Services via different channels (for example, by phone, email, chat).
					</li>
					<li>
						<b>Comply with legal obligations.</b> In certain cases, we collect and use your personal
						information to comply with laws. For instance, we collect from sellers information regarding
						place of establishment and bank account information for identification, verification and other
						purposes.
					</li>
				</ul>

				<h4 id="contact-us" className="scroll-mt-[130px]">
					Contact Us
				</h4>
				<p className={textStyles}>
					If you have questions, concerns, or complaints about this Privacy Notice or how we handle your
					data, you can contact us at:
					<br />
					<br />
					Email:{' '}
					<a className="text-secondary" href="mailto:customersupport@boonfu.com">
						customersupport@boonfu.com
					</a>
					<br />
					<br />
					Your right to file complaints with a data protection supervisory authority remains unaffected.
					If you believe we have not handled your complaint appropriately you can send your complaint to
					the Information Commissioner’s Office.
				</p>

				<h4 id="changes-to-this-notice" className="scroll-mt-[130px]">
					Changes to This Notice
				</h4>
				<p className={textStyles}>
					We may update this Privacy Notice from time to time to reflect changes in our practices or
					legal requirements. If we make material changes, we will notify you through our Service or by
					email. Your continued use of the Service after the changes become effective constitutes your
					acceptance of the revised notice.
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
