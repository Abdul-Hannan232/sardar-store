import { useUI } from '@contexts/ui.context';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

export interface LoginInputType {
  email: string;
  password: string;
  remember: boolean;
}
async function logout() {
  return {
    ok: true,
    message: 'Logout Successful!',
  };
}
export const useLogoutMutation = () => {
// export const useLogoutMutation = (logoutuser: Function) => {
  const { unauthorize } = useUI();
  const router = useRouter();
  return useMutation({
    mutationFn: logout,
    onSuccess: (_data) => {
      Cookies.remove('auth_token');
      // logoutuser()
      localStorage.removeItem('user');
      unauthorize();
      // router.push(`/${lang}`);
      router.push(`/`);
    },
    onError: (data) => {
      console.log(data, 'logout error response');
    },
  });
};
