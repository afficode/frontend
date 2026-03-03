import { categoryData } from '../../constants/Category';
import CategoryCard from './CategoryCard';
import { SEO } from '../../components';
import { Approutes, frontendBaseUrl } from '../../constants';
import { ScrollToTop } from '../../utils';

const index = () => {
    return (
        <div className='flex items-center justify-evenly flex-wrap gap-4 cursor-pointer m'>
            {categoryData.map((category, index) => (
                <CategoryCard category={category} key={index} />
            ))}
            <SEO
                title='Advert categories'
                description='Advert categories in Boonfu'
                url={`${frontendBaseUrl}${Approutes.postAd}`}
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

            <ScrollToTop />
        </div>
    );
};

export default index;
