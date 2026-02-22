import { formatDistanceToNow } from 'date-fns';
import { Timeline } from 'flowbite-react';
import { FaRobot, FaUserCircle, FaUserTie } from 'react-icons/fa';
import useAuth from '../../context/UserContext';

const TimelineComponent = ({ data }) => {
    const { user } = useAuth();
    return (
        <Timeline>
            {data && (
                <>
                    {data?.map((el, index) => (
                        <Timeline.Item key={index}>
                            <Timeline.Point />
                            <Timeline.Content>
                                {el?.date && (
                                    <Timeline.Time className='flex items-start justify-between'>
                                        <span>{formatDistanceToNow(new Date(el?.date))}</span>{' '}
                                        <span className='mr-4 text-lg bg-white rounded-full p-2'>
                                            {el?.user === null ? (
                                                <FaRobot className='text-black' />
                                            ) : el?.user === user?.id ? (
                                                <FaUserCircle className='text-primary' />
                                            ) : (
                                                <FaUserTie className='text-green-500' />
                                            )}
                                        </span>
                                    </Timeline.Time>
                                )}
                                {el?.body && (
                                    <Timeline.Body className='text-black'>{el?.body}</Timeline.Body>
                                )}
                                {el?.title && (
                                    <Timeline.Body
                                        className={`text-xs inline  py-1 px-2 text-white rounded-sm ${el?.user === user?.id ? 'bg-primary' : 'bg-green-500'}`}
                                    >
                                        {el?.user === user?.id ? 'You' : 'Boonfu Admin'}
                                    </Timeline.Body>
                                )}
                                {el?.button && el?.button}
                            </Timeline.Content>
                        </Timeline.Item>
                    ))}
                </>
            )}
        </Timeline>
    );
};
export default TimelineComponent;
