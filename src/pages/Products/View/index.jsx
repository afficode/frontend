import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Approutes, frontendBaseUrl } from '../../../constants';
import { fetchProduct } from '../../../hooks';
import Breadcrumb from '../../../components/Breadcrumb';
import { TbCurrencyNaira } from 'react-icons/tb';
import { IoEye } from 'react-icons/io5';
import { FaCamera } from 'react-icons/fa';
import useAuth from '../../../context/UserContext';
import ChatForm from './ChatForm';
import ViewProduct from '../../../components/Skeleton/ViewProduct';
import {
    numberWithCommas,
    convertKeyToName,
    extractAdIdFromSlug,
    slugGeneratorForAdIdWithName,
} from '../../../utils/index.js';
import OverviewPills from './OverviewPills';
import { formatDistance } from 'date-fns';
import { ScrollToTop } from '../../../utils';
import { HiInformationCircle } from 'react-icons/hi';
import ContactAdmin from './ContactAdmin';
import { Alert } from 'flowbite-react';
import SaveProduct from '../Default/SaveProduct';
import { getSaves } from '../../../hooks/useSaves';
import { NegotiableIcon } from '../../../ui';
import { useNotify } from '../../../hooks';
import { ActionBar, Carousel, GrabUpdateTable, SEO } from '../../../components';
import { categoryData } from '../../../constants/Category.js';

const index = () => {
    let { id } = useParams();
    id = extractAdIdFromSlug(id);
    const [items, setItems] = useState(null);
    const [revealNumber, setRevealNumber] = useState(false);
    const [revealEmail, setRevealEmail] = useState(false);
    const { isLogin, user } = useAuth();
    const { data: result, isLoading } = fetchProduct(id, isLogin);
    const { isLoading: saveLoading } = getSaves();
    const notify = useNotify();

    useEffect(() => {
        if (result?.data) {
            setItems(() => [
                { name: 'Home', link: Approutes.home },
                { name: 'Products', link: Approutes.product.initial },
                { name: result?.data?.title },
            ]);
        }
    }, [isLoading, saveLoading]);

    useEffect(() => {
        if (result?.data?.available === 0 && user?.id !== result?.data?.user_id) {
            window.location.replace(Approutes.product.initial);
        }
    }, [isLoading, result]);

    return isLoading ? (
        <ViewProduct />
    ) : user?.id === result?.data?.user_id ? (
        <section className='w-full px-4 py-2 lg:py-4 lg:px-8'>
            {result?.data?.paid === 1 && result?.data?.active === '2' ? (
                <div className='w-[90%] lg:w-1/2 my-3 mx-auto'>
                    <Alert
                        // additionalContent={<ContactAdmin />}
                        color='success'
                    >
                        <h5 className='font-medium text-red-600'>This Ad is marked as closed: </h5>{' '}
                        <div className=''>
                            {' '}
                            This Ad is marked as closed and is not displayed for customers to see.
                            <ul className='list-disc list-inside font-bold my-4'>
                                <li className='text-sm'>
                                    You can choose to delete this Ad or it will be VACUMMED during
                                    our daily cleanup.
                                </li>
                                <li className='text-sm'>
                                    Closed Ad are deleted after 48 hours of closure from our policy.
                                </li>
                            </ul>
                            <span className='font-bold mt-4 bg-white text-green-500 p-2'>
                                Thanks for using Boonfu!
                            </span>
                        </div>
                    </Alert>
                </div>
            ) : result?.data?.paid === 1 && result?.data?.available === 0 ? (
                <div className='w-[90%] lg:w-[70%] my-3 mx-auto'>
                    <Alert
                        // additionalContent={<ContactAdmin />}
                        color='info'
                    >
                        <h5 className='font-medium text-red-600'>Ad Post successfully: </h5>{' '}
                        <div className=''>
                            {' '}
                            This Ad is been processed ATM. Processing time is less than 24 hours. If
                            this takes more than 24 hours please reach out to Admin with the contact
                            form with the below details.
                            <ul className='list-disc list-inside font-bold '>
                                <li className='text-sm'>Ad Title</li>
                                <li className='text-sm'>Your email address</li>
                                <li className='text-sm'>Date Posted</li>
                            </ul>
                            <div className='w-full font-bold my-2 bg-secondary text-white p-2'>
                                Please ensure the Ad title matches exactly what you have in your Ad.
                                This will facilitate the response to your request.
                            </div>
                        </div>
                    </Alert>
                </div>
            ) : (
                result?.data.active === '0' &&
                user.id === result?.data.owner && (
                    <div className='w-[90%] lg:w-[70%] my-3 mx-auto'>
                        <Alert
                            additionalContent={<ContactAdmin ads_id={id} />}
                            color='warning'
                            icon={HiInformationCircle}
                        >
                            <div>
                                <span className='font-medium text-red-600'>
                                    Ad Blocked:{' '}
                                    <span className='underline'>
                                        {' '}
                                        Change a few things up and try submitting again.
                                    </span>
                                </span>{' '}
                            </div>
                        </Alert>
                    </div>
                )
            )}

            <section className='flex flex-col w-full gap-2 md:flex-row md:gap-8 line-clamp-1'>
                <main className='w-full flex flex-col'>
                    <div className='w-full my-2 '>
                        {/* ad title  */}
                        <div className='flex items-center justify-between w-full my-2 font-bold uppercase text-md md:text-2xl xl:text-3xl'>
                            <span className=''>{result.data?.title}</span>
                            <span className=' flex items-center gap-2 lg:gap-8 my-auto '>
                                <NegotiableIcon negotiable={result.data?.negotiable} />

                                {isLogin && result?.data?.owner !== user?.id && (
                                    <>
                                        <SaveProduct ads_id={id} />
                                    </>
                                )}
                            </span>
                        </div>

                        {/* price and status  */}
                        <div className='flex items-center justify-between'>
                            <p className='flex items-center  w-full font-bold '>
                                <TbCurrencyNaira className='font-bold text-black' />
                                {numberWithCommas(result.data?.price)}
                            </p>

                            {result?.data?.active === '1' ? (
                                <span className={'px-4 py-1 rounded-lg text-white bg-green-700  '}>
                                    Active
                                </span>
                            ) : result?.data?.active === '2' ? (
                                <span className={'px-4 py-1 rounded-lg text-white bg-gray-700  '}>
                                    Closed
                                </span>
                            ) : null}
                            {result?.data?.active === '0' && result?.data.paid === 1 ? (
                                <span className={'px-4 py-1 rounded-lg text-white bg-red-700  '}>
                                    Blocked
                                </span>
                            ) : null}
                        </div>
                    </div>{' '}
                    <div className='w-full mx-auto mt-1'>
                        <div className='relative w-full h-[600px] mx-auto mt-1  rounded-none '>
                            <Carousel
                                className='w-full h-full mx-auto'
                                items={result?.data?.images}
                            />
                            <div className='absolute top-[440px] flex w-full h-10 my-0 py-2 pl-6 text-white  rounded-none'>
                                <span className='flex px-2 my-auto border-2 border-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
                                    <FaCamera className='mt-1 text-sm' />
                                    &nbsp; &nbsp;{' '}
                                    <span className='my-auto text-sm'>
                                        {' '}
                                        {result?.data?.images.length}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <ActionBar ad={result?.data} />
                </main>
            </section>

            <GrabUpdateTable ad={result?.data} />
            <section className='flex flex-col p-2 my-2 bg-gray-200 xl:p-6 xl:my-4'>
                <div className='flex flex-col items-start justify-start w-full gap-2 tracking-tighter lg:tracking-normal line-clamp-1'>
                    <h2 className='text-xl xl:2xl'>Description</h2>
                    <p className='bg-white p-4 min-h-[100px] text-justify text-lg border-t-4 border-t-primary whitespace-pre-line w-full'>
                        {result?.data?.description}
                    </p>
                </div>
                <div className='flex flex-col items-start justify-start w-full gap-2 my-2'>
                    <h2 className='text-xl tracking-tighter lg:tracking-normal'>Overview</h2>

                    <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {convertKeyToName(result?.data).map((val, index) => (
                            <OverviewPills overview={val} ad={result?.data} key={index} />
                        ))}
                    </div>
                </div>
            </section>
            <ScrollToTop />
            <SEO
                title={result?.data?.title}
                description={result?.data?.description}
                url={`${frontendBaseUrl}${Approutes.product.view.replace(':id', slugGeneratorForAdIdWithName(result?.data?.title, result?.data?.id))}`}
                keywords={[
                    result?.data?.title,
                    ...categoryData.map((category) =>
                        result?.data?.category.toString().startsWith(category.id.toString())
                    ),
                ]}
                image={result?.data?.images[0]?.path}
            />
        </section>
    ) : (
        <section className='w-full p-2 lg:p-4'>
            <header className='w-full'>
                <Breadcrumb items={items} className={'text-md breadcrumbs text-primary'} />
            </header>

            <section className='flex flex-col  h-full w-full gap-2 md:flex-row md:items-stretch md:gap-8 line-clamp-1'>
                <main className='w-full h-full  md:w-[60%] xl:w-[70%] flex flex-col justify-between lg:py-4 border-2 border-transparent'>
                    {/* ad top info */}
                    <div className='w-full mb-2 pl-2'>
                        {/* ad name and options */}
                        <div className='flex items-center justify-between w-full mb-2 font-bold uppercase text-md md:text-2xl xl:text-3xl'>
                            <span className=''>{result?.data?.title}</span>
                            <span className=' flex items-center gap-2 lg:gap-8 my-auto mr-4 lg:mr-0'>
                                <NegotiableIcon negotiable={result?.data?.negotiable} />

                                {result?.data?.active !== '2' &&
                                    isLogin &&
                                    result?.data?.owner !== user?.id && (
                                    <>
                                        <SaveProduct ads_id={id} />
                                    </>
                                )}
                            </span>
                        </div>

                        {/* ad location */}
                        <div className='flex items-center justify-between'>
                            <p className='w-full'>
                                <Link
                                    to={`/product/?q=&state_id=${result?.data?.state_id}&lga_id=${result?.data?.lga_id}`}
                                    className='text-primary hover:underline'
                                >
                                    {result?.data?.location.split(',')[0]}
                                </Link>{' '}
                                |{' '}
                                <Link
                                    to={`/product/?q=&state_id=${result?.data?.state_id}`}
                                    className='text-primary hover:underline'
                                >
                                    {result?.data?.location.split(',')[1]}
                                </Link>
                            </p>
                            {/* price and status  */}
                            <div className='flex flex-col items-center justify-between'>
                                <p className='flex items-center  w-full font-bold '>
                                    <TbCurrencyNaira className='font-bold text-black' />
                                    {numberWithCommas(result.data?.price)}
                                </p>

                                {result?.data?.active === '1' ? (
                                    <span
                                        className={'px-4 py-1 rounded-lg text-white bg-green-700  '}
                                    >
                                        Active
                                    </span>
                                ) : result?.data?.active === '2' ? (
                                    <span
                                        className={'px-4 py-1 rounded-lg text-white bg-gray-700  '}
                                    >
                                        Closed
                                    </span>
                                ) : null}
                                {result?.data?.active === '0' && result?.data.paid === 1 ? (
                                    <span
                                        className={'px-4 py-1 rounded-lg text-white bg-red-700  '}
                                    >
                                        Blocked
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    </div>{' '}
                    {/* ad images */}
                    <div className='relative w-full h-[600px] mx-auto mt-1  rounded-none '>
                        <Carousel className='w-full h-full mx-auto' items={result?.data?.images} />
                        <div className='absolute top-[440px] flex w-full h-10 my-0 py-2 pl-6 text-white  rounded-none'>
                            <span className='flex px-2 my-auto border-2 border-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
                                <FaCamera className='mt-1 text-sm' />
                                &nbsp; &nbsp;{' '}
                                <span className='my-auto text-sm'>
                                    {' '}
                                    {result?.data?.images.length}
                                </span>
                            </span>
                        </div>
                    </div>
                </main>

                <aside className='w-full h-full md:w-[40%] xl:w-[30%] border-2 border-gray-400 max-lg:p-2 lg:px-4 lg:pt-4 flex flex-col'>
                    <h2 className='w-full text-lg font-bold md:text-xl 2xl:text-3xl'>
                        {result?.data?.firstname}
                    </h2>
                    <p className='text-lg'>
                        Since{' '}
                        {formatDistance(
                            new Date(new Date(`${result?.data?.joined_on}`)),
                            Date.now(),
                            {
                                includeSeconds: true,
                                addSuffix: true,
                            }
                        )}
                    </p>

                    <hr className='h-px my-2 bg-gray-700 border-black border-1' />

                    {result?.data.feature !== '3' && (
                        <div className='w-full text-lg tracking-tighter lg:text-xl'>
                            <p className='w-full'>Contact {result?.data?.firstname} </p>
                            {result?.data?.contact_type.includes('phone') && (
                                <div className='flex items-center justify-between'>
                                    <p className='my-2 text-sm  text-start w-max'>
                                        <span>
                                            {revealNumber
                                                ? result?.data?.number
                                                : `${result?.data?.number.substring(0, 3)}XXXXXXXX`}
                                        </span>
                                    </p>
                                    {!revealNumber ? (
                                        <button
                                            className={`font-bold  text-black bg-white rounded-none btn btn-sm hover:bg-primary hover:text-white hover:border-0 hover:rounded-sm ${
                                                !isLogin && 'bg-gray-100 cursor-not-allowed'
                                            }`}
                                            onClick={() => {
                                                if (
                                                    isLogin &&
                                                    result?.data?.contact_type.includes('phone')
                                                ) {
                                                    setRevealNumber(!revealNumber);
                                                } else {
                                                    notify('Please login to reveal phone number');
                                                }
                                            }}
                                        >
                                            <span className='flex items-center justify-center text-sm'>
                                                <IoEye /> &nbsp; Reveal{' '}
                                            </span>
                                        </button>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            )}

                            {result?.data?.contact_type.includes('email') && (
                                <div className='flex items-center justify-between w-full'>
                                    <p
                                        className={`my-2 w-max  text-start ${revealEmail ? 'tooltip tooltip-primary' : ''}`}
                                        data-tip={revealEmail ? result?.data?.email : ''}
                                    >
                                        <span className='pr-1 text-sm '>
                                            {revealEmail && result?.data?.email !== null
                                                ? result?.data?.email
                                                : `${result?.data?.email.substring(0, 3)}XXXXXXXX`}
                                        </span>
                                    </p>

                                    {!revealEmail ? (
                                        <button
                                            className={`font-bold text-black bg-white rounded-none btn btn-sm hover:bg-primary hover:text-white hover:border-0 hover:rounded-sm ${
                                                !isLogin && 'bg-gray-100 cursor-not-allowed'
                                            } `}
                                            onClick={() => {
                                                if (
                                                    isLogin &&
                                                    result?.data?.contact_type.includes('email')
                                                ) {
                                                    setRevealEmail(!revealEmail);
                                                } else {
                                                    notify(
                                                        'Please login to reveal Ads owner email'
                                                    );
                                                }
                                            }}
                                        >
                                            <span className='flex items-center justify-center text-sm'>
                                                <IoEye /> &nbsp; Reveal{' '}
                                            </span>
                                        </button>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    {result?.data?.active !== '2' && (
                        <ChatForm
                            ad={result?.data}
                            ad_id={result?.data?.id}
                            feature={result?.data?.feature}
                            owner={result?.data?.owner}
                            active={result?.data?.active}
                        />
                    )}
                </aside>
            </section>

            <section className='flex flex-col p-2 my-2 bg-gray-200 xl:p-6 xl:my-4'>
                <div className='flex flex-col items-start justify-start w-full gap-2 tracking-tighter lg:tracking-normal line-clamp-1'>
                    <h2 className='text-xl xl:2xl'>Description</h2>
                    <p className='bg-white p-4 min-h-[100px] text-justify text-lg border-t-4 border-t-primary whitespace-pre-line w-full'>
                        {result?.data?.description}
                    </p>
                </div>
                <div className='flex flex-col items-start justify-start w-full gap-2 my-2'>
                    <h2 className='text-xl tracking-tighter lg:tracking-normal'>Overview</h2>

                    <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {convertKeyToName(result?.data).map((val, index) => (
                            <OverviewPills overview={val} ad={result?.data} key={index} />
                        ))}
                    </div>
                </div>
            </section>
            <ScrollToTop />
            <SEO
                title={result?.data?.title}
                description={result?.data?.description}
                url={`${frontendBaseUrl}${Approutes.product.view.replace(':id', slugGeneratorForAdIdWithName(result?.data?.title, result?.data?.id))}`}
                keywords={[
                    result?.data?.title,
                    ...categoryData.map((category) =>
                        result?.data?.category.toString().startsWith(category.id.toString())
                    ),
                ]}
                image={result?.data?.images[0]?.path}
            />
        </section>
    );
};

export default index;
