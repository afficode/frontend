import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingScreen = () => {
    return (
        <div className='w-full flex flex-col space-y-4 py-4'>
            <Skeleton height={120} />
            <Skeleton height={100} borderRadius={20} />
            <Skeleton height={200} />
            <div>
                <Skeleton height={40} width={250} />
                <Skeleton height={20} width={300} />
            </div>
            <div className='mt-10 w-full flex flex-col border border-gray-200 p-2'>
                <Skeleton height={30} />
                <Skeleton height={30} />
                <Skeleton height={30} />
                <Skeleton height={30} />
                <Skeleton height={30} />
                <Skeleton height={30} />
            </div>
            <div>
                <Skeleton height={40} width={300} />
                <Skeleton height={20} width={250} />
            </div>
            <div className='mt-10 md:w-[500px] md:ml-[12rem] flex flex-col border border-gray-200 p-2'>
                <Skeleton height={50} borderRadius={20} />
                <Skeleton height={50} borderRadius={20} />
                <Skeleton height={50} borderRadius={20} />
                <Skeleton height={50} borderRadius={20} />
                <Skeleton height={50} borderRadius={20} />
            </div>
            <div>
                <Skeleton height={40} width={300} />
            </div>
            <Skeleton height={200} />
        </div>
    );
};

export default LoadingScreen;
