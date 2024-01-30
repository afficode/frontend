import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Breadcrumb from '../../../components/Breadcrumb';
import { Approutes } from '../../../constants/routes';
import FeaturedProducts from './FeaturedProducts';
import { useProduct, useCategories } from '../../../hooks/index';
import { ProductSkeleton } from '../../../components';
import { Sidebar } from '../../../ui';
import { manipulateCategory } from '../../../utils/dataManipulations';
import { VscMenu } from 'react-icons/vsc';
import Drawer from '../../../ui/Drawer';

import { useSearchParams } from 'react-router-dom';
import { ScrollToTop } from '../../../utils';
const items = [
	{ name: 'Home', link: Approutes.home },
	{ name: 'Products', link: Approutes.product.initial },
];

const Products = () => {
	let [searchParams, setSearchParams] = useSearchParams();
	const [categories, setCategories] = useState({});
	const result = useCategories();
	const [product, setProduct] = useState({ ads: [] });
	const [featured, setFeatured] = useState([]);
	const { isLoading, error, data } = useProduct({
		page: searchParams.get('page'),
	});

	useEffect(() => {
		// when product change, we update the featured product immediately
		if (data) {
			console.log(data);
			setProduct((prev) => ({ ...data }));
			if (data.ads.length > 0) {
				// TODO: Revisit this after discussing with Mr Lawal the criteria for the Featured.
				setFeatured((prev) => [...data.ads.slice(0, 8)]);
			}
		}
	}, [isLoading]);

	useEffect(() => {
		if (result.data) {
			setCategories((prev) => manipulateCategory([...result.data]));
		}
		//console.log(result.data);
	}, [result.isLoading]);

	return (
		<section className="min-h-[700px]">
			<h1 className="text-2xl py-2 font-bold tracking-wide">Explore</h1>
			<Breadcrumb items={items} />
			{/* <ProductSkeleton /> */}
			<div className="bg-primary ">
				<h1 className="text-3xl text-white font-bold pt-2 tracking-wide px-6">Featured Product</h1>
				<div className="flex flex-wrap items-center justify-evenly gap-2 gap-y-4 sm:px-1 lg:p-4 p-2">
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
			<section className="w-full p-2 pr-2 flex">
				<aside className="w-[25%] hidden md:flex">
					{!result.isLoading && categories?.null ? (
						<Sidebar items={categories} />
					) : (
						<div className="w-full mt-2">
							<Skeleton height={500} />
						</div>
					)}
				</aside>

				<main className="w-full md:w-[70%] sm:px-1 lg:p-4 m-2 flex flex-col space-y-2 ">
					<div className="w-full md:hidden">
						{' '}
						{!result.isLoading && categories?.null && (
							<Drawer
								icon={<VscMenu className="text-primary text-xl" />}
								items={<Sidebar items={categories} />}
							/>
						)}
					</div>
					<div className="flex flex-wrap items-center justify-evenly gap-2 gap-y-4">
						{isLoading || (product && product?.ads.length === 0) ? (
							<>
								{Array(8)
									.fill(1)
									.map((_, index) => (
										<ProductSkeleton key={index} />
									))}
							</>
						) : (
							<FeaturedProducts product={product?.ads.slice(8)} />
						)}
					</div>

					{/* <div className="join mx-auto mt-4 bg-primary text-white"> */}
					{isLoading ||
						(product && product?.ads.length > 0 && (
							<div className="join mx-auto mt-4 bg-primary text-white">
								<button
									onClick={() => {
										setSearchParams({ page: product?.prev });
										window.location.reload();
									}}
									// to={`${Approutes.product.initial}?page=${product?.prev}`}
									className="join-item btn bg-primary text-white border-gray-300 hover:bg-secondary hover:text-black hover:border-gray-300"
									disabled={product?.prev === null}
								>
									Prev
								</button>
								<button
									// to={`${Approutes.product.initial}?page=${product?.next}`}
									onClick={() => {
										setSearchParams({ page: product?.next });
										window.location.reload();
									}}
									className="join-item btn bg-primary text-white border-gray-300 hover:bg-secondary hover:text-black hover:border-gray-300"
									disabled={product?.next === null}
								>
									Next
								</button>
							</div>
						))}
					{/* </div> */}
				</main>
			</section>

			<ScrollToTop />
		</section>
	);
};

export default Products;
