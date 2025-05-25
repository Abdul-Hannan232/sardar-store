'use client';

import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import { useIsMounted } from '@utils/use-is-mounted';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';

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
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { width } = useWindowSize();

  async function onSubmit(values: ContactFormValues) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/messages/add`,
        {
          fullName: values.name,
          email: values.email,
          phone: values.phone,
          message: values.message,
        },
      );

      if (response.status === 201) {
        toast(response?.data?.message || 'Message sent successfully!', {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        reset(); // Reset the form
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast(
        error.response?.data?.message ||
          'An error occurred while sending the message.',
        {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        },
      );
      console.log(
        error.response?.data?.message ||
          'An error occurred while sending the message.',
      );
    } finally {
      setIsSubmitting(false);
    }
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
      <Button
        loading={isSubmitting}
        variant="formButton"
        className="w-full"
        type="submit"
      >
        {mounted && <>Send Message</>}
      </Button>
    </form>
  );
};

export default ContactForm;
