import { ScrollToTop } from '../../utils';

const Faq = () => {
    return (
        <section className='w-full h-full pt-4 pb-6 px-4  '>
            <div className='bg-primary py-12 px-4 sm:px-[4rem] m-2 rounded-md text-center text-white'>
                <h1 className='text-white '>Frequently Asked Questions</h1>
            </div>

            <div className='flex flex-col gap-4 max-w-4xl mx-auto mt-6'>
                {faqsList.map((faq, i) => (
                    <details
                        className='collapse bg-gray-200/80 collapse-arrow '
                        name='my-accordion-det-1'
                        key={faq.question.toString().substring(0, 10).toString() + i}
                        open
                    >
                        <summary className='collapse-title font-semibold'>{faq.question}</summary>
                        <div className='collapse-content text-sm duration-200 border-t border-t-black/10 pt-2  text-justify'>{faq.answer}</div>
                    </details>
                ))}
            </div>

            <ScrollToTop />
        </section>
    );
};

export default Faq;

const faqsList = [
    {
        question: 'What exactly is boonfu.com? ',
        answer: (
            <>
                Boonfu is Nigeria's high-velocity marketplace designed for speed and security. It’s
                a platform where you can buy or sell items with the confidence of automatic escrow
                and the power of a dedicated "Grabber" network that helps move products faster than
                anywhere else.
            </>
        ),
    },
    {
        question: 'What is Boonfu’s Grabber’s program?  ',
        answer: (
            <>
                A Grabber is a high-energy promoter on our platform. They "Grab" your listing and
                share it with their own networks to help you find a buyer faster. In return, they
                earn a small commission when the sale is finalized. It’s a win-win: you sell faster,
                and they earn for their hustle.
            </>
        ),
    },
    {
        question: (<>What does it mean to <span className="font-semibold text-primary">"Boonfu-it"</span> ? </>),
        answer: (
            <>
                <b className='font-semibold text-primary'>"Boonfu-it"</b> is our shorthand for taking action. Whether you’re listing an item for
                sale or clicking "Buy" on a deal you love, to Boonfu-it means to execute a trade
                with 100% security and zero delay.
            </>
        ),
    },
    {
        question: 'Is my money safe on Boonfu?',
        answer: (
            <>
                Absolutely. We use an Iron-Clad Escrow system. When you buy an item, your money is
                held securely by Boonfu. We only release the funds to the seller once you’ve
                received the item and confirmed it matches the description. No "pay and disappear"
                scams here.
            </>
        ),
    },
    {
        question: 'How do I start selling?',
        answer: (
            <>
                It’s simple:
                <ul className='list-disc list-inside'>
                    <li>Go to the homepage and click <b>"Sign-in"</b> - this takes you to the
                        welcome page.</li>
                    <li>Click <b>"Register"</b> </li>
                    <li>Fill out the short form</li>
                    <li>Submit</li>
                </ul>
                <br />
                You'll receive an email with a link to verify your phone number.
                <br />
                Post Action:
                <ul>
                    <li>Check your email to verify your account — keep an eye out for the <b>"Boonfu
                        Account Verification"</b> email subject (check your spam folder if you don’t see it).
                    </li>
                </ul>
                <br />
                Open the message, click the link, and verify your phone number using the OTP sent to you via
                text. Sign in again to start selling!
                <br />To post an ad on mobile, tap the <b>"Post Ad"</b>
                button at the bottom right of your screen. On a laptop, you’ll find <b>"Post Ad"</b> in the
                top right corner. Select your category, follow the prompts, and fill out the form.
                <br />
                Upload high-quality photos and set your price. Once your item is live, the Boonfu
                engine starts connecting you with buyers and Grabbers instantly.
            </>
        ),
    },
    {
        question: 'Are there fees for listing on Boonfu?',
        answer: (
            <>
                Listing on Boonfu.com is completely free, unless you choose the <b>"Sell Urgently"</b>
                option. This activates the <b>Grab Feature, where a small commission is required</b>. For
                most categories, a <b>10% commission</b> is held in your wallet. For example, on a 100,000
                Naira listing, 10,000 Naira is locked as the Grabber’s Commission. If a Grabber
                closes the sale, the commission is theirs. However, if you sell the item yourself
                (outside of the Grab network) within the one-month period, you can reclaim <b>90%</b> of
                that locked amount (9,000 Naira). The remaining <b>10%</b> of the commission (1,000 Naira)
                is retained as an administrative fee.
                <br />
                <br />
                <b>Note:</b> For high-value categories like Vehicles or Property, the required Grabber’s
                commission is only <b>1%</b> of the total value.
            </>
        ),
    },
    {
        question: 'Can I be both a Seller and a Grabber?',
        answer: (
            <>
                Yes! Many of our most successful users sell their own inventory while "Grabbing"
                other great deals to earn extra commissions on the side. <b className='font-semibold text-primary uppercase'>One platform. Infinite ways
                    to win.</b>
            </>
        ),
    },
];
