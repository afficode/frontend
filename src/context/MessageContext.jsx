import { useEffect, useContext, createContext, useState } from "react";
import { Manager } from "socket.io-client";
import useAuth from "./UserContext";
import { backendLink } from "../constants";
import { getToken } from "../utils";
import { useNotify } from "../hooks";

const manager = new Manager(`${backendLink}`, {
  autoConnect: false,
});

const MessageContext = createContext();
export const MessageProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState();
  const [unread, setUnread] = useState(0);
  const notify = useNotify();
  const socket = manager.socket("/message", {
    auth: (cb) => {
      cb({
        token: getToken(),
      });
    },
  });

  const { isLogin, user } = useAuth();
  const [chats, setChats] = useState([]);
  const disconnect_socket = () => {
    socket.disconnect();
  };
  const sendMessage = (messageData) => {
    socket.emit("send_message", { ...messageData }, (response) => {
      // acknowledgement callback function
      console.log(response);
      if (!response.success) {
        notify(response.message, "info");
      }
      if (response.success) {
        notify(response.message, "success");
      }
    });
  };

  const readMessage = (chat_id, receiver) => {
    socket.emit("read_message", chat_id, receiver);
  };

  socket.on("connect_error", (error) => {});

  socket.on("users", (users) => {
    setOnlineUsers(() => [...users]);
  });

  socket.on("new_user", (users) => {
    setOnlineUsers(() => [...users]);
  });

  socket.on("new_message", (data) => {
    const chats = data?.sort((a, b) => {
      return new Date(b.chat_updated_on) - new Date(a.chat_updated_on);
    });
    const sorted = chats?.sort((a, b) => {
      return b.read_status > a.read_status;
    });
    sorted?.forEach((chat) => {
      chat.read_status === 1 && setUnread(parseInt(unread) + 1);
    });
    setChats([...sorted]);
  });

  socket.on("update_chat", (data) => {
    let unreadMessages = 0;
    const chats = data?.sort((a, b) => {
      return new Date(b.chat_updated_on) - new Date(a.chat_updated_on);
    });
    // const sorted = chats?.sort((a, b) => {
    //   return b.read_status >= a.read_status;
    // });
    chats?.forEach((chat) => {
      if (chat.read_status == 0 && chat.sender !== user.id) {
        ++unreadMessages;
      }
    });
    setUnread(unreadMessages);
    setChats(() => [...chats]);
  });

  useEffect(() => {
    if (isLogin && !socket.active) {
      socket.connect();
    }

    socket.on("receive_message", (data) => {
      let unreadMessages = 0;
      const chats = data?.sort((a, b) => {
        return new Date(b.chat_updated_on) - new Date(a.chat_updated_on);
      });
      // const sorted = chats?.sort((a, b) => {
      //   return b.read_status > a.read_status;
      // });
      chats?.forEach((chat) => {
        if (chat.read_status == 0 && chat.sender !== user.id) {
          ++unreadMessages;
        }
      });
      setUnread(unreadMessages);
      setChats(() => [...chats]);
    });

    socket.on("error", (error) => {
      //console.error("Socket connection error:");
      // Handle the error (e.g., display a message to the user)
    });

    socket.on("connect_error", (error) => {
      //console.error("Socket connection error:", error?.message);
      // Handle the error (e.g., display a message to the user)
    });

    return () => socket.disconnect();
  }, [socket]);

  return (
    <MessageContext.Provider
      value={{
        chats,
        sendMessage,
        onlineUsers,
        unread,
        disconnect_socket,
        readMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

const useMessageContext = () => {
  const context = useContext(MessageContext);

  if (context === undefined) {
    throw new Error(
      "useMessageContext must be used within the UserContext. Check App.js."
    );
  }

  return context;
};
export default useMessageContext;
