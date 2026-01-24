import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { UserProvider } from "./context/UserContext";
import { SaveProvider } from "./context/SaveContext.jsx";
import { MessageProvider } from "./context/MessageContext.jsx";
import { GrabProvider } from "./context/GrabContext.jsx";
import { TokenProvider } from "./context/TokenContext.jsx";
import { NotificationProvider } from "./context/Notification.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <NotificationProvider>
          <TokenProvider>
            <MessageProvider>
              <GrabProvider>
                <SaveProvider>
                  <App />
                </SaveProvider>
              </GrabProvider>
            </MessageProvider>
          </TokenProvider>
        </NotificationProvider>
      </UserProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
