import React, { useState } from "react";
import { FaRegEdit, FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import BusinessUpdate from "../Forms/BusinessUpdate";

const MyDetails = () => {
  const [businessAddress, setBusinessAddress] = useState("false");
  const [businessTel, setBusinessTel] = useState("false");

  return (
    <div className="flex flex-col mt-5 divide-gray-300  items-start justify-start w-full lg:w-[90%] xl:w-[70%] mx-auto">
      <h1 className="text-xl md:text-4xl tracking-wide font-bold mt-3 p-2">
        My Details
      </h1>
      <hr className="bg-gray-500 mx-auto w-full" />
      <div className="w-full flex flex-col items-center justify-center gap-2">
        {/* Fullname */}
        <div className="flex w-full justify-between mt-4 md:mt-2">
          <label
            htmlFor=""
            className="w-full md:text-xl lg:font-bold border-r-2 border-gray-200 text-[0.7rem] pr-2 mr-3 font-bold md:font-normal"
          >
            Fullname:
          </label>
          <p className="w-full  text-black tracking-wide my-auto md:text-2xl  text-[0.7rem] font-bold md:font-normal">
            Adeola Lawal
          </p>
        </div>
        <hr className="bg-gray-500 mx-auto w-full" />
        {/* Login Email */}
        <div className="flex w-full justify-between">
          <label
            htmlFor=""
            className="w-full text-[0.7rem] font-bold md:font-normal md:text-xl lg:font-bold border-r-2 border-gray-200 mr-3 pr-2"
          >
            Login Email
          </label>
          <p className="w-full text-[0.7rem] text-black tracking-wide my-auto md:text-2xl font-bold md:font-normal">
            sijua*****@yahoo.com
          </p>
        </div>
        <hr className="bg-gray-500 w-full" />
        {/* Password */}
        <div className="flex w-full justify-between">
          <label
            htmlFor=""
            className="w-full text-[0.7rem] font-bold md:font-normal md:text-xl lg:font-bold border-r-2 border-gray-200 mr-3 pr-2"
          >
            Username:
          </label>
          <p className="w-full text-black tracking-wide text-left my-auto md:text-2xl text-[0.7rem] pr-2 mr-3 font-bold md:font-normal">
            isowo.ng/adeolalawal
          </p>
        </div>
        <hr className="bg-gray-500 mx-auto w-full" />
        {/* Business Tel */}
        <BusinessUpdate />
      </div>
    </div>
  );
};

export default MyDetails;
