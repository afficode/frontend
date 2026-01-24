const ProductStats = ({ adsData }) => {
	return (
		<div className="w-full">
			<div className="flex gap-1 mx-auto rounded-lg">
				<Pallet color="primary" title="Total Shop Visitor" stat="9,420" className="rounded-l-2xl " />
				<Pallet color="secondary" title="Total Chats" stat={adsData?.chats} />
				<Pallet
					color="primary"
					title="Total Sales"
					stat={adsData?.sold_ads || 0}
					className="rounded-r-2xl "
				/>
			</div>

			<div className="flex gap-4 mt-4">
				<div className="self-end flex-1 text-center bg-gray-200">
					<h4 className="py-5">Total Ads</h4>
				</div>
				<div className=" h-[7rem] border border-black/60 flex-1 mb-3 text-center flex flex-col justify-center rounded-2xl">
					<h4>Total Ads</h4>
					<h4>[ {adsData?.total_ads || 0} ]</h4>
				</div>
			</div>

			<div className="flex bg-gray-200">
				<div className="flex flex-col items-center flex-1 gap-4 px-4 py-6">
					<p className="font-bold text-[#047F73]">Active</p>
					<span className="px-10 py-2 text-center bg-white rounded-lg max-sm:px-4">
						<p className="font-semibold text-primary">[ {adsData?.active_ads || 0} ]</p>
					</span>
				</div>
				<div className="flex flex-col items-center flex-1 gap-4 px-4 py-6">
					<p className="font-bold">Blocked</p>
					<span className="px-10 py-2 text-center bg-white rounded-lg max-sm:px-4">
						<p className="font-semibold text-primary">[ {adsData?.blocked_ads || 0} ]</p>
					</span>
				</div>
				<div className="flex flex-col items-center flex-1 gap-4 px-4 py-6">
					<p className="font-bold text-[#B50444]">Sold</p>
					<span className="px-10 py-2 text-center bg-white rounded-lg max-sm:px-4">
						<p className="font-semibold text-primary">[ {adsData?.sold_ads || 0} ]</p>
					</span>
				</div>
			</div>
		</div>
	);
};

export default ProductStats;

const Pallet = ({ color, title, stat, className }) => {
	return (
		<div
			className={`${className} ${
				color === 'primary' ? 'text-white' : 'text-black'
			} bg-${color} max-w-full h-[6rem] flex flex-col justify-center items-center flex-1 font-semibold`}
		>
			<p className="text-center sm:p-lg">{title}</p>
			<p className="sm:p-lg">[ {stat} ]</p>
		</div>
	);
};
