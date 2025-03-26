import { Button, InputGroup } from '../../../ui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNotify } from '../../../hooks';
import { Link, useNavigate } from 'react-router-dom';
import { LogisticsSignup, BoonfuLogo } from '../../../assets/images';
import { useLogisticsLogin } from '../../../hooks/useLogistics';
import { useEffect, useRef } from 'react';

const LogisticLogin = () => {
    const navigate = useNavigate();
    const notify = useNotify();
    const { mutate: login, isLoading } = useLogisticsLogin();
    const timeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .required('Email field is required')
            .email('Invalid email address'),
        password: Yup.string()
            .required()
            .min(8, 'Password must be 8 characters long')
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter'),
    });

    const handleLogin = async () => {
        // e.preventDefault();
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

            // Set submitting state
            formik.setSubmitting(true);

            login(formik.values, {
                onSuccess: (response) => {
                    if (response?.success) {
                        notify('Login successful!', 'success');
                        formik.resetForm();
                        timeoutRef.current = setTimeout(() => {
                            navigate('/logistics/dashboard');
                        }, 2000);
                    } else {
                        notify(response?.message || 'Login failed', 'error');
                    }
                },
                onError: (error) => {
                    notify(
                        error?.response?.data?.message || 'Login failed',
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
        onSubmit: handleLogin,
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
                                Welcome Back
                            </h1>
                            <p>
                                Don't have an account?{' '}
                                <Link
                                    to='/logistics/signup'
                                    className='text-secondary'
                                >
                                    Sign up
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
                            </div>

                            <Button
                                variant={'secondary'}
                                type='submit'
                                className='w-full'
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting
                                    ? 'Signing in...'
                                    : 'Sign In'}
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

export default LogisticLogin;
