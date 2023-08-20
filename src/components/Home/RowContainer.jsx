import React from "react";
import { HiStar, HiOutlineStar } from "react-icons/hi";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
  faForward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const RowContainer = ({ title, linkText, linkAddress, buttonText }) => {
  //
  return (
    <>
      <div className="md:w-[90%] lg:w-[80%] mx-auto bg-gradient-to-r from-white via-green-200 to-white py-2 relative">
        <p className="text-center pt-3 ">
          <span className="text-3xl font-bold my-auto"> {title} </span>
          <Link to={linkAddress}>
            <span className="float-right pr-4 text-green-600 cursor-pointer font-semibold antialiased flex items-end transition ease-in-out hover:scale-90 hover:text-yellow-400 hover:drop-shadow-xl hover:shadow-green-600">
              {linkText} &nbsp;
              <FontAwesomeIcon icon={faForward} className=" text-xl" />{" "}
            </span>
          </Link>
        </p>
      </div>
      <div className="md:w-[90%] lg:w-[80%] mx-auto bg-green-100 lg:p-2 md:p-3 rounded-xl">
        <div className="flex items-center justify-between gap-4">
          <motion.div
            whileHover={{ scale: 0.8 }}
            whileTap={{ scale: 1.5 }}
            id="left"
          >
            <FontAwesomeIcon
              icon={faCircleChevronLeft}
              className="my-auto text-4xl text-yellow-300 cursor-pointer hover:pl-1"
            />{" "}
          </motion.div>
          <div className="w-full mx-auto overflow-x-auto" id="center">
            <div className="p-3 flex  gap-4 ">
              <div className="relative min-w-[200px] min-h-[200px] max-w-[200px] max-h-[200px]">
                <img
                  src="https://flowbite.com/docs/images/blog/image-1.jpg"
                  alt=""
                  className=" object-bottom min-w-[200px] min-h-[200px] rounded-2xl"
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between text-center text-white drop-shadow-xl">
                  <div className=" antialiased">
                    <h2 className="font-bold text-xl text-black">
                      Firsts Cars
                    </h2>
                    <p className="font-semibold text-lg text-black">
                      [40 Cars]
                    </p>
                    <p className="flex items-center justify-center text-yellow-400 text-3xl drop-shadow-xl">
                      <HiStar />
                      <HiStar />
                      <HiStar />
                      <HiOutlineStar />
                      <HiOutlineStar />
                    </p>
                  </div>
                  <div className="mb-3">
                    <a
                      href="/"
                      className="antialiased rounded-md px-4 py-2 bg-green-600 font-semibold"
                    >
                      {buttonText}
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative min-w-[200px] min-h-[200px] max-w-[200px] max-h-[200px]">
                <img
                  src="https://flowbite.com/docs/images/blog/image-1.jpg"
                  alt=""
                  className=" object-bottom min-w-[200px] min-h-[200px] rounded-2xl"
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between text-center text-white drop-shadow-xl">
                  <div className=" antialiased">
                    <h3 className="font-bold text-xl text-black">
                      Jokals Cars
                    </h3>
                    <p className="font-semibold text-lg text-black">
                      [40 Cars]
                    </p>
                    <p className="flex items-center justify-center text-yellow-400 text-3xl drop-shadow-xl">
                      <HiStar />
                      <HiStar />
                      <HiStar />
                      <HiOutlineStar />
                      <HiOutlineStar />
                    </p>
                  </div>
                  <div className="mb-3">
                    <a
                      href="/"
                      className="antialiased rounded-md px-4 py-2 bg-green-600 font-semibold"
                    >
                      {buttonText}
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative min-w-[200px] min-h-[200px] max-w-[200px] max-h-[200px]">
                <img
                  src="https://flowbite.com/docs/images/blog/image-1.jpg"
                  alt=""
                  className=" object-bottom min-w-[200px] min-h-[200px] rounded-2xl"
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between text-center text-white drop-shadow-xl">
                  <div className=" antialiased">
                    <h3 className="font-bold text-xl text-black">
                      Jokals Cars
                    </h3>
                    <p className="font-semibold text-lg text-black">
                      [40 Cars]
                    </p>
                    <p className="flex items-center justify-center text-yellow-400 text-3xl drop-shadow-xl">
                      <HiStar />
                      <HiStar />
                      <HiStar />
                      <HiOutlineStar />
                      <HiOutlineStar />
                    </p>
                  </div>
                  <div className="mb-3">
                    <a
                      href="/"
                      className="antialiased rounded-md px-4 py-2 bg-green-600 font-semibold"
                    >
                      {buttonText}
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative w-[200px] h-[200px] max-w-[200px] max-h-[200px]">
                <img
                  src="https://flowbite.com/docs/images/blog/image-1.jpg"
                  alt=""
                  className=" object-bottom min-w-[200px] min-h-[200px] rounded-2xl"
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between text-center text-white drop-shadow-xl">
                  <div className=" antialiased">
                    <h3 className="font-bold text-xl text-black">
                      Jokals Cars
                    </h3>
                    <p className="font-semibold text-lg text-black">
                      [40 Cars]
                    </p>
                    <p className="flex items-center justify-center text-yellow-400 text-3xl drop-shadow-xl">
                      <HiStar />
                      <HiStar />
                      <HiStar />
                      <HiOutlineStar />
                      <HiOutlineStar />
                    </p>
                  </div>
                  <div className="mb-3">
                    <a
                      href="/"
                      className="antialiased rounded-md px-4 py-2 bg-green-600 font-semibold"
                    >
                      {buttonText}
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative min-w-[200px] min-h-[200px] max-w-[200px] max-h-[200px]">
                <img
                  src="https://flowbite.com/docs/images/blog/image-1.jpg"
                  alt=""
                  className=" object-bottom min-w-[200px] min-h-[200px] rounded-2xl"
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between text-center text-white drop-shadow-xl">
                  <div className=" antialiased">
                    <h3 className="font-bold text-xl text-black">
                      Jokals Cars
                    </h3>
                    <p className="font-semibold text-lg text-black">
                      [40 Cars]
                    </p>
                    <p className="flex items-center justify-center text-yellow-400 text-3xl drop-shadow-xl">
                      <HiStar />
                      <HiStar />
                      <HiStar />
                      <HiOutlineStar />
                      <HiOutlineStar />
                    </p>
                  </div>
                  <div className="mb-3">
                    <a
                      href="/"
                      className="antialiased rounded-md px-4 py-2 bg-green-600 font-semibold"
                    >
                      {buttonText}
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative min-w-[200px] min-h-[200px] max-w-[200px] max-h-[200px]">
                <img
                  src="https://flowbite.com/docs/images/blog/image-1.jpg"
                  alt=""
                  className=" object-bottom min-w-[200px] min-h-[200px] rounded-2xl"
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between text-center text-white drop-shadow-xl">
                  <div className=" antialiased">
                    <h3 className="font-bold text-xl text-black">
                      Jokals Cars
                    </h3>
                    <p className="font-semibold text-lg text-black">
                      [40 Cars]
                    </p>
                    <p className="flex items-center justify-center text-yellow-400 text-3xl drop-shadow-xl">
                      <HiStar />
                      <HiStar />
                      <HiStar />
                      <HiOutlineStar />
                      <HiOutlineStar />
                    </p>
                  </div>
                  <div className="mb-3">
                    <a
                      href="/"
                      className="antialiased rounded-md px-4 py-2 bg-green-600 font-semibold"
                    >
                      {buttonText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 0.8 }}
            whileTap={{ scale: 1.5 }}
            id="right"
          >
            <FontAwesomeIcon
              icon={faCircleChevronRight}
              className="my-auto text-4xl text-yellow-300  cursor-pointer hover:pr-1"
            />{" "}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default RowContainer;
