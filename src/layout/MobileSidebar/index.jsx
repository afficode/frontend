import { Link, NavLink } from 'react-router-dom';
import { ManSmiling } from '../../assets/images';
import { CameraSmall } from '../../assets/svgs';
import { Approutes } from '../../constants';
import { Button } from '../../ui';
import { useRef } from 'react';
import { useEffect } from 'react';
import useAuth from '../../context/UserContext';

const MobileSidebar = ({ sidebar, setSidebar }) => {
	const sidebarRef = useRef();

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

	const { user } = useAuth();

	return (
		<div className={sidebar ? showStyles : closeStyles}>
			<aside
				ref={sidebarRef}
				className="w-[15rem] h-full bg-[#D9D9D9] rounded-r-[2.5rem] flex flex-col items-center text-center"
			>
				<div className="w-full pb-2 mt-2 space-y-4 border-b border-black/30 ">
					<div className="relative w-[9rem] h-[9rem] mx-auto">
						<img src={ManSmiling} alt="" className="w-full h-full mx-auto rounded-full object-fit " />
						<img src={CameraSmall} alt="" className="absolute bottom-0 right-0 cursor-pointer" />
					</div>

					<div>
						<h4 className="capitalize">
							{user.firstname} {user.lastname}
						</h4>
						<p className="font-semibold capitalize">Auto Dealer</p>
					</div>
				</div>

				<nav className="flex flex-col justify-between flex-1 w-full px-4 my-6">
					<ul className="flex flex-col gap-1 sidebar-list">
						{navList.map((navItem) => (
							<NavLink key={navItem.name} to={navItem.link}>
								<li className="w-full py-1 transition rounded-md p-lg hover:bg-white">{navItem.name}</li>
							</NavLink>
						))}
					</ul>

					<ul className="mb-2 space-y-4">
						{/* <Button variant="plain" size="small" className="font-medium">
            Switch Mode
         </Button> */}
						<Link to={Approutes.logout}>
							<Button variant="plain" size="small" className="font-medium" title="Log out">
								Log Out
							</Button>
						</Link>
						<Button variant="plain" size="small" className="font-medium" title="Deactivate your account">
							Deactivate Account{' '}
						</Button>
					</ul>
				</nav>
			</aside>
		</div>
	);
};

export default MobileSidebar;

const navList = [
	{
		name: 'Performance',
		link: Approutes.dashboard.performance,
	},
	{
		name: 'Profile',
		link: Approutes.dashboard.profile,
	},
	{
		name: 'Settings',
		link: Approutes.dashboard.settings,
	},
	{
		name: 'Security & Login',
		link: Approutes.dashboard.security,
	},

	{
		name: 'Privacy/Policy',
		link: Approutes.dashboard.privacyPolicy,
	},
	{
		name: 'Help',
		link: Approutes.dashboard.help,
	},
	{
		name: 'Go to website',
		link: Approutes.home,
	},
];

const showStyles =
	'fixed top-0 left-0 z-50 w-full h-full bg-primary/50 transition-left duration-300 ease-in-out grid place-items-left';
const closeStyles =
	'fixed top-0 left-[-100vw] z-50 w-full h-full bg-transparent transition-left duration-300 ease-in-out';
