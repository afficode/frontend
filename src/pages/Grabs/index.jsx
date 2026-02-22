import { Link } from 'react-router-dom';
import { Four, One, Three, Two } from '../../assets/images';
import { Button } from '../../ui';
import { Approutes } from '../../constants';

const Grabs = () => {
    return (
        <section className='min-h-screen px-4 py-4 space-y-4 text-center'>
            <h3>
                Boonfu Grabber’s Journey Begins <Link className='text-primary'>HERE!</Link>
            </h3>

            <div className='rounded-lg bg-primary max-w-[1024px] mx-auto'>
                <p className='p-4 text-white'>
                    “Grab” is an affiliate marketing system where you can generate post(s) of
                    product(s) or item(s) of your choice from different sellers and share on your
                    social media platform to market to your contacts or followers for a commission
                    when the item/product is sold using your link embedded in the fliers shared
                </p>
            </div>

            <h2 className='py-6 text-primary'>How to earn as a Grabber on Boonfu.</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 place-items-center gap-y-12 max-w-[960px] mx-auto '>
                <div className='relative w-[350px] max-sm:w-[300px] h-fit mt-12 '>
                    <img src={One} alt='Step 1' className='absolute top-[-3rem] left-4  w-12' />
                    <div className=' p-6 space-y-4 text-center border border-black rounded-md h-[230px] '>
                        <h3>Register</h3>
                        <p className='p-lg'>
                            Register as a Grabber by filling out the quick, easy form. Fill in all
                            your social media handles for ease of sharing.
                        </p>
                    </div>
                </div>

                <div className='relative w-[350px] max-sm:w-[300px] h-fit mt-12 '>
                    <img src={Two} alt='Step 2' className='absolute top-[-3rem] left-4  w-12' />
                    <div className=' p-4 space-y-4 text-center border border-black rounded-md max-sm:h-[250px] h-[230px] '>
                        <h3>Grab & Share</h3>
                        <p className='p-lg'>
                            Browse through Items/products to locate products with Grab icons, Click
                            on the icon to generate a social media flier of the product for you,
                            click on “share” publish on your to platforms.
                        </p>
                    </div>
                </div>

                <div className='relative w-[350px] max-sm:w-[300px] h-fit mt-12 '>
                    <img src={Three} alt='Step 3' className='absolute top-[-3rem] left-4  w-12' />
                    <div className=' p-6 space-y-4 text-center border border-black rounded-md max-sm:h-[250px] h-[230px] '>
                        <h3>They Buy, You Earn</h3>
                        <p className='p-lg'>
                            If someone interacts with your shared flier, and eventually buys such
                            item/product through your link, you earn a commission on such
                            transaction, your wallet is credited
                        </p>
                    </div>
                </div>
                <div className='relative w-[350px] max-sm:w-[300px] h-fit mt-12 '>
                    <img src={Four} alt='Step 1' className='absolute top-[-3rem] left-4  w-12' />
                    <div className=' p-6 space-y-4 text-center border border-black rounded-md h-[230px] '>
                        <h3>Watch your Wallet</h3>
                        <p className='p-lg'>
                            Watch how your wallet grows with your commission in it, the more
                            items/products shared, the higher your chances of people buying through
                            you and higher commission as well.
                        </p>
                    </div>
                </div>
            </div>

            <div className='py-12 '>
                <Link to={Approutes.grab.register}>
                    <Button variant={'primary'} className={'max-md:w-fit'}>
                        Proceed to Create a Grabber’s Account
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default Grabs;
