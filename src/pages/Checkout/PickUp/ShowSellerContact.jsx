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
    has_pending_refund,
}) => {
    return (
        <div className='space-y-4 py-8 px-8 max-sm:px-4 bg-secondary'>
            <p className='font-bold'>Dear Buyer,</p>

            {has_pending_refund ? (
                <div className='bg-white p-4 text-justify space-y-2 rounded-md'>
                    <p>
                        We sincerely apologize for any inconvenience you may have experienced that
                        led to this request. At Boonfu, we strive to provide a seamless experience,
                        and we regret that we fell short this time.
                    </p>
                    <p className='my-4'>
                        What happens next? One of our Customer Service personnel is currently
                        reviewing your request to ensure all details are correct. As soon as the
                        review is finalized, your refund will be credited directly to your Boonfu
                        Wallet. From there, the funds will be immediately available for withdrawal
                        to your bank account or for future use on the platform.
                    </p>

                    <p className='my-2'>
                        We appreciate your patience while we finalize this process.
                    </p>
                    <p className='my-2'>Best regards</p>
                    <p className='my-2'>The Boonfu Support Team.</p>
                </div>
            ) : (
                <>
                    <div>
                        <p>Thanks for your order, Kindly find the details of seller below.</p>
                        <p>Please call right away to arrange a pick up.</p>
                    </div>

                    <div className='space-y-2'>
                        <div className='grid items-center grid-cols-3'>
                            <p>Pick up address : </p>
                            <span className='col-span-2 flex items-center gap-2 p-2 rounded-md bg-[#333] text-white'>
                                <img src={Location} alt='address' className='w-4' />
                                {pickup_address && `${pickup_address},`} {pickup_state}.
                            </span>
                        </div>
                        <div className='grid items-center grid-cols-3'>
                            <p>Mobile: </p>
                            <span className='col-span-2  flex items-center gap-2 p-2 rounded-md bg-[#333] text-white'>
                                {pickup_mobile}
                            </span>
                        </div>
                        <div className='grid items-center grid-cols-3'>
                            <p>Name: </p>
                            <span className='col-span-2 flex items-center gap-2 p-2 rounded-md bg-[#333] text-white'>
                                {ad_owner_name}
                            </span>
                        </div>
                    </div>

                    <p className='py-4'>
                        Should you experience any difficulty in reaching the above contact, please
                        chat at us @ <span className='text-primary'>Boonfuchat</span>
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
                </>
            )}
        </div>
    );
};

export default ShowSellerContact;
