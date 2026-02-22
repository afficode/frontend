import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ScrollToTop } from '../../utils';
import {
    Approutes,
    BOONFU_MAIL,
    COMPANY_NAME,
    frontendLink,
    WELCOME_BOONFU_IMAGE,
} from '../../constants';
import { SEO } from '../../components';

const CookiePolicy = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [hash]);

    return (
        <div className='space-y-6 px-4 py-2 sm:py-4 sm:text-justify'>
            <div className='bg-primary py-12 px-4 sm:px-[4rem] m-2 rounded-md text-center text-white'>
                <h1 className='text-white'>Cookie Policy</h1>
                <p className='mt-2'>
                    [Effective Date: 22 December 2025] <br />
                    [Last Updated: 22 December 2025]
                </p>
            </div>

            <ol className={`${orderedListStyles} sm:!px-[4rem]`}>
                <Link to='#what-are-cookies' className='w-max block'>
                    <li>What Are Cookies?</li>
                </Link>
                <Link to='#how-to-manage-cookies' className='w-max block'>
                    <li>How to Manage Cookies and Similar Technologies</li>
                </Link>
                <Link to='#why-we-use-cookies' className='w-max block'>
                    <li>Why We Use Cookies</li>
                </Link>
                <Link to='#types-of-cookies' className='w-max block'>
                    <li>Types of Cookies We Use</li>
                </Link>
                <Link to='#changes-to-policy' className='w-max block'>
                    <li>Changes to This Policy</li>
                </Link>
            </ol>

            <div className='space-y-4 sm:px-[4rem]'>
                <p className={textStyles}>
                    This Cookie Policy explains how we use cookies and similar technologies when you
                    access or use our services. It also outlines the options available to you to
                    manage or control these technologies. By continuing to browse or use our
                    platform, you consent to our use of cookies as described here.
                </p>

                <p className={textStyles}>
                    Boonfu Limited is responsible for the use and management of cookies on this
                    Service. For questions, contact us at{' '}
                    <a className='text-secondary' href={`mailto:${BOONFU_MAIL}`}>
                        {BOONFU_MAIL}
                    </a>
                </p>

                <h4 id='what-are-cookies' className='scroll-mt-[130px]'>
                    What Are Cookies?
                </h4>
                <p className={textStyles}>
                    Cookies are small text files placed on your device (such as a computer or
                    smartphone) when you visit our Service. These files store certain information —
                    for example, your language preference, browser type, or device details.
                </p>

                <p className={`${textStyles} font-semibold mt-4`}>Cookie Types</p>
                <p className={textStyles}>We use:</p>
                <ul className={listStyles}>
                    <li>
                        <b>First-party cookies</b> – set directly by Boonfu to support the
                        functionality and performance of our Service.
                    </li>
                    <li>
                        <b>Third-party cookies</b> – set by external domains for analytics,
                        advertising, and marketing purposes.
                    </li>
                </ul>

                <p className={`${textStyles} font-semibold mt-4`}>Cookie Duration</p>
                <p className={textStyles}>Cookies may also be:</p>
                <ul className={listStyles}>
                    <li>
                        <b>Session Cookies</b> – These expire once you close your browser. They help
                        link your actions during a single session.
                    </li>
                    <li>
                        <b>Persistent Cookies</b> – These remain on your device until they expire or
                        are manually deleted. They help remember your preferences and activities
                        across sessions.
                    </li>
                </ul>

                <h4 id='how-to-manage-cookies' className='scroll-mt-[130px]'>
                    How to Manage Cookies and Similar Technologies
                </h4>
                <p className={textStyles}>
                    You can control cookies through your browser or device settings, though
                    restricting cookies may affect your browsing experience.
                </p>

                <p className={`${textStyles} font-semibold mt-4`}>Browser and Device Settings</p>
                <p className={textStyles}>
                    Most browsers allow you to block or delete cookies. The method depends on the
                    browser. You can find instructions at the links below:
                </p>
                <ul className={listStyles}>
                    <li>
                        <a
                            className='text-secondary'
                            href='https://support.google.com/chrome/answer/95647'
                        >
                            Chrome
                        </a>
                    </li>
                    <li>
                        <a
                            className='text-secondary'
                            href='https://support.mozilla.org/en-US/kb/cookies'
                        >
                            Firefox
                        </a>
                    </li>
                    <li>
                        <a
                            className='text-secondary'
                            href='https://www.opera.com/help/tutorials/security/cookies/'
                        >
                            Opera
                        </a>
                    </li>
                    <li>
                        <a
                            className='text-secondary'
                            href='https://support.microsoft.com/en-us/windows/manage-cookies-in-internet-explorer-beae7993-f4d5-838a-3e1e-a7aa127e0b56'
                        >
                            Internet Explorer
                        </a>
                    </li>
                    <li>
                        <a
                            className='text-secondary'
                            href='https://support.apple.com/en-us/HT201265'
                        >
                            Safari
                        </a>
                    </li>
                    <li>
                        <a
                            className='text-secondary'
                            href='https://support.microsoft.com/en-us/microsoft-edge/manage-cookies-in-microsoft-edge'
                        >
                            Edge
                        </a>
                    </li>
                </ul>

                <p className={`${textStyles} mt-4`}>
                    More detailed guidance is available at:{' '}
                    <a
                        className='text-secondary'
                        href='https://www.aboutcookies.org/how-to-control-cookies/'
                    >
                        https://www.aboutcookies.org/how-to-control-cookies/
                    </a>
                </p>

                <p className={`${textStyles} font-semibold text-red-500 mt-4`}>
                    Please note: Blocking all cookies may impact functionality and some features may
                    not work properly.
                </p>

                <p className={`${textStyles} font-semibold mt-4`}>Google Analytics Opt-Out</p>
                <p className={textStyles}>
                    To opt out of Google Analytics tracking:{' '}
                    <a
                        className='text-secondary'
                        href='https://tools.google.com/dlpage/gaoptout?hl=en'
                    >
                        https://tools.google.com/dlpage/gaoptout?hl=en
                    </a>
                </p>

                <p className={textStyles}>
                    To reset device identifiers or opt out of personalized ads, follow Google or
                    Apple instructions.
                </p>

                <p className={`${textStyles} font-semibold mt-4`}>
                    Opt-Out of Internet-Based Advertising
                </p>
                <p className={textStyles}>
                    Some third-party advertisers and networks we work with participate in
                    industry-wide opt-out programs. You may opt out at:
                </p>
                <ul className={listStyles}>
                    <li>
                        <b>Network Advertising Initiative</b> –{' '}
                        <a className='text-secondary' href='http://optout.networkadvertising.org/'>
                            http://optout.networkadvertising.org/
                        </a>
                    </li>
                    <li>
                        <b>Digital Advertising Alliance (US)</b> –{' '}
                        <a className='text-secondary' href='http://optout.aboutads.info/'>
                            http://optout.aboutads.info/
                        </a>
                    </li>
                    <li>
                        <b>Digital Advertising Alliance (Canada)</b> –{' '}
                        <a className='text-secondary' href='http://youradchoices.ca/choices'>
                            http://youradchoices.ca/choices
                        </a>
                    </li>
                    <li>
                        <b>European Digital Advertising Alliance</b> –{' '}
                        <a className='text-secondary' href='http://www.youronlinechoices.com/'>
                            http://www.youronlinechoices.com/
                        </a>
                    </li>
                    <li>
                        <b>DAA AppChoices</b> –{' '}
                        <a className='text-secondary' href='http://www.aboutads.info/appchoices'>
                            http://www.aboutads.info/appchoices
                        </a>
                    </li>
                </ul>

                <h4 id='why-we-use-cookies' className='scroll-mt-[130px]'>
                    Why We Use Cookies
                </h4>
                <p className={textStyles}>We use cookies for the following purposes:</p>
                <ul className={listStyles}>
                    <li>To improve page load speed.</li>
                    <li>To remember your preferences for a smoother user experience.</li>
                    <li>
                        To analyze visitor activity, identify popular and less visited pages, and
                        improve navigation.
                    </li>
                    <li>To deliver content and advertising tailored to your interests.</li>
                    <li>To measure the performance of advertising campaigns.</li>
                    <li>To enhance security and prevent fraudulent activity.</li>
                    <li>To personalize your experience on the Service.</li>
                    <li>To analyze overall platform performance and fix issues.</li>
                </ul>

                <h4 id='types-of-cookies' className='scroll-mt-[130px]'>
                    Types of Cookies We Use
                </h4>
                <p className={textStyles}>
                    The following table outlines the different categories of cookies we use and
                    their purposes:
                </p>

                <div className='overflow-x-auto mt-4'>
                    <table className='w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm'>
                        <thead>
                            <tr className='bg-primary text-white'>
                                <th className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-left'>
                                    Category
                                </th>
                                <th className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-left'>
                                    Purpose
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='hover:bg-gray-50 dark:hover:bg-gray-800'>
                                <td className='border border-gray-300 dark:border-gray-600 px-4 py-3'>
                                    <b>Essential Cookies</b>
                                </td>
                                <td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-500 dark:text-gray-400'>
                                    Necessary for the website to function. They allow you to log in
                                    and use the secure Escrow and Wallet features.
                                </td>
                            </tr>
                            <tr className='hover:bg-gray-50 dark:hover:bg-gray-800'>
                                <td className='border border-gray-300 dark:border-gray-600 px-4 py-3'>
                                    <b>Functional Cookies</b>
                                </td>
                                <td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-500 dark:text-gray-400'>
                                    Used to remember your choices and provide enhanced, personal
                                    features.
                                </td>
                            </tr>
                            <tr className='hover:bg-gray-50 dark:hover:bg-gray-800'>
                                <td className='border border-gray-300 dark:border-gray-600 px-4 py-3'>
                                    <b>Analytical Cookies</b>
                                </td>
                                <td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-500 dark:text-gray-400'>
                                    Help us understand how visitors interact with the site by
                                    collecting and reporting information anonymously.
                                </td>
                            </tr>
                            <tr className='hover:bg-gray-50 dark:hover:bg-gray-800'>
                                <td className='border border-gray-300 dark:border-gray-600 px-4 py-3'>
                                    <b>Targeting/Advertising</b>
                                </td>
                                <td className='border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-500 dark:text-gray-400'>
                                    Used to deliver adverts relevant to you and your interests,
                                    especially within our Affiliate "Grab" network.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h4 id='changes-to-policy' className='scroll-mt-[130px]'>
                    Changes to This Policy
                </h4>
                <p className={textStyles}>
                    We may update this Cookie Policy from time to time. When changes occur, we will
                    update the "Last Updated" date on this page. Your continued use of the Service
                    following any changes constitutes your acceptance of the revised Cookie Policy.
                </p>
            </div>

            <ScrollToTop />
            <SEO
                title='Cookie Policy'
                description={`Learn about our cookie policy and how we use cookies on our website - ${COMPANY_NAME}.`}
                url={`${frontendLink.slice(-1) === '/' ? frontendLink.slice(0, -1) : frontendLink}${Approutes.cookiePolicy}`}
                image={WELCOME_BOONFU_IMAGE}
                keywords={['Cookies']}
            />
        </div>
    );
};

export default CookiePolicy;

const textStyles = 'text-base leading-relaxed text-gray-500 dark:text-gray-400';
const listStyles = 'text-base leading-relaxed text-gray-500 dark:text-gray-400 list-disc pl-6';
const orderedListStyles =
    'text-base leading-relaxed text-primary dark:text-gray-400 list-decimal pl-6';
