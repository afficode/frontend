import { Outlet } from 'react-router-dom';
import { Footer, NavBar } from '..';

const AppLayout = () => {
	return (
		<div className="min-h-screen overflow-x-hidden text-black">
			<NavBar />
			<main className="max-w-[1380px] mx-auto mt-[147px] md:mt-[155px] lg:mt-[109px] ">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default AppLayout;
