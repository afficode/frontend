import React, { useContext, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ReactLoading from "react-loading";
import { Carousel } from "react-responsive-carousel";
import { ProductContext } from "../../../context/ProductProvider";
import ViewSkeleton from "../../Skeletons/ViewSkeleton";
import { GenerateGrabUrl } from "../../../utils/ManipulateGrabs";
import { grabCondition, makeGrabberId } from "../../../utils";
import { FaShareSquare, FaFileDownload } from "react-icons/fa";
import { Tooltip } from "flowbite-react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import html2canvas from "html2canvas";
import GenerateFile from "./GenerateFile";
const CreateGrab = () => {
  //const url = window.location.href;
  const size = 32;
  const {
    grabber,
    error,
    message,
    isLoading,
    setIsLoading,
    getUrl,
    viewGrab,
    setViewGrab,
    saved,
    grabLink,
  } = GenerateGrabUrl();

  const { product } = useContext(ProductContext);
  // if(product === null) {

  // }
  // monitor if the user wants to edit or not.
  // by default when the page load, the page shoud be editablbe
  const [edit, setEdit] = useState(true);
  const [image, setImage] = useState(null);
  const [grabDetail, setGrabDetail] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    negotiable: product.negotiable === 1 ? true : false,
  });
  const [showShareIcons, setShowShareIcons] = useState(false);
  const inputClass = `text-sono bg-green-700 text-white placeholder:text-gray-300 placeholder:italic w-full text-sm font-semibold tracking-wide`;
  const inputEdit = `text-sono text-sono rounded-sm w-full border-0 my-2 text-sm text-justify ${
    edit
      ? "bg-white text-black"
      : "bg-green-700 text-white font-semibold tracking-wide"
  }`;
  const handleChange = (e) => {
    setGrabDetail({
      ...grabDetail,
      [e.target.name]: e.target.value,
    });
  };

  const toggleShare = () => {
    setShowShareIcons(() => !showShareIcons);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      getUrl(grabDetail, product);
    }, 4000);
  };
  const generateImage = () => {
    const ad = document.getElementById("imageCanvas");
    html2canvas(ad, { logging: true, letterRendering: 1, useCORS: true }).then(
      (canvas) => {
        const imgData = canvas.toDataURL("img/png");
        //console.log(imgData);
        setImage(imgData);
      }
    );
  };
  if (!product && isLoading) {
    return <ViewSkeleton />;
  }
  return (
    <div className="w-full my-3 text-sono">
      {isLoading ? (
        <div className="w-full md:w-[60%] mx-auto bg-gray-100 border-gray-600 my-3">
          <p className="text-center tracking-wide text-success text-2xl pt-10 ">
            Your Grab is been processed.
          </p>
          <p className="text-lg text-center">
            Please be patient while we encrypt your grab information with your
            personal data.
          </p>
          <ReactLoading
            type={"spin"}
            color="#03fca5"
            height={"30%"}
            width={"30%"}
            className="mx-auto py-7"
          />
        </div>
      ) : (
        <form
          className="w-100 md:w-[95%] lg:w-[90%] xl:w-[80%] mx-auto bg-green-100 p-4"
          id="grabForm"
          onSubmit={handleSubmit}
          method="POST"
        >
          {error !== null && (
            <div
              className={`mx-auto w-full pt-1 text-center font-bold ${
                error === true
                  ? "bg-red-400 text-red-700"
                  : "bg-green-300 text-green-700"
              } text-xl`}
            >
              <span className="w-full">{message} </span>
              {error !== true && (
                <span className="w-full flex items-start justify-center">
                  <span className="my-auto">
                    {" "}
                    We are redirecting you to the grabbed product page!!!{" "}
                  </span>
                  <ReactLoading type={"bubbles"} color="#fff" />
                </span>
              )}
            </div>
          )}
          <div className="flex items-center justify-start gap-x-4 lg:ml-[3rem] lg:mt-5">
            {!viewGrab ? (
              <>
                <span
                  className="bg-yellow-400 py-2 px-4 text-xl shadow-md uppercase font-bold cursor-pointer"
                  onClick={() => {
                    setViewGrab(true);
                    setEdit(false);
                  }}
                >
                  GENERATE POST
                </span>
              </>
            ) : (
              <div className="flex flex-col items-center justify-start">
                <div className=" flex items-center justify-start gap-x-4">
                  <span
                    className={` py-2 px-4 text-xl shadow-md uppercase font-bold ${
                      saved
                        ? "cursor-pointer bg-yellow-400 hover:shadow hover:scale-105 hover:bg-black rounded-full "
                        : "cursor-not-allowed bg-yellow-400/30"
                    }`}
                  >
                    {saved ? (
                      <>
                        <FaShareSquare
                          className="text-white"
                          onClick={() => {
                            toggleShare();
                            setShowShareIcons(true);
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <FaShareSquare className="text-white" />
                      </>
                    )}
                  </span>
                  {!saved && (
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-green-500 to-green-700 py-2 px-4 shadow-md cursor-pointer font-sono text-white font-bold"
                    >
                      Save
                    </button>
                  )}{" "}
                  {!saved && (
                    <span
                      className="bg-white py-2 px-4 shadow-md font-bold cursor-pointer"
                      onClick={() => {
                        setEdit(true);
                        // this will let us see the grab the way the customer will see it.
                        setViewGrab(false);
                      }}
                    >
                      Edit
                    </span>
                  )}
                </div>
                {saved && showShareIcons && (
                  <div className="flex items-start relative justify-start w-full z-5 gap-x-2 mt-4">
                    <div className="" onClick={generateImage}>
                      <GenerateFile screenshot={image} />
                    </div>
                    <Tooltip content="Share Facebook">
                      <FacebookShareButton url={grabLink}>
                        <FacebookIcon size={size} round={true} />
                      </FacebookShareButton>
                    </Tooltip>

                    <Tooltip content="Tweet Grab">
                      <TwitterShareButton url={grabLink}>
                        <TwitterIcon size={size} round={true} />
                      </TwitterShareButton>
                    </Tooltip>

                    <Tooltip content="Share Grab Via Email">
                      <EmailShareButton url={grabLink}>
                        <EmailIcon size={size} round={true} />
                      </EmailShareButton>
                    </Tooltip>
                    <Tooltip content="Share Grab on Whatsapp">
                      <WhatsappShareButton url={grabLink}>
                        <WhatsappIcon size={size} round={true} />
                      </WhatsappShareButton>
                    </Tooltip>

                    <Tooltip content="Share Grab on Telegram">
                      <TelegramShareButton url={grabLink}>
                        <TelegramIcon size={size} round={true} />
                      </TelegramShareButton>
                    </Tooltip>

                    <Tooltip content="Share Grab on LinkedIn">
                      <LinkedinShareButton url={grabLink}>
                        <LinkedinIcon size={size} round={true} />
                      </LinkedinShareButton>
                    </Tooltip>
                  </div>
                )}
              </div>
            )}
          </div>
          <div
            className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4  my-3"
            id="imageCanvas"
          >
            {/* column 1 and might be hhidden when mobile view */}
            <div className="w-full lg:w-[80%] lg:flex flex-col items-start justify-start lg:mt-10 gap-y-4 lg:ml-4 order-3 md:order-1">
              {/* <div className="flex flex-col jusify-start items-start gap-y-1 w-full">
                <h1 className="text-xl tracking-wide">Reason for Sale</h1>
                <textarea
                  name="reason"
                  id=""
                  cols="20"
                  rows="5"
                  className={inputClass}
                  placeholder="Relocating"
                  onChange={handleChange}
                ></textarea>
              </div> */}
              {!edit && (
                <p className="text-2xl text-center py-2 w-full text-blue-700  text-sono bg-white px-1 font-bold">
                  {makeGrabberId(grabber.grabber_id)}
                </p>
              )}
              {(product?.vehicle_id || product?.property_id) && (
                <div className="flex flex-col jusify-start items-start gap-y-1 w-full">
                  <h1 className="text-xl tracking-wide">Condition</h1>
                  <input
                    type="text"
                    name="condition"
                    className={inputClass}
                    placeholder="Like New"
                    value={grabCondition({
                      productClass:
                        product?.vehicle_id && product.vehicle_id !== null
                          ? "vehicle"
                          : "property",
                      condition: product.condition,
                    })}
                    readOnly
                  />
                </div>
              )}
              <div className="flex flex-col jusify-start items-start gap-y-1 w-full">
                <h1 className="text-xl tracking-wide">Location</h1>
                <input
                  type="text"
                  name="location"
                  className={inputClass}
                  placeholder="Ikeja Lagos"
                  defaultValue={product.location}
                  readOnly
                />
              </div>
              <div className="flex flex-col jusify-start items-start gap-y-1 w-full">
                <h1 className="text-xl tracking-wide">Price</h1>
                <input
                  type="text"
                  name="price"
                  className={` placeholder:text-gray-300 placeholder:italic w-full text-sm ${
                    edit
                      ? "bg-white text-black"
                      : "bg-green-700 text-white font-bold tracking-wide"
                  }`}
                  placeholder="2000000"
                  defaultValue={product.price}
                  onChange={handleChange}
                  readOnly={edit ? false : true}
                />
              </div>
              <div className="flex flex-col jusify-start items-start gap-y-1 w-full">
                <h1 className="text-xl tracking-wide">Negotiable</h1>
                {edit ? (
                  <>
                    <input
                      type="checkbox"
                      name="negotiable"
                      className="rounded-sm h-6 w-6"
                      onChange={handleChange}
                    />
                  </>
                ) : (
                  <p className="bg-green-700 text-white font-bold tracking-wide w-full p-2">
                    {grabDetail.negotiable ? "Yes" : "No"}
                  </p>
                )}
              </div>
              {/* {JSON.stringify(product)} */}
            </div>
            {/* column 3 having title, descriptin and one image */}
            <div className="flex flex-col items-center justify-start gap-2 xl:col-span-2 mr-4 order-2">
              <div className="flex flex-col items-start justify-start w-full">
                <h1 className="text-lg tracking-wide">Rename Ad:</h1>
                <input
                  type="text"
                  name="title"
                  className={inputEdit}
                  placeholder="A befeating title."
                  defaultValue={product.title}
                  onChange={handleChange}
                  readOnly={edit ? false : true}
                />
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <h1 className="text-lg tracking-wide">Description:</h1>
                <textarea
                  name="description"
                  id=""
                  cols="30"
                  rows="10"
                  className={inputEdit}
                  placeholder="A catchy description for the the grab"
                  defaultValue={product.description}
                  onChange={handleChange}
                  readOnly={edit ? false : true}
                ></textarea>
              </div>

              <div className="lg:flex flex-col items-start justify-start w-full hidden">
                <img
                  src={product.images[0]}
                  alt="images"
                  className="w-full border-4 border-white hover:scale-105 my-2"
                />
              </div>
            </div>
            {/* last column */}
            <div className="lg:hidden flex order-1 my-3">
              <Carousel
                dynamicHeight={true}
                infiniteLoop={true}
                className="w-full md:w-[60%] lg:w-[60%] xl:w-[50%] mx-auto"
              >
                {product.images.map((img, index) => (
                  <div className="" key={index}>
                    <img
                      src={img}
                      alt={"Vehicle" + index}
                      className="mx-auto "
                    />
                    <p className="legend">{"Vehicle " + index}</p>
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="hidden lg:flex flex-col items-center gap-2 order-3">
              {product.images.map(
                (image, index) =>
                  index !== 0 && (
                    <img
                      src={image}
                      alt={index}
                      key={index}
                      className="w-full border-4 border-white hover:scale-105 my-2"
                    />
                  )
              )}
            </div>
          </div>
          <div className="flex items-start justify-start my-2">
            <button
              className="bg-yellow-400 py-1 px-2 lg:px-4 shadow font-bold md:text-lg lg:text-xl lg:tracking-wide"
              type="button"
            >
              Click here to learn more about this advert.
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateGrab;
