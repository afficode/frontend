import { createContext, useState } from "react";
import { getProduct } from "../utils";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  //  done -- organized the product default parameter from localStorage
  // ! Don't use cameCasing in saving data to localStorage
  const [product, setProduct] = useState(getProduct());

  const updateProduct = (product) => {
    localStorage.setItem("producttograb", JSON.stringify(product));
    setProduct((prev) => ({ ...product }));
  };

  return (
    <ProductContext.Provider value={{ product, setProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
