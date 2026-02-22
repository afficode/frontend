import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ProductSkeleton } from '../../../components';
import { useProduct } from '../../../hooks/useProduct';
import { fetchCategorySummary } from '../../../hooks';
import {
    Approutes,
    COMPANY_NAME,
    frontendLink,
    queryStrings,
    WELCOME_BOONFU_IMAGE,
} from '../../../constants';
import FeaturedProducts from '../Default/FeaturedProducts';
import Breadcrumb from '../../../components/Breadcrumb';
import NotFound from '../NotFound';
import SideBar from './FilterComponents/SideBar';
import { Drawer } from '../../../ui';
import { VscMenu } from 'react-icons/vsc';
import {
    getCategoryId,
    getPreviousSearchParams,
    getSearchParamsObject,
    ScrollToTop,
} from '../../../utils';
import { useSearchParams } from 'react-router-dom';
import SEO from '../../../components/SEO';
import { categoriesAndSubCategories } from '../../../constants/Category';

const Category = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { id } = useParams();

    const mainCategoryId = useMemo(() => getCategoryId(id), [id]);

    const [displayCategories, setDisplayCategories] = useState();
    const [items, setItems] = useState(null);

    const allParams = getSearchParamsObject(searchParams);
    const {
        [queryStrings.subCategory]: sub,
        [queryStrings.page]: page,
        ...filterParams
    } = allParams;

    const currentCategoryId = sub || mainCategoryId;

    const apiParams = {
        category: currentCategoryId,
        ...(page && { [queryStrings.page]: page }),
        ...filterParams,
    };

    const { data, isLoading, error } = useProduct(apiParams);
    const { data: categories, isLoading: categoryIsLoading } = fetchCategorySummary(mainCategoryId);

    useEffect(() => {
        if (categories) {
            let name = '';

            categories?.summary.forEach((cat) => {
                if (cat.category === currentCategoryId) {
                    name = cat.name;
                }
            });
            setItems(() => [
                { name: 'Home', link: Approutes.home },
                { name: 'Products', link: Approutes.product.initial },
                { name: 'Categories', link: Approutes.product.category },
                { name },
            ]);

            setDisplayCategories(() => [...categories?.summary]);
        }
    }, [categoryIsLoading, currentCategoryId, categories]);

    return (
        <section className='flex gap-x-2'>
            <div className='p-2 hidden md:block w-[30%] lg:w-[25%] '>
                <SideBar
                    displayCategories={displayCategories}
                    currentCategoryId={Number(currentCategoryId)}
                />
            </div>
            <main className='p-2 w-full md:w-[70%] lg:w-[75%]'>
                <div className='w-full md:hidden '>
                    <Drawer
                        icon={<VscMenu className='text-primary text-xl ' />}
                        items={
                            <SideBar
                                displayCategories={displayCategories}
                                currentCategoryId={Number(currentCategoryId)}
                            />
                        }
                    />
                </div>
                <div className='w-full my-4'>
                    {!isLoading && (
                        <Breadcrumb items={items} className={'text-md breadcrumbs text-primary'} />
                    )}
                </div>
                {((!isLoading && data?.ads?.length === 0) || error) && (
                    <>
                        <NotFound />
                    </>
                )}
                <div className='flex flex-wrap items-center justify-evenly gap-2 gap-y-4 '>
                    {isLoading ? (
                        <>
                            {Array(8)
                                .fill(1)
                                .map((_, index) => (
                                    <ProductSkeleton key={index} />
                                ))}
                        </>
                    ) : (
                        <>
                            {data?.ads?.length > 0 && (
                                <>
                                    <FeaturedProducts product={data?.ads} />
                                    <SEO
                                        title={`${categoriesAndSubCategories.find((category) => category.id === getCategoryId(id))?.name} available in Nigeria - ${COMPANY_NAME}`}
                                        description={`Explore a wide range of ${categoriesAndSubCategories.find((category) => category.id === getCategoryId(id))?.name} available in Nigeria | ${COMPANY_NAME}. Find the best deals on ${categoriesAndSubCategories.find((category) => category.id === getCategoryId(id))?.name} and make your purchase today!`}
                                        image={WELCOME_BOONFU_IMAGE}
                                        url={`${frontendLink.slice(-1) === '/' ? frontendLink.slice(0, -1) : frontendLink}${Approutes.product.category}/${id}`}
                                    />
                                </>
                            )}
                        </>
                    )}
                </div>

                <div className='flex items-center justify-center'>
                    {isLoading ||
                        (data && data?.ads.length > 0 && (
                            <div className='join mx-auto mt-4 bg-primary text-white'>
                                <button
                                    onClick={() => {
                                        let previousParams = getPreviousSearchParams(searchParams);

                                        previousParams = {
                                            ...previousParams,
                                            [queryStrings.page]: data?.prev,
                                        };

                                        setSearchParams(previousParams, { replace: true });
                                    }}
                                    className={`${data?.prev === null ? 'hidden' : ''} join-item btn bg-primary text-white border-gray-300 hover:bg-secondary hover:text-black hover:border-gray-300`}
                                    disabled={data?.prev === null}
                                >
                                    Prev
                                </button>
                                <button
                                    onClick={() => {
                                        let previousParams = getPreviousSearchParams(searchParams);

                                        previousParams = {
                                            ...previousParams,
                                            [queryStrings.page]: data?.next,
                                        };

                                        setSearchParams(previousParams, { replace: true });
                                    }}
                                    className={`${data?.next === null ? 'hidden' : ''} join-item btn bg-primary text-white border-gray-300 hover:bg-secondary hover:text-black hover:border-gray-300`}
                                    disabled={data?.next === null}
                                >
                                    Next
                                </button>
                            </div>
                        ))}
                </div>
            </main>
            <ScrollToTop />
        </section>
    );
};

export default Category;
