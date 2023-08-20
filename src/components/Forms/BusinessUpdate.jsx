import React, { useState } from "react";
import { FaRegEdit, FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const BusinessUpdate = () => {
  const [businessAddress, setBusinessAddress] = useState("false");
  const [businessTel, setBusinessTel] = useState("false");
  return (
    <form
      action=""
      className="w-full flex flex-col items-center justify-center gap-2"
    >
      {/* Business Tel */}
      <div className="flex w-full justify-between">
        <label
          htmlFor=""
          className="w-full md:text-xl lg:text-xl lg:font-bold text-[0.7rem] pr-2 mr-3 font-bold md:font-normal"
        >
          Business Tel:
        </label>
        {businessTel === "false" ? (
          <>
            <p className="w-full text-black tracking-wide my-auto md:text-2xl text-left :text-center text-[0.7rem] pr-2 mr-3 font-bold md:font-normal">
              +2348011******
            </p>
          </>
        ) : (
          <>
            <input
              type="text"
              name="businessTel"
              placeholder="08066665555"
              className="border-0 border-b-2 border-gray-300 md:px-2 bg-gray-50 placeholder:italic placeholder:text-slate-400 w-full"
            />
          </>
        )}
        <span className="w-full ">
          {businessTel === "false" ? (
            <>
              <FaRegEdit
                onClick={() => setBusinessTel("true")}
                className="w-full text-center my-auto text-sm md:text-xl cursor-pointer text-blue-700 hover:underline"
              />
            </>
          ) : (
            <>
              <MdCancel
                onClick={() => setBusinessTel("false")}
                className="w-full text-center my-auto text-sm md:text-xl cursor-pointer text-red-700 hover:underline"
              />{" "}
            </>
          )}
        </span>
      </div>
      <hr className="bg-gray-500 mx-auto w-[30%] my-2" />
      {/* Business Address */}
      <div className="flex w-full justify-between">
        <label
          htmlFor=""
          className="w-full md:text-xl lg:text-xl lg:font-bold text-[0.7rem] pr-2 mr-3 font-bold md:font-normal"
        >
          Business Address:
        </label>
        {businessAddress === "false" ? (
          <>
            <p className="w-full text-black tracking-wide my-auto md:text-2xl text-left :text-center text-[0.7rem] pr-2 mr-3 font-bold md:font-normal">
              1b, Rotimi Cole, Agidingbi Lagos.
            </p>
          </>
        ) : (
          <>
            <input
              type="text"
              name="businessAdd"
              placeholder="1b, Rotimi Cole, Agidingbi Lagos."
              className="border-0 border-b-2 border-gray-300 md:px-2 bg-gray-50 placeholder:italic placeholder:text-slate-400 w-full"
            />
          </>
        )}
        <span className="w-full ">
          {businessAddress === "false" ? (
            <>
              <FaRegEdit
                onClick={() => setBusinessAddress("true")}
                className="w-full text-center my-auto text-sm md:text-xl cursor-pointer text-blue-700 hover:underline"
              />
            </>
          ) : (
            <>
              <MdCancel
                onClick={() => setBusinessAddress("false")}
                className="w-full text-center my-auto text-sm md:text-xl cursor-pointer text-red-700 hover:underline"
              />{" "}
            </>
          )}
        </span>
      </div>
      <hr className="bg-gray-500 mx-auto w-[30%] my-2" />

      {/* save button */}
      <div className="mt-3 w-full">
        {(businessAddress === "true" || businessTel === "true") && (
          <button
            type="submit"
            className="flex bg-green-500 font-bold text-white rounded-sm py-1 px-3"
          >
            Save &nbsp; <FaSave className="my-auto" />
          </button>
        )}
      </div>
    </form>
  );
};

export default BusinessUpdate;
