import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../ui';
import { Approutes } from '../../constants';
import { IoIosArrowRoundBack } from 'react-icons/io';

const UnderConstruction = () => {
	const navigate = useNavigate();
	return (
		<section className="h-[calc(100vh-6.7rem)] w-full grid place-content-center under_construction">
			<div className="z-40 flex flex-col justify-center gap-16 ">
				<div className="mx-auto text-center z-100 ">
					<h2 className="drop-shadow-lg">Page Under Construction</h2>
					<h6 className="drop-shadow-lg">
						The page you are looking for is under construction. <br /> Check back later...
					</h6>
				</div>

				<div className="mx-auto flex items-center gap-6">
					<Button
						variant={'secondary'}
						size={'small'}
						className={'flex items-center gap-2'}
						onClick={() => navigate(-1)}
					>
						<IoIosArrowRoundBack />
						Go back
					</Button>
					<Link to={Approutes.home}>
						<Button variant={'primary'} size={'small'}>
							Take me home
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default UnderConstruction;
