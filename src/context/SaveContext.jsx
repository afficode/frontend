import { useContext, useState } from 'react';

import useAuth from './UserContext';
import { createContext } from 'react';

const SaveContext = createContext(null);

export const SaveProvider = ({ children }) => {
    const { isLogin } = useAuth();

    const [saves, setSaves] = useState({});
    const [savesId, setSavesId] = useState([]);

    return (
        <SaveContext.Provider value={{ saves, savesId, setSaves, setSavesId }}>
            {children}
        </SaveContext.Provider>
    );
};

const useSaveContext = () => {
    const context = useContext(SaveContext);

    if (context === undefined) {
        throw new Error(
            'useSaveContext must be used within the UserContext. Check App.js.'
        );
    }

    return context;
};
export default useSaveContext;
