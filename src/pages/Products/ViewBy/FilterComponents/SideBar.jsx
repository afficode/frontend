import { useSearchParams } from 'react-router-dom';
import FilterForm from './FilterForm';
import { queryStrings } from '../../../../constants';

const SideBar = ({ displayCategories, currentCategoryId }) => {
	const [, setSearchParams] = useSearchParams();

	const handleCategoryChange = (newCategoryId) => {
		const newParams = {
			[queryStrings.subCategory]: newCategoryId,
			[queryStrings.page]: '1',
		};

		setSearchParams(newParams, { replace: true });
	};

	return (
		<div>
			<div>
				<header className="bg-primary p-2 text-xl font-semibold text-white tracking-tighter line-clamp-1">
					Categories
				</header>
				<div className="flex flex-col border-2 border-gray-300 p-2 text-sm sm:text-base border-t-0 gap-y-1">
					{displayCategories !== null &&
						displayCategories?.map((cat, index) => (
							<span
								key={index}
								className={`hover:text-primary hover:underline hover:font-bold ease-in cursor-pointer tracking-tighter line-clamp-1 ${
									cat.category === currentCategoryId ? 'text-primary font-semibold' : ''
								}`}
								onClick={() => handleCategoryChange(cat.category)}
							>
								{cat.name} ({cat.amount})
							</span>
						))}
				</div>
			</div>

			<FilterForm categoryId={currentCategoryId} />
		</div>
	);
};

export default SideBar;
