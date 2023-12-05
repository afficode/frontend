import { CameraWhite, Location } from '../../../assets/svgs';
import { Button } from '../../../ui';
import { AiOutlineClose } from 'react-icons/ai';

const ItemContainer = ({ name, location, specifications, price, images }) => {
	return (
		<div className="bg-gray-200 rounded-sm">
			<div className="flex ">
				{/* image  */}
				<div className="h-[9.5rem] w-[8.5rem] sm:h-[12rem] sm:w-[12rem] md:h-[16rem] md:w-[16rem] relative">
					<img src={images[0]} alt="/" className=" h-full w-full p-1 m-auto object-fit" />

					<div className="absolute max-sm:left-2 bottom-2 sm:bottom-5 w-full flex items-end gap-2 sm:gap-6 justify-center mx-auto">
						<Button
							variant={'primary'}
							size={'small'}
							className={'max-md:text-xs max-sm:font-semibold max-sm:hidden'}
						>
							{' '}
							Continue
						</Button>
						<div className="flex items-center gap-[.4rem] text-white max-sm:mr-auto">
							<img src={CameraWhite} alt="/" className="w-4" />
							<span className="text-sm sm:text-lg">{images?.length}</span>
						</div>
					</div>
				</div>

				{/* details  */}
				<div className="flex-1 flex flex-col justify-between px-1 py-2 sm:p-4">
					<div className="flex flex-col">
						<div className="flex">
							<h4 className="text-primary font-semibold max-lg:hidden">{name}</h4>
							<h5 className="text-primary font-semibold lg:hidden max-sm:hidden">{name}</h5>
							<h6 className="text-primary font-semibold sm:hidden">{name}</h6>

							<button className="p-1 sm:p-2 bg-white rounded-full ml-auto self-start ">
								<AiOutlineClose />
							</button>
						</div>

						<div className="flex items-center gap-2 md:mt-2">
							<img src={Location} alt="/" className="w-3 sm:w-4" />
							<span className="max-sm:text-xs text-sm">{location}</span>
						</div>

						<div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-4">
							{specifications.map((spec) => (
								<span
									key={spec}
									className="px-3 py-1 md:px-6 md:py-2 bg-white max-sm:text-xs max-md:text-sm max-sm:font-medium"
								>
									{spec}
								</span>
							))}
						</div>
					</div>

					<div className="flex items-center gap-4">
						{price ? (
							<span className="px-3 py-1 md:px-6 md:py-2 bg-white font-medium lg:font-semibold max-sm:text-sm">
								{price}
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
						<Button
							variant={'plain'}
							size={'small'}
							className={'font-semibold max-sm:text-sm max-md:hidden'}
						>
							Show contact{' '}
						</Button>
						<Button
							variant={'plain'}
							size={'small'}
							className={'font-semibold max-sm:text-sm max-md:hidden'}
						>
							Send Message
						</Button>
					</div>
				</div>
			</div>

			<div className="w-full flex items-center md:hidden divide-x-2 divide-gray-200">
				<Button variant={'plain'} size={'small'} className={`font-semibold max-sm:text-sm flex-1`}>
					Show contact{' '}
				</Button>
				<Button variant={'plain'} size={'small'} className={`font-semibold max-sm:text-sm flex-1`}>
					Send Message
				</Button>
			</div>
		</div>
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
