import React from 'react';
import GrabSidebar from '../GrabSidebar';
import { Outlet } from 'react-router-dom';

const GrabLayout = () => {
	return (
		<div className="flex h-[83vh] my-4 text-black max-w-[1380px] mx-auto">
			<GrabSidebar />

			<section className="flex-1 px-3 py-2 overflow-auto sm:px-6">
				<Outlet />
			</section>
		</div>
	);
};

export default GrabLayout;
