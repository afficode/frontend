import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendLink } from '../../constants';
import { Modal } from '../../ui';
import axios from 'axios';
import ReverifyEmail from './ReverifyEmail';
import { Button } from '../../ui';
import { toast } from 'react-toastify';

const VerifyMail = () => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const verifyEmail = async () => {
		const searchParams = location.search;
		const token = searchParams.split('?token=')[1];
		if (token) {
			try {
				const response = await axios.get(`${backendLink}auth/verify_account`, {
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				});
				if (response.status === 200) {
					toast.success(response?.data?.message);
					setTimeout(() => {
						navigate('/auth');
					}, 1000);
				}
			} catch (error) {
				if (error?.response?.status === 401) {
					toast.error(
						'Error verifying your account. The token is either broken or expired. Please try resending a verification email'
					);
				} else {
					toast.error(error.response?.data.message);
				}
			}
		}
	};
	useEffect(() => {
		verifyEmail();
	}, [location.search]);
	return (
		<div className="bg-white w-full  ">
			<div className="w-full  flex items-center justify-center  ">
				<div className="md:w-[50%] w-[90%] my-[5rem] ">
					<h1 className="text-center text-black text-[1.5rem] font-[500]">Verify your email address</h1>
					<p className=" text-black text-[1.2rem] font-normal mt-6 text-center">
						To start using Boonfu, confirm your email address <b>and</b> phone number with OTP sent
						respectively, to:
					</p>
					<div className="flex items-center justify-center">
						<div>
							<p className=" text-black text-[1.2rem] font-normal mt-4">
								e-mail: <span className="font-bold">sijuadelawal@gmail.com</span>
							</p>
							<p className=" text-black text-[1.2rem] font-normal ">
								Phone Number: <span className="font-bold">+234890088949048</span>
							</p>
						</div>
					</div>

					<div className="mt-4 ">
						<Button
							variant="primary"
							size="full"
							className="text-[1.1rem] font-semibold"
							onClick={() => setIsOpen(true)}
						>
							Resend email
						</Button>
					</div>
					<div className="mt-4">
						<Button variant="primary" size="full" className="text-[1.1rem] font-semibold">
							Resend OTP
						</Button>
					</div>
					<Modal
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						modalHeader={true}
						children={<ReverifyEmail />}
						headerText={'Reverify Email'}
					/>
				</div>
			</div>
		</div>
	);
};

export default VerifyMail;
