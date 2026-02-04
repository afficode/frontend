import { BsFastForwardFill } from 'react-icons/bs';
import { SportCar, Furniture, House, Tailor, noimage } from '../../../assets/images';
import { Card } from '../../../components';
import { Link } from 'react-router-dom';
import { useProduct } from '../../../hooks';
import { Approutes } from '../../../constants';
import { TbCurrencyNaira } from 'react-icons/tb';
import { numberWithCommas } from '../../../utils/index.js';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { formatDistance } from 'date-fns';
import Feature from '../../Products/Default/Feature';
import { Button } from '../../../ui/index.js';

const RowContainer = ({ title, link }) => {
    const product = useProduct();
    return (
        <section className='px-4 md:px-[4rem] py-6'>
            <div className='flex items-center justify-between pb-4'>
                <h3 className='w-full font-normal'>{title}</h3>

                <Link className='font-semibold capitalize cursor-pointer whitespace-nowrap max-sm:text-sm text-primary hover:underline' to={link || '#'}>
					See More
                    <BsFastForwardFill className='inline ml-2 max-sm:text-base text-[25px]' />
                </Link>
            </div>

            {title === 'Discover more...' && (product?.data?.ads === undefined || product?.data?.ads?.length === 0) ? (
                <div className='py-6 space-y-4 flex flex-col items-center justify-center md:px-4'>
                    <p className='text-center w-full text-lg'>No ads available</p>
                    <Button variant={'primary'} size={'small'}>
                        <Link to={Approutes.postDecision}>Create an ad</Link>
                    </Button>
                </div>
            ) : (
                <div className='grid grid-cols-1 gap-4 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {title === 'Discover more...'
                        ? product?.data?.ads?.slice(0, 4).map((item) => <CardDetails key={item.id} {...item} />)
                        : title === 'Categories'
                            ? categoriesData.map((item) => <Card key={item.title} {...item} />)
                            : null}
                </div>
            )}
        </section>
    );
};

export default RowContainer;

const CardDetails = ({ id, title, location, images, created_at, price, feature }) => {
    const img = images[0]?.path || noimage;
    return (
        <Link to={`${Approutes.product.initial}/${id}`} className=' w-[18rem] sm:max-w-[25rem] h-[22rem] border border-black/25 shadow-sm cursor-pointer hover:shadow-lg transition-all  ease-in-out overflow-hidden'>
            <div className='relative ml-0.5'>{feature !== '0' && feature !== '3' && <Feature feature={feature} />}</div>
            <img className=' min-w-full h-[70%] object-cover' src={img} alt={title && title} />

            <div className='px-2 py-2'>
                <span className='flex justify-between font-semibold tracking-tighter'>
                    <p className='p-lg uppercase line-clamp-1 truncate'>{title}</p>
                </span>
                <div className='block w-full mt-2 text-start text-ellipsis truncate flex-nowrap line-clamp-1 text-sm'>
                    <FaMapMarkerAlt className=' inline-block text-sm' /> <p className=' tracking-tighter line-clamp-1 inline'>{location}</p>
                </div>
                <p className='flex justify-between tracking-tighter line-clamp-1 '>
                    <span className='flex'>
                        <TbCurrencyNaira className='mt-1' />
                        {numberWithCommas(price)}
                    </span>
                    <span className=''>
                        {formatDistance(new Date(new Date(`${created_at}`)), Date.now(), {
                            includeSeconds: true,
                            addSuffix: true,
                        })}
                    </span>
                </p>
            </div>
        </Link>
    );
};

const categoriesData = [
    {
        img: SportCar,
        title: 'Cars & Automobiles',
        link: `${Approutes.product.category}/${btoa(50)}`,
    },
    {
        img: House,
        title: 'Properties',
        link: `${Approutes.product.category}/${btoa(51)}`,
    },
    {
        img: Furniture,
        title: 'Home and Accessories',
        link: `${Approutes.product.category}/${btoa(57)}`,
    },
    {
        img: Tailor,
        title: 'Fashion',
        link: `${Approutes.product.category}/${btoa(55)}`,
    },
];
