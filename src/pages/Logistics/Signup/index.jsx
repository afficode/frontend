import { Button, InputGroup } from '../../../ui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNotify } from '../../../hooks';
import { Link, useNavigate } from 'react-router-dom';
import { LogisticsSignup, BoonfuLogo } from '../../../assets/images';
import { useLogisticsRegister } from '../../../hooks/useLogistics';
import { useStates } from '../../../hooks/useLocation';
import { useEffect, useRef } from 'react';
import { Approutes } from '../../../constants';

const LogisticSignup = () => {
    const navigate = useNavigate();
    const notify = useNotify();
    const { mutate: register } = useLogisticsRegister();
    const { data: states, isLoading: statesLoading } = useStates();

    const timeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const initialValues = {
        company_name: '',
        phone: '',
        email: '',
        password: '',
        confirm_password: '',
        state: '',
    };

    const validationSchema = Yup.object({
        company_name: Yup.string().required('Required'),
        state: Yup.string().required('Required'),
        email: Yup.string()
            .required('Email field is required')
            .email('Invalid email address'),
        phone: Yup.string()
            .required('Phone number is required')
            .matches(
                /^[0-9]{11,12}$/,
                'Phone number must be 11 or 12 digits (e.g., 08012345678)'
            )
            .test(
                'starts-with-zero',
                'Phone number must start with 0',
                (value) => value?.startsWith('0')
            ),
        password: Yup.string()
            .required()
            .min(8, 'Password must be 8 characters long')
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter'),
        confirm_password: Yup.string()
            .oneOf(
                [Yup.ref('password'), null],
                'must match "password" field value'
            )
            .required(),
    });

    const createUser = async (e) => {
        e.preventDefault();
        try {
            // Check for validation errors
            const errors = await formik.validateForm();
            if (Object.keys(errors).length > 0) {
                const error = Object.values(errors)[0];
                notify(
                    `${
                        Object.keys(errors)[0].includes('_')
                            ? Object.keys(errors)[0].split('_').join(' ')
                            : Object.keys(errors)[0]
                    } error:- ${error} before submitting`,
                    'error'
                );
                return;
            }

            // Check if all required fields are filled
            const requiredFields = [
                'company_name',
                'phone',
                'email',
                'password',
                'confirm_password',
                'state',
            ];
            const emptyFields = requiredFields.filter(
                (field) => !formik.values[field]
            );

            if (emptyFields.length > 0) {
                notify('Please fill in all required fields', 'error');
                return;
            }

            formik.setSubmitting(true);

            register(formik.values, {
                onSuccess: (response) => {
                    if (response?.success) {
                        notify('Registration successful!', 'success');
                        formik.resetForm();
                        timeoutRef.current = setTimeout(() => {
                            navigate('/logistics/login');
                        }, 2000);
                    } else {
                        notify(
                            response?.message || 'Registration failed',
                            'error'
                        );
                    }
                },
                onError: (error) => {
                    notify(
                        error?.response?.data?.message || 'Registration failed',
                        'error'
                    );
                },
                onSettled: () => {
                    formik.setSubmitting(false);
                },
            });
        } catch (error) {
            notify('Please check your form and try again', 'error');
            formik.setSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: createUser,
    });

    return (
        <div className='bg-white min-h-screen py-4 sm:py-8 px-4 sm:px-12 space-y-6'>
            <h2 className='text-2xl sm:text-3xl text-center'>
                Welcome to Boonfu Logistic Service Portal{' '}
            </h2>

            <div className='max-w-5xl mx-auto'>
                <section className='h-full flex flex-col lg:flex-row items-stretch shadow-lg'>
                    <div className='w-full lg:flex-1 bg-[#047F73] flex flex-col justify-between gap-4 p-6 sm:p-8 rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none'>
                        <div className='flex flex-col items-center justify-center text-center text-white space-y-4'>
                            <img
                                src={BoonfuLogo}
                                alt='Boonfu Logo'
                                className='w-32 h-auto'
                            />
                            <h1 className='font-bold text-xl sm:text-2xl'>
                                Get Started
                            </h1>
                            <p>
                                Already have an account?{' '}
                                <Link
                                    to={Approutes.logistics.login}
                                    className='text-secondary'
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>

                        <form
                            onSubmit={formik.handleSubmit}
                            className='h-full flex flex-col justify-between gap-6 w-full'
                        >
                            <div className='space-y-5 w-full'>
                                <div className='w-full'>
                                    <label
                                        htmlFor='company_name'
                                        className='text-white block mb-2'
                                    >
                                        Company Name
                                    </label>
                                    <InputGroup
                                        name='company_name'
                                        type='text'
                                        placeholder='ABC Logistics'
                                        value={formik.values.company_name}
                                        onChange={formik.handleChange}
                                        className='w-full'
                                    />
                                    {formik.touched.company_name &&
                                        formik.errors.company_name && (
                                            <div className='text-red-500 text-sm mt-1'>
                                                {formik.errors.company_name}
                                            </div>
                                        )}
                                </div>
                                <div className='w-full'>
                                    <label
                                        htmlFor='phone'
                                        className='text-white block mb-2'
                                    >
                                        Phone Number
                                    </label>
                                    <InputGroup
                                        name='phone'
                                        type='text'
                                        placeholder='08012345678'
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        className='w-full'
                                    />
                                    {formik.touched.phone &&
                                        formik.errors.phone && (
                                            <div className='text-red-500 text-sm mt-1'>
                                                {formik.errors.phone}
                                            </div>
                                        )}
                                </div>
                                <div className='w-full'>
                                    <label
                                        htmlFor='email'
                                        className='text-white block mb-2'
                                    >
                                        Email address
                                    </label>
                                    <InputGroup
                                        name='email'
                                        type='email'
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        className='w-full'
                                    />
                                    {formik.touched.email &&
                                        formik.errors.email && (
                                            <div className='text-red-500 text-sm mt-1'>
                                                {formik.errors.email}
                                            </div>
                                        )}
                                </div>
                                <div className='w-full'>
                                    <label
                                        htmlFor='password'
                                        className='text-white block mb-2'
                                    >
                                        Password
                                    </label>
                                    <InputGroup
                                        name='password'
                                        type='password'
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        className='w-full'
                                    />
                                    {formik.touched.password &&
                                        formik.errors.password && (
                                            <div className='text-red-500 text-sm mt-1'>
                                                {formik.errors.password}
                                            </div>
                                        )}
                                </div>
                                <div className='w-full'>
                                    <label
                                        htmlFor='confirm_password'
                                        className='text-white block mb-2'
                                    >
                                        Confirm Password
                                    </label>
                                    <InputGroup
                                        name='confirm_password'
                                        type='password'
                                        value={formik.values.confirm_password}
                                        onChange={formik.handleChange}
                                        className='w-full'
                                    />
                                    {formik.touched.confirm_password &&
                                        formik.errors.confirm_password && (
                                            <div className='text-red-500 text-sm mt-1'>
                                                {formik.errors.confirm_password}
                                            </div>
                                        )}
                                </div>
                                <div className='w-full'>
                                    <label
                                        htmlFor='state'
                                        className='text-white block mb-2'
                                    >
                                        State
                                    </label>
                                    <select
                                        name='state'
                                        value={formik.values.state}
                                        onChange={formik.handleChange}
                                        className='w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        disabled={statesLoading}
                                    >
                                        <option value=''>Select State</option>
                                        {states?.map((state) => (
                                            <option
                                                key={state.state_id}
                                                value={state.state_id}
                                            >
                                                {state.name}
                                            </option>
                                        ))}
                                    </select>
                                    {formik.touched.state &&
                                        formik.errors.state && (
                                            <div className='text-red-500 text-sm mt-1'>
                                                {formik.errors.state}
                                            </div>
                                        )}
                                </div>
                            </div>

                            <Button
                                variant={'secondary'}
                                type='submit'
                                className='w-full'
                                disabled={formik.isSubmitting}
                                onClick={createUser}
                            >
                                {formik.isSubmitting
                                    ? 'Submitting...'
                                    : 'Sign Up'}
                            </Button>
                        </form>
                    </div>

                    <div className='hidden lg:flex w-full lg:flex-1 items-center justify-center bg-[#2686CE78] p-4 sm:p-6 rounded-b-xl lg:rounded-r-xl lg:rounded-bl-none'>
                        <img
                            src={LogisticsSignup}
                            alt='Logistics signup'
                            className='w-full max-w-[400px] h-auto object-contain'
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default LogisticSignup;
