import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import Input from "../../components/FormComponents/Input";
import * as Yup from "yup";
import { MdLogin } from "react-icons/md";
import { LoginHook } from "../../Hooks/AuthHook";
import Buttons from "../../components/Buttons";
import AppleLogo from "../../assets/logos/appleLogo.svg";
import facebook from "../../assets/logos/facebook.svg";
import google from "../../assets/logos/google.svg";
import { toast } from "react-toastify";
import { Approutes } from "../../constants";
import { Button } from "flowbite-react";
import useAuth from "../../context/UserContext";
import Spinner from "../../components/Spinners";
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const inputClass =
    "input input-bordered border-black w-full bg-gray-100 text-black text-lg lg:text-xl rounded-none my-2 input-md lg:input-lg";
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

  const onSubmit = async (values, { setSubmitting }) => {
    const submit = await LoginHook(values, setSubmitting);
    if (submit?.success) {
      // the login from the useAuth tied to a context hook, will update localstorge and set user to Login
      login(submit);
      toast.success(
        "Welcome to Affi. \n\nYour world of endless possibilities",
        {
          style: {
            border: "4px solid #FAC213",
            padding: "14px",
            background: "#2686CE",
            color: "#fff",
          },
          iconTheme: {
            primary: "#2686CE",
            secondary: "#EBBA16",
          },
          position: "top-center",
        }
      );
      return navigate("/", { replace: true });
    } else {
      toast.error(submit.message);
    }
  };
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
              <div className="form-control my-2 lg:my-4">
                <Input
                  className={inputClass}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email@email.com"
                  autoComplete="off"
                  {...formik.getFieldProps("email")}
                />
              </div>
              <div className="form-control my-2 lg:my-4">
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
                <Button
                  type="submit"
                  aria-disabled="true"
                  className={` text-white text-normal lg:text-lg border-0 bg-blue-500 btn-md lg:btn-lg hover:bg-primary/80 ${
                    !formik.isValid || !formik.dirty
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  disabled={!formik.isValid || !formik.dirty ? "disabled" : ""}
                >
                  {formik.isSubmitting ? (
                    <>
                      <Spinner color={"secondary"} /> &emsp;{" "}
                      <span className="my-auto text-xl">
                        Submitting Data...
                      </span>{" "}
                    </>
                  ) : (
                    <span className="text-lg w-full flex lg:text-2xl">
                      Login &nbsp;{" "}
                      <MdLogin className="text-lg my-auto lg:text-2xl" />
                    </span>
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="w-full font-bold my-2 lg:my-8 hover:underline text-primary text-md lg:text-2xl text-center">
          <span className="">
            <Link to={Approutes.forgotPassword}>Forgot your Password?</Link>
          </span>
        </div>
      </div>
      <div className="w-[80%] mx-auto my-4 lg:my-8 p-[0.1rem] bg-black"></div>
      <div className="w-[85%] mx-auto my-4">
        <p className="w-full text-center text-md lg:text-2xl">
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

export default Login;
