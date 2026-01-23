import { FacebookBlue, Instagram, Location, Tiktok, Twitter, Whatsapp } from '../../../assets/svgs';
import { HiStar } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { ScrollToTop } from '../../../utils';
import GrabHeader from '../GrabHeader';
import useAuth from '../../../context/UserContext';

const GrabProfile = () => {
	const { user } = useAuth();

	return (
		<div>
			<GrabHeader text="Grabber's Profile" />

			<div className="flex max-lg:flex-col gap-6 mt-8">
				<div className=" w-full rounded-2xl border-4 border-gray-400 flex flex-col items-center mx-auto p-4">
					{user?.profile_image ? (
						<img
							src={user?.profile_image?.path}
							className="w-[150px] h-[150px] md:w-[200px]  rounded-full md:h-[200px] border-2 border-primary"
							alt={user?.firstname}
						/>
					) : (
						<div className="w-[150px] h-[150px] md:w-[200px]  rounded-full md:h-[200px] border-2 border-primary flex items-center justify-center">
							{user?.firstname.split('')[0]?.toUpperCase() + user?.lastname.split('')[0]?.toUpperCase()}
						</div>
					)}
					<h4>
						{user?.firstname} {user?.lastname}
					</h4>
					<div className="flex gap-2">
						<HiStar size={26} className="text-primary" />
						<HiStar size={26} className="text-primary" />
						<HiStar size={26} className="text-primary" />
						<HiStar size={26} className="text-primary" />
						<HiStar size={26} className="text-primary" />
						{/* <HiOutlineStar size={26} className="text-primary" />
						<HiOutlineStar size={26} className="text-primary" /> */}
					</div>
					<div className="flex items-center gap-2">
						<img src={Location} alt="location" className="w-3" />
						<p className="">{user?.grabber.current_location}</p>
					</div>
					<div className="flex items-center gap-2 mt-4">
						<Link to={user?.grabber.social_media.x_page}>
							<img src={Twitter} alt={`X logo`} className="w-8" />
						</Link>
						<Link to={user?.grabber.social_media.facebook}>
							<img src={FacebookBlue} alt={`facebook logo`} className="w-8" />
						</Link>
						<Link to={user?.grabber.social_media.whatsapp}>
							<img src={Whatsapp} alt={`Whatsapp logo`} className="w-8" />
						</Link>
						<Link to={user?.grabber.social_media.tiktok}>
							<img src={Tiktok} alt={`tiktok logo`} className="w-8" />
						</Link>
						<Link to={user?.grabber.social_media.instagram}>
							<img src={Instagram} alt={`instagram logo`} className="w-8" />
						</Link>
					</div>

					<div>
						<div className="flex items-center gap-2 my-8">
							<p className="p-lg">Grab ID:</p>
							<p className="text-primary p-lg">{user?.grabber.id}</p>
						</div>

						<p className="p-lg text-center">2 Years since Joined</p>
					</div>
				</div>

				<div className=" w-full rounded-2xl border-4 border-gray-400 flex flex-col items-center mx-auto p-4">
					<h4>About Me</h4>
					<p className=" text-justify">{user?.grabber.bio}</p>
				</div>
			</div>
			<ScrollToTop />
		</div>
	);
};

export default GrabProfile;
