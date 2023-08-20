import React from "react";
import Topnav from "./Desktop/Topnav";
import BelowNav from "./Desktop/BelowNav";
import MobileTop from "./mobile/MobileTop";
import MobileBelow from "./mobile/MobileBelow";


const Navbar = () => {

  return (
    
    <header className="z-40 w-screen relative ">
      {/* desktop and tablet */}
      <nav className="hidden w-full  text-white md:flex flex-col ">
        <Topnav /> 
        <BelowNav />        
      </nav>

      {/* Mobile */}
      <nav className="md:hidden sm:flex sm:flex-col w-full bg-green-600 text-white">
        <MobileTop />
        <MobileBelow />
      </nav>
    </header> 
    
  );
};

export default Navbar;
