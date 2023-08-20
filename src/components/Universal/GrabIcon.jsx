import React, { useState, useEffect, useContext } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ReactLoading from "react-loading";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { Tooltip } from "flowbite-react";
import { HiChip } from "react-icons/hi";
import { TbHandOff } from "react-icons/tb";
import { encodeProductId, getToken, getUser } from "../../utils";
import axios from "axios";
import { backendLink } from "../../utils/basicInfo";
import { UserContext } from "../../context/UserContextProvider";
import { NavbarContext } from "../../context/NavbarProvider";
import { ProductContext } from "../../context/ProductProvider";
import { toast } from "react-hot-toast";

const GrabIcon = ({ productId, userId, product }) => {
  ////console.log("grabIcon", product);
  // make sure u change this grabbed to null
  // it will be changed to false to aid development
  const { updateProduct } = useContext(ProductContext);
  const { setLink } = useContext(NavbarContext);
  const [grabbed, setGrabbed] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = getToken();
  const { setIsGrabber } = useContext(UserContext);
  const user = getUser();
  //const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [nav, setNav] = useState(false);

  let source = axios.CancelToken.source();
  let config = {
    cancelToken: source.token,
    headers: {
      Authorization: token,
    },
  };
  //const prodId = encodeProductId(productId);
  const grabProduct = async () => {
    // update the ProductProvider
    updateProduct(product);
    // //console.log(token); // token to show the person is logged in and can grab a product
    await axios
      .get(`${backendLink}/users/verifyToken`, config)
      .then(({ data }) => {
        // successfully got to where we are going
        // if the token is valid, then we have to
        //console.log(data); // this is from the backend response to let us know its successfull
        if (data.success && data.valid) {
          //navigate(`/grabProduct/${encodeProductId(productId)}`);
          // * if the data was successful, then navigate to where we can start grabbing the product
          // //console.log(prodId);
          // set to true to verify the user token is Ok and the nav is set to true
          setNav(true);
          //return <Navigate to="dashboard" />;
        }
      })
      .catch(({ response }) => {
        ////console.log("error", response);
        toast.error("Error grabbing product. Please try again");
        setLink(`/grabProduct/${encodeProductId(productId)}`);
        // the user is not authenticated
        if (response.data.errorCode === 401) {
          setError(true);
        } else {
          // go back to the previous page
          return <Navigate to={window.history.go(-1)} />;
        }
      });
  };

  const unGrabProduct = async () => {
    setIsLoading(true);
    await axios
      .get(
        `/grab/ungrabProduct?userId=${userId}&productId=${productId}`,
        config
      )
      .then(({ data }) => {
        // successfully got to where we are going
        //console.log(data);
        setGrabbed(false);
        setIsLoading(false);
        toast.success("Product grabbed successful");
      })
      .catch((err) => {
        toast.error("Product ungrabbing not successfull");
      });
  };
  useEffect(() => {
    // set grabbers ID once the icon load
    if (user?.grabber_id && user.grabber_id !== null) {
      setIsGrabber(true);
      ////console.log(user.grabber_id);
    }
    // verify if the product is grabbed
    const fetchData = async () => {
      await axios
        .get(
          backendLink +
            `/grab/verifyProductGrab?userId=${userId}&productId=${productId}`,
          config
        )
        .then(({ data }) => {
          ////console.log(data);
          if (data.success === true) {
            setGrabbed(true);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          ////console.log(err);
          setIsLoading(false);
        });
    };

    fetchData();
  }, []);

  if (nav) {
    return <Navigate to={`/grabProduct/${encodeProductId(productId)}`} />;
  }

  if (error) {
    return <Navigate to={"/logout"} />;
  }
  if (isLoading) {
    return (
      <ReactLoading
        type={"spin"}
        height={"30%"}
        width={"30%"}
        color=" #6b9f5e "
      />
    );
  }
  if (grabbed) {
    return (
      <Tooltip content="Ungrab Product">
        <TbHandOff
          className="text-xl lg:text-2xl  text-red-600 cursor-pointer"
          onClick={unGrabProduct}
        />
      </Tooltip>
    );
  } else {
    return (
      <Tooltip content="Grab Product">
        {/* <Link to={`/grabProduct/${encodeProductId(productId)}`}> */}
        <HiChip
          className="text-xl lg:text-2xl  text-green-700 cursor-pointer hover:text-blue-700"
          onClick={grabProduct}
        />
        {/* </Link> */}
      </Tooltip>
    );
  }
};

export default GrabIcon;
