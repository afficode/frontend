import { NavLink } from 'react-router-dom';
import { ManSmiling } from '../../assets/images';
import { CameraSmall } from '../../assets/svgs';
import { Approutes } from '../../constants';
import { Button } from '../../ui';
import { useRef } from 'react';
import { useEffect } from 'react';

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

	return (
		<div className={sidebar ? showStyles : closeStyles}>
			<aside
				ref={sidebarRef}
				className="w-[15rem] h-full bg-[#D9D9D9] rounded-r-[2.5rem] flex flex-col items-center text-center"
			>
				<div className="w-full mt-2 pb-2 space-y-4 border-b border-black/30 ">
					<div className="relative w-[9rem] h-[9rem] mx-auto">
						<img src={ManSmiling} alt="" className="rounded-full w-full h-full mx-auto object-fit " />
						<img src={CameraSmall} alt="" className="absolute right-0 bottom-0 cursor-pointer" />
					</div>

					<div>
						<h3 className="">Adeola Lawal</h3>
						<p className="font-semibold">Auto Dealer</p>
					</div>
				</div>

				<nav className="w-full flex-1 flex flex-col justify-between my-6 px-4">
					<ul className="sidebar-list flex flex-col gap-1">
						{navList.map((navItem) => (
							<NavLink key={navItem.name} to={navItem.link}>
								<li className="p-lg py-1 border border-transparent w-full hover:border-primary transition">
									{navItem.name}
								</li>
							</NavLink>
						))}
					</ul>

					<ul className="space-y-4 mb-2">
						{/* <Button variant="plain" size="small" className="font-medium">
            Switch Mode
         </Button> */}
						<Button variant="plain" size="small" className="font-medium">
							Log Out
						</Button>
						<Button variant="plain" size="small" className="font-medium">
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
		name: 'My Adverts',
		link: Approutes.myAdverts,
	},

	{
		name: 'Privacy/Policy',
		link: Approutes.dashboard.privacyPolicy,
	},
	{
		name: 'Help',
		link: Approutes.dashboard.help,
	},
];

const showStyles =
	'fixed top-0 left-0 z-50 w-full h-full bg-primary/50 transition-left duration-300 ease-in-out grid place-items-left';
const closeStyles =
	'fixed top-0 left-[-100vw] z-50 w-full h-full bg-transparent transition-left duration-300 ease-in-out';
