import React from "react";
import { Tab } from "@headlessui/react";
import { ImUserPlus } from "react-icons/im";
import { BiLogIn } from "react-icons/bi";
import Login from "../Desktop/Login";
import Register from "../Desktop/Register";

const MobileAuth = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="w-full  px-2 py-16 ">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-green-400/50 p-1 gap-2">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-lg font-bold tracking-wider leading-5 text-green-600",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2 flex items-center justify-center",
                selected
                  ? "bg-green-600 shadow text-black"
                  : "text-green-500 hover:bg-white hover:text-green-600"
              )
            }
          >
            Register &nbsp;{" "}
            <span className="bg-gray-100 shadow-xl rounded-full p-2">
              <ImUserPlus className="text-lg text-green-500" />
            </span>
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-lg py-2.5 text-lg font-bold tracking-wider leading-5 text-green-600",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2 flex items-center justify-center",
                selected
                  ? "bg-green-600 shadow text-black"
                  : "text-green-500 hover:bg-white hover:text-green-600"
              )
            }
          >
            Login &nbsp;{" "}
            <span className="bg-gray-100 shadow-xl rounded-full p-2">
              <BiLogIn className="text-lg text-green-500" />
            </span>
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={
              "rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2 px-2"
            }
          >
            <Register />
          </Tab.Panel>
          <Tab.Panel
            className={
              "rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2 px-2"
            }
          >
            <Login />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default MobileAuth;
