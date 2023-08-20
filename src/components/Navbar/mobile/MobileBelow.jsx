import React, { useContext} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCarSide,
    faTruck,
    faUserTie,
    faBuildingUser,
    faCameraRetro,
    faHouseCircleExclamation,
    faUserShield,
    faUsersGear,
    faMoneyBillTransfer,
    faBed,
    faPeopleRoof,
    faSackDollar,
    faMagnet,
    faPersonCircleQuestion,
    faPersonChalkboard,
    faStarAndCrescent,
    faChurch,
    faVanShuttle,
    faBinoculars,
    faCarAlt,
    faStarHalfStroke,
    faFileCircleExclamation,
    faFileCircleQuestion,
    faShop,
    faTractor,
    faMotorcycle,
    faHandshake,
    faFilterCircleDollar,
    faSort,
    faCogs,
    faGears,
    faPlaneDeparture,
    faListUl,
    faScrewdriverWrench,
    faDog,
    faWheatAwn,
    faTrowelBricks,
    faBus,
    faCakeCandles,
    faUserGraduate,
    faChampagneGlasses,
    faGaugeHigh,
    faBuilding,
    faHandsHoldingChild,
    faShirt,
    faBowlRice,
    faTruckField,
    faScaleBalanced,
    faStore, faCar
  } from "@fortawesome/free-solid-svg-icons";
import { ListGroup, Button } from "flowbite-react";
import { NavbarContext } from "../../../context/NavbarProvider";

const MobileBelow = () => {

  const {
    vehicle,
    vehicleDiv,
    property,
    propertyDiv,
    services,
    servicesDiv,
    forSales,
    forSalesDiv,
    resetAllDiv,
    toggleVehicle,
    toggleVehicleDiv,
    toggleProperty,
    togglePropertyDiv,

    toggleServices,
    toggleServicesDiv,
    toggleForSales,
    toggleForSalesDiv,
  } = useContext(NavbarContext);
        
        const liClassSingle =
          "transition ease-in-out delay-100 hover:underline hover:text-yellow-200 duration-300 m-auto";
        const liClass =
          "transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 hover:underline hover:text-yellow-200 duration-300 ";
  return (
    <div className="">
    <div className='bg-green-400 px-3 py-2 shadow-yellow-200 shadow-inner'>
        <div className="flex items-center justify-start gap-3">
          <div className="w-full">
            <ul className="grid grid-cols-5 divide-x-2 text-center cursor-pointer font-semibold ">
              <li 
              onMouseEnter={() => { resetAllDiv(); }}
              className={liClassSingle}>
                
                <FontAwesomeIcon
              icon={faStore}
              className="my-auto text-2xl text-gray-100"
            />{" "} </li>
              <li
                onMouseEnter={() => {
                  toggleVehicle(true);
                  toggleVehicleDiv(true);
                  togglePropertyDiv(false);
                  toggleServicesDiv(false);
                  toggleForSalesDiv(false);
                }}
                onMouseLeave={() => {
                  toggleVehicle(false);
                  toggleVehicleDiv(true);
                }}
                className={liClass}
              >
                <FontAwesomeIcon
                    icon={faCar}
                    className="my-auto text-2xl text-gray-100"
                  />{" "} 
              </li>
              <li
                onMouseEnter={() => {
                  toggleProperty(true);
                  togglePropertyDiv(true);
                  toggleVehicleDiv(false);
                  toggleServicesDiv(false);
                  toggleForSalesDiv(false);
                }}
                onMouseLeave={() => {
                  toggleProperty(false);
                  togglePropertyDiv(true);
                }}
                className={liClass}
              >
                <FontAwesomeIcon
                      icon={faBuilding}
                      className="my-auto text-2xl text-gray-100"
                    />{" "}
              </li>
              <li
                onMouseEnter={() => {
                  toggleServices(true);
                  toggleServicesDiv(true);
                  toggleVehicleDiv(false);
                  togglePropertyDiv(false);
                  toggleForSalesDiv(false);
                }}
                onMouseLeave={() => {
                  toggleServices(false);
                  toggleServicesDiv(true);
                }}
                className={liClass}
              >
                <FontAwesomeIcon
                      icon={faCogs}
                      className="my-auto text-2xl text-gray-100"
                    />{" "}
              </li>
              <li
                onMouseEnter={() => {
                  toggleForSales(true);
                  toggleForSalesDiv(true);
                  toggleServicesDiv(false);
                  toggleVehicleDiv(false);
                  togglePropertyDiv(false);
                }}
                onMouseLeave={() => {
                  toggleForSales(false);
                  toggleForSalesDiv(true);
                }}
                className={liClass}
              >
                <FontAwesomeIcon
                      icon={faSackDollar}
                      className="my-auto text-2xl text-gray-100"
                    />{" "}
              </li>
            </ul>
          </div>
        </div>
    </div>
    

    {/* car and vehicle dropdown */}
    <div
        className={
          vehicle || vehicleDiv ? "w-full z-10 absolute top-[90%] " : "hidden"
        }
      >
        <div
          onMouseLeave={() => {
            toggleVehicleDiv(false);
          }}
          className={
            vehicle || vehicleDiv
              ? "lg:max-w-[50%] md:max-w-[70%] mx-auto text-black bg-white shadow-2xl shadow-gray-500 p-3"
              : "hidden"
          }
        >
          <div className="grid grid-cols-3 divide-x-4 cursor-pointer font-light gap-3">
            {/* browse by category  */}
            <div id="left" className="col-span-2 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <span className="text-gray-700 font-bold text-2xl text-center block w-full">
                  Browse Categories By{" "}
                </span>
              </div>
              <div id="left">
                <ListGroup>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faCarSide}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Cars
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faMotorcycle}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Motobike / Scooters
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faVanShuttle}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Vans
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faTruck}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Trucks
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faTractor}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Tractor and Plants
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faGears}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Parts
                  </ListGroup.Item>
                </ListGroup>
              </div>
              <div id="right">
                <ListGroup>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faGaugeHigh}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Automobile
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faHandshake}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Best Deals
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faScrewdriverWrench}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Accessories
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faFilterCircleDollar}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Request
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faSort}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Other Vehicle
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>

            {/* discover more */}
            <div id="right" className="pl-3">
              <p className="font-bold text-lg text-black text-center block w-full mb-5">
                <FontAwesomeIcon
                  icon={faBinoculars}
                  className="my-auto text-lg text-gray-600"
                />{" "}
                Discover More{" "}
              </p>
              <ListGroup>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faCarAlt}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Latest Car
                </ListGroup.Item>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faStarHalfStroke}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Review on Cars
                </ListGroup.Item>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faFileCircleExclamation}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Buy Guide
                </ListGroup.Item>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faFileCircleQuestion}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Seller's Guide
                </ListGroup.Item>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faShop}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Spare parts shop
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        </div>
      </div>

      {/* property */}
      <div
        className={
          property || propertyDiv ? "w-full z-10 absolute top-[90%] " : "hidden"
        }
      >
        <div
          onMouseLeave={() => {
            togglePropertyDiv(false);
          }}
          className={
            property || propertyDiv
              ? "lg:max-w-[50%] md:max-w-[90%] mx-auto text-xl text-black bg-white shadow-2xl shadow-gray-500 p-3"
              : "hidden"
          }
        >
          <div className="grid grid-cols-3 divide-x-4 cursor-pointer font-light gap-3">
            {/* browse by category  */}
            <div id="left" className="col-span-2 grid grid-cols-2 gap-4">
              <div id="left">
                <p className="font-bold mb-3 text-xl underline text-center block">
                  Specialist
                </p>
                <ListGroup>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faUserTie}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Property Manager
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faBuildingUser}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Building Contractor
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faCameraRetro}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Real Estate Photographers
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faUserShield}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Property Inspector
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faUsersGear}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Real Estate Agents
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faHouseCircleExclamation}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Home Improvement Agents
                  </ListGroup.Item>
                </ListGroup>
              </div>
              <div id="right">
                <p className="font-bold mb-3 text-xl underline text-center block">
                  Property Types
                </p>
                <ListGroup>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faSackDollar}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; For Sale
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faBed}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; To Let
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faPeopleRoof}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Property to Share
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faMoneyBillTransfer}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Property to Lease
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faMagnet}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Find Agent
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faPersonCircleQuestion}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Property Wanted
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faPersonChalkboard}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Property for commercial
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faStarAndCrescent}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Property for Mosque
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faChurch}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Property for Church
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>

            {/* Register as Agent */}
            <div id="right" className="pl-3 my-auto">
              <div className="flex items-center justify-center">
                <Button outline={true} gradientDuoTone="redToYellow">
                  Register as an agent
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* services */}
      <div
        className={
          services || servicesDiv ? "w-full z-10 absolute top-[90%] " : "hidden"
        }
      >
        <div
          onMouseLeave={() => {
            toggleServicesDiv(false);
          }}
          className={
            services || servicesDiv
              ? "lg:max-w-[50%] md:max-w-[90%] mx-auto text-xl text-black bg-white shadow-2xl shadow-gray-500 p-3"
              : "hidden"
          }
        >
          <div className="grid grid-cols-3 cursor-pointer font-light gap-3">
            {/* browse by category  */}
            <div id="left">
              <ListGroup>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Business & Office
                </ListGroup.Item>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faHandsHoldingChild}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Child Care
                </ListGroup.Item>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faShirt}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Clothing
                </ListGroup.Item>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faBowlRice}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Food & Drinks
                </ListGroup.Item>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faTruckField}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Goods Suppliers & Retailers
                </ListGroup.Item>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faScaleBalanced}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Legal & Finance
                </ListGroup.Item>
              </ListGroup>
            </div>
            <div id="center" className="ml-5">
              <ListGroup>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faDog}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Animals & Pets
                </ListGroup.Item>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faScrewdriverWrench}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Property & Maintainance
                </ListGroup.Item>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faWheatAwn}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Farming
                </ListGroup.Item>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faTrowelBricks}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Tradesman & Construction
                </ListGroup.Item>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faBus}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Transport
                </ListGroup.Item>
              </ListGroup>
            </div>

            {/* Register as Agent */}
            <div id="right" className="my-auto">
              <div className="flex items-center justify-center">
                <ListGroup>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faCakeCandles}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Wedding
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faUserGraduate}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Tutorial & Classes
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faChampagneGlasses}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Entertainment
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faPlaneDeparture}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Travel & Tourism
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FontAwesomeIcon
                      icon={faListUl}
                      className="my-auto text-lg text-gray-600"
                    />{" "}
                    &emsp; Others
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* For Sales */}
      <div
        className={
          forSales || forSalesDiv
            ? "w-full z-10 absolute top-[90%]  "
            : "hidden"
        }
      >
        <div
          onMouseLeave={() => {
            toggleForSalesDiv(false);
          }}
          className={
            forSales || forSalesDiv
              ? "lg:max-w-[50%] md:max-w-[90%] float-right text-xl text-black bg-white shadow-2xl shadow-gray-500 p-3"
              : "hidden"
          }
        >
          <div className="grid grid-cols-2 divide-x-4 cursor-pointer font-light gap-3">
            {/* left  */}
            <div id="left">
              <h2 className="font-semibold text-center underline tracking-wide text-2xl">
                Explore For Sales
              </h2>
              <p className="text-center my-1 text-sm font-semibold">
                Choose category to expolore
              </p>
              <ListGroup>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faVanShuttle}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Car & Vehicle
                </ListGroup.Item>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Properties
                </ListGroup.Item>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faCogs}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Services
                </ListGroup.Item>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faSackDollar}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; For Sales
                </ListGroup.Item>
              </ListGroup>
            </div>

            {/* Right */}
            <div id="right" className="my-auto pl-4">
              <h2 className="font-semibold text-center  tracking-wide text-2xl">
                Have something to advertise
              </h2>
              <p className=" my-1 text-sm font-semibold">
                Select Category to post advert in
              </p>
              <ListGroup>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faVanShuttle}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Car & Vehicle
                </ListGroup.Item>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Properties
                </ListGroup.Item>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faCogs}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; Services
                </ListGroup.Item>
                <ListGroup.Item>
                  <FontAwesomeIcon
                    icon={faSackDollar}
                    className="my-auto text-lg text-gray-600"
                  />{" "}
                  &emsp; For Sales
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default MobileBelow;