import React from 'react';
import { Tab } from '@headlessui/react';
import PropertyForm from '../Forms/PropertyForm';

import PropertyImg from '../../imgs/property.jpg';

const Property = () => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
  return (
    <div className="w-full px-4 pt-4 mb-4">
        <div className="relative">
            <img src={PropertyImg} alt="/" className=' w-full top-0 h-[200px] md:h-[350px] lg:h-[500px]' />
            <span className="w-full absolute top-6 text-3xl md:text-5xl lg:text-7xl font-bold tracking-wide pl-3 text-center">Sell Simple, Buy Confidently</span>
        </div>
        <div className="-top-10 relative w-full">
        <Tab.Group>
        <Tab.List className="flex space-x-1 bg-green-400/50 p-1 gap-2 lg:w-[50%] mx-auto md:w-[80%]">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full py-2.5 text-lg font-bold tracking-wider leading-5 text-green-600",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2 flex items-center justify-center",
                selected
                  ? "bg-white shadow text-white"
                  : "text-green-600 hover:bg-green-600 hover:text-white"
              )
            }
          >
            For Sale by OWNER
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full py-2.5 text-lg font-bold tracking-wider leading-5 text-green-600",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2 flex items-center justify-center",
                selected
                  ? "bg-white shadow text-white"
                  : "text-green-600 hover:bg-green-600 hover:text-white"
              )
            }
          >
            For Sale by AGENT
            
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2 w-full">
          <Tab.Panel
            className={
              "rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2 px-2"
            }
          >
            <PropertyForm agent={false} />
          </Tab.Panel>
          <Tab.Panel
            className={
              "rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2 px-2"
            }
          >
            <PropertyForm agent={true} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
        </div>
    </div>
  )
}

export default Property