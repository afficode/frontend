import { Helmet } from 'react-helmet-async';
import { COMPANY_NAME, SEO_PAGES, WELCOME_BOONFU_IMAGE } from '../../constants';
import { usePrerender } from '../../hooks/usePrerender';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, image, url, type = 'website', keywords = [] }) => {
	const location = useLocation();

	const siteName = COMPANY_NAME;
	const fullTitle = title ? `${title} | ${siteName}` : siteName;
	const defaultKeywords = ['marketplace Nigeria', 'buy and sell', 'affiliate marketing', 'escrow payments', 'Boonfu', 'Grab feature', 'digital commerce'];
	const completeKeywords = Array.isArray(keywords) ? keywords.concat(defaultKeywords).join(', ') : keywords.split(',').concat(defaultKeywords).join(', ');

	useEffect(() => {
		if (!SEO_PAGES.includes(location.pathname)) {
			title = "Boonfu | Nigeria's Premier Marketplace to Buy, Sell & Earn";
			description = "Join Boonfu, Nigeria's fastest-growing C2C marketplace. Use our unique Grab feature to accelerate sales, shop securely with escrow, or earn commissions as a digital marketer.";
			image = WELCOME_BOONFU_IMAGE;
			url = `${window.location.origin}${location.pathname}`;
			type = 'website';
			keywords = defaultKeywords.join(', ');
		}
	}, [location.pathname]);

	usePrerender();
	return (
		<Helmet>
			<title>{fullTitle}</title>
			<meta name='title' content={fullTitle} />
			<meta name='description' content={description} />

			<meta property='og:type' content={type} />
			<meta property='og:title' content={fullTitle} />
			<meta property='og:description' content={description} />
			{image && <meta property='og:image' content={image} />}
			{url && <meta property='og:url' content={url} />}

			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={fullTitle} />
			<meta name='twitter:description' content={description} />
			{image && <meta name='twitter:image' content={image} />}
			{url && <meta property='twitter:url' content={url} />}
			{keywords && <meta name='keywords' content={completeKeywords} />}
		</Helmet>
	);
};

export default SEO;
