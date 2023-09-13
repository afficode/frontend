import { Banner } from '../../components';
import Hero from './Hero';
import RowContainer from './RowContainer';

const Home = () => {
	return (
		<>
			<Banner />
			<Hero />
			<RowContainer title={'Shops'} />
			<RowContainer title={'Featured Products'} />
		</>
	);
};

export default Home;
