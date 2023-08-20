import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/UserContextProvider";
import { NavbarContext } from "../../../context/NavbarProvider";
import CreateGrab from "./CreateGrab";
import RegisterGrabber from "./RegisterGrabber";
import { useNavigate, useLocation } from "react-router-dom";
import { getUser } from "../../../utils";

const GrabProduct = () => {
  // verify the user is a grabber, if not let them register.
  const { isGrabber } = useContext(UserContext);
  const { setLink } = useContext(NavbarContext);
  const user = getUser();
  const navigate = useNavigate();
  const location = useLocation();
  setLink(location.pathname);
  //console.log(isGrabber);
  if (!user) {
    navigate("/auth");
  } else {
    // the user is logged in
    if (user.grabber_id !== null) {
    }
  }
  // if (!isGrabber) {
  //   // this person is not a grabber.
  //   // let him be informed on becoming a grabber.
  //   return <RegisterGrabber />;
  // } else {
  //   return <CreateGrab />;
  // }

  return <>{!isGrabber ? <RegisterGrabber /> : <CreateGrab />}</>;
};

export default GrabProduct;
