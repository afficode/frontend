import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// context
import NavBarProvider from "./context/NavbarProvider";
import UserContextProvider from './context/UserContextProvider';
import ProductProvider from './context/ProductProvider';
// * Pages
import Home from './pages/Home';
import Cars from './pages/ads/Cars';
import Properties from './pages/ads/Properties';
import Services from './pages/ads/Services';
import ForSales from './pages/ads/ForSales';
import VerifyUser from './pages/VerifyUser';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard/Dashboard';
import Settings from './pages/Settings/Settings';
import Grab from './pages/Grab';
// * Components
import Activity from './components/Dashboard/Activity';
import Privacy from './components/Dashboard/Privacy';
import Profile from './components/Dashboard/Profile';
import Help from './components/Dashboard/Help';
import General from './components/Setting/General';
import MyDetails from './components/Setting/MyDetails';
import ShopInfo from './components/Setting/ShopInfo';
import Notification from './components/Setting/Notification';
import Account from './components/Setting/Account';
import Security from './components/Setting/Security';
import ProductsPage from './pages/ProductPage';
import ViewProducts from './pages/Product/ViewProducts';
import ViewGrabbed from './pages/Product/ViewGrabbed';
import Logout from './components/Universal/Logout';
import { Toaster } from 'react-hot-toast';



const App = () => {
  
  return (
    <UserContextProvider>
      <ProductProvider>
        <NavBarProvider>
          <Toaster position='top-center' toastOptions={{ duration: 5000}} />
          <BrowserRouter>
            <Routes>
              <Route path='/'>
                <Route index element={ <Home />} /> 
                <Route path='auth'>
                  <Route index element={ <SignIn />} />
                  <Route path='verifyaccount' element={ <VerifyUser /> } />
                </Route>    

                <Route path='ads'>
                  <Route index element={ <Home />} />
                  <Route path='car' element={ <Cars />} />
                  <Route path='property' element={ <Properties />} />
                  <Route path='service' element={ <Services />} />
                  <Route path='forsale' element={ <ForSales />} />
                </Route>

                <Route path='dashboard' element={<Dashboard />}>
                  <Route index element={<Activity />} />
                  <Route path='activities' element={<Activity />} />
                  <Route path='profile' element={<Profile />} />
                  <Route path='privacy' element={<Privacy />} />
                  <Route path='help' element={<Help />} />                
                </Route>

                <Route path='setting' element={<Settings />}>
                  <Route index element={<General />} />
                  <Route path='general' element={<General />} />
                  <Route path='details' element={<MyDetails />} />
                  <Route path='shopinfo' element={<ShopInfo />} />
                  <Route path='notification' element={<Notification />} /> 
                  <Route path='account' element={<Account />} /> 
                  <Route path='security' element={<Security />} />                
                </Route>

                <Route path='products' element={<ProductsPage />} />
                <Route path='products/:productDetailId' element={<ViewProducts />} />
                
                <Route path='products/grap/:grabbedProductId' element={<ViewGrabbed />} />

                <Route path='logout' element={<Logout />} />
              </Route>
              <Route path='/grabProduct/:productId' element={<Grab />} />
            </Routes>
          </BrowserRouter>
        </NavBarProvider>
      </ProductProvider>
    </UserContextProvider>
    
  )
}

export default App