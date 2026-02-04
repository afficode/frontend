import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Approutes, responsive } from '../../../constants';
import { v4 as uuidv4 } from 'uuid';
import { noimage } from '../../../assets/images';
import { Button } from '../../../ui';

// icons
import { BsFastForwardFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const RowContainer = ({ title, link, data }) => {
    return (
        <section className='w-full px-4 md:px-[2rem] py-8'>
            <div className='relative flex items-center w-full pb-2'>
                <h2 className='max-sm:text-2xl sm:mx-auto '>{title}</h2>

                {data === undefined || data.length === 0 ? null : (
                    <span className='absolute right-0 font-semibold cursor-pointer whitespace-nowrap text-primary hover:underline'>
                        <Link to={link}>View more</Link>

                        <BsFastForwardFill className='inline ml-2 max-sm:text-base text-[25px]' />
                    </span>
                )}
            </div>
            <div className='relative w-full pb-8'>
                {data === undefined || data.length === 0 ? (
                    <div className='py-6 space-y-4 flex flex-col items-center justify-center md:px-4'>
                        <p className='text-center w-full text-lg'>No featured ads available</p>
                        <Button variant={'primary'} size={'small'}>
                            <Link to={Approutes.postDecision}>Create an ad</Link>
                        </Button>
                    </div>
                ) : (
                    <div className='py-4 bg-primary/20 md:px-4'>
                        <Carousel renderDotsOutside responsive={responsive} showDots={true}>
                            {title !== 'Shops'
                                ? data && data.length > 0
                                    ? data.map((product) => <FeaturedProductsCard key={uuidv4()} product={product} />)
                                    : Array(12)
                                        .fill(1)
                                        .map((_) => <FeaturedProductsCard key={uuidv4()} />)
                                : null}
                        </Carousel>
                    </div>
                )}
            </div>
        </section>
    );
};

export default RowContainer;

const FeaturedProductsCard = ({ product }) => {
    return (
        <Link to={`${Approutes.product.initial}/${product?.id}`} className='max-w-[11rem] max-h-[14rem]  sm:w-[13rem] sm:h-[16rem] flex flex-col items-center justify-center rounded-lg bg-white '>
            <img className='object-cover min-w-full h-[8rem] rounded-t-lg' src={product?.images[0]?.path || noimage} alt={product?.title} />

            <div className=' flex flex-col  justify-between py-2 w-[11rem] my-auto tooltip tooltip-secondary' data-tip={product?.title.toUpperCase()}>
                <p className='line-clamp-1 uppercase mx-auto text-center '>{product?.title}</p>
                <button className='py-0 mx-4 my-auto rounded-lg text-black capitalize border-none btn-sm bg-secondary/90 hover:bg-secondary/90 mt-4 hover:text-[#FBFBFB]'>View more</button>
            </div>
        </Link>
    );
};
