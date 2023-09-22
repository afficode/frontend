import React from "react";
import { Affi } from "../../assets/images";
import InputGroup from "../../components/InputGroup";
import Buttons from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import ReverifyEmail from "./ReverifyEmail";

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <div className="flex items-center flex-col md:w-[80%] w-[95%] mx-auto py-[60px] bg-white">
        <img src={Affi} alt="affi logo" className="w-[7rem] h-[7rem]" />
        <h1 className="text-center text-black font-700 font-normal text-2xl pt-6">
          RESET YOUR PASSWORD
        </h1>
        <div className="md:w-[80%] w-[95%] ">
          <p className="py-3 text-center text-black text-[0.9rem] ">
            You can request a password reset by entering your email below. We
            will send a security code to the email address, please make sure it
            is the correct email you signed up with.
          </p>

          <ReverifyEmail endpoint="reset_user" />
        </div>
        <div className="mt-[70px]">
          <p className="py-3 text-center text-black text-[0.9rem]">
            To further assist, you may visit the Help Center or contact our
            customer service team.
          </p>
          <div className="flex justify-center">
            <img src={Affi} alt="affi logo" className="w-[3rem] h-[3rem]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
