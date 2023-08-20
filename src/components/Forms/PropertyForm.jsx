import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Spinner } from "flowbite-react";
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Transition, Dialog } from "@headlessui/react";
import { BsEmojiSmileUpsideDownFill } from "react-icons/bs";
import { TbCameraPlus, TbCurrencyNaira } from "react-icons/tb";
import { FaRegSmileBeam } from "react-icons/fa";
import axios from "axios";
import { getToken } from "../../utils";
import { backendLink } from "../../utils/basicInfo";
import toast from "react-hot-toast";

const PropertyForm = ({ agent }) => {
  const navigate = useNavigate();
  const propertyType = [
    "Bungalow",
    "Miniflat",
    "Terrace",
    "Studio Apartment",
    "Duplex",
    "Maisonette",
    "House",
    "Block of Flats",
    "Penthouse",
    "Condo",
    "Mansion",
    "Room and Parlour",
  ];
  const propertyFacilities = [
    "Constant Light",
    "Fully Furnnished",
    "Jacuzzi Bath",
    "Gated",
    "Furnished",
    "Parking Space",
    "Tarred Road",
    "Balcony",
    "Semi Furnished",
    "En Suites",
    "C of 0",
    "Security",
  ];

  const startDate = new Date();
  const [selectedDate, setSelectedDate] = useState(startDate);
  const handleDateChange = (date) => {
    //console.log(date);
    setSelectedDate(date);
  };

  const [isLoading, setIsloading] = useState(false);

  const [descriptionText, setDescriptionText] = useState("");
  const [notifyUser, setNotifyUser] = useState("green");
  const [remainigdWords, setRemainingWords] = useState(500);
  const [notifyType, setNotifyType] = useState(false);
  // description manipulation
  let [isOpen, setIsOpen] = useState(false);
  // modal stuffs for terms
  const [termsOfUse, setTermsOfUse] = useState(false);
  const [postingRules, setPostingRules] = useState(false);
  const [privacyNotice, setPrivacyNotice] = useState(false);

  const [otherDocument, setOtherDocument] = useState(false);

  // imageArrayForError
  const [imageError, setImageError] = useState([]);
  const [imageNotification, setImageNotification] = useState(
    "Image upload is successfull"
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
        ////console.log(remainigdWords)
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
    var selectedPropertyType = [];
    var selectedPropertyFacilities = [];

    const propertyType = document.getElementById("propertyType");
    const propertyFacilites = document.getElementById("propertyFacilites");

    const proeprtyTypeCheckboxes = propertyType.getElementsByTagName("INPUT");
    const proeprtyFacilitiesCheckboxes =
      propertyFacilites.getElementsByTagName("INPUT");
    // converts all the selected checkbox in the property Type section into an array to be injected to the formData
    for (var i = 0; i < proeprtyTypeCheckboxes.length; i++) {
      // just pushing all the selected property type into the facilities array.
      if (proeprtyTypeCheckboxes[i].checked) {
        selectedPropertyType.push(proeprtyTypeCheckboxes[i].value);
      }
    }
    // converts all the selected checkbox in the property facilities section into an array to be injected to the formData
    for (var j = 0; j < proeprtyFacilitiesCheckboxes.length; j++) {
      if (proeprtyFacilitiesCheckboxes[j].checked) {
        if (proeprtyFacilitiesCheckboxes[j].id === "otherDocumentsCheckbox") {
          // this means the other document is checked, and we should be expecting the user to input something in the textbox using comma to seperate them.
          const otherDoc = document.getElementById("otherDocument");
          const doc = otherDoc.value !== "" && otherDoc.value.split(","); // get the input field for the other document and split them with comma into an array
          selectedPropertyFacilities = [...selectedPropertyFacilities, ...doc]; // add the array using the spread method.
        } else {
          // just pushing all the selected facilities into the facilities array.
          selectedPropertyFacilities.push(
            proeprtyFacilitiesCheckboxes[j].value
          );
        }
      }
    }

    if (showError) {
      // this means there is an Image error
      setSubmitError(true);
      setIsloading(false);
      toast.dismiss(toastId);
      toast.error(
        "There is an error with the image you are uploading. \nCheck out the image section"
      );
    } else {
      setSubmitError(false);
      const token = await getToken();
      //console.log(selectedPropertyType);
      const form = document.getElementById("propertyForm");
      const formData = new FormData(form);

      formData.append("propertyType", selectedPropertyType);
      formData.append("propertyFacilities", selectedPropertyFacilities);
      axios
        .post(backendLink + "/api/property", formData, {
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
    <form
      onSubmit={handleSubmit}
      action=""
      method="POST"
      encType="multipart/form-data"
      id="propertyForm"
      className="mx-auto w-full md:w-[90%] lg:w-[80%] xl:w-[70%]  rounded-2xl bg-white p-2"
    >
      <input type="hidden" name="sellerType" value={agent ? "1" : "0"} />
      {/* Property Title */}
      <div className="flex flex-col md:flex-row items-start justify-center mb-3 font-bold">
        <label
          htmlFor="title"
          className="truncate md:w-[25%] text-xl mb-2 md:mb-0"
        >
          Property Title:{" "}
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Luxurious 5 Bed Apartment at Omole, Ojodu"
          className="border-gray-300 placeholder:text-gray-400 placeholder:text-lg text-black font-semibold border-2 w-full ml-auto"
        />
      </div>
      {/* Property Type */}
      <div className="flex flex-col items-start justify-center mb-3">
        <label htmlFor="propertyType" className="text-xl mb-2 font-bold">
          Property Type
        </label>
        <div
          className="w-full p-3 bg-green-200 border-gray-500 border-2 capitalize grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-content-evenly"
          id="propertyType"
        >
          {propertyType.map((type) => (
            <div className="flex items-center justify-start" key={type}>
              <span className="sr-only">{type}</span>
              <input type="checkbox" value={type} />
              <span className="pl-3 font-semi-bold">{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Property */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-start justify-center md:gap-3 lg:gap-5 xl:gap-8 md:p-3 mb-3">
        {/* Property Condition */}
        <div className="flex flex-col items-start justify-center w-full mb-3">
          <label htmlFor="propertyCondition" className="text-xl mb-2 font-bold">
            Property Condition
          </label>
          <select
            name="propertyCondition"
            id="propertyCondition"
            className=" w-full"
          >
            <option value="0">Brand New Property</option>
            <option value="1">Old Property</option>
            <option value="2">Refurbished Property</option>
          </select>
        </div>
        {/* Property Location */}
        <div className="flex flex-col items-start justify-center w-full mb-3">
          <label htmlFor="propertyLocation" className="text-xl mb-2 font-bold">
            Property Location
          </label>
          <input
            type="text"
            name="propertyLocation"
            id="propertyLocation"
            placeholder="8 Awolowo Road, Ikoyi, Lagos"
            className="border-gray-300 placeholder:text-gray-400 placeholder:text-lg text-black font-semibold border-2 w-full ml-auto"
          />
        </div>
        {/* Property Size */}
        <div className="flex flex-col items-start justify-center w-full mb-3">
          <label htmlFor="propertySize" className="text-xl mb-2 font-bold">
            Property Size in m<sup>2</sup>
          </label>
          <input
            type="text"
            name="propertySize"
            id="propertySize"
            placeholder="200"
            className="border-gray-300 placeholder:text-gray-400 placeholder:text-lg text-black font-semibold border-2 w-full ml-auto"
          />
        </div>
        {/* Date Available */}
        <div className="flex  items-end justify-end w-full mb-3 md:my-auto font-bold ">
          <span className="sr-only">Date Avaiable</span>
          <div className="w-full mb-5">
            <MuiPickersUtilsProvider utils={DateFnsUtils} className="w-full">
              <KeyboardDatePicker
                className="w-full font-bold"
                label="Date Available"
                format="MM/dd/yyyy"
                value={selectedDate}
                minDate={startDate}
                onChange={handleDateChange}
                name="dateAvailable"
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
      </div>
      {/* Property Facillities */}
      <div className="flex flex-col items-start justify-center mb-3">
        <label htmlFor="propertyType" className="text-xl mb-2 font-bold">
          Property Facilities
        </label>
        <div
          className="w-full p-3 bg-green-200 border-gray-500 border-2 capitalize grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-content-evenly"
          id="propertyFacilites"
        >
          {propertyFacilities.map((type) => (
            <div className="flex items-center justify-start" key={type}>
              <span className="sr-only">{type}</span>
              <input type="checkbox" value={type} />
              <span className="pl-3 font-semi-bold">{type}</span>
            </div>
          ))}
          <div className="col-span-2 md:col-span-3 w-full">
            <input type="checkbox" id="otherDocumentsCheckbox" className="" />
            <span className="pl-3 font-semi-bold inline-block">
              Other Property documents:{" "}
            </span>
            <input
              onFocus={() => {
                setOtherDocument(true);
              }}
              onBlur={() => {
                setOtherDocument(false);
              }}
              type="text"
              id="otherDocument"
              placeholder="Please State documents"
              className="md:ml-5 border-2 border-b-black border-x-0 border-t-0 bg-transparent"
            />
          </div>
          {otherDocument && (
            <div className="col-span-2 md:col-span-3 w-full bg-white p-2 font-semibold normal-case">
              Please seperate the documents name with comma (,).
            </div>
          )}
        </div>
      </div>
      {/* Submit error */}
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
                    Please note that images uploaded must not be more than 5 as
                    described below.{" "}
                  </li>{" "}
                  <li key={"2"}>
                    Each of the images must be less than or equals to 1mb.{" "}
                  </li>{" "}
                  <li key={"3"}>
                    Find the image which is greater than 1mb highlighted in red
                    below.{" "}
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
            <span className="text-lg font-medium text-red-700 dark:text-red-800">
              Image Error
            </span>
          </Alert>
        </>
      )}

      {/* Image */}
      <div className="flex flex-col md:flex-row items-center justify-center mb-3">
        <h1 className="text-xl font-bold md:w-[40%] mb-3 md:mb-0">
          Upload Pictures:
        </h1>
        <label
          className="relative w-full h-[150px] flex flex-col items-center justify-center bg-gray-200 rounded-sm hover:shadow-lg"
          forhtml="images"
        >
          <input
            onChange={onFileChange}
            type="file"
            name="images"
            id="images"
            className="hidden"
            multiple
          />
          <TbCameraPlus className="text-green-600 text-4xl md:text-4xl" />{" "}
          <span className="text-blue-600 text-lg font-bold">Add Images</span>
          <h1 className="font-bold text-xl">You can add up to 5 images</h1>
          <span className="font-semi-bold tracking-tight text-center px-3">
            Upload 5 maximum clear images to get your ad more views and replies
          </span>
        </label>
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
      {/* Description */}
      <div className="w-full mb-3">
        <h1 className="px-2 md:px-4 text-xl font-semibold">
          Describe your property:{" "}
        </h1>
        <div className="px-2 md:px-4 pt-2 pb-2 flex flex-col sm:texst-sm text-lg text-gray-500 tracking-tight  md:grid md:grid-cols-2 gap-3">
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
              placeholder="Describe your property to enhance search and performance"
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

      <div className="w-full mb-3 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          className="flex flex-col items-start justify-center mb-4 md:mb-0"
          forhtml="price"
        >
          <h1 className="text-xl font-bold text-black mb-3">Price:</h1>
          <label className="relative block w-full">
            <span className="sr-only">Price</span>
            <span className="absolute top-[0.65rem] lg:top-[0.8rem] left-0 flex items-center pl-2">
              <TbCurrencyNaira className="text-xl text-gray-500" />
            </span>
            <input
              className="placeholder:text-slate-400 block bg-white w-full border-2 border-gray-300 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-gray-400 focus:ring-gray-400 focus:ring-1 sm:text-sm md:text-md lg:text-lg"
              placeholder="1,000,000,000"
              type="text"
              name="price"
              id="price"
            />
          </label>
        </div>
        {agent && (
          <div
            className="flex flex-col items-start justify-center mb-4 md:mb-0"
            forhtml="price"
          >
            <h1 className="text-xl font-bold text-black mb-3">Agent Fee:</h1>
            <label className="relative block w-full">
              <span className="sr-only">Agent Fee</span>
              <span className="absolute top-[0.65rem] lg:top-[0.8rem] left-0 flex items-center pl-2">
                <TbCurrencyNaira className="text-xl text-gray-500" />
              </span>
              <input
                className="placeholder:text-slate-400 block bg-white w-full border-2 border-gray-300 rounded-sm py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-gray-400 focus:ring-gray-400 focus:ring-1 sm:text-sm md:text-md lg:text-lg"
                placeholder="1,000,000,000"
                type="text"
                name="price"
                id="price"
              />
            </label>
          </div>
        )}
      </div>

      <div className="flex flex-col items-start justify-start mt-4">
        <h1 className="text-xl text-black mb-3 font-bold">Negotiable?</h1>
        <div className="flex items-start justify-center gap-5">
          <label htmlFor="yes" className="gap-2 text-black">
            <input
              type="radio"
              name="negotiable"
              id="yes"
              className="h-5 w-5 rounded-md"
            />
            <span className="text-xl ml-4 my-auto">Yes</span>
          </label>
          {/* <label htmlFor="no" className="gap-2 text-black">
            <input
              type="radio"
              name="negotiable"
              id="no"
              value="yes"
              className="h-5 w-5 rounded-md"
            />
            <span className="text-xl ml-4">No</span>
          </label> */}
        </div>
      </div>

      {/* submit warning */}
      <div className="mt-4 text-justify font-semibold text-lg ">
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
                    as="div"
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
    </form>
  );
};

export default PropertyForm;
