import React from "react";

const OverviewPills = ({ overview, ad }) => {
  return (
    <div className="bg-white text-black flex p-2 items-center justify-start">
      <h6 className="text-normal md:text-lg font-bold my-auto tracking-tighter">
        {overview?.name}:{" "}
      </h6>{" "}
      &emsp;
      <span className="my-auto tracking-tighter ">
        {Array.isArray(overview?.value) ? (
          <ul className="list-disc list-inside ml-1 tracking-tighter">
            {overview?.value.map((val, index) => (
              <li key={index}>{val}</li>
            ))}
          </ul>
        ) : isNaN(overview?.value) ? (
          <>
            {overview?.value
              .split(" ")
              .map((val) => val[0].toUpperCase() + val.substring(1))
              .join(" ")}
          </>
        ) : (
          <>
            {ad.category.toString()?.startsWith("51") &&
            overview?.param === "size" ? (
              <span>
                {`${overview?.value}`} m<sup>2</sup>
              </span>
            ) : (
              overview.value
            )}
          </>
        )}
      </span>
    </div>
  );
};

export default OverviewPills;
