import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import Input from "../../components/FormComponents/Input";
import * as Yup from "yup";
import { MdLogin } from "react-icons/md";
import { LoginHook } from "../../hooks/AuthHook";
import { Apple, Facebook, Google } from "../../assets/svgs";
import { Button } from "../../ui";
// import { toast } from 'react-toastify';
import { Approutes } from "../../constants";
import { Button as FlowbiteButton } from "flowbite-react";
import useAuth from "../../context/UserContext";
import { SpinnerSkeleton, Spinner } from "../../components";
import { getRedirectLink } from "../../utils";
import { useNotify } from "../../hooks";
import useTokenContext from "../../context/TokenContext";

const Login = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { updateToken } = useTokenContext();

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
      .matches(/[A-Z]/, "Password requires an uppercase letter"),
  });
  const notify = useNotify();

  const onSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    setTimeout(async () => {
      const submit = await LoginHook(values, setSubmitting);
      if (submit?.success) {
        // the login from the useAuth tied to a context hook, will update localStorage and set user to Login
        login(submit);
        updateToken(submit?.coin);
        notify("Welcome to Boonfu, This is HELPFUL", "success");
        navigate(getRedirectLink() || Approutes.home, {
          replace: true,
        });
        // return window.location.reload();
      } else {
        notify(submit.message, "error");
      }
      setIsLoading(false);
    }, 3000);
  };
  return (
    <div className="w-full ">
      {isLoading ? (
        <div className="mt-4 lg:mt-20">
          <SpinnerSkeleton
            heading={"You’re being logged on."}
            body={"...learn more about the Grab system too 😊."}
            type={"spin"}
            color={"#2686CE"}
            height={250}
            width={250}
          />
        </div>
      ) : (
        <>
          <div className="w-[90%] mx-auto">
            {" "}
            <h2 className="my-4 text-xl lg:text-4xl">Sign In</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <Form>
                  <div className="form-control">
                    <Input
                      className={inputClass}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="email@email.com"
                      // autoComplete="off"
                      {...formik.getFieldProps("email")}
                    />
                  </div>

                  <div className="form-control">
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
                    <FlowbiteButton
                      type="submit"
                      aria-disabled="true"
                      className={` text-white text-normal lg:text-lg border-0 bg-primary btn-md lg:btn-lg hover:bg-primary/80 ${
                        !formik.isValid || !formik.dirty
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                      disabled={
                        !formik.isValid || !formik.dirty ? "disabled" : ""
                      }
                    >
                      {formik.isSubmitting ? (
                        <>
                          <Spinner color={"secondary"} /> &emsp;{" "}
                          <span className="my-auto text-xl">
                            Submitting Data...
                          </span>{" "}
                        </>
                      ) : (
                        <span className="flex w-full text-lg lg:text-2xl">
                          Login &nbsp;{" "}
                          <MdLogin className="my-auto text-lg lg:text-2xl" />
                        </span>
                      )}
                    </FlowbiteButton>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="w-full my-2 font-bold text-center lg:my-8 hover:underline text-primary text-md lg:text-2xl">
              <Link to={Approutes.forgotPassword}>Forgot your Password?</Link>
            </div>
          </div>

          <div className="w-[80%] mx-auto my-4 lg:my-8 p-[0.1rem] bg-black"></div>

          <div className="w-[85%] mx-auto my-4">
            <p className="w-full text-center text-md lg:text-2xl">
              Or Connect with:
            </p>

            <Button className="mt-6 w-full px-4 py-[.7rem] text-white bg-[#0F8EEF] flex items-center hover:brightness-90">
              <img src={Facebook} alt="apple logo" className="mr-auto" />{" "}
              <span className="w-full font-semibold text-center">
                Continue with Facebook
              </span>
            </Button>

            <Button className="mt-6 w-full px-4 py-[.7rem] text-white bg-black flex items-center hover:brightness-90">
              <img src={Apple} alt="apple logo" className="mr-auto" />{" "}
              <span className="w-full font-semibold text-center">
                Continue with Apple
              </span>
            </Button>

            <Button className="mt-6 w-full px-4 py-[.7rem] border border-black text-black bg-white flex items-center hover:brightness-90">
              <img src={Google} alt="apple logo" className="mr-auto" />{" "}
              <span className="w-full font-semibold text-center">
                Continue with Google
              </span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;

const inputClass =
  "input input-bordered border-black w-full bg-gray-100 text-black text-lg lg:text-xl rounded-none my-2 input-md lg:input-lg";
