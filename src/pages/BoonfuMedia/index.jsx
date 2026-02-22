import { FacebookBlue, Instagram, Linkdin, Twitter } from '../../assets/svgs';
import { Button } from '../../ui';
import { ScrollToTop } from '../../utils';
import { BOONFU_MAIL } from '../../constants';

const BoonfuMedia = () => {
    return (
        <section>
            <div className='pt-1'>
                <div className=' py-12 px-4 sm:px-[4rem] m-2 rounded-md media'>
                    <h1 className='text-start text-secondary font-extrabold uppercase'>
                        Boonfu Media
                    </h1>
                </div>
            </div>

            <div className={`${sectionStyles} flex flex-col gap-4`}>
                <h3 className=''>Welcome to the Boonfu Media Center</h3>

                <p>
                    Explore the latest updates, press releases, and media coverage related to Boonfu
                    Marketplace. Here you’ll find valuable resources and information about our
                    platform, events, and industry insights.
                </p>
            </div>

            <div className={`${sectionStyles} flex flex-col gap-4`}>
                <h3 className=''>Press</h3>

                <p>
                    Stay updated with our latest announcements, partnerships, and developments
                    through our press releases.
                </p>
                <ul className='list-disc list-inside'>
                    <li>[Link to Press Release 1]</li>
                    <li>[Link to Press Release 2]</li>
                    <li>[Link to Press Release 3]</li>
                </ul>
            </div>

            <div className={`${sectionStyles} flex flex-col gap-4`}>
                <h3 className=''>Media Coverage</h3>

                <p>
                    Discover what the media is saying about Boonfu Marketplace and our impact on the
                    tech industry, How Grabbers are raking-in residual incomes through commission
                    earnings.
                </p>
                <ul className='list-disc list-inside'>
                    <li>[Link to Media Coverage 1]</li>
                    <li>[Link to Media Coverage 2]</li>
                    <li>[Link to Media Coverage 3]</li>
                </ul>
            </div>

            <div className={`${sectionStyles} flex flex-col gap-4`}>
                <h3 className=''>Media Contact</h3>

                <p>
                    Catch up on our participation in industry events, conferences, and webinars
                    focused on technology and entrepreneurship.
                </p>
                <ul className='list-disc list-inside'>
                    <li>Name: [Your Media Contact's Name]</li>
                    <li>Email: [{BOONFU_MAIL}]</li>
                    <li>Phone: [+234 (0) 9135350168]</li>
                </ul>
            </div>

            <div className={`${sectionStyles} flex flex-col gap-4`}>
                <h3 className=''>Join Our Community</h3>

                <p>
                    Become a part of our growing community and stay informed about the latest in
                    tech, entrepreneurship, and innovation
                </p>
            </div>

            <div className={`${sectionStyles} flex flex-col gap-4`}>
                <h3 className=''>Subscribe To Our Newsletter</h3>

                <p>
                    Receive updates, insights, and special offers directly to your inbox. Subscribe
                    to our newsletter today!
                </p>

                <div className=''>
                    <Button variant={'primary'} size={'small'} className={'rounded-3xl'}>
                        Subscribe Now
                    </Button>
                </div>
            </div>

            <div className={`${sectionStyles} flex flex-col gap-4`}>
                <h3 className=''>Follow Us</h3>

                <p>Stay connected with Boonfu Marketplace on social media:</p>
                <div className='flex items-center gap-4'>
                    <img src={FacebookBlue} className='w-8 cursor-pointer' alt='/' />
                    <img src={Twitter} className='w-8 cursor-pointer' alt='/' />
                    <img src={Linkdin} className='w-8 cursor-pointer' alt='/' />
                    <img src={Instagram} className='w-8 cursor-pointer' alt='/' />
                </div>
            </div>
            <ScrollToTop />
        </section>
    );
};

export default BoonfuMedia;

const sectionStyles = 'px-[4rem] py-8 max-sm:px-4';
