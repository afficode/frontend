import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Index = () => {
    return (
        <div className=' w-[18rem] sm:w-full h-[22rem] border border-gray-200 rounded-md shadow-sm cursor-pointer hover:shadow-lg transition-all  ease-in-out p-2'>
            <Skeleton height={200} className=' w-full h-[200px] object-cover' duration={3.0} />{' '}
            <Skeleton className=' px-2 mt-2' duration={2.5} height={25} />
            <div className='flex w-full'>
                <Skeleton className=' px-2 ' duration={2.5} height={25} width={40} />
                <Skeleton className='mx-2 overflow-hidden' duration={2.5} height={25} width={150} />
            </div>
            <Skeleton className=' px-2 mt-4' duration={2.5} height={25} />
        </div>
    );
};

export default Index;
