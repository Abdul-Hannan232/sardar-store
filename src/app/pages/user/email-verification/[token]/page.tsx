'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Heading from '@components/ui/heading';
// import PasswordInput from '@components/ui/form/password-input';
// import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';
import { useModalAction } from '@components/common/modal/modal.context';

export interface ChangePasswordInputType {
  password: string;
  confirmPassword: string;
}

const EmailVerfication = () => {
    const router = useRouter();
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isPending, setIsPending] = useState(false);
  const { width } = useWindowSize();
  const { closeModal, openModal } = useModalAction();

 
  useEffect(() => {
    setUserId(searchParams.get('user_id'));
    setToken(searchParams.get('token'));
  }, [searchParams]);

  const onSubmit = async () => {
    if (!userId || !token) {
      toast('Invalid or missing token', {
        progressClassName: 'fancy-progress-bar',
        position: width! > 768 ? 'bottom-right' : 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setMessage('Invalid or missing token');
      return;
    }

    setIsPending(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/user/email-verification/${token}`
      );
      toast(response?.data?.message||'Email verified successfully', {
        progressClassName: 'fancy-progress-bar',
        position: width! > 768 ? 'bottom-right' : 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setMessage(response?.data?.message||'Email verified successfully');
      openModal("EMAIL_VERIFIED")
    //   router.push('/pages/signin');
      
    } catch (error: any) {
        
        toast(error.response?.data?.message || 'Error Email verification', {
        progressClassName: 'fancy-progress-bar',
        position: width! > 768 ? 'bottom-right' : 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setMessage(error.response?.data?.message || 'Error Email verification');
    } finally {
      setIsPending(false);
    }
  };

  useEffect(()=>{
    if(userId && token){
        onSubmit()
    }
  },[userId ,token])
  return (
    <>
      <Heading className="p-5 text-center">Email Verification</Heading>
      <div className="flex flex-col mx-auto w-full mt-3 lg:w-10/12 2xl:w-9/12">
        
      </div>
      {message && <p className="text-center mt-3">{message}</p>}
    </>
  );
};

export default EmailVerfication;
