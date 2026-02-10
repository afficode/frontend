import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, InputGroup } from '../../../ui';
import { useNotify, useRefund } from '../../../hooks';
import { ImageUpload } from '../../../assets/images';
import useAuth from '../../../context/UserContext';
import { Approutes } from '../../../constants';
import { useNavigate } from 'react-router-dom';

const RefundForm = ({ escrowDetails, escrowReason, otherEscrowReason }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const initialValues = {
        escrow_reason: escrowReason || '',
        other_escrow_reason: otherEscrowReason,
        reason: '',
        other_reason: '',
        address: '',
        explanation: '',
        image: '',
    };

    const notify = useNotify();
    const { mutate: refundMutate, isLoading } = useRefund(escrowDetails?.id);

    const validationSchema = Yup.object({
        address: Yup.string().required('Required'),
        reason: Yup.string(),
        explanation: Yup.string(),
    });

    const handleSubmit = (values) => {
        const { other_reason, other_escrow_reason, ...data } = values;

        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (data?.reason === 'others') {
            formData.append('other_reason', other_reason);
        }
        if (data?.escrow_reason === 'others') {
            formData.append('other_escrow_reason', other_escrow_reason);
        }

        refundMutate(formData, {
            onSuccess: (data) => {
                notify(data?.message, 'success');
                navigate(Approutes.profile.transactions);
            },
            onError: (error) => {
                notify(error?.response?.data?.message || 'An error occurred', 'error');
            },
        });
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmit,
        validationSchema,
    });

    const handleFileChange = (e) => {
        const file = e.currentTarget.files[0];
        formik.setFieldValue('image', null);
        if (file && file.type.startsWith('image/')) {
            if (file.size <= 1024 * 1024) {
                formik.setFieldValue('image', file);
            } else {
                notify('File size must be less than 1MB', 'error');
            }
        } else {
            notify('Only image files are allowed', 'error');
        }
    };

    return (
        <div className="min-h-screen p-4 max-md:p-2 pb-16">
            <div className="space-y-4 max-w-[720px] mx-auto bg-white py-4 px-8 max-md:px-2 w-full">
                <h3 className="text-black text-center">CUSTOMER REFUND REQUEST FORM </h3>

                <p className="text-black">Please fill and submit this refund request form. </p>

                <form className="w-full  space-y-3">
                    <div className="flex max-md:flex-col md:items-center md:gap-8">
                        <label className="max-md:text-sm max-md:mt-2 font-semibold text-black" htmlFor="name">
							Order date
                        </label>
                        <InputGroup name="order_date" type="date" className={''} value={formik.values.order_date} />
                    </div>
                    <div className="flex max-md:flex-col md:items-start  md:gap-8">
                        <label className="max-md:text-sm max-md:mt-2 md:mt-4 font-semibold text-black" htmlFor="name">
							Order details
                        </label>
                        <div className="">
                            <InputGroup
                                name="order_details"
                                type="text"
                                placeholder="2389900000078TM"
                                className={'font-semibold'}
                                value={escrowDetails?.id}
                                disabled={true}
                            />
                            <span className="text-black text-sm ">
								(e.g; ID of item, Item description, reference number. e.t.c)
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col !gap-[-1rem]">
                        <label className="max-md:text-sm max-md:mt-2 font-semibold text-black" htmlFor="name">
							Choose a reason for rejection
                        </label>
                        <InputGroup
                            name="reason"
                            type="select"
                            optionLists={[
                                {
                                    key: 'Select a reason',
                                    value: '',
                                },
                                {
                                    key: 'Incorrect items delivered.',
                                    value: 'incorrect_item',
                                },
                                {
                                    key: 'Damaged or defective items.',
                                    value: 'damaged',
                                },
                                {
                                    key: 'Violation of agreed terms (e.g., missing components or wrong specifications).',
                                    value: 'violation',
                                },
                                {
                                    key: 'Other reason(s), Please state in the box below.',
                                    value: 'others',
                                },
                            ]}
                            value={formik.values.reason}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.values.reason === 'others' && (
                            <InputGroup
                                type="text"
                                name="other_reason"
                                id="other_reason"
                                placeholder="Please write here"
                                value={formik.values.other_reason}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="mt-2"
                            />
                        )}
                    </div>

                    <div className="flex flex-col !gap-[-1rem]">
                        <div className="flex flex-col">
                            <label className="max-md:text-sm max-md:mt-2 font-semibold text-black" htmlFor="name">
								Upload evidence(s) to support your request.
                            </label>
                            <span className="text-black">
								(e.g; ID of item, Item description, reference number. e.t.c)
                            </span>
                        </div>
                        <div className="w-full max-w-sm ">
                            <InputGroup type="file" name="image" onChange={handleFileChange}>
                                <div className="w-full h-52 flex flex-col text-center items-center justify-center border border-dashed border-gray-300 rounded-lg">
                                    {formik.values.image ? (
                                        <img
                                            src={URL.createObjectURL(formik.values.image)}
                                            alt="/"
                                            className="max-h-full w-fit"
                                        />
                                    ) : (
                                        <>
                                            <img src={ImageUpload} alt="/" className="w-[3rem]" />
                                            <div>
                                                <p className="text-black">Drop your image here, or browse</p>
                                                <span>Support; Jpeg, PNG</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </InputGroup>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h6 className="bg-black text-white py-2 px-4">Contact Information:</h6>

                        <div className="flex flex-col bg-gray-100 py-6 px-4">
                            <div className="flex max-md:flex-col md:items-center md:gap-8">
                                <label className="max-md:text-sm max-md:mt-2 font-semibold text-black" htmlFor="name">
									Name
                                </label>
                                <InputGroup
                                    name="name"
                                    type="text"
                                    value={user?.firstname + ' ' + user?.lastname}
                                    className={'font-semibold'}
                                    disabled
                                />
                            </div>
                            {/* <div className="flex max-md:flex-col md:items-center md:gap-8">
								<label className="max-md:text-sm max-md:mt-2 font-semibold text-black" htmlFor="company">
									Company
								</label>
								<InputGroup
									name="company"
									type="text"
									placeholder="Crystal gush Ltd."
									className={``}
									value={formik.values.company}
								/>
							</div> */}
                            <div className="flex max-md:flex-col md:items-center md:gap-8">
                                <label className="max-md:text-sm max-md:mt-2 font-semibold text-black" htmlFor="address">
									Address
                                </label>
                                <InputGroup
                                    name="address"
                                    type="text"
                                    placeholder="1, Dipeolu street, Ajangbadi"
                                    className={''}
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="flex max-md:flex-col md:items-center md:gap-8">
                                <label className="max-md:text-sm max-md:mt-2 font-semibold text-black" htmlFor="email">
									Email
                                </label>
                                <InputGroup
                                    name="email"
                                    type="email"
                                    placeholder="gush@gmail.com"
                                    value={user?.email}
                                    className={'font-semibold'}
                                    disabled
                                />
                            </div>
                            <div className="flex max-md:flex-col md:items-center md:gap-8">
                                <label
                                    className="max-md:text-sm max-md:mt-2 font-semibold text-black"
                                    htmlFor="phone_number"
                                >
									Phone Number
                                </label>
                                <InputGroup
                                    name="phone_number"
                                    type="text"
                                    placeholder="+234890985894xxx"
                                    value={user?.phone[0]?.number}
                                    className={'font-semibold'}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="mt-2">
                            <h6 className="text-black font-semibold">Please Note</h6>
                            <p className="text-sm text-black">
								We may contact you to gather further details about your refund request in other to improve
								the quality of our service.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h6 className="bg-black text-white py-2 px-4">
							Please give detailed explanation in the box{' '}
                        </h6>

                        <InputGroup
                            name="explanation"
                            type="textarea"
                            rows={'5'}
                            value={formik.values.explanation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>

                    <div className="mb-16 px-4 sm:w-[200px] max-sm:mx-auto">
                        <Button
                            type="submit"
                            variant="primary"
                            size="full"
                            onClick={formik.handleSubmit}
                            loading={isLoading}
                            disabled={!formik.isValid || isLoading}
                        >
							Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RefundForm;
