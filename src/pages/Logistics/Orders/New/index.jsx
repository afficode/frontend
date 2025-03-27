import { useState } from 'react';
import { LogisticArrow } from '../../../../assets/images';
import { Button, Modal } from '../../../../ui';
import { Location } from '../../../../assets/svgs';

const NewOrders = () => {
	const [quoteModal, setQuoteModal] = useState(false);

	return (
		<div className="space-y-4">
			{Array.from({ length: 5 }).map((_, index) => (
				<div key={index} className="max-w-[560px] w-full">
					<div className="flex items-center gap-4">
						<h6 className="font-semibold">Hair dryer machine</h6>{' '}
						<p className="border-l pl-4">Created: 23 feb.</p>{' '}
						<p className="border-l pl-4">Due delivery: 24 feb.</p>
					</div>
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2">
							<h6 className="font-semibold">Pick up:</h6>
							<p>Opic, Ojodu-berger</p>
						</div>
						<img src={LogisticArrow} alt="to be delivered to.." className="w-[15px] h-[15px]" />
						<div className="flex items-center gap-2">
							<h6 className="font-semibold">Pick up:</h6>
							<p>Opic, Ojodu-berger</p>
						</div>
					</div>

					<div className="flex items-center justify-end gap-4">
						<Button
							variant={'primary'}
							size={'small'}
							className={'rounded-md'}
							onClick={() => setQuoteModal(true)}
						>
							Quoted
						</Button>
					</div>
				</div>
			))}

			<Modal
				isOpen={quoteModal}
				setIsOpen={setQuoteModal}
				modalHeader={false}
				className={' max-w-[720px] p-0 bg-primary'}
			>
				<div className=" p-4 text-white w-full  mx-auto">
					<h6 className="text-center">Quoting for delivery</h6>

					<div className="flex flex-col gap-4 my-4">
						<div className="flex-1 space-y-4">
							<div className="flex gap-4">
								<div className="flex-1">
									<p>Pick Up: </p>
									<div className="bg-white text-black text-center p-2 flex items-center gap-2 w-full truncate">
										{' '}
										<img src={Location} alt="Location" className="w-4" /> 1a, Babs Adams street, Dopemu, Agege
									</div>
								</div>
								<div>
									<p>City: </p>
									<div className="bg-white text-black text-center p-2">Amuwo-odofin</div>
								</div>
							</div>
							<div className="flex gap-4">
								<div className="flex-1">
									<p>Deliver to: </p>
									<div className="bg-white text-black text-center p-2 flex items-center gap-2 w-full truncate">
										{' '}
										<img src={Location} alt="Location" className="w-4" /> 1a, Babs Adams street, Dopemu, Agege
									</div>
								</div>
								<div>
									<p>City: </p>
									<div className="bg-white text-black text-center p-2">Amuwo-odofin</div>
								</div>
							</div>
						</div>

						{/* <img src={DeliveryQuote} alt="delivery quote" className="w-16" /> */}
					</div>

					<div className="flex items-center  justify-center gap-2 my-2 max-w-full">
						<Button
							variant={'secondary'}
							size={'small'}
							className=" w-full"
							onClick={() => setPaymentModal(true)}
						>
							Continue
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default NewOrders;
