import React from 'react';
import { GrabIcon, GrabSave } from '../../../assets/svgs';
import { Car, Gown, Rolex, Sneakers } from '../../../assets/images';
import { Button } from '../../../ui';
import GrabHeader from '../GrabHeader';
import { Link } from 'react-router-dom';
import { Approutes } from '../../../constants';
import { ScrollToTop } from '../../../utils';

const GrabProducts = () => {
	return (
		<section>
			<GrabHeader text="Grabber’s Products Page" />

			<div className="flex flex-wrap items-center justify-between gap-6 mt-8 mb-12 ">
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
						<Link to={Approutes.grab.product} className={'mt-8 mb-2 mx-auto'}>
							<Button variant={'primary'} size={'small'} className={'w-fit'}>
								Click for info
							</Button>
						</Link>
					</div>
				))}
			</div>

			{/* <div className="my-8 space-y-4">
				<div>
					<h4>Grab Activities Summary</h4>
					<p>Monitor this chat regularly to make informed decisions</p>
				</div>

				<div className="p-4 overflow-x-auto bg-gray-200 rounded-lg mt-4a max-h-96">
					<table className="table table-pin-rows ">
						<thead className="text-sm font-medium border-none">
							<tr className="text-black bg-gray-200">
								<th>Date</th>
								<th className="text-center">Items</th>
								<th className="text-center">Status</th>
								<th className="text-center">Action</th>
							</tr>
						</thead>
						<tbody>
							<tr className="font-medium whitespace-nowrap hover:bg-gray-200">
								<td className=" hover:underline hover:underline-offset-4">01/06/2024</td>
								<td className="flex items-center justify-center gap-2">
									<img src={Car} className="w-16 h-16" alt="/" />
									Laptop
								</td>
								<td className="text-center text-green-500">Grabbed</td>
								<td className="text-center text-primary">Share</td>
							</tr>
							<tr className="font-medium whitespace-nowrap hover:bg-gray-200">
								<td className=" hover:underline hover:underline-offset-4">01/06/2024</td>
								<td className="flex items-center justify-center gap-2">
									<img src={Car} className="w-16 h-16" alt="/" />
									Laptop
								</td>
								<td className="text-center text-green-500">Grabbed</td>
								<td className="text-center text-primary">Share</td>
							</tr>
							<tr className="font-medium whitespace-nowrap hover:bg-gray-200">
								<td className=" hover:underline hover:underline-offset-4">01/06/2024</td>
								<td className="flex items-center justify-center gap-2">
									<img src={Car} className="w-16 h-16" alt="/" />
									Laptop
								</td>
								<td className="text-center text-green-500">Grabbed</td>
								<td className="text-center text-primary">Share</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div> */}

			<ScrollToTop />
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
