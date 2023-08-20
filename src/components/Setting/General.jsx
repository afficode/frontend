import React, { useState } from "react";
import { FaRegEdit, FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const General = () => {
  const [editPageName, setEditPageName] = useState("false");
  const [editUsername, setEditUsername] = useState("false");
  const [displayName, setDisplayName] = useState("false");
  const [thirparty, setThirdParty] = useState("false");
  const [showSave, setShowSave] = useState("false");

  return (
    <div className="flex flex-col mt-5 divide-gray-300  items-start justify-start w-full lg:w-[90%] xl:w-[70%] mx-auto">
      <h1 className="text-xl md:text-4xl tracking-wide font-bold my-3 p-2">
        General Settings
      </h1>
      <hr className="bg-gray-500 mx-auto w-full my-2" />
      <form
        action=""
        className="w-full flex flex-col items-center justify-center gap-4"
      >
        {/* pagename */}
        <div className="flex w-full justify-between">
          <label
            htmlFor=""
            className="w-full md:text-xl lg:font-bold border-r-2 border-gray-200 text-[0.7rem] pr-2 mr-3 font-bold md:font-normal"
          >
            Page Name:
          </label>
          {editPageName === "false" ? (
            <>
              <p className="w-full  text-black tracking-wide my-auto md:text-2xl border-r-2 border-gray-200 text-[0.7rem] pr-2 mr-3 font-bold md:font-normal">
                Kolla Autos
              </p>
            </>
          ) : (
            <>
              <input
                type="text"
                name="pageName"
                placeholder="Page Name..."
                className="border-0 border-b-2 border-gray-300 md:px-2 bg-gray-50 placeholder:italic placeholder:text-slate-400 w-full"
              />
            </>
          )}
          <span className="w-full">
            {editPageName === "false" ? (
              <>
                <FaRegEdit
                  onClick={() => setEditPageName("true")}
                  className="w-full text-center my-auto text-sm md:text-xl cursor-pointer text-blue-700 hover:underline"
                />
              </>
            ) : (
              <>
                <MdCancel
                  onClick={() => setEditPageName("false")}
                  className="w-full text-center text-sm my-auto md:text-xl cursor-pointer text-red-700 hover:underline"
                />{" "}
              </>
            )}
          </span>
        </div>
        <hr className="bg-gray-500 mx-auto w-full my-2" />
        {/* username */}
        <div className="flex w-full justify-between">
          <label
            htmlFor=""
            className="w-full text-[0.7rem] font-bold md:font-normal md:text-xl lg:font-bold border-r-2 border-gray-200 mr-3 pr-2"
          >
            Username:
          </label>
          {editUsername === "false" ? (
            <>
              <p className="w-full text-[0.7rem] text-black tracking-wide my-auto md:text-2xl border-r-2 border-gray-200 mr-3 pr-2 font-bold md:font-normal">
                isowo.ng/adeolalawal
              </p>
            </>
          ) : (
            <>
              <input
                type="text"
                name="pageName"
                placeholder="Username..."
                className="border-0 border-b-2 border-gray-300 md:px-2 bg-gray-50 placeholder:italic placeholder:text-slate-400 w-full"
              />
            </>
          )}
          <span className="w-full ">
            {editUsername === "false" ? (
              <>
                <FaRegEdit
                  onClick={() => setEditUsername("true")}
                  className="w-full text-center my-auto text-sm md:text-xl cursor-pointer text-blue-700 hover:underline"
                />
              </>
            ) : (
              <>
                <MdCancel
                  onClick={() => setEditUsername("false")}
                  className="w-full text-center my-auto text-sm md:text-xl cursor-pointer text-red-700 hover:underline"
                />{" "}
              </>
            )}{" "}
          </span>
        </div>
        <hr className="bg-gray-500 mx-auto w-full my-2" />
        {/* displayName */}
        <div className="flex w-full justify-between">
          <label
            htmlFor=""
            className="w-full md:text-xl lg:font-bold text-[0.7rem] pr-2 mr-3 font-bold md:font-normal"
          >
            Display Name:
          </label>
          {displayName === "false" ? (
            <>
              <p className="w-full text-black tracking-wide text-left my-auto md:text-2xl text-[0.7rem] pr-2 mr-3 font-bold md:font-normal">
                Kols Wheel
              </p>
            </>
          ) : (
            <>
              <input
                type="text"
                name="pageName"
                placeholder="Display name..."
                className="border-0 border-b-2 border-gray-300 md:px-2 bg-gray-50 placeholder:italic placeholder:text-slate-400 w-full"
              />
            </>
          )}
          <span className="w-full ">
            {displayName === "false" ? (
              <>
                <FaRegEdit
                  onClick={() => setDisplayName("true")}
                  className="w-full text-center my-auto text-sm md:text-xl cursor-pointer text-blue-700 hover:underline"
                />
              </>
            ) : (
              <>
                <MdCancel
                  onClick={() => setDisplayName("false")}
                  className="w-full text-center my-auto text-sm md:text-xl cursor-pointer text-red-700 hover:underline"
                />{" "}
              </>
            )}{" "}
          </span>
        </div>
        <hr className="bg-gray-500 mx-auto w-full my-2" />
        {/* Third Party */}
        <div className="flex w-full justify-between">
          <label
            htmlFor=""
            className="w-full md:text-xl lg:text-xl lg:font-bold text-[0.7rem] pr-2 mr-3 font-bold md:font-normal"
          >
            Third Party Mangement
          </label>
          {thirparty === "false" ? (
            <>
              <p className="w-full text-black tracking-wide my-auto md:text-2xl text-left :text-center text-[0.7rem] pr-2 mr-3 font-bold md:font-normal">
                Third party instruction
              </p>
            </>
          ) : (
            <>
              <input
                type="text"
                name="thridparty"
                placeholder="Third party instruction..."
                className="border-0 border-b-2 border-gray-300 md:px-2 bg-gray-50 placeholder:italic placeholder:text-slate-400 w-full"
              />
            </>
          )}
          <span className="w-full ">
            {thirparty === "false" ? (
              <>
                <FaRegEdit
                  onClick={() => setThirdParty("true")}
                  className="w-full text-center my-auto text-sm md:text-xl cursor-pointer text-blue-700 hover:underline"
                />
              </>
            ) : (
              <>
                <MdCancel
                  onClick={() => setThirdParty("false")}
                  className="w-full text-center my-auto text-sm md:text-xl cursor-pointer text-red-700 hover:underline"
                />{" "}
              </>
            )}
          </span>
        </div>
        <hr className="bg-gray-500 mx-auto w-full my-2" />

        {/* save button */}
        <div className="mt-3 w-full">
          {(editPageName === "true" ||
            editUsername === "true" ||
            displayName === "true" ||
            thirparty === "true") && (
            <button
              type="submit"
              className="flex bg-green-500 font-bold text-white rounded-sm py-1 px-3"
            >
              Save &nbsp; <FaSave className="my-auto" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default General;
