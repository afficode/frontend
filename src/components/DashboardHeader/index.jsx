import { AiOutlineBell } from 'react-icons/ai';
import { BiEnvelope } from 'react-icons/bi';
import { IoIosMenu } from 'react-icons/io';
import MobileSidebar from '../../layout/MobileSidebar';
import { useState } from 'react';

const DashboardHeader = () => {
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<div className="flex justify-between py-2 border-b border-black/30">
			<h3>Dashboard</h3>

			<div className="flex gap-2 sm:gap-4 items-center">
				<div className="relative cursor-pointer">
					<BiEnvelope size={28} />
					<span className="py-[.5] px-1 bg-primary text-white text-center text-xs font-medium rounded-full absolute right-[-10%] top-0">
						4
					</span>
				</div>
				<div className="relative cursor-pointer">
					<AiOutlineBell size={28} />
					<span className="py-[.5] px-1 bg-[#D60949] text-white text-center text-xs font-medium rounded-full absolute right-[-10%] top-0">
						1
					</span>
				</div>
				<IoIosMenu
					size={28}
					className="cursor-pointer lg:hidden"
					onClick={() => setShowSidebar(!showSidebar)}
				/>
			</div>
			<MobileSidebar sidebar={showSidebar} setSidebar={setShowSidebar} />
		</div>
	);
};

export default DashboardHeader;

// DashboardHeader data

/*	
 {
	undread_messages: 4,
	undread_notifications: 1,
 }
*/
