import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import ShopAdvert from "../components/Universal/ShopAdvert";
import Setup from "../components/Home/Setup";
import RowContainer from "../components/Home/RowContainer";
import RequestDeal from "../components/Home/RequestDeal";
import Below from "../components/Universal/Below";
import { NavbarContext } from "../context/NavbarProvider";
import { UserContext } from "../context/UserContextProvider";

const Home = () => {
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
        <Setup />
      </div>
      {/* shops */}
      <div
        className="z-10"
        onMouseEnter={() => resetAllDiv()}
        onClick={() => resetAllDiv()}
      >
        <RowContainer
          title={"Shops"}
          linkText={"Visit Shops"}
          linkAddress={"/shops"}
          buttonText={"Visit Shop"}
        />
      </div>
      {/* featured product */}
      <div
        className="z-10"
        onMouseEnter={() => resetAllDiv()}
        onClick={() => resetAllDiv()}
      >
        <RowContainer
          title={"Featured Products"}
          linkText={"See All"}
          linkAddress={"/products"}
          buttonText={"View Product"}
        />
      </div>
      {/* see request and check out deals */}
      <div
        className="z-10"
        onMouseEnter={() => resetAllDiv()}
        onClick={() => resetAllDiv()}
      >
        <RequestDeal />
      </div>
      {/* footer */}
      <div className="z-10">
        <Below />
      </div>
    </div>
  );
};

export default Home;
