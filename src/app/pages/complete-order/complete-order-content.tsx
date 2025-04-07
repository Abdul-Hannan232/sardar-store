'use client';
import dynamic from 'next/dynamic';

import OrderInformation from '@components/order/order-information';
// const OrderInformation = dynamic(() => import('@components/order/order-information'), {
//   ssr: false, // Disable server-side rendering for this component
// });
import Container from '@components/ui/container';
import Divider from '@components/ui/divider';
import { useCart } from '@contexts/cart/cart.context';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { isNull } from 'lodash';
// import http from '@framework/utils/http';
// import { Order } from '@framework/types';

export default function CompleteOrderContent() {
  const[id, setId] = useState<number | null>(null)
  const searchParams = useSearchParams();
  const oid = searchParams.get('oid');

  useEffect(() => {
    if (oid) {
      setId(Number(oid))
     
    }
  }, [oid]);
  
  const { resetCart } = useCart();
  useEffect(() => {
    resetCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Divider />
      <Container>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <OrderInformation oid={id  as number} /> */}
        {id ? <OrderInformation oid={id} /> : <div>Loading Order Information...</div>}
        </Suspense>
      </Container>
      <Divider />
    </>
  );
}


