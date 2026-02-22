import { useState } from 'react';
import { unSaveAll } from '../../../hooks/useSaves';
import { useQueryClient } from 'react-query';
import { useNotify } from '../../../hooks';
import { useQuery } from 'react-query';

const ClearAll = () => {
    const queryClient = useQueryClient();
    const notify = useNotify();

    const [unSaveALlAds, setUnSaveAllAds] = useState(false);
    useQuery({
        queryFn: unSaveAll,
        queryKey: ['unSaveAll'],
        enabled: unSaveALlAds,
        onSuccess: (data) => {
            notify(data?.message, 'success');
            queryClient.invalidateQueries({ queryKey: ['saved'] });
            setUnSaveAllAds(false); // set the query to false, to avoid refetching.
        },
        onError: (error) => {
            notify(error?.response?.data?.message, 'error');
            setUnSaveAllAds(false); // set the query to false, to avoid refetching.
        },
    });

    return (
        <div>
            {/* The button to open modal */}
            <label htmlFor='clear_all' className='text-primary font-medium cursor-pointer'>
                Clear All
            </label>

            {/* Put this part before </body> tag */}
            <input type='checkbox' id='clear_all' className='modal-toggle' />
            <div className='modal ' role='dialog'>
                <div className='modal-box bg-white border-t-primary border border-t-8 rounded-none'>
                    <h3 className='text-lg font-bold lg:text-2xl'>Hello! 🙋‍♂️</h3>
                    <p className='py-4 text-justify text-medium lg:text-lg'>
                        You are about to{' '}
                        <span className='uppercase font-bold text-red-600'>unsave</span> all the Ads
                        which are of interest to you. You will have to search for them again should
                        you pick interest in them again. <br />
                        <br />
                        You can scroll through all your saved Ad's and remove the one which is of
                        interest to you.
                    </p>
                    <div className='w-full gap-4 flex items-center justify-start'>
                        <button className='btn btn-secondary hover:text-white hover:btn-success'>
                            <label
                                className=''
                                htmlFor='clear_all'
                                onClick={() => {
                                    // set the unSaveAll enable to true, which will  be set to false when successful
                                    setUnSaveAllAds(true);
                                }}
                            >
                                Continue
                            </label>
                        </button>

                        <button className='btn btn-outline btn-primary'>
                            <label className='w-full' htmlFor='clear_all'>
                                Back
                            </label>
                        </button>
                    </div>
                </div>
                <label className='modal-backdrop' htmlFor='clear_all'></label>
            </div>
        </div>
    );
};

export default ClearAll;
