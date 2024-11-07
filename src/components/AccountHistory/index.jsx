import { BiArrowBack } from 'react-icons/bi';
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

const AccountHistory = ({ className, setIsOpen, isOpen }) => {
	// Initialize URL search params
	const [searchParams, setSearchParams] = useSearchParams();

	const [dateRange, setDateRange] = useState([null, null]); // [from, to]
	const [from, to] = dateRange; // Destructure dateRange for easier access

	// Get filters from URL parameters or set defaults
	const transactionType = searchParams.get('type') || 'all'; // default: 'all'
	const status = searchParams.get('status') || 'all'; // default: 'all'
	const fromDate = searchParams.get('from');
	const toDate = searchParams.get('to');
	const page = searchParams.get('p') || 1; // default: 1

	// Function to update URL params when a transaction type and status filter is changed
	const updateParams = (key, value) => {
		const newParams = new URLSearchParams(searchParams);
		if (value === 'all' || !value) {
			newParams.delete(key); // Remove param if 'all' or empty
		} else {
			newParams.set(key, value); // Update param with new value
		}
		setSearchParams(newParams); // Update the URL
	};

	const onChangeDate = (update) => {
		setDateRange(update);

		// Update URL params when both dates are selected
		const newParams = new URLSearchParams(searchParams);
		if (update[0] && update[1]) {
			// If both dates are selected, set 'from' and 'to'
			newParams.set('from', formatToISO(update[0])); // Format to YYYY-MM-DD
			newParams.set('to', formatToISO(update[1]));
		} else if (!update[0] && !update[1]) {
			// If cleared, remove both 'from' and 'to'
			newParams.delete('from');
			newParams.delete('to');
		}

		setSearchParams(newParams);
	};

	// Helper function to format date to YYYY-MM-DD
	const formatToISO = (date) => {
		// Use UTC to avoid timezone issues
		return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
			.toISOString()
			.split('T')[0];
	};

	// Prepare the `db_option` array
	const db_option = [];
	if (transactionType && transactionType !== 'all') {
		db_option.push(transactionType);
	}
	if (status && status !== 'all') {
		db_option.push(status);
	}
	// console.log(db_option);

	// Combine URL parameters into the params object for querying the backend
	const params = {
		db_option: db_option.length > 0 ? db_option : undefined, // Include only if non-empty
		from: toDate || undefined,
		to: fromDate || undefined,
		page_size: 5,
		page: page,
	};

	// console.log(params);

	const { data, isLoading } = useTransactions(params);

	// console.log(data);

	const groupByMonth = (data) => {
		// Sort the transactions by date in descending order (latest date first)
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

	// console.log(groupedTransactions);

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
		<div tabIndex={0} className={`${className} `}>
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
				<BiArrowBack className="absolute left-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
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
							<img src={ArrowDownWhite} className="w-2 sm:w-3" alt="/" />
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
								onClick={() => updateParams('type', 'withdrawal')}
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
							{status === 'all' ? 'All Status' : status}{' '}
							<img src={ArrowDownWhite} className="w-2 sm:w-3" alt="/" />
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
								onClick={() => updateParams('status', 'completed')}
								className="cursor-pointer font-medium hover:text-primary"
							>
								Completed
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
							<img src={ArrowDownWhite} className="w-2 sm:w-3" alt="/" />
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
								<h6 className="py-2 text-center border-b border-b/5">{monthYear}</h6>

								{transactions.map((transaction) => (
									<Pallet
										key={transaction.id}
										title={
											transaction.channel === 'bank' || transaction.channel === 'card'
												? 'Deposit'
												: transaction.type === 'coin_purchase'
												? transaction.type
												: 'Withdrawal'
										}
										amount={transaction.amount}
										status={transaction.status}
										referenceId={transaction.reference_id}
										date={transaction.created_at}
									/>
								))}
							</div>
						))}
						{/* <Pallet title={'Withdrawn'} />
					<Pallet title={'Deposited'} /> */}
						{/* <div className="space-y-2">
					<h6 className="py-2 text-center border-b border-b/5">Apr, 2024</h6>
					<Pallet title={'Grab Commission'} />
					<Pallet title={'Withdrawn'} />
					<Pallet title={'Token Purchase'} />
				</div> */}
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
						<div className="px-4 text-primary text-lg font-bold flex items-center justify-center">
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
					{/* <div className="join">
						{Array.from({ length: data?.total_page }).map((_, i) => (
							<button
								key={i}
								onClick={() => updateParams('p', i + 1)}
								className="join-item btn bg-primary "
							>
								{i + 1}
							</button>
						))}
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default AccountHistory;

const Pallet = ({ title, amount, referenceId, date, status }) => {
	return (
		<div className="px-4 pb-4 space-y-2 border-b border-b/5">
			<div className="flex items-center justify-between">
				<h4 className="max-sm:hidden capitalize">{title.split('_').join(' ')}</h4>
				<h5 className="sm:hidden font-bold capitalize">{title}</h5>

				<p>Amount</p>
			</div>

			<div className="flex items-end justify-between">
				<div className="flex flex-col ">
					{/* <p>Toyota Corolla 2022</p> */}
					<p className="text-black/50 truncate max-w-[10rem] md:max-w-[15rem]">{referenceId}</p>
					<p>{format(new Date(date), 'dd.MM.yyyy')}</p>
				</div>

				<span
					className={`px-3 py-1 sm:px-4 sm:py-2 max-sm:text-sm text-white whitespace-nowrap ${
						status === 'completed' || status === 'success'
							? 'bg-green-600'
							: status === 'failed'
							? 'bg-red-600'
							: status === 'pending'
							? 'bg-blue-600'
							: 'bg-yellow-600'
					}`}
				>
					₦{toMoney(amount)}
				</span>
			</div>
		</div>
	);
};
