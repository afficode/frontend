import { Link } from 'react-router-dom';

const Dropdown = ({ category, subCategories }) => {
	return (
		<div
			tabIndex={0}
			className={`${category.includes('CARS') ? 'transform -translate-x-1/4' : ''} ${
				category.includes('PROPERTY') ? 'transform -translate-x-1/2' : ''
			} ${
				category.includes('SERVICES') ? 'transform -translate-x-2/3' : ''
			} dropdown-content  min-h-[20rem] lg:h-[20rem] w-auto max-md:min-w-[300px] z-[5] p-4 lg:py-6  lg:px-12 bg-white shadow-md rounded-sm`}
		>
			<h5 className="font-semibold max-md:whitespace-normal">Browse sub-category in: {category}</h5>
			<ul className="flex flex-col gap-[0.1rem] menu max-h-full w-full md:min-w-[40rem] py-4 ">
				{subCategories.map((subCategory) => (
					<Link to={subCategory.link} key={subCategory.name}>
						<li className="max-sm:text-base text-lg lg:pr-12 hover:underline capitalize whitespace-normal">
							{subCategory.name}
						</li>
					</Link>
				))}
			</ul>
		</div>
	);
};

export default Dropdown;
