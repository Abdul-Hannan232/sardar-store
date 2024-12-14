import { Metadata } from 'next';
import CompleteOrderContent from './complete-order-content';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Order',
};

export default async function Order() {
  return (
    <>
     <Suspense fallback={<div>Loading...</div>}>
      <CompleteOrderContent />
      </Suspense>
    </>
  );
}
