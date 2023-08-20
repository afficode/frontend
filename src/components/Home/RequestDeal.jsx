import React from 'react';
import { motion } from 'framer-motion';

const RequestDeal = () => {
  return (
    <div className='w-full h-[180px] bg-gradient-to-b from-green-600 via-white to-green-600 my-3 py-7'>
        <div className="grid grid-cols-2 lg:gap-40 my-auto md:gap-20 sm:gap-40 gap-10">
            <div id="left" className='relative mt-5 lg:mt-2'>                
                <div className='h-[60px] lg:h-[80px] my-4 bg-white w-[100%] rounded-r-full text-center flex items-center justify-start lg:pl-8 tracking-wide font-bold md:pl-2 md:text-xl lg:text-3xl  border-yellow-400 border-[3px] border-l-0'><span className="hidden md:block md:text-left  lg:text-2xl w-full 2xl:text-5xl md:mr-auto">View people's Request</span></div>
                    <motion.div 
                        whileHover={{ scale: 1.2 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.3 }}
                        className="absolute -top-5 -right-5 h-[130px] lg:h-[150px] w-[130px] lg:w-[150px] bg-yellow-500 rounded-full text-center cursor-pointer hover:border-4 hover:border-yellow-400 hover:bg-gray-200 hover:text-yellow-400">
                        <h1 className=' my-auto text-3xl mt-6 lg:mt-9 font-bold  tracking-tight lg:tracking-wider'>
                            See <br /> Request
                        </h1>
                    </motion.div>
            </div>
            <div id="right" className='relative mt-5 lg:mt-2'>
                <div className='h-[60px] lg:h-[80px] my-4 bg-white w-[100%] rounded-l-full text-center flex items-center justify-end lg:pr-8 tracking-wide font-bold md:pr-2 md:text-xl lg:text-3xl  border-yellow-400 border-[3px] border-r-0 '><span className="hidden md:block md:text-right lg:text-right lg:text-2xl w-full 2xl:text-5xl md:ml-auto">Check Out our deals</span> </div>
                <motion.div 
                    whileHover={{ scale: 1.2 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute -top-5 h-[130px] lg:h-[150px] w-[130px] lg:w-[150px] bg-yellow-500 rounded-full text-center cursor-pointer hover:border-4 hover:border-yellow-400 hover:bg-gray-200 hover:text-yellow-400">
                    <h1 className=' my-auto text-3xl mt-6 lg:mt-9 font-bold  tracking-tight lg:tracking-wider'>
                        Best <br /> Deals
                    </h1>
                </motion.div>
            </div>
        </div>
    </div>
  )
}

export default RequestDeal