import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AboutUs, ContactUs, Home, Welcome } from './pages';
import { AppLayout } from './layout';
import { Approutes } from './constants';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* use NavBar and Footer layout  */}
				<Route element={<AppLayout />}>
					<Route path={Approutes.home} element={<Home />} />
					<Route path={Approutes.welcome} element={<Welcome />} />
					<Route path={Approutes.aboutUs} element={<AboutUs />} />
					<Route path={Approutes.contactUs} element={<ContactUs />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
