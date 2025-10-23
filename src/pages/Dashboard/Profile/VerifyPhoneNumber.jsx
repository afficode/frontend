import { useEffect, useRef, useState } from "react";
import { TbPhoneCheck } from "react-icons/tb";
import { useNotify, useVerifyPhoneNumber } from "../../../hooks";
import { Button, Modal } from "flowbite-react";
import { BsAlarmFill } from "react-icons/bs";

// call back end api and verify otp is sent then activate modal
const VerifyPhoneNumber = ({ phoneDetails }) => {
    const [openModal, setOpenModal] = useState(false);
    const notify = useNotify();
    const { mutate, isLoading } = useVerifyPhoneNumber('post');

    const sendOTP = async () => {
        mutate({ phone: phoneDetails?.number }, {
            onSuccess: (data) => {
                notify(data?.message, 'success');
                setOpenModal(true);
            },
            onError: (error) => {
                notify(error?.response.data.message, 'error');
            },
        });
    }

    return (
        <div>
            {phoneDetails?.isVerified ? <span className="text-xl"><TbPhoneCheck className="text-green-500" /></span> :
                <>
                    <Button
                        size={'xs'}
                        onClick={sendOTP}
                        className="bg-primary "
                        disabled={isLoading}
                    >
                        Verify Number
                    </Button>
                    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                        <div className="flex flex-col p-4 text-center">
                            <h3>Enter OTP</h3>
                            <p className="my-2">OTP sent to <span className="font-bold underline underline-offset-4 text-primary "> {phoneDetails?.number}</span></p>
                            <ConfirmPhoneNumber phoneDetails={phoneDetails} sendOtp={mutate} setOpenModal={setOpenModal} />
                            <Button onClick={() => setOpenModal(false)} className="bg-primary">Close</Button>
                        </div>
                    </Modal>
                </>}
        </div >
    )
}

export default VerifyPhoneNumber;

const ConfirmPhoneNumber = ({ phoneDetails, sendOtp, setOpenModal }) => {
    const inputLength = 6;
    const [code, setCode] = useState(Array(inputLength).fill(''));
    const inputsRef = useRef([]);
    const notify = useNotify();
    const { mutate, isLoading } = useVerifyPhoneNumber('put');
    const [timer, setTimer] = useState(300);
    const [isExpired, setIsExpired] = useState(false);
    const { number } = phoneDetails;

    const resendOtp = () => {
        sendOtp({ phone: number }, {
            onSuccess: (data) => {
                notify(data?.message, 'success');
                setTimer(300);
                setIsExpired(false);
            },
            onError: (error) => {
                notify(error?.response.data.message, 'error');
            },
        });
    };

    // Handle single key press/change
    const handleOtpChange = (e, index) => {
        const value = e.target.value;

        // Allow only alphanumeric single character
        if (!/^[0-9a-zA-Z]{0,1}$/.test(value)) return;

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

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        const joined = code.join('');
        // Your API call here

        const data = {
            otp: joined,
            phone: number,
        };

        mutate(data, {
            onSuccess: (data) => {
                notify(data?.message, 'success');
                setOpenModal(false);
            },
            onError: (error) => {
                notify(error?.response.data.message, 'error');
            },
        });
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
            <form onSubmit={handleOtpSubmit} className="flex flex-col items-center space-y-4">
                <div className="flex mb-2 space-x-2 rtl:space-x-reverse">
                    {code.map((value, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={value}
                            onChange={(e) => handleOtpChange(e, index)}
                            onKeyUp={(e) => handleKeyUp(e, index)}
                            onPaste={index === 0 ? handlePaste : undefined}
                            ref={(el) => (inputsRef.current[index] = el)}
                            className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                            required
                        />
                    ))}
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center justify-between">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className={'bg-[#047F73]  text-white'}
                        >
                            Verify OTP
                        </Button>
                        <Button
                            onClick={resendOtp}
                            disabled={!isExpired || isLoading}
                            className="bg-primary"
                        >
                            Resend OTP
                        </Button>
                    </div>
                    <p className="text-center text-sm my-4 gap-x-4">
                        OTP expires in: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                        <span className="ml-4">
                            <BsAlarmFill className={`absolute inline-flex mb-4 text-gray ${Math.floor(timer / 60) < 1 ? 'animate-ping flex' : 'hidden'}`} />
                            <BsAlarmFill className={`relative inline-flex text-lg  mb-[6px] ${Math.floor(timer / 60) > 2 ? 'text-green-700' : Math.floor(timer / 60) > 1 ? 'text-yellow-500' : 'text-red-700'}`} />
                        </span>
                    </p>
                </div>
            </form>
        </div>
    )
}