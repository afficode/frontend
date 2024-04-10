import { Link, NavLink } from 'react-router-dom';
import { Approutes } from '../../constants';
import { Button } from '../../ui';

const GrabSidebar = () => {
	return (
		<aside className="w-[15rem] h-[83vh]  bg-[#D9D9D9] rounded-[2.5rem] flex flex-col items-center text-center max-lg:hidden ">
			<nav className="flex flex-col justify-between flex-1 w-full px-4 my-12">
				<ul className="flex flex-col gap-1 sidebar-list">
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
					<Button variant="plain" size="small" className="font-medium" title="Deactivate your account">
						Deactivate Account{' '}
					</Button>
				</ul>
			</nav>
		</aside>
	);
};

export default GrabSidebar;

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
