import { Approutes } from './routes';
import { removeParamFromUrl } from '../utils';

export const BOONFU_MAIL = 'customerservice@boonfu.com';
export const BOONFU_LEGAL_MAIL = 'legal@boonfu.com';
export const BOONFU_PHONE = '+2349065681845';
export const BOONFU_FACEBOOK = 'https://www.facebook.com/profile.php?id=61583231027675';
export const BOONFU_INSTAGRAM = 'https://www.instagram.com/myboonfu/';
export const BOONFU_ADDRESS =
    'Plot 1B, Opeyemi Rotimi Famakinwa Close, Ajomale Zone, Opic, Lagos State, Nigeria';
export const AD_IMAGE_COUNT = 5;
export const AD_IMAGE_SIZE = 10 * 1024 * 1024;
export const GRAB_AD_EXPIRY_DAYS = 31;

export const COMPANY_NAME = 'Boonfu';

export const WELCOME_BOONFU_IMAGE = 'https://boonfu.com/og-image.png';

export const GRABBERS_FLYER = 'https://storage.boonfu.site/ads/GrabberService.png';

export const ESCROW_SERVICE_FLYER = 'https://storage.boonfu.site/ads/EscrowService.png';

export const SEO_PAGES = [
    Approutes.auth.initial,
    Approutes.auth.resetPassword,
    Approutes.aboutUs,
    Approutes.contactUs,
    Approutes.forgotPassword,
    Approutes.privacyPolicy,
    Approutes.cookiePolicy,
    Approutes.product.category,
    removeParamFromUrl(Approutes.product.viewCategoryId),
    removeParamFromUrl(Approutes.product.view),
    Approutes.product.initial,
    Approutes.cookiePolicy,
    Approutes.privacyPolicy,
];
