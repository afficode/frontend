import React from "react";

const Buttons = ({
  bgColor,
  textColor,
  hasLogo = false,
  hasBorder,
  text,
  logo,
  handleClick,
  disabled = false,
  type,
}) => {
  return (
    <button
      className={`h-[55px] px-4 text-[1.1rem] font-[500] font-sans w-full  transition ease-in-out duration-500 flex 
                hover:brightness-90 ${bgColor} ${textColor} ${
        hasLogo ? "justify-between" : "justify-center"
      } items-center ${hasBorder ? `border-black border-2` : ""} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } `}
      onClick={handleClick}
      disabled={disabled}
    >
      {hasLogo && <img src={logo} alt="icon" />}
      {text}
      {hasLogo && <span></span>}
    </button>
  );
};

export default Buttons;
