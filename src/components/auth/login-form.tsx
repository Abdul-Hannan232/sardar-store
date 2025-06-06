'use client';

import { useContext, useState } from 'react';
import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { useLoginMutation, LoginInputType } from '@framework/auth/use-login';
import Logo from '@components/ui/logo';
import Image from '@components/ui/image';
import { useModalAction } from '@components/common/modal/modal.context';
import Switch from '@components/ui/switch';
import CloseButton from '@components/ui/close-button';
import { FaFacebook, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import cn from 'classnames';
import { useUser } from '@contexts/user/userContext';
import { useRouter } from 'next/navigation';
import { useUI } from '@contexts/ui.context';
import Cookies from 'js-cookie';

interface LoginFormProps {
  isPopup?: boolean;
  className?: string;
  redirect?: { link: string; status: boolean };
}

const LoginForm: React.FC<LoginFormProps> = ({
  isPopup = true,
  className,
  redirect,
}) => {
  const { closeModal, openModal } = useModalAction();
  const router = useRouter();
  const { signin, setUser } = useUser();
  const [error, setError] = useState<string | null>(null);
  const { mutate: login, isPending } = useLoginMutation(signin, setError);
  const [remember, setRemember] = useState(false);
  const { authorize } = useUI();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  function onSubmit({ email, password, remember }: LoginInputType) {
    setError(null);

    login(
      { email, password, remember },
      {
        onSuccess: (data) => {
          // console.log('<<lgin ', data);
          if (
            data?.message ===
            "Your email is not verified. We've sent a verification link to your email address. Please check your inbox to complete the verification process."
          ) {
            openModal('SIGNIN_SUCCESS');
            return;
          } 
          
          if(data?.message === "Sigin Successfully!" && data?.success ){
            setUser(data?.user);
            signin(data?.user);
            authorize();
            Cookies.set('auth_token', data.token);

            if (data && redirect && redirect.status) {
              router.push(redirect?.link || '/');
            }
            closeModal();
            return
          }
        },
        onError: (data: any) => {
          const errorMessage =
            (data instanceof Error && data.message) ||
            'Invalid email or password.';

          setError(errorMessage);
          // console.log('Login error:', data);
        },
      },
    );

    // closeModal();
    // console.log(email, password, remember, 'data');
  }
  // function handelSocialLogin() {
  //   login({
  //     email: 'demo@demo.com',
  //     password: 'demo',
  //     remember: true,
  //   });
  //   // closeModal();
  // }

  function handleSignUp() {
    return openModal('SIGN_UP_VIEW');
  }
  function handleForgetPassword() {
    return openModal('FORGET_PASSWORD');
  }
  return (
    <div
      className={cn(
        // 'w-full md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px] relative',
        'w-full   lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px] relative',
        className,
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}

      <div className="flex mx-auto overflow-hidden rounded-lg bg-brand-light">
        <div className="md:w-1/2 lg:w-[55%] xl:w-[60%] registration hidden md:block relative">
          {/* <Image src="/assets/images/login-banner.png" alt="signin" fill /> */}
          <Image
            src="/assets/images/login-banner.png"
            alt="signin"
            width={600}
            height={600}
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md flex flex-col justify-center">
          <div className="mb-6 text-center">
            <div onClick={closeModal}>
              <Logo />
            </div>
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pt-3 ">
              Welcome Back!
            </h4>
            <div className="mt-3 mb-1 text-sm text-center sm:text-15px text-body">
              Don’t have an account?
              <button
                type="button"
                className="text-sm font-semibold text-brand sm:text-15px ltr:ml-1 rtl:mr-1 hover:no-underline focus:outline-none"
                onClick={handleSignUp}
              >
                Create Account
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 text-sm text-center text-red-600">{error}</div>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-3.5">
              <Input
                label="Email Address"
                type="email"
                variant="solid"
                {...register('email', {
                  required: 'You must need to provide your email address',
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please provide valid email address',
                  },
                })}
                error={errors.email?.message}
              />
              <PasswordInput
                label="Password"
                error={errors.password?.message}
                {...register('password', {
                  required: `You must need to provide your password`,
                })}
              />
              <div className="flex items-center justify-center">
                <div className="flex items-center shrink-0">
                  <label className="relative inline-block cursor-pointer switch">
                    <Switch checked={remember} onChange={setRemember} />
                  </label>
                  <label
                    onClick={() => setRemember(!remember)}
                    className="mt-1 text-sm cursor-pointer shrink-0 text-heading ltr:pl-2.5 rtl:pr-2.5"
                  >
                    Remember me
                  </label>
                </div>
                <div className="flex ltr:ml-auto rtl:mr-auto mt-[3px]">
                  <button
                    type="button"
                    onClick={handleForgetPassword}
                    className="text-sm ltr:text-right rtl:text-left text-heading ltr:pl-3 lg:rtl:pr-3 hover:no-underline hover:text-brand-dark focus:outline-none focus:text-brand-dark"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
              <div className="relative">
                <Button
                  type="submit"
                  loading={isPending}
                  disabled={isPending}
                  className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </form>
          {/* <div className="relative flex flex-col items-center justify-center text-sm">
            <span className="mt-6 text-sm text-brand-dark opacity-70">
              or continue with
            </span>
          </div>

          <div className="flex justify-center mt-5 space-x-2.5">
            <button
              className="flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer group border-border-one hover:border-brand focus:border-brand focus:outline-none"
              onClick={handelSocialLogin}
            >
              <FaFacebook className="w-4 h-4 text-opacity-50 transition-all text-brand-dark group-hover:text-brand " />
            </button>
            <button
              className="flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer group border-border-one hover:border-brand focus:border-brand focus:outline-none"
              onClick={handelSocialLogin}
            >
              <FaTwitter className="w-4 h-4 text-opacity-50 transition-all text-brand-dark group-hover:text-brand" />
            </button>
            <button
              className="flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer group border-border-one hover:border-brand focus:border-brand focus:outline-none"
              onClick={handelSocialLogin}
            >
              <FaLinkedinIn className="w-4 h-4 text-opacity-50 transition-all text-brand-dark group-hover:text-brand" />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
