import { AiOutlineBell } from 'react-icons/ai';
import { BiEnvelope } from 'react-icons/bi';
import { IoIosMenu } from 'react-icons/io';
import MobileSidebar from '../../layout/MobileSidebar';
import { useState } from 'react';
import { Approutes } from '../../constants';
import { Link } from 'react-router-dom';
import { Coin } from '../../assets/images';
import { Button, Modal } from '../../ui';
import useMessageContext from '../../context/MessageContext';
import useAuth from '../../context/UserContext';

const DashboardHeader = () => {
	const [showSidebar, setShowSidebar] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const { unread } = useMessageContext();
	const { isLogin } = useAuth();

	return (
		<div className="flex justify-between py-2 border-b border-black/30">
			<h3>Dashboard</h3>

			<div className="flex items-center gap-2 sm:gap-4">
				<button className="flex items-center " onClick={() => setIsOpen(true)}>
					<img src={Coin} alt="/" className="w-[1.8rem] mx-2" />
					<b>10x</b>
				</button>

				<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
					<div className="space-y-4 text-center">
						<h6>
							You currently have <b>10x</b> token
						</h6>
						<div>
							To buy more token, click the button below. <br />
							<b> Note 1 token = 1$</b>
						</div>
						<Button variant={'secondary'} size={'small'}>
							Buy more
						</Button>
					</div>
				</Modal>

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
