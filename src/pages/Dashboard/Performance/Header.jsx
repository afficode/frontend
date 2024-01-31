import { useState } from "react";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../../../ui";
import { Link } from "react-router-dom";
import { Approutes } from "../../../constants";

const Header = () => {
  const [filteredDate, setFilteredDate] = useState("all");
  const [date, setDate] = useState();

  return (
    <div className="w-full bg-gray-200 px-2 sm:px-6 py-4 flex flex-col gap-4 my-2">
      <div className="ml-auto flex max-sm:flex-col items-center gap-4">
        <DateView
          placeholderText="Select dates"
          className="border-transparent shadow-lg rounded-md w-[10rem]"
          selected={date}
          onChange={(val) => setDate(val)}
        />
        <Link to={Approutes.postDecision}>
          <Button
            variant="primary"
            size="small"
            className="rounded-md font-medium"
          >
            + Add Product
          </Button>
        </Link>
      </div>

      <div className=" flex flex-wrap gap-2">
        <span
          onClick={() => setFilteredDate("all")}
          className={`${
            filteredDate === "all"
              ? "bg-primary text-white border-transparent"
              : "bg-white text-black/50 border border-black/40"
          } cursor-pointer py-[.5rem] px-6 rounded-md font-semibold max-sm:text-sm`}
        >
          All dates
        </span>
        <span
          onClick={() => setFilteredDate("12 months")}
          className={`${
            filteredDate === "12 months"
              ? "bg-primary text-white border-transparent"
              : "bg-white text-black/50 border border-black/40"
          } cursor-pointer py-[.5rem] px-6 rounded-md font-semibold max-sm:text-sm `}
        >
          12 months{" "}
        </span>
        <span
          onClick={() => setFilteredDate("30 days")}
          className={`${
            filteredDate === "30 days"
              ? "bg-primary text-white border-transparent"
              : "bg-white text-black/50 border border-black/40"
          } cursor-pointer py-[.5rem] px-6 rounded-md font-semibold max-sm:text-sm `}
        >
          30 days
        </span>
        <span
          onClick={() => setFilteredDate("7 days")}
          className={`${
            filteredDate === "7 days"
              ? "bg-primary text-white border-transparent"
              : "bg-white text-black/50 border border-black/40"
          } cursor-pointer py-[.5rem] px-6 rounded-md font-semibold max-sm:text-sm `}
        >
          7 days
        </span>
        <span
          onClick={() => setFilteredDate("24 hours")}
          className={`${
            filteredDate === "24 hours"
              ? "bg-primary text-white border-transparent"
              : "bg-white text-black/50 border border-black/40"
          } cursor-pointer py-[.5rem] px-6 rounded-md font-semibold max-sm:text-sm `}
        >
          24-hours
        </span>
      </div>
    </div>
  );
};

export default Header;
