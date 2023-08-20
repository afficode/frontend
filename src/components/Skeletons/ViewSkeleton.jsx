import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ViewSkeleton = () => {
  return (
    <div className="my-3 mx-auto w-full p-3 bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100">
      <div className="w-full md:w-[60%] lg:w-[70%] xl:w-[50%] mx-auto">
        <div className="flex h-[150px] w-[80%] items-center justify-center mx-auto">
          <Skeleton circle height={"150px"} width={"150px"} />
        </div>
        <div id="middleTop" className="w-full">
          <div className="w-[60%] p-3 font-semibold mx-auto text-md xl:text-xl text-center tracking-wide text-gray-700 grid grid-cols-5 mt-4">
            <Skeleton width={"30px"} />
            <Skeleton width={"30px"} className="hidden lg:inline" />
            <Skeleton width={"30px"} className="hidden lg:inline" />
            <Skeleton width={"30px"} className="hidden lg:inline" />
            <Skeleton width={"30px"} className="hidden lg:inline" />
          </div>
          <div className="shadow-md border-0 border-t-4 border-gray-300 w-[80%] p-3 font-semibold mx-auto">
            <div className="flex items-center justify-around border-0 border-b-2 pb-2 border-gray-300">
              <div id="left" className="flex items-center justify-start w-full">
                <Skeleton width={"60px"} />
              </div>
              <div
                id="right"
                className="flex items-center justify-end text-sm font-bold lg:gap-4 gap-[0.2rem] md:px-2"
              >
                <Skeleton width={"20px"} />
                &nbsp; <Skeleton width={"20px"} />
                &nbsp; <Skeleton width={"20px"} />
              </div>
            </div>
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 md:grid-col-2 mt-3">
              <div className="flex items-center jusity-start md:justify-center  my-2">
                <Skeleton width={"60px"} />
              </div>
              <div className="flex items-center jusity-start md:justify-center my-2">
                <Skeleton width={"60px"} />
              </div>

              <div className="flex items-center jusity-start md:justify-center my-2">
                <Skeleton width={"60px"} />
              </div>

              <div className="flex items-center jusity-start md:justify-center my-2">
                <Skeleton width={"60px"} />
              </div>

              <div className="flex items-center jusity-start md:justify-center tracking-wide  my-2">
                <Skeleton width={"60px"} />
              </div>

              <div className="flex items-center jusity-start md:justify-center my-2">
                <Skeleton width={"60px"} />
              </div>

              <div className="flex items-center jusity-start md:justify-center my-2">
                <Skeleton width={"60px"} />
              </div>
              <div className="flex items-center jusity-start md:justify-center my-2">
                <Skeleton width={"60px"} />
              </div>
            </div>
          </div>
          <div className="mt-2 p-2 w-full lg:w-[80%] mx-auto">
            <h2 className="text-xl text-gray-600">Description</h2>
            <p className="w-full text-justify text-md mt-2">
              <Skeleton height={"100px"} />
            </p>
          </div>
          <div
            id="features"
            className="w-full lg:w-[80%] mx-auto flex flex-col items-center justify-start gap-2"
          >
            <h1 className="text-xl my-2 text-gray-700 block underline">
              <Skeleton width={"100px"} />
            </h1>
            <div className="flex items-center justify-center flex-wrap gap-4 font-semibold">
              {new Array(10).fill(0).map((_, index) => (
                <span
                  className="text-gray-700 border-0 border-b-4 border-t-4 border-t-gray-200 border-b-gray-400 p-2"
                  key={index}
                >
                  <Skeleton width={"30px"} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSkeleton;
