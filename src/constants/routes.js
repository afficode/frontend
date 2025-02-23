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
		transactions: '/profile/transactions',
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
	refundForm: 'refund-form',
};

//export const backendLink = process.env.NODE_ENV !== "sam" ? 'http://109.237.25.252:4000/' : 'http://localhost:4000/';
export const backendLink =
	import.meta.env.VITE_CHECK_ENV === 'sam_dev'
		? 'http://localhost:4000/'
		: 'https://api.boonfu.site/';

export const frontendLink = 'https://boonfu.site/';
// export const frontendLink = 'http://localhost:5173/';
