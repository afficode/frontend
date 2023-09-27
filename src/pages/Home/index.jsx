import { Banner } from '../../components';
import { Button } from '../../ui';
import Hero from './Hero';
import RowContainer from './RowContainer';

const Home = () => {
	return (
		<>
			<Banner />
			<Hero />
			<RowContainer title={'Shops'} />
			<RowContainer title={'Featured Products'} />
			<div className="p-6">
				<Button variant={'styled'}>Other Shops by K.Stitches</Button>
			</div>
		</>
	);
};

export default Home;
