import { Banner } from '../../components';
import Hero from './Hero';
import RowContainer from './RowContainer';

const Welcome = () => {
	return (
		<>
			<Banner />
			<Hero />
			<RowContainer title={'Categories'} />
			<RowContainer title={'Shops'} />
			<RowContainer title={'Discover more...'} />
		</>
	);
};

export default Welcome;
