import { useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, InputGroup, Modal } from '../../../ui';
import { ArrowRightBlack, Cancel } from '../../../assets/svgs';
import { RiVisaFill } from 'react-icons/ri';
import { BsBank2 } from 'react-icons/bs';
import { CiCreditCard2 } from 'react-icons/ci';
import NewAccount from './NewAccount';
import { useFetchPayouts, useNotify, useWithdraw } from '../../../hooks';
import { useQueryClient } from 'react-query';
import { fromMoney, joinObjectArrayAndSortByCreatedAt } from '../../../utils';
import { FaCcMastercard } from 'react-icons/fa6';

const Withdraw = () => {
    const [newBankAccount, setNewBankAccount] = useState(false);

    const [selectedBank, setSelectedBank] = useState('');
    const queryClient = useQueryClient();

    const { data: payouts } = useFetchPayouts();

    const selectedBankIconSize = 20;
    const selectedBankSpanClass = 'text-black w-full flex items-center justify-start';

    const savedBankAccountList = useMemo(() => {
        return joinObjectArrayAndSortByCreatedAt([
            ...(payouts?.payouts?.bank_details || []),
            ...(payouts?.payouts?.card_details || []),
        ]);
    }, [payouts]);

    const { mutate } = useWithdraw();

    const notify = useNotify();

    // Withdraw formik
    const formikWithdraw = useFormik({
        initialValues: {
            // preferred_payout: {},
            amount: '',
        },
        validationSchema: Yup.object({
            amount: Yup.number()
                .transform((value, originalValue) => {
                    if (typeof originalValue === 'string') {
                        return fromMoney(originalValue);
                    }
                    return value;
                })
                .required('Amount is required')
                .min(500, 'Minimum amount is 500'),
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            const formData = {
                ...values,
                amount: fromMoney(values.amount),
            };

            mutate(formData, {
                onSuccess: (data) => {
                    notify(data.message, 'success');
                    setSelectedBank('');
                    queryClient.invalidateQueries('account-balance');
                    queryClient.invalidateQueries('all-transactions');
                    resetForm();
                    setSubmitting(false);
                },
                onError: (error) => {
                    setSubmitting(false);
                    notify(error.response.data.message, 'error');
                },
            });
        },
    });
    const handleWithdrawChange = (bank) => {
        setSelectedBank(bank);
        formikWithdraw.setFieldValue('preferred_payout', bank);
    };

    const handleMoneyChange = (event) => {
        const inputValue = event.target.value;

        const raw = String(inputValue).replace(/[^0-9.]/g, '');

        if (!raw) {
            formikWithdraw.setFieldValue('amount', '');
            return;
        }

        const [intPart, decimalPart] = raw.split('.');
        let formatted = new Intl.NumberFormat('en-US').format(Number(intPart || '0'));

        if (decimalPart !== undefined) {
            formatted += '.' + decimalPart;
        }

        formikWithdraw.setFieldValue('amount', formatted);
    };

    return (
        <div>
            <form onSubmit={formikWithdraw.handleSubmit} className='space-y-3 max-w-[24rem]'>
                <div className='flex flex-col'>
                    <label htmlFor='bank' className='mb-[-7px] font-bold'>
                        Withdraw to:
                    </label>

                    <div className='dropdown dropdown-bottom dropdown-center '>
                        <button
                            type='button'
                            tabIndex={0}
                            className='customSelectInput p-2 mt-2 text-left flex justify-between items-center text-black/50 '
                        >
                            {selectedBank ? (
                                selectedBank?.type === 'bank' ? (
                                    <span className={selectedBankSpanClass}>
                                        <BsBank2 size={selectedBankIconSize} /> &emsp;
                                        {`${selectedBank?.bank_name} - ${selectedBank?.account_number
                                            .toString()
                                            .slice(-3)
                                            .padStart(7, '*')}`}
                                    </span>
                                ) : (
                                    <span className={selectedBankSpanClass}>
                                        {selectedBank?.card_type.trim() === 'visa' ? (
                                            <RiVisaFill size={selectedBankIconSize} />
                                        ) : selectedBank?.card_type.trim() === 'mastercard' ? (
                                            <FaCcMastercard size={selectedBankIconSize} />
                                        ) : (
                                            <CiCreditCard2 size={selectedBankIconSize} />
                                        )}
                                        &emsp;{selectedBank?.bank} -{' '}
                                        {selectedBank?.last4.toString().slice(-4).padStart(7, '*')}
                                    </span>
                                )
                            ) : (
                                <span className='pl-2 text-gray-400'>Select Account</span>
                            )}
                            <img src={ArrowRightBlack} className='w-4 h-4' alt='/' />
                        </button>
                        <ul
                            tabIndex={0}
                            className='dropdown-content  z-[1] menu  shadow bg-white   w-96 flex flex-col justify-between'
                        >
                            <div>
                                <div className='bg-secondary text-center p-2'>
                                    Bank Cards/Accounts
                                </div>
                                {savedBankAccountList.map((payout, i) => (
                                    <div key={i}>
                                        {payout.type === 'bank' && (
                                            <li
                                                onClick={() => handleWithdrawChange(payout)}
                                                key={payout?.id.slice(4)}
                                                tabIndex={0}
                                                className='cursor-pointer font-medium border-b border-b-transparent pb-0 hover:border-black/30  whitespace-nowrap flex flex-row items-center justify-between w-full'
                                            >
                                                <span>
                                                    <BsBank2 size={25} /> {payout?.bank_name}
                                                </span>{' '}
                                                <span>
                                                    (
                                                    {payout?.account_number
                                                        .toString()
                                                        .slice(-3)
                                                        .padStart(10, '*')}
                                                    )
                                                </span>
                                            </li>
                                        )}

                                        {payout.type === 'card' && (
                                            <li
                                                onClick={() => handleWithdrawChange(payout)}
                                                key={payout?.id?.slice(4)}
                                                tabIndex={0}
                                                className='cursor-pointer font-medium border-b border-b-transparent pb-0 hover:border-black/30  whitespace-nowrap flex flex-row items-center justify-between w-full'
                                            >
                                                <span>
                                                    {payout?.card_type.trim() === 'visa' ? (
                                                        <RiVisaFill size={25} />
                                                    ) : payout?.card_type.trim() ===
                                                      'mastercard' ? (
                                                            <FaCcMastercard size={25} />
                                                        ) : (
                                                            <CiCreditCard2 size={25} />
                                                        )}{' '}
                                                    {payout?.bank}
                                                </span>{' '}
                                                <span>
                                                    (
                                                    {payout?.last4
                                                        .toString()
                                                        .slice(-4)
                                                        .padStart(12, '*')}
                                                    )
                                                </span>
                                            </li>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <button
                                className='border border-secondary rounded-lg mt-8 p-2'
                                onClick={() => setNewBankAccount(true)}
                            >
                                Withdraw to a new bank account
                            </button>
                        </ul>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor='amount' className='mb-[-7px] font-bold'>
                        Amount
                    </label>
                    <div className='relative max-w-sm'>
                        <InputGroup
                            name='amount'
                            id='amount'
                            type='text'
                            amount='NGN'
                            autoComplete='off'
                            className={'customAmountInput '}
                            value={formikWithdraw.values.amount}
                            onChange={handleMoneyChange}
                            onBlur={formikWithdraw.handleBlur}
                            errorMsg={
                                formikWithdraw.touched.amount && formikWithdraw.errors.amount
                                    ? formikWithdraw.errors.amount
                                    : null
                            }
                            cancelButton={
                                <button
                                    onClick={() => {
                                        formikWithdraw.resetForm();
                                    }}
                                    type='button'
                                    className='absolute right-2 inset-y-0 my-auto h-fit '
                                >
                                    <img src={Cancel} alt='/' className='w-4' />
                                </button>
                            }
                        />
                    </div>
                </div>

                <Button
                    type='submit'
                    variant={'secondary'}
                    size={'full'}
                    className={'max-w-sm font-bold rounded-xl'}
                    disabled={
                        !formikWithdraw.isValid ||
                        formikWithdraw.dirty === false ||
                        formikWithdraw.isSubmitting ||
                        selectedBank === ''
                    }
                    loading={formikWithdraw.isSubmitting}
                >
                    Withdraw
                </Button>
            </form>

            <Modal isOpen={newBankAccount} setIsOpen={setNewBankAccount}>
                <NewAccount closeModal={() => setNewBankAccount(false)} />
            </Modal>
        </div>
    );
};

export default Withdraw;
