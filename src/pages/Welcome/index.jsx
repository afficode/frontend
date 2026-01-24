import { Banner } from '../../components';
import { Approutes } from '../../constants';
import Hero from './Hero';
import RowContainer from './RowContainer';

const Welcome = () => {
	return (
		<>
			<Banner />
			<Hero />
			<RowContainer title={'Categories'} link={Approutes.product.category} />
			<RowContainer title={'Discover more...'} link={Approutes.product.initial} />
		</>
	);
};

export default Welcome;
