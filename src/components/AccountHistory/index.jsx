import { ArrowDownWhite } from '../../assets/svgs';
import { Button } from '../../ui';
import { useTransactions } from '../../hooks';
import { format } from 'date-fns';
import { toMoney } from '../../utils';
import { useLocation, useSearchParams } from 'react-router-dom';
import DateView from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';

const AccountHistory = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [dateRange, setDateRange] = useState([null, null]);
	const [from, to] = dateRange;

	const transactionType = searchParams.get('type') || 'all';
	const status = searchParams.get('status');
	const fromDate = searchParams.get('from');
	const toDate = searchParams.get('to');
	const page = searchParams.get('p') || 1;

	const updateParams = (key, value) => {
		const newParams = new URLSearchParams(searchParams);
		if (value === 'all' || !value) {
			newParams.delete(key);
		} else {
			newParams.set(key, value);
		}
		setSearchParams(newParams);
	};

	const onChangeDate = (update) => {
		setDateRange(update);

		const newParams = new URLSearchParams(searchParams);
		if (update[0] && update[1]) {
			newParams.set('from', formatToISO(update[0]));
			newParams.set('to', formatToISO(update[1]));
		} else if (!update[0] && !update[1]) {
			newParams.delete('from');
			newParams.delete('to');
		}

		setSearchParams(newParams);
	};

	const formatToISO = (date) => {
		return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
			.toISOString()
			.split('T')[0];
	};

	const db_option = [];
	if (transactionType && transactionType !== 'all') {
		db_option.push(transactionType);
	}

	const params = {
		db_options: db_option.length > 0 ? db_option : [],
		from: toDate || undefined,
		to: fromDate || undefined,
		page_size: 5,
		page: page,
		status: status,
	};

	const { data, isLoading } = useTransactions(params);

	const groupByMonth = (data) => {
		const sortedData = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

		return sortedData.reduce((acc, transaction) => {
			const date = new Date(transaction.created_at);
			const month = date.toLocaleString('default', { month: 'long' });
			const year = date.getFullYear();
			const monthYear = `${month}, ${year}`;

			if (!acc[monthYear]) {
				acc[monthYear] = [];
			}
			acc[monthYear].push(transaction);

			return acc;
		}, {});
	};

	const groupedTransactions = groupByMonth(data?.data || []);

	const { hash } = useLocation();

	useEffect(() => {
		if (hash) {
			const element = document.querySelector(hash);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}
	}, [hash]);

	return (
		<div tabIndex={0}>
			<div className="flex max-sm:flex-col items-center justify-between gap-4 px-4 py-2 mx-1 text-white items-centre bg-primary rounded-t-xl">
				<p className="max-sm:text-center">Become a Grabber and start earning, Today.</p>
				<Button
					variant={'plain'}
					size={'small'}
					className={'whitespace-nowrap max-sm:text-xs font-semibold'}
				>
					Join now
				</Button>
			</div>

			<div
				id="account-history"
				className="flex items-center justify-center max-sm:px-1 first-letter relative"
			>
				<h4 className="py-4 items-center ">Account History</h4>
			</div>

			<div>
				<div className="flex items-center justify-between px-2 sm:px-6 py-2 bg-primary">
					<div className="dropdown ">
						<button
							tabIndex={0}
							className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm  capitalize text-white"
						>
							{transactionType === 'all' ? 'All Transaction' : transactionType}{' '}
							<img src={ArrowDownWhite} className="w-2 sm:w-3" alt="arrow down" />
						</button>
						<ul
							tabIndex={0}
							className="dropdown-content menu z-[10] p-4 shadow bg-white rounded-box w-[10rem] space-y-2"
						>
							<li
								onClick={() => updateParams('type', 'deposit')}
								className="cursor-pointer font-medium hover:text-primary"
							>
								Deposit
							</li>
							<li
								onClick={() => updateParams('type', 'withdrawals')}
								className="cursor-pointer font-medium hover:text-primary"
							>
								Withdrawals
							</li>
							<li
								onClick={() => updateParams('type', 'all')}
								className="cursor-pointer font-medium hover:text-primary whitespace-nowrap"
							>
								All Transactions
							</li>
						</ul>
					</div>
					<div className="dropdown ">
						<button
							tabIndex={0}
							className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm capitalize text-white"
						>
							{status === null ? 'All Status' : status}{' '}
							<img src={ArrowDownWhite} className="w-2 sm:w-3" alt="arrow down" />
						</button>
						<ul
							tabIndex={0}
							className="dropdown-content menu z-[10] p-4 shadow bg-white rounded-box w-32 space-y-2"
						>
							<li
								onClick={() => updateParams('status', 'all')}
								className="cursor-pointer font-medium hover:text-primary"
							>
								All Status
							</li>
							<li
								onClick={() => updateParams('status', 'success')}
								className="cursor-pointer font-medium hover:text-primary"
							>
								Success
							</li>
							<li
								onClick={() => updateParams('status', 'pending')}
								className="cursor-pointer font-medium hover:text-primary"
							>
								Pending
							</li>
							<li
								onClick={() => updateParams('status', 'failed')}
								className="cursor-pointer font-medium hover:text-primary"
							>
								Failed
							</li>
						</ul>
					</div>

					<div className="dropdown dropdown-left">
						<button className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-white">
							{from && to ? `${params.to} - ${params.from}` : 'All Date'}{' '}
							<img src={ArrowDownWhite} className="w-2 sm:w-3" alt="arrow down" />
						</button>

						<div className="dropdown-content ">
							<DateView
								selectsRange={true}
								startDate={from}
								endDate={to}
								onChange={onChangeDate}
								dateFormat={'yyyy-MM-dd'}
								isClearable={true}
								placeholderText="All date"
							/>
						</div>
					</div>
				</div>

				{isLoading ? (
					<LoadingScreen />
				) : (
					<div className="space-y-8">
						{Object.entries(groupedTransactions).map(([monthYear, transactions]) => (
							<div className="space-y-2" key={monthYear}>
								<h6 className="py-2 text-center border-b border-b/5 text-xs">{monthYear}</h6>

								{transactions.map((transaction) => (
									<Pallet
										key={transaction.id}
										title={transaction.type}
										channel={transaction.channel}
										amount={transaction.amount}
										referenceId={transaction.reference_id}
										date={transaction.created_at}
									/>
								))}
							</div>
						))}
					</div>
				)}
				<div className="flex items-center justify-center mt-6">
					<div className="join">
						<button
							onClick={() => updateParams('p', data?.prev)}
							disabled={data?.prev === null}
							className="join-item btn bg-primary disabled:bg-gray-300 border-none"
						>
							«
						</button>
						<div className="px-4 text-primary text-sm font-bold flex items-center justify-center">
							Page {data?.page} of {data?.total_page}
						</div>
						<button
							onClick={() => updateParams('p', data?.next)}
							disabled={data?.next === null}
							className="disabled:bg-gray-300 bg-primary join-item btn border-none"
						>
							»
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountHistory;

const Pallet = ({ title, channel, amount, referenceId, date }) => {
	return (
		<div className="px-4 pb-4 space-y-2 border-b border-b/5">
			<div className="flex items-center justify-between">
				<h6 className=" font-semibold capitalize">
					{title.split('_').join(' ')}{' '}
					<span className="text-xs font-medium bg-gray-400 px-2 rounded-md text-white py-1">
						{channel.split('_').join(' ')}
					</span>
				</h6>

				<p>Amount</p>
			</div>

			<div className="flex items-end justify-between">
				<div className="flex flex-col ">
					<p className="text-black/50 truncate max-w-[10rem] md:max-w-[15rem]">
						{referenceId === 'null' ? '' : referenceId}
					</p>
					<p className="max-sm:text-xs">{format(new Date(date), 'EEEE d, MMMM yyyy')}</p>
				</div>

				<span
					className={`px-2 py-1 text-sm text-white whitespace-nowrap ${
						title === 'deposit' ? 'bg-green-600' : title === 'withdrawal' ? 'bg-red-600' : 'bg-red-600'
					}`}
				>
					₦{toMoney(amount)}
				</span>
			</div>
		</div>
	);
};
