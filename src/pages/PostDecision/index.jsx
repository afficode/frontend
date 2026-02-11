import { categoryData } from '../../constants/Category';
import CategoryCard from './CategoryCard';
import { SEO } from '../../components';
import { Approutes } from '../../constants';

const index = () => {
    return (
        <div className="flex items-center justify-evenly flex-wrap gap-4 cursor-pointer m">
            {categoryData.map((category, index) => (
                <CategoryCard category={category} key={index} />
            ))}
            <SEO
                title="Advert categories"
                description="Advert categories in Boonfu"
                url={`https://boonfu.com${Approutes.postAd}`}
                keywords={[
                    'Advert Categories',
                    'advertisement',
                    'sell',
                    'marketing',
                    'C2C',
                    'Car',
                    'real estate',
                    'Buy',
                    ...categoryData.map((category) => category.name),
                ]}
            />
        </div>
    );
};

export default index;
