
export const Approutes = {
	auth: {
		initial: '/auth',
		verifyMail: '/auth/verifyaccount',
		resetPassword: '/auth/reset_password',
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
		details: '/profile/details',
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
	contactUs: '/contact-us',
	forgotPassword: '/forgot-password',
	grab: {
		initial: '/grabber',
		register: '/grabber/register',
		home: '/grabber/home',
		profile: '/grabber/profile',
		dashboard: '/grabber/dashboard',
		products: '/grabber/products',
		product: '/grabber/product',
		grabbedProduct: '/grabber/grabbed-product',
		settings: '/grabber/settings',
		flyer: '/grabber/flyer',
	},
	home: '/',
	logout: '/logout',
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
//export const backendLink = 'http://localhost:4000/';
export const backendLink =
	import.meta.env.VITE_TESTING == 'gitpod'
		? 'https://4000-afficode-backend-cch37ds4fkj.ws-eu108.gitpod.io/'
		: import.meta.env.VITE_TESTING == 'sam'
		? 'http://localhost:4000/' 
		: import.meta.env.VITE_TESTING == 'staging_prod'
		? 'http://89.107.60.191:4000/'
		: 'https://backend-boonfu-staging-968fe07646b1.herokuapp.com/';
// : 'http://109.237.25.252:4000/';
//console.log(process.env.VITE_TESTING)

export const frontendLink = 'http://localhost:5173/';
