import { Outlet } from 'react-router-dom';
import { Footer, NavBar } from '..';

const AppLayout = () => {
    return (
        <div className="min-h-screen overflow-x-hidden text-black">
            <NavBar />
            <main className="max-w-[1380px] mx-auto mt-[155px] md:mt-[165px] lg:mt-[115px] ">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default AppLayout;
