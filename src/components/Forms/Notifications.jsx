import React from "react";
import { notificationOptions } from "../../utils/basicInfo";

const Notifications = () => {
  const classname =
    "rounded-sm border-slate-300 border-0 border-b-2 border-l-2 border-r-gray-300 border-r-2 border-t-2 border-t-gray-300";
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById("notificationForm");
    const formData = new FormData(form);

    for (let [key, value] of formData) {
      //console.log(`${key}: ${value}`);
    }
  };
  return (
    <form
      action=""
      id="notificationForm"
      className="w-full md:w-[80%] mx-auto mt-4 flex flex-col items-center justify-center gap-2"
      onSubmit={handleSubmit}
    >
      {notificationOptions.map((option, index) => (
        <div
          className="w-full p-2 flex items-center justify-center"
          key={index}
        >
          <div className="w-full text-left font-bold text-lg tracking-wide">
            {option}
          </div>
          <div className="w-full flex items-cen  first-letter:ter justify-between">
            <label htmlFor="">
              <input
                type="checkbox"
                className={classname}
                name={`${option.split(" ").join("").toLowerCase()}[email]`}
                id=""
              />{" "}
              &emsp; <span className="font-bold">Email</span>
            </label>
            <label htmlFor="">
              <input
                type="checkbox"
                className={classname}
                name={`${option.split(" ").join("").toLowerCase()}[sms]`}
                id=""
              />{" "}
              &emsp; <span className="font-bold">SMS</span>
            </label>
          </div>
        </div>
      ))}
      <div className="w-full flex justify-center mt-4">
        <button
          type="submit"
          className="rounded-sm md:text-lg md:py-2 md:px-3 py-1 px-2 bg-green-500 text-white hover:bg-green-300 cursor-pointer"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default Notifications;
