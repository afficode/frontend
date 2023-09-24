import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AboutUs, ContactUs, Home, ProductList, Welcome } from './pages';
import { AppLayout } from './layout';
import { Approutes } from './constants';

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					{/* use NavBar and Footer layout  */}
					<Route element={<AppLayout />}>
						<Route path={Approutes.home} element={<Home />} />
						<Route path={Approutes.welcome} element={<Welcome />} />
						<Route path={Approutes.aboutUs} element={<AboutUs />} />
						<Route path={Approutes.contactUs} element={<ContactUs />} />
						<Route path="/:categoryName/:subCategoryName" element={<ProductList />} />
						<Route path="/:categoryName" element={<ProductList />} />
					</Route>
				</Routes>
			</BrowserRouter>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
