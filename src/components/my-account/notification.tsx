'use client';

import { useState } from 'react';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import {
  useUpdateUserMutation,
  UpdateUserType,
} from '@framework/customer/use-update-customer';
import Switch from '@components/ui/switch';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';

const defaultValues = {};
const AccountDetails = () => {
  const { mutate: updateUser, isPending } = useUpdateUserMutation();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserType>({
    defaultValues,
  });
  function onSubmit(input: UpdateUserType) {
    updateUser(input);
  }
  return (
    <div className="flex flex-col w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading variant="titleLarge">Personal Information</Heading>
        <NotificationItem
          title="Text messages"
          description="Share your profile information to collect the product search result"
        />
        <NotificationItem
          title="Call before checkout"
          description="To improve your ads search result we need to collect your cookies behavior"
        />

        <Heading variant="titleLarge" className="pt-6 xl:pt-12">
          Account Information
        </Heading>

        <div className="relative">
          <NotificationItem
            title="Latest update about product"
            description="I am sure about taking the latest update of the product"
          />
          <NotificationItem
            title="Website Maintenance"
            description="I am totally responsible for my Website Maintenance service"
          />
        </div>
        <div className="relative flex pt-3 ltr:ml-auto rtl:mr-auto sm:justify-end lg:pt-10">
          <Button
            type="submit"
            loading={isPending}
            disabled={isPending}
            className="w-full h-12 mt-3 sm:w-auto"
            variant="formButton"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;

interface NotificationItemProps {
  title: string;
  description: string;
}
const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  description,
}) => {
  const [checked, setChecked] = useState(true);

  return (
    <div className="relative flex pt-6 lg:pt-10">
      <div className="ltr:pr-2.5 rtl:pl-2.5">
        <Heading className="mb-1 font-medium">{title}</Heading>
        <Text variant="small">{description}</Text>
      </div>
      <div className="ltr:ml-auto rtl:mr-auto">
        <Switch checked={checked} onChange={setChecked} />
      </div>
    </div>
  );
};
