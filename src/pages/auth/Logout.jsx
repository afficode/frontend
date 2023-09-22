import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, clearLocalStorage } from "../../utils";
import { backendLink } from "../../constants";
import { notifyError, notifySuccess } from "../../ui";
import api from "../../utils/axios";

const Logout = () => {
  const navigate = useNavigate();
  const notifyErr = (message) => notifyError(message);
  const notifySuc = (message) => notifySuccess(message);
  useEffect(() => {
    // remove the user details from localStorage
    console.log(getToken());
    const logoutBackend = async () => {
      await api
        .get(`${backendLink}auth/protected`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(({ data }) => {
          const { message } = data;
          console.log(data);
          // notifySuc(message);
          // clearLocalStorage();
          // navigate("/", { replace: "true" });
        })
        .catch((err) => {
          console.log(err);
          // const { message } = response.data;
          // if (message !== undefined) {
          //   notifyErr(message);
          // } else {
          //   notifyErr("Something went wrong.");
          // }
        });
    };
    logoutBackend();

    // return <Navigate to={"/"} replace={true} />;
    return;
  }, []);
};

export default Logout;
