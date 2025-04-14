import { useRef, useState } from 'react';
import { ArrowRightBlue } from '../../../../assets/svgs';
import { Modal } from '../../../../ui';
import { TermsAndCondition } from '../../../../components';
import { toMoney } from '../../../../utils';
import { format, parseISO } from 'date-fns';

const Details = ({ data }) => {
	const [isOpen, setIsOpen] = useState(false);
	const returnRef = useRef(null);

	console.log(data);

	const handleScrollTo = (ref) => {
		if (!isOpen) {
			setIsOpen(true);
			setTimeout(() => {
				ref.current.scrollIntoView({ behavior: 'smooth' });
			}, 1000); // Add a delay to ensure the component is rendered before scrolling
		} else {
			ref.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<div className="max-w-[720px] mx-auto space-y-4 px-4">
			<h4>Details of your order</h4>
			<div className="flex items-start gap-6 border-b border-black/50 pb-4 max-md:flex-col max-md:items-center">
				<div className="border border-black/50 rounded-xl w-[372px] h-[260px] p-2">
					<img
						src={data?.images ? data?.images[0] : ''}
						alt={data.title}
						className="object-contain w-full h-full"
					/>
				</div>

				<div className="h-full w-full flex flex-col gap-4">
					<div className="flex flex-col items-start justify-end self-end max-md:self-center max-md:items-center">
						<p>Order number: 0127846253HD </p>
						<p>Order placed: {format(parseISO(data?.created_at), 'd MMMM ')}</p>
					</div>

					<div className="flex flex-col gap-4 justify-between">
						<h4>Order placed</h4>

						<div className="w-full space-y-2">
							<h6 className="flex items-center gap-2 text-base font-normal text-primary">
								Order tracking <img src={ArrowRightBlue} className="w-2" alt="Arrow right" />
							</h6>

							<progress className="w-full bg-[#D9D9D9] !rounded-lg" value={20} max={100}></progress>

							<div className="flex items-start justify-between px-4">
								<div className="flex flex-col gap-2 items-center text-center leading-4">
									<span className="w-3 h-3 rounded-full bg-[#00000080]" />
									<span>Order placed</span>
								</div>
								<div className="flex flex-col gap-2 items-center text-center leading-4">
									<span className="w-3 h-3 rounded-full bg-[#00000080]" />
									<span>Order Processed</span>
								</div>
								<div className="flex flex-col gap-2 items-center text-center leading-4">
									<span className="w-3 h-3 rounded-full bg-[#00000080]" />
									<span>Order on the way</span>
								</div>
								<div className="flex flex-col gap-2 items-center text-center leading-4">
									<span className="w-3 h-3 rounded-full bg-[#00000080]" />
									<span>Order Delivered</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="space-y-4 border-b border-black/50 py-2 pb-4">
				<div className="grid grid-cols-[repeat(auto-fit,_minmax(170px,_1fr))] gap-4">
					<div className="space-y-2">
						<p className="capitalize">{data.title}</p>
						<div className="flex items-center gap-1">
							<p>Ad price:</p>
							<p>₦{toMoney(data.ad_price)}</p>
						</div>
						{data?.price && (
							<div className="flex items-center gap-1">
								<p>Quoted price:</p>
								<p>₦{toMoney(data.price)}</p>
							</div>
						)}
					</div>

					<div>
						<h5 className="font-semibold text-lg">Deliver to:</h5>

						<p>
							<span className="text-primary italic font-normal">Mr {data.buyer_name}.</span> <br />
							{data.buyer_address}, {data.buyer_state}
						</p>
					</div>

					{data.note && (
						<div className="flex flex-col items-end gap-1">
							<p className="">Delivery Note</p>
							<div className="italic shadow-md border border-black/30 p-2">
								If you knock and no answer kindly drop with security, Kamal.
							</div>
						</div>
					)}
				</div>

				<button
					onClick={() => handleScrollTo(returnRef)}
					className="text-primary flex items-center gap-2"
				>
					Check return eligibility <img src={ArrowRightBlue} className="w-2" alt="Arrow right" />
				</button>
			</div>

			<p className="text-center p-4">
				Need some help? <span className="text-primary">Chat now</span> or call : +234(0)8136155728
			</p>

			{/* terms and condition modal */}
			<Modal isOpen={isOpen} setIsOpen={setIsOpen} headerText="Terms of Service">
				<TermsAndCondition returnRef={returnRef} setIsOpen={setIsOpen} isOpen={isOpen} />
			</Modal>
		</div>
	);
};

export default Details;
