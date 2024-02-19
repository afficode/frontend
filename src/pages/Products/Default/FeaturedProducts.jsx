import React from "react";
import { Carousel } from "flowbite-react";
import { FaCamera, FaMapMarkerAlt } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";
import { noimage } from "../../../assets/images";
import { Link } from "react-router-dom";
import { encodeProductId } from "../../../utils/dataManipulations";
import { numberWithCommas } from "../../../utils/dataManipulations";
import { formatDistance } from "date-fns";
import SaveProduct from "./SaveProduct";
import useAuth from "../../../context/UserContext";
import { FaHandshake, FaHandshakeSlash } from "react-icons/fa6";
import { NegotiableIcon } from "../../../ui";
import { GrabIcon } from "../../../ui";
const FeaturedProducts = ({ product }) => {
  const { isLogin, user } = useAuth();
  console.log(import.meta.env.VITE_TESTING);
  return (
    <>
      {product.map((ad, index) => (
        <div
          key={index}
          className="overflow-hidden min-w-[18rem] md:w-[18rem] sm:w-full min-h-[12rem] md:h-[22rem] bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-lg transition-all  ease-in-out"
        >
          <div className="relative rounded-none">
            {ad.images.length > 0 ? (
              <Carousel className="h-[120px] md:h-[230px] rounded-none">
                {ad.images.map((img, index) => (
                  <img
                    src={img.path}
                    alt={img.filename}
                    key={index * 3}
                    className="rounded-t-sm rounded-b-none "
                  />
                ))}
              </Carousel>
            ) : (
              <img
                src={noimage}
                alt="no image"
                className="h-[120px] md:h-[230px] rounded-none"
              />
            )}
            {((isLogin && parseInt(ad?.owner) !== parseInt(user?.id)) ||
              !isLogin) && (
              <SaveProduct
                ads_id={ad.id}
                className="absolute h-12 top-4 right-4 bg-gray-200 hover:bg-white p-1 px-2 rounded shadow-2xl w-10"
              />
            )}
            <div className="w-full bg-black/50 h-10 absolute bottom-0 text-white pl-2 pt-2 flex rounded-none">
              <FaCamera className="my-auto text-lg" />
              &emsp; <span className="my-auto"> {ad.images.length}</span>
            </div>
          </div>
          <Link
            to={`/product/${encodeProductId(ad.id)}`}
            className="p-2 tooltip tooltip-secondary w-full tracking-tighter line-clamp-1 hover:bg-gray-200"
          >
            <p className="text-xl font-semibold overflow-hidden h-6 lg:h-8 flex items-start justify-start uppercase ">
              {ad.title.toString().trimEnd().trim()}{" "}
            </p>
            <div className="block w-full mt-1 text-start text-ellipsis flex-nowrap line-clamp-1">
              <FaMapMarkerAlt className="mb-1 inline-block" />
              <span className="text-xs md:text-md lg:text-lg tracking-tighter line-clamp-1 inline">
                {ad.location}
              </span>
            </div>
            <p className="  mt-4 flex justify-between tracking-tighter line-clamp-1 ">
              <span className="flex">
                <TbCurrencyNaira className="mt-1" />
                {numberWithCommas(ad.price)}
              </span>
              <span className="flex justify-around my-auto text-xl font-bold gap-2">
                <NegotiableIcon negotiable={ad?.negotiable} />
                {((isLogin && parseInt(ad?.owner) !== parseInt(user?.id)) ||
                  !isLogin) && <GrabIcon className="text-secondary" />}
              </span>{" "}
              &nbsp;
              <span className="tracking-tighter">
                {formatDistance(
                  new Date(new Date(`${ad?.created_at}`)),
                  Date.now(),
                  {
                    includeSeconds: true,
                    addSuffix: true,
                  }
                ).includes("about") ? (
                  <>
                    {formatDistance(
                      new Date(new Date(`${ad?.created_at}`)),
                      Date.now(),
                      {
                        includeSeconds: true,
                        addSuffix: true,
                      }
                    ).substring(5)}
                  </>
                ) : (
                  <>
                    {formatDistance(
                      new Date(new Date(`${ad?.created_at}`)),
                      Date.now(),
                      {
                        includeSeconds: true,
                        addSuffix: true,
                      }
                    )}
                  </>
                )}
              </span>
            </p>
          </Link>
        </div>
      ))}
    </>
  );
};

export default FeaturedProducts;
