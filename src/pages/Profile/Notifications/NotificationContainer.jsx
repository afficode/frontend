import { BsThreeDotsVertical } from 'react-icons/bs';
import { Button, Modal } from '../../../ui';
import { Inspector } from '../../../assets/svgs';
import { InspectorCard } from '../../../components';
import { useState } from 'react';

const NotificationContainer = ({ image, message, date, time, name, type }) => {
	const [inspectorModal, setInspectorModal] = useState(false);

	return (
		<div
			className={`${
				type === 'inspection' ? 'bg-secondary' : 'bg-primary/50'
			} "w-full  p-2 sm:p-4 flex gap-3 rounded-sm"`}
		>
			{/* image  */}
			<div className="h-[8rem] w-[8rem] sm:h-[10rem] sm:w-[10rem]">
				{type === 'inspection' ? (
					<div className="bg-white w-full h-full flex items-center justify-center rounded-full ">
						<img src={Inspector} alt="/" className="w-20 object-fit mx-auto" />
					</div>
				) : (
					<img
						src={image}
						alt="/"
						className="h-full w-full m-auto object-fit rounded-l-2xl rounded-b-2xl"
					/>
				)}
			</div>

			{/* details  */}
			<div className="flex flex-col justify-between flex-1">
				<div>
					<div className="flex items-center">
						<h5 className="font-semibold hidden sm:block">
							{type === 'inspection' ? 'Inspection Notification' : message}
						</h5>
						<h6 className="font-semibold sm:hidden">
							{type === 'inspection' ? 'Inspection Notification' : message}
						</h6>

						<div className="dropdown dropdown-bottom dropdown-left ml-auto">
							<BsThreeDotsVertical
								tabIndex={0}
								className="cursor-pointer  text-xl sm:text-2xl self-start"
							/>
							<ul
								tabIndex={0}
								className="dropdown-content  z-[1] menu p-4 shadow bg-white rounded-box w-32 space-y-2"
							>
								<li
									tabIndex={0}
									className="cursor-pointer font-medium hover:text-primary whitespace-nowrap"
								>
									Mark as read
								</li>
								<li tabIndex={0} className="cursor-pointer font-medium hover:text-primary">
									Delete
								</li>
							</ul>
						</div>
					</div>
					<span className="block max-sm:text-sm">
						{type === 'inspection' ? `From ${name}` : `${date} at ${time}`}
					</span>
				</div>
				<div>
					<Button
						variant={'plain'}
						size={'small'}
						className={'max-sm:text-sm'}
						onClick={() => {
							type === 'inspection' && setInspectorModal(true);
						}}
					>
						Respond to {name}
					</Button>
				</div>
			</div>

			<Modal
				isOpen={inspectorModal}
				setIsOpen={setInspectorModal}
				padding={false}
				className={'max-w-fit px-4'}
			>
				<InspectorCard />
			</Modal>
		</div>
	);
};

export default NotificationContainer;
