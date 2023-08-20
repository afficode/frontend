import { createContext, useState, useEffect } from "react";
import { getUser, getToken } from "../utils";
import axios from "axios";
import { backendLink } from "../utils/basicInfo";

// create a context
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  // change to user context
  const [user, setUser] = useState(getUser());
  const [grabberInfo, setGrabberInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  // const [savedItems, setSavedItems] = useState(null);
  // const [grabbedItems, setGrabbedItems] = useState(null);
  const [isGrabber, setIsGrabber] = useState(null);
  const token = getToken();
  const setGrabberData = (data) => {
    setGrabberInfo((prev) => ({ ...data }));
  };
  useEffect(() => {
    let source = axios.CancelToken.source();
    let config = {
      cancelToken: source.token,
      headers: {
        Authorization: token,
      },
    };
    const fetchSave = async () => {
      //console.log(user);
      await axios
        .get(backendLink + `/grab/verifyGrabber?userId=${user.id}`, config)
        .then(({ data }) => {
          //console.log(data);
          if (data.success === true) {
            setGrabberInfo(data.grabberInfo);
          } else {
            setErrorMessage(data.message);
          }
        })
        .catch((err) => {
          //console.log(err);
          //setError(err.data.message);
          //setErrorMessage(err.data.message);
        });
    };
    const getInfo = async () => {
      // get user Saved Items
      await axios
        .get(backendLink + `/api/getUserData?userId=${user.id}`, config)
        .then(({ data }) => {
          ////console.log(data);
          if (data.success === true) {
            // update the saved Items
            // update the grabber items
            // update the amount of ads the user have
            // saves from his shop if he has a shop
            // shop visits
            // shop impressed
            // how many people viewed his profile
          } else {
            setErrorMessage(data.message);
          }
        })
        .catch((err) => {
          //console.log(err);
          //setError(err.data.message);
          setErrorMessage(err.response.data.message);
        });
      //get use grabbed Items if he is a grabber
    };
    if (user !== null) {
      if (user.grabber_id !== null) {
        setIsGrabber(true);
      }
      //fetchSave();
    } else {
      setGrabberInfo(null);
    }
  }, [user]);
  return (
    <UserContext.Provider
      value={{
        user,
        isGrabber,
        grabberInfo,
        errorMessage,
        setIsGrabber,
        setGrabberInfo,
        setGrabberData,
        setErrorMessage,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
