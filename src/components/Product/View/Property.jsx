import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { format } from "date-fns";
import { dateManiputator, getUser } from "../../../utils/index";
import { Carousel } from "react-responsive-carousel";
import { TbCurrencyNaira, TbUrgent } from "react-icons/tb";
import {
  FaCalendarDay,
  FaHandshake,
  FaEnvelope,
  FaMobileAlt,
} from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { ImLocation } from "react-icons/im";
import { RiUserLocationFill } from "react-icons/ri";
import { HiChip } from "react-icons/hi";
import { MdBookmarkAdd, MdSupportAgent } from "react-icons/md";
import { numberWithCommas } from "../../../utils/index.js";
import { Tooltip } from "flowbite-react";
//import { getUser } from "../../../utils";
import GrabIcon from "../../Universal/GrabIcon";
import ViewSkeleton from "../../Skeletons/ViewSkeleton";

const Property = ({ data }) => {
  const user = getUser();
  const productId = data.product_id;
  const userId = user != null ? user.id : null;
  //console.log(user);
  if (!data) {
    return <ViewSkeleton />;
  } else {
    return (
      <div className="w-full">
        <div className="my-3 mx-auto w-[80%] p-3 bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100">
          <Carousel
            dynamicHeight={true}
            infiniteLoop={true}
            className="w-full md:w-[60%] lg:w-[60%] xl:w-[50%] mx-auto"
          >
            {data &&
              data.images.map((img, index) => (
                <div className="" key={index}>
                  <img src={img} alt={"Vehicle" + index} className="mx-auto " />
                  <p className="legend">{"Vehicle " + index}</p>
                </div>
              ))}
          </Carousel>
          <div id="middleTop" className="w-full">
            <div className="w-[80%] p-3 font-semibold mx-auto text-md xl:text-xl text-center tracking-wide text-gray-700">
              {data.title}
            </div>
            <div className="shadow-md border-0 border-t-4 border-gray-300 w-[80%] p-3 font-semibold mx-auto">
              <div className="flex items-center justify-around border-0 border-b-2 pb-2 border-gray-300">
                <div
                  id="left"
                  className="flex items-center justify-start w-full"
                >
                  <TbCurrencyNaira /> &nbsp; {numberWithCommas(data.price)}
                </div>
                <div
                  id="right"
                  className="flex items-center justify-end text-sm font-bold lg:gap-4 gap-[0.2rem] md:px-2"
                >
                  {/* <Tooltip content="View Product" placement="top">
                  <Link to={encodeProductId(data.productDetailsId)}>
                    <button className="bg-blue-600 text-white px-1 py-1 rounded-full text-sm">
                      <GoEye />
                    </button>{" "}
                  </Link>
                </Tooltip> 
                &nbsp;{" "} */}
                  <Tooltip content="Grab Product">
                    {user !== null && (
                      <GrabIcon
                        productId={productId}
                        userId={userId}
                        product={data}
                      />
                    )}
                  </Tooltip>
                  &nbsp;{" "}
                  {data?.negotiable === "1" && (
                    <Tooltip content="Negotiable" placement="top">
                      <FaHandshake className="text-xl lg:text-2xl  text-orange-600 cursor-pointer" />
                    </Tooltip>
                  )}{" "}
                  &nbsp;{" "}
                  <Tooltip content="Save Product">
                    <MdBookmarkAdd className="text-xl lg:text-2xl  text-green-700 cursor-pointer" />
                  </Tooltip>
                </div>
              </div>
              <div className="w-full grid lg:grid-cols-3 grid-col-2 mt-3">
                <div className="flex items-center jusity-start md:justify-center  my-2">
                  <ImLocation className="text-red-500" /> &nbsp; {data.location}
                </div>
                <div className="flex items-center jusity-start md:justify-center my-2">
                  <RiUserLocationFill className="text-blue-600" /> &nbsp;{" "}
                  {data.firstname + " " + data.lastname} &nbsp;{" "}
                  {data.negotiable === "1" && (
                    <Tooltip content="Negotiable" placement="top">
                      <FaHandshake className="text-md my-auto  text-orange-600 cursor-pointer" />
                    </Tooltip>
                  )}{" "}
                </div>

                {data?.created_at && (
                  <div className="flex items-center jusity-start md:justify-center my-2">
                    <FaCalendarDay className="text-gray-600" /> &nbsp;{" "}
                    {format(dateManiputator(data.created_at), "PP")}
                  </div>
                )}

                {data?.urgent && (
                  <div className="flex items-center jusity-start md:justify-center my-2">
                    <TbUrgent className="text-red-700 text-xl" /> &nbsp;{" "}
                    <span className="my-auto tracking-wide">Urgent</span>
                  </div>
                )}

                {data?.sellerType && (
                  <div className="flex items-center jusity-start md:justify-center my-2">
                    {data?.sellerType === "0" ? (
                      <>
                        <MdSupportAgent className="text-blue-600" /> &nbsp;{" "}
                        Agent
                      </>
                    ) : (
                      <>
                        <GrUserManager className="text-blue-600" />
                        &nbsp; Personal
                      </>
                    )}
                  </div>
                )}

                {/* {data?.vehicleSpecification && (
                  <div className="flex items-center jusity-start md:justify-center my-2">
                    <BsPencilSquare className="text-blue-700 text-xl" /> &nbsp;{" "}
                    <span className="my-auto tracking-wide">
                      {data?.vehicleSpecification}
                    </span>
                  </div>
                )} */}

                {data?.viaPhone && data.number !== "" && (
                  <div className="flex items-center jusity-start md:justify-center my-2">
                    <FaMobileAlt className="text-gray-700 text-xl" /> &nbsp;{" "}
                    {user ? (
                      <span className="my-auto tracking-wide">
                        {data?.number}
                      </span>
                    ) : (
                      <span className="text-red-600">Login to Show</span>
                    )}
                  </div>
                )}
                {data?.viaEmail && data.viaEmail === "1" && (
                  <div className="flex items-center jusity-start md:justify-center my-2">
                    <FaEnvelope className="text-gray-700 text-xl" /> &emsp;{" "}
                    {user ? (
                      <span className="my-auto tracking-wide">
                        {data?.email}
                      </span>
                    ) : (
                      <span className="text-red-600">Login to Show</span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-2 p-2 w-full lg:w-[80%] mx-auto">
              <h2 className="text-xl text-gray-600">Description</h2>
              <p className="w-full text-justify text-md mt-2">
                {data?.description}
              </p>
            </div>
            <div
              id="features"
              className="w-full lg:w-[80%] mx-auto flex flex-col items-center justify-start gap-2"
            >
              <h1 className="text-xl my-2 text-gray-700 block underline">
                Property Type
              </h1>
              <div className="flex items-center justify-center flex-wrap gap-4 font-semibold">
                {data?.propertyType.map((feature, index) => (
                  <span
                    className="text-gray-700 border-0 border-b-4 border-t-4 border-t-gray-200 border-b-gray-400 p-2"
                    key={index}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div
              id="facilities"
              className="w-full lg:w-[80%] mx-auto flex flex-col items-center justify-start gap-2 mt-4"
            >
              <h1 className="text-xl my-2 text-gray-700 block underline">
                Property Facilities
              </h1>
              <div className="flex items-center justify-center flex-wrap gap-4 font-semibold">
                {data?.propertyFacilities.map((feature, index) => (
                  <span
                    className="text-gray-700 border-0 border-b-4 border-t-4 border-t-gray-200 border-b-gray-400 p-2"
                    key={index}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>{" "}
        <div id="contentSection"></div>
      </div>
    );
  }
};

export default Property;
