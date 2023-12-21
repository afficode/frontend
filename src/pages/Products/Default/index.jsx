import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Breadcrumb from "../../../components/Breadcrumb";
import { Approutes } from "../../../constants/routes";
import FeaturedProducts from "./FeaturedProducts";
import { useProduct, useCategories } from "../../../hooks/index";
import { ProductSkeleton } from "../../../components";
import { Sidebar } from "../../../ui";
import { manipulateCategory } from "../../../utils/dataManipulations";
import { VscMenu } from "react-icons/vsc";
import Drawer from "../../../ui/Drawer";
const items = [
  { name: "Home", link: Approutes.home },
  { name: "Products", link: Approutes.product.initial },
];

const Products = () => {
  const [categories, setCategories] = useState({});
  const result = useCategories();
  const [product, setProduct] = useState({ ads: [] });
  const [featured, setFeatured] = useState([]);
  const { isLoading, error, data } = useProduct();

  console.log(isLoading);
  useEffect(() => {
    // when product change, we update the featured product immediately
    if (data) {
      setProduct((prev) => ({ ...data }));
      if (data.ads.length > 15) {
        // TODO: Revisit this after discussing with Mr Lawal the criteria for the Featured.
        setFeatured((prev) => [...data.ads.slice(0, 8)]);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (result.data) {
      setCategories((prev) => manipulateCategory([...result.data]));
    }
    console.log(result.data);
  }, [result.isLoading]);

  return (
    <section className="min-h-[700px]">
      <h1 className="text-2xl py-2 font-bold tracking-wide">Explore</h1>
      <Breadcrumb items={items} />
      {/* <ProductSkeleton /> */}
      <div className="bg-primary ">
        <h1 className="text-3xl text-white font-bold pt-2 tracking-wide px-6">
          Featured Product
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:px-1 lg:p-4 p-2">
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
            {" "}
            {!result.isLoading && categories?.null && (
              <Drawer
                icon={<VscMenu className="text-primary text-xl" />}
                items={<Sidebar items={categories} />}
              />
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
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

          <div className="join mx-auto mt-4 bg-primary text-white">
            <button className="join-item btn bg-primary text-white border-gray-300 hover:bg-secondary hover:text-black hover:border-gray-300">
              1
            </button>
            <button className="join-item btn bg-primary text-white border-gray-300  hover:bg-secondary hover:text-black hover:border-gray-300">
              2
            </button>
            <button className="join-item btn bg-primary text-white border-gray-300  hover:bg-secondary hover:text-black hover:border-gray-300 btn-disabled">
              ...
            </button>
            <button className="join-item btn bg-primary text-white border-gray-300  hover:bg-secondary hover:text-black hover:border-gray-300">
              99
            </button>
            <button className="join-item btn bg-primary text-white border-gray-300  hover:bg-secondary hover:text-black hover:border-gray-300">
              100
            </button>
          </div>
        </main>
      </section>
    </section>
  );
};

export default Products;
