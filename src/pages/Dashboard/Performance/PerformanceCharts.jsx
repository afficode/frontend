import ReactEcharts from 'echarts-for-react';
import { PerformanceArrowUp } from '../../../assets/svgs';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Approutes } from '../../../constants';
import { FaEdit, FaTrash } from 'react-icons/fa';
// import { MdEditNote } from 'react-icons/md';
import { privateAxios } from '../../../utils';
import { useNotify } from '../../../hooks';
import { useQueryClient } from 'react-query';
import useAuth from '../../../context/UserContext';

const PerformanceCharts = ({ adsData }) => {
	const { user } = useAuth();
	const [chartData, setChartData] = useState([
		{
			day: 'Mon',
			account_interaction: 120,
		},
		{
			day: 'Tue',
			account_interaction: 200,
		},
		{
			day: 'Wed',
			account_interaction: 150,
		},
		{
			day: 'Thu',
			account_interaction: 80,
		},
		{
			day: 'Fri',
			account_interaction: 70,
		},
		{
			day: 'Sat',
			account_interaction: 120,
		},

		{
			day: 'Sun',
			account_interaction: 170,
		},
	]);

	const queryClient = useQueryClient();

	const barColors = ['#2686CE', '#047F73', '#EBBA16', '#B50444', '#FFB6B6', '#da4848', '#3929ca'];

	const data = [
		chartData.map((item) => {
			return {
				value: item.account_interaction,
				color: barColors[Math.floor(Math.random() * barColors.length)],
			};
		}),
	];

	const option = {
		tooltip: {},
		// legend: {},
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				name: 'Products',
				barWidth: '50%',
				type: 'bar',
				data: data[0].map((item) => {
					return {
						value: item.value,
						itemStyle: {
							color: item.color,
						},
					};
				}),

				itemStyle: {
					borderRadius: [20, 20, 0, 0],
				},
				// label: {
				// 	show: true,
				// 	position: 'top',
				// },
			},
		],
	};

	const notify = useNotify();

	const handleDelete = (id, ad) => {
		privateAxios
			.delete(`/ads/${id}`, {
				data: {
					applyPolicy: 'close',
					owner: user.id,
					created_at: ad.created_at,
				},
			})
			.then(async (res) => {
				queryClient.invalidateQueries({ queryKey: ['getUserAds'] });
				notify(res?.data.message, 'success');
			})
			.catch((error) => {});
	};

	return (
		<div className="flex flex-col gap-6 my-6">
			{/* priducts table  */}
			<div>
				<h4>Products Activities Chart</h4>
				<p>Monitor this chart regularly to make informed decisions</p>

				<div className="mt-4 overflow-x-auto bg-white border border-black/40 h-96">
					<table className="table table-pin-rows ">
						<thead className="text-sm font-medium text-white ">
							<tr className="bg-primary">
								<th>Product(s)</th>
								<th className="text-center">Impression/ Views</th>
								<th className="text-center">Chats</th>
								<th className="text-center">Grabs</th>
								<th className="text-center">Edit</th>
							</tr>
						</thead>
						<tbody>
							{adsData?.ads_summary &&
								adsData?.ads_summary
									.sort((a, b) => {
										if (a.id < b.id) return 1;
										if (a.id > b.id) return -1;
										return 0;
									})
									.map((ad) => (
										<tr key={ad.id} className="font-medium whitespace-nowrap hover:bg-gray-200">
											<td className="capitalize hover:underline hover:underline-offset-4">
												<Link
													to={`${Approutes.product.initial}/${ad.id}`}
													target="_blank"
													rel="noopener noreferrer"
												>
													{ad.name}
												</Link>
											</td>
											<td className="text-center text-primary">[ {ad.views} ]</td>
											<td className="text-center text-primary">[ {ad.chats} ]</td>
											<td className="text-center text-primary">[ 0 ]</td>
											<td className="flex justify-center text-center text-gray-600 gap-x-2">
												<span className="hover:text-primary ">
													<Link to={`${Approutes.updateAd}/${ad.id}`} target="_blank" rel="noopener noreferrer">
														<FaEdit />
													</Link>
												</span>{' '}
												|
												<span className="text-red-600 ">
													<FaTrash className="cursor-pointer" onClick={() => handleDelete(ad?.id, ad)} />
												</span>
											</td>
										</tr>
									))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Monthly perfomance table  */}
			<div>
				<h4>Monthly AD Performance</h4>
				<p>See hot spots for your products. </p>

				<div className="flex items-center w-full gap-4 mt-4 sm:gap-8 sm:pl-12">
					<div>
						<img src={PerformanceArrowUp} className="h-[15rem] " alt="/" />
					</div>
					<div className="space-y-2 location-table ">
						{monthlyPerformanceData.map((item, i) => (
							<div key={i} className="flex justify-between px-6 py-3 location-row rounded-2xl">
								<div className="flex gap-8">
									{' '}
									<span style={{ background: item.color }} className="w-5 h-5 m-auto rounded-full" />{' '}
									<p>{item.state}</p>
								</div>
								<p>{item.stat}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* performance chart */}
			<div>
				<h4>Performance </h4>

				<ReactEcharts option={option} />
			</div>
		</div>
	);
};

export default PerformanceCharts;

const monthlyPerformanceData = [
	{
		color: '#2686CE',
		state: 'Jan, 2023',
		stat: '38%',
	},
	{
		color: '#047F73',
		state: 'May, 2023',
		stat: '21%',
	},
	{
		color: '#EBBA16',
		state: 'August, 2023',
		stat: '15%',
	},
	{
		color: '#B50444',
		state: 'Feb, 2023',
		stat: '14%',
	},
	{
		color: '#FFB6B6',
		state: 'July, 2023',
		stat: '12%',
	},
];
