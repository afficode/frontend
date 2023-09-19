import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/user/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputGroup from "../../components/InputGroup";
import Buttons from "../../components/Buttons";
import Modal from "../../components/Modal";

const SignUpForm = () => {
  const [showPassWord, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { isLoading } = useSelector((store) => store.user);
  const [termsModal, setTermsModal] = useState(false);
  const dispatch = useDispatch();
  const phoneRegExp =
    /((^090)([0-9]))|((^070)([0-9]))|((^080)([0-9]))|((^091)([0-9]))|((^071)([0-9]))|((^081)([0-9]))(\d{7})/;
  const handleCheckboxChange = (event) => {
    setAcceptTerms(event.target.checked);
  };

  const schema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(11, "Phone number cannot be less than 11 characters")
      .max(14, "Phone number cannot be longer than 14 characters"),
    email: Yup.string()
      .required("Email field is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[0-9]/, "Password must include at least one number")
      .matches(
        /^(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .matches(
        /^(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .matches(/^(?=.*[!@#$%^&*_-])/, "Must Contain One Special Character"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(
        registerUser({
          firstname: values.firstName,
          lastname: values.lastName,
          password: values.password,
          email: values.email,
          confirmPassword: values.confirmPassword,
          phone: values.phone,
        })
      );
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mt-[4rem] mx-auto w-[90%]">
          <InputGroup
            bgColor={"bg-white"}
            hasBorder={true}
            placeHolder={"First Name"}
            type={"text"}
            name={"firstName"}
            value={values.firstName}
            handleChange={handleChange}
            error={
              <small className="text-[#ff0000] font-[600]">
                {errors?.firstName}
              </small>
            }
          />

          <InputGroup
            bgColor={"bg-white"}
            hasBorder={true}
            placeHolder={"Last Name"}
            type={"text"}
            name={"lastName"}
            value={values.lastName}
            handleChange={handleChange}
            error={
              <small className="text-[#ff0000] font-[600]">
                {errors?.lastName}
              </small>
            }
          />

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
            placeHolder={"Mobile Number"}
            type={"text"}
            name={"phone"}
            value={values.phone}
            handleChange={handleChange}
            error={
              <small className="text-[#ff0000] font-[600]">
                {errors?.phone}
              </small>
            }
          />

          <InputGroup
            bgColor={"bg-white"}
            hasBorder={true}
            placeHolder={"Password"}
            type={showPassWord ? "text" : "password"}
            handleShowPassword={() => setShowPassword(!showPassWord)}
            hasPassword={true}
            name={"password"}
            value={values.password}
            handleChange={handleChange}
            error={
              <small className="text-[#ff0000] font-[600]">
                {errors?.password}
              </small>
            }
          />
          <InputGroup
            bgColor={"bg-white"}
            hasBorder={true}
            placeHolder={"Confirm Password"}
            type={"password"}
            name={"confirmPassword"}
            value={values.confirmPassword}
            handleChange={handleChange}
            error={
              <small className="text-[#ff0000] font-[600]">
                {errors?.confirmPassword}
              </small>
            }
          />

          <span className="flex my-2 gap-2 ">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={handleCheckboxChange}
            />
            <p>Do you accept term and condition</p>
          </span>
        </div>
        <div className="mx-auto w-[90%]">
          <p className="text-[1.2rem] font-sans text-black">
            It is possible we send you emails regarding our services and offers
            with the information provided. You can also unsubscribe from
            receiving these marketing emails at any given time by locating the
            unsubscribe link at the footer of our email
          </p>
          <div className="mt-6">
            <Buttons
              bgColor={"bg-lightBlue"}
              textColor={"text-white"}
              text={!isLoading ? "Register" : "Loading..."}
              disabled={isLoading || !acceptTerms}
            />
          </div>
          <p className="text-[1.2rem] font-sans text-black my-5">
            By clicking <b>Register</b>, you agree to have read our{" "}
            <b className="cursor-pointer" onClick={() => setTermsModal(true)}>
              Terms of Use.
            </b>{" "}
            Please see our <b>Privacy Policy</b> for information regarding the
            procesing of your data.
          </p>
        </div>
      </form>

      <Modal
        isOpen={termsModal}
        headerText={"TERMS OF SERVICES"}
        setIsOpen={() => setTermsModal(false)}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus sequi
        exercitationem quo maiores, natus doloribus eaque repudiandae placeat
        facere dolor voluptas accusamus alias sed eligendi. Eveniet perspiciatis
        officiis nesciunt est nulla illo at aliquid ullam, explicabo inventore
        sapiente incidunt esse quibusdam architecto odio aut! Consequuntur,
        ullam! Quaerat enim beatae iure.
      </Modal>
    </>
  );
};

export default SignUpForm;
