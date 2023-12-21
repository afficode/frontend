import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Approutes } from "../../../constants";
import { fetchProduct } from "../../../hooks";
import Breadcrumb from "../../../components/Breadcrumb";
import { TbCurrencyNaira } from "react-icons/tb";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { noimage } from "../../../assets/images";
import { Carousel } from "flowbite-react";
import { FaCamera, FaMapMarkerAlt } from "react-icons/fa";
import useAuth from "../../../context/UserContext";
import {
  numberWithCommas,
  decodeProductId,
} from "../../../utils/dataManipulations";
import { toast } from "react-toastify";

const index = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [items, setItems] = useState(null);
  const [revealNumber, setRevealNumber] = useState(false);
  const { isLogin, user } = useAuth();

  const result = fetchProduct(decodeProductId(id));

  console.log(items);

  useEffect(() => {
    if (result.data) {
      console.log(result.data);
      setItems(() => [
        { name: "Home", link: Approutes.home },
        { name: "Products", link: Approutes.product.initial },
        { name: result?.data?.title },
      ]);
    }
  }, [result.isLoading]);

  return result.isLoading ? (
    <>ISLOADING SKELETON</>
  ) : (
    <section className="w-full p-2 lg:p-4">
      <header className="w-full">
        <Breadcrumb
          items={items}
          className={"text-md breadcrumbs text-primary"}
        />
      </header>

      <section className="w-full flex flex-col md:flex-row gap-2 md:gap-8">
        <main className="w-full md:w-[60%] xl:w-[70%] flex flex-col">
          <div className="w-full my-2 ml-2">
            <h6 className="w-full text-md md:text-2xl xl:text-3xl font-bold">
              {result.data?.title}
            </h6>
            <div className="flex items-center justify-between">
              <p className="w-full">
                <Link
                  to={`/products/search?lga=${result.data?.lga_id}`}
                  className="text-primary hover:underline"
                >
                  {result.data?.location.split(",")[0]}
                </Link>{" "}
                |{" "}
                <Link
                  to={`/products/search?state_id=${result.data?.state_id}`}
                  className="text-primary hover:underline"
                >
                  {result.data?.location.split(",")[1]}
                </Link>
              </p>
              <p className="flex items-center justify-end font-bold w-full pr-2">
                <TbCurrencyNaira className="text-black font-bold" />
                {numberWithCommas(result.data?.price)}
              </p>
            </div>
          </div>{" "}
          <div className="w-full mx-auto mt-1">
            <div className="relative rounded-none ">
              {result.data?.images.length > 0 ? (
                <Carousel className="h-[250px] md:h-[650px] rounded-none">
                  {result.data?.images.map((img, index) => (
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
              <div className="w-full bg-black/50 h-10 absolute bottom-0 text-white pl-6 py-2 flex rounded-none">
                <span className="flex my-auto px-2 border-2 border-white">
                  <FaCamera className="mt-1 text-sm" />
                  &nbsp; &nbsp;{" "}
                  <span className="my-auto text-sm">
                    {" "}
                    {result.data?.images.length}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </main>
        <aside className="w-full md:w-[40%] xl:w-[30%] border-2 border-gray-400 p-2 lg:p-4">
          <h2 className="w-full text-lg md:text-xl 2xl:text-3xl font-bold">
            {result.data?.firstname}
          </h2>
          <p className="text-lg">Since 4+ years</p>
          <hr class="h-px my-2 bg-gray-700 border-1 border-black" />
          <div className="text-lg lg:text-xl w-full">
            <p className="w-full">Contact {result.data?.firstname} </p>
            <div className="flex items-center justify-between">
              <p className="my-2 text-xl lg:text-2xl ">
                <span className="font-bold text-xl">
                  {revealNumber
                    ? result.data?.number
                    : `${result.data?.number.substring(0, 3)}XXXXXXXX`}
                </span>
              </p>
              <button
                className="btn bg-white btn-sm  rounded-none text-black hover:bg-primary hover:text-white hover:border-0 hover:rounded-sm font-bold "
                onClick={() => {
                  isLogin
                    ? setRevealNumber(!revealNumber)
                    : toast.warn("Please login to reveal phone number");
                }}
              >
                {!revealNumber ? (
                  <span className="flex items-center justify-center">
                    <IoEye /> &nbsp; Reveal{" "}
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <IoEyeOff /> &nbsp; Hide
                  </span>
                )}
              </button>
            </div>
          </div>
        </aside>
      </section>
      <section className="flex flex-col">
        <div className="w-full">Description</div>
        <div className="w-full">Overview</div>
      </section>
    </section>
  );
};

export default index;
