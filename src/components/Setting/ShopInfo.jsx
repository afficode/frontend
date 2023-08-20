import React from "react";
import BusinessUpdate from "../Forms/BusinessUpdate";

const ShopInfo = () => {
  return (
    <div className="flex flex-col mt-5 divide-gray-300  items-start justify-start w-full lg:w-[90%] xl:w-[70%] mx-auto">
      <h1 className="text-xl md:text-4xl tracking-wide font-bold mt-3 p-2">
        Shop Information
      </h1>
      <hr className="bg-gray-500 mx-auto w-full" />
      <div className="w-full flex flex-col items-center justify-center gap-2">
        {/* Username */}
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
        {/* Login Email */}
        <div className="flex w-full justify-between">
          <label
            htmlFor=""
            className="w-full text-[0.7rem] font-bold md:font-normal md:text-xl lg:font-bold border-r-2 border-gray-200 mr-3 pr-2"
          >
            Business Email
          </label>
          <p className="w-full text-[0.7rem] text-black tracking-wide my-auto md:text-2xl font-bold md:font-normal">
            sijua*****@yahoo.com
          </p>
        </div>
        <hr className="bg-gray-500 w-full" />
        {/* Number of shops */}
        <div className="flex w-full justify-between">
          <label
            htmlFor=""
            className="w-full text-[0.7rem] font-bold md:font-normal md:text-xl lg:font-bold border-r-2 border-gray-200 mr-3 pr-2"
          >
            Number of shops:
          </label>
          <p className="w-full text-black tracking-wide text-left my-auto md:text-2xl text-[0.7rem] pr-2 mr-3 font-bold md:font-normal">
            2
          </p>
        </div>
        <hr className="bg-gray-500 mx-auto w-full" />
        {/* Username */}
        <div className="flex w-full justify-between">
          <label
            htmlFor=""
            className="w-full text-[0.7rem] font-bold md:font-normal md:text-xl lg:font-bold border-r-2 border-gray-200 mr-3 pr-2"
          >
            Shop Classification
          </label>
          <p className="w-full text-black tracking-wide text-left my-auto md:text-2xl text-[0.7rem] pr-2 mr-3 font-bold md:font-normal">
            Sevices, Cars
          </p>
        </div>
        <hr className="bg-gray-500 mx-auto w-full" />
        <BusinessUpdate />
      </div>
    </div>
  );
};

export default ShopInfo;
