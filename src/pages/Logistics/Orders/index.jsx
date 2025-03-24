import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Approutes } from '../../../constants';

const LogisticsOrders = () => {
	return (
		<div>
			<div>
				<div></div>
				<div className="space-y-2">
					<h1>Orders</h1>

					<ul className="flex gap-4 items-center">
						{navList.map((item) => (
							<NavLink key={item.name} to={item.link}>
								<li>{item.name}</li>
							</NavLink>
						))}
					</ul>
				</div>
			</div>

			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default LogisticsOrders;

const navList = [
	{
		name: 'New',
		link: Approutes.logistics.orders.new,
	},
	{
		name: 'Quoted',
		link: Approutes.logistics.orders.quoted,
	},
	{
		name: 'Closed',
		link: Approutes.logistics.orders.closed,
	},
	{
		name: 'All',
		link: Approutes.logistics.orders.all,
	},
];
