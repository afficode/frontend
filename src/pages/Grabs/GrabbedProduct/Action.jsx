import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Modal as ModalUi } from '../../../ui';
import {
    AmountSold,
    BankTransfer,
    Info,
    Location2,
    Members,
    Paypal,
    Seller,
    SingleArrowRight,
    Visa,
} from '../../../assets/svgs';
import { Approutes } from '../../../constants';
// import InquiryChat from './Modals/InquiryChat';
import InspectionSchedule from './Modals/InspectionSchedule';
import { useGetSchedules } from '../../../hooks';
import Modal from '../../Products/View/Modal.jsx';
import ReportAd from '../../Products/View/ReportAd';
import { BiSolidMessageRoundedDetail } from 'react-icons/bi';
import useAuth from '../../../context/UserContext';
import { format, parseISO } from 'date-fns';

const Action = ({ isGeneral, ad }) => {
    const { isLogin, user } = useAuth();
    const { data } = useGetSchedules({
        enabled: !!user,
    });
    // const category = ad?.category.toString();
    const { grabber_id, ad_id } = useParams();

    const hasBookedSchedule = data?.schedules.some((schedule) => schedule.ad_id === ad.id);

    // form modals
    const [inspectionModalOpen, setInspectionModalOpen] = useState(false);

    return (
        <>
            <aside
                className={
                    isGeneral
                        ? 'w-full  border-2 border-gray-400 p-2 lg:p-4 flex flex-col justify-between'
                        : 'w-full self-end h-full   border-2 border-gray-400 px-2 py-4 lg:p-4 flex flex-col justify-between'
                }
            >
                {isGeneral ? (
                    <>
                        <div className='pb-4 space-y-4 border-b border-black/40 border-1'>
                            <div className='flex flex-col gap-0 items-start text-sm font-light'>
                                <div className='flex items-center gap-2'>
                                    <Members className='w-6' />
                                    <span>
                                        Member since:{' '}
                                        {format(parseISO(ad.joined_on), 'd MMM. yyyy')}
                                    </span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Seller className='w-6' />
                                    <span>
                                        {ad?.firstname + ' ' + ad?.lastname}{' '}
                                        {ad?.verified === '1' ? (
                                            <span className='py-1 bg-green-500 text-white rounded-md px-2'>
                                                Verified
                                            </span>
                                        ) : (
                                            <span className='py-1 bg-red-500 text-white rounded-md px-2'>
                                                Unverified
                                            </span>
                                        )}
                                    </span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Location2 className='w-6' />
                                    <span>{ad?.location}</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <AmountSold className='w-6' />
                                    <span>{ad?.items_sold || 0} Items sold</span>
                                </div>
                            </div>

                            <div className='mb-2 space-y-3'>
                                <Link to={Approutes.checkout.usePickup(grabber_id, ad_id)}>
                                    <Button
                                        type='button'
                                        variant={'primary'}
                                        size={'full'}
                                        className={
                                            'flex items-center justify-center gap-4 rounded-3xl mt-4'
                                        }
                                    >
                                        Place Order
                                    </Button>
                                </Link>
                                <Modal
                                    modalHeader={true}
                                    children={<ReportAd ad_id={ad?.id} />}
                                    headerText={'Feedback / Abuse'}
                                    className={`w-full px-2 py-3 my-2 text-lg tracking-tighter rounded-3xl text-white bg-slate-600 hover:bg-slate-500 line-clamp-1 ${
                                        !isLogin && 'cursor-not-allowed'
                                    }`}
                                    disabled={
                                        !isLogin || ad?.active === '0' || user?.id === ad?.owner
                                    }
                                    type='button'
                                    buttonChild={
                                        <>
                                            <span className='flex items-center gap-2 justify-center'>
                                                Feedback{' '}
                                                <BiSolidMessageRoundedDetail className='my-auto' />
                                            </span>
                                        </>
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <h6 className='my-2 font-bold '>Buy with confidence</h6>
                            <p className='pb-2'>
                                Payments made on Boonfu.com is secured with strict SSL encryption
                                and data protection protocols
                            </p>
                            <div className='flex items-center pt-1 border-t border-black/40 border-1'>
                                Payments:{' '}
                                <span className='flex items-center gap-3'>
                                    {' '}
                                    <img src={Visa} alt='/' />
                                    <img src={Paypal} alt='/' />
                                    <img src={BankTransfer} alt='/' />
                                </span>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='flex flex-col gap-4'>
                            <Button
                                variant={'secondary'}
                                size={'full'}
                                className={
                                    'flex items-center justify-center gap-4 rounded-xl font-semibold hover:opacity-100'
                                }
                            >
                                Seller’s contact
                                <div className='dropdown dropdown-hover'>
                                    <img tabIndex={0} src={Info} alt='info' className='w-4' />
                                    <div
                                        tabIndex={0}
                                        className='dropdown-content transform translate-y-[-25%] md:translate-y-[2%] translate-x-[-70%]  sm:translate-x-[-40%] lg:translate-x-[-70%]  bg-secondary border-4 p-4 w-screen max-w-[320px] sm:max-w-[400px] z-[100000]'
                                    >
                                        <div className='space-y-2 text-start'>
                                            <h4>Seller’s Contact Reveal.</h4>
                                            <p>
                                                Sellers are ONLY able to reveal their contacts WHEN
                                                your inspection date and time is convenient for
                                                them.
                                            </p>
                                            <p>
                                                Please watch-out for response from sellers via your
                                                message inbox, as sellers might decline your set
                                                date and tend to pick a suitable date which works
                                                for them.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Button>

                            {hasBookedSchedule ? (
                                <div className='flex items-center justify-between p-3 border rounded-xl border-primary'>
                                    <h6 className='font-semibold'>Inspection reports</h6>
                                    <Link to={Approutes.grab.inspectionLog}>
                                        <span className='flex items-center gap-2 underline text-primary'>
                                            see{' '}
                                            <img
                                                src={SingleArrowRight}
                                                className='w-[0.5rem]'
                                                alt='/'
                                            />
                                        </span>
                                    </Link>
                                </div>
                            ) : (
                                <Button
                                    variant={'primary'}
                                    size={'full'}
                                    className={'flex items-center justify-center gap-4 rounded-xl'}
                                    onClick={() => setInspectionModalOpen(true)}
                                >
                                    Schedule inspection
                                </Button>
                            )}

                            {/* inspection ModalUi  */}
                            {isLogin && (
                                <ModalUi
                                    isOpen={inspectionModalOpen}
                                    setIsOpen={setInspectionModalOpen}
                                    headerText={'Welcome to : Inspection scheduling'}
                                    headerStye={'text-start capitalize '}
                                    headerSize={'small'}
                                    className={'bg-secondary max-w-[600px]'}
                                >
                                    <InspectionSchedule
                                        setInspectionModalOpen={setInspectionModalOpen}
                                        ad={ad}
                                        grabbersId={grabber_id}
                                    />
                                </ModalUi>
                            )}
                        </div>

                        <div className='mt-3'>
                            <h6 className='my-2 font-bold text-center'>Keeping Safe</h6>
                            <ol className='list-[lower-roman] pl-4'>
                                <li>
                                    {' '}
                                    Carryout inspection by yourself and ensure to go along with a
                                    technician
                                </li>
                                <li>
                                    {' '}
                                    Thoroughly check all documents and verify authenticity before
                                    payment
                                </li>
                                <li>
                                    {' '}
                                    Do not inspect/pay in a public place, office or seller’s home is
                                    advised!.
                                </li>
                                <li>
                                    {' '}
                                    Do not commit funds in advance for vehicle you have not
                                    inspected.
                                </li>
                            </ol>
                        </div>
                    </>
                )}
            </aside>
        </>
    );
};

export default Action;
