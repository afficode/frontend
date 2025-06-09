import React from 'react';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { makeAdPayment, deleteAd } from '../../../hooks';
import { useNotify } from '../../../hooks';
const MakePayment = ({ ad_id }) => {
    const notify = useNotify();
    const { mutate, isLoading } = makeAdPayment();
    const { mutate: adDelete, isLoading: deleteAdLoading } = deleteAd();
    const pay = (id) =>
        mutate(id, {
            onSuccess: (data) => {
                notify(data?.message, 'success');
            },
            onError: (error) => {
                notify('Error paying for this AD', 'error');
            },
        });

    const handleDelete = (id) => {
        adDelete(id, {
            onSuccess: (data) => {
                console.log(data);
                notify(data?.message, 'success');
            },
            onError: (error) => {
                notify('Error deleting this AD', 'error');
            },
        });
    };

    return (
        <>
            <div className='mb-4 mt-2 text-red-700 dark:text-red-800'>
                <ul className='list-disc ml-4'>
                    <li>This Ad was posted and nof funds in your account.</li>
                    <li>
                        {' '}
                        We could not take payment for this AD when posted, which
                        marks the AD as{' '}
                        <span className='font-bold text-red-600'>
                            UNAVAILABLE
                        </span>
                    </li>
                    <li>
                        You can use the button below to make payment and{' '}
                        <span className='text-primary font-bold'>
                            Go live 💰
                        </span>{' '}
                        OR{' '}
                        <span className='text-red-600 font-bold'>
                            DELETE THIS AD 🚮
                        </span>
                    </li>
                </ul>
            </div>
            <div className='flex'>
                <button
                    type='button'
                    className='mr-2 inline-flex items-center rounded-lg bg-primary px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-primary/80 focus:ring-4 focus:ring-primary/90 dark:bg-primary dark:hover:bg-primary/70'
                    onClick={() => pay(ad_id)}
                    disabled={isLoading || deleteAdLoading}
                >
                    <span className='my-auto'>Make Payment</span> &emsp;
                    <FaMoneyBillTrendUp className='-ml-0.5 mr-2 h-4 w-4' />
                </button>
                <button
                    type='button'
                    className='rounded-lg border border-red-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-red-700 hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-300 dark:border-red-800 dark:text-red-800 dark:hover:text-white'
                    onClick={() => handleDelete(ad_id)}
                    disabled={isLoading || deleteAdLoading}
                >
                    Delete Ad
                </button>
            </div>
        </>
    );
};

export default MakePayment;
