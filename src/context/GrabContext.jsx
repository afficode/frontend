import { useContext, createContext, useEffect, useState } from "react";

import useAuth from "./UserContext";
import { getToken } from "../utils";
import { manager } from "../utils/socket";

const GrabContext = createContext();

export const GrabProvider = ({ children }) => {
  const { isLogin } = useAuth();
  const [grabs, setGrabs] = useState([]);
  const socket = manager.socket("/grabber", {
    auth: (cb) => {
      cb({
        token: getToken(),
      });
    },
  });

  socket.on("connect", () => {
    // console.log("Grabber Socket Connected");
  });
  socket.on("grabs", (grabs) => {
    setGrabs(() => [...grabs]);
  });

  const grabAd = (adId) => {
    socket.emit("grab_ad", adId);
  };

  const unGrabAd = (adId) => {
    socket.emit("ungrab_ad", adId);
  };

  const disconnect_socket = () => {
    socket.disconnect();
  };

  useEffect(() => {
    if (isLogin && !socket.active) {
      socket.connect();
      // connecting socket
    }

    socket.on("error", (error) => {
      console.error("Grab Socket connection error:");
      // Handle the error (e.g., display a message to the user)
    });

    socket.on("connect_error", (error) => {
      console.error("Grab Socket connection error:", error?.message);
    });

    return () => socket.disconnect();
  }, [socket]);

  return (
    <GrabContext.Provider
      value={{
        grabs,
        grabAd,
        unGrabAd,
        disconnect_socket,
      }}
    >
      {children}
    </GrabContext.Provider>
  );
};
const useGrabContext = () => {
  const context = useContext(MessageContext);

  if (context === undefined) {
    throw new Error(
      "useGrabContext must be used within the MessageContext. Check main.js."
    );
  }

  return context;
};

export default useGrabContext;
