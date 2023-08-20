import React from "react";
import Notifications from "../Forms/Notifications";

const Notification = () => {
  return (
    <div className="flex flex-col mt-5 divide-gray-300  items-start justify-start w-full lg:w-[90%] xl:w-[70%] mx-auto">
      <h1 className="text-xl md:text-4xl tracking-wide font-bold mt-3 p-2">
        Notification Settings
      </h1>
      <hr className="bg-gray-500 mx-auto w-full" />
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <h2 className="text-xl  md:text-2xl w-full text-left p-3">
          Please state what notifications to recevie
        </h2>
        <Notifications />
      </div>
    </div>
  );
};

export default Notification;
