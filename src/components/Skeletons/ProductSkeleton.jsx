import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="w-full flex items-center justify-between gap-2 shadow-md border-0 border-t-4 border-t-gray-300 h-[250px] my-3">
      <div className="w-[35%] my-auto">
        <div className="h-[150px] w-[80%] mx-auto">
          <Skeleton circle height={"100%"} />
        </div>
      </div>
      <div className="w-[65%] p-3">
        <Skeleton height={"35px"} />
        <Skeleton />
        <Skeleton height={"100px"} />
        <Skeleton />
      </div>
    </div>
  );
};

export default ProductSkeleton;
