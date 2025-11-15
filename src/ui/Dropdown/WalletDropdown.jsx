import { Coin, NigFlag } from '../../assets/images';
import Button from '../Button';
import { BiSolidDownArrow } from 'react-icons/bi';
import { Approutes } from '../../constants';
import { Link, useNavigate } from 'react-router-dom';
import { toMoney } from '../../utils';
import { useAccountBalance, useTotalCoin } from '../../hooks';
import useAuth from '../../context/UserContext';
import { useMemo, useState } from 'react';
import { TokenPurchase } from '../../components';
import { Naira, Naira2, ViewTransaction, WalletIcon } from '../../assets/svgs';

const WalletDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const { data: token } = useTotalCoin();
	const bal = useAccountBalance();
	const balance = useMemo(() => {
		return bal;
	}, [bal]);

	const { user } = useAuth();

	return (
		<div
			tabIndex={0}
			className={`dropdown-content w-[350px] sm:w-[600px] lg:w-[960px] right-[-120px] sm:right-[-180px] md:right-[-240px]  z-10 py-2 sm:py-4 lg:py-6   bg-white shadow-md rounded-md`}
		>
			<div className="px-6 sm:px-8 pt-2 lg:pb-4 mb-4 text-black">
				<div className="flex items-center justify-between mt-2">
					<h3>Hi, {user && user?.firstname}!</h3>

					<h3>Wallet</h3>
				</div>
			</div>

			<div className="flex justify-between flex-wrap gap-4 px-6 sm:px-8">
				<div className="flex flex-col gap-1">
					<span>Available Balance</span>
					<h6 className="flex items-center gap-1 font-bold">
						<img src={Naira} alt="Naira" />
						{toMoney(balance, false)}
					</h6>
				</div>
				<div className="flex flex-col gap-1">
					<span>Locked-in Balance</span>
					<div className="py-1 px-2 bg-red-600">
						<h6 className="flex items-center gap-1 font-bold text-white">
							<Naira2 />
							{toMoney(balance, false)}
						</h6>
					</div>
				</div>

				<div className="flex items-center justify-between gap-2  ">
					<Button
						variant={'plain'}
						className={
							'border border-1 !shadow-sm text-black rounded-xl  font-semibold max-sm:text-sm whitespace-nowrap max-sm:px-1'
						}
						size={'full'}
						onClick={() => navigate(Approutes.account.withdraw)}
					>
						Withdraw
					</Button>
					<Button
						variant={'grey'}
						className={
							'rounded-xl !shadow-sm bg-black text-white font-semibold max-sm:text-sm whitespace-nowrap max-sm:px-1'
						}
						size={'full'}
						onClick={() => navigate(Approutes.account.deposit)}
					>
						Fund Wallet
					</Button>
				</div>
			</div>

			<hr className="my-4" />

			<div className="px-6 sm:px-8 pt-2 lg:pb-4 mb-4 flex flex-col gap-4">
				<h4>Quick Actions</h4>

				<div className="flex items-center justify-between">
					<button className="flex items-center gap-1  text-sm">
						<ViewTransaction className="w-4 h-4" />
						View Transaction History
					</button>

					<button className="flex items-center gap-1  text-sm">
						<WalletIcon className="w-4 h-4" />
						Manage Payment Methods
					</button>
				</div>
			</div>
		</div>
	);
};

export default WalletDropdown;
