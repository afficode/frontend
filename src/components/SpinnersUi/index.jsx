import { useState } from 'react';
import ReactLoading from 'react-loading';

/**
 * This component is build with ReactLoading
 * Please refer to doc on how to manipulate it.
 * Expected Types:
 * blank
 * balls
 * bars
 * bubbles
 * cubes
 * cylon
 * spin
 * spinningBubbles
 * spokes
 */
const SpinnerSkeleton = ({ heading = '', body = '', type, color = '#2686CE', height, width }) => {
    const [loading, setLoading] = useState(true);

    return (
        <div className="w-full">
            <div className="w-[90%] mx-auto md:w-[80%] lg:w-[65%] flex flex-col items-center justify-center">
                {heading && <h3 className="text-xl lg:text-2xl font-bold mt-10 lg:mt-20">{heading}</h3>}
                <p className="text-center my-4">{body}</p>
                <ReactLoading type={type} color={color} height={height} width={height} />
            </div>
        </div>
    );
};

export default SpinnerSkeleton;
