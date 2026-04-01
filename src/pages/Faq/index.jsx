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
                        className='collapse bg-base-100  border-b border-b-black/10 collapse-arrow '
                        name='my-accordion-det-1'
                        open
                    >
                        <summary className='collapse-title font-semibold '>{faq.question}</summary>
                        <div className='collapse-content text-sm duration-200'>{faq.answer}</div>
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
        question: 'What does it mean to "Boonfu-it"? ',
        answer: (
            <>
                "Boonfu-it" is our shorthand for taking action. Whether you’re listing an item for
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
                It’s simple. Go to the homepage and click "Sign-in," which will take you to the
                welcome page. Click "Register," fill out the short form, and hit the "Submit"
                button. Check your email to verify your account—keep an eye out for the "Boonfu
                Account Verification" message (check your spam folder if you don’t see it). Open the
                message, click the link, and verify your phone number using the OTP sent to you via
                text. Sign in again to start selling! To post an ad on mobile, tap the "Post Ad"
                button at the bottom right of your screen. On a laptop, you’ll find "Post Ad" in the
                top right corner. Select your category, follow the prompts, and fill out the form.
                Upload high-quality photos and set your price. Once your item is live, the Boonfu
                engine starts connecting you with buyers and Grabbers instantly.
            </>
        ),
    },
    {
        question: 'Are there fees for listing on Boonfu?',
        answer: (
            <>
                Listing on Boonfu.com is completely free, unless you choose the "Sell Urgently"
                option. This activates the Grab Feature, where a small commission is required. For
                most categories, a 10% commission is held in your wallet. For example, on a 100,000
                Naira listing, 10,000 Naira is locked as the Grabber’s Commission. If a Grabber
                closes the sale, the commission is theirs. However, if you sell the item yourself
                (outside of the Grab network) within the one-month period, you can reclaim 90% of
                that locked amount (9,000 Naira). The remaining 10% of the commission (1,000 Naira)
                is retained as an administrative fee.
                <br />
                <br />
                Note: For high-value categories like Vehicles or Property, the required Grabber’s
                commission is only 1% of the total value
            </>
        ),
    },
    {
        question: 'Can I be both a Seller and a Grabber?',
        answer: (
            <>
                Yes! Many of our most successful users sell their own inventory while "Grabbing"
                other great deals to earn extra commissions on the side. One platform. Infinite ways
                to win.
            </>
        ),
    },
];
