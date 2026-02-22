import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { v4 as uuidv4 } from 'uuid';

const LoadingScreen = () => {
    return (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 place-items-center'>
            {Array(8)
                .fill(0)
                .map((_) => (
                    <div key={uuidv4()} className='flex flex-col gap-1 border border-gray-300'>
                        <Skeleton className='w-[18rem] h-[13rem] sm:w-[20rem] relative ' />
                        <Skeleton className='w-[18rem] sm:w-[20rem] h-[8rem] relative' />
                    </div>
                ))}
        </div>
    );
};

export default LoadingScreen;
