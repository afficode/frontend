import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../../components/FormComponents/Input";
import { MdAppRegistration } from "react-icons/md";
import { Button } from "flowbite-react";
import { RegistrationHook } from "../../Hooks/AuthHook";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinners";
import { SpinnerSkeleton } from "../../components/Skeletons";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const inputClass =
    "input input-bordered border-black w-full bg-gray-100 text-black text-lg lg:text-xl rounded-none my-2 input-md lg:input-lg";
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string()
      .required("Firstname Field must not be empty")
      .min(2, "Firstname must have at least 2 characters"),
    lastname: Yup.string()
      .required("Lastname Field must not be empty")
      .min(2, "Lastname must have at least 2 characters"),
    email: Yup.string()
      .required("Email field is required")
      .email("Invalid email address"),
    phone: Yup.number()
      .required()
      .positive()
      .integer()
      .min(1000000000, "Phone number must be 11 or 12 digit 08012345678")
      .max(99999999999, "Phone number must be 11 or 12 digit 08012345678"),
    password: Yup.string()
      .required()
      .min(8, "Password must be 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], 'Must match "password" field value')
      .required(),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    setTimeout(async () => {
      const submit = await RegistrationHook(values, setSubmitting, "register");
      if (submit?.success) {
        toast.success(submit.message);
        return navigate("/", { replace: true });
      } else {
        toast.error(submit.message);
      }
    }, 3000);
  };

  return (
    <div className="w-full ">
      {isLoading ? (
        <div className="mt-4 lg:mt-20">
          <SpinnerSkeleton
            heading={"Submitting Data..."}
            body={
              "Do you know we provide Affiliate Marketing as Grabber Feature. You can also open a shop with us 😊"
            }
            type={"spin"}
            color={"#2686CE"}
            height={250}
            width={250}
          />
        </div>
      ) : (
        <>
          <div className="w-[90%] mx-auto bg-[#d9d9d993] rounded-3xl border-solid border-4 border-blue-500">
            <h1 className="text-center text-black font-normal text-[1.2rem] lg:text-3xl lg:pt-4 ">
              Register To:
            </h1>
            <ul className="px-4 lg:p-[1.56rem] list-disc ml-2">
              <li className="text-black text-[0.8rem] lg:text-[1.2rem] font-sans pb-2">
                Own an online shop(s) for your businesses
              </li>
              <li className="text-black text-[0.8rem] lg:text-[1.2rem] font-sans pb-2">
                Post and manage your ads
              </li>
              <li className="text-black text-[0.8rem] lg:text-[1.2rem] font-sans pb-2">
                Become an Agent and earn well
              </li>
              <li className="text-black text-[0.8rem] lg:text-[1.2rem] font-sans pb-2">
                Have your customized shop link{" "}
              </li>
              <li className="text-black text-[0.8rem] lg:text-[1.2rem] font-sans pb-2">
                Never Miss a deal or offer
              </li>
              <li className="text-black text-[0.8rem] lg:text-[1.2rem] font-sans pb-2">
                Expressly compare products and make informed decisions
              </li>
            </ul>
          </div>
          <div className="my-8 w-[90%] mx-auto">
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
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder="Firstname"
                      {...formik.getFieldProps("firstname")}
                    />
                  </div>
                  <div className="form-control my-4">
                    <Input
                      className={inputClass}
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder="Lastname"
                      {...formik.getFieldProps("lastname")}
                    />
                  </div>
                  <div className="form-control my-4">
                    <Input
                      className={inputClass}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="email@email.com"
                      {...formik.getFieldProps("email")}
                    />
                  </div>
                  <div className="form-control my-4">
                    <Input
                      className={inputClass}
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="08012345678"
                      {...formik.getFieldProps("phone")}
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
                  <div className="form-control my-4">
                    <Input
                      className={inputClass}
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      {...formik.getFieldProps("confirmPassword")}
                    />
                  </div>
                  <div className=" form-control">
                    {/* <Button
                  type="submit"
                  size={"xl"}
                  className="bg-primary border-0"
                  disabled={formik.isValid || !formik.dirty}
                >
                  <span className="flex text-xl">
                    Register &emsp; <MdAppRegistration className="my-auto" />
                  </span>
                </Button> */}

                    <Button
                      type="submit"
                      tabIndex="-1"
                      aria-disabled="true"
                      className={`text-white text-normal lg:text-lg border-0 bg-blue-500 btn-md lg:btn-lg hover:bg-primary/80 ${
                        !formik.isValid || !formik.dirty || formik.isSubmitting
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                      disabled={
                        !formik.isValid || !formik.dirty ? "disabled" : ""
                      }
                    >
                      {formik.isSubmitting ? (
                        <>
                          <Spinner color={"secondary"} /> Submitting Data{" "}
                        </>
                      ) : (
                        <span className="text-lg w-full flex lg:text-2xl">
                          Register &nbsp;{" "}
                          <MdAppRegistration className="text-lg my-auto lg:text-2xl" />
                        </span>
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
