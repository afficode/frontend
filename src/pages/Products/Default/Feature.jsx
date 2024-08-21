import React from 'react';

const Feature = ({ feature }) => {
	return (
		<div
			className={`w-[70%] absolute top-5 -ml-0.5  text-center uppercase text-black rounded-r-sm font-semibold`}
		>
			<div className="relative">
				<svg
					width="100%"
					height="100%"
					viewBox="0 0 2234 363"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className=""
				>
					<path
						d="M1819.3 186.812L2185.34 352.5H10.5V10.5H2183.21L1819.46 167.607L1797.67 177.021L1819.3 186.812Z"
						fill="#EBBA16"
						stroke="black"
						strokeWidth="21"
					/>
				</svg>
				<span className="text-left absolute top-1 left-0 ml-3">
					{feature == '1' ? 'FEATURED' : 'SPOTLIGHT'}
				</span>
			</div>
		</div>
	);
};

export default Feature;
