import { NavLink, Outlet } from 'react-router-dom';
import { Approutes } from '../../../constants';
import { BsBellFill, BsBookmarkFill, BsChatLeftTextFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { HiOutlineSpeakerphone } from 'react-icons/hi';

const ProfileLayout = () => {
	return (
		<div>
			<div className="p-2 my-4 bg-gray-200">
				<ul className="flex items-center profile-navlist bg-primary ">
					{navItems.map((item) => (
						<NavLink
							key={item.name}
							to={item.link}
							className=" flex-1 my-1 py-4 bg-gray-200 text-center text-black/50 mx-[.15rem] "
							title={item.title}
						>
							<li className="hidden text-sm font-medium md:text-lg sm:block">{item.name}</li>
							<li className="flex justify-center text-center  sm:hidden">{item.icon}</li>
						</NavLink>
					))}
				</ul>
			</div>

			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default ProfileLayout;

const navItems = [
	{
		name: 'My Details',
		link: Approutes.profile.details,
		icon: <CgProfile size={20} />,
		title: 'My Details',
	},
	{
		name: 'My Saved Items',
		link: Approutes.profile.saved,
		icon: <BsBookmarkFill size={20} />,
		title: 'My Saved Items',
	},
	{
		name: 'Notifications',
		link: Approutes.profile.notifications,
		icon: <BsBellFill size={20} />,
		title: 'My Notifications',
	},
	{
		name: 'Messages',
		link: Approutes.profile.messages,
		icon: <BsChatLeftTextFill size={20} />,
		title: 'My Messages',
	},
	{
		name: 'My Adverts',
		link: Approutes.profile.adverts,
		icon: <HiOutlineSpeakerphone size={20} />,
		title: 'My Adverts',
	},
];
