const ProductStats = () => {
	return (
		<div className="w-full">
			<div className="flex gap-1 rounded-lg mx-auto">
				<Pallet color="primary" title="Total Shop Visitor" stat="9,420" className="rounded-l-2xl " />
				<Pallet color="secondary" title="Total Chats" stat="822" />
				<Pallet color="primary" title="Total Sales" stat="25" className="rounded-r-2xl " />
			</div>

			<div className="flex gap-4 mt-4">
				<div className="flex-1 bg-gray-200 self-end text-center">
					<h4 className="py-5">Total Products</h4>
				</div>
				<div className=" h-[7rem] border border-black/60 flex-1 mb-3 text-center flex flex-col justify-center rounded-2xl">
					<h4>Total Products</h4>
					<h4>[ 40 ]</h4>
				</div>
			</div>

			<div className="bg-gray-200 flex">
				<div className="flex flex-col gap-4 items-center flex-1 py-6 px-4">
					<p className="font-bold text-[#047F73]">Active</p>
					<span className="py-2 max-sm:px-4 px-10 bg-white text-center rounded-lg">
						<p className="text-primary font-semibold">[ 10 ]</p>
					</span>
				</div>
				<div className="flex flex-col gap-4 items-center flex-1 py-6 px-4">
					<p className="font-bold">Expired</p>
					<span className="py-2 max-sm:px-4 px-10 bg-white text-center rounded-lg">
						<p className="text-primary font-semibold">[ 5 ]</p>
					</span>
				</div>
				<div className="flex flex-col gap-4 items-center flex-1 py-6 px-4">
					<p className="font-bold text-[#B50444]">Sold</p>
					<span className="py-2 max-sm:px-4 px-10 bg-white text-center rounded-lg">
						<p className="text-primary font-semibold">[ 25 ]</p>
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
			<p className="sm:p-lg text-center">{title}</p>
			<p className="sm:p-lg">[ {stat} ]</p>
		</div>
	);
};
