import { Banner } from '../../components';
import { Approutes } from '../../constants';
// import { Button } from '../../ui';
import Hero from './Hero';
import RowContainer from './RowContainer';
import { useProduct } from '../../hooks';
const Home = () => {
    const { data } = useProduct();

    return (
        <>
            <Banner />
            <Hero />
            <RowContainer
                title={'Featured Ads'}
                link={Approutes.product.initial}
                data={data?.ads?.slice(0, 12)}
            />
        </>
    );
};

export default Home;
