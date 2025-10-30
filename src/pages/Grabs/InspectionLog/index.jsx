import { useState } from 'react';
import { noimage } from '../../../assets/images';
import { Location } from '../../../assets/svgs';
import { Modal } from '../../../ui';
import { InspectorCard, SpinnerSkeleton } from '../../../components';
import { useGetSchedule, useGetSchedules } from '../../../hooks';
import useAuth from '../../../context/UserContext';

const InspectionLog = () => {
	const [adId, setAdId] = useState(null);
	const [inspectionModal, setInspectionModal] = useState(false);
	const { data, isLoading } = useGetSchedules();
	const user = useAuth();

	const { data: schedule, isLoading: scheduleLoading } = useGetSchedule(adId, {
		enabled: !!adId,
	});

	const handleClick = (id) => {
		setAdId(id);
		setInspectionModal(true);
	};

	if (isLoading) {
		return (
			<div className="h-52 flex items-center justify-center">
				<SpinnerSkeleton />
			</div>
		);
	}

	return (
		<section>
			<div className="space-y-8 p-6 sm:px-16">
				<h3 className="uppercase">INSPECTION LOG </h3>

				{data?.schedules.filter((item) => item.owner !== user.id).length > 0 ? (
					<div className="space-y-4">
						{data?.schedules
							.filter((item) => item.owner !== user.id)
							.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
							.map((schedule) => (
								<InspectionCard
									onClick={() => handleClick(schedule.id)}
									image={schedule.ad_details.images[0].path}
									title={schedule.ad_details.title}
									location={schedule.ad_details.location}
									condition={schedule.ad_details.ad_condition}
									key={schedule.id}
								/>
							))}
					</div>
				) : (
					<div className="flex items-center justify-center text-primary py-8">
						You haven't booked an inspection yet
					</div>
				)}
			</div>

			<Modal
				isOpen={inspectionModal}
				setIsOpen={setInspectionModal}
				padding={false}
				className={'max-w-fit px-4'}
			>
				<InspectorCard data={schedule} isLoading={scheduleLoading} />
			</Modal>
		</section>
	);
};

export default InspectionLog;

const InspectionCard = ({ image, location, condition, title, onClick }) => {
	return (
		<div
			onClick={onClick}
			className="flex max-sm:flex-col gap-4 p-4 bg-gray-300 max-w-full h-fit md:h-[200px] mx-auto cursor-pointer"
		>
			<div className=" h-[150px] w-[150px] max-sm:w-full max-sm:h-[200]  md:h-full md:w-[200px]">
				{image ? (
					<img src={image} alt={title} className="object-cover w-full h-full rounded-xl" />
				) : (
					<img src={noimage} alt={'default'} className="object-cover w-full h-full rounded-xl" />
				)}
			</div>

			<div className="md:h-[240px] md:flex-1">
				<h4 className="uppercase text-start">{title}</h4>

				<div className="flex md:items-center justify-between max-md:flex-col">
					<div className="h-full flex flex-col items-start justify-between gap-6  md:gap-28">
						<div className="flex flex-col gap-1">
							<p className="flex gap-2">
								<img src={Location} alt="location" className="w-3" />
								{location}
							</p>
							{condition && (
								<span className="bg-white p-1 rounded-lg text-sm max-sm:text-xs capitalize w-max">
									{condition}
								</span>
							)}
						</div>

						{/* <div className="flex gap-4 items-center max-md:my-2 ">
							<p className="flex items-center gap-2 ">
								<img src={GrabIcon} alt="grabbers" className="w-5" /> 21-times
							</p>
							<p className="flex items-center gap-2 ">
								<img src={InspectionCalender} alt="calender" className="w-5" /> 4
							</p>
						</div> */}
					</div>
					{/* <div className="md:ml-auto flex flex-col gap-2">
						<Button variant={'primary'} size={'large'} className={'rounded-2xl font-semibold'}>
							Active
						</Button>
						<Button variant={'grey'} size={'large'} className={'rounded-2xl font-semibold'}>
							Close
						</Button>
					</div> */}
				</div>
			</div>
		</div>
	);
};

{
	/* <Modal
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
			</Modal> */
}
