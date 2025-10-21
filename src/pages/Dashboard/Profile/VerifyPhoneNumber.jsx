import { useState } from "react";
import { Modal } from "../../../ui";
import { privateAxios } from "../../../utils";
import { backendLink } from "../../../constants";

// call back end api and verify otp is sent then activate modal
const VerifyPhoneNumber = (phoneDetails) => {
    const [isOpen, setIsOpen] = useState(false);

    const sendOTP = async () => {
        console.log(phoneDetails?.number);
        setIsOpen(true);
        const contactBackend = await privateAxios.post(`${backendLink}auth/verify_phone`, { phone: phoneDetails?.number });
        console.log(contactBackend);
        if (contactBackend?.data?.success) {
            //setIsOpen(true);
        }
    }
    return (
        <div>
            <div
                type="button"
                className='px-2 py-1 text-md text-white bg-primary rounded-md cursor-pointer hover:bg-green-500'
                onClick={sendOTP}
            // disabled={phoneDetails?.isVerified}
            >
                Verify number
            </div>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} headerText="Terms of Service">
                <h3>Enter OTP</h3>
                <p>OTP sent to {phoneDetails?.number}</p>
                <ConfirmPhoneNumber />
            </Modal>
        </div>
    )
}

export default VerifyPhoneNumber;

const ConfirmPhoneNumber = () => {
    return (
        <div>
            <input type="text" placeholder='Enter OTP' className='input input-bordered border-black w-full bg-gray-100 text-black text-lg lg:text-xl rounded-none my-2 input-md lg:input-lg' />
        </div>
    )
}