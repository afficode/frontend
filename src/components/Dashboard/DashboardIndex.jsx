import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaRegEnvelope,
  FaCalendarAlt,
  FaChevronCircleLeft,
} from "react-icons/fa";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { Avatar } from "flowbite-react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker, DateRange } from "react-date-range";
import format from "date-fns/format";
import { addDays } from "date-fns";
import { dashboardOption } from "../../utils/basicInfo";

const DashboardIndex = () => {
  const [range, setRange] = useState([
    {
      startDate: addDays(new Date(), -30),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [open, setOpen] = useState("false");
  const [expandSidebar, setExpandSideBar] = useState("false");
  const toggleSidebar = () => {
    if (expandSidebar === "false") {
      setExpandSideBar("true");
    } else {
      setExpandSideBar("false");
    }
  };
  const revealDate = () => {
    if (open === "false") {
      setOpen("true");
    } else {
      setOpen("false");
    }
  };

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // //console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    // //console.log(refOne.current)
    // //console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <>
      <div className="w-full p-2">
        <div className="w-full md:w-[90%] lg:w-[80%] mx-auto flex flex-col py-4">
          {/* This is the top with dashboard with notification */}
          <div className="flex justify-between p-3 my-auto">
            <h2 className="tracking-wide text-2xl lg:text-4xl ">Dashboard</h2>
            <div className="pr-4 justify-between gap-10 flex">
              <div className="cursor-pointer">
                <span className="relative group">
                  <FaRegEnvelope className="text-xl lg:text-4xl absolute group-hover:bg-gray-200 group-hover:p-1 group-hover:scale-105 group-hover:rounded-xl" />
                  <span className="relative text-[0.6rem] lg:text-[1rem] p-1 -top-3 left-6   bg-green-500 text-white rounded-full font-bold">
                    23
                  </span>
                </span>
              </div>
              <div className="cursor-pointer">
                <span className="relative group">
                  <MdOutlineNotificationsActive className="text-xl lg:text-4xl absolute  group-hover:bg-gray-200 group-hover:p-1 group-hover:scale-105 group-hover:rounded-xl" />
                  <span className="relative text-[0.6rem] lg:text-[1rem] p-1 -top-3 left-6  bg-red-500 text-white rounded-full font-bold">
                    4
                  </span>
                </span>
              </div>
              <div className="hidden md:flex pr-3 my-auto font-semibold tracking-wide text-2xl">
                <Avatar
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded={true}
                />
              </div>
            </div>
          </div>
          <hr className="w-full md:w-[70%] bg-gray-400 rounded-full my-3 mx-auto" />
          {/* this is the below of the dashboard */}
          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-end p-1 md:p-4">
              {/* this is the div for the top of the second portion with the date */}
              <div className=" pr-4 w-full ">
                <p
                  readOnly
                  className="text-[0.75rem] md:text-lg lg:text-xl p-1 lg:p-3 font-semibold flex float-right text-right cursor-pointer outline-none bg-gray-300 border-b-2 border-gray-500"
                  // onClick={() => setOpen((open) => !open)}
                  onClick={revealDate}
                >
                  {`${format(
                    range[0].startDate,
                    "E, do LLLL, yyyy"
                  )} - ${format(range[0].endDate, "E, do LLLL, yyyy")}`}{" "}
                  &emsp;
                  <FaCalendarAlt className="my-auto" />
                </p>
              </div>
              {open === "true" && (
                <div className="relative w-full">
                  <div
                    className="z-10 absolute top-0 mt-2 right-0"
                    ref={refOne}
                  >
                    {/* this is for the mobile view */}
                    <div className="block md:hidden lg:hidden">
                      <DateRange
                        ranges={range}
                        onChange={(item) => setRange([item.selection])}
                        maxDate={new Date()}
                        months={2}
                        rangeColors={["green"]}
                        direction="vertical"
                        className="ml-auto pr-4"
                      />
                    </div>
                    {/* this is for tablet view */}
                    <div className="hidden md:block lg:hidden">
                      <DateRange
                        ranges={range}
                        onChange={(item) => setRange([item.selection])}
                        maxDate={new Date()}
                        months={2}
                        rangeColors={["green"]}
                        direction="horizontal"
                        className="ml-auto pr-4"
                      />
                    </div>
                    {/* this is for desktop view */}
                    <div className="hidden lg:block">
                      <DateRangePicker
                        ranges={range}
                        onChange={(item) => setRange([item.selection])}
                        maxDate={new Date()}
                        months={2}
                        rangeColors={["green"]}
                        direction="horizontal"
                        className="ml-auto pr-4"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
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
                  <div
                    id="userInfo"
                    className="flex flex-col items-center justify-center"
                  >
                    <div id="avatar" className="mt-4 mx-auto ">
                      <Avatar
                        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        rounded={true}
                        //bordered={true}
                        status="online"
                        statusPosition="top-right"
                        size={expandSidebar === "false" ? "md" : "xl"}
                        // placeholderInitials="SC"
                      />
                    </div>
                    <p
                      id="userName"
                      className={`my-4 font-semibold text-center ${
                        expandSidebar === "false"
                          ? "text-lg"
                          : " text-2xl tracking-wide"
                      } `}
                    >
                      Samuel Chika
                    </p>
                  </div>
                  {/* Divider */}
                  <hr className="border border-gray-400 w-[80%] mx-auto mb-3" />
                  {dashboardOption &&
                    dashboardOption.map((option, index) => (
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
