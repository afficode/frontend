import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingScreen = () => {
    return (
        <div className="w-full flex flex-col py-4">
            <Skeleton height={300} borderRadius={30} />
            <div className="mt-4 pb-2 flex justify-between border-b border-gray-100">
                <Skeleton height={30} width={200} />
                <Skeleton height={30} width={100} />
            </div>
            <div className="mt-8 md:w-[54%] flex max-md:flex-col max-md:gap-2 md:justify-between">
                <Skeleton height={30} width={200} />
                <Skeleton height={30} width={200} />
            </div>
            <div className="my-2  md:w-[54%] flex max-md:flex-col max-md:gap-2 md:justify-between">
                <Skeleton height={30} width={200} />
                <Skeleton height={30} width={200} />
            </div>
            <div className="my-2 md:w-[54%] flex max-md:flex-col max-md:gap-2 md:justify-between">
                <Skeleton height={30} width={200} />
                <Skeleton height={30} width={200} />
            </div>
            <div className="my-2 md:w-[54%] flex max-md:flex-col max-md:gap-2 md:justify-between">
                <Skeleton height={30} width={200} />
                <Skeleton height={30} width={200} />
            </div>
            <div className="my-2 md:w-[54%] flex max-md:flex-col max-md:gap-2 md:justify-between">
                <Skeleton height={30} width={200} />
                <Skeleton height={30} width={200} />
            </div>
            <div className="mt-6 pb-2 flex justify-between border-b border-gray-100">
                <Skeleton height={30} width={200} />
                <Skeleton height={30} width={100} />
            </div>
            <div className="my-4">
                <Skeleton height={100} />
            </div>
            <div className="mb-12">
                <Skeleton height={40} width={150} />
            </div>
        </div>
    );
};

export default LoadingScreen;
