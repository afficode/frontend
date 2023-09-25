import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils";
import { backendLink } from "../../constants";
import { notifyError, notifySuccess, notifyInfo } from "../../ui";
import { api } from "../../utils/axios";
import useAuth from "../../context/UserContext";
import { SpinnerSkeleton } from "../../components/Skeletons";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const notifyErr = (message) => notifyError(message);
  const notifySuc = (message) => notifySuccess(message);
  const notifyInf = (message) => notifyInfo(message);
  useEffect(() => {
    // notifyInf(
    //   "You are been logout. Allow us clean up your space against Hackers."
    // );
    const logoutBackend = async () => {
      await api
        .get(`${backendLink}auth/logout`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(({ data }) => {
          const { message } = data;
          notifySuc(message);
        })
        .catch((err) => {
          const { message } = response.data;
          if (message !== undefined) {
            notifyErr(message);
          } else {
            notifyErr("Something went wrong.");
          }
        });
      // remove the user details from localStorage
      //clearLocalStorage();
      logout();
      navigate("/", { replace: "true" });
    };
    setTimeout(() => {
      logoutBackend();
    }, 4000);

    return;
  }, []);

  return (
    <div className="my-10 lg:my-20">
      <SpinnerSkeleton
        heading={"Logout in Process..."}
        body={
          "Our Logout is done securely. We are cleaning up your space to keep you safe from Hackers. We hope to see you soon. Bye 🙋‍♂️"
        }
        type={"spin"}
        color={"#2686CE"}
        height={250}
        width={250}
      />
    </div>
  );
};

export default Logout;
