// import TextArea from '@components/ui/form/text-area';
// import { useForm } from 'react-hook-form';
// import Text from '@components/ui/text';

// interface ContactFormValues {
//   instructionNote: string;
//   default: boolean;
// }

// const DeliveryInstructions: React.FC<{ data?: any }> = ({ data }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ContactFormValues>({
//     defaultValues: {
//       instructionNote: data || '',
//       default: data || false,
//     },
//   });

//   function onSubmit(values: ContactFormValues) {
//     console.log(values, 'Delivery Note');
//   }

//   return (
//     <div className="w-full">
//       <div className="w-full mx-auto">
//         <form onSubmit={handleSubmit(onSubmit)} noValidate>
//           <div className="mb-6">
//             <TextArea
//               variant="normal"
//               inputClassName="focus:border-2 focus:outline-none focus:border-brand"
//               label="forms:label-delivery-instructions-note"
//               {...register('instructionNote')}
//             />
//           </div>
//           <div className="mb-6">
//             <input
//               id="default-type"
//               type="checkbox"
//               className="w-5 h-5 transition duration-500 ease-in-out border border-gray-300 rounded cursor-pointer form-checkbox focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none focus:checked:bg-brand hover:checked:bg-brand checked:bg-brand"
//               {...register('default', { required: 'Confirm the policy' })}
//             />
//             <label
//               htmlFor="default-type"
//               className="font-medium align-middle ltr:ml-3 rtl:mr-3 text-brand-dark text-15px"
//             >
//               Leave at my door if I am not around
//             </label>
//             <Text className="ltr:ml-8 rtl:mr-8 pt-2.5" variant="small">
//               By selecting this option you accept full responsibility for your
//               order after it has been delivered unattended, including any loss
//               due to theft or damage due to temperature sensitivity.
//             </Text>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DeliveryInstructions;

// 'use client';

// import React, { useState, useEffect  } from 'react';
// import Input from '@components/ui/form/input';
// import TextArea from '@components/ui/form/text-area';
// import { useForm } from 'react-hook-form';

// interface ContactFormValues {
//   address: string;
//   contact: number | null;
// }

// const DeliveryInstructions: React.FC<{ data?: any }> = ({ data }) => {
//   const isBrowser = typeof window !== 'undefined';


//   const [user, setUser] = useState(() => {
//     if (isBrowser) {
//       const storedUser = localStorage.getItem('user');
//       return storedUser ? JSON.parse(storedUser) : null;
//     }
//     return null;
//   });

//   // let user = JSON.parse(localStorage?.getItem('user') as string);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ContactFormValues>({
//     defaultValues: {
//       address: user?.address || '',
//       contact: user?.phone || null,
//     },
//   });

//   const onSubmit = (values: ContactFormValues) => {
//     console.log(values, 'Delivery Note');
//   };

//   return (
//     <div className="w-full">
//       <div className="w-full mx-auto">
//         <form onSubmit={handleSubmit(onSubmit)} noValidate>
//           <div className="mb-6">
//             <TextArea
//               inputClassName="focus:border-2 focus:outline-none focus:border-brand"
//               label="Address"
//               variant="normal"
//               {...register('address', { required: true })}
//               className="w-full lg:w-4/5 "
//             />
//           </div>
//           <div className="mb-6">
//             <Input
//               type="tel"
//               label="Phone/Mobile *"
//               {...register('contact', {
//                 required: 'forms:phone-required',
//               })}
//               error={errors.contact?.message}
//               variant="solid"
//               className="w-full lg:w-4/5 "
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DeliveryInstructions;








'use client';

import React, { useState, useEffect } from 'react';
import Input from '@components/ui/form/input';
import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import http from '@framework/utils/http'; 
import { ContactFormValues ,DeliveryInstructionsProps, User} from '@framework/types';


// import { handleUpdate as onUpdate } from '@pages/pages/checkout/page';





const DeliveryInstructions: React.FC<DeliveryInstructionsProps> = ({ initialData, onUpdate }) => {
// const DeliveryInstructions: React.FC<DeliveryInstructionsProps> = ({ initialData}) => {

  const isBrowser = typeof window !== 'undefined';

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isBrowser) {
        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;
        
        if (user) {
          try {
            const { data } = await http.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/user/${Number(user?.id)}` );
            setUser(data);

          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      }
    };

    fetchUserData();
  }, [isBrowser]);

  // console.log('------------------ ' ,user);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      address: user?.address || '',
      phone: initialData?.phone || user?.phone || null,
      id: initialData?.id || user?.id || null,
    },
  });

  useEffect(() => {
    if (user) {
      setValue('address', user.address as string);
      setValue('phone', user.phone as string);
      setValue('id', user.id as number);
    }
  }, [user, setValue]);
  useEffect(() => {
    const subscription = watch((values) => {
      onUpdate({
        address: values.address || '',
        phone: values.phone || null,
        id:  values.id || null
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  const onSubmit = (values: ContactFormValues) => {
    console.log(values, 'Delivery Note');
  };

  return (
    <div className="w-full">
      <div className="w-full mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-6">
            <TextArea
              inputClassName="focus:border-2 focus:outline-none focus:border-brand"
              label="Address"
              variant="normal"
              {...register('address', { required: true })}
              className="w-full lg:w-4/5 "
            />
          </div>
          <div className="mb-6">
            <Input
              type="tel"
              label="Phone/Mobile *"
              {...register('phone', {
                required: 'forms:phone-required',
              })}
              error={errors.phone?.message}
              variant="solid"
              className="w-full lg:w-4/5 "
            />
          </div>

          {/* <div className="mb-6">
            <Input
              type="hidden"
              {...register('id', {
                required: 'forms:phone-required',
              })}
              error={errors.id?.message}
              variant="solid"
              className="w-full lg:w-4/5 "
            />
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default DeliveryInstructions;
