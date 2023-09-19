import { Outlet } from "react-router-dom";
import { Footer, NavBar } from "..";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppLayout = () => {
  return (
    <div className="min-h-screen overflow-x-hidden ">
      <NavBar />
      <main className="max-w-[1380px] mx-auto mt-[147px] md:mt-[109px] ">
        <ToastContainer />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
