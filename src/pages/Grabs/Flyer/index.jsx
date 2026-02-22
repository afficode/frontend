import { BoonfuLogo } from '../../../assets/images';
import { useParams } from 'react-router-dom';
import { Button } from '../../../ui';
import { useCallback, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { ScrollToTop, toMoney } from '../../../utils';
import { fetchProduct, useNotify } from '../../../hooks';
import { SpinnerSkeleton } from '../../../components';
import { ArrowDown2 } from '../../../assets/svgs';

const GrabFlyer = () => {
    const { ad_id } = useParams();
    const contentRef = useRef(null);
    const notify = useNotify();
    const [isLoading, setIsLoading] = useState(false);
    const { data: ad, isLoading: isAdLoading, isError } = fetchProduct(ad_id);

    const handlePrint = useCallback(() => {
        setIsLoading(true);

        if (contentRef.current === null) {
            return;
        }

        const node = contentRef.current;

        const timeout = setTimeout(() => {
            toPng(node, {
                cacheBust: true,
                width: 1500,
                height: 1605,
                pixelRatio: 3,
                quality: 1.0,
                style: {
                    width: '500px',
                    height: '535px',
                    transform: 'scale(3)',
                    transformOrigin: 'top left',
                },
                fontEmbedCSS: '',
            })
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.download = `${ad?.data?.title}-BF.png`;
                    link.href = dataUrl;
                    link.click();
                    setIsLoading(false);
                })
                .catch((_) => {
                    notify('An error occured while trying to print', 'error');
                    setIsLoading(false);
                });
        }, 4000);

        return () => clearTimeout(timeout);
    }, [contentRef, ad?.data?.title, notify]);

    if (isAdLoading) {
        return (
            <div className='h-screen'>
                <SpinnerSkeleton />
            </div>
        );
    } else if (isError) {
        return <div className='h-screen'>Product not found</div>;
    }

    return (
        <section className='px-4 sm:px-8 py-8 bg-gray-200 min-h-screen flex items-center justify-center '>
            <div className='max-w-full max-sm:py-6  mx-auto overflow-x-auto'>
                <div
                    ref={contentRef}
                    className='relative flex flex-col bg-white border-b border-b-secondary rounded-tl-[50px] rounded-br-[50px] p-4'
                    style={{ width: '500px', height: '535px', fontFamily: 'Inter' }}
                >
                    {/* Logo - Compact */}
                    <div className='mb-2 absolute top-4 left-4'>
                        <img
                            src={BoonfuLogo}
                            className='w-16 h-16 object-cover'
                            alt='Boonfu Logo'
                        />
                    </div>

                    <div className='w-[350px] mx-auto flex flex-col gap-2 mt-8 '>
                        <div className='w-[300px] flex flex-col gap-2 mx-auto'>
                            {/* Title/Subcategory - Compact */}
                            <div className='flex flex-col items-center justify-center'>
                                <div className='bg-primary  rounded-lg p-2 w-full rotate-6  z-10'>
                                    <h3
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                        className='font-bold uppercase text-center text-xl leading-tight text-white truncate max-w-[300px]'
                                    >
                                        {['59', '62', '63'].some((prefix) =>
                                            String(ad.data.category).startsWith(prefix)
                                        )
                                            ? ad.data.category_name
                                            : ad.data.title}
                                    </h3>
                                </div>
                                <div className='bg-white border border-secondary rounded-lg p-2 w-full  rotate-6 mr-3 -mt-[2.2rem] z-1 '>
                                    <h3
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                        className='font-bold uppercase text-center text-xl leading-tight text-transparent max-w-[300px] truncate'
                                    >
                                        {['59', '62', '63'].some((prefix) =>
                                            String(ad.data.category).startsWith(prefix)
                                        )
                                            ? ad.data.category_name
                                            : ad.data.title}
                                    </h3>
                                </div>
                            </div>
                            {/* Condition/Type/Title - Prominent */}
                            <div className='flex flex-col items-center justify-center '>
                                <div className='bg-secondary  rounded-lg p-2 w-full -rotate-6  z-10'>
                                    <h3
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                        className='font-bold uppercase text-center text-xl leading-tight text-white max-w-[300px] truncate'
                                    >
                                        {['59', '62', '63'].some((prefix) =>
                                            String(ad.data.category).startsWith(prefix)
                                        )
                                            ? ad.data.title
                                            : ['50', '51'].some((prefix) =>
                                                    String(ad.data.category).startsWith(prefix)
                                                )
                                              ? ad.data.ad_condition
                                              : ad.data.type || ad.data.title}
                                    </h3>
                                </div>
                                <div className='bg-white border border-primary rounded-lg p-2 w-full -rotate-6 mr-3 -mt-[2.2rem] z-1 '>
                                    <h3
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                        className='font-bold uppercase text-center text-xl leading-tight text- max-w-[300px] truncate'
                                    >
                                        {['59', '62', '63'].some((prefix) =>
                                            String(ad.data.category).startsWith(prefix)
                                        )
                                            ? ad.data.title
                                            : ['50', '51'].some((prefix) =>
                                                    String(ad.data.category).startsWith(prefix)
                                                )
                                              ? ad.data.ad_condition
                                              : ad.data.type || ad.data.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Main Image - Takes most space */}
                            <div
                                className='bg-white flex items-center justify-center mt-4'
                                style={{ height: '200px' }}
                            >
                                <img
                                    src={ad.data.images[0].path}
                                    className='w-full h-full object-cover bg-transparent '
                                    alt={ad.data.title}
                                    crossOrigin='anonymous'
                                />
                            </div>
                        </div>

                        {/* Price - Prominent */}
                        <div className='flex flex-col items-center justify-center'>
                            <h3
                                style={{ fontFamily: 'Inter, sans-serif !important' }}
                                className='text-xl font-bold max-w-[300px] truncate'
                            >
                                ₦{toMoney(ad.data.price, false)}
                            </h3>
                        </div>

                        <div className='flex items-center w-full'>
                            <span className='w-2 h-2 rounded-full bg-black' />
                            <hr className='w-full  border-1 border-black' />
                            <span className='w-2 h-2 rounded-full bg-black' />
                        </div>

                        {/* Footer - Compact */}
                        <div className='flex flex-col'>
                            <p
                                style={{ fontFamily: 'Inter, sans-serif' }}
                                className='italic text-xs text-center'
                            >
                                Click the link below to learn more about this item
                            </p>
                            <div className='relative flex flex-col items-center justify-end mt-2'>
                                <ArrowDown2 className='w-12 h-12' />

                                <span
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                    className='absolute -right-10 text-xs'
                                >
                                    www.boonfu.com
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full mt-8 text-center'>
                    <Button
                        variant={'primary'}
                        onClick={handlePrint}
                        disabled={isLoading}
                        loading={isLoading}
                    >
                        Print
                    </Button>
                </div>

                <ScrollToTop />
            </div>
        </section>
    );
};

export default GrabFlyer;
