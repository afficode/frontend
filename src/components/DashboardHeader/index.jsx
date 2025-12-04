import { AiOutlineBell } from 'react-icons/ai';
import { BiEnvelope } from 'react-icons/bi';
import { IoIosMenu } from 'react-icons/io';
import MobileSidebar from '../../layout/MobileSidebar';
import { useState } from 'react';
import { Approutes } from '../../constants';
import { Link } from 'react-router-dom';
import useMessageContext from '../../context/MessageContext';
import useAuth from '../../context/UserContext';

const DashboardHeader = () => {
	const [showSidebar, setShowSidebar] = useState(false);
	const { unread } = useMessageContext();
	const { isLogin } = useAuth();

	return (
		<div className="flex justify-between py-2 border-b border-black/30">
			<h3>Dashboard</h3>

			<div className="flex items-center gap-2 sm:gap-4">
				<Link to={Approutes.profile.messages}>
					<div className="relative">
						<BiEnvelope size={28} />
						{isLogin && unread > 0 && (
							<span className="py-[.5] px-1 bg-primary text-white text-center text-xs font-medium rounded-full absolute right-[-10%] top-0">
								{unread}
							</span>
						)}
					</div>
				</Link>

				<Link to={Approutes.profile.notifications}>
					<div className="relative">
						<AiOutlineBell size={28} />
						<span className="py-[.5] px-1 bg-[#D60949] text-white text-center text-xs font-medium rounded-full absolute right-[-10%] top-0">
							1
						</span>
					</div>
				</Link>
				<button onClick={() => setShowSidebar(!showSidebar)}>
					<IoIosMenu size={28} className="cursor-pointer lg:hidden" />
				</button>
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
