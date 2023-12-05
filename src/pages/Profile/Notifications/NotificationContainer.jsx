import { BsThreeDotsVertical } from 'react-icons/bs';
import { Button } from '../../../ui';

const NotificationContainer = ({ image, message, date, time, name }) => {
	return (
		<div className="w-full bg-primary/50 p-2 sm:p-4 flex gap-3 rounded-sm">
			{/* image  */}
			<div className="h-[8rem] w-[8rem] sm:h-[10rem] sm:w-[10rem]">
				<img
					src={image}
					alt="/"
					className="h-full w-full m-auto object-fit rounded-l-2xl rounded-b-2xl"
				/>
			</div>

			{/* details  */}
			<div className="flex flex-col justify-between flex-1">
				<div>
					<div className="flex items-center">
						<h5 className="font-semibold hidden sm:block">{message}</h5>
						<h6 className="font-semibold sm:hidden">{message}</h6>

						<div className="dropdown dropdown-bottom dropdown-left ml-auto">
							<BsThreeDotsVertical
								tabIndex={0}
								className="cursor-pointer  text-xl sm:text-2xl self-start"
							/>
							<ul
								tabIndex={0}
								className="dropdown-content  z-[1] menu p-4 shadow bg-white rounded-box w-32 space-y-2"
							>
								<li tabIndex={0} className="cursor-pointer font-medium hover:text-primary">
									Mark as read
								</li>
								<li tabIndex={0} className="cursor-pointer font-medium hover:text-primary">
									Delete
								</li>
							</ul>
						</div>
					</div>
					<span className="block max-sm:text-sm">
						{date} at {time}
					</span>
				</div>
				<div>
					<Button variant={'plain'} size={'small'} className={'max-sm:text-sm'}>
						Respond to {name}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default NotificationContainer;
