import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const LogisticsLayout = () => {
	return (
		<div className="flex h-screen">
			<Sidebar />

			<section className="w-full py-4 px-8 overflow-auto">
				<Outlet />
			</section>
		</div>
	);
};

export default LogisticsLayout;
