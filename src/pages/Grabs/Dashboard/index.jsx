import { useState } from 'react';
import { Button, Modal } from '../../../ui';
import { GrabIcon, InspectionTick, New } from '../../../assets/svgs';
import { MdArrowDropDown } from 'react-icons/md';
import { BiDownArrow, BiSolidDownArrow } from 'react-icons/bi';
import { Coin, NigFlag } from '../../../assets/images';
import { GrabMobileSidebar } from '../../../layout';
import { IoIosMenu } from 'react-icons/io';
import { AccountHistory } from '../../../components';
import { ScrollToTop } from '../../../utils';

const GrabDashboard = () => {
	const [showSidebar, setShowSidebar] = useState(false);
	const [walletOpen, setWalletOpen] = useState(false);

	return (
		<section className="w-full">
			<div className="bg-primary ">
				<div className="px-4 pt-2 pb-4 mb-4 text-white">
					<button className="flex items-center gap-2 mx-auto ">
						<img src={NigFlag} alt="nigeria flag" className="w-4" />
						<span>NG Naira</span>
						<BiSolidDownArrow size={12} />
					</button>

					<div className="flex items-center justify-between">
						<h4>Hi, Akindele!</h4>
						<button onClick={() => setShowSidebar(!showSidebar)} className=" lg:hidden">
							<IoIosMenu size={28} />
						</button>
					</div>
				</div>

				<div className="flex justify-between divide-x-2 divide-white max-lg:flex-col ">
					<div className="flex-1 ">
						<div className="flex items-center justify-between gap-1 p-2 bg-black/30 h-14">
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
								onClick={() => setWalletOpen(!walletOpen)}
							>
								Account History
							</Button>
							<Modal modalHeader={false} isOpen={walletOpen} setIsOpen={setWalletOpen}>
								<AccountHistory />
							</Modal>
						</div>

						<div className="lg:mt-[4.22rem] mt-6 pb-3 flex flex-col px-4">
							<span className="mb-2 text-white/70">Total Balance</span>
							<span className="text-lg font-semibold text-white sm:text-xl">
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
						<div className="flex items-center justify-center bg-black/30 h-14">
							<h6 className="text-white">Coin Wallet</h6>
						</div>

						<img src={Coin} className="w-16 pt-2 mx-auto" alt="/" />

						<div className="flex justify-between px-8">
							<div className="flex flex-col items-center">
								<span className="mb-2 text-white/70 ">Total coin(s)</span>
								<span className="text-lg font-semibold text-white sm:text-xl">0.50</span>
							</div>

							<div className="flex flex-col items-center">
								<span className="mb-2 text-white/70 ">Usable coin(s)</span>
								<span className="text-lg font-semibold text-white sm:text-xl">0.00</span>
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

				<div className="mt-4 overflow-x-auto bg-white border  border-black/40 max-h-96">
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

				<div className="overflow-x-auto bg-white border  mt-4a border-black/40 max-h-96">
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
