import GrabSidebar from '../GrabSidebar';
import { Outlet } from 'react-router-dom';

const GrabLayout = () => {
    return (
        <div className="flex h-full my-4 text-black w-full max-w-[1380px] mx-auto ">
            <GrabSidebar />

            <div className=" px-3  py-2  sm:px-6  w-[calc(1380px-15rem)] ">
                <Outlet />
            </div>
        </div>
    );
};

export default GrabLayout;
