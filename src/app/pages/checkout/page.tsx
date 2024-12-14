// import CheckoutCard from '@components/checkout/checkout-card';
// import Container from '@components/ui/container';
// import CheckoutDetails from '@components/checkout/checkout-details';
// import TextArea from '@components/ui/form/text-area';
// import Divider from '@components/ui/divider';
// import { Metadata } from 'next';
// import { useForm } from 'react-hook-form';

// export const metadata: Metadata = {
//   title: 'Checkout',
// };

// interface ContactFormValues {
//   address: string;
//   contact: number | null;
// }

// export default async function CheckoutPage({ data }: { data: any }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ContactFormValues>({
//     defaultValues: {
//       address: '',
//       contact: null,
//       // address: data || '',
//       // contact: data || null,
//     },
//   });

//   function onSubmit(values: ContactFormValues) {
//     console.log(values, 'Delivery Note');
//   }

//   return (
//     <>
//       <Divider />
//       <Container className="py-10 2xl:py-12 checkout">
//         <div className="flex flex-col mx-auto xl:max-w-screen-xl">
//           <div className="flex flex-col flex-wrap grid-cols-1 gap-x-7 xl:gap-x-8 lg:grid lg:grid-cols-12">
//             <div className="w-full col-start-1 col-end-9">
//               {/* <CheckoutDetails /> */}

//               <form onSubmit={handleSubmit(onSubmit)} noValidate>
//                 <div className="mb-6">
//                   <TextArea

//                     inputClassName="focus:border-2 focus:outline-none focus:border-brand"
//                     label="forms:address"
//                     {...register('address')}
//                   />
//                 </div>
//                 <div className="mb-6">
//                   <TextArea

//                     inputClassName="focus:border-2 focus:outline-none focus:border-brand"
//                     label="forms:contact"
//                     {...register('contact')}
//                   />
//                 </div>
//               </form>
//             </div>
//             <div className="w-full col-start-9 col-end-13 mt-7 lg:mt-0">
//               <CheckoutCard />
//             </div>
//           </div>
//         </div>
//       </Container>
//       <Divider />
//     </>
//   );
// }

// import CheckoutCard from '@components/checkout/checkout-card';
// import Container from '@components/ui/container';
// import TextArea from '@components/ui/form/text-area';
// import Divider from '@components/ui/divider';
// import { useForm } from 'react-hook-form';
// import { Metadata } from 'next';
// import DeliveryInstructions from '@components/checkout/delivery-instruction';
// // import { useRouter } from 'next/navigation';

// export const metadata: Metadata = {
//   title: 'Checkout',
// };

// export default function CheckoutPage() {

//   // const router = useRouter();

//   // const { product } = router.query;

//   // let productData ;
//   // if (product) {
//   //   productData = JSON.parse(decodeURIComponent(product));
//   // }
//   interface ContactFormValues {
//     address: string;
//     contact: number | null;
//   }

//   return (
//     <>
//       <Divider />
//       <Container className="py-10 2xl:py-12 checkout">
//         <div className="flex flex-col mx-auto xl:max-w-screen-xl">
//           <div className="flex flex-col flex-wrap grid-cols-1 gap-x-7 xl:gap-x-8 lg:grid lg:grid-cols-12">
//             <div className="w-full col-start-1 col-end-9">
//               <DeliveryInstructions />
//             </div>
//             <div className="w-full col-start-9 col-end-13 mt-7 lg:mt-0">
//               <CheckoutCard />
//             </div>
//           </div>
//         </div>
//       </Container>
//       <Divider />
//     </>
//   );
// }

'use client';
import CheckoutCard from '@components/checkout/checkout-card';
import { Suspense } from 'react';
import Container from '@components/ui/container';
import Divider from '@components/ui/divider';
import { useState } from 'react';
import DeliveryInstructions from '@components/checkout/delivery-instruction';

// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Checkout',
// };

// import { metadata } from './metadata'; // Import metadata

import Head from 'next/head';

interface ContactFormValues {
  address: string | null;
  phone: string | null;
  id: number | null;
}

// let userData : ContactFormValues= { address: '', contact: null }
// export let handleUpdate = (values: ContactFormValues) => {
//   userData = values;
//   // setUserData(values);
// };

export default function CheckoutPage() {
  // let userData : ContactFormValues= { address: '', contact: null }

  const isBrowser = typeof window !== 'undefined';

  const [user, setUser] = useState(() => {
    if (isBrowser) {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const [userData, setUserData] = useState<ContactFormValues>({
    ...user,
    address: user?.address || '',
    phone: user?.phone || null,
    id: user?.id || null,
  });

  let handleUpdate = (values: ContactFormValues) => {
    // userData = values;
    setUserData({ ...user, ...values });
  };

  // console.log('<<<<<<<<<<<<<<< userData', userData);

  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>

      <Divider />
      <Container className="py-10 2xl:py-12 checkout">
        <div className="flex flex-col mx-auto xl:max-w-screen-xl">
          <div className="flex flex-col flex-wrap grid-cols-1 gap-x-7 xl:gap-x-8 lg:grid lg:grid-cols-12">
            <div className="w-full col-start-1 col-end-9">
              {/* <DeliveryInstructions  /> */}
              <DeliveryInstructions onUpdate={handleUpdate} />
            </div>
            <div className="w-full col-start-9 col-end-13 mt-7 lg:mt-0">
            <Suspense fallback={<div>Loading...</div>}>
              <CheckoutCard userData={userData} />
              </Suspense>
            </div>
          </div>
        </div>
      </Container>
      <Divider />
    </>
  );
}
