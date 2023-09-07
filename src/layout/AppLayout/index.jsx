import { Outlet } from 'react-router-dom';
import { Footer, NavBar } from '..';

const AppLayout = () => {
	return (
		<div className=" min-h-screen overflow-x-hidden">
			<NavBar />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default AppLayout;
