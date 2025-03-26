import React from 'react';
import { NavLink } from 'react-router-dom';
import { Approutes } from '../../../constants';

const Sidebar = () => {
	return (
		<aside className="w-1/6 h-screen bg-gray-200 p-4 flex flex-col gap-8 ">
			<div className="border-b border-b-black pb-4">
				<h3 className="text-2xl">ABC Logistics</h3>
			</div>

			<ul className="flex flex-col gap-2">
				{navList.map((item) => (
					<NavLink
						key={item.name}
						to={item.link}
						className={({ isActive }) =>
							` rounded-md  ${
								isActive && 'text-white bg-primary hover:bg-[#2686CE] text-center'
							}  hover:bg-slate-400 hover:text-white`
						}
					>
						<li className="p-2">{item.name}</li>
					</NavLink>
				))}

				<button type="button" className="text-start rounded-md hover:bg-slate-400 hover:text-white">
					<li className="p-2">Sign Out</li>
				</button>
			</ul>
		</aside>
	);
};

export default Sidebar;

const navList = [
	{
		name: 'Dashboard',
		link: Approutes.logistics.dashboard,
	},
	{
		name: 'Orders',
		link: Approutes.logistics.orders.new,
	},
];
