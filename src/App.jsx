import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
	AboutUs,
	Adverts,
	Auth,
	ContactUs,
	Details,
	ForgotPassword,
	Help,
	Home,
	Logout,
	Messages,
	Notifications,
	Performance,
	Playground,
	PrivacyPolicy,
	Profile,
	ProfileLayout,
	// Products,
	ResetPassword,
	SavedItems,
	Security,
	Settings,
	VerifyMail,
	Welcome,
} from './pages';
import { AppLayout, DashboardLayout } from './layout';
import { Approutes } from './constants';
import { ToastContainer } from 'react-toastify';
import { RequireAuth } from './components';
import useAuth from './context/UserContext';

function App() {
	const { isLogin } = useAuth();
	return (
		<BrowserRouter>
			<ToastContainer />
			<Routes>
				{/* Playground page for developers */}
				<Route path={Approutes.playground} element={<Playground />} />

				{/* Use NavBar and Footer layout  */}
				<Route element={<AppLayout />}>
					<Route path={Approutes.home} element={isLogin ? <Welcome /> : <Home />} />
					<Route path={Approutes.aboutUs} element={<AboutUs />} />
					<Route path={Approutes.contactUs} element={<ContactUs />} />
					<Route path={Approutes.auth.initial} element={<Auth />} />
					<Route path={Approutes.forgotPassword} element={<ForgotPassword />} />
					<Route path={Approutes.auth.verifyMail} element={<VerifyMail />} />
					<Route path={Approutes.auth.resetPassword} element={<ResetPassword />} />
					<Route path={Approutes.logout} element={<Logout />} />
				</Route>

				{/* Protected page routes */}
				<Route element={<RequireAuth />}>
					{/* use Dashboard layout  */}
					<Route element={<DashboardLayout />}>
						<Route
							path={Approutes.dashboard.initial}
							element={<Navigate to={Approutes.dashboard.performance} />}
						/>
						<Route path={Approutes.dashboard.performance} element={<Performance />} />
						<Route path={Approutes.dashboard.profile} element={<Profile />} />
						<Route path={Approutes.dashboard.settings} element={<Settings />} />
						<Route path={Approutes.dashboard.security} element={<Security />} />
						<Route path={Approutes.dashboard.privacyPolicy} element={<PrivacyPolicy />} />
						<Route path={Approutes.dashboard.help} element={<Help />} />
					</Route>

					{/* Use NavBar and Footer layout  */}
					<Route element={<AppLayout />}>
						<Route path={Approutes.welcome} element={<Welcome />} />

						{/* profile layout  */}
						<Route element={<ProfileLayout />}>
							<Route
								path={Approutes.profile.initial}
								element={<Navigate to={Approutes.profile.details} />}
							/>
							<Route path={Approutes.profile.details} element={<Details />} />
							<Route path={Approutes.profile.adverts} element={<Adverts />} />
							<Route path={Approutes.profile.messages} element={<Messages />} />
							<Route path={Approutes.profile.notifications} element={<Notifications />} />
							<Route path={Approutes.profile.saved} element={<SavedItems />} />
						</Route>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
