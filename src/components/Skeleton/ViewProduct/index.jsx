import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ScrollToTop } from '../../../utils';

const Index = () => {
	return (
		<div className="w-full">
			<div className="w-full flex items-start justify-start  px-2 md:px-0">
				<Skeleton className=" mt-2" duration={2.5} height={25} width={100} />
				<span className="mx-2 my-auto">&gt;</span>
				<Skeleton className="mt-2" duration={2.5} height={25} width={100} />
				<span className="mx-2 my-auto">&gt;</span>
				<Skeleton className="mt-2" duration={2.5} height={25} width={100} />
			</div>
			{/* breadcrumbs */}
			{/* main and aside */}
			<div className="flex w-full my-2 px-2 md:px-0">
				<section className="w-full flex flex-col md:flex-row gap-2 md:gap-8">
					<main className="w-full md:w-[60%] xl:w-[70%] flex flex-col lg:mt-4">
						<Skeleton className="w-full p-2 mb-2 lg:mb-6" duration={2.5} height={60} />
						<Skeleton height={400} className=" w-full h-[200px] object-cover" duration={3.0} />{' '}
					</main>
					<aside className="w-full md:w-[40%] xl:w-[30%] border-2 border-gray-200 p-2 lg:p-4">
						<Skeleton height={500} className=" w-full h-[200px] object-cover" duration={3.0} />{' '}
					</aside>
				</section>
			</div>
			{/* below */}
			<div className="w-full  p-4 my-4">
				{/* description */}
				<Skeleton className="w-full mb-2 lg:mb-4" duration={2.5} height={100} />
				{/* overview */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
					{Array(8)
						.fill(1)
						.map((_) => (
							<Skeleton className="px-2 w-full" duration={2.5} height={50} />
						))}
				</div>
			</div>
			<ScrollToTop />
		</div>
	);
};

export default Index;
