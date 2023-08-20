import React, { useContext, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ShopAdvert from "../../components/Universal/ShopAdvert";
import Setup from "../../components/Home/Setup";
import Below from "../../components/Universal/Below";
import { NavbarContext } from "../../context/NavbarProvider";
import ViewProduct from "../../components/Product/ViewProduct";
const ViewProducts = () => {
  const { resetAllDiv } = useContext(NavbarContext);

  return (
    <div className="flex flex-col w-full font-barlow">
      <div className="z-40 fixed top-0 w-100">
        <Navbar />
      </div>
      <div className="z-10 mt-[107px] relative">
        <ShopAdvert />
      </div>
      {/* View Products */}
      <div
        className="z-10"
        onMouseEnter={() => resetAllDiv()}
        onClick={() => resetAllDiv()}
      >
        <ViewProduct />
      </div>
      {/* footer */}
      <div className="z-10">
        <Below />
      </div>
    </div>
  );
};

export default ViewProducts;
