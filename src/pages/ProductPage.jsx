import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import ShopAdvert from "../components/Universal/ShopAdvert";
import Setup from "../components/Home/Setup";
import Products from "../components/Product/Products";
import Below from "../components/Universal/Below";
import { NavbarContext } from "../context/NavbarProvider";
import { UserContext } from "../context/UserContextProvider";

const ProductsPage = () => {
  const { resetAllDiv } = useContext(NavbarContext);

  return (
    <div className="flex flex-col w-full font-barlow">
      <div className="z-40 fixed top-0 w-100">
        <Navbar />
      </div>
      <div className="z-10 mt-[107px] relative">
        <ShopAdvert />
      </div>
      <div
        onMouseEnter={() => resetAllDiv()}
        onClick={() => resetAllDiv()}
        className="z-10"
      >
        <Products />
      </div>
      {/* footer */}
      <div className="z-10">
        <Below />
      </div>
    </div>
  );
};

export default ProductsPage;
