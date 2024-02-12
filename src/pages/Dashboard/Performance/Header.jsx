import { useState, useEffect } from 'react';
import DateView from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '../../../ui';
import { Link } from 'react-router-dom';
import { Approutes } from '../../../constants';
import { useSearchParams } from 'react-router-dom';
import { sub } from 'date-fns';

const Header = () => {
	const [filteredDate, setFilteredDate] = useState('all');
	const [date, setDate] = useState();

	useEffect(() => {
		console.log(filteredDate);
		let result = '';
		if (filteredDate === '12 months') {
			result = sub(Date.now(), {
				months: 12,
			});
		} else if (filteredDate === '30 days') {
			result = sub(Date.now(), {
				days: 30,
			});
		} else if (filteredDate === '7 days') {
			result = sub(Date.now(), {
				days: 7,
			});
		} else if (filteredDate === '24 hours') {
			result = sub(Date.now(), {
				days: 1,
			});
		}

		try {
		} catch (error) {}

		console.log(result);
	}, [filteredDate]);

	return (
		<div className="flex flex-col w-full gap-4 px-2 py-4 my-2 bg-gray-200 sm:px-6">
			<div className="flex items-center gap-4 ml-auto max-sm:flex-col">
				<DateView
					placeholderText="Select dates"
					className="border-transparent shadow-lg rounded-md w-[10rem]"
					selected={date}
					onChange={(val) => setDate(val)}
				/>
				<Link to={Approutes.postDecision}>
					<Button variant="primary" size="small" className="font-medium rounded-md">
						+ Add Product
					</Button>
				</Link>
			</div>

			<div className="flex flex-wrap gap-2 ">
				<span
					onClick={() => setFilteredDate('all')}
					className={`${
						filteredDate === 'all'
							? 'bg-primary text-white border-transparent'
							: 'bg-white text-black/50 border border-black/40'
					} cursor-pointer py-[.5rem] px-6 rounded-md font-semibold max-sm:text-sm`}
				>
					All dates
				</span>
				<span
					onClick={() => setFilteredDate('12 months')}
					className={`${
						filteredDate === '12 months'
							? 'bg-primary text-white border-transparent'
							: 'bg-white text-black/50 border border-black/40'
					} cursor-pointer py-[.5rem] px-6 rounded-md font-semibold max-sm:text-sm `}
				>
					12 months{' '}
				</span>
				<span
					onClick={() => setFilteredDate('30 days')}
					className={`${
						filteredDate === '30 days'
							? 'bg-primary text-white border-transparent'
							: 'bg-white text-black/50 border border-black/40'
					} cursor-pointer py-[.5rem] px-6 rounded-md font-semibold max-sm:text-sm `}
				>
					30 days
				</span>
				<span
					onClick={() => setFilteredDate('7 days')}
					className={`${
						filteredDate === '7 days'
							? 'bg-primary text-white border-transparent'
							: 'bg-white text-black/50 border border-black/40'
					} cursor-pointer py-[.5rem] px-6 rounded-md font-semibold max-sm:text-sm `}
				>
					7 days
				</span>
				<span
					onClick={() => setFilteredDate('24 hours')}
					className={`${
						filteredDate === '24 hours'
							? 'bg-primary text-white border-transparent'
							: 'bg-white text-black/50 border border-black/40'
					} cursor-pointer py-[.5rem] px-6 rounded-md font-semibold max-sm:text-sm `}
				>
					24-hours
				</span>
			</div>
		</div>
	);
};

export default Header;
