import { Link } from 'react-router-dom';

const NavigatePayment = ({ grabber_id, ad_id, closeModal, isPaymentError }) => {
    return (
        <>
            {isPaymentError ? (
                <div className="w-full mx-auto flex items-center flex-col justify-center">
                    <p className="text-lg">There is a pending payment on this order, do you wish to pay now?</p>
                    <div className="flex gap-8 mt-4">
                        <button>
                            <Link to={`/checkout/pickup/${grabber_id}/${ad_id}`} className="btn btn-primary">
								Yes
                            </Link>
                        </button>
                        <button
                            onClick={() => closeModal(false)}
                            className={'rounded-lg bg-red-500 px-4 py-2 text-white'}
                        >
							No
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-40">
                    <p className="text-red-500">Error fetching escrow details</p>
                </div>
            )}
        </>
    );
};

export default NavigatePayment;
