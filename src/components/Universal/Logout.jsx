import React from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
  //const navigate = useNavigate();
  if (localStorage.getItem("user") !== null) {
    localStorage.removeItem("user");
    localStorage.removeItem("productToGrab");
    return <Navigate to="/auth" />;
  }

  return <Navigate to="/" />;
};

export default Logout;
