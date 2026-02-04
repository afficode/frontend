import { Location } from '../../../../../assets/svgs';

const PickUp = () => {
    return (
        <div className="space-y-4">
            <p className="m">Dear Buyer,</p>

            <div>
                <p>Thanks for your order, Kindly find the details of seller below.</p>
                <p>Please call right away to arrange a pick up.</p>
            </div>

            <div className="space-y-2">
                <div className="grid items-center grid-cols-3">
                    <p>Pick up address : </p>
                    <span className="col-span-2 flex items-center gap-2 p-2 rounded-md bg-[#333] text-white">
                        <img src={Location} alt="/" className="w-4" />
						12b, Alade market avenue, Ikeja Lagos.
                    </span>
                </div>
                <div className="grid items-center grid-cols-3">
                    <p>Mobile: </p>
                    <span className="col-span-2  flex items-center gap-2 p-2 rounded-md bg-[#333] text-white">
						+234 8033456236
                    </span>
                </div>
                <div className="grid items-center grid-cols-3">
                    <p>Name: </p>
                    <span className="col-span-2 flex items-center gap-2 p-2 rounded-md bg-[#333] text-white">
						Mr Kunle Kalejaiye
                    </span>
                </div>
            </div>

            <p className="py-4">
				Should you experience any difficulty in reaching the above contact, please chat at us @{' '}
                <span className="text-primary">Boonfuchat</span>
            </p>

            <p>
				Sales department, <br />
				Boonfu
            </p>
        </div>
    );
};

export default PickUp;
