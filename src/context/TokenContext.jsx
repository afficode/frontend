import { createContext, useContext, useState } from 'react';

// create context
const TokenContext = createContext(null);

// create context provider
export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState('');

    const updateToken = (newToken) => {
        setToken(newToken);
    };

    return <TokenContext.Provider value={{ token, updateToken }}>{children}</TokenContext.Provider>;
};

// create context hook
const useTokenContext = () => {
    const context = useContext(TokenContext);

    if (context === undefined) {
        throw new Error('useTokenContext must be used within the UserContext. Check App.js.');
    }
    return context;
};

export default useTokenContext;
