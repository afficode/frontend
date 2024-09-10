import { BiArrowBack } from 'react-icons/bi';
import { ArrowDownWhite } from '../../assets/svgs';
import { Button } from '../../ui';

const AccountHistory = ({ className, setIsOpen, isOpen }) => {
	return (
		<div tabIndex={0} className={`${className} overflow-auto`}>
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

			<div className="flex items-center justify-center max-sm:px-1 first-letter relative">
				<BiArrowBack className="absolute left-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
				<h4 className="py-4 items-center ">Account History</h4>
			</div>

			<div>
				<div className="flex items-center justify-between px-2 sm:px-6 py-2 bg-primary">
					<button className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-white">
						All Transactions <img src={ArrowDownWhite} className="w-2 sm:w-3" alt="/" />
					</button>
					<button className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-white">
						All Status <img src={ArrowDownWhite} className="w-2 sm:w-3" alt="/" />
					</button>
					<button className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-white">
						All Date <img src={ArrowDownWhite} className="w-2 sm:w-3" alt="/" />
					</button>
				</div>

				<div className="space-y-8">
					<div className="space-y-2">
						<h6 className="py-2 text-center border-b border-b/5">May, 2024</h6>
						<Pallet title={'Grab Commission'} />
						<Pallet title={'Withdrawn'} />
						<Pallet title={'Deposited'} />
					</div>
					<div className="space-y-2">
						<h6 className="py-2 text-center border-b border-b/5">Apr, 2024</h6>
						<Pallet title={'Grab Commission'} />
						<Pallet title={'Withdrawn'} />
						<Pallet title={'Token Purchase'} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountHistory;

const Pallet = ({ title }) => {
	return (
		<div className="px-4 pb-4 space-y-2 border-b border-b/5">
			<div className="flex items-center justify-between">
				<h4 className="max-sm:hidden ">{title}</h4>
				<h5 className="sm:hidden font-bold">{title}</h5>

				<p>Amount</p>
			</div>

			<div className="flex items-end justify-between">
				<div className="flex flex-col ">
					<p>Toyota Corolla 2022</p>
					<p className="text-black/50 truncate max-w-[10rem] md:max-w-[15rem]">
						34234243438495858785090...
					</p>
					<p>22.05.2024</p>
				</div>

				<span
					className={`px-3 py-1 sm:px-4 sm:py-2 max-sm:text-sm text-white whitespace-nowrap ${
						title === 'Grab Commission'
							? 'bg-green-600'
							: title === 'Withdrawn'
							? 'bg-red-600'
							: title === 'Deposited'
							? 'bg-blue-600'
							: 'bg-yellow-600'
					}`}
				>
					₦ 3,000.oo
				</span>
			</div>
		</div>
	);
};
