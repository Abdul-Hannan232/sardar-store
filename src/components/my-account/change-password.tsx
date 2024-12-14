'use client';

import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useForm } from 'react-hook-form';
import {
  useChangePasswordMutation,
  ChangePasswordInputType,
} from '@framework/customer/use-change-password';

const defaultValues = {
  oldPassword: '',
  newPassword: '',
};

const ChangePassword = () => {
  const { mutate: changePassword, isPending } = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordInputType>({
    defaultValues,
  });
  function onSubmit(input: ChangePasswordInputType) {
    changePassword(input);
   
  }
  return (
    <>
      <Heading variant="titleLarge">Change Password</Heading>
      <div className="flex flex-col w-full mt-6 lg:w-10/12 2xl:w-9/12 lg:mt-7">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center w-full mx-auto "
        >
          <div className="flex flex-col space-y-5 lg:space-y-7">
            <PasswordInput
              label="Old Password"
              error={errors.oldPassword?.message}
              {...register('oldPassword', {
                required: 'You must need to provide your old password',
              })}
            />
            <PasswordInput
              label="New Password"
              error={errors.newPassword?.message}
              {...register('newPassword', {
                required: `You must need to provide your new password`,
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
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
