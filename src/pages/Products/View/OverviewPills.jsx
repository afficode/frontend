const OverviewPills = ({ overview, ad }) => {
	return (
		<div className="flex items-center justify-start p-2 text-black bg-white border border-l-4 border-l-primary ">
			<h6 className="my-auto font-bold tracking-tighter capitalize text-normal md:text-lg lg:tracking-normal">
				{overview?.name}:{' '}
			</h6>{' '}
			&emsp;
			<span className="my-auto tracking-tighter capitalize">
				{Array.isArray(overview?.value) ? (
					<ul className="ml-1 tracking-tighter list-disc list-inside lg:tracking-normal">
						{overview?.value.map((val, index) => (
							<li key={index}>{val}</li>
						))}
					</ul>
				) : isNaN(overview?.value) ? (
					<>
						{overview?.value
							.split(' ')
							.map((val) => val[0].toUpperCase() + val.substring(1))
							.join(' ')}
					</>
				) : (
					<>
						{ad?.category.toString()?.startsWith('51') && overview?.param === 'size' ? (
							<span>
								{`${overview?.value}`} m<sup>2</sup>
							</span>
						) : (
							overview.value
						)}
					</>
				)}
			</span>
		</div>
	);
};

export default OverviewPills;
