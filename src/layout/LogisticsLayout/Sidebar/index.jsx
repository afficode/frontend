import React from 'react';
import { NavLink } from 'react-router-dom';
import { Approutes } from '../../../constants';

const Sidebar = () => {
	return (
		<aside className="w-1/5 h-screen bg-gray-200 p-4">
			<div className="">
				<h3>ABC Logistics</h3>
			</div>

			<ul>
				{navList.map((item) => (
					<NavLink key={item.name} to={item.link}>
						<li>{item.name}</li>
					</NavLink>
				))}
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
