'use client';

import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useForm, Controller } from 'react-hook-form';
import {
  useUpdateUserMutation,
  UpdateUserType,
} from '@framework/customer/use-update-customer';
import Switch from '@components/ui/switch';
import Text from '@components/ui/text';
import { useState } from 'react';
import { fetchUser } from '@framework/auth/fetchUser';




const AccountDetails = () => {

  const isBrowser = typeof window !== 'undefined';

const [user, setUser] = useState(() => {
  
  if (isBrowser) {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
});

const defaultValues = {
  id: user?.id,
  name: user?.name,
  phone: user?.phone,
  email: user?.email,
};

  const { mutate: updateUser, isPending } = useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<UpdateUserType>({
    defaultValues,
  }); 
  async function onSubmit(input: UpdateUserType) {
     updateUser({...user, ...input});
    //  fetchUser();
    
  }
  return (
    <div className="flex flex-col w-full">
      <Heading variant="titleLarge" className="mb-5 md:mb-6 lg:mb-7 lg:-mt-1">
        Personal Information
      </Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-full mx-auto"
        noValidate
      >
        <div className="border-b border-border-base pb-7 md:pb-8 lg:pb-10">
          <div className="flex flex-col space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                label="Name *"
                {...register('name', {
                  required: 'forms:first-name-required',
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.name?.message}
              />
              {/* <Input
                label="Last Name *"
                {...register('lastName', {
                  required: 'forms:last-name-required',
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.lastName?.message}
              /> */}
            </div>
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                type="tel"
                label="Phone/Mobile *"
                {...register('phone', {
                  required: 'forms:phone-required',
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.phone?.message}
              />
            </div>
          </div>
        </div>
        <Heading
          variant="titleLarge"
          className="pt-6 mb-5 xl:mb-8 md:pt-7 lg:pt-8"
        >
          Account Information
        </Heading>
        <div className="border-b border-border-base pb-7 md:pb-9 lg:pb-10">
          <div className="flex flex-col space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                type="email"
                label="Email"
                {...register('email', {
                  required: 'forms:email-required',
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'forms:email-error',
                  },
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.email?.message}
              />
            </div>
            {/* <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <PasswordInput
                label="Password"
                {...register('password', {
                  required: 'forms:password-required',
                })}
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.password?.message}
              />
              <PasswordInput
                label="Confirm Password"
                {...register('confirmPassword', {
                  required: 'forms:password-required',
                })}
                error={errors.confirmPassword?.message}
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
              />
            </div> */}
          </div>
        </div>
        <div className="relative flex pt-6 md:pt-8 lg:pt-10">
          <div className="ltr:pr-2.5 rtl:pl-2.5">
            <Heading className="mb-1 font-medium">Share Profile Data</Heading>
            <Text variant="small">
              Share your profile information to collect the product search
              result
            </Text>
          </div>
          <div className="ltr:ml-auto rtl:mr-auto">
            <Controller
              name="shareProfileData"
              control={control}
              defaultValue={true}
              render={({ field: { value, onChange } }) => (
                <Switch onChange={onChange} checked={value} />
              )}
            />
          </div>
        </div>
        <div className="relative flex mt-5 mb-1 md:mt-6 lg:mt-7 sm:mb-4 lg:mb-6">
          <div className="ltr:pr-2.5 rtl:pl-2.5">
            <Heading className="mb-1 font-medium">Ads Performance</Heading>
            <Text variant="small">
              To improve your ads search result we need to collect your cookies
              behavior
            </Text>
          </div>
          <div className="ltr:ml-auto rtl:mr-auto">
            <Controller
              name="setAdsPerformance"
              control={control}
              defaultValue={true}
              render={({ field: { value, onChange } }) => (
                <Switch onChange={onChange} checked={value} />
              )}
            />
          </div>
        </div>
        <div className="relative flex pb-2 mt-5 sm:ltr:ml-auto sm:rtl:mr-auto lg:pb-0">
          <Button
            type="submit"
            loading={isPending}
            disabled={isPending}
            variant="formButton"
            className="w-full sm:w-auto"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
