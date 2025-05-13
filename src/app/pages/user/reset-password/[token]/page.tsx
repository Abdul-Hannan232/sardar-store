// 'use client';

// import PasswordInput from '@components/ui/form/password-input';
// import Button from '@components/ui/button';
// import Heading from '@components/ui/heading';
// import { useForm } from 'react-hook-form';
// import {
//   useChangePasswordMutation,
//   ChangePasswordInputType,
// } from '@framework/customer/use-change-password';
// import { useSearchParams } from 'next/navigation';
// import { useState } from 'react';

// const defaultValues = {
//   oldPassword: '',
//   newPassword: '',
// };

// const ResetPassword = () => {
//  const searchParams = useSearchParams();
// const user_id = searchParams.get('user_id')
// const token = searchParams.get('token')
//     const [password, setPassword] = useState("")
//     const [confirmPassword, setConfirmPassword] = useState("")

//   const { mutate: changePassword, isPending } = useChangePasswordMutation();
// console.log(user_id);
// console.log(token);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ChangePasswordInputType>({
//     defaultValues,
//   });
//   function onSubmit(input: ChangePasswordInputType) {
//     changePassword(input);

//   }
//   return (
//     <>
//       <Heading variant="titleLarge">Change Password</Heading>
//       <div className="flex flex-col w-full mt-6 lg:w-10/12 2xl:w-9/12 lg:mt-7">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex flex-col justify-center w-full mx-auto "
//         >
//           <div className="flex flex-col space-y-5 lg:space-y-7">
//             <PasswordInput
//               label="Old Password"
//               error={errors.oldPassword?.message}
//               {...register('oldPassword', {
//                 required: 'You must need to provide your old password',
//               })}
//             />
//             <PasswordInput
//               label="New Password"
//               error={errors.newPassword?.message}
//               {...register('newPassword', {
//                 required: `You must need to provide your new password`,
//               })}
//             />

//             <div className="relative mt-3">
//               <Button
//                 type="submit"
//                 loading={isPending}
//                 disabled={isPending}
//                 variant="formButton"
//                 className="w-full sm:w-auto"
//               >
//                 Change Password
//               </Button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default ResetPassword;

'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Heading from '@components/ui/heading';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';

export interface ChangePasswordInputType {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
    const router = useRouter();
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isPending, setIsPending] = useState(false);
  const { width } = useWindowSize();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordInputType>();

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  useEffect(() => {
    setUserId(searchParams.get('user_id'));
    setToken(searchParams.get('token'));
  }, [searchParams]);

  const onSubmit = async (data: ChangePasswordInputType) => {
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
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/user/reset-user-password`,
        { token, user_id: userId, password: data.password },
      );
      toast('Password reset successfully', {
        progressClassName: 'fancy-progress-bar',
        position: width! > 768 ? 'bottom-right' : 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setMessage('Password reset successfully');
      router.push('/pages/signin');
      
    } catch (error: any) {
        
        toast(error.response?.data?.message || 'Error resetting password', {
        progressClassName: 'fancy-progress-bar',
        position: width! > 768 ? 'bottom-right' : 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setMessage(error.response?.data?.message || 'Error resetting password');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <Heading className="p-5 text-center">Reset Password</Heading>
      <div className="flex flex-col mx-auto w-full mt-3 lg:w-10/12 2xl:w-9/12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-5 p-5 border flex flex-col gap-3"
        >
          <PasswordInput
            label="New Password:"
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
          />
          <PasswordInput
            label="Confirm Password:"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Confirm password is required',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
          />
          <div className="relative mt-3">
            <Button
              type="submit"
              loading={isPending}
              disabled={isPending}
              variant="formButton"
              className="w-full sm:w-auto"
            >
              Change Password
            </Button>
          </div>
        </form>
      </div>
      {message && <p className="text-center mt-3">{message}</p>}
    </>
  );
};

export default ResetPassword;
