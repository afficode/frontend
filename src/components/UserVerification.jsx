import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { FaCheckSquare, FaTimesCircle } from "react-icons/fa";
import { backendLink } from "../utils/basicInfo";

const UserVerification = () => {
  // extract the token from the param sent with the URL
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [validationMessage, setValidationMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  // send the request to backend to verify the token

  useEffect(() => {
    const source = axios.CancelToken.source();
    // //console.log(`Bearer ${token}`);
    const verifyUser = async () => {
      try {
        axios
          .get(`${backendLink}/users/verify_account/`, {
            cancelToken: source.token,
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((data) => {
            // successfully verify the user.
            setValidationMessage(data.data.message);
            setError(false);
            // redirect the user to the login page
            setTimeout(() => {
              setLoading(false);
            }, 5000);

            setTimeout(() => {
              navigate("/auth");
            }, 20000);
          })
          .catch((err) => {
            // Token tampered with
            if (err) {
              setValidationMessage(err.response.data.message);
              setError(true);
            }

            setTimeout(() => {
              setLoading(false);
            }, 5000);
            // TODO: Redirect the user to contact us form
            setTimeout(() => {
              navigate("/");
            }, 20000);
          });
      } catch (err) {
        if (axios.isCancel(err)) {
          navigate("/");
        } else {
          navigate("/");
        }
      }
    };

    verifyUser();
    // if the effect is not needed anymore
    // or the state monitoring is is changed, it runs this before another useEffect.
    // this is a cleanup method when the useEffect is interupted or done.
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full md:w-[60%] mx-auto bg-gray-100 border-gray-600 my-3">
          <p className="text-center tracking-wide text-success text-2xl pt-10 ">
            Account verification in process
          </p>
          <p className="text-lg text-center">
            Please bear with us, we are verifying your account.
          </p>
          <ReactLoading
            type={"spinningBubbles"}
            color="#03fca5"
            height={"30%"}
            width={"30%"}
            delay={"2000"}
            className="mx-auto py-7"
          />
        </div>
      ) : (
        <>
          <section className="w-full md:w-[60%] bg-gray-100 border-gray-400 mx-auto p-6 my-3">
            <div className="w-full text-center">
              <h1
                className={`text-xl text-black text-center tracking-wide flex items-center justify-center ${
                  error ? "text-red-500" : "text-green-500"
                }`}
              >
                {error ? (
                  <>
                    <FaTimesCircle />
                    <span className="text-gray-600 text-3xl">
                      {" "}
                      &nbsp; Verification Error{" "}
                    </span>{" "}
                  </>
                ) : (
                  <>
                    <FaCheckSquare className="my-auto text-4xl" /> &nbsp;
                    <span className="text-gray-600 text-3xl">
                      &nbsp; Congratulations
                    </span>{" "}
                  </>
                )}
              </h1>

              <p className="text-md mt-4">
                {validationMessage}
                <span className="mt-4 text-center text-gray-700 flex items-center justify-center text-lg">
                  We are redirecting you to the login page{" "}
                  <ReactLoading
                    type={"bubbles"}
                    color="#03fca5"
                    height={"10%"}
                    width={"10%"}
                    delay={"2000"}
                    className=""
                  />
                </span>
              </p>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default UserVerification;
