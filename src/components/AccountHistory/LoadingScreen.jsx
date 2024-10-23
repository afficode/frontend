import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingScreen = () => {
	return (
		<div className="w-full flex flex-col space-y-4">
			<div className="flex items-center justify-center py-2 border-b border-b/5">
				<Skeleton height={20} width={250} />
			</div>

			<div className="space-y-4 border-b border-b/5 pb-4">
				<div className="flex justify-between items-center">
					<Skeleton height={30} width={200} />
					<Skeleton height={20} width={80} />
				</div>

				<div className="flex justify-between items-center">
					<div>
						<Skeleton height={15} width={140} />
						<Skeleton height={15} width={210} />
						<Skeleton height={15} width={100} />
					</div>
					<div>
						<Skeleton height={45} width={150} />
					</div>
				</div>
			</div>
			<div className="space-y-4 border-b border-b/5 pb-4">
				<div className="flex justify-between items-center">
					<Skeleton height={30} width={200} />
					<Skeleton height={20} width={80} />
				</div>

				<div className="flex justify-between items-center">
					<div>
						<Skeleton height={15} width={140} />
						<Skeleton height={15} width={210} />
						<Skeleton height={15} width={100} />
					</div>
					<div>
						<Skeleton height={45} width={150} />
					</div>
				</div>
			</div>
			{/* <div>
				<Skeleton height={40} width={250} />
				<Skeleton height={20} width={300} />
			</div>
			<div className="mt-10 w-full flex flex-col border border-gray-200 p-2">
				<Skeleton height={30} />
				<Skeleton height={30} />
				<Skeleton height={30} />
				<Skeleton height={30} />
				<Skeleton height={30} />
				<Skeleton height={30} />
			</div>
			<div>
				<Skeleton height={40} width={300} />
				<Skeleton height={20} width={250} />
			</div>
			<div className="mt-10 md:w-[500px] md:ml-[12rem] flex flex-col border border-gray-200 p-2">
				<Skeleton height={50} borderRadius={20} />
				<Skeleton height={50} borderRadius={20} />
				<Skeleton height={50} borderRadius={20} />
				<Skeleton height={50} borderRadius={20} />
				<Skeleton height={50} borderRadius={20} />
			</div>
			<div>
				<Skeleton height={40} width={300} />
			</div>
			<Skeleton height={200} /> */}
		</div>
	);
};

export default LoadingScreen;
