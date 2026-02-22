import { categoryData } from '../../../constants/Category';
import CategoryCard from './CategoryCard';
import { ScrollToTop } from '../../../utils';
import { SEO } from '../../../components';
import { Approutes, frontendLink, WELCOME_BOONFU_IMAGE } from '../../../constants';

const index = () => {
    return (
        <div className='flex items-center justify-evenly flex-wrap gap-4 cursor-pointer'>
            {categoryData.map((category, index) => (
                <CategoryCard category={category} key={index} />
            ))}
            <ScrollToTop />
            <SEO
                title='Advertisement Categories'
                description={`Browse through various advertisement categories ${categoryData.map((category) => category.name).join(', ')} to find the products and services you need. From electronics to vehicles, explore our diverse range of categories tailored to your interests.`}
                image={WELCOME_BOONFU_IMAGE}
                url={`${frontendLink.slice(-1) === '/' ? frontendLink.slice(0, -1) : frontendLink}${Approutes.product.category}`}
                keywords={[...categoryData.map((category) => category.name)]}
            />
        </div>
    );
};

export default index;
