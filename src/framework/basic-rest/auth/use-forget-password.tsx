import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export interface ForgetPasswordType {
  verifyEmail: string;
}
async function forgetPassword(input: ForgetPasswordType) {
console.log(">>>>>> . , ", input);

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/user/forget-password`,
      input,
    );  
    
    // console.log('response', response.data);

    return response.data;
  } catch  (error: any) {
    throw new Error(error.response?.data?.message || 'Forget password failed');
  }
  // return {
  //   ok: true,
  //   message: 'Forget password Successful!',
  // };
}
export const useForgetPasswordMutation = () => {
  return useMutation({
    mutationFn: forgetPassword,
    onSuccess: (_data) => {
      Cookies.remove('auth_token');
    },
    onError: (data) => {
      console.log(data, 'forget password error response');
    },

    //     () => forgetPassword(), {
    //   onSuccess: (_data) => {
    //     Cookies.remove('auth_token');
    //   },
    //   onError: (data) => {
    //     console.log(data, 'forget password error response');
    //   },
    // }
  });
};
