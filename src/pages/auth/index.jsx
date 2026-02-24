import { useEffect } from 'react';
import { Banner, SEO } from '../../components';
import { frontendBaseUrl } from '../../constants';
import DesktopView from './DesktopView';
import MobileView from './MobileView';
import { clearLocalStorage } from '../../utils';
const Auth = () => {
    useEffect(() => {
        clearLocalStorage();
    }, []);

    return (
        <section className='w-full py-4 m-auto xl:p-2'>
            <SEO
                title='Register or Login'
                description='Login or register to access your account'
                url={`${frontendBaseUrl}/auth`}
                keywords={['login', 'register', 'authentication']}
            />
            <Banner className='xl:my-2'>
                <h4 className='text-center text-black text-2xl py-[0.2rem] font-bold'>
                    Welcome to Boonfu
                </h4>
            </Banner>
            <section className='hidden lg:flex'>
                <DesktopView />
            </section>
            <section className='flex md:flex lg:hidden'>
                <MobileView />
            </section>
        </section>
    );
};

export default Auth;
