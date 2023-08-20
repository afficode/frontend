import React, { useContext, useState, useEffect } from "react";
import {
  TextInput,
  Badge,
  Button,
  Tooltip,
  Dropdown,
  Avatar,
} from "flowbite-react";
import {
  HiViewGrid,
  HiBookmark,
  HiCreditCard,
  HiMail,
  HiFingerPrint,
  HiFlag,
  HiChip,
  HiSupport,
  HiLogout,
  HiOutlineSpeakerphone,
  HiSearch,
  HiTruck,
  HiOfficeBuilding,
} from "react-icons/hi";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShop,
  faCogs,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import { NavbarContext } from "../../../context/NavbarProvider";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContextProvider";
import { getUser } from "../../../utils";

const Topnav = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const data = getUser();
    if (data) {
      setUser(data);
    }
    return () => {
      //cleanup
    };
  }, []);
  const { resetAllDiv } = useContext(NavbarContext);
  return (
    <div
      onMouseEnter={() => {
        resetAllDiv();
      }}
      className="w-full bg-green-500 flex items-center justify-between px-3 py-1 shadow-gray-300 shadow-inner border-white border-b-4"
    >
      <div className="cursor-pointer">
        <Link to={"/"}>Logo</Link>
      </div>
      <div className="w-full">
        <form className="flex items-center justify-center gap-2 w-full">
          <div className="w-[60%] italic">
            <TextInput
              type="text"
              placeholder="Search for anything..."
              required={true}
              icon={HiSearch}
            />
          </div>
          <Tooltip
            content="Search for content"
            style="light"
            placement="bottom"
          >
            <Button type="submit">
              {/* <HiSearch className="text-xl" /> */}
              Search
            </Button>
          </Tooltip>
        </form>
      </div>
      <div className="md:w-[40%] lg:w-[30%] ml-0">
        <div className="flex items-end justify-end gap-5">
          <div className="flex flex-col items-center cursor-pointer">
            <HiBookmark className=" text-3xl" />
            <span className="text-center font-semibold text-sm ">Saved</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <Dropdown
              label={
                <div>
                  <HiOutlineSpeakerphone className=" text-3xl" />
                  <p className="text-center font-semibold text-sm block">
                    PostAd
                  </p>
                </div>
              }
              inline={true}
            >
              <Dropdown.Header>
                <span className="block text-xl font-semibold truncate">
                  Post Ads for
                </span>
              </Dropdown.Header>
              <Dropdown.Item icon={HiTruck}>
                <Link to={"/ads/car"}>Car & Vehicle</Link>
              </Dropdown.Item>
              <Dropdown.Item icon={HiOfficeBuilding}>
                <Link to={"/ads/property"}>Property</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to={"/ads/service"}>
                  <FontAwesomeIcon
                    icon={faCogs}
                    className="my-auto text-gray-600"
                  />{" "}
                  &nbsp; Services
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to={"/ads/forsale"}>
                  <FontAwesomeIcon
                    icon={faSackDollar}
                    className="my-auto text-gray-600"
                  />{" "}
                  &nbsp; For Sales
                </Link>
              </Dropdown.Item>
            </Dropdown>
          </div>
          <div className="flex items-center my-auto mr-4">
            {user ? (
              <>
                <Dropdown
                  label={
                    <Avatar
                      img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      rounded={true}
                    />
                  }
                  inline={true}
                >
                  <Dropdown.Header>
                    <span className="block text-sm">{`${user.firstname} ${user.lastname}`}</span>
                    <span className="block text-sm font-medium truncate">
                      {user.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item icon={HiViewGrid}>
                    <Link to={"/dashboard"}> Dashboard </Link>
                  </Dropdown.Item>
                  <Dropdown.Item icon={HiFingerPrint}>
                    <Link to={"/setting/details"}> My Details </Link>
                  </Dropdown.Item>
                  <Dropdown.Item icon={HiMail}>
                    Messages &emsp;
                    <div className="ml-auto">
                      <Badge size="sm" color="success">
                        {" "}
                        2{" "}
                      </Badge>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to={"/setting/shopinfo"}>
                      {" "}
                      <FontAwesomeIcon
                        icon={faShop}
                        className="my-auto text-gray-600"
                      />{" "}
                      &nbsp; My Shop{" "}
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item icon={HiFlag}>Manage My Ads</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item icon={HiCreditCard}>
                    My Transaction
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item icon={HiChip}>
                    Grabs &emsp;
                    <div className="ml-auto">
                      <Badge size="sm" color="indigo">
                        {" "}
                        24{" "}
                      </Badge>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item icon={HiBookmark}>
                    Saved Items &emsp;
                    <div className="ml-auto">
                      <Badge size="sm"> 29 </Badge>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item icon={HiSupport}>Help & Contact</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item icon={HiLogout}>
                    <Link to={"/logout"}>Sign out</Link>
                  </Dropdown.Item>
                </Dropdown>
              </>
            ) : (
              <>
                <Dropdown
                  label={
                    <Avatar
                      img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      rounded={true}
                    />
                  }
                  inline={true}
                >
                  <Dropdown.Item icon={HiFingerPrint}>
                    <Link to={"/auth"}>Authenticate</Link>
                  </Dropdown.Item>
                </Dropdown>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topnav;
