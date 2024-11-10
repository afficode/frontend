import React from 'react';

const InquiryChat = ({ ad }) => {
	return (
		<div>
			<div className="bg-white max-w-[500px] flex items-center justify-center   py-12">
				<div className="space-y-8">
					<h3>About Item</h3>

					<div className=" grid grid-cols-2 ">
						<div className="space-y-3">
							<p className="font-bold">Item name</p>
							<p className="font-bold">Availability</p>
							<p className="font-bold">Negotiable?</p>
							<p className="font-bold">Delivery Type:</p>
						</div>
						<div className="space-y-3">
							<p className="capitalize">{ad?.title}</p>
							<p className="capitalize">{ad?.active === '1' ? 'Available' : 'Not Available'}</p>
							<p className="capitalize">{ad?.negotiable === 1 ? 'Yes' : 'no'}</p>
							<div className="bg-[#D9D9D9] px-4 py-1 rounded-xl">Boonfu Delivery ONLY</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InquiryChat;
