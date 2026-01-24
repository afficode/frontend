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
	isLogistics: false,
	//grabberBlocked: false,
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
	REDIRECT_LINK: '_plyvw',
};

export const setUpUser = (payload, state) => {
	let userData = { ...state, ...payload?.user };
	if (Object.keys(userData).includes('company_name')) {
		// implement logistics
		if (payload?.user?.verified == '1') {
			userData = {
				...userData,
				isLogin: true,
				isLogistics: true,
			};
		}
	} else {
		if (payload?.user?.verified === '1') {
			userData = {
				...userData,
				isLogin: true,
			};
		}

		if (payload?.user?.isAdmin === '1') {
			userData = {
				...userData,
				isAdmin: true,
			};
		}
		if (payload?.user?.grabber?.id) {
			userData = {
				...userData,
				isGrabber: true,
			};
		} else {
			userData = {
				...userData,
				isGrabber: false,
			};
		}

		if (payload?.user?.grabber?.isActive === '0' || payload?.user?.grabber === null) {
			userData = {
				...userData,
				grabberActive: false,
			};
		}

		if (payload?.user?.grabber?.isActive === '1') {
			userData = {
				...userData,
				grabberActive: true,
			};
		}
	}

	if (payload?.user?.blocked === '1') {
		userData = {
			...userData,
			isBlocked: true,
		};
	}

	return userData;
};

const userReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case userReducerOptions.LOGIN_USER:
			const userStatus = setUpUser(payload, state);
			setUser(userStatus);
			payload?.token && setToken(payload?.token);
			payload?.refreshToken && setRefreshToken(payload?.refreshToken);
			setReducerInitialState({ ...userStatus });
			return { ...userStatus };
		case userReducerOptions.LOGOUT:
			clearLocalStorage();
			return initialState;
		case userReducerOptions.UPDATE_USER_INFO:
			const updatedUserStatus = setUpUser(payload, state);
			setUser(updatedUserStatus);
			payload?.token && setToken(payload?.token);
			payload?.refreshToken && setRefreshToken(payload?.refreshToken);
			setReducerInitialState({ ...updatedUserStatus });
			return { ...updatedUserStatus };
		case userReducerOptions.GET_USER:
			return state.user;

		default:
			return state;
	}
};

export default userReducer;
