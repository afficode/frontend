import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaChevronCircleLeft } from "react-icons/fa";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { settingOption } from "../../utils/basicInfo";

const DashboardIndex = () => {
  const [expandSidebar, setExpandSideBar] = useState("false");
  const toggleSidebar = () => {
    if (expandSidebar === "false") {
      setExpandSideBar("true");
    } else {
      setExpandSideBar("false");
    }
  };

  return (
    <>
      <div className="w-full p-2">
        <div className="w-full md:w-[90%] lg:w-[80%] mx-auto flex flex-col py-4">
          {/* this is the below of the dashboard */}
          <div className="flex flex-col">
            {/* this is the below div with the sidebar and the main dashboard information */}
            <div className="w-full gap-3 relative flex my-4">
              {/* sidebar */}
              <div
                className={`${
                  expandSidebar === "true"
                    ? "w-72 rounded-xl z-10 "
                    : "w-20 rounded-lg"
                }  min-h-screen bg-gray-200 duration-300`}
              >
                {/* HOusing the whole sidebar links */}
                <div className="flex flex-col items-center justify-start mt-8">
                  {/* this house the user image and name */}
                  {settingOption &&
                    settingOption.map((option, index) => (
                      <div className="w-full" key={index}>
                        {option.id === 7 && (
                          <hr className="border-gray-400 w-[80%] mx-auto my-5 border-2 rounded-full" />
                        )}
                        <Link
                          to={option.link}
                          key={index}
                          className={`flex my-2 group items-center justify-start cursor-pointer ${
                            option.id >= 7
                              ? " py-2 rounded-sm bg-white mx-4 hover:bg-red-700 hover:rounded-lg"
                              : "hover:bg-green-600"
                          } ${
                            option.id >= 7 && expandSidebar === "false"
                              ? "py-2 pl-2 rounded-lg"
                              : "p-4"
                          }`}
                        >
                          <span
                            className={`text-3xl  font-bold  group-hover:text-white ${
                              option.id >= 7
                                ? " text-black ml-0 "
                                : "text-gray-500 ml-2"
                            } `}
                          >
                            {option.icon}
                          </span>{" "}
                          &emsp;{" "}
                          {expandSidebar === "true" && (
                            <span className="capitalize font-bold group-hover:text-gray-100 tracking-wide duration-300">
                              {option.name}
                            </span>
                          )}
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
              {/* sidebar trigger left-[4.4rem] */}
              <FaChevronCircleLeft
                className={`${
                  expandSidebar === "false"
                    ? "left-[4.4rem] text-xl text-gray-500 shadow-2xl hover:text-green-500 hover:scale-150 rotate-180 duration-300"
                    : "left-[17.1rem] text-3xl"
                } absolute top-4  cursor-pointer duration-300`}
                onClick={toggleSidebar}
              />
              {/* content page */}
              <main className="p-4 w-full">
                <Outlet />
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardIndex;
