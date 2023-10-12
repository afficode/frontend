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
	aboutUs: '/about-us',
	contactUs: '/contact-us',
	forgotPassword: '/forgot-password',
	home: '/',
	logout: '/logout',
	myAdverts: '/my-adverts',
	playground: '/playground',
	welcome: '/welcome',
};

export const backendLink = 'http://109.237.25.252:4000/';
