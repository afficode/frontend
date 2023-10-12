import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
	AboutUs,
	Auth,
	ContactUs,
	ForgotPassword,
	Help,
	Home,
	Logout,
	Performance,
	Playground,
	PrivacyPolicy,
	Profile,
	// Products,
	ResetPassword,
	Security,
	Settings,
	VerifyMail,
	Welcome,
} from './pages';
import { AppLayout, DashboardLayout } from './layout';
import { Approutes } from './constants';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<BrowserRouter>
			<ToastContainer />
			<Routes>
				{/* Playground page for developers */}
				<Route path={Approutes.playground} element={<Playground />} />

				{/* use NavBar and Footer layout  */}
				<Route element={<AppLayout />}>
					<Route path={Approutes.home} element={<Home />} />
					<Route path={Approutes.welcome} element={<Welcome />} />
					<Route path={Approutes.aboutUs} element={<AboutUs />} />
					<Route path={Approutes.contactUs} element={<ContactUs />} />
					<Route path={Approutes.auth.initial} element={<Auth />} />
					<Route path={Approutes.forgotPassword} element={<ForgotPassword />} />
					<Route path={Approutes.auth.verifyMail} element={<VerifyMail />} />
					<Route path={Approutes.auth.resetPassword} element={<ResetPassword />} />
					<Route path={Approutes.logout} element={<Logout />} />
				</Route>

				{/* use Dashboard layout  */}
				<Route element={<DashboardLayout />}>
					<Route path={Approutes.dashboard.performance} element={<Performance />} />
					<Route path={Approutes.dashboard.profile} element={<Profile />} />
					<Route path={Approutes.dashboard.settings} element={<Settings />} />
					<Route path={Approutes.dashboard.security} element={<Security />} />
					<Route path={Approutes.dashboard.privacyPolicy} element={<PrivacyPolicy />} />
					<Route path={Approutes.dashboard.help} element={<Help />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
