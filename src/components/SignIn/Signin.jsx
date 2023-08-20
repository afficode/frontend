import React from "react";
import Login from "./Desktop/Login";
import Register from "./Desktop/Register";
import MobileAuth from "./Mobile/MobileAuth";

const Signin = () => {
  return (
    <section className=" w-full xl:w-[80%] m-auto p-4 xl:p-2 ">
      <section className="hidden md:grid md:grid-cols-2 md:divide-gray-200 xl:divide-x-4 md:divide-x-0">
        <Register />
        <Login />
      </section>
      <section className=" sm:flex flex md:hidden ">
        <MobileAuth />
      </section>
    </section>
  );
};

export default Signin;
