import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Cancel } from '../../../assets/svgs';
import { Button, InputGroup } from '../../../ui';
import { useDeposit, useNotify } from '../../../hooks';
import { Approutes } from '../../../constants';
import { ScrollToTop } from '../../../utils';

const Deposit = () => {
    const { mutate } = useDeposit();
    const notify = useNotify();

    // Deposit formik
    const formikDeposit = useFormik({
        initialValues: {
            amount: '',
            callback_url: Approutes.account.paymentSuccess,
            use_for_withdrawal: true,
        },
        validationSchema: Yup.object({
            amount: Yup.number().required('Amount is required').min(500, 'Minimum amount is 500'),
        }),
        onSubmit: (values, { setSubmitting }) => {
            mutate(values, {
                onSuccess: (data) => {
                    window.location.replace(data?.url);
                },
                onError: (error) => {
                    setSubmitting(false);
                    notify(error.response.data.message, 'error');
                },
            });
        },
    });

    return (
        <div>
            <form onSubmit={formikDeposit.handleSubmit} className="space-y-6 w-full mb-6">
                <div className="flex flex-col">
                    <label htmlFor="amount" className="mb-[-7px] font-bold">
						Amount
                    </label>
                    <div className=" max-w-sm">
                        <InputGroup
                            name="amount"
                            id="amount"
                            type="text"
                            amount="NGN"
                            autoComplete="off"
                            className={'customAmountInput relative'}
                            value={formikDeposit.values.amount}
                            onChange={formikDeposit.handleChange}
                            onBlur={formikDeposit.handleBlur}
                            errorMsg={
                                formikDeposit.touched.amount && formikDeposit.errors.amount
                                    ? formikDeposit.errors.amount
                                    : null
                            }
                            cancelButton={
                                <button
                                    onClick={() => {
                                        formikDeposit.resetForm();
                                    }}
                                    type="button"
                                    className="absolute right-2 inset-y-0 my-auto h-fit "
                                >
                                    <img src={Cancel} alt="/" className="w-4" />
                                </button>
                            }
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    variant={'secondary'}
                    size={'full'}
                    className={'max-w-sm font-bold rounded-xl'}
                    disabled={
                        !formikDeposit.isValid || formikDeposit.dirty === false || formikDeposit.isSubmitting
                    }
                    loading={formikDeposit.isSubmitting}
                >
					Top Up Now
                </Button>
            </form>

            <ScrollToTop />
        </div>
    );
};

export default Deposit;
