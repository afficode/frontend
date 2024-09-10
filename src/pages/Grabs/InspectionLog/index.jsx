import { useState } from 'react';
import { InspectionImage } from '../../../assets/images';
import { GrabIcon, InspectionCalender, Location } from '../../../assets/svgs';
import { Button, Modal } from '../../../ui';

const InspectionLog = () => {
	const [inspectionModal, setInspectionModal] = useState(false);
	return (
		<section>
			<div className="space-y-8 p-6 sm:px-16">
				<h3 className="uppercase">INSPECTION LOG </h3>

				<div className="space-y-4">
					<InspectionCard onClick={() => setInspectionModal(true)} />
					<InspectionCard onClick={() => setInspectionModal(true)} />
					<InspectionCard onClick={() => setInspectionModal(true)} />
				</div>
			</div>

			<Modal
				isOpen={inspectionModal}
				setIsOpen={setInspectionModal}
				headerSize={'small'}
				className={'max-w-[700px]'}
			>
				<div className="space-y-6">
					<div className="flex flex-col items-center gap-4">
						<div className="sm:h-[300px]">
							<img src={InspectionImage} alt="/" className="rounded-xl w-full h-full object-cover" />
						</div>
						<h4>BLUE, TOYOTA COROLLA 2020</h4>
					</div>

					<div className="space-y-4 pb-6 border-b border-black/30">
						<p className="flex gap-1 sm:gap-3">
							Inspection date : <b>22.09.2024</b>
						</p>
						<p className="flex gap-1 sm:gap-3">
							Inspector’s name : <b>LAWAL, QUDUS</b>
						</p>
						<p className="flex gap-1 sm:gap-3">
							Contact : <b>22.09.2024</b>
						</p>
						<p className="flex gap-1 sm:gap-3">
							Location : <b>Agege Pencinema</b>
						</p>
					</div>

					<div>
						<p className="flex gap-1 sm:gap-3 ">
							Grabber : <b>Sholistic0012</b>
						</p>

						<div className="mt-16 flex items-center justify-center">
							<Button variant={'primary'} className={'rounded-3xl mx-auto'}>
								Active
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		</section>
	);
};

export default InspectionLog;

const InspectionCard = ({ image, message, date, time, name, onClick }) => {
	return (
		<div
			onClick={onClick}
			className="flex max-sm:flex-col gap-4 p-4 bg-gray-300 max-w-full h-fit md:h-[270px] mx-auto cursor-pointer"
		>
			<div className="h-full ">
				<img src={InspectionImage} alt="/" className="object-cover w-full h-full rounded-xl" />
			</div>

			<div className="md:h-[240px] md:flex-1">
				<h4 className="uppercase text-start">BLUE, TOYOTA COROLLA 2020</h4>

				<div className="flex md:items-center justify-between max-md:flex-col">
					<div className="h-full flex flex-col items-start justify-between gap-6  md:gap-28">
						<div className="space-y-1">
							<p className="flex gap-2">
								<img src={Location} alt="/" className="w-3" />
								Ikeja, Lagos
							</p>
							<div className="bg-white p-1 rounded-lg max-sm:text-sm ">Foreign Used</div>
						</div>

						<div className="flex gap-4 items-center max-md:my-2 mt-auto">
							<p className="flex items-center gap-2 ">
								<img src={GrabIcon} alt="/" className="w-5" /> 21-times
							</p>
							<p className="flex items-center gap-2 ">
								<img src={InspectionCalender} alt="/" className="w-5" /> 4
							</p>
						</div>
					</div>
					<div className="md:ml-auto flex flex-col gap-2">
						<Button variant={'primary'} size={'large'} className={'rounded-2xl font-semibold'}>
							Active
						</Button>
						<Button variant={'grey'} size={'large'} className={'rounded-2xl font-semibold'}>
							Close
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
