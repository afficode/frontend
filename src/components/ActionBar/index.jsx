const ActionBar = (ad) => {
	return (
		<div className="">
			<div className="flex items-center justify-between px-6 py-2 bg-primary text-white">
				<div className="flex items-center gap-1">
					<p className="font-light text-sm">Views:</p>
					<b>{ad.views}</b>
				</div>
				<div className="flex items-center gap-1">
					<p className="font-light text-sm">Clicks:</p>
					<b>250</b>
				</div>
				<div className="flex items-center gap-1">
					<p className="font-light text-sm">Phone Views:</p>
					<b>25</b>
				</div>
				<div className="flex items-center gap-1">
					<p className="font-light text-sm">Chats:</p>
					<b>50</b>
				</div>
			</div>

			<div className="flex justify-between items-center border px-6 py-2">
				<div className="flex gap-6">
					<button className="text-primary font-bold">Edit</button>
					<button className="text-[#047F73] font-bold">Repost</button>
				</div>

				<div className="flex gap-6 ">
					<button className="text-[#D60949] font-bold">Delete</button>
				</div>
			</div>
		</div>
	);
};

export default ActionBar;
