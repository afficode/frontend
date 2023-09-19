import React, { useEffect, useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Auth = () => {
  return (
    <div className="bg-white w-full ">
      <div className="bg-yellow ">
        <h1 className="text-center text-black  text-2xl py-[0.5rem] font-bold">
          Welcome to AFFI.ng
        </h1>
      </div>
      <div className="bg-white mt-[3.56rem] grid divide-black md:divide-x-2 md:grid-cols-2 ">
        <div className="w-full">
          <div className="w-[90%] mx-auto bg-[#d9d9d993] rounded-3xl border-solid border-4 border-blue">
            <h1 className="text-center text-black font-normal text-3xl pt-4 ">
              Register To:
            </h1>
            <ul className="p-[1.56rem]">
              <li className="text-black text-[1.2rem] font-sans pb-2">
                Own an online shop(s) for your businesses
              </li>
              <li className="text-black text-[1.2rem] font-sans pb-2">
                Post and manage your ads
              </li>
              <li className="text-black text-[1.2rem] font-sans pb-2">
                Become an Agent and earn well
              </li>
              <li className="text-black text-[1.2rem] font-sans pb-2">
                Have your customized shop link{" "}
              </li>
              <li className="text-black text-[1.2rem] font-sans pb-2">
                Never Miss a deal or offer
              </li>
              <li className="text-black text-[1.2rem] font-sans pb-2">
                Expressly compare products and make informed decisions
              </li>
            </ul>
          </div>
          <SignUpForm />
        </div>

        <div className="w-full ">
          <hr className=" border-b border-black border-1 mt-5 md:hidden" />
          <SignInForm />
        </div>
      </div>
    </div>
  );
};

export default Auth;
