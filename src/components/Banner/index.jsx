import { Modal } from '../../ui';
import { useState } from 'react';
import TermsAndCondition from '../TermsAndCondition';

const Banner = ({ children, className }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<section className={`${className && className}  w-full py-2 bg-secondary`}>
			{children ? (
				children
			) : (
				<div className="flex flex-wrap items-center justify-center space-x-2 text-center">
					<p className="font-bold">Did you know?</p>
					<p>You can own an online store customized for your product?</p>
					<span
						onClick={() => setIsOpen(true)}
						className="cursor-pointer text-black/60 hover:text-black hover:underline"
					>
						learn more
					</span>
				</div>
			)}

			<Modal isOpen={isOpen} setIsOpen={setIsOpen} headerText="Terms of Service">
				<TermsAndCondition setIsOpen={setIsOpen} isOpen={isOpen} />
			</Modal>
		</section>
	);
};

export default Banner;
