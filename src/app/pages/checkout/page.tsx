'use client';
import CheckoutCard from '@components/checkout/checkout-card';
import { Suspense, useEffect } from 'react';
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
import { useUser } from '@contexts/user/userContext';

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
  const { user: currentuser } = useUser();

  // const isBrowser = typeof window !== 'undefined';

  // const [user, setUser] = useState(() => {
  //   if (isBrowser) {
  //     const storedUser = sessionStorage.getItem('user');
  //     return storedUser ? JSON.parse(storedUser) : null;
  //   }
  //   return null;
  // });

  const [user, setUser] = useState(currentuser);

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

  useEffect(() => {
    setUser(currentuser);
    setUserData({
      address: currentuser?.address || '',
      phone: currentuser?.phone || null,
      id: currentuser?.id || null,
    });
  }, [currentuser]);

  // console.log('<<<<<<<<<<<<<<< currentUser', user);
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
