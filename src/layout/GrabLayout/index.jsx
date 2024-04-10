import React from 'react';
import GrabSidebar from '../GrabSidebar';
import { Outlet } from 'react-router-dom';

const GrabLayout = () => {
	return (
		<div className="flex h-full my-4 text-black max-w-[1380px] mx-auto">
			<GrabSidebar />
			{/* h-[83vh] */}

			<section className="flex-1 px-3  py-2 ] sm:px-6">
				<Outlet />
			</section>
		</div>
	);
};

export default GrabLayout;
