import { useSearchParams } from 'react-router-dom';
import FilterForm from './FilterForm';
import { useQueryClient } from 'react-query';
import { queryStrings } from '../../../../constants';
import { getPreviousSearchParams } from '../../../../utils';

const SideBar = ({ displayCategories, categoryId, setCategoryId }) => {
	// const queryClient = useQueryClient();
	const [searchParams, setSearchParams] = useSearchParams();
	console.log(searchParams);

	return (
		<div className="">
			<div className="">
				<header className="bg-primary p-2 text-2xl font-semibold text-white tracking-tighter line-clamp-1">
					Categories
				</header>
				<div className="flex flex-col border-2 border-gray-300 p-2 text-lg border-t-0 gap-y-1">
					{displayCategories !== null &&
						displayCategories?.map((cat, index) => (
							<span
								key={index}
								className={`border border-red-500 hover:text-primary hover:underline hover:font-bold ease-in cursor-pointer tracking-tighter line-clamp-1 ${
									cat.category === categoryId ? 'text-primary font-semibold' : ''
								}`}
								onClick={() => {
									setCategoryId(cat.category);

									let previousParams = getPreviousSearchParams(searchParams);

									previousParams = {
										...previousParams,
										[queryStrings.subCategory]: cat.category,
									};

									setSearchParams(previousParams, { replace: true });
									// queryClient.invalidateQueries({
									// 	queryKey: ['all-product'],
									// });
								}}
							>
								{cat.name} ({cat.amount})
							</span>
						))}
				</div>
			</div>

			<FilterForm
				// setSearchParams={setSearchParams}
				// setCategoryId={setCategoryId}
				categoryId={categoryId}
			/>
		</div>
	);
};

export default SideBar;
