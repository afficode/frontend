import React from "react";
import { Card } from "flowbite-react";
import { faCirclePlus, faHandshake, faSearch, faPlay, faHourglassStart, faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

const Setup = () => {
  return (
    <section className="bg-gradient-to-r from-green-200 via-green-400 to-green-300">
      <div className="flex items-center justify-between p-3 ">
        <motion.div
          whileTap={{ scale: 1.2 }}
          className="h-[120px] w-[120px] flex flex-col bg-gradient-to-r from-yellow-300 to-yellow-400 p-3 cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="my-auto text-5xl text-green-400 drop-shadow-2xl"
          />{" "}
          <p className="my-3 text-sm font-semibold text-center">
            Post a Request
          </p>
        </motion.div>
        <motion.div
          whileTap={{ scale: 1.2 }}
          className="h-[120px] w-[120px] flex flex-col bg-gradient-to-r from-yellow-300 to-yellow-400 p-3 cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="my-auto text-5xl text-green-400 drop-shadow-2xl"
          />{" "}
          <p className="my-3 text-sm text-center font-semibold">Post a Deal</p>
        </motion.div>
      </div>
      <div className="w-full p-4">
        <div className="lg:w-[90%] mx-auto lg:flex lg:items-center lg:justify-between md:grid md:grid-cols-2 md:gap-6 ">
          <div className="lg:max-w-[25%] my-2 max-w-[80%] mx-auto">
            <Card>
              <h5 className="text-3xl font-bold tracking-tight text-gray-900 text-center dark:text-white">
                For Sales
              </h5>
              <img
                src="https://flowbite.com/docs/images/blog/image-1.jpg"
                alt=""
              />
              <p className="font-semibold text-gray-700 text-center dark:text-gray-400">
                Buy, Sell and Make Money on Isowo.ng. Genuine products awaits
                you.
              </p>
              <motion.a
                whileHover={{ scale: 1.1 }}
                initial={{ y: "50%" }}
                animate={{ y: "0" }}
                transition={{ duration: 0.4}}
                href="#"
                className="bg-yellow-400 py-2 text-center text-md font-bold text-black cursor-pointer hover:bg-yellow-500 hover:text-white transition ease-in-out delay-100 duration-200 shadow-2xl rounded-full">
                Transact Now &nbsp; <FontAwesomeIcon
                icon={faHandshake}
                className="my-auto text-lg "
              />{" "}
              </motion.a>
            </Card>
          </div>
          <div className="lg:max-w-[25%] lg:-mt-[17%] my-2 max-w-[80%] mx-auto">
            <Card>
              <h5 className="text-3xl font-bold tracking-tight text-gray-900 text-center dark:text-white">
                Services
              </h5>
              <img
                src="https://flowbite.com/docs/images/blog/image-1.jpg"
                alt=""
              />
              <p className="font-semibold text-gray-700 text-center dark:text-gray-400">
                Hire verified professionals for all your services needs Today!
              </p>
              <motion.a
                whileHover={{ scale: 1.1 }}
                initial={{ y: "50%" }}
                animate={{ y: "0" }}
                transition={{ duration: 0.4}}
                href="#"
                className="bg-yellow-400 py-2 text-center text-md font-bold text-black cursor-pointer hover:bg-yellow-500 hover:text-white transition ease-in-out delay-100 duration-200 shadow-2xl rounded-full"
              >
                Search Now &nbsp; <FontAwesomeIcon
                icon={faSearch}
                className="my-auto text-md "
              />{" "}
              </motion.a>
            </Card>
          </div>
          <div className="lg:max-w-[25%] lg:-mt-[17%] my-2 max-w-[80%] mx-auto">
            <Card>
              <h5 className="text-3xl font-bold tracking-tight text-gray-900 text-center dark:text-white">
                Property
              </h5>
              <img
                src="https://flowbite.com/docs/images/blog/image-1.jpg"
                alt=""
              />
              <p className="font-semibold text-gray-700 text-center dark:text-gray-400">
                Buy, Rent and lease property. Also, find verified agents near
                you, across Nigeria.
              </p>
              <motion.a
                whileHover={{ scale: 1.1 }}
                initial={{ y: "50%" }}
                animate={{ y: "0" }}
                transition={{ duration: 0.4}}
                href="#"
                className="bg-yellow-400 py-2 text-center text-md font-bold text-black cursor-pointer hover:bg-yellow-500 hover:text-white transition ease-in-out delay-100 duration-200 shadow-2xl rounded-full"
              >
                Start Now  &nbsp; <FontAwesomeIcon
                icon={faPlay}
                className="my-auto text-md "
              />{" "}
              </motion.a>
            </Card>
          </div>

          <div className="lg:max-w-[25%] my-2 max-w-[80%] mx-auto">
            <Card>
              <h5 className="text-3xl font-bold tracking-tight text-gray-900 text-center dark:text-white">
                Cars & Vehicles
              </h5>
              <img
                src="https://flowbite.com/docs/images/blog/image-1.jpg"
                alt=""
              />
              <p className="font-semibold text-gray-700 text-center dark:text-gray-400">
                Find thousands of vehicles and automobiles as Buyer, Seller and
                a Dealer.
              </p>
              <motion.a
                whileHover={{ scale: 1.1 }}
                initial={{ y: "50%" }}
                animate={{ y: "0" }}
                transition={{ duration: 0.4}}
                href="#"                
                className="bg-yellow-400 py-2 text-center text-md font-bold text-black cursor-pointer hover:bg-yellow-500 hover:text-white transition ease-in-out delay-100 duration-200 shadow-2xl rounded-full"
              >
                Explore Now  &nbsp; <FontAwesomeIcon
                icon={faHourglassStart}
                className="my-auto text-md "
              />{" "}
              </motion.a>
            </Card>
          </div>
        </div>
        <div className="w-[70%] lg:w-[40%] mx-auto text-center lg:-mt-[5%] lg:mb-10 md:mt-3 sm:mt-3">
          <a
            href="/"
            className="bg-yellow-400 p-4 text-center block hover:text-2xl text-xl font-bold text-black cursor-pointer hover:bg-yellow-500 hover:text-white transition ease-in-out delay-100 duration-200 shadow-2xl rounded-full"
          >
           Set Up a Shop Today! &nbsp; <FontAwesomeIcon
                icon={faStore}
                className="my-auto text-md "
              />{" "}
          </a>
        </div>
      </div>
    </section>
  );
};
export default Setup;
