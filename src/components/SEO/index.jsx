import { Helmet } from 'react-helmet-async';
import { COMPANY_NAME, SEO_PAGES, WELCOME_BOONFU_IMAGE, frontendLink } from '../../constants';
import { usePrerender } from '../../hooks/usePrerender';
import { capitalizeWords } from '../../utils';

const SEO = ({ title, description, image, url, type = 'website', keywords = [] }) => {
    const siteName = COMPANY_NAME;
    const fullTitle = title
        ? `${capitalizeWords(title)} | ${siteName}`
        : "Boonfu | Nigeria's Premier Marketplace to Buy, Sell & Earn";
    const defaultKeywords = [
        'marketplace Nigeria',
        'buy and sell',
        'affiliate marketing',
        'escrow payments',
        'Boonfu',
        'Grab feature',
        'digital commerce',
    ];
    const completeKeywords = Array.isArray(keywords)
        ? keywords.concat(defaultKeywords).join(', ')
        : keywords.split(',').concat(defaultKeywords).join(', ');
    const defaultDescription =
        "Join Boonfu, Nigeria's fastest-growing C2C marketplace. Use our unique Grab feature to accelerate sales, shop securely with escrow, or earn commissions as a digital marketer.";

    usePrerender();
    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name='title' content={fullTitle} />
            <meta
                name='description'
                content={
                    description ||
                    "Join Boonfu, Nigeria's fastest-growing C2C marketplace. Use our unique Grab feature to accelerate sales, shop securely with escrow, or earn commissions as a digital marketer."
                }
            />
            <meta property='og:type' content={type} />
            <meta property='og:title' content={fullTitle} />
            <meta property='og:description' content={description || defaultDescription} />
            <meta property='og:image' content={image || WELCOME_BOONFU_IMAGE} />
            <meta property='og:url' content={url || window.location.href} />

            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:title' content={fullTitle} />
            <meta name='twitter:description' content={description || defaultDescription} />
            <meta name='twitter:image' content={image || WELCOME_BOONFU_IMAGE} />
            <meta property='twitter:url' content={url || window.location.href} />
            {keywords && <meta name='keywords' content={completeKeywords} />}
        </Helmet>
    );
};

export default SEO;
