import React from "react";
import ChangePassword from "../Forms/ChangePassword";

const Security = () => {
  return (
    <div className="flex flex-col mt-5 divide-gray-300  items-start justify-start w-full lg:w-[90%] xl:w-[70%] mx-auto">
      <h1 className="text-xl md:text-4xl tracking-wide font-bold mt-3 p-2">
        Security
      </h1>
      <hr className="bg-gray-500 mx-auto w-full" />
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <div className="w-full bg-gray-400 text-left p-3 text-lg font-semibold md:tracking-wide md:text-xl">
          Change Password
        </div>
        <div className="w-full mx-auto">
          <ChangePassword />
        </div>
        <div className="w-full bg-gray-400 text-left p-3 text-lg md:text-xl font-semibold md:tracking-wide my-3">
          Setting Up Extra Security
        </div>
        <div className="">
          <form
            action=""
            className="ml-0 md:ml-3 flex flex-col items-center justify-start w-full"
          >
            <div className="flex items-center justify-between w-full">
              <span className="">
                Get Notification about unrecognized logins:
              </span>
              <input type="checkbox" name="unknownlogins" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Security;
