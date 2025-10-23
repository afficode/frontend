import { useNavigate } from 'react-router-dom';
import { CameraWhite } from '../../../assets/svgs';
import { Button } from '../../../ui';
import { toMoney } from '../../../utils';
import { useNotify, useUpdateAd, makeAdPayment } from '../../../hooks';
import { useQueryClient } from 'react-query';
import { FaUnlock } from "react-icons/fa";


const AdCard = ({ title, images, active, price, subscribe, views, adId, chats, paid, available }) => {
	const navigate = useNavigate();
	const notify = useNotify();
	const { mutate } = useUpdateAd(adId);
	const { mutate: makePaymentMutate } = makeAdPayment();
	const queryClient = useQueryClient();

	const handleEdit = (adId) => {
		navigate(`/update-ad/${adId}`);
	};

	const closeAdvert = () => {
		const formData = new FormData();
		formData.append('active', '2');
		mutate(formData, {
			onSuccess: (data) => {
				notify('Advert closed successfully', 'success');
				queryClient.invalidateQueries({ queryKey: ['getUserAds'] });
			},
			onError: () => {
				notify('Error closing Ad. If this error persist, please contact Admin with the contact us form.', 'error');
			}
		})
	}

	const makePayment = () => {
		makePaymentMutate(adId, {
			onSuccess: (data) => {
				notify(data?.message || 'Payment Queued. You will be notified by email when payment is done.', 'success');
				queryClient.invalidateQueries({ queryKey: ['getUserAds'] });
			},
			onError: () => {
				notify('Error making payment. If this error persist, please contact Admin with the contact us form.', 'error');
			}
		});
	}

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
				{active === '2' && (
					<span className="absolute top-4 right-4 text-white font-semibold bg-primary py-1 px-2 rounded-xl text-center border-4 border-white max-sm:text-sm">
						Closed
					</span>
				)}
				{(active === '0' && available === 0) && (
					<div className="absolute top-4 right-4 text-white font-semibold bg-secondary py-1 px-2 rounded-xl text-center border-4 border-white max-sm:text-sm">
						{paid === 0 ? <span className='flex items-center justify-center cursor-pointer' onClick={() => makePayment()}>Payment Required &emsp; <FaUnlock /></span> : <span>Processing</span>}
					</div>
				)}
				{(active === '0' && available === 1) && (
					<div className="absolute top-4 right-4 text-white font-semibold bg-red-500 py-1 px-2 rounded-xl text-center border-4 border-white max-sm:text-sm">
						Blocked
					</div>
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
							<span>Chats:</span> <b>{chats}</b>
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
							onClick={() => closeAdvert()}
							disabled={active === '2'}
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
