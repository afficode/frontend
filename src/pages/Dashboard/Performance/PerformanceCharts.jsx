import ReactEcharts from 'echarts-for-react';
import { PerformanceArrowUp } from '../../../assets/svgs';

const PerformanceCharts = () => {
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
				data: [
					{
						value: 120,
						itemStyle: {
							color: '#2686CE',
						},
					},
					{
						value: 200,
						itemStyle: {
							color: '#047F73',
						},
					},
					{
						value: 150,
						itemStyle: {
							color: '#EBBA16',
						},
					},
					{
						value: 80,
						itemStyle: {
							color: '#B50444',
						},
					},
					{
						value: 70,
						itemStyle: {
							color: '#FFB6B6',
						},
					},
					{
						value: 120,
						itemStyle: {
							color: '#da4848',
						},
					},

					{
						value: 170,
						itemStyle: {
							color: '#3929ca',
						},
					},
				],
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
		<div className="my-6 flex flex-col  gap-6">
			{/* priducts table  */}
			<div>
				<h4>Products Activities Chart</h4>
				<p>Monitor this chart regularly to make informed decisions</p>

				<div className="w-full mt-4 overflow-auto border border-black/40">
					<table className="table ">
						<thead className="bg-gray-200 text-black text-sm font-medium">
							<tr>
								<th>Product(s)</th>
								<th className="text-center">Impression/ Views</th>
								<th className="text-center">Chats</th>
								<th className="text-center">Grabs</th>
							</tr>
						</thead>
						<tbody>
							{tableData.map((item, i) => (
								<tr key={i} className="font-medium whitespace-nowrap ">
									<td>{item.product}</td>
									<td className="text-primary text-center">[ {item.views} ]</td>
									<td className="text-primary text-center">[ {item.chats} ]</td>
									<td className="text-primary text-center">[ {item.grabs} ]</td>
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

				<div className="w-full mt-4 flex items-center gap-4 sm:gap-8 sm:pl-12">
					<div>
						<img src={PerformanceArrowUp} className="h-[15rem] " alt="/" />
					</div>
					<div className="location-table space-y-2 ">
						{monthlyPerformanceData.map((item, i) => (
							<div key={i} className="location-row rounded-2xl flex justify-between py-3 px-6">
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
