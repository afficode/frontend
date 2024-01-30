import { Outlet } from 'react-router-dom';
import { Sidebar } from '..';

const DashboardLayout = () => {
	return (
		<div className="flex h-screen my-8 text-black max-w-[1380px] mx-auto">
			<Sidebar />

			<section className="flex-1 py-2 px-3 sm:px-6 overflow-auto">
				<Outlet />
			</section>
		</div>
	);
};

export default DashboardLayout;
