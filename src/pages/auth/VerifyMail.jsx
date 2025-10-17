import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendLink } from '../../constants';
import { Modal } from '../../ui';
import axios from 'axios';
import ReverifyEmail from './ReverifyEmail';
import { useNotify } from '../../hooks';

const VerifyMail = () => {
  const notify = useNotify();
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
          notify(response?.data?.message, 'success');
          setTimeout(() => {
            navigate('/auth');
          }, 1000);
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          notify('Error verifying your account. The token is either broken or expired. Please try resending a verification email', 'error');
        } else {
          notify(error.response?.data.message, 'error');
        }
      }
    }
  };
  useEffect(() => {
    verifyEmail();
  }, [location.search]);
  return (
    <div className='bg-white w-full  '>
      <div className='w-full  flex items-center justify-center  '>
        <div className='md:w-[50%] w-[90%] my-[5rem] '>
          <h1 className='text-center text-black text-[1.5rem] font-[500]'>Verifying your email address</h1>
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} modalHeader={true} children={<ReverifyEmail />} headerText={'Reverify Email'} />
        </div>
      </div>
    </div>
  );
};

export default VerifyMail;
