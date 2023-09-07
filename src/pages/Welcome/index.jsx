import Hero from './Hero';
import RowContainer from './RowContainer';

const Welcome = () => {
	return (
		<>
			<Hero />
			<RowContainer title={'Categories'} />
			<RowContainer title={'Shops'} />
			<RowContainer title={'Discover more...'} />
		</>
	);
};

export default Welcome;
