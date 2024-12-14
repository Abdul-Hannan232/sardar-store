'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@components/ui/form/input';
import EmailIcon from '@components/icons/email-icon';
import SendIcon from '@components/icons/send-icon';
import Text from '@components/ui/text';
import Heading from '@components/ui/heading';
import cn from 'classnames';

interface NewsLetterFormValues {
  email: string;
}
const defaultValues = {
  email: '',
};

function SubscriptionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsLetterFormValues>({
    defaultValues,
  });
  const [subscriptionSuccess, setSubscriptionSuccess] =
    useState<Boolean>(false);

  function onSubmit(values: NewsLetterFormValues, e: any) {
    // show success message
    setSubscriptionSuccess(true);

    // remove success message after 3 seconds
    setTimeout(() => {
      setSubscriptionSuccess(false);
    }, 5000);

    // reset form after submit
    e.target.reset();
    console.log(values, 'News letter');
  }
  return (
    <form
      noValidate
      className="relative mt-5 max-w-[400px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="flex items-center absolute ltr:left-0 rtl:right-0 top-0 h-12 px-3.5 transform">
        <EmailIcon className="w-4 2xl:w-[18px] h-4 2xl:h-[18px]" />
      </span>
      <Input
        placeholder="Write your email here"
        type="email"
        id="subscription-email"
        variant="solid"
        className="w-full"
        inputClassName="ltr:pl-10 rtl:pr-10 2xl:px-11 h-12 rounded-md"
        {...register('email', {
          required: `You must need to provide your email address`,
          pattern: {
            value:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: `Please provide valid email address`,
          },
        })}
        error={errors.email?.message}
      />
      {!errors.email && subscriptionSuccess && (
        <p className="my-2 text-13px text-brand">
          Thank you for subscribing to our newsletter
        </p>
      )}
      <button
        className="absolute ltr:right-0 rtl:left-0 top-0 hover:opacity-80 focus:outline-none h-12 px-3 lg:px-3.5 transform scale-90 2xl:scale-100"
        aria-label="Subscribe Button"
      >
        <SendIcon className="w-[18px] 2xl:w-5 h-[18px] 2xl:h-5 rtl:rotate-180" />
      </button>
    </form>
  );
}

interface Props {
  className?: string;
}

const WidgetSubscription: React.FC<Props> = ({ className }) => {
  // const { t } = useTranslation(lang, 'footer');

  return (
    <div className={cn('flex flex-col', className)}>
      <Heading variant="mediumHeading" className="mb-4 lg:mb-6 lg:pb-0.5">
        Subscribe Now
      </Heading>

      <Text className="lg:-mt-1 max-w-[400px]">
        Subscribe your email for newsletter and featured news based on your
        interest
      </Text>
      <SubscriptionForm />
    </div>
  );
};

export default WidgetSubscription;
