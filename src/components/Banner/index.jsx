import { Link } from 'react-router-dom';

const Banner = () => {
	return (
		<section className="w-full py-2 bg-yellow flex flex-wrap items-center justify-center space-x-2">
			<p className="font-bold">Did you know?</p>
			<p>You can own an online store customized for your product?</p>
			<Link className="text-black/60 cursor-pointer hover:text-black hover:underline">learn more</Link>
		</section>
	);
};

export default Banner;
