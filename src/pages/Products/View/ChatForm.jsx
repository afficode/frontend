import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import Input from "../../../components/FormComponents/Input.jsx";
import Button from "../../../ui/Button/index.jsx";
import { privateAxios } from "../../../utils/axios.js";
import useAuth from "../../../context/UserContext.jsx";
import { Link } from "react-router-dom";
import { Approutes } from "../../../constants/routes.js";
import { createChat, useSendMessage } from "../../../hooks/useMessages.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ChatForm = ({ ad_id, owner, active }) => {
  const { isLogin, user } = useAuth();
  const navigate = useNavigate();
  const [blocked, setBlocked] = useState(active === "0");
  const [chatId, setChatId] = useState(null);
  const verifyChat = async () =>
    await privateAxios
      .post("chat/verifyChat", { ad_id, owner })
      .then((res) => {
        res?.data?.chat.length > 0 && setChatId(res?.data?.chat[0].chat_id);
      })
      .catch((error) => {
        // console.log(error);
      });
  useEffect(() => {
    // console.log(user, isLogin);
    if (user) {
      verifyChat();
    }
  }, []);

  const { mutate: creatingChat } = createChat();
  const { mutate, error } = useSendMessage();
  const sendMessage = (message) => {
    // console.log("message", message);
    mutate(message, {
      onError: ({ error }) => {
        console.log("Char", error);
      },
      onSuccess: ({ data }) => {
        // console.log(data);
        if (data.success) {
          setChatId(message.chat_id);
          toast.success(
            "Message sent successfully, The ad owner will be in touch with you soon."
          );
        }
      },
    });
  };

  const chatCreation = async (content) => {
    creatingChat(
      { ad_id },
      {
        onError: (error) => {
          // console.log("Char", error);
          // we redirect the user to login
          navigate("/auth", { replace: false });
        },
        onSuccess: async ({ data }) => {
          //console.log("returned", data);
          if (data?.chat_id) {
            const chat_id = data.chat_id;
            // console.log("On success", data.chat_id);
            sendMessage({ chat_id, content });
          }
        },
      }
    );
  };

  return (
    <Formik
      initialValues={{
        message:
          chatId !== null
            ? "Disabled... Please continue chat in the message section"
            : "Hi There, I am interested in this car, is it still available?",
        phone:
          chatId !== null
            ? "Disabled... Please continue chat in the message section"
            : "",
      }}
      onSubmit={(values) => {
        //const { mutate } = useChats();
        var content = values.message;
        content +=
          values.phone !== ""
            ? ` This is my phone number: ${values.phone}`
            : "";
        chatCreation(content);
        //console.log(actions, values, ad_id, owner);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            disabled={chatId !== null || blocked || user?.id === owner}
            as="textarea"
            name="message"
            id="message"
            className={`border-2 w-full border-gray-200 p-4 focus:outline-none focus:bg-white focus:border-primary tracking-tighter line-clamp-1 ${
              chatId !== null && "bg-gray-300 cursor-not-allowed"
            }`}
            placeholder={
              chatId !== null
                ? "Disabled... Please continue chat in the message section"
                : `Hi There, I am interested in this d, is it still available?`
            }
            cols={20}
            rows={5}
          />
          <Input
            disabled={chatId !== null || blocked || user?.id === owner}
            name="phone"
            id="phone"
            placeholder={
              chatId !== null
                ? "Disabled... Please continue chat in the message section"
                : "Your number here"
            }
            className={`border-2 border-gray-200 w-full p-2 focus:outline-none focus:bg-white focus:border-primary ${
              chatId !== null && "bg-gray-300 cursor-not-allowed"
            }`}
          />
          <p className="w-full text-center my-2 ">
            Your contact details will be included in your reply. BOONFU reserves
            the right to monitor conversations sent through our servers to
            protect you from fraud,spam or suspicious behavior.
          </p>
          {chatId ? (
            <Link to={Approutes.profile.messages}>
              <Button
                disabled={!isLogin || blocked || user?.id === owner}
                variant="secondary"
                size={"full"}
                className="my-2 text-lg font-bold tracking-tighter line-clamp-1"
              >
                Go to Message
              </Button>
            </Link>
          ) : (
            <div
              className={` w-full ${
                !isLogin ? "tooltip tooltip-primary z-1000" : ""
              }`}
              data-tip={`${
                !isLogin
                  ? "Please Login to send message"
                  : "Start a conversation"
              }`}
            >
              <Button
                disabled={!isLogin || blocked || user?.id === owner}
                loading={isSubmitting}
                type="submit"
                variant="primary"
                size={"full"}
                className="my-2 text-lg font-bold tracking-tighter line-clamp-1"
              >
                Submit
              </Button>
            </div>
          )}
          <Button
            variant="secondary"
            size={"full"}
            className="my-2 text-lg tracking-tighter line-clamp-1"
            disabled={!isLogin || blocked || user?.id === owner}
          >
            Grab Item
          </Button>
          <Button
            size={"full"}
            className="my-2 text-lg text-white bg-slate-600 hover:bg-slate-500 w-full p-2 tracking-tighter line-clamp-1"
            disabled={!isLogin || blocked || user?.id === owner}
          >
            Feedback
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ChatForm;
