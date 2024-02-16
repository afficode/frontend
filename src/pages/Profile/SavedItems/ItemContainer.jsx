import { CameraWhite, Location } from '../../../assets/svgs';
import { Button } from '../../../ui';
import { AiOutlineClose } from 'react-icons/ai';
import { noimage } from '../../../assets/images';
import { Link } from 'react-router-dom';
import { Approutes } from '../../../constants';
import { encodeProductId } from '../../../utils/dataManipulations';
import { useQueryClient } from 'react-query';
import { useNotify } from '../../../hooks';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { unSaveAd } from '../../../hooks/useSaves';
import { numberWithCommas } from '../../../utils/dataManipulations';

const ItemContainer = ({ name, location, specifications, price, images, ads_id }) => {
	const queryClient = useQueryClient();
	const notify = useNotify();
	const [unSave, setUnSave] = useState(false);

	useQuery({
		queryFn: unSaveAd,
		queryKey: ['unSaveAd', ads_id],
		enabled: unSave,
		onSuccess: (data) => {
			notify(data?.message, 'success');
			queryClient.invalidateQueries({ queryKey: ['saved'] });
			setUnSave(false); // set the query to false, to avoid refetching.
		},
		onError: (error) => {
			notify(error?.response?.message, 'error');
			setUnSave(false); // set the query to false, to avoid refetching.
		},
	});

	return (
		<Link to={`${Approutes.product.initial}/${encodeProductId(ads_id)}`}>
			<div className="bg-gray-200 rounded-sm cursor-pointer">
				<div className="flex ">
					{/* image  */}
					<div className="h-[9.5rem] w-[8.5rem] sm:h-[12rem] sm:w-[12rem] md:h-[16rem] md:w-[16rem] relative">
						{images.length > 0 ? (
							<img src={images[0].path} alt={name} className=" h-full w-full p-1 m-auto object-fit" />
						) : (
							<img src={noimage} alt="no images" className=" h-full w-full p-1 m-auto object-fit" />
						)}

						<div className="absolute max-sm:left-2 bottom-0 sm:bottom-05 w-full flex  mx-auto p-1">
							<div className="p-2 flex items-end gap-2 sm:gap-6 justify-around bg-black/70 w-full">
								<Button
									variant={'primary'}
									size={'small'}
									className={'max-md:text-xs max-sm:font-semibold max-sm:hidden'}
								>
									{' '}
									Continue
								</Button>
								<div className="flex items-center gap-[.4rem] text-white max-sm:mr-auto my-auto">
									<img src={CameraWhite} alt="/" className="w-4" />
									<span className="text-sm sm:text-lg">{images?.length}</span>
								</div>
							</div>
						</div>
					</div>

					{/* details  */}
					<div className="flex-1 flex flex-col justify-between px-1 py-2 sm:p-4 ">
						<div className="flex flex-col">
							<div className="flex">
								<h4 className="text-primary font-semibold max-lg:hidden uppercase">{name}</h4>
								<h5 className="text-primary font-semibold lg:hidden max-sm:hidden uppercase">{name}</h5>
								<h6 className="text-primary font-semibold sm:hidden uppercase">{name}</h6>

								<Link onClick={() => setUnSave(true)}>
									<button className="p-1 sm:p-2 bg-white rounded-full ml-auto self-start ">
										<AiOutlineClose />
									</button>
								</Link>
							</div>

							<div className="flex items-center gap-2 md:mt-2">
								<img src={Location} alt="/" className="w-3 sm:w-4" />
								<span className="max-sm:text-xs text-sm">{location}</span>
							</div>

							<div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-4">
								{specifications.map((spec) => (
									<>
										{spec !== null && (
											<span
												key={spec}
												className="capitalize px-3 py-1 md:px-6 md:py-2 bg-white max-sm:text-xs max-md:text-sm max-sm:font-medium"
											>
												{spec}
											</span>
										)}
									</>
								))}
							</div>
						</div>

						<div className="flex items-center gap-4">
							{price ? (
								<span className="px-3 py-1 md:px-6 md:py-2 bg-white font-medium lg:font-semibold max-sm:text-sm">
									{numberWithCommas(price)}
								</span>
							) : (
								<Button
									variant={'plain'}
									size={'small'}
									className={'font-medium lg:font-semibold max-sm:text-sm px-3'}
								>
									Request a Quote
								</Button>
							)}
							{/* <Button
              variant={"plain"}
              size={"small"}
              className={"font-semibold max-sm:text-sm max-md:hidden"}
            >
              Show contact{" "}
            </Button> */}
							<Link to={Approutes.profile.messages}>
								<Button
									variant={'plain'}
									size={'small'}
									className={'font-semibold max-sm:text-sm max-md:hidden'}
								>
									Send Message
								</Button>
							</Link>
						</div>
					</div>
				</div>

				{/* flex items-center */}
				<div className="w-full  md:hidden divide-x-2 divide-gray-200 ">
					{/* <Button variant={'plain'} size={'small'} className={`font-semibold max-sm:text-sm flex-1`}>
						Show contact{' '}
					</Button> */}
					<Link to={Approutes.profile.messages}>
						<Button variant={'plain'} size={'full'} className={`font-semibold max-sm:text-sm`}>
							Send Message
						</Button>
					</Link>
				</div>
			</div>
		</Link>
	);
};

export default ItemContainer;

/* 
   name,
   location,
   specifications(array),
   price,
   images(array),
*/
