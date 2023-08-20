import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backendLink } from "../../utils/basicInfo";
import { decodeProductId } from "../../utils";
import { ProductContext } from "../../context/ProductProvider";
// add views
import Vehicle from "./View/Vehicle";
import Service from "./View/Service";
import Property from "./View/Property";
import ForSale from "./View/ForSale";
// view skeleton
import ViewSkeleton from "../Skeletons/ViewSkeleton";

const ViewProduct = () => {
  const [product, setProduct] = useState();
  let { productDetailId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  ////console.log(decodeProductId(productDetailId));
  useEffect(() => {
    //effect;
    let source = axios.CancelToken.source();
    let config = { cancelToken: source.token };
    setIsLoading(true);
    const fetchData = async () => {
      await axios
        .get(
          backendLink + "/api/getProduct/" + decodeProductId(productDetailId),
          config
        )
        .then((res) => {
          setIsLoading(false);
          setProduct(res.data);
          //console.log(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
          //console.log(err);
          //setError(err.data.message);
        });
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <ViewSkeleton />;
  } else if (!product) {
    return (
      <div className="w-full flex items-center justify-center mx-auto p-4">
        {/* <img
          src={NotAvailable}
          alt="Product Not Aviailable"
          className="rounded-md shadow-md "
        /> */}
      </div>
    );
  } else {
    return (
      <div className="w-full">
        {product.category === 1 && <Vehicle data={product} />}
        {product.category === 2 && <Property data={product} />}
        {product.category === 3 && <Service data={product} />}
        {product.category === 4 && <ForSale data={product} />}
      </div>
    );
  }
};

export default ViewProduct;
