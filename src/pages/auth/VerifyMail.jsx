import React, { useEffect } from "react";
import Buttons from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const VerifyMail = () => {
  const navigate = useNavigate();
  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);
  const verifyEmail = async () => {
    const searchParams = location.search;
    const token = searchParams.split("?token=")[1];
    if (token) {
      try {
        const response = await axios.get(`auth/verify_account`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        if (response.status === 200) {
          notifySuccess(response?.data?.message);
          setTimeout(() => {
            navigate("/auth");
          }, 1000);
        }
      } catch (error) {
        notifyError(error?.message);
        setTimeout(() => {
          console.log(error);
        }, 1000);
      }
    }
  };
  useEffect(() => {
    verifyEmail();
  }, [location.search]);
  return (
    <div className="bg-white w-full  ">
      {/* <div className="w-full bg-[#2686ce33] h-[100vh] hidden md:flex items-center justify-center">
        <div className="w-[350px] h-[350px] bg-white p-10">
          <img src={largeMail} alt="mailbox" />
        </div>
      </div> */}
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
            />
          </div>
          <div className="mt-4">
            <Buttons
              bgColor={"bg-lightBlue"}
              textColor={"text-white"}
              text={"Resend OTP"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyMail;
