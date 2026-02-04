import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingScreen = () => {
    return (
        <div className="flex max-w-[1024px] mx-auto flex-col py-4">
            <div className="mt-4    ">
                <Skeleton height={25} width={200} />
                <Skeleton height={40} />
            </div>
            <div className="my-4 w-full  ">
                <Skeleton height={25} width={200} />
                <Skeleton height={40} />
            </div>
            <div className="my-4  w-full  ">
                <Skeleton height={25} width={200} />
                <Skeleton height={40} />
            </div>
            <div className="my-4 w-full  ">
                <Skeleton height={25} width={200} />
                <Skeleton height={40} />
            </div>
            <div className="my-4 w-full  ">
                <Skeleton height={25} width={200} />
                <Skeleton height={40} />
            </div>
            <div className="my-6">
                <Skeleton height={50} />
            </div>
        </div>
    );
};

export default LoadingScreen;
