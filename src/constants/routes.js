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
	home: '/',
	logout: '/logout',
	playground: '/playground',
	postAd: '/post-ad',
	postDecision: '/post-decision',
	updateAd: '/update-ad',
	welcome: '/welcome',
};

export const backendLink = 'http://109.237.25.252:4000/';
//export const backendLink = 'http://localhost:4000/';

