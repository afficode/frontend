import React from 'react';
import { NavLink, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { Approutes } from '../../../constants';
import { useDebouncedCallback } from 'use-debounce';

const LogisticsOrders = () => {
	const navigate = useNavigate();
	let [searchParams, setSearchParams] = useSearchParams();

	const handleSearch = useDebouncedCallback((query, stateId) => {
		// console.log(stateId);
		if (query || stateId) {
			setSearchParams({
				q: query || '',
			});
		} else {
			// delete the query from the params
			setSearchParams({
				q: '',
			});
		}
	}, 500);

	return (
		<div className="w-full   space-y-4">
			<div className="w-full space-y-6">
				<div className="max-w-[510px] w-full">
					<input
						title="Search here."
						type="text"
						className="w-full py-2 pr-4 pl-[1rem] text-black bg-gray-200 text-sm  border border-transparent rounded-xl  focus:border-primary outline-none focus:ring focus:ring-opacity-10 focus:ring-primary"
						placeholder="Search...."
						defaultValue={searchParams.get('q') || ''}
						onChange={(e) => {
							const query = e.target.value;
							const stateId = searchParams.get('state_id') || '';
							handleSearch(query, stateId);
						}}
					/>
				</div>

				<div className="space-y-2 w-full">
					<h1 className="text-3xl">Orders</h1>

					<div className="flex items-center justify-between border-b ">
						<ul className="flex gap-8 items-center w-full">
							{navList.map((item) => (
								<NavLink
									key={item.name}
									to={item.link}
									className={({ isActive }) =>
										`${isActive && 'font-semibold border-b border-b-primary'}  border-b-primary `
									}
								>
									<li>{item.name}</li>
								</NavLink>
							))}
						</ul>

						<button type="button">Filter</button>
					</div>
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
