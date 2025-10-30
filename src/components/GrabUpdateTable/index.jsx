import { Button, InputGroup } from '../../ui';
import { inspectableCategories } from '../../constants/Category';
import Inspections from './Inspections';

const GrabUpdateTable = ({ ad }) => {
	return inspectableCategories.includes(ad?.category) ? (
		<Inspections ad={ad} />
	) : (
		<section className="my-8 space-y-4">
			<div className="w-full border border-black  overflow-x-auto">
				<table className="w-full table table-fixed overflow-x-auto">
					<thead>
						<tr className=" text-center font-bold text-base text-black">
							<th>Date</th>

							<th>Location</th>

							<th>Visitor</th>

							<th>Amount offering (#)</th>
						</tr>
					</thead>
					<tbody className="text-center">
						<tr>
							<td>25.12.2024</td>
							<td>Lagos State</td>
							<td>crystal</td>
							<td className="font-bold">100,000.00</td>
						</tr>
						<tr>
							<td>25.12.2024</td>
							<td>Lagos State</td>
							<td>crystal</td>
							<td className="font-bold">100,000.00</td>
						</tr>
						<tr>
							<td>25.12.2024</td>
							<td>Lagos State</td>
							<td>crystal</td>
							<td className="font-bold">100,000.00</td>
						</tr>
					</tbody>
				</table>

				<div className="mb-4">
					<div className="mt-8 bg-secondary px-6 py-2">
						<p>
							Given the amounts offered, would you like to adjust your price? If YES, please click on
							adjust price to key in a new amount and hit submit button when you are done.
						</p>
					</div>

					<form className="flex justify-between items-center py-4 px-6">
						<div className="flex items-end gap-6">
							<Button type="button" variant={'grey'}>
								Adjust Price
							</Button>

							<label>
								New Price (₦)
								<InputGroup type={'number'} className={'!my-[-.5rem] font-bold'} />
							</label>
						</div>

						<Button type="submit " variant={'primary'} className={'rounded-lg'}>
							Submit
						</Button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default GrabUpdateTable;
