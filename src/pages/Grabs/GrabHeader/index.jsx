import { useState } from 'react';
import { IoIosMenu } from 'react-icons/io';
import { GrabMobileSidebar } from '../../../layout';
// import useAuth from '../../../context/UserContext';

const GrabHeader = ({ text, size }) => {
    const [showSidebar, setShowSidebar] = useState(false);
    // const { user } = useAuth();

    return (
        <div className="flex justify-between py-2 border-b border-black/30 ">
            {size === 'h2' ? (
                <h2 className="capitalize">{text} </h2>
            ) : (
                <h3 className="capitalize">{text} </h3>
            )}

            <button onClick={() => setShowSidebar(!showSidebar)} className=" lg:hidden">
                <IoIosMenu size={28} />
            </button>

            <GrabMobileSidebar sidebar={showSidebar} setSidebar={setShowSidebar} />
        </div>
    );
};

export default GrabHeader;
