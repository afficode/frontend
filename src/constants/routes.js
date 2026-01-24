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
		dashboardPrivacyPolicy: '/dashboard/privacy-policy',
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
	privacyPolicy: '/privacy-policy',
	grabSystem: '/grab-system',
	cookiePolicy: '/cookie-policy',
	checkout: {
		checkout: '/checkout/:grabber_id/:ad_id',
		useCheckout: (grabber_id, ad_id) => `/checkout/${grabber_id}/${ad_id}`,
		delivery: '/checkout/delivery/:grabber_id/:ad_id',
		useDelivery: (grabber_id, ad_id) => `/checkout/delivery/${grabber_id}/${ad_id}`,
		pickup: '/checkout/pickup/:grabber_id/:ad_id',
		pickup2: '/checkout/pickup/:ad_id',
		usePickup: (grabber_id, ad_id) =>
			`/checkout/pickup${grabber_id !== undefined ? `/${grabber_id}` : ''}/${ad_id}`,
		paymentSuccess: '/checkout/payment-success',
		closePickup: '/checkout/close-pickup/:escrow_id',
		useClosePickup: (escrow_id) => `/checkout/close-pickup/${escrow_id}`,
	},
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
		grabbedProduct: (grabber_id, ad_id) => `/grab/view/${grabber_id}/${ad_id}`,
		settings: '/grab/settings',
		flyer: '/grab/flyer/:ad_id',
		useFlyer: (ad_id) => `/grab/flyer/${ad_id}`,
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
	safety: '/safety-guides',
	playground: '/playground',
	postAd: '/post-ad',
	postDecision: '/post-decision',
	postSuccess: '/post-success',
	updateAd: '/update-ad',
	underConstruction: '/under-construction',
	welcome: '/welcome',
	refundForm: '/refund-form',
};

const prodOptions = ['production', 'prod'];

const getBackendLink = () => {
	if (prodOptions.includes(import.meta.env.VITE_ENV)) {
		return import.meta.env.VITE_BACKEND_URL || 'https://api.boonfu.com/';
	}

	return import.meta.env.VITE_BACKEND_URL || 'https://api.boonfu.site/';
};

const getFrontendLink = () => {
	if (prodOptions.includes(import.meta.env.VITE_ENV)) {
		return import.meta.env.VITE_FRONTEND_URL || 'https://boonfu.com/';
	}

	return import.meta.env.VITE_FRONTEND_URL || 'https://boonfu.site/';
};

export const backendLink = getBackendLink();
export const frontendLink = getFrontendLink();
