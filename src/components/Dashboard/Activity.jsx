import React, { useState } from "react";
import { activitiesSummary, UserData } from "../../utils/basicInfo";
import BarChart from "../Charts/BarChart";
import { Chart as ChartJS } from "chart.js/auto";
import ApexChart from "../Charts/ApexChart";
import { BsChevronRight } from "react-icons/bs";

const Activity = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year), // this is use to represent each bar in the chart, basically the x axis.
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain), // this represent the y axis
        backgroundColor: ["green", "blue", "orange", "red", "yellow"],
        borderColor: ["violet"],
      },
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userLost), // this represent the y axis
        backgroundColor: ["green", "blue", "orange", "red", "yellow"],
        borderColor: ["violet"],
      },
    ],
  });

  return (
    <div className="flex flex-col items-center mt-5">
      {/* header division */}
      <h2 className="text-5xl tracking-wide my-4">Activities</h2>
      {/* summary section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-4 w-full px-4">
        {activitiesSummary.map((activity, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center shadow-lg  rounded-md h-[6rem] md:h-[10rem] border-t-8  border-gray-200 cursor-no-drop`}
          >
            <div className="relative flex">
              <span
                className={`text-2xl md:text-5xl text-green-${activity.colorWeight} bg-gray-100 p-4 rounded-full`}
              >
                {activity.icon}
              </span>
              <span
                className={`absolute -top-1 -right-1 font-semibold font-serif`}
              >
                {activity.post}
              </span>
            </div>
            {/* <p className="flex items-center justify-center mt-5">
                <span
                  className={`p-4 text-4xl text-center  border-${activity.color}-500 border-[10px] rounded-full  bg-white`}
                >
                  {activity.post}
                </span>
              </p> */}
            <h1 className="hidden md:flex text-sm text-center mt-4 font-semibold tracking-wide">
              {activity.title}
            </h1>
          </div>
        ))}
      </div>
      {/* the chart section */}
      <div className="w-[243px] md:w-full overflow-auto">
        {/* <Bar options={options} data={data} /> */}
        {/* <BarChart chartData={userData} /> */}
        <ApexChart chartData={activitiesSummary} />
      </div>
      {/* the below section */}
      <div className="w-full gap-6 flex flex-col  items-end justify-center ml-auto  ">
        <p className="bg-yellow-400 flex items-center justify-center px-2 cursor-pointer group">
          <span className="bg-white p-2 rounded-xl flex flex-col items-center justify-center m-3 ">
            <span className="text-lg md:text-2xl">20</span>
            <span className="text-sm md:text-xl text-center">Requests</span>
          </span>{" "}
          &nbsp;{" "}
          <span className="text-lg md:text-2xl flex items-center group-hover:text-white group-hover:font-bold ">
            Cars & Vehicle Request &emsp; <BsChevronRight />
          </span>
        </p>

        <p className="bg-yellow-400 flex items-center justify-center px-2 cursor-pointer group">
          <span className="bg-white p-2 rounded-xl flex flex-col items-center justify-center m-3 ">
            <span className="text-lg md:text-2xl">40</span>
            <span className="text-sm md:text-xl text-center">Hot Deals</span>
          </span>{" "}
          &nbsp;{" "}
          <span className="text-lg md:text-2xl flex items-center group-hover:text-white group-hover:font-bold ">
            Hottest Deals are waiting &nbsp; <BsChevronRight />
          </span>
        </p>
      </div>
    </div>
  );
};

export default Activity;
