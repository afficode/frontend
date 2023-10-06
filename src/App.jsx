import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AboutUs,
  Auth,
  ContactUs,
  ForgotPassword,
  Home,
  Logout,
  Playground,
  // Products,
  ResetPassword,
  VerifyMail,
  Welcome,
} from "./pages";
import { AppLayout } from "./layout";
import { Approutes } from "./constants";
import { ToastContainer } from "react-toastify";
import useAuth from "./context/UserContext";

function App() {
  const { isLogin } = useAuth();
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Playground page for developers */}
        <Route path={Approutes.playground} element={<Playground />} />

        {/* use NavBar and Footer layout  */}
        <Route element={<AppLayout />}>
          <Route
            path={Approutes.home}
            element={isLogin ? <Welcome /> : <Home />}
          />
          <Route path={Approutes.welcome} element={<Welcome />} />
          <Route path={Approutes.aboutUs} element={<AboutUs />} />
          <Route path={Approutes.contactUs} element={<ContactUs />} />
          <Route path={Approutes.auth.initial} element={<Auth />} />
          <Route path={Approutes.forgotPassword} element={<ForgotPassword />} />
          <Route path={Approutes.auth.verifyMail} element={<VerifyMail />} />
          <Route
            path={Approutes.auth.resetPassword}
            element={<ResetPassword />}
          />
          <Route path={Approutes.logout} element={<Logout />} />
          {/* <Route path="/:categoryName/:subCategoryName" element={<Products />} />
					<Route path="/:categoryName" element={<Products />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
