import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import Input from "../../components/FormComponents/Input";
import * as Yup from "yup";
import { MdLogin } from "react-icons/md";

const Login = () => {
  const inputClass =
    "input input-bordered border-black w-full bg-gray-100 text-black text-lg lg:text-xl rounded-none my-2 input-lg";
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email field is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
  });

  const onSubmit = (values) => console.log("Values", values);
  return (
    <div className="w-full ">
      <div className="w-[90%] mx-auto">
        <h2 className="text-xl lg:text-4xl my-4">Sign In</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              <div className="form-control my-4">
                <Input
                  className={inputClass}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email@email.com"
                  autocomplete="off"
                  {...formik.getFieldProps("email")}
                />
              </div>
              <div className="form-control my-4">
                <Input
                  className={inputClass}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  {...formik.getFieldProps("password")}
                />
              </div>
              <div className=" form-control">
                <button
                  type="submit"
                  role="button"
                  aria-disabled="true"
                  className={`btn text-white text-normal lg:text-lg border-0 bg-blue-500 btn-lg hover:bg-primary/80 ${
                    !formik.isValid || !formik.dirty
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  disabled={!formik.isValid || !formik.dirty ? "disabled" : ""}
                >
                  Login <MdLogin className="text-lg" />
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="w-full font-bold my-8 hover:underline text-primary text-md lg:text-2xl text-center">
          <span className="">
            <Link to={"/"}>Forgot your Password?</Link>
          </span>
        </div>
      </div>
      <div className="w-[80%] mx-auto my-8 p-[0.1rem] bg-black"></div>
      <div className="w-full my-4">
        <p className="w-full text-center text-md lg:text-2xl">
          Or Connect with:
        </p>
      </div>
    </div>
  );
};

export default Login;
