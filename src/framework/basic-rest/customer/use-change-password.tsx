import http from '@framework/utils/http';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';


const isBrowser = typeof window !== 'undefined';

let email= '';
  if (isBrowser) {
    const storedUser = localStorage.getItem('user');
    email =  storedUser ? JSON.parse(storedUser).email : null;
  }




export interface ChangePasswordInputType {
  email: string;
  newPassword: string;
  oldPassword: string;
}
async function changePassword(input: ChangePasswordInputType) {
  const response = await http.post(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/user/change-password`,{ ...input,  email});
  return response.data;
  // return input;
}
export const useChangePasswordMutation = () => {
  const { width } = useWindowSize();

  return useMutation({
    mutationFn: (input: ChangePasswordInputType) => changePassword(input),
    onSuccess: (data) => {
       // @ts-ignore
    toast(data.message, {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
      // console.log(data.message, 'ChangePassword success response');
    },
    onError: (data) => {
      let {response}:any = data
      let message = response.data.message
      toast(message, {
        progressClassName: 'fancy-progress-bar ',
        position: width! > 768 ? 'bottom-right' : 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log(message , 'ChangePassword error response');
    },           
  });
};
