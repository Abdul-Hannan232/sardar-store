'use client';

import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import { useIsMounted } from '@utils/use-is-mounted';

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>();

  function onSubmit(values: ContactFormValues) {
    console.log(values, 'Contact');
  }

  const mounted = useIsMounted();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <Input
        variant="solid"
        label="Full Name (required)"
        placeholder="Enter Your Full Name"
        {...register('name', {
          required: 'You must need to provide your full name',
        })}
        error={errors.name?.message}
      />
      <Input
        type="email"
        variant="solid"
        label="Email Address (required)"
        placeholder="Enter Your Email"
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
      <Input
        variant="solid"
        type="text"
        label="Phone (Optional)"
        placeholder="Enter Your Phone"
        {...register('phone')}
      />
      <TextArea
        variant="solid"
        label="Message"
        {...register('message')}
        placeholder="Briefly describe.."
      />
      <Button variant="formButton" className="w-full" type="submit">
        {mounted && <>Send Message</>}
      </Button>
    </form>
  );
};

export default ContactForm;
