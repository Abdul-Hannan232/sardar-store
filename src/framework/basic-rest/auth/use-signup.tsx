'use client';
import { useUI } from '@contexts/ui.context';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
// import { useUser } from '@contexts/user/userContext';
import axios from 'axios';
export interface SignUpInputType {
  email: string;
  password: string;
  name: string;
  remember: boolean;
}
async function signUp(input: SignUpInputType) {
  // const { login } = useUser();

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/user/register`,
      input,
    );  
    // login(response.data);
    // console.log('response', response.data);

    return response.data;
  } catch (error) {
    throw new Error('Signup failed');
    
    // throw new Error(error.response?.data?.message || 'Signup failed');
  }
  // return {

  //   token: `${input.email}.${input.name}`.split('').reverse().join(''),
  // };
}
export const useSignUpMutation = (signin: Function) => {
  const { authorize, closeModal } = useUI();
  return useMutation({
    mutationFn: (input: SignUpInputType) => signUp(input),
    onSuccess: (data) => {
      Cookies.set('auth_token', data.token);
      signin(data.user)
      // Cookies.set('user', data.user);
      authorize();
      // closeModal();
    },
    onError: (data) => {
      console.log(data, 'login error response');
    },
  });
};
