import { Link } from 'react-router-dom';
import { Location } from '../../../assets/svgs';
import { Button } from '../../../ui';
import { Approutes } from '../../../constants';

const ShowSellerContact = ({
	pickup_address,
	pickup_state,
	pickup_mobile,
	ad_owner_name,
	escrow_id,
}) => {
	return (
		<div className="space-y-4 py-8 px-8 max-sm:px-4 bg-secondary">
			<p className="font-bold">Dear Buyer,</p>

			<div>
				<p>Thanks for your order, Kindly find the details of seller below.</p>
				<p>Please call right away to arrange a pick up.</p>
			</div>

			<div className="space-y-2">
				<div className="grid items-center grid-cols-3">
					<p>Pick up address : </p>
					<span className="col-span-2 flex items-center gap-2 p-2 rounded-md bg-[#333] text-white">
						<img src={Location} alt="address" className="w-4" />
						{pickup_address && `${pickup_address},`} {pickup_state}.
					</span>
				</div>
				<div className="grid items-center grid-cols-3">
					<p>Mobile: </p>
					<span className="col-span-2  flex items-center gap-2 p-2 rounded-md bg-[#333] text-white">
						{pickup_mobile}
					</span>
				</div>
				<div className="grid items-center grid-cols-3">
					<p>Name: </p>
					<span className="col-span-2 flex items-center gap-2 p-2 rounded-md bg-[#333] text-white">
						{ad_owner_name}
					</span>
				</div>
			</div>

			<p className="py-4">
				Should you experience any difficulty in reaching the above contact, please chat at us @{' '}
				<span className="text-primary">Boonfuchat</span>
			</p>

			{escrow_id && (
				<Link to={Approutes.checkout.useClosePickup(escrow_id)}>
					<Button variant={'primary'}>Continue to Pick-up</Button>
				</Link>
			)}

			<p>
				Sales department, <br />
				Boonfu
			</p>
		</div>
	);
};

export default ShowSellerContact;
