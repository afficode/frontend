import { RedCar, Spa } from '../../../assets/images';
import NotificationContainer from './NotificationContainer';

const Notifications = () => {
	return (
		<div className="max-w-[1024px] mx-auto px-2 sm:px-4 my-10">
			<div className="flex flex-col gap-1">
				<NotificationContainer
					image={RedCar}
					message={'Lawal Creg liked your post!'}
					date={'Yesterday '}
					time={'5:50pm'}
					name={'Lawal'}
				/>
				<NotificationContainer
					image={Spa}
					message={'Dayo Az liked your post!'}
					date={'Today '}
					time={'5:00am'}
					name={'Dayo'}
				/>
				<NotificationContainer
					image={RedCar}
					message={'Gt Doe liked your post!'}
					date={'Yesterday '}
					time={'10:50pm'}
					name={'Gt'}
				/>
				<NotificationContainer
					image={RedCar}
					message={'Steph Emma liked your post!'}
					date={'2 days ago '}
					time={'7:30pm'}
					name={'Steph'}
				/>
				<NotificationContainer
					image={RedCar}
					message={'Ade Olu liked your post!'}
					date={'5 days ago '}
					time={'3:00pm'}
					name={'Ade'}
				/>
			</div>
		</div>
	);
};

export default Notifications;

// image, message, date, time, name

// notification data format from backend
/*
	[
		{
			name: '',
			image: '',
			message: '',
			date: '',
			time: '',
		},
		{
			name: '',
			image: '',
			message: '',
			date: '',
			time: '',
		},
		{
			name: '',
			image: '',
			message: '',
			date: '',
			time: '',
		},
		{
			name: '',
			image: '',
			message: '',
			date: '',
			time: '',
		},
	]
*/
