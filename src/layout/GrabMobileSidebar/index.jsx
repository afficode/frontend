import { useEffect, useRef } from 'react';
import { Approutes } from '../../constants';
import { Button } from '../../ui';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useNotify } from '../../hooks';
import { privateAxios } from '../../utils';

const GrabMobileSidebar = ({ sidebar, setSidebar }) => {
    const sidebarRef = useRef();

    const navigate = useNavigate();
    const notify = useNotify();

    const handleDeactivateGrabber = async () => {
        try {
            await privateAxios.delete('/grab/remove_grabber_account');
            notify('Your grabber account has been deactivated.', 'success');

            // Redirect to the home page or any other page
            setTimeout(() => {
                navigate(Approutes.logout);
            }, 2000);
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            notify('There was an error deactivating your account. Please try again.', 'error');
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setSidebar(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setSidebar]);

    return (
        <div className={sidebar ? showStyles : closeStyles}>
            <aside
                ref={sidebarRef}
                className="w-[15rem] h-[100vh] bg-[#D9D9D9] rounded-r-[2.5rem] flex flex-col items-center  text-center  "
            >
                <nav className="flex flex-col justify-between flex-1 w-full px-4 my-12">
                    <ul className="flex flex-col gap-1 sidebar-list mt-6">
                        {navList.map((navItem) => (
                            <NavLink key={navItem.name} to={navItem.link}>
                                <li className="w-full py-1 transition rounded-md p-lg hover:bg-white">{navItem.name}</li>
                            </NavLink>
                        ))}
                    </ul>

                    <ul className="mb-2 space-y-4">
                        <Link to={Approutes.logout}>
                            <Button variant="plain" size="small" className="font-medium" title="Log out">
								Log Out
                            </Button>
                        </Link>
                        <Button
                            onClick={handleDeactivateGrabber}
                            variant="plain"
                            size="small"
                            className="font-medium"
                            title="Deactivate your account"
                        >
							Deactivate Account{' '}
                        </Button>
                    </ul>
                </nav>
            </aside>
        </div>
    );
};

export default GrabMobileSidebar;

const showStyles =
	'fixed top-0 left-0 z-[10000] w-full h-full   bg-primary/50 transition-left duration-300 ease-in-out grid place-items-left';
const closeStyles =
	'fixed top-0 left-[-100vw] z-[10000] w-full h-full  bg-transparent transition-left duration-300 ease-in-out';

const navList = [
    {
        name: 'Profile',
        link: Approutes.grab.profile,
    },
    {
        name: 'Dashboard',
        link: Approutes.grab.dashboard,
    },
    {
        name: 'Product Page',
        link: Approutes.grab.products,
    },

    {
        name: 'Settings',
        link: Approutes.grab.settings,
    },
];
