import {
    Safely,
    Securely,
} from '../../assets/svgs';
import { ScrollToTop } from '../../utils';

const SafetyGuides = () => {
    return (
        <section>
            <div className="pt-1">
                <div className=" py-12 px-4 sm:px-[4rem] m-2 rounded-md bg-secondary">
                    <h1 className="text-center text-black font-extrabold ">Safety Guide</h1>
                </div>
            </div>

            <div className={`${sectionStyles} flex flex-col gap-2`}>
                <h3 className="">How to Buy and Sell, Securely.</h3>

                <p>
					At Boonfu, your safety is our top priority. Whether you're buying or selling, following these
					best practices will help ensure smooth, scam-free transactions.
                </p>
            </div>

            <div className={`${sectionStyles} flex flex-col gap-2`}>
                <h3 className="flex items-center gap-2 text-primary">
                    {' '}
                    <img src={Safely} className="w-[40px] h-[40px]" /> For Buyers: How to Shop Safely
                </h3>
                <ol className="list-decimal list-inside space-y-2">
                    <li className="font-semibold text-2xl">
						Verify Seller Profiles
                        <div className="pl-6">
                            <ul className="list-disc list-inside font-normal">
                                <li>Check seller ratings, reviews, and transaction history.</li>
                                <li>Look for the "Verified Seller" badge for added trust.</li>
                            </ul>
                        </div>
                    </li>

                    <li className="font-semibold text-2xl">
						Using Boonfu’s Escrow Protection
                        <div className="pl-6">
                            <ul className="list-disc list-inside font-normal">
                                <li>Funds are held securely until you confirm delivery.</li>
                                <li>Never pay outside the platform (no direct bank transfers or cash payments).</li>
                            </ul>
                        </div>
                    </li>

                    <li className="font-semibold text-2xl">
						Inspect Items While Delivery Personnel WAITS
                        <div className="pl-6">
                            <ul className="list-disc list-inside font-normal">
                                <li>
									Confirm the product matches the description and what you ordered online as after item
									successful delivery, transaction is termed “Closed”
                                </li>
                                <li>Report issues immediately via Boonfu’s dispute system</li>
                            </ul>
                        </div>
                    </li>

                    <li className="font-semibold text-2xl">
						Communicate Only on Boonfu
                        <div className="pl-6">
                            <ul className="list-disc list-inside font-normal">
                                <li>Avoid sharing personal contact details (phone/email) before purchase.</li>
                                <li>Keep all chats and agreements within Boonfu’s messaging system.</li>
                            </ul>
                        </div>
                    </li>

                    <li className="font-semibold text-2xl">
						Beware of Too-Good-To-Be-True Deals
                        <div className="pl-6">
                            <ul className="list-disc list-inside font-normal">
                                <li>Extremely low prices may indicate scams.</li>
                                <li>Research average market prices before buying.</li>
                            </ul>
                        </div>
                    </li>
                </ol>
            </div>

            <div className={`${sectionStyles} flex flex-col gap-2 border-t border-black`}>
                <h3 className="flex items-center gap-2 text-[#047F73]">
                    {' '}
                    <img src={Securely} className="w-[40px] h-[40px]" /> For Sellers: How to Sell Securely
                </h3>
                <ol className="list-decimal list-inside space-y-2">
                    <li className="font-semibold text-2xl">
						Set Clear Product Descriptions
                        <div className="pl-6">
                            <ul className="list-disc list-inside font-normal">
                                <li>Include high-quality photos from multiple angles.</li>
                                <li>Specify condition (new/used), defects, and return policy.</li>
                            </ul>
                        </div>
                    </li>
                    <li className="font-semibold text-2xl">
						Ship Upon Payment Confirmation by Boonfu
                        <div className="pl-6">
                            <ul className="list-disc list-inside font-normal">
                                <li>Boonfu holds buyer funds in escrow and releases to seller upon successful delivery.</li>
                            </ul>
                        </div>
                    </li>
                    <li className="font-semibold text-2xl">
						Avoid Off-Platform Transactions
                        <div className="pl-6">
                            <ul className="list-disc list-inside font-normal">
                                <li>
									Buyers asking to pay via WhatsApp, PayPal Friends & Family, or bank transfer may be
									scammers.
                                </li>

                                <li>Report suspicious requests to Boonfu support.</li>
                            </ul>
                        </div>
                    </li>
                    <li className="font-semibold text-2xl">
						Protect Your Account.
                        <div className="pl-6">
                            <ul className="list-disc list-inside font-normal">
                                <li>Use a strong password and enable two-factor authentication (2FA)</li>
                                <li>Never share login details with anyone.</li>
                            </ul>
                        </div>
                    </li>
                </ol>
            </div>

            <div className={`${sectionStyles} flex flex-col gap-2 `}>
                <h3 className="flex items-center gap-2 text-[#EBBA16]">
                    {' '}
                    <img src={Warning} className="w-[40px] h-[40px]" /> Red Flags to Watch For
                </h3>

                <ul className=" list-inside font-normal pl-6">
                    <li>🚩 Buyers/Sellers Asking for Off-Platform Payments</li>
                    <li>🚩 Poor or No Reviews on New Accounts</li>
                    <li>🚩 Vague Product Descriptions or Stock Images</li>
                    <li>🚩 Pressure to Close DealsQuickly</li>
                    <li>🚩 Unverified Grabbers Promising Unrealistic Sales</li>
                </ul>
            </div>

            <div className={`${sectionStyles} flex flex-col gap-2 `}>
                <h3 className="flex items-center gap-2 text-black"> 🛠️ What to Do If Something Goes Wrong</h3>

                <ul className=" list-inside font-normal pl-6">
                    <li>✅ Open a Dispute – Boonfu’s support team will mediate.</li>
                    <li>✅ Report Suspicious Users – Help keep the community safe.</li>
                    <li>✅ Contact Support – Reach out for urgent issues.</li>
                </ul>
            </div>

            <div className={`${sectionStyles} flex flex-col gap-2 `}>
                <h3 className="flex items-center gap-2 text-black">
                    {' '}
                    <img src={Commitment} className="w-[40px] h-[40px]" /> Boonfu’s Safety Commitment
                </h3>

                <ul className=" list-inside font-normal pl-6">
                    <li>✔ Escrow Protection – Funds secured until delivery confirmation.</li>
                    <li>✔ Verified Users – Reduced risk of scams.</li>
                    <li>✔ 24/7 Fraud Monitoring – Proactive detection of suspicious activity.</li>
                    <li>✔ Dedicated Support – Fast resolution for disputes.</li>
                </ul>
            </div>

            <div className={`${sectionStyles} `}>
                <p>Stay smart, stay safe—happy trading on Boonfu!</p>
            </div>

            <ScrollToTop />
        </section>
    );
};

export default SafetyGuides;

const sectionStyles = 'px-[4rem] py-4 max-sm:px-4';
