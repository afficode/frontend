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
	Products,
	ResetPassword,
	SavedItems,
	Security,
	Settings,
	VerifyMail,
	Welcome,
	ViewProduct,
	Categories,
	Category,
	PostAd,
	UpdateAd,
	PostDecision,
	PostSuccess,
	Grabs,
	GrabRegister,
	GrabHome,
	GrabProfile,
	GrabDashboard,
	GrabProducts,
	GrabSettings,
	GrabProduct,
	GrabFlyer,
	GrabbedProduct,
	BoonfuMedia,
} from './pages';
import { AppLayout, DashboardLayout } from './layout';
import { Approutes } from './constants';
import { ToastContainer } from 'react-toastify';
import { RequireAuth, Success } from './components';
import useAuth from './context/UserContext';
import 'react-toastify/dist/ReactToastify.css';
import UnderConstruction from './pages/UnderConstruction';
import GrabLayout from './layout/GrabLayout';

function App() {
	const { isLogin } = useAuth();
	const { user } = useAuth();
	// console.log(user.grabberActive);
	return (
		<BrowserRouter>
			<Routes>
				{/* Playground page for developers */}
				<Route path={Approutes.playground} element={<Playground />} />
				<Route path={Approutes.grab.flyer} element={<GrabFlyer />} />

				{/* Use NavBar and Footer layout  */}
				<Route element={<AppLayout />}>
					<Route path={Approutes.home} element={isLogin ? <Welcome /> : <Home />} />
					<Route path={Approutes.aboutUs} element={<AboutUs />} />
					<Route path={Approutes.media} element={<BoonfuMedia />} />
					<Route path={Approutes.contactUs} element={<ContactUs />} />
					<Route path={Approutes.auth.initial} element={<Auth />} />
					<Route path={Approutes.forgotPassword} element={<ForgotPassword />} />
					<Route path={Approutes.auth.verifyMail} element={<VerifyMail />} />
					<Route path={Approutes.auth.resetPassword} element={<ResetPassword />} />
					<Route path={Approutes.logout} element={<Logout />} />
					<Route path={Approutes.product.initial} element={<Products />} />
					<Route path={Approutes.product.view} element={<ViewProduct />} />
					<Route path={Approutes.product.category} element={<Categories />} />
					<Route path={Approutes.product.viewCategoryId} element={<Category />} />
					<Route path={Approutes.underConstruction} element={<UnderConstruction />} />
				</Route>

				{/* Protected page routes */}
				<Route element={<RequireAuth />}>
					{/* Use NavBar and Footer layout  */}
					<Route element={<AppLayout />}>
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
						<Route element={<GrabLayout />}>
							<Route
								path={Approutes.grab.profile}
								element={user?.grabberActive ? <GrabProfile /> : <Navigate to={Approutes.grab.initial} />}
							/>
							<Route path={Approutes.grab.dashboard} element={<GrabDashboard />} />
							<Route
								path={Approutes.grab.products}
								element={user?.grabberActive ? <GrabProducts /> : <Navigate to={Approutes.grab.initial} />}
							/>
							<Route
								path={Approutes.grab.settings}
								element={user?.grabberActive ? <GrabSettings /> : <Navigate to={Approutes.grab.initial} />}
							/>
						</Route>
						<Route
							path={Approutes.grab.initial}
							element={user?.grabberActive ? <Navigate to={Approutes.grab.home} /> : <Grabs />}
						/>
						<Route
							path={Approutes.grab.register}
							element={user?.grabberActive ? <Navigate to={Approutes.grab.home} /> : <GrabRegister />}
						/>
						<Route
							path={Approutes.grab.home}
							element={user?.grabberActive ? <GrabHome /> : <Navigate to={Approutes.grab.initial} />}
						/>
						<Route
							path={Approutes.grab.product}
							element={user?.grabberActive ? <GrabProduct /> : <Navigate to={Approutes.grab.initial} />}
						/>
						<Route path={Approutes.grab.register} element={<GrabRegister />} />

						{/* <Route element={<GrabLayout />}>
							<Route path={Approutes.grab.profile} element={<GrabProfile />} />
							<Route path={Approutes.grab.dashboard} element={<GrabDashboard />} />
							<Route path={Approutes.grab.products} element={<GrabProducts />} />
							<Route path={Approutes.grab.settings} element={<GrabSettings />} />
						</Route>
						<Route path={Approutes.grab.initial} element={<Grabs />} />
						<Route path={Approutes.grab.register} element={ <GrabRegister />} />
						<Route path={Approutes.grab.home} element={<GrabHome />} />
						<Route path={Approutes.grab.product} element={<GrabProduct />} /> */}
						<Route path={Approutes.grab.grabbedProduct} element={<GrabbedProduct />} />
						<Route path={Approutes.welcome} element={<Welcome />} />
						<Route path={`${Approutes.postDecision}`} element={<PostDecision />} />
						<Route path={`${Approutes.postAd}/:categoryId`} element={<PostAd />} />
						<Route path={`${Approutes.updateAd}/:adId`} element={<UpdateAd />} />
						<Route path={`${Approutes.postSuccess}/:adId`} element={<PostSuccess />} />
						<Route path={Approutes.tokenSuccess} element={<Success />} />

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

			<ToastContainer
				limit={1}
				autoClose={3500}
				newestOnTop={true}
				closeButton={false}
				position="top-center"
				hideProgressBar={true}
			/>
		</BrowserRouter>
	);
}

export default App;
