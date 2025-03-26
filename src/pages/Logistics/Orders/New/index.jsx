import { LogisticArrow } from '../../../../assets/images';
import { Button } from '../../../../ui';

const NewOrders = () => {
	return (
		<div className="space-y-4">
			{Array.from({ length: 5 }).map((_, index) => (
				<div key={index} className="max-w-[560px] w-full">
					<div className="flex items-center gap-4">
						<h6 className="font-semibold">Hair dryer machine</h6>{' '}
						<p className="border-l pl-4">Created: 23 feb.</p>{' '}
						<p className="border-l pl-4">Due delivery: 24 feb.</p>
					</div>
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2">
							<h6 className="font-semibold">Pick up:</h6>
							<p>Opic, Ojodu-berger</p>
						</div>
						<img src={LogisticArrow} alt="to be delivered to.." className="w-[15px] h-[15px]" />
						<div className="flex items-center gap-2">
							<h6 className="font-semibold">Pick up:</h6>
							<p>Opic, Ojodu-berger</p>
						</div>
					</div>

					<div className="flex items-center justify-end gap-4">
						<Button variant={'primary'} size={'small'} className={'rounded-md'}>
							Quoted
						</Button>
					</div>
				</div>
			))}
		</div>
	);
};

export default NewOrders;
