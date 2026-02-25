import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TbCurrencyNaira } from 'react-icons/tb';
import { IoCopy, IoCopyOutline } from 'react-icons/io5';
import { FaCamera } from 'react-icons/fa';
import OverviewPills from '../../Products/View/OverviewPills';
import {
    convertKeyToName,
    getCommission,
    numberWithCommas,
    ScrollToTop,
    slugGeneratorForAdIdWithName,
    toMoney,
} from '../../../utils';
import GrabHeader from '../GrabHeader';
import { Approutes, frontendLink } from '../../../constants';
import { Button } from '../../../ui';
import { Download, GrabIcon } from '../../../assets/svgs';
import { fetchProduct, useNotify } from '../../../hooks';
import { Carousel, SpinnerSkeleton } from '../../../components';
import useAuth from '../../../context/UserContext';
import useGrabContext from '../../../context/GrabContext';
import { useQueryClient } from 'react-query';
import InspectionUpdate from './InspectionUpdate';

const GrabProduct = () => {
    const notify = useNotify();
    const [copied, setCopied] = useState(false);

    const { ad_id } = useParams();

    const [inspectionModal, setInspectionModal] = useState(false);
    const { user } = useAuth();
    const { data: result, isLoading, isError } = fetchProduct(ad_id);

    const grabLink = useMemo(
        () =>
            `${frontendLink.slice(0, -1)}${Approutes.grab.grabbedProduct(`bf${user.grabber.id}`, slugGeneratorForAdIdWithName(result?.data?.title, ad_id))}`,
        [ad_id, user.grabber.id, result]
    );

    const { unGrabAd } = useGrabContext();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleUnGrab = () => {
        unGrabAd(ad_id);
        queryClient.invalidateQueries({ queryKey: ['get-grabs'] });
        navigate(Approutes.grab.products);
    };

    const handleCopy = () => {
        navigator?.clipboard
            .writeText(grabLink)
            .then(() => {
                notify('Link copied to clipboard', 'success');
                setCopied(true);
            })
            .catch(() => {
                notify('Failed to copy link', 'error');
            });
    };

    const { grabberCommission } = getCommission(result?.data?.price, result?.data?.category);
    const [isDownloading, setIsDownloading] = useState(false);

    const forceDownloadUrl = (url) => {
        return url.replace('/upload/', '/upload/fl_attachment/');
    };

    const downloadImage = async (img) => {
        const response = await fetch(forceDownloadUrl(img.path));
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const urlExt = img.path.split('.').pop();
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = !img.filename
            ? `download.${urlExt}`
            : /\.[a-zA-Z0-9]+$/.test(img.filename)
              ? img.filename
              : `${img.filename}.${urlExt}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);

        setIsDownloading(false);
        // notify('Image downloaded successfully', 'success');
    };

    const handleDownloadAll = async () => {
        setIsDownloading(true);
        notify('Downloading images...', 'info', {
            toastId: 'downloading',
        });

        // eslint-disable-next-line no-unsafe-optional-chaining
        for (const img of result?.data?.images) {
            await downloadImage(img);
        }
    };

    if (isLoading) {
        return (
            <div className='h-screen'>
                <SpinnerSkeleton />
            </div>
        );
    } else if (isError) {
        return <div className='h-screen'>Product not found</div>;
    }

    if (result) {
        return (
            <section className='w-full'>
                <GrabHeader text='Grabbed Item preview' />
                <div className='w-full p-2 my-4 text-center text-white bg-red-500 whitespace-nowrap'>
                    {grabberCommission && <h4>Commission : ₦ {toMoney(grabberCommission)}</h4>}
                </div>

                <div className='flex flex-col w-full h-full gap-2 xl:flex-row xl:gap-4 '>
                    <div className='w-full xl:w-[65%]  flex flex-col justify-between'>
                        <div className='w-full mb-2'>
                            <div className='flex items-center justify-between w-full  font-bold uppercase '>
                                <h3 className='capitalize'>{result?.data.title} </h3>
                            </div>

                            <div className='flex items-center justify-between'>
                                <p className='w-full  whitespace-nowrap'>
                                    <Link
                                        to={`/products/search?lga=${result.data?.lga_id}`}
                                        className='text-primary hover:underline'
                                    >
                                        {result.data?.location.split(',')[0]}
                                    </Link>{' '}
                                    |{' '}
                                    <Link
                                        to={`/products/search?state_id=${result.data?.state_id}`}
                                        className='text-primary hover:underline'
                                    >
                                        {result.data?.location.split(',')[1]}
                                    </Link>
                                </p>
                                <p className='flex items-center justify-end w-full pr-2 font-bold'>
                                    <TbCurrencyNaira className='font-bold text-black' />
                                    {numberWithCommas(result.data?.price)}
                                </p>
                            </div>
                        </div>{' '}
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

                    <aside className='flex flex-col justify-between w-full xl:w-[35%] h-max min-h-[350px]   border-2 border-gray-400 p-2 lg:p-4 '>
                        <div className='w-full flex flex-col'>
                            <div className='flex items-center flex-wrap justify-between'>
                                <p className='p-lg'>Category </p>
                                <p className='font-semibold p-lg text-primary text-right'>
                                    {result?.data.parent_category}
                                </p>
                            </div>
                            <hr className='h-px my-2 border-black/40 border-1' />
                        </div>

                        <div>
                            <div className='mb-6'>
                                <p className='p-lg'>Grab Link</p>

                                <div className='flex items-center justify-between'>
                                    <p className='text-primary text-wrap break-words w-[16rem]'>
                                        {grabLink ? grabLink : null}
                                    </p>
                                    <div>
                                        {copied ? (
                                            <button title='Link copied to your clipboard'>
                                                <IoCopy className='cursor-pointer' size={20} />
                                            </button>
                                        ) : (
                                            <button title='Copy link!' onClick={handleCopy}>
                                                <IoCopyOutline
                                                    className='cursor-pointer'
                                                    size={20}
                                                />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Button
                                    onClick={handleUnGrab}
                                    variant={'secondary'}
                                    size={'full'}
                                    className={'flex items-center justify-center gap-4 rounded-xl'}
                                >
                                    <img src={GrabIcon} alt='/' className=' w-8 ' />
                                    Remove Item
                                </Button>
                                <Link
                                    to={Approutes.grab.useFlyer(ad_id)}
                                    target='_blank'
                                    className='flex-1'
                                >
                                    <Button
                                        variant={'primary'}
                                        size={'full'}
                                        className={'!bg-[#047F73] text-white rounded-xl'}
                                    >
                                        Generate Post Now
                                    </Button>
                                </Link>
                                <Button
                                    onClick={() => setInspectionModal(true)}
                                    variant={'primary'}
                                    size={'full'}
                                    className={' rounded-xl'}
                                >
                                    Inspection log
                                </Button>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* description and overview */}
                <div className='flex flex-col p-2 my-2 bg-gray-200 xl:p-6 xl:my-4'>
                    <div className='flex flex-col items-start justify-start w-full gap-2 tracking-tighter lg:tracking-normal line-clamp-1'>
                        <h2 className='text-xl xl:2xl'>Description</h2>

                        <p className='bg-white p-4 min-h-[100px] w-full text-justify text-lg border-t-4 border-t-primary whitespace-pre-line'>
                            {result?.data?.description}
                        </p>
                    </div>

                    <div className='flex flex-col items-start justify-start w-full gap-2 my-2'>
                        <h2 className='text-xl tracking-tighter lg:tracking-normal'>Overview</h2>

                        <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                            {convertKeyToName(result?.data).map((val, index) => (
                                <OverviewPills overview={val} key={index} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* bottom buttons  */}
                <div className='flex gap-6 my-8 max-sm:flex-col'>
                    <Button
                        onClick={handleDownloadAll}
                        loading={isDownloading}
                        disabled={isDownloading}
                        variant={'primary'}
                        className={
                            'flex  flex-1 items-center justify-center gap-4 px-8 py-[.75rem] w-full  font-semibold text-xl '
                        }
                    >
                        <img src={Download} alt='download icon' className='w-8' /> Download images
                    </Button>

                    <Link to={Approutes.grab.products} className='flex-1'>
                        <Button variant={'grey'} className={' w-full h-full font-semibold text-xl'}>
                            Close
                        </Button>
                    </Link>
                </div>

                <InspectionUpdate
                    adId={result?.data?.id}
                    inspectionModal={inspectionModal}
                    setInspectionModal={setInspectionModal}
                    hasRequestedPayment={result?.data?.payment_request}
                    location={result?.data?.location}
                />
                <ScrollToTop />
            </section>
        );
    }

    return <div>Product not found</div>;
};

export default GrabProduct;
