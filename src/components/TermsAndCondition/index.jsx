import { Link } from 'react-router-dom';
import { Approutes } from '../../constants';
import { Button } from '../../ui';

const TermsAndCondition = ({ setIsOpen, isOpen, rulesRef, termsRef, privacyRef, returnRef }) => {
	return (
		<div ref={termsRef} className="space-y-4 text-justify">
			<h4>Introduction</h4>
			<p className={textStyles}>
				Welcome to Boonfu. By accessing www.boonfu.com and its related websites, services, applications
				or tools (also known as &quot;Boonfu&quot;) you are agreeing to make sure that Boonfu works for
				everyone. Boonfu is provided to you by Boonfu Limited, Plot 1b Opeyemi Rotimi Famakinwa close,
				Ajomale zone, Opic Lagos State 100001, Nigeria, duly registered in Nigeria with reg number
				7379214. These Terms of Use constitute a legally binding agreement between you and Boonfu
				Limited and is effective as of 02 June 2024 for current users, and upon acceptance for new
				users. You accept these Terms of Use by clicking the &quot;Create Account&quot; button when
				registering a Boonfu account and by otherwise accessing Boonfu, including posting an ad,
				grabbing a product or Item and setting up your shop; or as otherwise indicated on Boonfu.
			</p>
			<h4 ref={rulesRef}>Using Boonfu</h4>
			<p className={textStyles}>As a condition of your use of Boonfu, you agree that you will not:</p>

			<ul className={listStyles}>
				<li>Violate any laws;</li>
				<li>
					Violate the <Link className="underline text-primary">Policies</Link>;
				</li>
				<li>Post any threatening, abusive, defamatory, obscene or indecent material;</li>
				<li>Post or otherwise communicate any false or misleading material or message of any kind;</li>
				<li>Infringe any third-party right;</li>
				<li>Distribute spam, chain letters, or promote pyramid schemes;</li>
				<li>
					Distribute viruses or any other technologies that may harm Boonfu or the interests or property
					of Boonfu users;
				</li>
				<li>
					Impose or contribute to imposing an unreasonable load on our infrastructure or interfere with
					the proper working of Boonfu;
				</li>
				<li>
					Copy, modify, or distribute any other person&#39;s content without their consent – grabbing of
					items/products to market is understandable and with the consent of original owner.
				</li>
				<li>
					Use any robot spider, scraper or other automated means to access Boonfu and collect content for
					any purpose without our express written permission;
				</li>
				<li>
					Harvest or otherwise collect information about others, including email addresses, without their
					consent;
				</li>
				<li>
					Copy, modify or distribute rights or content from Boonfu or Boonfu&#39;s copyrights and
					trademarks;
				</li>
				<li>Bypass measures used to prevent or restrict access to Boonfu;</li>
				<li>
					Use any tool that interferes with the normal functioning of Boonfu, including, without
					limitation, browser plug-ins extensions, or other software which are designed to supplement,
					remove or otherwise change any of Boonfu&#39;s functionalities; or
				</li>
				<li>
					Sell any counterfeit items or otherwise infringe the copyright, trademark or other rights of
					third parties.
				</li>
			</ul>
			<p className={textStyles}>
				You are solely responsible for all information that you submit to Boonfu and any consequences
				that may result from your post. We reserve the right at our discretion to refuse or delete
				content that we believe is inappropriate or breaches the above terms. We also reserve the right
				at our discretion to restrict a user&#39;s usage of Boonfu either temporarily or permanently or
				refuse a user&#39;s registration. If we believe that you are breaching these Terms of Use in any
				way and/or behaving suspiciously on Boonfu, we may, at our discretion, inform other Boonfu users
				that have been in contact with you and recommend that they exercise caution in dealing with you.
			</p>

			<h4>Abusing Boonfu</h4>

			<p className={textStyles}>
				Boonfu and the Boonfu community work together to keep Boonfu working properly and the community
				safe. Please report problems, offensive content, and policy breaches to us using the reporting
				system.
			</p>
			<p className={textStyles}>
				Without limiting other remedies, we may issue warnings; limit or terminate our service; remove
				hosted content and take technical and legal steps to keep users off Boonfu if we think that they
				are creating problems, infringing the rights of third parties or acting inconsistently with the
				letter or spirit of our policies (including, without limitation, circumventing temporary or
				permanent suspensions or harassing the Boonfu employees or other users). However, whether we
				decide to take any of these steps, remove hosted content or keep a user off Boonfu or not, we do
				not have any obligation to monitor the information transmitted or stored on Boonfu, and we do
				not accept any liability for unauthorized or unlawful content on Boonfu or use of Boonfu by
				users.
			</p>
			<h4>Global Marketplace</h4>
			<p className={textStyles}>
				Some of Boonfu&#39;s features and Grabbers may display your ad on other sites, services,
				applications, or tools (together a “Platform”) that are part of the Boonfu community, or on
				third-party Platforms, including social media channels. By using Boonfu, you agree that your ads
				can be displayed on these other Platforms and media channels. You may be subject to additional
				laws or other restrictions in the countries where your ad is posted. When your ad is posted on
				another Platform, you may be responsible for ensuring that it does not violate such other
				Platform&#39;s policies. We may remove your ad if it is reported on Boonfu, or any third-party
				Platform, or if we believe it causes problems or violates any law or policy.
			</p>
			<h4>Fees and Services</h4>
			<p className={textStyles}>
				When you sign up on Boonfu, you may be credited with some amount of token which is obviously
				free. When you begin to post on Boonfu, the token is charged towards whatever you are posting,
				the amount declared as the worth of item/product posted determines how much token is deducted
				from your free tokens, and when that is exhausted, you are expected to “top-up” your token to
				continue using this great service. Also, using the “Grab feature” isn’t free from the get-go,
				please refer to “about grab” through the grab icon to learn more about the commission that
				Grabbers would normally take “IF” your item/product is sold by them, If the service you use
				incurs a fee, you&#39;ll be able to review and accept terms that will be clearly disclosed at
				the time you post your ad. Our fees are quoted in Naira in Nigeria, and may be changed depending
				on the location where you are using Boonfu. We&#39;ll notify you of changes to our fee policy by
				posting such changes on Boonfu. We may choose to temporarily change our fees for promotional
				events or new services; these changes are effective when we announce the promotional event or
				new service.
			</p>
			<p className={textStyles}>
				You are responsible for your token top-up on Boonfu when you are out of tokens or your token is
				running low. If you don&#39;t, without prejudice to any other right or remedy we may be entitled
				to under these Terms of Use or by law, limit your ability to use the services. If your payment
				method fails, you may use other alternatives provided on the Boonfu website.
			</p>
			<p className={textStyles}>
				You acknowledge that your ads may be deleted from Boonfu in case we believe these Terms of Use,
				including our Posting Rules, are breached, either directly or indirectly. In case you paid a fee
				for the display of such ad, you may be entitled to a refund of such fee. However, we reserve the
				right not to refund Boonfu users for any fees paid through the use of Boonfu in the following
				cases:
			</p>
			<ul className={listStyles}>
				<li>
					If you breach, in our opinion, these Terms of Use, which include, without limitation, the
					Policies;
				</li>
				<li>
					If your ads went live with exposure on the Boonfu sites, services, applications or tools, even
					for a limited time, and they benefited from the service associated with the paid fee;
				</li>
				<li>
					If transaction has been completed after 24hrs and all parties settled their fees/payments.
				</li>
				<li>
					If your ads are placed into &quot;edit&quot; mode and will go live on the site once updated by
					you;
				</li>
				<li>If you have removed your ads yourself;</li>
				<li>If you post duplicate ads as defined in our rules regarding duplicate ads;</li>
				<li>If we believe that your ads are in a significantly wrong category;</li>
				<li>If you do not act in good faith and contradict the terms of use of Boonfu</li>
				<li>
					Please note that the above list is not exhaustive. Other actions will be based on our
					discretion in which case you may, or may not, be entitled to a refund of such fees.
				</li>
			</ul>

			<p className={textStyles}>
				In addition to the Boonfu services, ancillary goods or services may be advertised on Boonfu.
				Although users may offer financial products on their ads, Boonfu is in no way involved or liable
				for any loss related to such transactions.
			</p>
			<h4>Display and placement of user ads</h4>
			<p className={textStyles}>
				We strive to create a community where users can find what they are looking for. Therefore, the
				appearance or placement of ads in search and browse results will depend on a variety of factors,
				including, but not limited to:
			</p>
			<ul className={listStyles}>
				<li className="first-letter:text-red-600">
					Users&#39; location and search query/category selected;
				</li>
				<li className="first-letter:text-red-600">
					{' '}
					Adverts&#39; category, content, location and date published; and
				</li>
				<li className="first-letter:text-red-600">
					If the ad has a paid-for promotion (see our{' '}
					<Link className="underline text-primary">
						Payment &amp; Promotion Help Page for more information
					</Link>
					)
				</li>
			</ul>

			<h4>Content</h4>
			<p className={textStyles}>
				Boonfu contains content from us, you, and other users. Boonfu is protected by copyright laws and
				international treaties. <span className="text-red-600">The</span> content displayed on or via
				Boonfu is protected as a collective work and/or compilation, pursuant to copyrights laws and
				international conventions. You agree not to copy, distribute, or modify content from Boonfu
				without our express written consent. You may not disassemble or decompile, reverse engineer or
				otherwise attempt to discover any source code contained in Boonfu. Without limiting the
				foregoing, you agree not to reproduce, copy, sell, resell, or exploit for any purposes any
				aspect of Boonfu (other than your own content). When you give us content, you grant us and
				represent that you have the right to grant us, a non-exclusive, worldwide, perpetual,
				irrevocable, royalty-free, sub-licensable (through multiple tiers) right to exercise any and all
				copyright, publicity, trademarks, design, database and intellectual property rights to that
				content, in any media whether now known or to be discovered in the future including, without
				limitation, on any third-party Platforms and media channels. In particular, by giving us
				content, you grant us the right to display such content on Platforms that are part of the Boonfu
				corporate group, and on other online marketplaces, social media channels, blogs, in all types of
				marketing communications, and on all other Platforms. In addition, you waive all moral rights
				you have in the content to the fullest extent permitted by law.
			</p>
			<p className={textStyles}>
				Boonfu may at times use third party data suppliers to supplement the information you have
				provided in an ad. This could include descriptions, product specifications, and other content.
				You may use such information solely in connection with your Boonfu ad while your ad is on
				Boonfu. The information provided may be subject to copyright, trademark and/or other
				protections. You agree not to remove any such protected information and/or create any derivative
				works based on the content (other than by including them in your ads). This permission is
				subject to modification or revocation at any time at Boonfu&#39;s sole discretion.
			</p>
			<p className={textStyles}>
				You may not have the opportunity to review all of the supplemental data before posting an ad.
				Boonfu is not responsible for the accuracy of any third-party-supplied supplemental data. You
				continue to be responsible for ensuring that your ads are accurate, do not include misleading
				information, and fully comply with these Terms of Use and all Boonfu policies. If you notice
				inaccuracies in this data after your ad appears on the site, please get in touch with us.
			</p>

			<h4>Infringement</h4>

			<p className={textStyles}>
				Do not post content that infringes the rights of third parties. This includes, but is not
				limited to, content that infringes on intellectual property rights such as copyright, design,
				and trademark (e.g., offering counterfeit items for sale). A large number of products of all
				sorts are offered on Boonfu by private individuals. Entitled parties, in particular owners of
				copyright, trademark rights, or other rights can report any advertisement which may infringe on
				their rights, and submit a request for such advertisement to be removed. If a legal
				representative of the entitled party reports this to us in the correct manner, products
				infringing on the intellectual property rights will be removed by Boonfu.
			</p>
			<p className={textStyles}>Reporting an infringement:</p>
			<p className={textStyles}>
				In order to carry-out a Notice of Infringement, you only need to complete a{' '}
				<Link className="underline text-primary">Notice of Infringement Form</Link> and email it to
				Boonfu at <Link className="underline text-primary">infringement@boonfu.com</Link>. You can use{' '}
				<Link className="underline text-primary">This Form</Link>, complete with your signature, to
				report advertisements which may infringe on your property rights. The information requested in
				the Notice of Infringement Form is for the purpose of ensuring that the parties reporting these
				objects are either the entitled party or their officially authorized representative. This
				information must also enable Boonfu to identify the advertisement to be removed. Once we have
				received your correctly completed Notice of Infringement Form, you can simply send later reports
				to Boonfu via the e-mail address provided.
			</p>
			<p className={textStyles}>
				Note: This form can only be used by the lawful owners of the relevant intellectual property
				rights. The &quot;Notice of Infringement&quot; is intended to enable rights owners to ensure
				that products offered by Boonfu users do not infringe their copyright, trademark rights or other
				intellectual property rights. For all other questions, visitors and advertisers can get help
				using <Link className="text-primary ">Boonfu Help</Link>
			</p>
			<h4>Financial Products</h4>
			<p className={textStyles}>
				Boonfu operates solely as an introducer for the financial products advertised on this website
				(which includes unsecured loans and insurance). We do not provide any advice or give any
				opinions on the merits of any of the financial products that we advertise and users are advised
				to conduct their own research and seek independent financial advice before applying for any of
				these financial products.
			</p>
			<h4>Liability</h4>
			<p className={textStyles}>
				Nothing in these terms shall limit our liability for fraudulent misrepresentation, or for death
				or personal injury resulting from our negligence or the negligence of our agents or employees.
				You agree not to hold us responsible for things other users post or do.{' '}
			</p>
			<p className={textStyles}>
				We do not review users&#39; postings and are not involved in the transactions that aren’t
				Grabbers feature related, selected by users. As most of the content on Boonfu comes from other
				users, we do not guarantee the accuracy of postings or user communications or the quality,
				safety, or legality of what&#39;s offered.
			</p>
			<p className={textStyles}>
				In no event do we accept liability of any description for the posting of any unlawful,
				threatening, abusive, defamatory, obscene, or indecent information, or material of any kind
				which violates or infringes upon the rights of any other person, including without limitation
				any transmissions constituting or encouraging conduct that would constitute a criminal offense
				that give rise to civil liability or otherwise violate any applicable law.
			</p>
			<p className={textStyles}>
				You acknowledge that we cannot guarantee continuous, error-free, or secure access to our
				services or that defects in the service will be corrected. While we will use reasonable efforts
				to maintain an uninterrupted service, we cannot guarantee this and we do not give any promises
				or warranties (whether express or implied) about the operation and availability of our sites,
				services, applications or tools.
			</p>
			<p className={textStyles}>
				Accordingly, to the extent legally permitted we expressly disclaim all warranties,
				representations and conditions, express or implied, including those of quality, merchantability,
				merchantable quality, durability, fitness for a particular purpose and those arising by statute.
				We are not liable for any loss, whether of money (including profit), goodwill, or reputation, or
				any special, indirect, or consequential damages arising out of your use of, or inability to use
				Boonfu, even if you advise us or we could reasonably foresee the possibility of any such damage
				occurring. Some jurisdictions do not allow the disclaimer of warranties or exclusion of damages,
				so such disclaimers and exclusions may not apply to you. Despite the previous paragraph, if we
				are found to be liable, our liability to you or any third party (whether in contract, tort,
				negligence, strict liability in tort, by statute or otherwise) is limited to the greater of (a)
				the total fees you paid to us in the 12 months prior to the action giving rise to liability, and
				(b) 50 thousand naira.
			</p>

			<h4>Release</h4>
			<p className={textStyles}>
				If you have a dispute with one or more Boonfu users, you release us (and our officers,
				directors, agents, subsidiaries, joint ventures and employees) from any and all claims, demands
				and damages (actual and consequential) of every kind and nature, known or unknown, arising out
				of or in any way connected with such disputes.
			</p>
			<h4>Third party rights</h4>
			<p className={textStyles}>
				A person who is not a party to this Agreement has no right under the Contracts (Rights of Third
				Parties) Act 1999 to enforce any Terms of Use but this does not affect any right or remedy of a
				third party specified in this Agreement or which exists or is available apart from that Act.
			</p>

			<h4>Resolution of disputes</h4>
			<p className={textStyles}>
				If a dispute arises between you and Boonfu, we strongly encourage you to first contact us
				directly to seek a resolution by going to the Boonfu{' '}
				<Link className="underline text-primary">Help page</Link>. We will consider reasonable requests
				to resolve the dispute through alternative dispute resolution procedures, such as mediation or
				arbitration, as alternatives to litigation.
			</p>
			<h4>General</h4>
			<p className={textStyles}>
				These terms and the other policies posted on Boonfu constitute the entire agreement between
				Boonfu and you, superseding any prior agreements. No agency, partnership, joint venture,
				employee-employer, or franchiser-franchisee relationship is intended or created by this
				Agreement.
			</p>
			<p className={textStyles}>
				This Agreement shall be governed and construed in all respects by the laws of Nigeria. You agree
				that any claim or dispute you may have against Boonfu Limited must be resolved by the courts in
				Nigeria. You and Boonfu both agree to submit to the non- exclusive jurisdiction of the Nigerian
				Courts; for claims falling within the jurisdiction of a State Court, you and Boonfu both agree
				to submit to the jurisdiction of the State Court.
			</p>
			<p className={textStyles}>
				If we don&#39;t enforce any particular provision, we are not waiving our right to do so later.
				If a court strikes down any of these terms, the remaining terms will survive. We may
				automatically assign this agreement in our sole discretion in accordance with the notice
				provision below.
			</p>
			<p className={textStyles}>
				Except for notices relating to illegal or infringing content, your notices to us must be sent by
				registered mail to Boonfu Limited, Plot 1b, Channels Avenue, Opic Lagos, Nigeria. We will send
				notices to you via the email address you provide.
			</p>
			<p className={textStyles}>
				We may update this agreement at any time, with updates taking effect when you next post or 30
				days after we post the updated policy on the Boonfu website, whichever is sooner. No other
				amendment to this agreement will be effective unless made in writing, signed by users and by us.
			</p>
			<p className={textStyles}>
				For any help with using Boonfu please see the{' '}
				<Link className="underline text-primary">Boonfu Help Page</Link>
			</p>
			<h4>Mobile Devices Terms</h4>
			<p className={textStyles}>
				If you&#39;re accessing Boonfu Services from a mobile device using a Boonfu Mobile Application
				(the &quot;Application&quot;), the following terms and conditions (&quot;Terms of Use&quot;)
				apply to you in addition to the applicable Mobile Privacy and Legal Notice or End User License
				Agreement, as the case may be. Your use of the Application confirms your agreement to these
				Terms of Use.
			</p>
			<p className={textStyles}>
				<b>Application Use</b>. Boonfu grants you the right to use the Application only for your
				personal use. You must comply with all applicable laws and third-party terms of agreement when
				using the Application (e.g. your wireless data service agreement). The Application may not
				contain the same functionality available on the{' '}
				<Link className="underline text-primary" to={Approutes.home}>
					www.boonfu.com
				</Link>{' '}
				website. Your download and use of the Application is at your own discretion and risk, and you
				are solely responsible for any damages to your hardware device(s) or loss of data that results
				from the download or use of the Application.
			</p>
			<p className={textStyles}>
				<b>Intellectual Property - Applications</b>. Boonfu owns, or is the licensee to, all right,
				title, and interest in and to its Applications, including all rights under patent, copyright,
				trade secret, trademark, and any and all other proprietary rights, including all applications,
				renewals, extensions, and restorations thereof. You will not modify, adapt, translate, prepare
				derivative works from, decompile, reverse-engineer, disassemble, or otherwise attempt to derive
				source code from any Application and you will not remove, obscure, or alter Boonfu&#39;s
				copyright notice, trademarks or other proprietary rights notices affixed to, contained within,
				or accessed in conjunction with or by any Boonfu Application.
			</p>
			<p className={textStyles}>
				<b>Additional Terms</b>. Additional terms and conditions that apply to you based on the mobile
				device the Application is installed on:
			</p>

			<h4>iOS - Apple</h4>
			<ul className="pl-6 text-base leading-relaxed text-gray-500 list-decimal dark:text-gray-400">
				<li>
					{' '}
					These Terms of Use are an agreement between you and Boonfu, and not with Apple. Apple is not
					responsible for the Application and the content thereof.
				</li>
				<li>
					Boonfu grants you the right to use the Application only on an iOS product that you own or
					control and as permitted by the Usage Rules set forth in the App Store Terms of Service.
				</li>
				<li>
					Apple has no obligation whatsoever to furnish any maintenance and support services with respect
					to the Application.
				</li>{' '}
				<li>
					{' '}
					Apple is not responsible for the investigation, defense, settlement, and discharge of any
					third-party intellectual property infringement claim.
				</li>{' '}
				<li>
					Apple is not responsible for addressing any claims by you or any third party relating to the
					Application or your possession and/or use of the Application, including but not limited to: (a)
					product liability claims; (b) any claim that the Application fails to conform to any applicable
					legal or regulatory requirement; and (c) claims arising under consumer protection or similar
					legislation.
				</li>
				<li>
					In the event of any failure of the Application to conform to any applicable warranty, you may
					notify Apple, and Apple will refund the purchase price, if applicable, for the Application to
					you; and to the maximum extent permitted by applicable law, Apple will have no other warranty
					obligation whatsoever with respect to the Application.
				</li>{' '}
				<li>
					Apple and Apple&#39;s subsidiaries are third-party beneficiaries of these Terms of Use, and,
					upon your acceptance, Apple as a third-party beneficiary thereof will have the right (and will
					be deemed to have accepted the right) to enforce these Terms of Use against you.
				</li>
			</ul>

			<h4 className="text-red-700">Android?</h4>
			<ul className="pl-6 text-base leading-relaxed text-gray-500 list-decimal dark:text-gray-400">
				<li>
					These Terms of Use are an agreement between you and Boonfu, not Microsoft. The terms of use and
					privacy policies of Microsoft and, where applicable, the network operators that provide billing
					services for the Windows Phone Marketplace do not apply to your use of the Application.
				</li>
				<li>
					You may install and use one (1) copy of the Application on up to five (5) devices you
					personally own or control and which are affiliated with the Windows Live ID associated with
					your Windows Marketplace account. You may not install or use a copy of the Application on a
					device you do not own or control.
				</li>
				<li>
					Microsoft, your device manufacturer, and (if applicable) your wireless carrier is not
					responsible for providing support services for the Application.
				</li>
				<li>
					Microsoft, the wireless carriers over whose network the Application is distributed (if
					applicable), and each of their respective affiliates and suppliers (collectively,
					&quot;Disclaiming Distributors&quot;) give no express warranty, guarantee, or conditions under
					or in relation to the Application. To the extent permitted under your local laws, the
					Disclaiming Distributors exclude any implied warranties or conditions, including those of
					merchantability, fitness for a particular purpose, and non- infringement.
				</li>
				<li>
					You, and not the Disclaiming Distributors, bear the risk of using the Application (even if the
					Disclaiming Distributors have been advised of the possibility of damages to you). You may have
					additional consumer rights under your local laws which these Terms of Use cannot change.
				</li>
				<li>
					To the extent not prohibited by law, you will not seek to recover any consequential, lost
					profit, special, indirect, or incidental damages from any Disclaiming Distributor.
				</li>
			</ul>

			<h4 ref={returnRef}>Return Policy</h4>
			<p className={textStyles}>
				The eligibility for returning an order on Boonfu marketplace is general, Albeit, there are
				items/ products that are NOT eligible for return, Please read through our policy on items bought
				on this website. <br />
				Below are the general criteria that determine whether an order is eligible for return.
			</p>

			<ol className={orderedListStyles}>
				<li>Timeframe for Returns</li>
				<ul className={listStyles}>
					<li>
						Boonfu delivery service can ONLY return items a customer rejects at the point of delivery,
						This implies that you are available to receive your order by YOURSELF or someone you trust
						their judgement.
					</li>
				</ul>

				<li>Condition of the Product</li>
				<ul className={listStyles}>
					<li>
						The product must be in its original condition:
						<ul className={listStyles}>
							<li>Unused, unopened, and with all original tags/labels intact.</li>
							<li>Packaging (e.g., box, wrapping) should be undamaged.</li>
						</ul>
					</li>
					<li>Products that are damaged, used, or altered are typically not eligible for return.</li>
				</ul>

				<li>Proof of Purchase</li>
				<ul className={listStyles}>
					<li>A valid invoice or order number is usually required to process a return</li>
					<li>Without proof of purchase, the return request may be denied</li>
				</ul>

				<li> Type of Product</li>
				<ul className={listStyles}>
					<li>
						Eligible for Return:
						<ul className={listStyles}>
							<li>Most non-perishable goods (e.g., clothing, electronics, books).</li>
						</ul>
					</li>
					<li>
						Not Eligible for Return
						<ul className={listStyles}>
							<li>Perishable items (e.g., food, flowers).</li>
							<li>Personalized or custom-made products.</li>
							<li>Intimate items (e.g., underwear, swimwear).</li>
							<li>Digital products (e.g., software, eBooks) once downloaded or activated.</li>
							<li>Products marked as "final sale" or "non-returnable."</li>
						</ul>
					</li>
				</ul>

				<li>Reason for Return</li>
				<ul className={listStyles}>
					<li>
						Common acceptable reasons for return include:
						<ul className={listStyles}>
							<li>Defective or damaged product.</li>
							<li>Incorrect product delivered.</li>
							<li>Product not as described on the website.</li>
						</ul>
						<p className={textStyles}>
							Generally customers are expected to fill the{' '}
							<span className="text-primary">customer refund request form</span> after which our team would
							access your request and IF required call for further details and also discuss possible
							exchange of item, in most cases.
						</p>
					</li>
				</ul>

				<li>Return Process Initiation</li>
				<ul className={listStyles}>
					<li>
						Noteworthy for customer to return order:
						<ul className={listStyles}>
							<li>Receive item from delivery personnel and examine it.</li>
							<li>
								Decide IF order meets expectation, IF YES, receive, IF NOT communicate to personnel and make
								your reason(s) known to him/he
							</li>
							<li>Valid reason, personnel gives option of replacement of item or refund.</li>
							<li>Take pictures of the concern where necessary and other supporting evidences</li>
							<li>
								IF replacement is requested, delivery personnel initiates the process and discuss next
								delivery time and day with customer
							</li>
							<li>
								IF refund, delivery personnel assists you with the link to fill the refund request form with
								supporting document submitted for review and conclusion.
							</li>
						</ul>
					</li>
				</ul>

				<li>Shipping the Return</li>
				<ul className={listStyles}>
					<li>
						The customer is responsible for shipping the product back to the seller <b>AFTER</b> delivery
						is done:
						<ul className={listStyles}>
							<li>Use the provided return label (if applicable).</li>
							<li>Ensure the product is securely packaged to prevent damage during transit.</li>
							<li>
								Boonfu cannot compel seller to accept order after the day of delivery is past, It is
								entirely up to the seller to take the decision of accepting a late returned item.
							</li>
						</ul>
					</li>
				</ul>

				<li>Refund or Replacement</li>
				<ul className={listStyles}>
					<li>
						Once the seller receives and inspects the returned product:
						<ul className={listStyles}>
							<li>
								<b>Refund</b>: The purchase amount is refunded to the original payment method (may take 5–10
								business days).
							</li>
							<li>
								<b>Replacement</b>: A new product is shipped to the customer (if requested and available).
							</li>
						</ul>
					</li>
				</ul>

				<h6 className="mt-2">Exceptions and Special Cases</h6>
				<ul className={listStyles}>
					<li>
						<b>Damaged During Delivery</b>: If the product is damaged during transit, the customer must
						report it immediately at delivery point and provide evidence (e.g., photos)
					</li>
					<li>
						<b>Wrong Product Delivered</b>: The seller typically covers return shipping costs for
						incorrect items.
					</li>
					<li>
						<b>Late Returns</b>: Some sellers may accept late returns but an arrangement between seller
						and customer.
					</li>
				</ul>
			</ol>

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
