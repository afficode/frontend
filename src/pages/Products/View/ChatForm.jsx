import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import Input from "../../../components/FormComponents/Input.jsx";
import Button from "../../../ui/Button/index.jsx";
import { privateAxios } from "../../../utils/axios.js";
import useAuth from "../../../context/UserContext.jsx";
import { Link } from "react-router-dom";
import { Approutes } from "../../../constants/routes.js";
import { createChat, useSendMessage } from "../../../hooks/useMessages.js";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useNotify from "../../../hooks/useNotify.jsx";
// import { Modal } from "../../../ui/index.js";
import Modal from "./Modal.jsx";
import ReportAd from "./ReportAd.jsx";
import { FaEnvelope } from "react-icons/fa";
import { FaMicrochip } from "react-icons/fa6";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";

const ChatForm = ({ ad_id, owner, active, feature }) => {
  const { isLogin, user } = useAuth();
  const navigate = useNavigate();
  
  // Modal
  // const [isOpen, setIsOpen] = useState(false);
  const [blocked, setBlocked] = useState(active === "0");
  const [chatId, setChatId] = useState(null);
  const notify = useNotify();
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
          // toast.success(
          //   "Message sent successfully, The ad owner will be in touch with you soon."
          // );
          notify(
            "Message sent successfully, The ad owner will be in touch with you soon.",
            "success"
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
    <div className="">
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
              disabled={!isLogin || chatId !== null || blocked || user?.id === owner}
              as="textarea"
              name="message"
              id="message"
              className={`border-2 w-full border-gray-200 p-4 focus:outline-none focus:bg-white focus:border-primary tracking-tighter line-clamp-1 ${!isLogin && "bg-gray-100 cursor-not-allowed"} ${
                (chatId !== null) && "bg-gray-300 cursor-not-allowed"
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
              className={`border-2 border-gray-200 w-full p-2 focus:outline-none focus:bg-white focus:border-primary ${!isLogin && "bg-gray-100 cursor-not-allowed"} ${
                chatId !== null && "bg-gray-300 cursor-not-allowed"
              }`}
            />
            <p className="w-full my-2 text-center ">
              Your contact details will be included in your reply. BOONFU
              reserves the right to monitor conversations sent through our
              servers to protect you from fraud,spam or suspicious behavior.
            </p>
            {chatId ? (
              <Link to={Approutes.profile.messages}>
                <Button
                  disabled={!isLogin || blocked || user?.id === owner}
                  variant="secondary"
                  size={"full"}
                  className="my-2 text-lg font-bold tracking-tighter line-clamp-1"
                >
                  <span className="flex gap-2 lg:gap-4 items-center justify-center">
                    {" "}
                    Go to Message <FaEnvelope className="my-auto" />
                  </span>
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

            { feature == '3' && (
            <Button
              variant="secondary"
              size={"full"}
              className="my-2 text-lg tracking-tighter line-clamp-1"
              disabled={!isLogin || blocked || user?.id === owner}
              type="button"
            >
              <span className="flex items-center gap-2 justify-center">
                Grab Item
                <FaMicrochip className="my-auto" />
              </span>{" "}
            </Button> )}

            {/* <Button
            size={"full"}
            className="w-full p-2 my-2 text-lg tracking-tighter text-white bg-slate-600 hover:bg-slate-500 line-clamp-1"
            disabled={!isLogin || blocked || user?.id === owner}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="flex items-center gap-2 justify-center">
              Feedback <BiSolidMessageRoundedDetail className="my-auto" />
            </span>
          </Button> */}
            {/* <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalHeader={true}
            children={<ReportAd />}
            headerText={"Feedback / Abuse"}
          /> */}
          </Form>
        )}
      </Formik>
      <Modal
        modalHeader={true}
        children={<ReportAd ad_id={ad_id} />}
        headerText={"Feedback / Abuse"}
        className={`w-full p-2 my-2 text-lg tracking-tighter text-white bg-slate-600 hover:bg-slate-500 line-clamp-1 ${!isLogin && "cursor-not-allowed"}`}
        disabled={!isLogin || blocked || user?.id === owner}
        type="button"
        buttonChild={
          <>
            <span className="flex items-center gap-2 justify-center">
              Feedback <BiSolidMessageRoundedDetail className="my-auto" />
            </span>
          </>
        }
      />
    </div>
  );
};

export default ChatForm;
