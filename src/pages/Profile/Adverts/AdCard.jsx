import { useNavigate } from 'react-router-dom';
import { CameraWhite } from '../../../assets/svgs';
import { Button } from '../../../ui';
import { toMoney } from '../../../utils';

const AdCard = ({ title, images, active, price, subscribe, views, adId }) => {
	const navigate = useNavigate();

	const handleEdit = (adId) => {
		navigate(`/update-ad/${adId}`);
	};

	return (
		<div className="bg-gray-200 w-[18rem] sm:w-[20rem]">
			{/* image  */}
			<div className="w-full h-[13rem]  sm:h-[15rem] relative border border-gray-300">
				<img src={images[0]?.path} alt={images[0]?.filename} className="w-full h-full object-fit" />
				<div className="absolute bottom-0 flex items-center w-full gap-2 p-2 bg-black/60">
					<img src={CameraWhite} alt="/" className="w-4" />
					<span className="text-white">{images.length}</span>
				</div>
				{active === '1' && (
					<span className="absolute top-4 right-4 text-white font-semibold bg-[#047F73] py-1 px-2 rounded-xl text-center border-4 border-white max-sm:text-sm">
						Active
					</span>
				)}
			</div>

			{/* details  */}
			<div className="flex flex-col justify-between px-3 py-2 ">
				<div className="w-full">
					<h4 className="capitalize truncate">{title}</h4>
					<span className="block font-semibold text-primary max-sm:text-sm">₦{toMoney(price)}</span>
					{subscribe === '1' ? (
						<span className="mt-3 max-sm:text-sm">
							Promoted till: <b>01/10</b>
						</span>
					) : (
						<span className="mt-3 max-sm:text-sm">
							Promoted till: <b>None</b>
						</span>
					)}
				</div>

				<div className="flex justify-between mt-3">
					<div className="py-3 pl-3 pr-5 space-y-1 bg-white max-sm:text-sm">
						<div>
							<span>Reach:</span> <b>2,000</b>
						</div>
						<div>
							<span>Clicks:</span> <b>500</b>
						</div>
						<div>
							<span>Views:</span> <b>{views}</b>
						</div>
						<div>
							<span>Chats:</span> <b>20</b>
						</div>
					</div>
					<div className="flex flex-col justify-between max-sm:text-sm">
						<Button
							variant={'plain'}
							size={'small'}
							className={'text-primary rounded-lg shadow-none hover:shadow-md'}
							onClick={() => handleEdit(adId)}
						>
							Edit
						</Button>
						<Button
							variant={'plain'}
							size={'small'}
							className={'text-primary rounded-lg shadow-none hover:shadow-md'}
						>
							Close
						</Button>
						<Button
							variant={'secondary'}
							size={'small'}
							className={' rounded-lg '}
							onClick={() => navigate(`/update-ad/${adId}#post-package`)}
						>
							Promote
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdCard;
