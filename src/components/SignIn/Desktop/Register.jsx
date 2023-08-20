import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { MdSmartphone } from "react-icons/md";
import { ToggleSwitch } from "flowbite-react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { add } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { BiRename, BiEnvelope, BiSmile } from "react-icons/bi";

import { SiEnpass } from "react-icons/si";
import { ImUserPlus, ImEye, ImEyeBlocked } from "react-icons/im";
import { Dialog, Transition } from "@headlessui/react";

import { backendLink } from "../../../utils/basicInfo";

const Register = () => {
  const title = ["Mr.", "Mrs.", "Ms.", "Miss", "Others"];
  const startDate = add(new Date(), { years: -18 });
  const navigate = useNavigate();
  // * Form fields data
  const [selectedDate, setSelectedDate] = useState(startDate);
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [showPasswordDetails, setShowPasswordDetails] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);
  const [revealConfirmPassword, setRevealConfirmPassword] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(title[0]);
  const [query, setQuery] = useState("");

  /**
   *  TODO: When the user is registered and the API returns
   *  ? true
   *    * redirect the user to Home
   *    * alert the user to check their email to verify themselves
   *    * Let them know their data will be removed after 48 hours of not verifying their identity
   *  ! false
   *    * tell the user to try again,
   *    * alert the reason for the error
   * */
  // * registration notifier
  const [regSuccess, setRegSuccess] = useState(false);

  // form data
  const [firstaname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [termsAndCondition, setTermsAndCondition] = useState(false);

  // monitor submit
  const [submitError, setSubmitError] = useState(false);
  const [submitErrorMessages, setSubmitErrorMessage] = useState();
  // password
  const [passwordOk, setPasswordOk] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState();

  let [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({
    heading: "",
    body: "",
    button: "",
  });
  function closeModal() {
    setIsOpen(false);
    // reset the modal properties to defaults, so the user can view the terms and condition
    setModalData((previous) => {
      return {
        ...previous,
        heading: "",
        body: "",
        button: "",
      };
    });
    // redirect the user to the homepage if the regSuccess is true
    regSuccess && navigate("/");
  }
  function openModal() {
    setIsOpen(true);
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const filteredTitle =
    query === ""
      ? title
      : title.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase());
        });
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

  const handleSubmit = (e) => {
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
      if (isNaN(phone)) {
        return alert("Phone field must be numbers");
      }
      if (password === confirmPassword && gender && termsAndCondition) {
        // other values can be gotten using the required field
        const form = document.getElementById("registerForm");
        const formData = new FormData(form);
        formData.append("firstname", firstaname);
        formData.append("lastname", lastname);
        formData.append("gender", gender);
        formData.append("email", email);
        formData.append("phone", parseInt(phone));
        formData.append("password", password);
        formData.append("subscribe", subscribe);
        // //console.log(Object.fromEntries(formData))
        for (const [key, value] of formData) {
          //console.log(key, value);
        }
        axios
          .post(backendLink + "/users/register", formData, {})
          .then((res) => {
            // done TODO: Confirm the return information is success or failed.
            setRegSuccess(res.data.success);
            // done TODO: if its success notify user and reload to home ✅
            // * this means the registration was done successfully.
            // * Notify the user their account was created successfully
            // set modal properties
            // * split res.message with (.)
            const message = res.data.message.split(".");
            //console.log(res);
            setModalData((previous) => {
              return {
                ...previous,
                heading: message[0],
                body: message[1] + ". " + message[2] + ".",
                button: "Close",
              };
            });
            // * when the user is successfully created, the browser will programatically redirect the user to the home page, after closing the modal.
            openModal(); // Open modal
            ////console.log(res.data);
          })
          .catch((err) => {
            //console.log(err.response.data);
            const res = err.response.data;
            setRegSuccess(false);
            // done TODO: if its failed, notify user and allow them make changes

            // * this means the registration was not successfully.
            // * Notify the user of the error
            // set modal properties
            // * split res.message with (.)
            const message = res.message.split("\n");
            setModalData((previous) => {
              return {
                ...previous,
                heading: message[0],
                body: message[1] + ". \n" + message[2],
                button: "Close",
              };
            });
            openModal(); // Open modal
          });
      } else {
        gender === "" && alert("Please select Gender!");
        termsAndCondition === false &&
          alert("Please read and accept our Terms and Condition");
        password !== confirmPassword && alert("Password Mismatch");
      }
    }
  };

  return (
    <>
      <div id="register" className="flex flex-col items-center justify-start">
        <div className="border-4 rounded-2xl border-green-400 p-3">
          <h2 className="text-3xl text-center font-bold capitalize mb-3">
            Register To:
          </h2>
          <ul className="list-disc pl-6 tracking-wide mb-3">
            <li>Own an online shop(s) for your business</li>
            <li>Post and Manage your Ad(s)</li>
            <li>
              Become an <span className="text-green-600">Agent</span> and Earn
              Well &nbsp;
              <FontAwesomeIcon
                icon={faSackDollar}
                className="text-lg text-yellow-400"
              />
            </li>
            <li>Have your customized shop link</li>
            <li>Never Miss a deal or offer</li>
            <li>Expressly compare products and make informed decisions</li>
          </ul>
        </div>
        <div className="my-3 w-full">
          <form
            id="registerForm"
            action=""
            onSubmit={handleSubmit}
            className="my-3 flex flex-col space-y-5 justify-start w-full lg:w-[80%] lg:pl-3"
            method="POST"
          >
            {/* Personel Title */}
            <div className="relative mb-4">
              <Combobox
                value={selectedTitle}
                onChange={setSelectedTitle}
                name="title"
              >
                <div className="relative mt-1 ">
                  <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                      onChange={(event) => setQuery(event.target.value)}
                      className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 px-4"
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>
                  </div>
                  <Combobox.Options className="px-4 shadow-xl mt-1 pb-2">
                    {filteredTitle.map((person) => (
                      <Combobox.Option key={person} value={person}>
                        {person}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </div>
              </Combobox>
            </div>
            {/* Firstname */}

            <label className="relative block w-full">
              <span className="sr-only">Firstname</span>
              <span className="absolute top-[0.65rem] lg:top-[0.8rem] left-0 flex items-center pl-2">
                <BiRename className="text-xl text-gray-500" />
              </span>
              <input
                className="peer placeholder:text-slate-400 block bg-white w-full border-2 border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-md lg:text-lg"
                placeholder="Firstname"
                type="text"
                onChange={(e) => setFirstname(e.target.value)}
              />
              <p className="mt-2 invisible peer-focus:visible text-green-600 text-sm">
                Please ensure firstname is more than 2 letters
              </p>
            </label>
            {/* lastname */}
            <label className="relative block w-full">
              <span className="sr-only">Lastname</span>
              <span className="absolute top-[0.65rem] lg:top-[0.8rem] left-0 flex items-center pl-2">
                <BiRename className="text-xl text-gray-500" />
              </span>
              <input
                className="peer placeholder:text-slate-400 block bg-white w-full border-2 border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-md lg:text-lg"
                placeholder="Lastname"
                type="text"
                onChange={(e) => setLastname(e.target.value)}
              />
              <p className="mt-2 invisible peer-focus:visible text-green-600 text-sm">
                Please ensure lastname is more than 2 letters
              </p>
            </label>
            {/* Gender */}
            <label className="relative block w-full ">
              <span className="sr-only">Gender</span>
              <div id="gender" className="mb-5 flex items-center justify-start">
                <ToggleSwitch
                  value="female"
                  checked={male}
                  label="&nbsp; Male"
                  onChange={() => {
                    setMale(true);
                    setFemale(false);
                    setGender("male");
                  }}
                />{" "}
                &emsp; &emsp;
                <ToggleSwitch
                  value="female"
                  checked={female}
                  label="&nbsp; Female"
                  onChange={() => {
                    setFemale(true);
                    setMale(false);
                    setGender("female");
                  }}
                />
              </div>
            </label>
            {/* Date of Birth */}
            <label className="relative block w-full ">
              <span className="sr-only">Date of birth</span>
              <div className="w-full mb-5">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    label="Date of Birth"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    maxDate={startDate}
                    onChange={handleDateChange}
                    name="dateOfBirth"
                  />
                </MuiPickersUtilsProvider>
              </div>
            </label>
            {/* Email */}
            <label className="relative block w-full">
              <span className="sr-only">Email</span>
              <span className="absolute top-[0.65rem] lg:top-[0.8rem] left-0 flex items-center pl-2">
                <BiEnvelope className="text-xl text-gray-500" />
              </span>
              <input
                className="peer placeholder:text-slate-400 block bg-white w-full border-2 border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-md lg:text-lg"
                placeholder="Email@email.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                Please provide a valid email address.
              </p>
            </label>
            {/* Phone Number  */}
            <label className="relative block w-full">
              <span className="sr-only">Phone Number</span>
              <span className="absolute top-[0.65rem] lg:top-[0.8rem] left-0 flex items-center pl-2">
                <MdSmartphone className="text-xl text-gray-500 " />
              </span>
              <input
                className="peer placeholder:text-slate-400 block bg-white w-full border-2 border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-md lg:text-lg"
                placeholder="08012345678"
                type="text"
                onChange={(e) => setPhone(e.target.value)}
              />
              <p className="mt-2 invisible peer-focus:visible text-green-600 text-sm">
                Mobile number should be 08012345678 not +23480****
              </p>
            </label>
            {/* Password */}
            <label className="relative block w-full">
              <span className="sr-only">Password</span>
              <span className="absolute top-[0.7rem] lg:top-[0.9rem] left-0 flex items-center pl-2">
                <SiEnpass className="text-xl lg:text-2xl text-gray-500" />
              </span>
              <input
                className={`peer placeholder:text-slate-400 block bg-white w-full border-2  rounded-md py-2 px-9  shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-md lg:text-lg ${
                  passwordOk ? "border-slate-300" : "border-red-500"
                }`}
                placeholder="Password"
                type={revealPassword ? "text" : "password"}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setShowPasswordDetails(true)}
                onBlur={(e) => {
                  setShowPasswordDetails(false);
                  passwordPolicy(e);
                }}
              />
              <span className="absolute top-[0.7rem] lg:top-[0.9rem] pl-2 right-0 flex items-center pr-2 cursor-pointer">
                {revealPassword ? (
                  <ImEyeBlocked
                    onClick={() => {
                      setRevealPassword(false);
                    }}
                    className="text-xl lg:text-2xl text-gray-500"
                  />
                ) : (
                  <ImEye
                    onClick={() => {
                      setRevealPassword(true);
                    }}
                    className="text-xl lg:text-2xl text-gray-500"
                  />
                )}
              </span>
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
              <span className="absolute top-[3rem] lg:top-[3.1rem] left-0 flex items-center pl-2">
                <SiEnpass className="text-xl lg:text-2xl text-gray-500" />
              </span>
              <input
                onBlur={confirmPass}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className=" mt-9 placeholder:text-slate-400 block bg-white w-full border-2 border-slate-300 rounded-md py-2 px-9  shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm md:text-md lg:text-lg"
                placeholder={
                  passwordOk === false
                    ? "Disabled: Set an acceptable password to enable"
                    : "Confirm Password"
                }
                type={revealConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                disabled={passwordOk === false ? "disabled" : ""}
              />
              <span className="absolute top-[3rem] lg:top-[3.05.0rem] right-0 flex items-center pr-2 cursor-pointer">
                {revealConfirmPassword ? (
                  <ImEyeBlocked
                    onClick={() => {
                      setRevealConfirmPassword(false);
                    }}
                    className="text-xl lg:text-2xl text-gray-500"
                  />
                ) : (
                  <ImEye
                    onClick={() => {
                      setRevealConfirmPassword(true);
                    }}
                    className="text-xl lg:text-2xl text-gray-500"
                  />
                )}
              </span>
              {passwordMatch === false ? (
                <div className="w-full text-red-600 pl-4 pt-3">
                  Password Mismatch
                </div>
              ) : (
                ""
              )}
            </label>
            {/* subscribe */}
            <div className="flex items-start gap-2 ">
              <input
                type="checkbox"
                onClick={() => {
                  setSubscribe(!subscribe);
                }}
                className="rounded-md border-sky-400 border-2 focus:border-sky-200 focus:outline-sky-300"
              />
              <span className="text-justify text-md">
                It is possible we send you emails regarding our services and
                offers with the information provided. You can also unsubscribe
                from receiving these emails at any given time by locating the
                unsubscribe link at the footer of our email.
              </span>
            </div>
            {/* terms and condition */}
            <div className="flex items-start gap-2 ">
              <input
                type="checkbox"
                onClick={() => {
                  setTermsAndCondition(!termsAndCondition);
                }}
                className="rounded-md border-sky-400 border-2 focus:border-sky-200 focus:outline-sky-300"
              />
              <span className="text-justify text-md">
                I have agreed to{" "}
                <span
                  type="button"
                  onClick={openModal}
                  className="underline cursor-pointer text-green-400 "
                >
                  Terms & Condition
                </span>
              </span>
            </div>
            {/* Submit registration button */}
            <div className="w-full my-3 group">
              <button
                className="bg-green-500 text-white py-3 w-full text-lg flex items-center justify-center xl:text-2xl font-bold hover:bg-green-800"
                type="submit"
              >
                Register &nbsp;{" "}
                <span className="bg-white rounded-full p-2">
                  <ImUserPlus className="text-lg text-green-500" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {modalData.heading !== ""
                      ? modalData.heading
                      : "Terms and Condition"}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {modalData.body !== ""
                        ? modalData.body
                        : "Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order."}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      {modalData.button !== "" ? (
                        modalData.button
                      ) : (
                        <>
                          I understand &nbsp;{" "}
                          <BiSmile className="text-green-500 outline-4 outline-orange-400 text-lg" />
                        </>
                      )}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* // * this is the modal for the registration */}
    </>
  );
};

export default Register;
