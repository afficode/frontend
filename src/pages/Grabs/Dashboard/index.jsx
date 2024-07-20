import { useState } from 'react';
import { GrabIcon, InspectionTick, New } from '../../../assets/svgs';
import { GrabMobileSidebar } from '../../../layout';
import { ScrollToTop } from '../../../utils';
import GrabHeader from '../GrabHeader';

const GrabDashboard = () => {
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<section className="w-full">
			<div className="lg:hidden">
				<GrabHeader text={"Grabber's Dashboard"} />
			</div>

			<div className="flex flex-wrap items-center justify-between gap-6 p-4 my-8 bg-gray-300 rounded-xl">
				<div className="flex-1 p-4 space-y-3 text-center text-white bg-red-500 whitespace-nowrap">
					<h4>Total Grabs</h4>
					<h4>[200]</h4>
				</div>
				<div className="flex-1 p-4 space-y-3 text-center bg-secondary whitespace-nowrap">
					<h4>Sales from link</h4>
					<h4>[20]</h4>
				</div>
				<div className="flex-1 p-4 space-y-3 text-center text-white bg-green-400 whitespace-nowrap">
					<h4>Pageviews via link</h4>
					<h4>[1,200]</h4>
				</div>
			</div>

			{/* Grabs by category chart here  */}

			<div className="my-8 space-y-4">
				<h4>Grab Activities Chart</h4>

				<div className="mt-4 overflow-x-auto bg-white border border-black/40 max-h-96">
					<table className="table table-pin-rows ">
						<thead className="text-sm font-medium border-none">
							<tr className="text-black bg-gray-200">
								<th>Product(s)</th>
								<th className="text-center">Grabbed date</th>
								<th className="text-center">Status</th>
								<th className="text-center">Commision in (₦)</th>
							</tr>
						</thead>
						<tbody>
							<tr className="font-medium whitespace-nowrap hover:bg-gray-200">
								<td className="capitalize hover:underline hover:underline-offset-4">Toyota Corolla</td>
								<td className="text-center text-primary">Mar 25. 2024</td>
								<td className="text-center text-red-500">Sold</td>
								<td className="text-center ">₦ 250k</td>
							</tr>
							<tr className="font-medium whitespace-nowrap hover:bg-gray-200">
								<td className="capitalize hover:underline hover:underline-offset-4">Shoe</td>
								<td className="text-center text-primary">Mar 20. 2024</td>
								<td className="text-center text-green-500">Active</td>
								<td className="text-center ">₦ 2k</td>
							</tr>
							<tr className="font-medium whitespace-nowrap hover:bg-gray-200">
								<td className="capitalize hover:underline hover:underline-offset-4">Iphone 15</td>
								<td className="text-center text-primary">Mar 15. 2024</td>
								<td className="text-center text-green-500">Active</td>
								<td className="text-center ">₦ 250k</td>
							</tr>
							<tr className="font-medium whitespace-nowrap hover:bg-gray-200">
								<td className="capitalize hover:underline hover:underline-offset-4">Toyota Corolla</td>
								<td className="text-center text-primary">Mar 25. 2024</td>
								<td className="text-center text-red-500">Sold</td>
								<td className="text-center ">₦ 250k</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<div className="my-8 space-y-4">
				<div>
					<h4>Grab Activities Summary</h4>
					<p>Monitor this chat regularly to make informed decisions</p>
				</div>

				<div className="overflow-x-auto bg-white border mt-4a border-black/40 max-h-96">
					<table className="table table-pin-rows ">
						<thead className="text-sm font-medium border-none">
							<tr className="text-black bg-gray-200">
								<th>Categories</th>
								<th className="text-center">Grabs</th>
								<th className="text-center">Active</th>
								<th className="text-center">Closed</th>
							</tr>
						</thead>
						<tbody>
							<tr className="font-medium whitespace-nowrap hover:bg-gray-200">
								<td className="capitalize hover:underline hover:underline-offset-4">Cars & Veh.</td>
								<td className="text-center text-primary">[30]</td>
								<td className="text-center text-primary">[12]</td>
								<td className="text-center text-primary">[8]</td>
							</tr>
							<tr className="font-medium whitespace-nowrap hover:bg-gray-200">
								<td className="capitalize hover:underline hover:underline-offset-4">Cars & Veh.</td>
								<td className="text-center text-primary">[30]</td>
								<td className="text-center text-primary">[12]</td>
								<td className="text-center text-primary">[8]</td>
							</tr>
							<tr className="font-medium whitespace-nowrap hover:bg-gray-200">
								<td className="capitalize hover:underline hover:underline-offset-4">Cars & Veh.</td>
								<td className="text-center text-primary">[30]</td>
								<td className="text-center text-primary">[12]</td>
								<td className="text-center text-primary">[8]</td>
							</tr>
							<tr className="font-medium whitespace-nowrap hover:bg-gray-200">
								<td className="capitalize hover:underline hover:underline-offset-4">Cars & Veh.</td>
								<td className="text-center text-primary">[30]</td>
								<td className="text-center text-primary">[12]</td>
								<td className="text-center text-primary">[8]</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			{/* recent activities */}

			<div className="flex flex-col my-6 space-y-2 w-fit">
				<h4>Recent Activities</h4>

				<div className="px-4 py-6 bg-gray-200 rounded-lg w-fit ">
					<ul className="flex flex-col gap-4">
						<li className="flex items-start gap-3">
							<img src={GrabIcon} className="w-[2.5rem]" alt="" />
							<div>
								<p className="p-lg">5 Items grabbed</p>
								<span className="text-sm font-light">06/06/2024</span>
							</div>
						</li>
						<li className="flex items-start gap-3">
							<img src={GrabIcon} className="w-[2.5rem]" alt="" />
							<div>
								<p className="p-lg">2 purchases from link</p>
								<span className="text-sm font-light">07/06/2024</span>
							</div>
						</li>
						<li className="flex items-start gap-3">
							<img src={InspectionTick} className="w-[2.5rem]" alt="" />
							<div>
								<p className="p-lg">4 Inspections booked</p>
								<span className="text-sm font-light">17/07/2024</span>
							</div>
						</li>
						<li className="flex items-start gap-3">
							<img src={New} className="w-[2.5rem]" alt="" />
							<div>
								<p className="p-lg">New listing available.</p>
								<span className="text-sm font-light">17/07/2024</span>
							</div>
						</li>
					</ul>
				</div>
			</div>

			<GrabMobileSidebar sidebar={showSidebar} setSidebar={setShowSidebar} />
			<ScrollToTop />
		</section>
	);
};

export default GrabDashboard;
