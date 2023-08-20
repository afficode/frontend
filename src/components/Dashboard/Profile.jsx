import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Switch } from "@headlessui/react";
import { HiBadgeCheck, HiPhoneIncoming } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import { FcCalendar } from "react-icons/fc";
import { FaEnvelope, FaUserAlt, FaUserEdit } from "react-icons/fa";
import { MdOutlineElectricalServices } from "react-icons/md";
import { GiTrade } from "react-icons/gi";
import { profileOpenTo, tradingIn } from "../../utils/basicInfo";
import { getUser } from "../../utils/index";

const Profile = () => {
  const [enabled, setEnabled] = useState(false);
  const user = getUser();
  const dateYear = new Date(user.created_at).getFullYear();

  return (
    <div className="flex flex-col  mt-5 w-full">
      {/* profile visibility */}
      <div className="flex items-center gap-4 justify-end w-full">
        <span className="text-2xl">Profile Visibility</span>
        <Switch checked={enabled} onChange={setEnabled} as={Fragment}>
          {({ checked }) => (
            /* Use the `checked` state to conditionally style the button. */
            <button
              className={`${
                checked ? "bg-blue-600" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  checked ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </button>
          )}
        </Switch>
      </div>
      {/* user details session */}
      <section className="w-full divide-y-2">
        {/* about me division */}
        <div className="flex items-center justify-between md:mx-3 my-3">
          <h1 className="text-3xl font-bold uppercase">About Me</h1>
          <Link to={"/"}>
            <span className="text-blue text-2xl text-blue-500 flex items-center justify-end cursor-pointer my-auto hover:underline">
              Edit <FaUserEdit className="text-blue-500 text-2xl ml-2" />
            </span>
          </Link>
        </div>
        {/* user information division */}
        <div className="gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-black my-3 md:bg-gray-200 md:p-3 rounded-md">
          <h1 className="text-xl tracking-wide flex mt-3">
            <FaUserAlt className="text-blue-600 my-auto text-2xl" /> &emsp;
            <span className="my-auto">{`${user.firstname} ${user.lastname}`}</span>
          </h1>
          <p className="text-tracking-wide text-lg flex items-center  md:my-3">
            <HiBadgeCheck className="text-blue-600 my-auto text-xl" />
            &emsp; Verified Car Dealer
          </p>
          <p className=" text-tracking-wide text-lg flex items-center  md:my-3">
            <IoLocationSharp className="text-blue-600 my-auto text-xl" />
            &emsp; Ikeja, Lagos
          </p>
          <p className=" text-tracking-wide text-lg flex items-center  md:my-3">
            <FcCalendar className="text-blue-600 my-auto text-xl" />
            &emsp; Since {dateYear}
          </p>
          <p className=" text-tracking-wide text-lg flex items-center  md:my-3">
            <HiPhoneIncoming className="text-blue-600 my-auto text-xl" />
            &emsp; {user.phone}
          </p>
          <p className=" text-tracking-wide text-lg flex items-center  md:my-3">
            <FaEnvelope className="text-blue-600 my-auto text-xl" />
            &emsp; {user.email}
          </p>
        </div>
        {/* open to div */}
        <div className="gap-3 flex flex-col text-black">
          <h1 className="text-xl  tracking-wide flex mt-3 uppercase font-bold">
            <MdOutlineElectricalServices className="text-gray-600 my-auto text-2xl" />{" "}
            &nbsp; Open To:
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
            {profileOpenTo.map((option, index) => (
              <label htmlFor="" key={index} className="flex my-3">
                <input
                  type="checkbox"
                  name={option.toLowerCase().split(" ").join()}
                  id=""
                  readOnly
                  value={index}
                  className="my-auto rounded-md border-2 border-gray-500"
                />{" "}
                &emsp;
                <span className="tracking-wide my-auto">{option}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Trade in section */}
        <div className="w-full my-3 p-3">
          <h1 className="w-full text-2xl flex items-center mt-2 mb-3  gap-3 justify-start font-bold uppercase">
            <GiTrade className="md:ml-4 text-3xl" />
            Trading In:{" "}
          </h1>
          <div className="flex flex-wrap items-center justify-start gap-4">
            {tradingIn.map((trade, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-500 rounded-xl  my-auto font-bold text-white tracking-wide"
              >
                {trade}
              </span>
            ))}
          </div>
          <form
            action=""
            id="tradingForm"
            className="w-full px-3 my-3 flex flex-col"
          >
            <input
              name="tradingInput"
              id=""
              cols="30"
              rows="10"
              className="w-full md:w-[80%] border-2 border-gray-400 my-2 rounded-md bg-gray-100 p-1"
              placeholder="Honda, Toyota, Benz, Kia...."
            />
            <div className="flex items-center justify-start">
              <button
                type="submit"
                className="bg-blue-500 text-white px-2 py-1 rounded-md"
              >
                Update Trade In
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Profile;
