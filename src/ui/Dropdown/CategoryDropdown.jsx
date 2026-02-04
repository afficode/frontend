import { Approutes } from '../../constants';

const CategoryDropdown = ({ category, subCategories }) => {
    return (
        <div
            tabIndex={0}
            className={`${category.includes('CARS') ? 'transform ' : ''} ${category.includes('PROPERTY') ? 'transform -translate-x-[15%] md:-translate-x-[25%]' : ''
            } ${category.includes('SERVICES') ? 'transform -translate-x-[35%] lg:h-[15rem]' : ''}  ${category.includes('AGRICULTURE') ? 'transform -translate-x-[55%]' : ''
            }  ${category.includes('ELECTRONICS') ? 'transform -translate-x-[80%] md:-translate-x-[85%]' : ''
            } dropdown-content  min-h-[10rem]  w-[16rem] md:w-auto z-10 p-2 lg:py-6  lg:px-6 bg-white shadow-md rounded-md`}
        >
            <h5 className="font-semibold max-md:whitespace-normal">Browse sub-category in: {category}</h5>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-[0.1rem] menu max-h-full w-full md:w-[35rem]  py-4 ">
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
