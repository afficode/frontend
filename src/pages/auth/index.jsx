import React, { useEffect, useState } from "react";
import DesktopView from "./DesktopView";
import MobileView from "./MobileView";

const Auth = () => {
  return (
    <section className=" w-full m-auto py-4 xl:p-2 ">
      <div className="bg-secondary ">
        <h1 className="text-center text-black  text-2xl py-[0.5rem] font-bold">
          Welcome to AFFI.ng
        </h1>
      </div>
      <section className="hidden lg:flex">
        <DesktopView />
      </section>
      <section className=" md:flex flex lg:hidden ">
        <MobileView />
      </section>
    </section>
  );
};

export default Auth;
