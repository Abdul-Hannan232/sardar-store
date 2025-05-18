'use client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
export interface SignUpInputType {
  email: string;
  password: string;
  name: string;
  remember: boolean;
}
async function signUp(input: SignUpInputType) {

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/user/register`,
      input,
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
}
export const useSignUpMutation = (signin: Function) => {
  return useMutation({
    mutationFn: (input: SignUpInputType) => signUp(input),
    onSuccess: (data) => {
      // console.log(">>>>>>>> data ,", data);
    },
    onError: (data) => {
      console.log(data, 'signup error response');
    },
  });
};
