import { Approutes } from '../../constants';

const CategoryDropdown = ({ category, subCategories }) => {
	return (
		<div
			tabIndex={0}
			className={`${category.includes('CARS') ? 'transform -translate-x-1/4' : ''} ${
				category.includes('PROPERTY') ? 'transform -translate-x-1/2' : ''
			} ${category.includes('SERVICES') ? 'transform -translate-x-2/3' : ''}  ${
				category.includes('AGRICULTURE') ? 'transform -translate-x-2/3' : ''
			}  ${
				category.includes('ELECTRONICS') ? 'transform -translate-x-[85%]' : ''
			} dropdown-content  min-h-[20rem] lg:h-[20rem] w-auto max-md:min-w-[300px] z-10 p-4 lg:py-6  lg:px-12 bg-white shadow-md rounded-md`}
		>
			<h5 className="font-semibold max-md:whitespace-normal">Browse sub-category in: {category}</h5>
			<ul className="flex flex-col gap-[0.1rem] menu max-h-full w-full md:min-w-[40rem] py-4 ">
				{subCategories.map((subCategory) => (
					<a href={`${Approutes.product.category}/${btoa(subCategory.id)}`} key={subCategory.id}>
						<li className="text-lg capitalize whitespace-normal max-sm:text-base lg:pr-12 hover:underline">
							{subCategory.name}
						</li>
					</a>
				))}
			</ul>
		</div>
	);
};

export default CategoryDropdown;
