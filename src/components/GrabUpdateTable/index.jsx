import { Button, InputGroup } from '../../ui';
import { inspectableCategories } from '../../constants/Category';
import Inspections from './Inspections';
import { useState } from 'react';
import { fromMoney, toMoney } from '../../utils';
import { useNotify, useUpdateAd } from '../../hooks';
import { useQueryClient } from 'react-query';

const GrabUpdateTable = ({ ad }) => {
    const [amount, setAmount] = useState(toMoney(ad.price) || '');
    const [disabled, setDisabled] = useState(true);

    const handleMoneyChange = (event) => {
        const inputValue = event.target.value;

        const raw = String(inputValue).replace(/[^0-9.]/g, '');

        if (!raw) {
            setAmount('');
            return;
        }

        const [intPart, decimalPart] = raw.split('.');
        let formatted = new Intl.NumberFormat('en-US').format(Number(intPart || '0'));

        if (decimalPart !== undefined) {
            formatted += '.' + decimalPart;
        }

        setAmount(formatted);
    };

    const notify = useNotify();
    const { mutate, isLoading } = useUpdateAd(ad.id);
    const queryClient = useQueryClient();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('price', fromMoney(amount));

        mutate(formData, {
            onSuccess: () => {
                notify(`${ad.title} price updated successfully`, 'success');
                queryClient.invalidateQueries({ queryKey: ['fetch-product', ad.id] });
            },
            onError: (error) => {
                notify(error?.response?.data?.message, 'error', {
                    toastId: 'update-price-error',
                });
            },
        });
    };

    return inspectableCategories.includes(ad?.category) && ad.feature === '3' ? (
        <Inspections ad={ad} />
    ) : (
        ad?.negotiable === 1 && (
            <section className='my-8 space-y-4'>
                <div className='w-full border border-black  '>
                    {ad.ad_summary?.offers.length > 0 ? (
                        <>
                            <div className=' overflow-x-auto'>
                                <table className='w-full table table-fixed'>
                                    <thead>
                                        <tr className=' text-center font-bold  text-black text-sm'>
                                            <th>Date</th>

                                            <th>Location</th>

                                            <th>Visitor</th>

                                            <th>Amount offering (₦)</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {ad.ad_summary.offers.map((offer, i) => (
                                            <tr key={i} className='text-sm'>
                                                <td>{offer.date}</td>
                                                <td>{offer.location}</td>
                                                <td>{offer.name}</td>
                                                <td className='font-bold'>{offer.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className='mb-4'>
                                <div className='mt-8 bg-secondary px-6 py-2 text-xs'>
                                    <p>
                                        Given the amounts offered, would you like to adjust your
                                        price? If YES, please click on adjust price to key in a new
                                        amount and hit submit button when you are done.
                                    </p>
                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className='flex justify-between items-center py-4 px-6 flex-wrap gap-6'
                                >
                                    <div className='flex flex-wrap items-end gap-4 sm:gap-6'>
                                        <Button
                                            type='button'
                                            variant={'grey'}
                                            size={'small'}
                                            onClick={() => setDisabled(!disabled)}
                                        >
                                            Adjust Price
                                        </Button>

                                        <label className='text-sm'>
                                            New Price (₦)
                                            <InputGroup
                                                type={'text'}
                                                name={'amount'}
                                                value={amount}
                                                onChange={handleMoneyChange}
                                                disabled={disabled}
                                                className={'!my-[-.5rem] font-bold'}
                                            />
                                        </label>
                                    </div>

                                    <Button
                                        type='submit '
                                        variant={'primary'}
                                        size={'small'}
                                        className={'rounded-lg self-end'}
                                        loading={isLoading}
                                    >
                                        Submit
                                    </Button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className='p-4 text-center'>No offers made for this ad.</div>
                    )}
                </div>
            </section>
        )
    );
};

export default GrabUpdateTable;
