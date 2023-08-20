import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosWithToken from "../../../utils/Axios";
import ReactLoading from "react-loading";
import { getUser, makeGrabberId } from "../../../utils";
import { UserContext } from "../../../context/UserContextProvider";
import { NavbarContext } from "../../../context/NavbarProvider";
import toast from "react-hot-toast";

const RegisterGrabber = () => {
  const user = getUser();
  const navigate = useNavigate();
  const {
    setGrabberData,
    errorMessage,
    setErrorMessage,
    isGrabber,
    setIsGrabber,
  } = useContext(UserContext);
  const { link } = useContext(NavbarContext);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(false);
  const [grabberId, setGrabberId] = useState(null);
  const registerGrabber = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      await axiosWithToken(`/grab/createGrabber/${user.id}`)
        .then(({ status, data }) => {
          toast.success(data.message);
          //console.log(data);
          if (status === 201) {
            if (data.grabberInfo && data.grabberInfo.grabber_id) {
              setGrabberId(data.grabberInfo.grabber_id);
            }
            setIsGrabber(true);
            setErrorMessage(data.message);
            setIsLoading(false);
            setError(false);
            // //console.log(link);
            setTimeout(() => {
              setErrorMessage(null);
              setIsLoading(null);
              if (data.grabberInfo && data.grabberInfo.grabberActive === "0") {
                // * means the grabber was just created
                setGrabberData(data.grabberInfo);
                localStorage.setItem(
                  "grabberInfo",
                  JSON.stringify(data.grabberInfo)
                );
              }
            }, 10000);
          } else {
            setErrorMessage(data.message);
            setIsLoading(false);
            setError(true);
            setTimeout(() => {
              setErrorMessage(null);
              setIsLoading(null);
            }, 10000);
          }
        })
        .catch((err) => {
          //console.log(err);
          setError(true);
          setErrorMessage(
            "Unable to generate a grabber ID, Please contact Admin using the support form."
          );
          setIsLoading(false);
          setTimeout(() => {
            setErrorMessage(null);
            setIsLoading(null);
          }, 10000);
        });
    }, 3000);
  };
  if (isGrabber) {
    if (link !== null) {
      return navigate(link);
    } else {
      return navigate("/dashboard");
    }
  }
  return (
    <div className="full my-3">
      <div className="w-[80%] mx-auto bg-gray-50 flex flex-col items-center justify-center">
        {isLoading === false && (
          <div
            className={`w-full text-center font-semibold p-2 ${
              error !== null
                ? "text-green-600 bg-green-300"
                : "text-red-700 bg-red-300"
            }`}
          >
            {errorMessage}{" "}
            {error === false && (
              <div className="flex items-center justify-center">
                <br />
                <span> We are redirecting you to dashboard</span> &nbsp;{" "}
                <ReactLoading
                  type={"bars"}
                  height={"3.5rem"}
                  width={"3.5rem"}
                  color="#fff"
                />
              </div>
            )}
          </div>
        )}
        {isLoading ? (
          <div className="w-full md:w-[60%] mx-auto bg-gray-100 border-gray-600 my-3">
            <p className="text-center tracking-wide text-success text-2xl pt-10 ">
              You are been registered as a Grabber.
            </p>
            <p className="text-lg text-center">
              Please bear with us, we are registering your account as a grabber.{" "}
              <br />
              Your Grabber ID will be revealed if you account is registered
              successfully.
            </p>
            <ReactLoading
              type={"spinningBubbles"}
              color="#03fca5"
              height={"30%"}
              width={"30%"}
              //delay={"2000"}
              className="mx-auto py-7"
            />
          </div>
        ) : (
          <div>
            {grabberId ? (
              <div className="md:w-[70%] p-2 md:p-4 text-center mx-auto">
                Your Grabber ID is:{" "}
                <span className="text-blue-500">
                  {" "}
                  {makeGrabberId(grabberId)} <br />
                  <br />{" "}
                </span>
                <p className="my-2 text-justify p-3">
                  Congratulation, You have been registered to start your
                  grabbing Ads from POSTS and SHOPS. <br /> Please note, it will
                  take Admin minimum of 24 - 48 hours to approve your request.{" "}
                  <br /> If after 48 you don't reveive an email from us, Please
                  contact us using the support form and your grabber ID defined
                  above. <br /> You can save any product you want to grab and
                  grab them when your Grabber ID has been verified. <br />
                  Below are the important things you need to know and will gain:
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dignissimos reprehenderit necessitatibus neque! Aperiam
                  temporibus facilis iusto, molestiae aut voluptatum quaerat
                  unde possimus quod quae ipsa reprehenderit maiores hic vel
                  consequuntur! Consequuntur similique tempore aperiam! Quidem
                  ducimus fugit, animi eos harum pariatur laborum repellendus
                  voluptatem ipsum neque optio beatae quae et blanditiis magni
                  voluptatibus dolores nostrum tempore eaque sint. Maxime, sit?
                  Odio fuga saepe error incidunt commodi rerum quasi, culpa
                  perspiciatis ipsum distinctio. Error harum sed, quisquam
                  possimus assumenda, voluptatibus impedit laborum rem maxime,
                  cumque accusamus nemo necessitatibus ad molestiae ea. Nemo sed
                  harum, aliquid odit error asperiores vel id optio. Magni ipsam
                  dolore ab in! Perspiciatis saepe culpa eaque unde. Sequi
                  repellendus dolor vitae atque eveniet omnis, pariatur sapiente
                  quaerat? Totam enim, libero consequuntur dicta a dolore
                  voluptatem. Mollitia rem tempore eius fuga culpa quidem ipsum
                  laborum, totam expedita nobis labore veniam. Labore vero
                  laborum distinctio eius alias, recusandae accusantium. Et
                  odit, totam vero labore dolorum suscipit eos incidunt aut, non
                  natus accusantium. Officiis voluptatibus odio recusandae quos,
                  suscipit dolores maiores, incidunt quas iusto blanditiis,
                  facilis sequi natus corrupti animi.
                </p>
                <div className="w-full flex items-center justify-center my-2">
                  <Link to={"/dashboard"}>
                    <button className="bg-blue-600 font-semibold py-1 px-2 text-white rounded-md flex">
                      Dashboard
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <h2 className="w-full text-center text-xl text-bold uppercase tracking-wide mt-3">
                  Registering Grabber
                </h2>
                <p className="w-full p-2 md:p-4 text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                  repudiandae est quas commodi ducimus inventore recusandae
                  velit suscipit officiis, enim, sequi consectetur culpa,
                  quaerat adipisci cumque ipsa alias laborum qui. Iusto labore
                  sunt quidem aliquam est sapiente delectus fuga quo expedita
                  reprehenderit modi non obcaecati asperiores adipisci itaque
                  animi officia ullam soluta ut ipsam, facere repudiandae
                  tenetur! Optio, excepturi quod! Corrupti a labore ad
                  consequuntur vero in veritatis expedita, unde voluptatum
                  assumenda? Error cum dolores possimus velit magnam doloribus
                  impedit beatae commodi nam corporis? Dignissimos odit veniam
                  error. Fugit, dolorem. Dignissimos dicta et inventore ducimus
                  ut dolorum quidem hic, laborum quos molestias quis eaque
                  adipisci accusamus ipsum sed labore veritatis error
                  voluptatum! Omnis minima error cum reprehenderit facere fugiat
                  at! Alias voluptatibus dolore eaque necessitatibus sequi
                  tempora accusantium autem nesciunt magni ex maxime libero sed,
                  fugiat dolorem molestiae a officiis odio fugit sint ea minima
                  minus vitae maiores numquam. Recusandae? Laboriosam hic velit
                  voluptas explicabo, quod atque maiores a ducimus unde eveniet
                  eaque numquam repudiandae reiciendis corrupti facere veniam
                  animi officiis mollitia ex ipsum sed omnis soluta dolores
                  veritatis! Voluptatum. Quasi, dolorum perferendis excepturi
                  distinctio obcaecati officia similique mollitia assumenda
                  praesentium. Ratione asperiores ipsam quia aperiam fuga?
                  Dolores asperiores neque perspiciatis veritatis beatae, harum
                  sed debitis, ipsam dicta corporis nam? Aut dicta explicabo
                  possimus voluptate praesentium perferendis magnam fugiat
                  aspernatur fugit alias? Corrupti ut voluptas similique sunt
                  dicta. Ratione natus iusto dicta quibusdam necessitatibus
                  voluptatem! Saepe aspernatur omnis placeat laudantium. Quam
                  dignissimos porro, illo repellendus molestias odit fuga.
                  Culpa, tenetur voluptatum veritatis reiciendis dolores
                  sapiente sequi velit repudiandae eum modi reprehenderit eaque
                  aliquam provident exercitationem aliquid, voluptatem minus
                  quam dolor. Eveniet quisquam qui saepe soluta. Laborum ducimus
                  ex sapiente aspernatur? Fugiat accusantium vero architecto est
                  officia soluta neque dolore tempora? Dicta, culpa? Ex iure
                  velit impedit pariatur! Reprehenderit, quaerat maxime?
                  Nesciunt ipsum id corrupti doloribus animi, inventore aperiam,
                  ut a hic ullam officiis labore unde architecto. Quo veritatis
                  suscipit harum autem quod culpa cupiditate optio repudiandae
                  numquam, non consequatur illo. Ratione temporibus fugit
                  excepturi sapiente quas sequi. Dolor, voluptate quidem. Quam
                  nulla adipisci ad ex reprehenderit, aperiam repellendus
                  impedit ipsam aliquam. Natus ullam porro qui quia possimus
                  asperiores quaerat voluptate. Accusamus tenetur eius ex
                  dolorum libero cupiditate tempore officia, deserunt at
                  voluptatem fugit eveniet harum dignissimos, suscipit mollitia
                  ipsa quod nulla beatae eos deleniti! Illum odit veniam modi
                  officia exercitationem. Nesciunt sint omnis quidem dolore
                  officiis quas autem, dignissimos quos placeat? Nesciunt
                  adipisci facere, cum aliquam aperiam ab eius provident et vero
                  veniam. Quam provident aut magni exercitationem dolorem.
                  Inventore?
                </p>{" "}
                <div className="my-2 w-full flex items-center justify-center">
                  <button
                    onClick={registerGrabber}
                    disabled={isLoading}
                    className="bg-blue-600 font-semibold py-1 px-2 text-white rounded-md flex"
                  >
                    {isLoading ? (
                      <>
                        Generating GRABBER ID &nbsp;
                        <ReactLoading
                          type={"spin"}
                          height={"1.5rem"}
                          width={"1.5rem"}
                          color="#fff"
                        />
                      </>
                    ) : (
                      "Obtain a grabber ID"
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterGrabber;
