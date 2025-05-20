import { useEffect, useState } from 'react';
import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import TextArea from '@components/ui/form/text-area';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import cn from 'classnames';
import Rate from '@components/ui/rate';
import { useUser } from '@contexts/user/userContext';
import http from '@framework/utils/http';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';
import { useUI } from '@contexts/ui.context';
import { useModalAction } from '../modal/modal.context';

interface ReviewFormProps {
  className?: string;
  productId?: number | string | undefined;
  setReviews?: Function;
  reviews?: any;
  order?: any;
}
interface ReviewFormValues {
  userId: string | number;
  title: string;
  name: string;
  email: string;
  message: string;
  productId?: number | string | undefined;
  ratings: number;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  className = '',
  productId,
  setReviews,
  reviews,
  order,
}) => {
  const { user } = useUser();
  const [rating_custom_icon, set_rating_custom_icon] = useState(0);
  const [ratingError, setRatingError] = useState<boolean>(false);
  const { width } = useWindowSize();
  const { isAuthorized, closeDrawer } = useUI();
  const { openModal } = useModalAction();
  // console.log(">>>>>>>>>> order", order);

  const defaultValues = {
    userId: user?.id,
    productId: productId,
    name: user?.name,
    email: user?.email,
    message: '',
    title: '',
    ratings: rating_custom_icon,
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    defaultValues,
  });

  useEffect(() => {
    setValue('ratings', rating_custom_icon);
  }, [rating_custom_icon]);

  useEffect(() => {
    if (user) {
      setValue('userId', user.id);
      setValue('email', user.email);
      setValue('name', user.name);
    }
  }, [user]);

  async function onSubmit(values: ReviewFormValues) {
    if (!rating_custom_icon) {
      setRatingError(true);
      return;
    }

    if (!isAuthorized) {
      openModal('LOGIN_VIEW');
    } else {
      try {
        // Check if it's a single product or multiple order items
        const reviewPromises = order?.items
          ? order.items.map((item: any) => {
              const reviewData = {
                ...values,
                productId: item.productId, // replace productId for each product
              };
              return http.post(
                `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/reviews/add`,
                reviewData,
              );
            })
          : [
              http.post(
                `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/reviews/add`,
                { ...values, productId: productId }, // use single productId
              ),
            ];

        // wait for all reviews to be submitted
        const responses = await Promise.all(reviewPromises);

        toast('Review submitted successfully!', {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        //  update reviews state for UI
        if (reviews && setReviews) {
          const newReviews = responses.map(
            (response: any) => response.data.review,
          );
          setReviews([...newReviews, ...reviews]);
        }

        setValue('message', '');
        setValue('title', '');
        setValue('ratings', 0);
        set_rating_custom_icon(0);
        setRatingError(false);
        closeDrawer();
      } catch (error: any) {
        console.error(
          'Error saving reviews:',
          error.response?.data || error.message,
        );
        toast('Failed to submit review(s).', {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  }

  // async function onSubmit(values: ReviewFormValues) {
  //   if (!rating_custom_icon) {
  //     setRatingError(true);
  //     return;
  //   }

  //   if (!isAuthorized) {
  //     openModal('LOGIN_VIEW');
  //   } else {
  //     try {
  //       const response = await http.post(
  //         `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/reviews/add`,
  //         values,
  //       );

  //       toast(response?.data?.message || 'Review submitted successfully!', {
  //         progressClassName: 'fancy-progress-bar',
  //         position: width! > 768 ? 'bottom-right' : 'top-right',
  //         autoClose: 1500,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //       });

  //       if (reviews && setReviews) {
  //         setReviews([response?.data?.review, ...reviews]);
  //       }
  //       setValue('message', '');
  //       setValue('title', '');
  //       setValue('ratings', 0);
  //       set_rating_custom_icon(0);
  //       setRatingError(false);
  //     } catch (error: any) {
  //       console.error(
  //         'Error saving review:',
  //         error.response?.data || error.message,
  //       );
  //     }
  //   }
  // }

  return (
    <div className={cn(className)}>
      <Heading className="mb-2">Write your review</Heading>
      <Text>
        Your email address will not be published. Required fields are marked*
      </Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-full mx-auto mt-5 lg:mt-7 xl:mt-9"
        noValidate
      >
        <div className="flex flex-col space-y-5 md:space-y-6 lg:space-y-7">
          <div className="pb-1.5 flex items-center">
            <label className="block text-sm leading-none cursor-pointer shrink-0 text-brand-dark md:text-15px ltr:pr-3 rtl:pl-3">
              Your Rating *
            </label>
            <Rate
              size="lg"
              defaultValue={1}
              value={rating_custom_icon}
              className="-mb-2"
              onChange={(value) => set_rating_custom_icon(value)}
            />
            {ratingError && (
              <p className="text-red-300 text-sm">Rating is required!</p>
            )}
          </div>
          <Input
            label="Title *"
            {...register('title', { required: 'Title is required' })}
            error={errors.title?.message}
            variant="solid"
          />
          <TextArea
            variant="solid"
            label="Message *"
            {...register('message', { required: 'Message is required' })}
            error={errors.message?.message}
          />
          <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 ">
            <Input
              label="Name *"
              // {...register('name', { required: 'Name is required' })}
              {...register('name')}
              className="w-full md:w-1/2 opacity-75 "
              // error={errors.name?.message}
              disabled={true}
              variant="solid"
            />
            <Input
              label="Email *"
              type="email"
              {...register('email')}
              disabled={true}
              className="w-full md:w-1/2 md:ltr:ml-2.5 md:rtl:mr-2.5 lg:ltr:ml-5 lg:rtl:mr-5 mt-2 md:mt-0 opacity-75"
              // error={errors.email?.message}
              variant="solid"
            />
          </div>
          <div className="pt-1">
            <Button
              type="submit"
              className="w-full h-12 text-sm md:mt-1 lg:text-base sm:w-auto"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
