import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Breadcrumb from '../../../components/Breadcrumb';
import { Approutes, frontendBaseUrl } from '../../../constants/routes';
import FeaturedProducts from './FeaturedProducts';
import { useProduct, useCategories } from '../../../hooks/index';
import { ProductSkeleton, SEO } from '../../../components';
import { Sidebar } from '../../../ui';
import { manipulateCategory } from '../../../utils/dataManipulations';
import { VscMenu } from 'react-icons/vsc';
import Drawer from '../../../ui/Drawer';
import { getSaves } from '../../../hooks/useSaves';
import NotFound from '../NotFound';
import { useSearchParams } from 'react-router-dom';
import { ScrollToTop } from '../../../utils';
import useAuth from '../../../context/UserContext';
import useSaveContext from '../../../context/SaveContext';
import { categoryData } from '../../../constants/Category';
const items = [
    { name: 'Home', link: Approutes.home },
    { name: 'Products', link: Approutes.product.initial },
];

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [categories, setCategories] = useState({});
    const result = useCategories();

    const { isLogin } = useAuth();
    const { setSaves, setSavesId } = useSaveContext([]);

    const { isLoading, data: product } = useProduct({
        page: searchParams.get('page'),
        q: searchParams.get('q') || null,
        state_id: searchParams.get('state_id') || null,
    });
    const { data: savedAds, isLoading: saveLoading } = getSaves();

    const featured = product?.ads?.slice(0, 8) || [];

    useEffect(() => {
        if (isLogin && savedAds?.saves?.length >= 0) {
            setSaves(() => savedAds?.saves);
            const savedIds = savedAds?.saves.map((save) => save.ads_id);
            setSavesId(() => savedIds);
        }
    }, [isLogin, saveLoading, savedAds, setSaves]);

    useEffect(() => {
        if (result.data) {
            setCategories(() => manipulateCategory([...result.data]));
        }
    }, [result.isLoading]);

    return (
        <section className='min-h-[700px]'>
            <h1 className='text-2xl py-2 font-bold tracking-wide ml-2'>Explore</h1>
            <Breadcrumb items={items} />
            {product && product?.ads !== 0 && (
                <div className='bg-primary '>
                    <h1 className='text-3xl text-white font-bold pt-2 tracking-wide px-6'>
                        Featured Product
                    </h1>
                    <div className='flex flex-wrap items-center justify-evenly gap-2 gap-y-4 sm:px-1 lg:p-4 p-2'>
                        {isLoading ? (
                            <>
                                {Array(8)
                                    .fill(1)
                                    .map((_, index) => (
                                        <ProductSkeleton key={index} />
                                    ))}
                            </>
                        ) : (
                            <FeaturedProducts product={featured} />
                        )}
                    </div>
                </div>
            )}

            <section className='w-full p-2 pr-2 flex'>
                <aside className='w-[25%] hidden md:flex'>
                    {!result.isLoading && categories?.null ? (
                        <Sidebar items={categories} />
                    ) : (
                        <div className='w-full mt-2'>
                            <Skeleton height={500} />
                        </div>
                    )}
                </aside>

                <main className='w-full md:w-[70%] sm:px-1 lg:p-4 m-2 flex flex-col space-y-2 '>
                    <div className='w-full md:hidden'>
                        {' '}
                        {!result.isLoading && categories?.null && (
                            <Drawer
                                icon={<VscMenu className='text-primary text-xl' />}
                                items={<Sidebar items={categories} />}
                            />
                        )}
                    </div>
                    <div className='flex flex-wrap items-center justify-evenly gap-2 gap-y-4'>
                        {isLoading ? (
                            <>
                                {Array(8)
                                    .fill(1)
                                    .map((_, index) => (
                                        <ProductSkeleton key={index} />
                                    ))}
                            </>
                        ) : !isLoading && (!product || product?.ads?.length === 0) ? (
                            <NotFound
                                title={'Not Found'}
                                description={'No product matches your search in our DB.'}
                            />
                        ) : (
                            <>
                                <FeaturedProducts product={product?.ads.slice(8)} />
                                <SEO
                                    title='Products'
                                    description='Explore a wide range of products across various categories on our marketplace. Find the best deals and offers on cars, real-estate, electronics, fashion, home goods, and more. Start shopping now!'
                                    url={`${frontendBaseUrl}${Approutes.product.initial}`}
                                    keywords={[...categoryData.map((category) => category.name)]}
                                />
                            </>
                        )}
                    </div>

                    {isLoading ||
                        (product && product?.ads.length > 0 && (
                            <div className='join mx-auto mt-4 bg-primary text-white'>
                                <button
                                    onClick={() => {
                                        setSearchParams({
                                            page: product?.prev,
                                            q:
                                                searchParams.get('q') === null
                                                    ? ''
                                                    : searchParams.get('q'),
                                        });
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className='join-item btn bg-primary text-white border-gray-300 hover:bg-secondary hover:text-black hover:border-gray-300'
                                    disabled={product?.prev === null}
                                >
                                    Prev
                                </button>
                                <button
                                    onClick={() => {
                                        setSearchParams({
                                            page: product?.next,
                                            q:
                                                searchParams.get('q') === null
                                                    ? ''
                                                    : searchParams.get('q'),
                                        });
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className='join-item btn bg-primary text-white border-gray-300 hover:bg-secondary hover:text-black hover:border-gray-300'
                                    disabled={product?.next === null}
                                >
                                    Next
                                </button>
                            </div>
                        ))}
                </main>
            </section>

            <ScrollToTop />
        </section>
    );
};

export default Products;
