export const Approutes = {
	auth: {
		initial: '/auth',
		verifyMail: '/auth/verifyaccount',
		resetPassword: '/auth/reset_password',
		reverifyEmail: '/auth/reverify_email',
	},
	dashboard: {
		initial: '/dashboard',
		performance: '/dashboard/performance',
		profile: '/dashboard/profile',
		settings: '/dashboard/settings',
		security: '/dashboard/security-login',
		privacyPolicy: '/dashboard/privacy-policy',
		help: '/dashboard/help',
	},
	profile: {
		initial: '/profile',
		adverts: '/profile/adverts',
		messages: '/profile/messages',
		notifications: '/profile/notifications',
		saved: '/profile/saved',
	},
	product: {
		initial: '/product',
		view: '/product/:id',
		category: '/product/category',
		viewCategoryId: '/product/category/:id',
	},
	aboutUs: '/about-us',
	checkout: '/checkout',
	contactUs: '/contact-us',
	forgotPassword: '/forgot-password',
	grab: {
		initial: '/grab',
		register: '/grab/register',
		home: '/grab/home',
		inspectionLog: '/grab/inspection-log',
		profile: '/grab/profile',
		dashboard: '/grab/dashboard',
		products: '/grab/products',
		product: (ad_id) => `/grab/products/${ad_id}`,
		grabProduct: (ad_id) => `/grab/view/${ad_id}`,
		grabbedProduct: (grbber_id, ad_id) => `/grab/view/${grbber_id}/${ad_id}`,
		settings: '/grab/settings',
		flyer: '/grab/flyer',
	},
	account: {
		initial: '/my-account/',
		history: '/my-account/account-history',
		deposit: '/my-account/deposit',
		withdraw: '/my-account/withdraw',
		paymentSuccess: 'my-account/payment-success',
	},
	home: '/',
	logout: '/logout',
	media: '/boonfu-media',
	playground: '/playground',
	postAd: '/post-ad',
	postDecision: '/post-decision',
	postSuccess: '/post-success',
	tokenSuccess: '/purchase-successful',
	updateAd: '/update-ad',
	underConstruction: '/under-construction',
	welcome: '/welcome',
};

//export const backendLink = process.env.NODE_ENV !== "sam" ? 'http://109.237.25.252:4000/' : 'http://localhost:4000/';
// export const backendLink = 'https://0923-2a02-8086-c97-8480-b99b-9152-327f-7924.ngrok-free.app/';
export const backendLink =
	import.meta.env.VITE_TESTING == 'gitpod'
		? 'https://4000-afficode-backend-cch37ds4fkj.ws-eu108.gitpod.io/'
		: import.meta.env.VITE_TESTING == 'sam'
		? 'http://localhost:4000/'
		: import.meta.env.VITE_TESTING == 'sam_elementary_os'
		? 'http://192.168.0.206:4000/'
		: import.meta.env.VITE_TESTING == 'staging_prod'
		? 'http://89.107.60.191:4000/'
		: 'https://backend-boonfu-staging-968fe07646b1.herokuapp.com/';
// ('https://4924-2a02-8086-c97-8480-3923-b9e-5814-57c9.ngrok-free.app');
// : 'http://109.237.25.252:4000/';
// console.log(process.env.VITE_TESTING)

export const frontendLink = 'http://localhost:5173/';
