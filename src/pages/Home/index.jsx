import { Banner, SEO } from '../../components';
import { Approutes } from '../../constants';
// import { Button } from '../../ui';
import Hero from './Hero';
import RowContainer from './RowContainer';
import { useProduct } from '../../hooks';
const Home = () => {
    const { data, isLoading } = useProduct();

    return (
        <>
            <Banner />
            <Hero />
            <RowContainer
                title={'Featured Ads'}
                link={Approutes.product.initial}
                data={data?.ads?.slice(0, 12)}
                isLoading={isLoading}
            />
            <SEO />
        </>
    );
};

export default Home;
