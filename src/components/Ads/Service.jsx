import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Transition, Dialog } from "@headlessui/react";
import { ToggleSwitch, Alert, Button, Spinner } from "flowbite-react";
import {
  FaComments,
  FaBriefcase,
  FaMapMarkerAlt,
  FaRegImages,
  FaAudioDescription,
  FaRegSmileBeam,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { GiSkills, GiMoneyStack } from "react-icons/gi";
import { SiYourtraveldottv } from "react-icons/si";
import { MdSubtitles } from "react-icons/md";
import { BsEmojiSmileUpsideDownFill } from "react-icons/bs";
import { TbCameraPlus, TbCurrencyNaira } from "react-icons/tb";
import axios from "axios";
import { getToken } from "../../utils";
import { backendLink } from "../../utils/basicInfo";
import toast from "react-hot-toast";

const Service = () => {
  const navigate = useNavigate();
  // style for disclosureButton
  const disclosureButton =
    " group flex w-full justify-start rounded-sm bg-green-600 px-4 py-2 text-left text-sm font-medium text-white truncate hover:bg-green-400 focus:outline-none focus-visible:ring focus-visible:ring-green-200 focus-visible:ring-opacity-75";

  // style for disclosureButtonDiv
  const disclosureButtonDivSpan =
    "text-xl lg:text-2xl font-bold tracking-tight flex items-center lg:py-1";

  const [notifyType, setNotifyType] = useState(false);
  // description manipulation

  const [descriptionText, setDescriptionText] = useState("");
  const [notifyUser, setNotifyUser] = useState("green");
  const [remainigdWords, setRemainingWords] = useState(500);
  let [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  // modal stuffs for terms
  const [termsOfUse, setTermsOfUse] = useState(false);
  const [postingRules, setPostingRules] = useState(false);
  const [privacyNotice, setPrivacyNotice] = useState(false);

  // payment type:
  const [perDay, setPerDay] = useState(false);
  const [perMonth, setPerMonth] = useState(false);

  // imageArrayForError
  const [imageError, setImageError] = useState([]);
  const [imageNotification, setImageNotification] = useState(
    "Image uploaded are certified"
  );
  const [showError, setShowError] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const imageType = ["image/jpeg", "image/jpg", "image/png"];

  // monitoring the description typing
  const handleTyping = (des) => {
    if (parseInt(des.length) > 500) {
      alert("Yes");
      document.getElementById("description").value = "";
      document.getElementById("description").value = descriptionText;
    } else {
      if (parseInt(des.length) >= 0 && parseInt(des.length) <= 500) {
        //console.log(des);
        setDescriptionText(des);
        setRemainingWords(500 - parseInt(des.length));
        if (remainigdWords <= 100) {
          setNotifyUser("yellow");
        } else if (remainigdWords <= 50) {
          setNotifyUser("red");
        } else {
          setNotifyUser("green");
        }
      } else {
        setNotifyUser("red");
      }
    }
  };

  // open modal
  function openModal() {
    setIsOpen(true);
  }
  // close modal
  function closeModal() {
    setIsOpen(false);
  }

  // when form is submitted.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    const toastId = toast.loading(
      "We are saving your product. Please be patient with us."
    );
    const skills = document.getElementById("otherSkills");

    // this means the user entered some skills
    const otherSkills = skills.value !== "" && skills.value.split(",");

    if (showError) {
      // this means there is an Image error
      setSubmitError(true);
      toast.dismiss(toastId);
      setIsloading(false);
      toast.error(
        "There is an error with the image you are uploading. \nCheck out the image section"
      );
    } else {
      setSubmitError(false);
      const token = await getToken();
      const form = document.getElementById("serviceForm");
      const formData = new FormData(form);
      // if the otherSkill array is not empty, then we can add it to the formData to send to backend
      otherSkills.length > 0 && formData.append("otherSkills", otherSkills);
      axios
        .post(backendLink + "/api/service", formData, {
          headers: { Authorization: token },
        })
        .then((res) => {
          // redirect the user to see what they posted
          setIsloading(false);
          toast.dismiss(toastId);
          if (res.data.success) {
            toast.custom((t) => (
              <div
                className={`${
                  t.visible ? "animate-enter" : "animate-leave"
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
              >
                <div className="flex-1 w-0 p-4">
                  <div className="flex items-start">
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        ✅ &emsp; Congratulations
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Your <b>{`${res.data.product.title}`}</b> is now visible
                        to the public. You will be notified when a customer view
                        your vehicle.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ));
            navigate("/");
          } else {
            toast.error(res.data.message);
          }
          //console.log(res.data);
        })
        .catch((err) => {
          setIsloading(false);
          toast.dismiss(toastId);
          toast.error("Something went Wrong. Try again.");
          // here we have an error
        });
    }
  };

  const onFileChange = (e) => {
    setImageError([]); // reset the imageError holder array
    setShowError(false); // reset the show image Error
    setReveal(false);
    setSubmitError(false);

    // if image size is too much
    if (e.target.files.length > 5) {
      alert("Image must not be more than 5");
      setShowError(true);
      return;
    } else {
      setImageNotification("Image uploaded are certified");
      for (const key of Object.keys(e.target.files)) {
        //console.log(e.target.files[key]);
        const obj = {
          name: e.target.files[key].name,
          size: (e.target.files[key].size / 1000000).toFixed(2),
          type: e.target.files[key].type,
        };
        setImageError((imageError) => [...imageError, obj]);
        if (!imageType.includes(e.target.files[key].type)) {
          setImageNotification(
            `There is an error uploading image! Image type must be 'jpeg', 'jpg' or 'png'  ${e.target.files[key].type} is not supported!`
          );
          setShowError(true);
          setReveal(true);
          return;
        }
        if (e.target.files[key].size / 1000000 > 1.0) {
          // the size is not ok, we will set the error here.
          setImageNotification("Each Images must be less than or equal 1mb");
          setShowError(true);
          setReveal(true);
        }
      }
      setReveal(true);
    }
  };

  const onDismiss = () => {
    setSubmitError(false);
  };

  return (
    <div className="w-full px-4 pt-4 mb-4">
      <form
        id="serviceForm"
        onSubmit={handleSubmit}
        action=""
        method="POST"
        encType="multipart/form-data"
        className="mx-auto w-full md:w-[80%] lg:w-[70%] xl:w-[60%]  rounded-2xl bg-white p-2"
      >
        <h1 className="text-center text-2xl text-green-600 tracking-wider antialiased mb-3 font-bold flex items-center justify-center">
          <FaBriefcase className="text-yellow-300" /> &nbsp; Post your Service
          Ad in Minutes
        </h1>

        {/* category  */}
        <div>
          <div className={disclosureButton}>
            <span className={disclosureButtonDivSpan}>
              Category &emsp; <FaBriefcase className="my-auto" />
            </span>
          </div>
          <div className="bg-gray-200 px-4 pt-4 pb-2 sm:texst-sm text-lg text-gray-500">
            <h1 className="text-lg md:text-2xl tracking-wide text-green-600 font-bold">
              Tell us what you are posting
            </h1>
            <input
              type="text"
              id="service"
              name="service"
              placeholder="E.g Financial Analyst, Auditor, Tyler, Capenter, Mechanic...."
              className="w-full px-2 placeholder:text-gray-400 focus:outline-2 focus:outline-blue-300 border border-gray-500 mt-3"
            />
          </div>
        </div>

        {/* location  */}
        <div className="mt-3">
          <div className={disclosureButton}>
            <span className={disclosureButtonDivSpan}>
              Location &emsp; <FaMapMarkerAlt className="my-auto" />
            </span>
          </div>
          <div className="px-4 pt-4 pb-2 sm:texst-sm text-lg text-gray-500 bg-gray-200">
            <h1 className="text-lg md:text-2xl tracking-wide text-green-600 font-bold">
              Enter your City and State
            </h1>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="E.g Ikeja, Lagos"
              className="peer w-full px-2 placeholder:text-gray-400 focus:outline-2 focus:outline-blue-300 border border-gray-500 mt-3"
            />
            <p className="mt-2 invisible peer-focus:visible text-black text-lg">
              Please ensure your location is in the format:{" "}
              <span className="text-green-600">City</span>,{" "}
              <span className="text-yellow-600">State</span>:- (
              <span className="text-green-600">Ikeja</span>,{" "}
              <span className="text-yellow-500">Lagos</span>)
            </p>
          </div>
        </div>

        {/* Avaiable to Travel  */}
        <div className="mt-3">
          <div className={disclosureButton}>
            <span className={disclosureButtonDivSpan}>
              Available to travel &emsp;{" "}
              <SiYourtraveldottv className="my-auto" />
            </span>
          </div>
          <div className="px-4 pt-4 pb-2 sm:texst-sm text-lg text-gray-500 font-bold tracking-wider bg-gray-200">
            <div className="peer flex items-center justify-start gap-4">
              <label className="flex items-center justify-start">
                <input
                  type="radio"
                  name="availableToTravel"
                  id="availableToTravel"
                  value="yes"
                  className=""
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="flex items-center justify-start">
                <input
                  type="radio"
                  name="availableToTravel"
                  id="availableToTravel"
                  value="no"
                  className=""
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
        </div>

        {/* Advert Title  */}
        <div className="mt-3">
          <div className={disclosureButton}>
            <span className={disclosureButtonDivSpan}>
              Advert Title &emsp; <MdSubtitles className="my-auto" />
            </span>
          </div>
          <div className="px-4 pt-4 pb-2 sm:texst-sm text-lg text-gray-500 font-bold tracking-wider bg-gray-200">
            <h1 className="text-lg md:text-2xl tracking-wide text-green-600 font-bold">
              Enter a catchy title to grap buyers attention
            </h1>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="E.g Reliable Mechanic in Lagos State..."
              className="w-full px-2 placeholder:text-gray-400 focus:outline-2 focus:outline-blue-300 border border-gray-500 mt-3"
            />
          </div>
        </div>

        {submitError && (
          <>
            <Alert
              color="failure"
              rounded={false}
              withBorderAccent={true}
              onDismiss={onDismiss}
              additionalContent={
                <React.Fragment>
                  <ul className="mt-2 mb-4 text-sm text-red-700 list-disc ml-3 md:ml-5 lg:ml-7">
                    <li key={"1"}>
                      Please note that images uploaded must not be more than 5
                      as described below.{" "}
                    </li>{" "}
                    <li key={"2"}>
                      Each of the images must be less than or equals to 1mb.{" "}
                    </li>{" "}
                    <li key={"3"}>
                      Find the image which is greater than 1mb highlighted in
                      red below.{" "}
                    </li>
                    <li key={"4"}>
                      Image must be of the follwowing format "image/jpeg",
                      "image/jpg", "image/png"
                    </li>
                    <li key={"5"}>Thanks.</li>
                  </ul>
                </React.Fragment>
              }
              icon={FaExclamationTriangle}
            >
              <h3 className="text-lg font-medium text-red-700 dark:text-red-800">
                Image Error
              </h3>
            </Alert>
          </>
        )}

        {/* Images  */}
        <div className="mt-3">
          <div className={`${disclosureButton} ${submitError && "bg-red-700"}`}>
            <span className={disclosureButtonDivSpan}>
              Images &emsp; <FaRegImages className="my-auto" />
            </span>
          </div>
          <div className="px-4 pt-4 pb-2 sm:texst-sm text-lg text-gray-500 font-semibold tracking-wider bg-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 mb-2">
              <label
                htmlFor="images"
                className="h-[100px] w-[100px] sm:h-[150px] sm:w-[150px] md:h-[200px] md:w-[200px] border-2 border-black bg-gray-100 mx-auto mb-3 sm:mb-0 sm:mx-0"
              >
                <span className="flex items-center flex-col justify-center text-blue-600 text-sm md:text-2xl w-full h-full">
                  <TbCameraPlus className="text-green-600 text-2xl md:text-4xl" />{" "}
                  <span className="">Add Images</span>
                  <input
                    onChange={onFileChange}
                    type="file"
                    name="images"
                    id="images"
                    className="hidden"
                    multiple
                  />
                </span>
              </label>
              <div className="my-auto col-span-2 pl-3 tracking-normal font-normal">
                <p className="font-bold text-sm lg:text-2xl sm:text-xl text-yellow-400">
                  You can add up to 5 images.
                </p>
                <p className="md:text-xl lg:text-xl text-sm sm:text-md">
                  Upload 5 maximum clear images to get your add more views and
                  replies.
                </p>
              </div>
            </div>

            {reveal && imageError.length > 0 && (
              <div className="flex flex-col tracking-normal font-normal bg-red-200 px-4 py-2">
                <p className="text-sm">
                  Images to be uploaded are:{" "}
                  <span
                    onClick={() => {
                      setReveal(false);
                    }}
                    className="px-2 cursor-pointer float-right hover:scale-125 hover:text-white hover:bg-red-700 hover:font-semibold rounded-md"
                  >
                    x
                  </span>{" "}
                </p>
                {imageError.map((err) => (
                  <li
                    className={`text-sm flex tracking-tight font-normal text-red-800 ${
                      err.size <= 1.0 &&
                      imageType.includes(err.type) &&
                      "text-green-800"
                    }`}
                  >
                    {err.name} is {err.size} mb. &emsp;{" "}
                    {err.size <= 1.0 && imageType.includes(err.type) ? (
                      <FaCheckCircle />
                    ) : (
                      <FaTimesCircle />
                    )}
                  </li>
                ))}
                <p
                  className={`text-black text-sm ${
                    imageNotification.includes("error")
                      ? "bg-red-600"
                      : "bg-yellow-400"
                  }  p-2`}
                >
                  {imageNotification}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Description  */}
        <div className="mt-3">
          <div className={disclosureButton}>
            <span className={disclosureButtonDivSpan}>
              Description &emsp;{" "}
              <FaAudioDescription className="my-auto text-yellow-300" />
            </span>
          </div>
          <div className="px-4 pt-4 pb-2 flex flex-col sm:texst-sm text-lg text-gray-500 tracking-tight bg-gray-200 md:grid md:grid-cols-2 gap-3">
            <span className="sr-only">Description</span>
            <label htmlFor="description" className="truncate w-full">
              <span className="sr-only">Description</span>
              <textarea
                onFocus={(e) => {
                  setNotifyType(true);
                }}
                onBlur={(e) => {
                  e.target.value === "" && setNotifyType(false);
                }}
                onChange={(e) => {
                  handleTyping(e.target.value);
                }}
                name="description"
                id="description"
                rows="10"
                className="w-full p-3 placeholder:italic placeholder:font-semibold placeholder:tracking-wide placeholder:text-gray-400 placeholder:text-center border-2 border-gray-300 "
                placeholder="Make your car Catchy before your customer...."
                value={descriptionText}
              ></textarea>
            </label>
            <div className="w-full text-black my-auto text-justify">
              {notifyType && (
                <p className="text-xl ">
                  {" "}
                  <span className={`text-${notifyUser}-600`}>
                    {remainigdWords}
                  </span>{" "}
                  characters remaining,{" "}
                  <span
                    className={
                      500 - remainigdWords >= 12
                        ? "text-green-400"
                        : "text-red-600"
                    }
                  >
                    {" "}
                    (12 words minimum).
                  </span>
                </p>
              )}

              <p className="my-3">Enter as much information as possible</p>
              <p className="mb-3 text-justify">
                You could include reason for selling, number of previous owners,
                if there had been colour changes or defects.
              </p>
            </div>
          </div>
        </div>

        {/* Other Skills */}
        <div className="mt-3">
          <div className={disclosureButton}>
            <span className={disclosureButtonDivSpan}>
              Other Skills, If any, Please State below &emsp;{" "}
              <GiSkills className="my-auto font-bold" />
            </span>
          </div>
          <div className="px-4 pt-4 pb-3 items-center text-lg text-gray-500 tracking-tight bg-gray-300">
            <input
              type="text"
              id="otherSkills"
              placeholder="E.g Auditor, Financial Accountant, Web Developer, DevOps etc...."
              className="peer w-full px-2 placeholder:text-gray-400 focus:outline-2 focus:outline-blue-300 border border-gray-500 mt-3"
            />
            <p className="mt-2 invisible peer-focus:visible text-black text-lg">
              Please ensure the skills are seperated using comma (,) else you
              might not be contacted.
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="mt-3">
          <div className={disclosureButton}>
            <span className={disclosureButtonDivSpan}>
              How do you charger &emsp;{" "}
              <GiMoneyStack className="my-auto font-bold" />
            </span>
          </div>
          <div className="px-4 pt-4 pb-3 items-center text-lg text-gray-500 tracking-tight bg-gray-300">
            <h1 className="text-lg md:text-2xl tracking-wide text-green-600 font-bold pl-0 md:pl-1 mb-2">
              Price
            </h1>
            <div className="flex items-start justify-start ml-2 mb-3">
              <ToggleSwitch
                name="perDay"
                value="true"
                checked={perDay}
                label="&nbsp; Per Day"
                onChange={() => {
                  setPerDay(true);
                  setPerMonth(false);
                }}
              />{" "}
              &emsp; &emsp;
              <ToggleSwitch
                name="perMonth"
                value="true"
                checked={perMonth}
                label="&nbsp; Per Month"
                onChange={() => {
                  setPerMonth(true);
                  setPerDay(false);
                }}
              />
            </div>
            <label className="relative block w-full">
              <span className="sr-only">Price</span>
              <span className="absolute top-[0.65rem] lg:top-[0.8rem] left-0 flex items-center pl-2">
                <TbCurrencyNaira className="text-xl text-gray-500" />
              </span>
              <input
                className="placeholder:text-slate-400 block bg-white w-full border-2 border-gray-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-gray-400 focus:ring-gray-400 focus:ring-1 sm:text-sm md:text-md lg:text-lg"
                placeholder="100,000"
                type="text"
                name="price"
              />
            </label>
            <label
              htmlFor="negotiable"
              className="mt-3 flex items-center justify-start truncate gap-5 group cursor-pointer"
            >
              <span className="sr-only">Negotiable</span>
              <input
                type="checkbox"
                name="negotiable"
                id="negotiable"
                className="rounded-sm  border border-gray-400 "
              />
              <span className="text-lg md:text-2xl text-black font-semibold truncate group-hover:hover:text-yellow-500">
                Negotiable
              </span>
            </label>
          </div>
        </div>

        {/* contact details */}
        <div className="mt-3">
          <div className={disclosureButton}>
            <span className={disclosureButtonDivSpan}>
              Your contact details &emsp;{" "}
              <FaComments className="my-auto font-bold" />
            </span>
          </div>
          <div className="px-4 pt-4 pb-3 flex flex-col items-center justify-start text-lg text-gray-500 tracking-tight bg-gray-200">
            <h1 className="text-lg md:text-2xl tracking-wide text-green-600 font-bold pl-0 md:pl-1 mb-2 flex items-center justify-start w-full">
              Please select at least one option to be contacted by:
            </h1>
            <label
              htmlFor="email"
              className="mt-3 flex items-center justify-start truncate gap-5 group cursor-pointer w-full"
            >
              <span className="sr-only">Email</span>
              <input
                type="checkbox"
                name="email"
                id="email"
                className="rounded-sm  border border-gray-400 w-5 h-5"
              />
              <span className="text-lg md:text-2xl text-black font-semibold truncate group-hover:hover:text-yellow-500 ">
                Email:
              </span>{" "}
              &nbsp;
              <span className="select-none">iso***@isowo.ng</span>
            </label>
            <label
              htmlFor="phone"
              className="mt-3 flex items-center justify-start truncate gap-5 group cursor-pointer w-full"
            >
              <span className="sr-only">Phone</span>
              <input
                type="checkbox"
                name="phone"
                id="phone"
                className="rounded-sm  border border-gray-400 w-5 h-5"
              />
              <span className="text-lg md:text-2xl text-black font-semibold truncate group-hover:hover:text-yellow-500">
                Phone:
              </span>
              <span className="select-none">&nbsp; &nbsp; +23480123*****</span>
            </label>
          </div>
        </div>

        {/* submit warning */}
        <div className="mt-3 text-justify font-semibold text-lg">
          By selecting Post My Ad, you agree you've read and accepted our{" "}
          <a
            href
            type="button"
            onClick={() => {
              openModal();
              setTermsOfUse(true);
              setPostingRules(false);
              setPrivacyNotice(false);
            }}
            className="underline cursor-pointer text-blue-600 "
          >
            Terms of Use
          </a>{" "}
          and{" "}
          <a
            href
            type="button"
            onClick={() => {
              openModal();
              setTermsOfUse(false);
              setPostingRules(true);
              setPrivacyNotice(false);
            }}
            className="underline cursor-pointer text-blue-600 "
          >
            Posting Rules
          </a>{" "}
          . Please see our{" "}
          <a
            href
            type="button"
            onClick={() => {
              openModal();
              setTermsOfUse(false);
              setPostingRules(false);
              setPrivacyNotice(true);
            }}
            className="underline cursor-pointer text-blue-600 "
          >
            Privacy Notice
          </a>{" "}
          for information regarding the processing of your provided data.
        </div>

        {/* submit button */}
        <div className="w-full flex items-center justify-center mt-4 mb-3">
          {!isLoading ? (
            <>
              {" "}
              <button
                type="submit"
                className="bg-green-600 text-white font-semibold text-2xl p-3 w-[50%] mx-auto text-center hover:rounded-lg hover:bg-white hover:text-green-600 hover:shadow-xl transition delay-75 ease-in-out duration-100 hover:border hover:border-green-600 group flex items-center justify-center"
              >
                {" "}
                Post My Ad &nbsp;{" "}
                <span className="hidden  group-hover:inline text-yellow-300">
                  <BsEmojiSmileUpsideDownFill />
                </span>{" "}
              </button>
            </>
          ) : (
            <>
              <Button isProcessing size={"xl"}>
                <Spinner aria-label="sending product to database" size={"xl"} />
                <span className="pl-3">Loading...</span>
              </Button>
            </>
          )}
        </div>
      </form>
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
                    className="text-xl font-semibold leading-6 text-gray-900"
                  >
                    {termsOfUse && "Terms of Use"}
                    {postingRules && "Posting Rules"}
                    {privacyNotice && "Privacy Notice"}
                  </Dialog.Title>
                  <div className="mt-2">
                    {termsOfUse && (
                      <>
                        <p className="text-lg text-black">
                          Terms of Use Lorem ipsum dolor sit amet consectetur
                          adipisicing elit. Rerum, non sed. Eos sequi asperiores
                          repudiandae dolorem aut libero iusto similique
                          pariatur nam. Expedita possimus perferendis, provident
                          asperiores ipsa voluptatibus quo.
                        </p>
                      </>
                    )}
                    {postingRules && (
                      <>
                        <p className="text-lg text-black">
                          POSTING RULES Lorem, ipsum dolor sit amet consectetur
                          adipisicing elit. Nihil molestiae optio illo velit.
                          Vero repellendus, deserunt sunt vel nobis veniam
                          voluptatibus aut, consequuntur doloribus unde soluta
                          perferendis ipsa quo. Temporibus.
                        </p>
                      </>
                    )}
                    {privacyNotice && (
                      <>
                        <p className="text-lg text-black">
                          PRIVACY NOTICE Lorem ipsum dolor sit amet consectetur
                          adipisicing elit. Nisi eum ab excepturi, beatae, eaque
                          assumenda, laboriosam molestias ducimus numquam
                          voluptates sit quia quibusdam iure consequuntur
                          obcaecati aperiam expedita minus quam?
                        </p>
                      </>
                    )}
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      I understand &nbsp;{" "}
                      <FaRegSmileBeam className="text-green-500 outline-4 outline-orange-400 text-lg" />
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Service;
