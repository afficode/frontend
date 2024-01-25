import ReactEcharts from 'echarts-for-react';
import { PerformanceArrowUp } from '../../../assets/svgs';
import { useState } from 'react';

const PerformanceCharts = ({ adsData }) => {
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

	const barColors = ['#2686CE', '#047F73', '#EBBA16', '#B50444', '#FFB6B6', '#da4848', '#3929ca'];

	const data = [
		chartData.map((item) => {
			return {
				value: item.account_interaction,
				color: barColors[Math.floor(Math.random() * barColors.length)],
			};
		}),
	];

	// console.log(data[0]);

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

	return (
		<div className="flex flex-col gap-6 my-6">
			{/* priducts table  */}
			<div>
				<h4>Products Activities Chart</h4>
				<p>Monitor this chart regularly to make informed decisions</p>

				<div className="w-full mt-4 overflow-auto border border-black/40">
					<table className="table ">
						<thead className="text-sm font-medium text-black bg-gray-200">
							<tr>
								<th>Product(s)</th>
								<th className="text-center">Impression/ Views</th>
								<th className="text-center">Chats</th>
								<th className="text-center">Grabs</th>
							</tr>
						</thead>
						<tbody>
							{adsData?.ads_summary.map((ad) => (
								<tr key={ad.id} className="font-medium whitespace-nowrap ">
									<td className="capitalize">{ad.name}</td>
									<td className="text-center text-primary">[ {ad.views} ]</td>
									<td className="text-center text-primary">[ {ad.chats} ]</td>
									<td className="text-center text-primary">[ 4 ]</td>
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

const tableData = [
	{
		product: 'Toyota Corolla ‘07',
		views: '1023',
		chats: '20',
		grabs: '18',
	},
	{
		product: 'Toyota Corolla ‘07',
		views: '1023',
		chats: '20',
		grabs: '18',
	},
	{
		product: 'Toyota Corolla ‘07',
		views: '1023',
		chats: '20',
		grabs: '18',
	},
	{
		product: 'Toyota Corolla ‘07',
		views: '1023',
		chats: '20',
		grabs: '18',
	},
];

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

/* 
	monthly performance data = [
		{
			date: "Jan 2023",
			account_interaction: "30%",
		},
		{
			date: "May 2023",
			account_interaction: "25%",
		},
		{
			date: "Feb 2023",
			account_interaction: "18%",
		},
		{
			date: "Aug 2023",
			account_interaction: "15%",
		},
		{
			date: "Jan 2023",
			account_interaction: "12%",
		},
	]
*/

/*
barchart data = [
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
	],
*/
