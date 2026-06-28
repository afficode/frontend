import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const RequestCardSkeleton = () => (
    <div className='bg-white w-full h-[550px] flex flex-col justify-between rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
        <div className='w-full border-b border-gray-100' style={{ height: '260px' }}>
            <Skeleton
                height={260}
                className='w-full -mt-1 block scale-110'
                style={{ borderRadius: 0 }}
            />
        </div>
        <div className='p-4 sm:p-6 flex flex-col gap-4 justify-between h-full'>
            <div className='flex items-center gap-2'>
                <Skeleton circle width={40} height={40} />
                <div className='flex flex-col'>
                    <Skeleton width={80} height={10} />
                    <Skeleton width={120} height={15} className='mt-1' />
                </div>
            </div>

            <div className='w-full '>
                <Skeleton height={45} className='w-full ' style={{ borderRadius: '12px' }} />
            </div>
        </div>
    </div>
);

export const CategorySkeleton = () => (
    <Skeleton width={110} height={38} style={{ borderRadius: '12px' }} className='mx-1 block' />
);
