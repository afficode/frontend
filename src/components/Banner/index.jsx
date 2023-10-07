import { Button, Modal } from '../../ui';
import { useState } from 'react';

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
				<div className="space-y-6 text-justify">
					<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
						With less than a month to go before the European Union enacts new consumer privacy laws for
						its citizens, companies around the world are updating their terms of service agreements to
						comply.
					</p>
					<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
						The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25
						and is meant to ensure a common set of data rights in the European Union. It requires
						organizations to notify users as soon as possible of high-risk data breaches that could
						personally affect them.
					</p>

					<div className="text-center">
						<Button
							onClick={() => setIsOpen(!isOpen)}
							variant="primary"
							size="small"
							className="rounded-md"
						>
							Done 🙂
						</Button>
					</div>
				</div>
			</Modal>
		</section>
	);
};

export default Banner;
