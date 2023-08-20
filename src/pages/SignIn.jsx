import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import ShopAdvert from "../components/Universal/ShopAdvert";
import Signin from "../components/SignIn/Signin";
import Below from "../components/Universal/Below";
import { NavbarContext } from "../context/NavbarProvider";
import { getUser } from "../utils";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { resetAllDiv } = useContext(NavbarContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    if (user !== null) {
      navigate("/dashboard");
    }
    return () => {
      //cleanup
    };
  }, []);

  return (
    <div className="flex flex-col w-full font-barlow">
      <div className="z-40 fixed top-0 w-100">
        <Navbar />
      </div>
      {/* signin  */}
      <div className="z-10 mt-[102px] relative">
        <ShopAdvert />
      </div>
      <div
        className="bg-yellow-300 my-4 z-10 w-full"
        onMouseEnter={() => resetAllDiv()}
        onClick={() => resetAllDiv()}
      >
        <h1 className="text-4xl lg:text-5xl text-center drop-shadow-xl font-bold md:tracking-widest shadow-gray-500 p-5">
          Welcome to Isowo.ng
        </h1>
      </div>
      <div
        className="z-10"
        onMouseEnter={() => resetAllDiv()}
        onClick={() => resetAllDiv()}
      >
        <Signin />
      </div>
      {/* footer */}
      <div className="z-10">
        <Below />
      </div>
    </div>
  );
};

export default SignIn;
