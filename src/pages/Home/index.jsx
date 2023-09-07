import Hero from './Hero';
import RowContainer from './RowContainer';

const Home = () => {
	return (
		<>
			<Hero />
			<RowContainer title={'Shops'} />
			<RowContainer title={'Featured Products'} />
		</>
	);
};

export default Home;
