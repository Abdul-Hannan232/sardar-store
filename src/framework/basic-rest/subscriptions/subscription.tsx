// 'use client';
// import { useUI } from '@contexts/ui.context';
// import { useMutation } from '@tanstack/react-query';
// import axios from 'axios';
// export interface SubscriptionType {
//   email: string;
//  }
// async function Subscription(email: SubscriptionType) {
//   try {
//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/subscriptions/add`,
//       email,
//     );  
   

//     return response.data;
//   } catch (error) {
//     throw new Error('Subscription failed');
    
//   }
// }
// export const useSubscriptionMutation = () => {
//   return useMutation({
//     mutationFn: (email: SubscriptionType) => Subscription(email),
//     onSuccess: (data) => {
//         // console.log("Subscribe Successful , data ", data);
        
//     },
//     onError: (data) => {
//       console.log('subscription error response' , data);
//     },
//   });
// };



'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';


export interface SubscriptionType {
  email: string;
}

// API call for adding subscription
async function Subscription(email: SubscriptionType) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/subscriptions/add`,
      email
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Server error
      throw new Error(error.response.data.message || "Subscription failed");
    } else {
      // Network or other errors
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
}

// Hook for using the subscription mutation
export const useSubscriptionMutation = () => {
      const { width } = useWindowSize();

  return useMutation({
    mutationFn: (email: SubscriptionType) => Subscription(email),
    onSuccess: (data) => {
      toast(data.message || "Subscribed successfully!",  {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    },
    onError: (error: any) => {
     toast(error?.message  , {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    },
  });
};
