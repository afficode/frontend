import { Link } from 'react-router-dom';

const Banner = ({ children, className }) => {
	return (
		<section
			className={`${className} flex flex-wrap items-center justify-center w-full py-2 space-x-2 text-center bg-secondary`}
		>
			{children ? (
				children
			) : (
				<>
					<p className="font-bold">Did you know?</p>
					<p>You can own an online store customized for your product?</p>
					<Link className="cursor-pointer text-black/60 hover:text-black hover:underline">
						learn more
					</Link>
				</>
			)}
		</section>
	);
};

export default Banner;
