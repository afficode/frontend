import FilterForm from './FilterForm';
import { useQueryClient } from 'react-query';

const SideBar = ({ displayCategories, categoryId, setCategoryId, setSearchParams }) => {
	const queryClient = useQueryClient();
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
								className={`hover:text-primary hover:underline hover:font-bold ease-in cursor-pointer tracking-tighter line-clamp-1 ${
									cat.category === categoryId ? 'text-primary font-semibold' : ''
								}`}
								onClick={() => {
									setCategoryId(cat.category);
									setSearchParams({ category: cat.category });
									queryClient.invalidateQueries({
										queryKey: ['all-product'],
									});
								}}
							>
								{cat.name} ({cat.amount})
							</span>
						))}
				</div>
			</div>

			<FilterForm
				setSearchParams={setSearchParams}
				categoryId={categoryId}
				setCategoryId={setCategoryId}
			/>
		</div>
	);
};

export default SideBar;
