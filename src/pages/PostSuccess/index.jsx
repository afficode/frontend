import { Link, useParams } from 'react-router-dom';
import { Button } from '../../ui';
import { Approutes } from '../../constants';
import { ScrollToTop } from '../../utils';

const PostSuccess = () => {
	const { adId } = useParams();

	return (
		<section className="h-[calc(100vh-6.7rem)] w-full flex flex-col justify-center gap-16">
			<div className="mx-auto text-center">
				<h1>Congratulations!</h1>
				<h5 className="underline">Your advert was created successfully</h5>
			</div>

			<div className="mx-auto flex items-center gap-6">
				<Link to={`${Approutes.product.initial}/${adId}}`}>
					<Button variant={'secondary'}>View ad</Button>
				</Link>
				<Link to={Approutes.postDecision}>
					<Button variant={'primary'}>Post new ad</Button>
				</Link>
				<Link to={Approutes.home}>
					<Button variant={'grey'}>Close</Button>
				</Link>
			</div>

			<ScrollToTop />
		</section>
	);
};

export default PostSuccess;
