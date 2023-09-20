import React from "react";
import Register from "./Register";


const DesktopView = () => {
  return (
    <div className="flex flex-col w-full lg:flex-row my-4 divide-x-4 divide-blue" >
      <div className="w-full">
        <Register />
      </div>
      <div className="w-full">
      <Register />
      </div>
    </div>
  );
};

export default DesktopView;
