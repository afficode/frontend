import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url, type = 'website' }) => {
	const siteName = 'YourBrand';
	const fullTitle = title ? `${title} | ${siteName}` : siteName;

	return (
		<Helmet>
			{/* Standard Metadata */}
			<title>{fullTitle}</title>
			<meta name='description' content={description} />

			{/* Open Graph / Facebook */}
			<meta property='og:type' content={type} />
			<meta property='og:title' content={fullTitle} />
			<meta property='og:description' content={description} />
			{image && <meta property='og:image' content={image} />}
			{url && <meta property='og:url' content={url} />}

			{/* Twitter */}
			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={fullTitle} />
			<meta name='twitter:description' content={description} />
			{image && <meta name='twitter:image' content={image} />}
		</Helmet>
	);
};

export default SEO;
