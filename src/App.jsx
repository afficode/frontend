import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AboutUs, ContactUs, Home, Products, Welcome } from './pages';
import { AppLayout } from './layout';
import { Approutes } from './constants';
import Auth from './pages/auth';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyMail from './pages/auth/VerifyMail';
import ResetPassword from './pages/auth/ResetPassword';
import Logout from './pages/auth/Logout';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<BrowserRouter>
			<ToastContainer />
			<Routes>
				{/* use NavBar and Footer layout  */}
				<Route element={<AppLayout />}>
					<Route path={Approutes.home} element={<Home />} />
					<Route path={Approutes.welcome} element={<Welcome />} />
					<Route path={Approutes.aboutUs} element={<AboutUs />} />
					<Route path={Approutes.contactUs} element={<ContactUs />} />
					<Route path={Approutes.auth} element={<Auth />} />
					<Route path={Approutes.forgotPassword} element={<ForgotPassword />} />
					<Route path={Approutes.verifyMail} element={<VerifyMail />} />
					<Route path={Approutes.resetPassword} element={<ResetPassword />} />
					<Route path={Approutes.logout} element={<Logout />} />
					<Route path="/:categoryName/:subCategoryName" element={<Products />} />
					<Route path="/:categoryName" element={<Products />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
