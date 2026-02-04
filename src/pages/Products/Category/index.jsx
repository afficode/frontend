import { categoryData } from '../../../constants/Category';
import CategoryCard from './CategoryCard';
import { ScrollToTop } from '../../../utils';

const index = () => {
    return (
        <div className="flex items-center justify-evenly flex-wrap gap-4 cursor-pointer">
            {categoryData.map((category, index) => (
                <CategoryCard category={category} key={index} />
            ))}
            <ScrollToTop />
        </div>
    );
};

export default index;
