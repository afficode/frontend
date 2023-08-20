import React from "react";
import { RiUploadCloud2Fill } from "react-icons/ri";

const Account = () => {
  return (
    <div className="flex flex-col mt-5 divide-gray-300  items-start justify-start w-full lg:w-[90%] mx-auto">
      <h1 className="text-xl md:text-4xl tracking-wide font-bold mt-3 p-2">
        Account Setting
      </h1>
      <hr className="bg-gray-500 mx-auto w-full" />
      <form
        action=""
        className="w-full flex flex-col items-center justify-center gap-2"
      >
        {/* Fullname */}
        <div className="flex w-full justify-between mt-4 md:mt-2">
          <label
            htmlFor=""
            className="w-full md:text-xl lg:font-bold border-r-2 border-gray-200 text-[0.7rem] pr-2 mr-3 font-bold md:font-normal"
          >
            Shop Owners Name:
          </label>
          <p className="w-full  text-black tracking-wide my-auto md:text-2xl  text-[0.7rem] font-bold md:font-normal">
            Kolawole Amope
          </p>
        </div>
        <hr className="bg-gray-500 mx-auto w-full" />
        {/* Login Email */}
        <div className="flex w-full justify-between">
          <label className="w-full text-[0.7rem] font-bold md:font-normal md:text-xl lg:font-bold border-r-2 border-gray-200 mr-3 pr-2">
            Personal Email
          </label>
          <p className="w-full text-[0.7rem] text-black tracking-wide my-auto md:text-2xl font-bold md:font-normal">
            sijua*****@yahoo.com
          </p>
        </div>
        <hr className="bg-gray-500 w-full" />
        {/* Account Verification */}
        <div className="flex w-full justify-between">
          <label
            htmlFor=""
            className="w-full text-[0.7rem] font-bold md:font-normal md:text-xl lg:font-bold border-r-2 border-gray-200 mr-3 pr-2"
          >
            Account Verification:
          </label>
          <p className="w-full text-black tracking-wide text-left my-auto md:text-2xl text-[0.7rem] pr-2 mr-3 font-bold md:font-normal">
            Verified
          </p>
        </div>
        <hr className="bg-gray-500 mx-auto w-full" />
        {/* Upload required documents */}
        <div className="flex w-full justify-between">
          <span className="w-full text-[0.7rem] my-auto font-bold md:font-normal md:text-xl lg:font-bold border-r-2 border-gray-200 mr-3 pr-2">
            Upload Required Documents:
          </span>
          <label
            htmlFor="images"
            className="w-full text-black tracking-wide text-left my-auto md:text-2xl text-[0.7rem] pr-2 mr-3 font-bold md:font-normal"
          >
            <input
              //onChange={onFileChange}
              type="file"
              name="images"
              id="images"
              className="hidden"
              multiple
            />
            <div className="flex flex-col md:flex-row items-center justify-center w-full">
              <span className="w-full border-gray-400 flex items-center justify-center bg-gray-100 cursor-pointer group border-0 border-b-2 hover:border-blue-700 hover:border-b-4">
                <div className="h-20 w-20 flex items-center justify-center">
                  <RiUploadCloud2Fill className="text-2xl lg:text-5xl  group-hover:text-blue-700" />
                </div>
              </span>
              <p className="text-sm p-2 text-justify">
                Please upload a document to verify your identity: Drivers
                Licence, International Passport, Voters Card etc.
              </p>
            </div>
          </label>
        </div>
        <hr className="bg-gray-500 mx-auto w-full" />
        {/* save button */}
        {/* <div className="mt-3 w-full">
          <button
            type="submit"
            className="flex bg-green-500 font-bold text-white rounded-sm py-1 px-3"
          >
            Upload Documents
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default Account;
