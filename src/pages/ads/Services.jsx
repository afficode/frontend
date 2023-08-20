import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Below from "../../components/Universal/Below";
import ShopAdvert from "../../components/Universal/ShopAdvert";
import Service from "../../components/Ads/Service";
import { NavbarContext } from "../../context/NavbarProvider";
import { getUser } from "../../utils";

const Services = () => {
  const { resetAllDiv } = useContext(NavbarContext);
  const user = getUser();
  if (user === null) {
    return <Navigate to={"/auth"} />;
  }
  return (
    <div className="flex flex-col w-full font-barlow">
      <div className="z-40 fixed top-0 w-100">
        <Navbar />
      </div>
      <div className="z-10  mt-[100px] relative">
        <ShopAdvert />
      </div>
      <div
        className="z-10"
        onMouseEnter={() => resetAllDiv()}
        onClick={() => resetAllDiv()}
      >
        <Service />
      </div>
      {/* footer */}
      <div className="z-10">
        <Below />
      </div>
    </div>
  );
};

export default Services;
