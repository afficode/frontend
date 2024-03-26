import React from 'react';
import { GrabIcon, GrabSave } from '../../../assets/svgs';
import { Car, Gown, Rolex, Sneakers } from '../../../assets/images';
import { Button } from '../../../ui';

const GrabProducts = () => {
	return (
		<section>
			<div className="flex justify-between py-2 border-b border-black/30">
				<h3 className="">Grabber’s Products Page</h3>
			</div>

			<div className="flex flex-wrap items-center justify-between gap-6 my-6 h-[30rem] overflow-auto">
				{data.map((item, i) => (
					<div key={i} className="relative flex mx-auto flex-col w-[250px] bg-white border ">
						<button>
							<img src={GrabSave} alt="/" className="absolute w-8 top-2 left-2" />
						</button>
						<button>
							<img src={GrabIcon} alt="/" className="absolute w-8 top-2 right-2" />
						</button>
						<img src={item.img} alt="/" className="w-full h-[200px] " />
						<h6 className="px-2 font-semibold text-left">{item.title}</h6>
						<Button variant={'primary'} size={'small'} className={'mt-8 mb-2 w-fit mx-auto'}>
							Click for info
						</Button>
					</div>
				))}
			</div>

			<div className="space-y-4 my-8">
				<div>
					<h4>Grab Activities Summary</h4>
					<p>Monitor this chat regularly to make informed decisions</p>
				</div>

				<div className=" mt-4a overflow-x-auto max-h-96 bg-gray-200 p-4 rounded-lg">
					<table className="table table-pin-rows ">
						<thead className="text-sm font-medium border-none">
							<tr className="bg-gray-200 text-black">
								<th>Date</th>
								<th className="text-center">Items</th>
								<th className="text-center">Status</th>
								<th className="text-center">Action</th>
							</tr>
						</thead>
						<tbody>
							<tr className="font-medium whitespace-nowrap hover:bg-gray-200">
								<td className=" hover:underline hover:underline-offset-4">01/06/2024</td>
								<td className="justify-center flex items-center gap-2">
									<img src={Car} className="w-16 h-16" alt="/" />
									Laptop
								</td>
								<td className="text-center text-green-500">Grabbed</td>
								<td className="text-center text-primary">Share</td>
							</tr>
							<tr className="font-medium whitespace-nowrap hover:bg-gray-200">
								<td className=" hover:underline hover:underline-offset-4">01/06/2024</td>
								<td className="justify-center flex items-center gap-2">
									<img src={Car} className="w-16 h-16" alt="/" />
									Laptop
								</td>
								<td className="text-center text-green-500">Grabbed</td>
								<td className="text-center text-primary">Share</td>
							</tr>
							<tr className="font-medium whitespace-nowrap hover:bg-gray-200">
								<td className=" hover:underline hover:underline-offset-4">01/06/2024</td>
								<td className="justify-center flex items-center gap-2">
									<img src={Car} className="w-16 h-16" alt="/" />
									Laptop
								</td>
								<td className="text-center text-green-500">Grabbed</td>
								<td className="text-center text-primary">Share</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};

export default GrabProducts;
const data = [
	{
		img: Gown,
		title: 'Apparel Gown',
	},
	{
		img: Sneakers,
		title: 'Sketchers Trainers',
	},
	{
		img: Rolex,
		title: 'Rolex Watch for Men',
	},
	{
		img: Gown,
		title: 'Apparel Gown',
	},
	{
		img: Sneakers,
		title: 'Sketchers Trainers',
	},
	{
		img: Rolex,
		title: 'Rolex Watch for Men',
	},
	{
		img: Gown,
		title: 'Apparel Gown',
	},
	{
		img: Sneakers,
		title: 'Sketchers Trainers',
	},
	{
		img: Rolex,
		title: 'Rolex Watch for Men',
	},
];
