import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingScreen = () => {
    return (
        <div className="w-full flex flex-col md:px-4 py-4">
            <div className="mt-4 pb-2 border-b border-gray-100">
                <Skeleton height={30} width={200} />
            </div>
            <div className="mt-4">
                <Skeleton height={40} />
            </div>
            <div className="my-2 flex items-center gap-8">
                <Skeleton height={30} width={80} />
                <Skeleton height={50} width={600} />
                <div className="ml-auto">
                    <Skeleton height={30} width={100} />
                </div>
            </div>
            <div className="my-2 flex items-center gap-8 border-b pb-6 border-gray-100">
                <Skeleton height={30} width={80} />
                <Skeleton height={50} width={600} />
                <div className="ml-auto">
                    <Skeleton height={30} width={100} />
                </div>
            </div>

            <div className="mt-6">
                <Skeleton height={40} />
            </div>
            <div className="my-2 flex items-center gap-8 border-b pb-4 border-gray-100">
                <Skeleton height={30} width={80} />
                <Skeleton height={50} width={600} />
                <div className="ml-auto">
                    <Skeleton height={30} width={100} />
                </div>
            </div>

            <div className="my-8 px-4">
                <Skeleton height={40} width={150} />
            </div>
        </div>
    );
};

export default LoadingScreen;
