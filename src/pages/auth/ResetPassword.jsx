import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import Input from "../../components/FormComponents/Input";
import { Button } from "flowbite-react";
import Spinner from "../../components/Spinners";
import * as Yup from "yup";
import { TokenHook } from "../../Hooks/AuthHook";
import { notifyError, notifySuccess } from "../../ui";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const notifyErr = (message) => notifyError(message);
  const notifySuc = (message) => notifySuccess(message);
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
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
    const submit = await TokenHook(
      values,
      "change_password",
      token,
      setSubmitting
    );
    if (submit?.success) {
      notifySuc(submit.message);
      return navigate("/auth", { replace: true });
    } else {
      notifyErr(submit.message);
    }
  };

  return (
    <section className="w-full mt-[100px] lg:mt-[200px] ">
      <div className="w-[90%] md:w-[75%] lg:w-[50%] mx-auto h-[768px]">
        <div className="w-full text-xl text-center mb-8">
          We ensure we provide you comfort.{" "}
          <span className="text-primary font-bold">Affi</span> encourage you to
          use a strong password.
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              <div className="form-control">
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="input input-bordered border-black w-full bg-gray-100 text-black text-lg lg:text-xl rounded-none my-2 input-md"
                  {...formik.getFieldProps("password")}
                />
              </div>

              <div className="form-control">
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className="input input-bordered border-black w-full bg-gray-100 text-black text-lg lg:text-xl rounded-none my-2 input-md"
                  {...formik.getFieldProps("confirmPassword")}
                />
              </div>
              <div className="form-control">
                <Button
                  size="lg"
                  type="submit"
                  className="text-black bg-primary w-[60%] mx-auto text-md lg:text-2xl my-2"
                  disabled={!formik.isValid || !formik.dirty ? "disabled" : ""}
                >
                  {!formik.isSubmitting ? (
                    <>
                      <span className="text-lg">Change Password</span> &emsp;{" "}
                    </>
                  ) : (
                    <>
                      <Spinner color="white" /> &emsp;
                      <span className="pl-3 text-white">
                        We are changing password...{" "}
                      </span>
                    </>
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default ResetPassword;
