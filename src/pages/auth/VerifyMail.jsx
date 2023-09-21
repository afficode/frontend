import React, { useEffect, useState } from "react";
import Buttons from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import { backendLink } from '../../constants'
import Modal from "../../components/Modal";
import axios from "axios";
import ReverifyEmail from "./ReverifyEmail";
import { notifySuccess, notifyError } from "../../ui/ErrorToast";

const VerifyMail = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false)
  const notifyErr = (message) => notifyError(message)
  const notifySuc = (message) => notifySuccess(message);
  const verifyEmail = async () => {
    const searchParams = location.search;
    const token = searchParams.split("?token=")[1];
    if (token) {
      try {
        const response = await axios.get(`${backendLink}auth/verify_account`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          notifySuc(response?.data?.message);
          setTimeout(() => {
            navigate("/auth");
          }, 1000);
        }
      } catch (error) {
        if(error?.response?.status === 401) {
          notifyErr("Error verifying your account. The token is either broken or expired. Pleae try resending a verification email");
        } else {
          notifyError(error.response?.data.message);
        }
        
      }
    }
  };
  useEffect(() => {
    verifyEmail();
  }, [location.search]);
  return (
    <div className="bg-white w-full  ">
      <div className="w-full  flex items-center justify-center  ">
        <div className="md:w-[50%] w-[90%] my-[5rem] ">
          <h1 className="text-center text-black text-[1.5rem] font-[500]">
            Verify your email address
          </h1>
          <p className=" text-black text-[1.2rem] font-normal mt-6 text-center">
            To start using AFFI, confirm your email address <b>and</b> phone
            number with OTP sent respectively, to:
          </p>
          <div className="flex items-center justify-center">
            <div>
              <p className=" text-black text-[1.2rem] font-normal mt-4">
                e-mail:{" "}
                <span className="font-bold">sijuadelawal@gmail.com</span>
              </p>
              <p className=" text-black text-[1.2rem] font-normal ">
                Phone Number:{" "}
                <span className="font-bold">+234890088949048</span>
              </p>
            </div>
          </div>

          <div className="mt-4">
            <Buttons
              bgColor={"bg-lightBlue"}
              textColor={"text-white"}
              text={"Resend email"}
              handleClick={() => setIsOpen(true)}
            />
          </div>
          <div className="mt-4">
            <Buttons
              bgColor={"bg-lightBlue"}
              textColor={"text-white"}
              text={"Resend OTP"}
            />
          </div>
          <Modal 
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalHeader={true}
            children={<ReverifyEmail />}
            headerText={"Reverify Email"}
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyMail;
