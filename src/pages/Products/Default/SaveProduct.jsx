import React, { useState } from 'react';
import { BiSolidBookmarkAltPlus, BiSolidBookmarkAltMinus } from 'react-icons/bi';
import { getSaves, saveAd, unSaveAd } from '../../../hooks/useSaves';
import useAuth from '../../../context/UserContext';
import { Approutes } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { setRedirectLink } from '../../../utils';
import { useQueryClient } from 'react-query';
import { useNotify } from '../../../hooks';
import { useQuery } from 'react-query';
import useSaveContext from '../../../context/SaveContext';
import { useEffect } from 'react';

const SaveProduct = ({ ads_id, className }) => {
	const { mutate } = saveAd();
	const [unSave, setUnSave] = useState(false);
	const { data, refetch, isLoading } = getSaves();
	const { isLogin, user } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const notify = useNotify();
	const { savesId, setSaves, setSavesId } = useSaveContext();

	useEffect(() => {
		if (data?.saves?.length >= 0) {
			setSaves(() => data?.saves);
			setSavesId(() => data?.saves.map((save) => save.ads_id));
		}
	}, [isLoading, data]);

	useQuery({
		queryFn: unSaveAd,
		queryKey: ['unSaveAd', ads_id],
		enabled: unSave,
		onSuccess: (data) => {
			notify(data?.message, 'success');
			queryClient.invalidateQueries({ queryKey: ['saved'] });
			return setUnSave(false);
		},
		onError: (error) => {
			notify(error?.response?.message, 'error');
		},
	});

	if (isLogin && savesId?.includes(ads_id)) {
		return (
			<BiSolidBookmarkAltMinus
				className={`text-secondary/80 hover:text-primary cursor-pointer ${className} `}
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();

					if (isLogin) {
						setUnSave(true);
					} else {
						setRedirectLink(window.location.pathname);
						navigate(Approutes.auth.initial);
					}
				}}
			/>
		);
	}

	return (
		<BiSolidBookmarkAltPlus
			className={`text-primary/80 hover:text-secondary cursor-pointer ${className} `}
			onClick={(e) => {
				e.stopPropagation();
				e.preventDefault();

				if (isLogin) {
					mutate(
						{ ads_id },
						{
							onSuccess: (data) => {
								notify(data?.message, 'success');
								queryClient.invalidateQueries({ queryKey: ['saved'] });
								refetch();
							},
							onError: (error) => {
								if (error?.response?.status === 401) setRedirectLink(window.location.pathname);
								return window.location.assign(Approutes.auth.initial);
							},
						}
					);
				} else {
					setRedirectLink(window.location.pathname);
					navigate(Approutes.auth.initial);
				}
			}}
		/>
	);
};

export default SaveProduct;
