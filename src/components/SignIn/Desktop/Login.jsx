import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { BiEnvelope, BiLogIn } from "react-icons/bi";
import { SiEnpass, SiApple } from "react-icons/si";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import { BsExclamationOctagonFill } from "react-icons/bs";
import { CgFacebook, CgGoogle } from "react-icons/cg";
import { FaFingerprint } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLoginIn } from "../../../Hooks/useLogin";
import { NavbarContext } from "../../../context/NavbarProvider";
import toast from "react-hot-toast";
import ReactLoading from "react-loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, success } = useLoginIn();
  const navigate = useNavigate();
  const { link, setLink } = useContext(NavbarContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    await login(formData);
  };

  if (success) {
    toast.success(
      "Login successfull. We are redirecting you to your Dashboard."
    );

    setTimeout(() => {
      if (link !== null) {
        navigate(link);
        <Navigate to={link} replace={true} />;
        setLink(null);
      } else {
        navigate("/dashboard");
      }
    }, 5000);
  }
  const iconClass =
    "absolute top-[0.5rem] lg:top-[0.4rem] left-0 flex items-center pl-2";
  const inputClass =
    "peer placeholder:text-slate-400 block bg-white w-full border-2 border-slate-300 rounded-md py-1 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-md";

  const [revealPassword, setRevealPassword] = useState(false);
  return (
    <>
      <div id="login" className="my-8 pl-4 xl:pl-10 w-full">
        {success ? (
          <div className="w-full mx-auto flex flex-col items-center justify-center h-[200px]">
            <div className="text-center font-bold">
              <h2 className="text-xl mb-2">Welcome</h2> <br />
              <span className="text-lg "></span>We are redirecting you to your{" "}
              {link !== null ? "previous page" : "Dashboard."}
            </div>
            <ReactLoading
              type={"spin"}
              color="#03fca5"
              height={"30%"}
              width={"30%"}
              delay={"1000"}
              className="my-8"
            />
          </div>
        ) : (
          <>
            <div className="xl:pl-8 flex flex-col items-center justify-start px-3 bg-green-100/20 py-3 rounded-xl">
              <div className="text-5xl text-gray-400 mb-3">
                <FaFingerprint />
              </div>
              <h2 className="text-3xl text-center font-bold capitalize mb-3 flex items-center justify-center">
                Login &nbsp;{" "}
                <BiLogIn className="text-slate-500 mt-2 text-green-600" />
              </h2>
              <div className="my-3 w-full">
                {error && (
                  <div className="bg-red-300 text-red-600 text-sm w-full p-3 text-center flex items-center justify-center gap-2 font-bold">
                    <BsExclamationOctagonFill className="text-lg" />
                    {error}
                  </div>
                )}

                {isLoading ? (
                  <>
                    <span className="mt-4 text-center text-gray-700 flex items-center justify-center text-lg">
                      Authentication is done securely against hackers{" "}
                      <ReactLoading
                        type={"bubbles"}
                        color="#03fca5"
                        height={"10%"}
                        width={"10%"}
                        delay={"2000"}
                        className=""
                      />
                    </span>
                  </>
                ) : (
                  <>
                    <form
                      onSubmit={handleSubmit}
                      id="loginForm"
                      action=""
                      className="my-3 flex flex-col space-y-5 justify-start w-full lg:w-[80%] lg:mx-auto"
                      method="post"
                    >
                      <label className="relative block w-full">
                        <span className="sr-only">Email</span>
                        <span className={iconClass}>
                          <BiEnvelope className="text-xl text-gray-500" />
                        </span>
                        <input
                          className={inputClass}
                          placeholder="Email@email.com"
                          type="email"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                          Please provide a valid email address.
                        </p>
                      </label>

                      <label className="relative block w-full">
                        <span className="sr-only">Password</span>
                        <span className={iconClass}>
                          <SiEnpass className="text-xl lg:text-xl text-gray-500" />
                        </span>
                        <input
                          className={inputClass}
                          placeholder="Password"
                          type={revealPassword ? "text" : "password"}
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="absolute top-[0.4rem] lg:top-[0.4rem] pl-2 right-0 flex items-center pr-2 cursor-pointer">
                          {revealPassword ? (
                            <ImEyeBlocked
                              onClick={() => {
                                setRevealPassword(false);
                              }}
                              className="text-xl  text-gray-500"
                            />
                          ) : (
                            <ImEye
                              onClick={() => {
                                setRevealPassword(true);
                              }}
                              className="text-xl  text-gray-500"
                            />
                          )}
                        </span>
                      </label>

                      <div className="w-full">
                        <div className="group">
                          <button
                            className="flex items-center justify-center bg-green-500 text-white py-3 w-full text-lg my-5 font-bold group-hover:bg-green-800 xl:text-2xl"
                            type="submit"
                            disabled={isLoading}
                          >
                            Login &nbsp;{" "}
                            <span className="bg-white rounded-lg p-1 group-hover:text-green-800">
                              <BiLogIn className="text-green-500" />
                            </span>
                          </button>
                        </div>

                        <div className="text-center text-green-500 font-bold hover:underline hover:text-green-800 ">
                          <span>
                            {" "}
                            <Link to={"/"}>Forgot your password? </Link>{" "}
                          </span>
                        </div>
                      </div>
                      <hr className="w-[60%] mx-auto bg-gray-200 h-1 rounded-full" />
                      <h2 className="text-center text-lg  font-bold">
                        Or Connect with :{" "}
                      </h2>
                      <div className="flex items justify-around text-xl">
                        <div className="bg-white rounded-full p-3 cursor-pointer shadow-lg shadow-gray-400 hover:bg-black hover:text-white hover:scale-125 hover:translate-y-1 transition delay-200 ease-in-out ">
                          <Link to={"#"}>
                            <SiApple />
                          </Link>
                        </div>
                        <div className="bg-white rounded-full p-3 cursor-pointer shadow-lg shadow-gray-400 text-blue-700 hover:bg-blue-700 hover:text-white hover:translate-y-1 hover:scale-125 transition delay-150 ease-in-out ">
                          <Link to={"#"}>
                            <CgFacebook />
                          </Link>
                        </div>
                        <div className="bg-white rounded-full p-3 cursor-pointer shadow-lg shadow-gray-400  hover:bg-red-800  hover:text-white group hover:scale-125 hover:translate-y-1 transition delay-200 ease-in-out">
                          <Link to={"#"}>
                            <FcGoogle className="group-hover:hidden" />{" "}
                            <CgGoogle className="hidden font-bold group-hover:flex" />
                          </Link>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Login;
