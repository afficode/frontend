// import { Modal } from '../../ui';
// import { useState } from 'react';
// import TermsAndCondition from '../TermsAndCondition';
import { Link } from 'react-router-dom';
import { Approutes } from '../../constants';

const Banner = ({ children, className }) => {
	// const [isOpen, setIsOpen] = useState(false);

	return (
		<section className={`${className && className}  w-full p-2 bg-secondary`}>
			{children ? (
				children
			) : (
				<div className="flex flex-wrap items-center justify-center space-x-2 text-center">
					{/* <p className="font-bold">Did you know?</p> */}
					<p>
						Learn more about our <span className="font-bold">GRAB FEATURE </span>, You can use the feature
						or become a <span className="font-bold">GRABBER</span>, too.!
					</p>
					<Link
						to={Approutes.grab.home}
						className="cursor-pointer text-black/60 hover:text-black underline"
					>
						Click here
					</Link>
				</div>
			)}

			{/* <Modal isOpen={isOpen} setIsOpen={setIsOpen} headerText="Terms of Service">
				<TermsAndCondition setIsOpen={setIsOpen} isOpen={isOpen} />
			</Modal> */}
		</section>
	);
};

export default Banner;
