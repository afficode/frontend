import React from "react";
import { Carousel } from "flowbite-react";
import { FaCamera, FaMapMarkerAlt } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";
import { noimage } from "../../../assets/images";
import { Link } from "react-router-dom";
import { encodeProductId } from "../../../utils/dataManipulations";

const FeaturedProducts = ({ product }) => {
  if (product === undefined || product.length <= 0) {
    return <p>Nothing</p>;
  }
  return (
    <>
      {product.map((ad, index) => (
        <div
          key={index}
          className=" min-w-[10rem] md:w-[18rem] sm:w-full min-h-[12rem] md:h-[22rem] bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-lg transition-all  ease-in-out"
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
              <img src={noimage} alt="no image" className="rounded-sm " />
            )}
            <div className="w-full bg-black/50 h-10 absolute bottom-0 text-white pl-6 pt-2 flex rounded-none">
              <FaCamera className="my-auto text-lg" />
              &emsp; <span className="my-auto"> {ad.images.length}</span>
            </div>
          </div>
          <Link
            to={`/product/${encodeProductId(ad.id)}`}
            className="p-2 tooltip tooltip-secondary w-full"
          >
            <p className="text-xl font-semibold overflow-hidden h-6 flex items-start justify-start">
              {ad.title.trimEnd()}{" "}
            </p>
            <div className="flex w-full mt-1 text-xs">
              <FaMapMarkerAlt className="my-auto" />
              <p className="mx-2 overflow-hidden">{ad.location}</p>
            </div>
            <p className=" px-2 mt-4 flex">
              <TbCurrencyNaira className="mt-1" />
              {ad.price}
            </p>
          </Link>
        </div>
      ))}
    </>
  );
};

export default FeaturedProducts;
