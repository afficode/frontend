import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ProductSkeleton } from '../../../components';
import { useProduct } from '../../../hooks/useProduct';
import { fetchCategorySummary } from '../../../hooks';
import { Approutes, queryStrings } from '../../../constants';
import FeaturedProducts from '../Default/FeaturedProducts';
import Breadcrumb from '../../../components/Breadcrumb';
import NotFound from '../NotFound';
import SideBar from './FilterComponents/SideBar';
import { Drawer } from '../../../ui';
import { VscMenu } from 'react-icons/vsc';
import { getPreviousSearchParams, getSearchParamsObject, ScrollToTop } from '../../../utils';
import { useSearchParams } from 'react-router-dom';

const Category = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	// console.log('searchParams', getSearchParamsObject(searchParams));
	const { id } = useParams();
	// console.log(id);
	const catId = atob(id);
	// console.log(catId);
	const [categoryId, setCategoryId] = useState(catId);
	const [displayCategories, setDisplayCategories] = useState();
	const [items, setItems] = useState(null);

	const { sub, ...params } = getSearchParamsObject(searchParams);

	const location = useLocation();

	useEffect(() => {
		setCategoryId(catId);
	}, [location.pathname]);

	const { data, isLoading, error } = useProduct({
		...params,
	});
	const { data: categories, isLoading: categoryIsLoading } = fetchCategorySummary(categoryId);
	console.log(categories, 'categories');

	useEffect(() => {
		if (categories) {
			let name = '';
			// const categoriesData = categories?.summary.filter((cat) =>
			// 	cat.category.toString().startsWith(catId.toString().substring(0, 2))
			// );
			categories?.summary.forEach((cat) => {
				if (cat.category == categoryId) {
					name = cat.name;
				}
			});
			setItems(() => [
				{ name: 'Home', link: Approutes.home },
				{ name: 'Products', link: Approutes.product.initial },
				{ name: 'Categories', link: Approutes.product.category },
				{ name: name },
			]);

			setDisplayCategories(() => [...categories?.summary]);
		}
	}, [categoryIsLoading, categoryId]);

	return (
		<section className="flex gap-x-2">
			<div className="p-2 hidden md:block w-[30%] lg:w-[25%] ">
				<SideBar
					displayCategories={displayCategories}
					setCategoryId={setCategoryId}
					setSearchParams={setSearchParams}
					categoryId={categoryId}
				/>
			</div>
			<main className="p-2 w-full md:w-[70%] lg:w-[75%]">
				<div className="w-full md:hidden ">
					<Drawer
						icon={<VscMenu className="text-primary text-xl " />}
						items={
							<SideBar
								displayCategories={displayCategories}
								setCategoryId={setCategoryId}
								setSearchParams={setSearchParams}
								categoryId={categoryId}
							/>
						}
					/>
				</div>
				<div className="w-full my-4">
					{!isLoading && <Breadcrumb items={items} className={'text-md breadcrumbs text-primary'} />}
				</div>
				{((!isLoading && data?.ads?.length === 0) || error) && (
					<>
						<NotFound />
					</>
				)}
				<div className="flex flex-wrap items-center justify-evenly gap-2 gap-y-4 ">
					{isLoading ? (
						<>
							{Array(8)
								.fill(1)
								.map((_, index) => (
									<ProductSkeleton key={index} />
								))}
						</>
					) : (
						<>{data?.ads?.length > 0 && <FeaturedProducts product={data?.ads} />}</>
					)}
				</div>

				<div className="flex items-center justify-center">
					{isLoading ||
						(data && data?.ads.length > 0 && (
							<div className="join mx-auto mt-4 bg-primary text-white">
								<button
									onClick={() => {
										let previousParams = getPreviousSearchParams(searchParams);

										previousParams = {
											...previousParams,
											[queryStrings.page]: data?.prev,
										};

										setSearchParams(previousParams, { replace: true });
									}}
									className={`${
										data?.prev === null ? 'hidden' : ''
									} join-item btn bg-primary text-white border-gray-300 hover:bg-secondary hover:text-black hover:border-gray-300`}
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
									className={`${
										data?.next === null ? 'hidden' : ''
									} join-item btn bg-primary text-white border-gray-300 hover:bg-secondary hover:text-black hover:border-gray-300`}
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
