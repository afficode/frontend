import { Link } from "react-router-dom";
import useAuth from "../../../context/UserContext";

// icons
import { AiOutlineInfo } from "react-icons/ai";
import { Approutes } from "../../../constants";

const Hero = () => {
  const firstTimer = true;
  const { user } = useAuth();

  return (
    <section className="flex flex-col gap-12 px-2 py-12 my-2 rounded-md bg-primary sm:px-8">
      <h1 className="text-white max-sm:text-center">
        Welcome, {user?.firstname}
      </h1>
      <span className="block text-base text-center text-white md:text-xl">
        Tons of opportunities await you!. <br />
        Please choose your next action below.
      </span>

      <div className="flex flex-col max-w-full gap-4 mx-auto md:flex-row">
        <div
          className={firstTimer ? "dropdown dropdown-top dropdown-hover" : ""}
        >
          <Link to={""}>
            <button className="btn w-[15rem] text-lg rounded-xl shadow-lg capitalize hover:bg-secondary/80 bg-secondary border-none text-black">
              Set up a Shop Now
            </button>
          </Link>

          <div
            tabIndex={0}
            className={
              firstTimer
                ? `dropdown-content transform -translate-x-[18%] min-h-fit w-[22rem]  z-50 p-6 bg-white shadow-md rounded-3xl`
                : "hidden"
            }
          >
            <div className="w-[3.2rem] h-[3.2rem] bg-primary flex justify-center items-center border-secondary border-4 rounded-full absolute right-0 top-[-1rem]">
              <AiOutlineInfo size={34} className="text-white" />
            </div>
            <h4 className="text-center text-primary whitespace-nowrap">
              Setting Up A Shop
            </h4>
            <div className="pt-2">
              <p className="mb-2">
                It takes less than 5-mins to set up your account for success on
                AFFI.
              </p>
              <span className="max-sm:text-sm">Benefits;</span>
              <ul className="flex flex-col pt-0 pl-6 text-base list-disc max-sm:text-sm">
                <li>We drive clients to your store, constantly</li>
                <li>You can have as many stores as you would like.</li>
                <li>Monthly low-rate subscription.</li>
                <li>And so on.</li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className={firstTimer ? "dropdown dropdown-top dropdown-hover" : ""}
        >
          <Link to={""}>
            <button className="btn w-[15rem] text-lg rounded-xl shadow-lg capitalize text-white hover:bg-opacity-95 border-white grab-btn">
              I am a Grabber
            </button>
          </Link>

          <div
            tabIndex={0}
            className={
              firstTimer
                ? `dropdown-content transform -translate-x-[18%] min-h-fit w-[22rem]  z-50 p-6 bg-white shadow-md rounded-3xl`
                : "hidden"
            }
          >
            <div className="w-[3.2rem] h-[3.2rem] bg-primary flex justify-center items-center border-secondary border-4 rounded-full absolute right-0 top-[-1rem]">
              <AiOutlineInfo size={34} className="text-white" />
            </div>
            <h4 className="text-center text-primary whitespace-nowrap">
              Becoming A Grabber
            </h4>
            <div className="pt-2 ">
              <p className="mb-2 ">As a grabber, you can do the following:</p>
              <ul className="flex flex-col pt-0 pl-6 text-base list-disc max-sm:text-sm">
                <li>
                  Pick products/items and market on featured page or as the case
                  may be, for share of the sale.
                </li>
                <li>
                  You can communicate with product/item owner directly to
                  advise, discuss more on product picked for marketing.
                </li>
                <li>You make steady, passive income as a Grabber.</li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className={firstTimer ? "dropdown dropdown-top dropdown-hover" : ""}
        >
          <Link to={Approutes.postDecision}>
            <button className="btn w-[15rem] text-lg rounded-xl shadow-lg capitalize hover:bg-white/80 bg-white border-none text-black">
              Quick Post
            </button>
          </Link>

          <div
            tabIndex={0}
            className={
              firstTimer
                ? `dropdown-content transform -translate-x-[18%] min-h-fit w-[22rem]  z-50 p-6 bg-white shadow-md rounded-3xl`
                : "hidden"
            }
          >
            <div className="w-[3.2rem] h-[3.2rem] bg-primary flex justify-center items-center  border-secondary border-4 rounded-full absolute right-0 top-[-1rem]">
              <AiOutlineInfo size={34} className="text-white" />
            </div>
            <h4 className="text-center text-primary whitespace-nowrap">
              Quick Post
            </h4>
            <div className="pt-2">
              <p className="mb-4">
                I have an item/product to post for sale, Quickly.
              </p>
              <p className="mb-4">
                Please click the Quick post to enlist your product on this
                platform.
              </p>
              <p className="mb-4">
                Be rest assured that your product won’t be sitting around for
                too long.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
