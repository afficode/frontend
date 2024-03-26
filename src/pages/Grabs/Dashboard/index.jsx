import React from 'react';
import { Button } from '../../../ui';
import { Coin } from '../../../assets/svgs';
import { MdArrowDropDown } from 'react-icons/md';
import { BiDownArrow, BiSolidDownArrow } from 'react-icons/bi';
import { NigFlag } from '../../../assets/images';

const GrabDashboard = () => {
	return (
		<section>
			<div className="bg-primary ">
				<div className="pt-2 pb-4 px-4 mb-4 text-white">
					<button className="flex items-center mx-auto gap-2 ">
						<img src={NigFlag} alt="nigeria flag" className="w-4" />
						<span>NG Naira</span>
						<BiSolidDownArrow size={12} />
					</button>

					<h4>Hi, Akindele!</h4>
				</div>

				<div className="flex max-lg:flex-col justify-between divide-x-2 divide-white ">
					<div className="flex-1 ">
						<div className="flex items-center justify-between gap-1 bg-black/30 h-14 p-2">
							<Button
								variant={'plain'}
								className={'rounded-xl text-primary font-semibold max-sm:text-sm whitespace-nowrap'}
								size={'full'}
							>
								Account
							</Button>
							<Button
								variant={'grey'}
								className={'rounded-xl font-semibold max-sm:text-sm whitespace-nowrap'}
								size={'full'}
							>
								Account History
							</Button>
						</div>

						<div className="lg:mt-[4.22rem] mt-6 pb-3 flex flex-col px-4">
							<span className="text-white/70 mb-2">Total earning</span>
							<span className="text-lg sm:text-xl font-semibold  text-white">
								₦ 2,300,000<span className="text-sm">.00</span>
							</span>
						</div>

						<div className="flex items-center gap-4 px-4 my-6">
							<Button className={'bg-green-400 text-white px-6 py-2'}>Withdraw</Button>
							<Button variant={'secondary'} size={'small'} className={'border-none'}>
								Deposit
							</Button>
						</div>
					</div>

					<div className="flex-1">
						<div className="bg-black/30 h-14 flex items-center justify-center">
							<h6 className="text-white">Coin Wallet</h6>
						</div>

						<img src={Coin} className="w-32 pt-2 mx-auto" alt="/" />

						<div className="flex justify-between px-8">
							<div className="flex flex-col items-center">
								<span className="text-white/70 mb-2 ">Total coin(s)</span>
								<span className="text-lg sm:text-xl font-semibold text-white">0.50</span>
							</div>

							<div className="flex flex-col items-center">
								<span className="text-white/70 mb-2 ">Usable coin(s)</span>
								<span className="text-lg sm:text-xl font-semibold text-white">0.00</span>
							</div>
						</div>

						<div className="text-center mt-[2.25rem] max-lg:mb-6">
							<Button variant={'secondary'} size={'small'} className={'border-none '}>
								Top Up
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="flex items-center justify-between gap-6 flex-wrap bg-gray-300 my-8 p-4 rounded-xl">
				<div className="bg-red-500 p-4 flex-1 text-center whitespace-nowrap space-y-3 text-white">
					<h4>Total Grabs</h4>
					<h4>[200]</h4>
				</div>
				<div className="bg-secondary p-4 flex-1 text-center whitespace-nowrap space-y-3">
					<h4>Sales from link</h4>
					<h4>[20]</h4>
				</div>
				<div className="bg-green-400 p-4 flex-1 text-center whitespace-nowrap space-y-3 text-white">
					<h4>Pageviews via link</h4>
					<h4>[1,200]</h4>
				</div>
			</div>

			{/* Grabs by category chart here  */}

			<div className="space-y-4 my-8">
				<h4>Grab Activities Chart</h4>

				<div className=" mt-4a overflow-x-auto border border-black/40 max-h-96 bg-white">
					<table className="table table-pin-rows ">
						<thead className="text-sm font-medium border-none">
							<tr className="bg-gray-200 text-black">
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

			<div className="space-y-4 my-8">
				<div>
					<h4>Grab Activities Summary</h4>
					<p>Monitor this chat regularly to make informed decisions</p>
				</div>

				<div className=" mt-4a overflow-x-auto border border-black/40 max-h-96 bg-white">
					<table className="table table-pin-rows ">
						<thead className="text-sm font-medium border-none">
							<tr className="bg-gray-200 text-black">
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

			<div>
				<h4>Recent Activities</h4>

				<div className="bg-gray-200 p-4 rounded-lg">
					<ul className="flex flex-col"></ul>
				</div>
			</div>
		</section>
	);
};

export default GrabDashboard;
