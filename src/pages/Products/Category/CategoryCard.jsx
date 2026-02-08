import { Link } from 'react-router-dom';
import { getCategoryName } from '../../../utils';

const CategoryCard = ({ category }) => {
	const { id, name, image } = category;
	return (
		<Link to={`/product/category/${getCategoryName(id)}`} className='max-w-[370px] max-h-[370px] shadow-lg my-2 hover:bg-gray-100'>
			<img src={image} alt={name} className='h-[250px] w-[370px]' />
			<p className='text-lg py-4 pl-2 tracking-tighter line-clamp-1 lg:text-2xl font-semibold '>{name}</p>
		</Link>
	);
};

export default CategoryCard;
