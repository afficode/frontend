import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ShopAdvert from "../../components/Universal/ShopAdvert";
import Below from "../../components/Universal/Below";
import { NavbarContext } from "../../context/NavbarProvider";
import ViewGrab from "../../components/Product/Grab/ViewGrab";
import { getToken, getUser } from "../../utils";
import axios from "axios";
import { backendLink } from "../../utils/basicInfo";
import { UserContext } from "../../context/UserContextProvider";
const ViewGrabbed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { grabbedProductId } = useParams();
  const { isGrabber } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { resetAllDiv, setLink } = useContext(NavbarContext);

  const user = getUser();
  const token = getToken();

  useEffect(() => {
    let source = axios.CancelToken.source();
    let config = {
      cancelToken: source.token,
      headers: {
        Authorization: token,
      },
    };
    const fetchData = async () => {
      const userId = user.id;
      await axios
        .get(
          backendLink +
            `/grab/product?userId=${userId}&grabbedProductId=${grabbedProductId}`,
          config
        )
        .then(({ data }) => {});
    };
    if (user) {
      fetchData();
    } else {
      setLink(location.pathname);
      navigate("/auth");
    }
  }, user);

  return (
    <div className="flex flex-col w-full font-barlow">
      <div className="z-40 fixed top-0 w-100">
        <Navbar />
      </div>
      <div className="z-10 mt-[107px] relative">
        <ShopAdvert />
      </div>
      {/* View Products */}
      <div
        className="z-10"
        onMouseEnter={() => resetAllDiv()}
        onClick={() => resetAllDiv()}
      >
        <ViewGrab />
      </div>
      {/* footer */}
      <div className="z-10">
        <Below />
      </div>
    </div>
  );
};

export default ViewGrabbed;
