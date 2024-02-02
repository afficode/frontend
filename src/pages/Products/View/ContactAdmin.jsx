import { HiEye, HiInformationCircle } from 'react-icons/hi';


export default function ContactAdmin() {
    return (
      <>
        <div className="mb-4 mt-2 text-red-700 dark:text-red-800">
            <p className="w-full p-2 bg-gray-300">Reason for blocking this Ad from Database.</p>
            <ul className='list-disc ml-4'>
               <li>Before you click on contact Admin, it will be Good to edit this Ad and make the necessary changes complained by Admin as the reason why this Ad was blocked.</li>
                <li> If you think this Ads was blocked unjustly, click on the Contact Admin button to queue this Ads for review.</li>
                <li>Ensure the Ad is in good state before clicking Contact Admin to queue the Ad for review. </li>
          </ul>
          
        </div>
        <div className="flex">
          <button
            type="button"
            className="mr-2 inline-flex items-center rounded-lg bg-red-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-800 dark:hover:bg-red-900"
          >
            <HiEye className="-ml-0.5 mr-2 h-4 w-4" />
            Contact Admin
          </button>
          <button
            type="button"
            className="rounded-lg border border-red-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-red-700 hover:bg-red-800 hover:text-white focus:ring-4 focus:ring-red-300 dark:border-red-800 dark:text-red-800 dark:hover:text-white"
          >
            Delete Ad
          </button>
        </div>
      </>
    );
  }