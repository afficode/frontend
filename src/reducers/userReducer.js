import {
	setToken,
	setRefreshToken,
	setUser,
	setReducerInitialState,
	getReducerInitialState,
	clearLocalStorage,
} from '../utils';

export const initialState = {
	isLogin: false,
	isBlocked: false,
	isAdmin: false,
	isGrabber: false,
	grabberBlocked: false,
};

export const userReducerOptions = {
	LOGIN_USER: 'LOGIN_USER',
	UPDATE_USER_INFO: 'UPDATE_USER',
	GET_USER: 'GET_USER',
	LOGOUT: 'LOGOUT',
	ACCESS_TOKEN: 'vduwds',
	REFRESH_TOKEN: 'sfiurf',
	USER: 'bs',
	INITIAL_STATE: '_tye',
	REDIRECT_LINK: '_plyvw'
};

const setUpUser = (payload, state) => {
	let userData = { ...state, ...payload };
	if (payload?.user?.verified === '1') {
		userData = {
			...userData,
			isLogin: true,
		};
	}
	if (payload?.user?.blocked === '1') {
		userData = {
			...userData,
			isBlocked: true,
		};
	}
	if (payload?.user?.isAdmin === '1') {
		userData = {
			...userData,
			isAdmin: true,
		};
	}
	if (!isNaN(payload?.user?.grabber_id)) {
		userData = {
			...userData,
			isGrabber: true,
		};
	}

	if (payload?.user?.grabberActive === '0') {
		userData = {
			...userData,
			grabberBlocked: true,
		};
	}
	return userData;
};

const userReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case userReducerOptions.LOGIN_USER:
			const userStatus = setUpUser(payload, state);
			setUser(payload.user);
			setToken(payload.token);
			setRefreshToken(payload.refreshToken);
			setReducerInitialState({ ...userStatus });
			return { ...userStatus };
		case userReducerOptions.LOGOUT:
			clearLocalStorage();
			return initialState;
		case userReducerOptions.UPDATE_USER_INFO:
			const updatedUserStatus = setUpUser(payload, state);
			setUser(updatedUserStatus);
			setToken(payload.token);
			setReducerInitialState({ ...updatedUserStatus });
			return { ...updatedUserStatus };
		case userReducerOptions.GET_USER:
			return state.user;

		default:
			return state;
	}
};

export default userReducer;
