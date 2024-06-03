import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { UserProvider } from './context/UserContext';
import { SaveProvider } from './context/SaveContext.jsx';
import { MessageProvider } from './context/MessageContext.jsx';
import { TokenProvider } from './context/TokenContext.jsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<UserProvider>
				<TokenProvider>
					<MessageProvider>
						<SaveProvider>
							<App />
						</SaveProvider>
					</MessageProvider>
				</TokenProvider>
			</UserProvider>

			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>
);
