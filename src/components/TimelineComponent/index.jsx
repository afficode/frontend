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
									<Timeline.Time className="flex items-start justify-between">
										<span>{formatDistanceToNow(new Date(el?.date))}</span>{' '}
										<span className="mr-4 text-lg">
											{el?.user === null ? (
												<FaRobot className="text-black" />
											) : el?.user === user?.id ? (
												<FaUserCircle className="text-black" />
											) : (
												<FaUserTie className="text-black" />
											)}
										</span>
									</Timeline.Time>
								)}
								{el?.title && <Timeline.Title>{el?.title}</Timeline.Title>}
								{el?.body && <Timeline.Body>{el?.body}</Timeline.Body>}
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
