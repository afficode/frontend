import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { LogisticsCompleted, LogisticsDelivery, LogisticsReturned } from '../../../assets/images';

const LogisticsDashboard = () => {
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
		<div className="space-y-8">
			<div className="flex items-center justify-between">
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
			</div>

			<div className="flex items-center justify-between">
				<div className="max-w-[350px] w-full p-4 border border-black rounded-xl flex items-center flex-col justify-center gap-2">
					<img
						src={LogisticsDelivery}
						alt="On Delivery"
						className="w-[100px] h-[100px] object-contain"
					/>

					<div className="text-center ">
						<p>On Delivery</p>
						<h6 className="font-semibold">200+</h6>
					</div>
				</div>
				<div className="max-w-[350px] w-full p-4 border border-black rounded-xl flex items-center flex-col justify-center gap-2">
					<img
						src={LogisticsReturned}
						alt="On Delivery"
						className="w-[100px] h-[100px] object-contain"
					/>

					<div className="text-center ">
						<p>Returned</p>
						<h6 className="font-semibold">34</h6>
					</div>
				</div>
				<div className="max-w-[350px] w-full p-4 border border-black rounded-xl flex items-center flex-col justify-center gap-2">
					<img
						src={LogisticsCompleted}
						alt="On Delivery"
						className="w-[100px] h-[100px] object-contain"
					/>

					<div className="text-center ">
						<p>On Delivery</p>
						<h6 className="font-semibold">200+</h6>
					</div>
				</div>
			</div>

			<div className="">
				<div className="flex justify-between items-center p-2 bg-gray-200">
					<h6>Tracking List</h6>

					<div></div>
				</div>
				<div className="mt-4 !overflow-x-auto max-sm:w-[92vw] bg-white border border-black/40 max-h-96">
					<table className="table  table-pin-rows ">
						<thead className="text-xs font-medium border-none">
							<tr className="text-black bg-gray-200">
								<th>Product(s)</th>
								<th className="text-center">Date</th>
								<th className="text-center">Dispatcher Name</th>
								<th className="text-center">Destination</th>
								<th className="text-center">Status</th>
								<th className="text-center">Fee</th>
							</tr>
						</thead>
						<tbody>
							<tr className="text-sm whitespace-nowrap font-medium  hover:bg-gray-200">
								<td className="capitalize hover:underline hover:underline-offset-4">Toyota Corolla</td>
								<td className="text-center text-primary">Mar 25. 2024</td>
								<td className="text-center text-red-500">Sold</td>
								<td className="text-center ">₦ 250k</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default LogisticsDashboard;
