import { Outlet } from 'react-router-dom';
import { Footer, NavBar } from '..';

const AppLayout = () => {
	return (
		<div className="min-h-screen overflow-x-hidden ">
			<NavBar />
			<main className="max-w-[1380px] mx-auto mt-[152px] ">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default AppLayout;
