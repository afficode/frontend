import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ShopAdvert from "../../components/Universal/ShopAdvert";
import Below from "../../components/Universal/Below";
import { NavbarContext } from "../../context/NavbarProvider";
import DashboardIndex from "../../components/Dashboard/DashboardIndex";
import { getUser } from "../../utils";

const Dashboard = () => {
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
      <div className="z-10 mt-[105px] relative">
        <ShopAdvert />
      </div>
      <div
        onMouseEnter={() => resetAllDiv()}
        onClick={() => resetAllDiv()}
        className="z-10"
      >
        <DashboardIndex />
      </div>
      {/* footer */}
      <div className="z-10">
        <Below />
      </div>
    </div>
  );
};

export default Dashboard;
