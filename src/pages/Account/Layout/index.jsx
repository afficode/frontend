import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '../../../ui';
import { Approutes } from '../../../constants';
// import { useAccountBalance } from '../../../hooks';
import { toMoney } from '../../../utils';
import { useAccountBalance } from '../../../hooks';

const AccountLayout = () => {
	const location = useLocation();

	// localStorage.setItem('account-balance', data?.account.balance);
	const balance = useAccountBalance();
	// console.log(balance);

	return (
		<div className="min-h-screen p-8">
			<h2>My Account</h2>
			<h6 className="font-light">
				Balance: <b className="font-bold">₦ {toMoney(balance)}</b>
			</h6>
			<div className="flex max-md:justify-between sm:gap-6 items-center max-w-sm my-6">
				<Link to={Approutes.account.initial}>
					<Button
						type="button"
						variant={location.pathname === '/my-account/' ? 'primary' : 'grey'}
						size={'small'}
						className={'w-full whitespace-nowrap max-md:!px-2 max-md:text-sm'}
					>
						Transaction History
					</Button>
				</Link>
				<Link to={Approutes.account.deposit}>
					<Button
						type="button"
						variant={location.pathname === '/my-account/deposit' ? 'primary' : 'grey'}
						size={'small'}
						className={'w-full max-md:!px-2 max-md:text-sm'}
					>
						Deposit
					</Button>
				</Link>
				<Link to={Approutes.account.withdraw}>
					<Button
						type="button"
						variant={location.pathname === '/my-account/withdraw' ? 'primary' : 'grey'}
						size={'small'}
						className={'w-full max-md:!px-2 max-md:text-sm'}
					>
						Withdraw
					</Button>
				</Link>
			</div>
			<hr className="my-8" />

			<Outlet />
		</div>
	);
};

export default AccountLayout;
