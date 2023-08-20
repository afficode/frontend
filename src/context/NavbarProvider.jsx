import React, { useState } from "react";

export const NavbarContext = React.createContext();

const NavBarProvider = ({ children }) => {
  const [link, setLink] = useState(null);
  const [vehicle, setVehicle] = useState(false);
  const [vehicleDiv, setVehicleDiv] = useState(false);

  //  property Div manupulation
  const [property, setProperty] = useState(false);
  const [propertyDiv, setPropertyDiv] = useState(false);

  // services div manipulation
  const [services, setServices] = useState(false);
  const [servicesDiv, setServicesDiv] = useState(false);

  // for Sale div manipulation
  const [forSales, setForSales] = useState(false);
  const [forSalesDiv, setForSalesDiv] = useState(false);

  // toggle
  const toggleVehicle = (val) => setVehicle(val);
  const toggleVehicleDiv = (val) => setVehicleDiv(val);

  const toggleProperty = (val) => setProperty(val);
  const togglePropertyDiv = (val) => setPropertyDiv(val);

  const toggleServices = (val) => setServices(val);
  const toggleServicesDiv = (val) => setServicesDiv(val);

  const toggleForSales = (val) => setForSales(val);
  const toggleForSalesDiv = (val) => setForSalesDiv(val);

  const resetAllDiv = () => {
    setVehicleDiv(false);
    setPropertyDiv(false);
    setServicesDiv(false);
    setForSalesDiv(false);
  };

  return (
    <NavbarContext.Provider
      value={{
        vehicle,
        vehicleDiv,
        property,
        propertyDiv,
        services,
        servicesDiv,
        forSales,
        forSalesDiv,
        link,
        setLink,
        resetAllDiv,
        toggleVehicle,
        toggleVehicleDiv,
        toggleProperty,
        togglePropertyDiv,

        toggleServices,
        toggleServicesDiv,
        toggleForSales,
        toggleForSalesDiv,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export default NavBarProvider;
