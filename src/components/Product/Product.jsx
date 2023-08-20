import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Carousel, Tooltip, Pagination } from "flowbite-react";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaCalendarDay, FaHandshake } from "react-icons/fa";
import { HiChip } from "react-icons/hi";
import { MdBookmarkAdd } from "react-icons/md";
import { GoEye } from "react-icons/go";
import GrabIcon from "../Universal/GrabIcon";
import { getUser } from "../../utils";

import {
  RiFacebookFill,
  RiTwitterFill,
  RiInstagramFill,
  RiWhatsappFill,
} from "react-icons/ri";
import { dateManiputator, encodeProductId } from "../../utils/index";
const Product = ({ data }) => {
  //console.log(data.productDetailsId);
  const user = getUser();
  const userId = user != null ? user.id : null;
  const productId = data.product_id;
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="w-full flex items-center justify-between gap-2  hover:rounded-md hover:p-2 hover:bg-gray-100 h-[250px] my-3 hover:scale-125 hover:z-10 shadow-md border-0 border-t-4 border-t-gray-300 transition-all delay-100 duration-150 ease-in-out">
      <div className="w-[35%] my-auto">
        <div className="h-[250px]">
          <Carousel indicators={false}>
            {data.images.map((img, index) => (
              <div key={index}>
                <img src={img} alt={`product-${index}`} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="w-[65%] p-3">
        <div id="header">
          <span className="block text-sm text-gray-100">Urgent</span>
          <h2 className="text-md text-black text-left font-bold">
            {data.title}
          </h2>
          <div className="text-sm flex w-full">
            <span className="my-auto flex">
              {new Array(5)
                .fill(0)
                .map((val, index) =>
                  index <= 2 ? (
                    <AiFillStar className="text-orange-400" />
                  ) : (
                    <AiOutlineStar className="text-orange-400" />
                  )
                )}
            </span>
            &emsp;{" "}
            <span className="my-auto text-[0.75rem] text-gray-600 flex text-xs">
              20 Reviews |{" "}
              <span className="my-auto flex gap-[0.2rem] mt-1 text-gray-400">
                <RiFacebookFill className="hover:text-blue-600 cursor-pointer" />{" "}
                <RiTwitterFill className="hover:text-sky-600 cursor-pointer" />{" "}
                <RiInstagramFill className="hover:text-orange-600 cursor-pointer" />{" "}
                <RiWhatsappFill className="hover:text-green-400 cursor-pointer" />
              </span>
            </span>{" "}
          </div>
        </div>
        <div id="base" className="w-full mt-2 flex items-start justify-between">
          <div id="left" className="text-xs overflow-x-hidden w-full h-5">
            {data.location}
          </div>

          {data?.created_at && (
            <div
              id="right"
              className="text-xs w-full flex items-center justify-end"
            >
              <FaCalendarDay className="text-gray-600" /> &nbsp;{" "}
              {format(dateManiputator(data.created_at), "PP")}
            </div>
          )}
        </div>
        <div id="body" className="mt-3">
          <p className="text-justify text-sm h-[80px] overflow-y-hidden ">
            {data.description}
          </p>
        </div>

        <div
          id="footer"
          className="my-2 w-full flex items-center justify-between"
        >
          <div
            id="left"
            className="flex items-center justify-start text-sm font-bold"
          >
            <TbCurrencyNaira /> &nbsp; {numberWithCommas(data.price)}
          </div>
          <div
            id="right"
            className="flex items-center justify-end text-sm font-bold gap-[0.2rem] md:px-2"
          >
            <Tooltip content="View Product" placement="top">
              <Link to={encodeProductId(data.productDetailsId)}>
                <button className="bg-blue-600 text-white px-1 py-1 rounded-full text-sm">
                  <GoEye />
                </button>{" "}
              </Link>
            </Tooltip>
            &nbsp;{" "}
            <GrabIcon productId={productId} userId={userId} product={data} />
            {/* <HiChip className="text-xl text-green-700 cursor-pointer" /> */}
            &nbsp;{" "}
            {data.negotiable === "1" && (
              <Tooltip content="Negotiable" placement="top">
                <FaHandshake className="text-xl text-orange-600 cursor-pointer" />
              </Tooltip>
            )}
            <Tooltip content="Save Product">
              <MdBookmarkAdd className="text-xl text-green-700 cursor-pointer" />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
