import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { backendLink } from '../../constants';
import axios from 'axios';
import { useNotify } from '../../hooks';
import { BsAlarmFill } from 'react-icons/bs';
import { Button } from '../../ui';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Alert } from 'flowbite-react';

const VerifyMail = () => {
    const notify = useNotify();
    const location = useLocation();
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const sendOtp = async () => {
        const searchParams = location.search;
        const token = searchParams.split('?token=')[1];

        if (token) {
            try {
                const response = await axios.post(
                    `${backendLink}auth/verify_phone`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (response.status === 204) {
                    notify('Your account has been verified, You can now login', 'info');
                    setTimeout(() => {
                        navigate('/auth');
                    }, 8000);
                    return;
                }
                if (response.status === 200) {
                    notify(response?.data?.message, 'success');
                    setOtpSent(true);
                    setError('');
                    // notify('An OTP has been sent to your registered phone number', 'success');
                }
            } catch (error) {
                if (error?.response?.status === 401) {
                    notify('An error occurred while sending an OTP', 'error');
                } else {
                    notify(error.response?.data.message, 'error');
                }
                setError(error.response?.data.message || 'An error occurred while sending an OTP');
            }
        }
    };

    useEffect(() => {
        sendOtp();
    }, [location.search]);
    const otpSize = 50;
    const handleReload = () => {
        window.location.reload();
    };

    if (error !== '') {
        return (
            <Alert
                color={'failure'}
                withBorderAccent
                className='w-full flex items-center justify-center my-4'
            >
                <div className='w-full flex flex-col items-center justify-center mx-auto'>
                    <h1 className='text-center text-xl'>Account Verification - OTP Error</h1>
                    <p className='w-full text-center my-4'>
                        Error sending OTP. Please reload the page. <br />
                        If this persist, please contact admin with the contact us form.
                    </p>
                    <button onClick={handleReload} className='btn btn-primary text-white mx-auto'>
                        Reload
                    </button>
                </div>
            </Alert>
        );
    }
    return otpSent ? (
        <div className='bg-white w-full  '>
            <div className='w-full  flex items-center justify-center  '>
                <div className='md:w-[50%] w-[90%] my-[5rem] '>
                    <h1 className='text-center text-black text-[1.5rem] font-[500]'>
                        Verify your phone number
                    </h1>
                    <div className='flex flex-col p-4 text-center'>
                        <h4>Enter OTP</h4>
                        <p className='my-2'>OTP sent to your registered phone number</p>
                        <ConfirmPhoneNumber />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className='w-full container flex flex-col items-center justify-center py-8'>
            <Skeleton width={300} height={40} className='mb-4' />
            <Skeleton width={250} height={30} className='mb-3' />
            <Skeleton width={200} height={20} className='mb-4' />
            <div className='w-full flex justify-center space-x-4'>
                <Skeleton width={otpSize} height={otpSize} className='inline-block' />
                <Skeleton width={otpSize} height={otpSize} className='inline-block' />
                <Skeleton width={otpSize} height={otpSize} className='inline-block' />
                <Skeleton width={otpSize} height={otpSize} className='inline-block' />
                <Skeleton width={otpSize} height={otpSize} className='inline-block' />
                <Skeleton width={otpSize} height={otpSize} className='inline-block' />
            </div>
            <Skeleton width={150} height={otpSize} className='inline-block mt-4' />
        </div>
    );
};

export default VerifyMail;

const ConfirmPhoneNumber = () => {
    const inputLength = 6;
    const [code, setCode] = useState(Array(inputLength).fill(''));
    const inputsRef = useRef([]);
    const notify = useNotify();
    const [timer, setTimer] = useState(300);
    const [isExpired, setIsExpired] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const resendOtp = async () => {
        const searchParams = location.search;
        const token = searchParams.split('?token=')[1];

        try {
            const response = await axios.post(
                `${backendLink}auth/verify_phone`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 200) {
                notify(response.data?.message, 'success');
                setTimer(300);
                setIsExpired(false);
            }
        } catch (error) {
            if (error?.response?.status === 401) {
                notify(error?.response.data.message, 'error');
            } else {
                notify(error.response?.data.message, 'error');
            }
        }
    };

    // Handle single key press/change
    const handleOtpChange = (e, index) => {
        const { value } = e.target;

        // Allow only alphanumeric single character
        if (!/^[0-9a-zA-Z]{0,1}$/.test(value)) {
            return;
        }

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && inputsRef.current[index + 1]) {
            inputsRef.current[index + 1].focus();
        }
    };

    // Handle key up to detect backspace and focus previous
    const handleKeyUp = (e, index) => {
        if (e.key === 'Backspace' && !code[index] && inputsRef.current[index - 1]) {
            inputsRef.current[index - 1].focus();
        }
    };

    // Handle paste
    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = (e.clipboardData || window.clipboardData).getData('text');
        const chars = pasteData.replace(/\D/g, '').split('');

        const newCode = [...code];
        chars.forEach((char, i) => {
            if (i < inputLength) {
                newCode[i] = char;
            }
        });
        setCode(newCode);

        // Focus the next empty input
        const firstEmptyIndex = newCode.findIndex((c) => c === '');
        if (firstEmptyIndex !== -1 && inputsRef.current[firstEmptyIndex]) {
            inputsRef.current[firstEmptyIndex].focus();
        } else if (inputsRef.current[inputLength - 1]) {
            inputsRef.current[inputLength - 1].focus();
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        const joined = code.join('');

        const searchParams = location.search;
        const token = searchParams.split('?token=')[1];

        const data = {
            otp: joined,
        };

        if (token) {
            try {
                const response = await axios.post(`${backendLink}auth/verify_account`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    setIsLoading(false);
                    notify(response?.data?.message, 'success');
                    setTimeout(() => {
                        navigate('/auth');
                    }, 1000);
                }
            } catch (error) {
                setIsLoading(false);
                if (error?.response?.status === 401) {
                    notify(
                        error?.response.data.message ||
                            'Error verifying your account. The token is either broken or expired. Please try resending a verification email',
                        'error'
                    );
                } else {
                    notify(error.response?.data.message, 'error');
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        if (timer === 0) {
            setIsExpired(true);
            return;
        }

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    return (
        <div>
            <form onSubmit={handleOtpSubmit} className='flex flex-col items-center space-y-4'>
                <div className='flex mb-2 space-x-2 rtl:space-x-reverse'>
                    {code.map((value, index) => (
                        <input
                            key={index}
                            type='text'
                            maxLength='1'
                            value={value}
                            onChange={(e) => handleOtpChange(e, index)}
                            onKeyUp={(e) => handleKeyUp(e, index)}
                            onPaste={index === 0 ? handlePaste : undefined}
                            ref={(el) => (inputsRef.current[index] = el)}
                            className='block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary'
                            required
                        />
                    ))}
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='flex gap-2 items-center justify-between'>
                        <Button
                            type='submit'
                            disabled={isLoading}
                            className={'bg-[#047F73]  text-white p-2'}
                        >
                            Verify OTP
                        </Button>
                        <Button
                            type='button'
                            onClick={resendOtp}
                            disabled={!isExpired || isLoading}
                            className='bg-primary p-2'
                        >
                            Resend OTP
                        </Button>
                    </div>
                    <p className='text-center text-sm my-4 gap-x-4'>
                        OTP expires in: {Math.floor(timer / 60)}:
                        {(timer % 60).toString().padStart(2, '0')}
                        <span className='ml-4'>
                            <BsAlarmFill
                                className={`absolute inline-flex mb-4 text-gray ${
                                    Math.floor(timer / 60) < 1 ? 'animate-ping flex' : 'hidden'
                                }`}
                            />
                            <BsAlarmFill
                                className={`relative inline-flex text-lg  mb-[6px] ${
                                    Math.floor(timer / 60) > 2
                                        ? 'text-green-700'
                                        : Math.floor(timer / 60) > 1
                                            ? 'text-yellow-500'
                                            : 'text-red-700'
                                }`}
                            />
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};
