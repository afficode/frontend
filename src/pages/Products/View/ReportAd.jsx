import { useState } from 'react';
import { BiSolidMessageRoundedDetail } from 'react-icons/bi';
import Feedback from './Feedback';
import FeedbackForm from './FeedbackForm';
const ReportAd = ({ ad_id }) => {
    const [active, setActive] = useState(1);
    return (
        <div>
            <div className='flex border-b border-gray-200 whitespace-nowrap dark:border-gray-700'>
                <button
                    type='button'
                    className={`inline-flex items-center h-10 px-2 py-2 -mb-px text-center  whitespace-nowrap focus:outline-none
          ${
              active === 1
                  ? 'text-blue-600 bg-transparent border-b-2 border-blue-500 sm:px-4 -px-1 dark:border-blue-400 dark:text-blue-300'
                  : 'text-gray-700 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 dark:text-white hover:border-gray-400'
          }`}
                    onClick={() => setActive(1)}
                >
                    <span className='flex items-center gap-2 justify-center'>
                        <BiSolidMessageRoundedDetail className='my-auto' />
                        Feedback
                    </span>
                </button>

                <button
                    type='button'
                    className={`inline-flex items-center h-10 px-2 py-2 -mb-px text-center  whitespace-nowrap focus:outline-none
          ${
              active === 2
                  ? 'text-blue-600 bg-transparent border-b-2 border-blue-500 sm:px-4 -px-1 dark:border-blue-400 dark:text-blue-300'
                  : 'text-gray-700 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 dark:text-white hover:border-gray-400'
          }`}
                    onClick={() => setActive(2)}
                >
                    😔
                    <span className='mx-1 text-sm sm:text-base'>Report Ad</span>
                </button>
            </div>
            <div className='w-full h-auto'>
                {active === 1 ? (
                    <div className='p-2 lg:p-4 text-justify'>
                        <Feedback ad_id={ad_id} />
                    </div>
                ) : (
                    <div className='p-2 lg:p-4 text-justify'>
                        <FeedbackForm ad_id={ad_id} url={'report_ad'} buttonText={'Report Ad'} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportAd;
