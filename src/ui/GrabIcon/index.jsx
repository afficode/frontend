import React from "react";
import { FaMicrochip } from "react-icons/fa6";

const GrabIcon = ({ className, ...others }) => {
  return (
    <span className={className} {...others}>
      <FaMicrochip />
    </span>
  );
};

export default GrabIcon;
