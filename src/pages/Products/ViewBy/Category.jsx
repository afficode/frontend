import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductSkeleton } from "../../../components";
import { useProduct } from "../../../hooks/useProduct";
import { fetchCategorySummary } from "../../../hooks";
import { Approutes } from "../../../constants";
import FeaturedProducts from "../Default/FeaturedProducts";
import Breadcrumb from "../../../components/Breadcrumb";
import NotFound from "../NotFound";
import SideBar from "./FilterComponents/SideBar";
import { Drawer } from "../../../ui";
import { VscMenu } from "react-icons/vsc";
import { ScrollToTop } from "../../../utils";
import { useSearchParams } from "react-router-dom";

const Category = () => {
  const [query, setQuery] = useSearchParams();
  const { id } = useParams();
  const catId = atob(id);
  const [categoryId, setCategoryId] = useState(catId);
  const [displayCategories, setDisplayCategories] = useState();
  const [items, setItems] = useState(null);
  const [searchParams, setSearchParams] = useState({
    category: categoryId,
    q: query.get("q") || "",
  });
  const { data, isLoading, error } = useProduct({
    ...searchParams,
    q: query.get("q") || "",
  });
  const { data: categories, isLoading: categoryIsLoading } =
    fetchCategorySummary(categoryId);
  useEffect(() => {
    if (categories) {
      let name = "";
      const categoriesData = categories?.summary.filter((cat) =>
        cat.category.toString().startsWith(catId.toString().substring(0, 2))
      );
      categoriesData.forEach((cat) => {
        if (cat.category == categoryId) {
          name = cat.name;
        }
      });
      setItems(() => [
        { name: "Home", link: Approutes.home },
        { name: "Products", link: Approutes.product.initial },
        { name: "Categories", link: Approutes.product.category },
        { name: name },
      ]);
      setSearchParams({ category: categoryId, q: query.get("q") || "" });

      setDisplayCategories(() => [...categoriesData]);
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
        <div className="w-full md:hidden">
          <Drawer
            icon={<VscMenu className="text-primary text-xl" />}
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
          {!isLoading && (
            <Breadcrumb
              items={items}
              className={"text-md breadcrumbs text-primary"}
            />
          )}
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
            <>
              {data?.ads?.length > 0 && (
                <FeaturedProducts product={data?.ads} />
              )}
            </>
          )}
        </div>

        <div className="flex items-center justify-center">
          {isLoading ||
            (data && data?.ads.length > 0 && (
              <div className="join mx-auto mt-4 bg-primary text-white">
                <button
                  onClick={() => {
                    setSearchParams((prev) => ({
                      ...prev,
                      page: data?.prev,
                      q: query.get("q") || "",
                    }));
                    // window.location.reload();
                  }}
                  // to={`${Approutes.product.initial}?page=${product?.prev}`}
                  className={`${
                    data?.prev === null ? "hidden" : ""
                  } join-item btn bg-primary text-white border-gray-300 hover:bg-secondary hover:text-black hover:border-gray-300`}
                  disabled={data?.prev === null}
                >
                  Prev
                </button>
                <button
                  // to={`${Approutes.product.initial}?page=${product?.next}`}
                  onClick={() => {
                    setSearchParams((prev) => ({
                      ...prev,
                      page: data?.next,
                      q: query.get("q") || "",
                    }));
                    // window.location.reload();
                  }}
                  className={`${
                    data?.next === null ? "hidden" : ""
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
