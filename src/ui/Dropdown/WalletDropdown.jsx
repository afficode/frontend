import Button from '../Button';
import { Approutes } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { toMoney } from '../../utils';
import useAuth from '../../context/UserContext';
import { Naira, Naira2, ViewTransaction, WalletIcon } from '../../assets/svgs';
import { useAccountBalance } from '../../hooks';
import { format } from 'date-fns';

const WalletDropdown = () => {
    const navigate = useNavigate();

    const { data } = useAccountBalance();

    const { user } = useAuth();

    return (
        <div
            tabIndex={0}
            className={
                'dropdown-content w-[350px] sm:w-[600px] lg:w-[960px] right-[-120px] sm:right-[-180px] md:right-[-240px]  z-10 py-2 sm:py-4 lg:py-6   bg-white shadow-md rounded-md'
            }
        >
            <div className='px-6 sm:px-8 pt-2 lg:pb-4 mb-4 text-black'>
                <div className='flex items-center justify-between mt-2'>
                    <h3>Hi, {user && user?.firstname}!</h3>

                    <h3>Wallet</h3>
                </div>
            </div>

            <div className='flex justify-between flex-wrap gap-4 px-6 sm:px-8'>
                <div className='flex flex-col gap-1'>
                    <span>Available Balance</span>
                    <h6 className='flex items-center gap-1 font-bold'>
                        <img src={Naira} alt='Naira' />
                        {toMoney(data?.account?.balance, false)}
                    </h6>
                </div>
                <div className='flex flex-col gap-1'>
                    <span>Locked-in Balance</span>
                    <div className='py-1 px-2 bg-red-600'>
                        <h6 className='flex items-center gap-1 font-bold text-white'>
                            <Naira2 />
                            {toMoney(data?.account?.total_locked_money, false)}
                        </h6>
                    </div>
                </div>

                <div className='flex items-center justify-between gap-2  '>
                    <Button
                        variant={'plain'}
                        className={
                            'border border-1 !shadow-sm text-black rounded-xl  font-semibold max-sm:text-sm whitespace-nowrap max-sm:px-2 max-sm:py-2'
                        }
                        size={'full'}
                        onClick={() => navigate(Approutes.account.withdraw)}
                    >
                        Withdraw
                    </Button>
                    <Button
                        variant={'primary'}
                        className={
                            'rounded-xl !shadow-sm  text-white font-semibold max-sm:text-sm whitespace-nowrap max-sm:px-2 max-sm:py-2'
                        }
                        size={'full'}
                        onClick={() => navigate(Approutes.account.deposit)}
                    >
                        Fund Wallet
                    </Button>
                </div>
            </div>

            {data?.account?.grabbers_commissions?.length > 0 ? (
                <div className='px-6 sm:px-8 py-4 space-y-2'>
                    <h4>Grab Earnings</h4>
                    <div className='w-full border border-black/20  overflow-x-auto'>
                        <table className='w-full table table-fixed overflow-x-auto'>
                            <thead>
                                <tr className=' text-center font-bold text-base text-black'>
                                    <th>Date</th>

                                    <th>Description</th>

                                    <th>Commission (₦)</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {data?.account?.grabbers_commissions?.map((commission) => (
                                    <tr key={commission?.reference_id}>
                                        <td>
                                            {format(new Date(commission?.date), 'MMM dd, yyyy')}
                                        </td>
                                        <td>{commission?.ad_title}</td>
                                        <td className='font-bold'>
                                            {toMoney(commission?.amount, false)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <hr className='my-4' />
            )}

            <div className='px-6 sm:px-8 pt-2 lg:pb-4 mb-4 flex flex-col gap-4'>
                <h4>Quick Actions</h4>

                <div className='flex items-center justify-between flex-wrap gap-2'>
                    <button
                        className='flex items-center gap-1  text-sm'
                        onClick={() => navigate(Approutes.account.initial)}
                    >
                        <ViewTransaction className='w-4 h-4' />
                        View Transaction History
                    </button>

                    <button className='flex items-center gap-1  text-sm'>
                        <WalletIcon className='w-4 h-4' />
                        Manage Payment Methods
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WalletDropdown;
