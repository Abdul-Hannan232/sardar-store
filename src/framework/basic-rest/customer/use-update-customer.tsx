import http from '@framework/utils/http';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';

export interface UpdateUserType {
  id?: number;
  name?: string;
  lastName?: string;
  displayName?: string;
  phone?: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  shareProfileData?: boolean;
  setAdsPerformance?: boolean;
}
async function updateUser(input: UpdateUserType) {
  const { data } = await http.put(
    `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/user/${input?.id}`,
    input,
  );
  // console.log('>>>>>>>>>>>>>>>>>> input', data);

  return data;
}

export const useUpdateUserMutation = () => {
  const { width } = useWindowSize();

  return useMutation({
    mutationFn: (input: UpdateUserType) => updateUser(input),
    onSuccess: (data) => {
      if (data.success) {
        toast('User updated Successfully', {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        localStorage.removeItem('user');
      }
      console.log(data, 'UpdateUser success response');
    },
    onError: (data) => {
      console.log(data, 'UpdateUser error response');
    },
  });
};
