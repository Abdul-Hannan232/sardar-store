import { useUI } from '@contexts/ui.context';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useModalAction } from '@components/common/modal/modal.context';

export interface LoginInputType {
  email: string;
  password: string;
  remember: boolean;
}
async function login(input: LoginInputType) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/user/login`,
      input,
    );

    // console.log('response', response.data);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message || 'Sigin failed');
    // throw new Error(error.response?.data?.message || 'Signup failed');
  }
  // return {
  //   token: `${input.email}.${input.remember}`.split('').reverse().join(''),
  // };
}
export const useLoginMutation = (signin: Function, setError: Function) => {
  const { authorize } = useUI();
  // const { closeModal, openModal } = useModalAction();
  return useMutation({
    mutationFn: (input: LoginInputType) => login(input),
    onSuccess: (data, variables, context) => {
      
        // Cookies.set('auth_token', data.token);
        // signin(data.user);
        authorize();
       

      // closeModal();
    },
    onError: (data) => {
      setError(data || 'Invalid email or password.');
      console.log('login error response', data);
    },
  });
};
