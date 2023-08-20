import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaWhatsapp,
  FaHandHoldingWater,
  FaPassport,
  FaReadme,
  FaPhone,
} from "react-icons/fa";
import { GrResources } from "react-icons/gr";
import { FcPrivacy } from "react-icons/fc";
import { MdSupportAgent } from "react-icons/md";
import { NavbarContext } from "../../context/NavbarProvider";

const Below = () => {
  const { resetAllDiv } = useContext(NavbarContext);
  return (
    <footer
      onMouseEnter={() => resetAllDiv()}
      onClick={() => resetAllDiv()}
      className="flex flex-col w-full bg-gray-100"
    >
      <form
        action=""
        className="mb-4 flex flex-col items-center justify-center mx-auto w-full xl:w-[80%]"
        id="newsletter"
      >
        <h2 className="text-lg sm:text-xl uppercase text-gray-700 my-3">
          Subscribe to our newsletter
        </h2>
        <div className="relative flex items-center text-gray-400 focus-within:text-lg">
          <FaEnvelope className="h-6 w-6 absolute ml-3 pointer-events-none text-gray-600" />
          <input
            type="email"
            name=""
            id=""
            placeholder="email@email.com"
            className="pr-[7.0rem] pl-10 rounded-r-md placeholder-gray-400 bg-gray-300 text-black"
          />
          <button
            className="absolute right-0 bg-green-500 p-2 pl-3 rounded-r-md text-white font-bold text-lg "
            type="submit"
          >
            Subscribe
          </button>
        </div>
      </form>

      <div className="lg:grid lg:grid-cols-2 md:flex md:flex-col gap-2 px-4 py-2 mb-2 w-full p-3 xl:p-0 xl:w-[90%] m-auto ">
        <div className="text-justify px-3 " id="left">
          <h2 className="sm:text-lg lg:text-xl xl:text-2xl font-bold text-lg text-center sm:text-left">
            Transact with peace of mind on{" "}
            <span className="sm:inline hidden"> &nbsp; </span>{" "}
            <span className="text-yellow-400">isowo.ng</span>
          </h2>
          <p className="text-justify sm:text-lg antialiased tracking-wide text-md">
            Indigenous platform for listing; services, cars and vehicle,
            properties, own an online shop-saving you from the hassle of site
            building, Agency freelancing and enlisting items (good and products)
            for transactional purposes.
          </p>
        </div>
        <hr className="lg:hidden md:block sm:block w-[60%] my-3 m-auto bg-gray-200 h-1 rounded-full" />
        <div
          id="right"
          className="w-full gap-[4rem] flex justify-center items-start"
        >
          <div className="flex flex-col gap-4 text-xs md:text-lg ">
            <h2 className="font-bold undeline uppercase tracking-tighter">
              Who are we?
            </h2>
            <p className="">
              <Link
                to={"/"}
                className="font-semibold sm:font-normal hover:text-yellow-600 hover:drop-shadow-2xl"
              >
                <FaHandHoldingWater className="sm:inline hidden lg:block xl:inline " />{" "}
                <span className="sm:inline hidden">
                  {" "}
                  <span className="sm:inline hidden lg:hidden">
                    &nbsp;
                  </span>{" "}
                </span>{" "}
                About Us
              </Link>
            </p>
            <p className="">
              <Link
                to={"/"}
                className="font-semibold sm:font-normal  hover:text-red-500"
              >
                <FaPassport className="sm:inline hidden  lg:block xl:inline" />{" "}
                <span className="sm:inline hidden ">
                  {" "}
                  <span className="sm:inline hidden lg:hidden">
                    &nbsp;
                  </span>{" "}
                </span>{" "}
                Our Portfolio
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-4 text-xs md:text-lg">
            <h2 className="font-bold undeline uppercase tracking-tighter">
              Contact Us
            </h2>
            <p className="">
              <Link
                to={"tel:+1123-456-7890"}
                className="font-semibold sm:font-normal hover:text-yellow-600 hover:drop-shadow-2xl"
              >
                <FaPhone className="sm:inline hidden" />{" "}
                <span className="sm:inline hidden ">
                  {" "}
                  <span className="sm:inline hidden lg:hidden">
                    &nbsp;
                  </span>{" "}
                </span>{" "}
                +1123-456-7890
              </Link>
            </p>
            <p className="">
              <Link
                to={"/"}
                className="font-semibold sm:font-normal hover:text-red-500"
              >
                <FaEnvelope className="sm:inline hidden " />{" "}
                <span className="sm:inline hidden">
                  {" "}
                  <span className="sm:inline hidden lg:hidden">
                    &nbsp;
                  </span>{" "}
                </span>{" "}
                isowo@isowo.com
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-4 text-xs md:text-lg">
            <h2 className="font-bold undeline uppercase">Legal & Policy</h2>
            <p className="">
              <Link
                to={"/"}
                className="font-semibold sm:font-normal hover:text-yellow-600 hover:drop-shadow-2xl"
              >
                <GrResources className="sm:inline hidden lg:block xl:inline" />{" "}
                <span className="sm:inline hidden">
                  {" "}
                  <span className="sm:inline hidden lg:hidden">
                    &nbsp;
                  </span>{" "}
                </span>{" "}
                Broker Resources
              </Link>
            </p>
            <p className="">
              <Link
                to={"/"}
                className="font-semibold sm:font-normal hover:text-red-500"
              >
                <FcPrivacy className="sm:inline hidden lg:block xl:inline" />{" "}
                <span className="sm:inline hidden">
                  {" "}
                  <span className="sm:inline hidden lg:hidden">
                    &nbsp;
                  </span>{" "}
                </span>{" "}
                Privacy Policy
              </Link>
            </p>
            <p className="">
              <Link
                to={"/"}
                className="font-semibold sm:font-normal hover:text-red-500"
              >
                <MdSupportAgent className="sm:inline hidden lg:block xl:inline" />{" "}
                <span className="sm:inline hidden">
                  {" "}
                  <span className="sm:inline hidden lg:hidden">
                    &nbsp;
                  </span>{" "}
                </span>{" "}
                Agency Resources
              </Link>
            </p>
            <p className="">
              <Link
                to={"/"}
                className="font-semibold sm:font-normal hover:text-green-400"
              >
                <FaReadme className="sm:inline hidden lg:block xl:inline" />{" "}
                <span className="sm:inline hidden">
                  {" "}
                  <span className="sm:inline hidden lg:hidden">
                    &nbsp;
                  </span>{" "}
                </span>{" "}
                Terms of Use
              </Link>
            </p>
          </div>
        </div>
      </div>
      <hr className="w-[60%] m-auto bg-gray-200 h-1 rounded-full" />
      <div className="w-[60%] m-auto py-3" id="copyright">
        <div className="w-full flex items-center justify-between sm:flex-row flex-col gap-3 sm:gap-0">
          <p className="text-black font-bold">
            {" "}
            &copy; 2022, All rights reserved{" "}
            <span className="font-bold ">&trade;</span>.
          </p>
          <div className="flex items-center justify-center pb-3 gap-4">
            <span className="hover:shadow-2xl hover:shadow-gray-500 hover:bg-white  rounded-full hover:p-2">
              <Link to={"/"}>
                <FaFacebook className="text-2xl text-blue-700" />
              </Link>
            </span>

            <span className="hover:shadow-2xl hover:shadow-gray-500 hover:bg-white  rounded-full hover:p-2">
              <Link to={"/"}>
                <FaInstagram className="text-2xl text-yellow-400" />
              </Link>
            </span>

            <span className="hover:shadow-2xl hover:shadow-gray-500 hover:bg-white  rounded-full hover:p-2">
              <Link to={"/"}>
                <FaTwitter className="text-2xl text-blue-400" />
              </Link>
            </span>

            <span className="hover:shadow-2xl hover:shadow-gray-500 hover:bg-white  rounded-full hover:p-2">
              <Link to={"/"}>
                <FaWhatsapp className="text-2xl text-green-400" />
              </Link>
            </span>

            <span className="hover:shadow-2xl hover:shadow-gray-500 hover:bg-white  rounded-full hover:p-2">
              <Link to={"/"}>
                <FaEnvelope className="text-2xl text-red-400" />
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Below;
