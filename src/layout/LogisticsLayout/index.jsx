import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const LogisticsLayout = () => {
	return (
		<div className="flex ">
			<Sidebar />

			<section>
				<Outlet />
			</section>
		</div>
	);
};

export default LogisticsLayout;
