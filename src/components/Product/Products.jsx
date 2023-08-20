import React, { useEffect, useReducer, useState } from "react";
import Product from "./Product";
import { Pagination } from "flowbite-react";
import ProductSkeleton from "../Skeletons/ProductSkeleton";
//import { products } from "../../data";
import axios from "axios";
import { backendLink } from "../../utils/basicInfo";

const Products = () => {
  const initState = {
    loading: true,
    error: false,
    products: [],
    limit: 10,
    offset: 0,
    currentPage: 1,
    totalPages: 10,
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_PRODUCT":
        return {
          loading: false,
          error: false,
          products: [...action.payload],
          limit: 10,
          offset: 0,
          currentPage: 1,
          totalPages: 10,
        };
      case "FETCH_ERROR":
        return {
          loading: false,
          error: true,
          errotText: "Error fetching product. Try reloading the page",
          products: [],
          limit: 0,
          offset: 0,
        };
      default:
        return {
          loading: false,
          error: false,
          products: [],
          limit: 0,
          offset: 0,
        };
    }
  };
  const [state, dispatch] = useReducer(reducer, initState);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  //console.log("products", state.products);
  useEffect(() => {
    let source = axios.CancelToken.source();
    let config = { cancelToken: source.token };

    axios
      .get(`${backendLink}/api/products`, config)
      .then((res) => {
        dispatch({ type: "FETCH_PRODUCT", payload: res.data });
        ////console.log("response", res);
      })
      .catch((err) => {
        dispatch({ type: "FETCH_PRODUCT_ERROR" });
        //console.log(err);
        //setError(err.data.message);
      });
  }, []);

  return (
    <>
      <div className="w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-2 xl:gap-4 bg-gray-50 p-3">
        {state.loading ? (
          new Array(12).fill(0).map((_, i) => (
            <div key={i}>
              {" "}
              <ProductSkeleton />
            </div>
          ))
        ) : (
          <>
            {state.products.map((product) => (
              <Product data={product} />
            ))}
          </>
        )}
      </div>
      {!state.loading && (
        <div
          id="pagination"
          className="my-3 w-full flex items-center justify-center"
        >
          <div className="mx-auto">
            <Pagination
              currentPage={state.currentPage}
              layout="pagination"
              onPageChange={state.currentPage}
              totalPages={state.totalPages}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
