import { Suzuki } from '../../../assets/images';
import { CameraWhite } from '../../../assets/svgs';
import { Button } from '../../../ui';

const AdCard = () => {
	return (
		<div className="bg-gray-200 w-fit">
			{/* image  */}
			<div className="max-w-[22rem] h-16rem] relative">
				<img src={Suzuki} alt="/" className="h-full w-full object-fit" />
				<div className="absolute bottom-0 w-full bg-black/60 flex gap-2 items-center p-2">
					<img src={CameraWhite} alt="/" className="w-4" />
					<span className="text-white">12</span>
				</div>
				<span className="absolute top-4 right-4 text-white font-semibold bg-[#047F73] py-2 px-4 rounded-xl text-center border-4 border-white max-sm:text-sm">
					Active
				</span>
			</div>

			{/* details  */}
			<div className="flex flex-col justify-between px-3 py-2 ">
				<div className="">
					<h4>Suzuki Bike</h4>
					<span className="block text-primary max-sm:text-sm"># 1,500,00.00</span>
					<span className="mt-3  max-sm:text-sm">
						Promoted till: <b>01/10</b>
					</span>
				</div>

				<div className="flex justify-between mt-6">
					<div className="bg-white py-3 pl-3 pr-5 space-y-1 max-sm:text-sm">
						<div>
							<span>Reach:</span> <b>2,000</b>
						</div>
						<div>
							<span>Clicks:</span> <b>500</b>
						</div>
						<div>
							<span>Phone Views:</span> <b>13</b>
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
						<Button variant={'secondary'} size={'small'} className={' rounded-lg '}>
							Promote
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdCard;
