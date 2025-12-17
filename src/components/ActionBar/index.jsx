import { Link, useNavigate } from 'react-router-dom';
import { Approutes } from '../../constants';
import { privateAxios } from '../../utils';
import { useNotify } from '../../hooks';
import { useQueryClient } from 'react-query';
import { useState } from 'react';
import useAuth from '../../context/UserContext';

const ActionBar = (ad) => {
	const { user } = useAuth();
	const notify = useNotify();
	const navigate = useNavigate();

	const queryClient = useQueryClient();

	const [isDeleting, setIsDeleting] = useState(false);
	const handleDelete = (id) => {
		setIsDeleting(true);

		privateAxios
			.delete(`/ads/${id}`, {
				data: {
					applyPolicy: 'close',
					owner: user.id,
					created_at: ad?.ad.created_at,
				}
			})
			.then(async (res) => {
				setIsDeleting(false);
				queryClient.invalidateQueries({ queryKey: ['getUserAds'] });
				notify(res?.data.message, 'success');
				navigate(Approutes.dashboard.initial);
			})
			.catch((error) => { });

		setIsDeleting(false);
	};

	return (
		<div className="">
			<div className="flex items-center justify-between px-2 sm:px-6 py-2 bg-primary text-white">
				<div className="flex items-center gap-1">
					<p className="font-light text-sm">Views:</p>
					<b>{ad?.ad.views || 0}</b>
				</div>
				<div className="flex items-center gap-1">
					<p className="font-light text-sm">Clicks:</p>
					<b>{ad?.ad.chats || 0}</b>
				</div>
				<div className="flex items-center gap-1">
					<p className="font-light text-sm">Phone Views:</p>
					<b>{ad?.ad.views || 0}</b>
				</div>
				<div className="flex items-center gap-1">
					<p className="font-light text-sm">Chats:</p>
					<b>{ad?.ad.chats || 0}</b>
				</div>
			</div>

			<div className="flex justify-between items-center border px-2 sm:px-6 py-2">
				<div className="flex gap-6">
					<Link to={`${Approutes.updateAd}/${ad?.ad.id}`} target="_blank" rel="noopener noreferrer">
						<button className="text-primary font-bold">Edit</button>
					</Link>
					<Link
						to={`${Approutes.updateAd}/${ad?.ad.id}#post-package`}
						target="_blank"
						rel="noopener noreferrer"
					>
						<button className="text-[#047F73] font-bold">Repost</button>
					</Link>
				</div>

				<div className="flex gap-6 ">
					<button onClick={() => handleDelete(ad?.ad?.id)} className="text-[#D60949] font-bold">
						{isDeleting ? 'Deleting...' : 'Delete'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ActionBar;
