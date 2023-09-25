import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import userReducer, { initialState, userReducerOptions } from '../reducers/userReducer';
import { useQuery } from 'react-query';
import { TokenHook } from '../hooks/AuthHook';
import {
	getReducerInitialState,
	getRefreshToken,
	getToken,
	getUserFromLocalStorage,
} from '../utils';

const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
	console.log(getReducerInitialState());
	var defaultState;
	if (getReducerInitialState() !== null) {
		defaultState = getReducerInitialState();
	} else {
		defaultState = initialState;
	}
	const [state, dispatch] = useReducer(userReducer, defaultState);
	const [useData, setUserData] = useState(null);

	const login = (loginData) => {
		dispatch({
			type: userReducerOptions.LOGIN_USER,
			payload: { ...loginData },
		});
	};

	const logout = () => {
		dispatch({ type: userReducerOptions.LOGOUT });
	};

	const updateUserInfo = (data) => {
		dispatch({
			type: userReducerOptions.UPDATE_USER_INFO,
			payload: { ...data },
		});
	};

	const values = {
		user: state?.user,
		login,
		logout,
		updateUserInfo,
		...state,
	};

	return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

const useAuth = () => {
	const context = useContext(UserContext);

	if (context === undefined) {
		throw new Error('useAuth must be used within the UserContext. Check App.js.');
	}

	return context;
};
export default useAuth;
