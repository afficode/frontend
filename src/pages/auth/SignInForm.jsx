import React, { useEffect, useState } from "react";
import InputGroup from "../../components/InputGroup";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../features/user/userSlice";
import Buttons from "../../components/Buttons";
import AppleLogo from "../../assets/logos/appleLogo.svg";
import facebook from "../../assets/logos/facebook.svg";
import google from "../../assets/logos/google.svg";
import { useDispatch, useSelector } from "react-redux";
import { Approutes } from "../../constants";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSignINPassWord, setShowSignInPassword] = useState(false);
  const { isLoading } = useSelector((store) => store.user);
  const schema = Yup.object({
    email: Yup.string()
      .required("Email field is required")
      .email("Invalid email address"),
    password: Yup.string().required("Required"),
  });
  const { handleSubmit, handleChange, touched, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(
        loginUser({
          email: values.email,
          password: values.password,
        })
      );
    },
  });

  return (
    <div className="mx-auto w-[90%] my-8 md:mt-0 ">
      <h1 className="text-black font-normal text-3xl ">Sign In</h1>
      <div className="mt-6">
        <form onSubmit={handleSubmit}>
          <InputGroup
            bgColor={"bg-white"}
            hasBorder={true}
            placeHolder={"Email"}
            type={"email"}
            name={"email"}
            value={values.email}
            handleChange={handleChange}
            error={
              <small className="text-[#ff0000] font-[600]">
                {errors?.email}
              </small>
            }
          />

          <InputGroup
            bgColor={"bg-white"}
            hasBorder={true}
            placeHolder={"Password"}
            type={showSignINPassWord ? "text" : "password"}
            handleShowPassword={() =>
              setShowSignInPassword(!showSignINPassWord)
            }
            hasPassword={true}
            name={"password"}
            value={values.password}
            handleChange={handleChange}
            error={
              errors.password ? (
                <small className="text-[#ff0000] font-[600]">
                  {errors?.password}
                </small>
              ) : null
            }
          />

          <Buttons
            bgColor={"bg-lightBlue"}
            textColor={"text-white"}
            text={!isLoading ? "Sign In" : "Loading..."}
            disabled={isLoading}
            // handleClick={handleSubmit}
          />
        </form>
        <h3
          className="text-center text-yellow text-[1.2rem] font-[700] mt-6 cursor-pointer"
          onClick={() => {
            navigate(Approutes.forgotPassword);
          }}
        >
          Forgot your password?
        </h3>
        <hr className=" border-b border-black border-1 mt-5" />
        <p className="text-center text-black text-[1.2rem] font-[400] mt-6">
          Or Connect with:
        </p>
        <div className="mt-6">
          <Buttons
            bgColor={"bg-lightBlue1"}
            textColor={"text-white"}
            hasLogo={true}
            text={"Continue with Facebook"}
            logo={facebook}
            hasBorder={true}
            handleClick={() => {
              handleLogin();
            }}
          />
        </div>
        <div className="mt-6">
          <Buttons
            bgColor={"bg-black"}
            textColor={"text-white"}
            hasLogo={true}
            text={"Continue with Apple"}
            logo={AppleLogo}
            hasBorder={true}
          />
        </div>
        <div className="mt-6">
          <Buttons
            bgColor={"bg-white"}
            textColor={"text-black"}
            hasLogo={true}
            text={"Continue with Google"}
            logo={google}
            hasBorder={true}
          />
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
