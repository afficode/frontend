import React, { useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

const ChangePassword = () => {
  const [showPasswordDetails, setShowPasswordDetails] = useState(false);
  // password
  const [passwordOk, setPasswordOk] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState();

  // monitor submit
  const [submitError, setSubmitError] = useState(false);
  const [submitErrorMessages, setSubmitErrorMessage] = useState(
    "Please ensure PASSWORD REQUIREMENT was meet!"
  );

  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [updateError, setUpdateError] = useState("");

  const passwordPolicy = (e) => {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (e.target.value.match(passwordRegex)) {
      // password is Ok.
      setPasswordOk(true);
      setSubmitError(false);
    } else {
      setPasswordOk(false);
      setSubmitError(true);
      alert(
        "Password Policy must be implemented as described when inputing your password"
      );
    }
  };

  const confirmPass = () => {
    ////console.log(password)
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      setSubmitError(true);
      setSubmitErrorMessage("Password and confirm password must match");
      ////console.log("No")
    } else {
      setPasswordMatch(true);
      setSubmitError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitError) {
      // * there is an error!
      // * basically tells the password is not Ok.
      alert(submitErrorMessages);
      return;
    } else {
      if ((password === confirmPassword) === "") {
        return alert("Password cannot be empty");
      }

      if (password === confirmPassword) {
        // password match
        // contact backend to update password.
        setUpdatingPassword(true);
        const formData = new FormData();
        formData.append("password", password);
        await axios
          .post("http://localhost:4000/users/register", formData, {})
          .then((res) => {
            // password was successfully uploaded
            setUpdateError("Password Updating Successfully");
            setUpdatingPassword(false);
          })
          .catch((err) => {
            // Error changing password and notify the user
            setUpdateError("Password Updating Error, Please try again.");
            setUpdatingPassword(false);
            setTimeout(() => {
              setUpdateError("");
            }, 10000);
          });
      }
    } // close else
  }; // close handleSubmit
  return updatingPassword ? (
    <>
      <div className="w-full md:w-[60%] mx-auto bg-gray-100 border-gray-600 my-3">
        <p className="text-center tracking-wide text-success text-2xl pt-10 ">
          You password is been updated
        </p>
        <p className="text-lg text-center">
          Please bear with us, we are ensuring your password is encrypted for
          your password to be safe.
        </p>
        <ReactLoading
          type={"spin"}
          color="#03fca5"
          height={"30%"}
          width={"30%"}
          className="mx-auto py-7"
        />
      </div>
    </>
  ) : (
    <form
      className="w-full md:w-[80%] lg:w-[60%] mx-auto my-3 p-5 bg-gradient-to-l from-gray-100 to-white rounded-lg"
      onSubmit={handleSubmit}
    >
      {(updateError.includes("Error") || updateError.includes("Success")) && (
        <div
          className={`w-full md:w-[80%] my-4 mx-auto p-2 text-center font-semibold bg-${
            updateError.includes("Error") ? "red" : "green"
          }-200 text-${updateError.includes("Error") ? "red" : "green"}-500`}
        >
          {updateError}
        </div>
      )}
      {/* Password */}
      <label className="relative block w-full">
        <span className="sr-only">Password</span>
        <input
          className={`peer placeholder:text-slate-400 block bg-white w-full   rounded-md py-2 px-4  shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-md lg:text-lg border-0 hover:border-b-blue-500 hover:border-l-blue-500 ${
            passwordOk
              ? "border-gray-300 border-b-4 border-l-4 "
              : "border-red-500 border-t-2 border-r-2 border-r-red-400 border-t-red-600 border-l-2 border-l-red-600 border-b-red-400 border-b-4"
          }`}
          placeholder="Password"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setShowPasswordDetails(true)}
          onBlur={(e) => {
            setShowPasswordDetails(false);
            passwordPolicy(e);
          }}
        />
        {showPasswordDetails && (
          <p className="mt-2 invisible peer-focus:visible text-green-600 text-sm">
            Password must contain:
            <ul className="list-disc ml-8">
              <li>Lowercase (a-z)</li>
              <li>Uppercase (A-Z)</li>
              <li>Number (0-9)</li>
              <li>
                Symbol (&nbsp; &#62;!$%^&*()_+-=[]@'/;:#~?. &#60; &nbsp;){" "}
              </li>
            </ul>
          </p>
        )}
      </label>
      {/* confirm password */}
      <label className="relative block w-full">
        <span className="sr-only">Confirm Password</span>

        <input
          onBlur={confirmPass}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className=" mt-9 placeholder:text-slate-400 block bg-white w-full border-gray-300 border-b-4 border-l-4 rounded-md py-2 px-4  shadow-sm focus:outline-none hover:border-b-blue-500 hover:border-l-blue-500 focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-md lg:text-lg"
          placeholder={
            passwordOk === false
              ? "Disabled: Set an acceptable password to enable"
              : "Confirm Password"
          }
          type="password"
          //id="confirmPassword"
          disabled={passwordOk === false ? "disabled" : ""}
        />

        {passwordMatch === false ? (
          <div className="w-full text-red-600 pl-4 pt-3">Password Mismatch</div>
        ) : (
          ""
        )}
      </label>

      <div className="w-full flex justify-center mt-4">
        <button
          type="submit"
          className="rounded-sm md:text-lg md:py-2 md:px-3 py-1 px-2 bg-green-500 text-white hover:bg-green-300 cursor-pointer"
        >
          Update Password
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
