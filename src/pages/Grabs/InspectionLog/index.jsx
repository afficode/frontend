import { useState } from 'react';
import { noimage } from '../../../assets/images';
import { Location } from '../../../assets/svgs';
import { Modal } from '../../../ui';
import { InspectorCard, SpinnerSkeleton } from '../../../components';
import { useGetSchedule, useGetSchedules } from '../../../hooks';
import useAuth from '../../../context/UserContext';
import { ScrollToTop } from '../../../utils';

const InspectionLog = () => {
    const [scheduleId, setScheduleId] = useState(null);
    const [inspectionModal, setInspectionModal] = useState(false);
    const { data, isLoading } = useGetSchedules();
    const user = useAuth();

    const { data: schedule, isLoading: scheduleLoading } = useGetSchedule(scheduleId, {
        enabled: !!scheduleId,
    });

    const handleClick = (id) => {
        setScheduleId(id);
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

            <ScrollToTop />
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
                    </div>
                </div>
            </div>
        </div>
    );
};
