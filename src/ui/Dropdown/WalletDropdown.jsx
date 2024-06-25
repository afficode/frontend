import React, { useState } from 'react';
import { Coin, NigFlag } from '../../assets/images';
import Button from '../Button';
import { AccountHistory } from '../../components';
import Modal from '../Modal';
import { IoIosMenu } from 'react-icons/io';
import { BiSolidDownArrow } from 'react-icons/bi';

const WalletDropdown = () => {
	const [walletOpen, setWalletOpen] = useState(false);
	return (
		<div
			tabIndex={0}
			className={`dropdown-content border border-gray-400 w-[350px] sm:w-[640px] lg:w-[1024px] right-[-220px] sm:right-[-290px]  z-10 p-2 sm:p-4 lg:py-6   bg-primary shadow-md rounded-md`}
		>
			<div className="px-4 pt-2 lg:pb-4 mb-4 text-white">
				<button className="flex items-center gap-2 mx-auto ">
					<img src={NigFlag} alt="nigeria flag" className="w-4" />
					<span>NG Naira</span>
					<BiSolidDownArrow size={12} />
				</button>

				<div className="flex items-center justify-between mt-2">
					<h4>Hi, Akindele!</h4>
					<button onClick={() => setShowSidebar(!showSidebar)} className=" lg:hidden">
						<IoIosMenu size={28} />
					</button>
				</div>
			</div>

			<div className="flex justify-between lg:divide-x-2 lg:divide-white max-lg:flex-col ">
				<div className="flex-1 ">
					<div className="flex items-center justify-between gap-1 p-2 bg-black/30 h-14">
						<Button
							variant={'plain'}
							className={
								'rounded-xl text-primary font-semibold max-sm:text-sm whitespace-nowrap max-sm:px-1'
							}
							size={'full'}
						>
							Account
						</Button>
						<Button
							variant={'grey'}
							className={'rounded-xl font-semibold max-sm:text-sm whitespace-nowrap max-sm:px-1'}
							size={'full'}
							onClick={() => setWalletOpen(!walletOpen)}
						>
							Account History
						</Button>
						<Modal modalHeader={false} isOpen={walletOpen} setIsOpen={setWalletOpen}>
							<AccountHistory />
						</Modal>
					</div>

					<div className="lg:mt-[4.22rem] mt-3 pb-3 flex flex-col px-4">
						<span className="mb-2 text-white/70">Total Balance</span>
						<span className="text-lg font-semibold text-white sm:text-xl">
							₦ 2,300,000<span className="text-sm">.00</span>
						</span>
					</div>

					<div className="flex items-center gap-4 px-4 mt-2 mb-4 lg:my-6">
						<Button className={'bg-green-400 text-white px-6 py-2'}>Withdraw</Button>
						<Button variant={'secondary'} size={'small'} className={'border-none'}>
							Deposit
						</Button>
					</div>
				</div>

				<div className="flex-1">
					<div className="flex items-center justify-center bg-black/30 lg:h-14">
						<h6 className="text-white max-lg:p-2">Coin Wallet</h6>
					</div>

					<img src={Coin} className="lg:w-16 w-12  pt-2 mx-auto" alt="/" />

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

					<div className="text-center mt-4 lg:mt-[2.25rem] max-lg:mb-2">
						<Button variant={'secondary'} size={'small'} className={'border-none '}>
							Top Up
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WalletDropdown;
