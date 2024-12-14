'use client';

import OrderTable from '@components/order/order-table';
import { useOrdersQuery } from '@framework/order/get-all-orders';
import { useState } from 'react';

export default function OrdersPageContent() {

  const isBrowser = typeof window !== 'undefined';

  const [user, setUser] = useState(() => {
    if (isBrowser) {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  const { data, isLoading } = useOrdersQuery({id:user?.id});

  // console.log('>>>>>>>>>>>>>>>>>>> ',data?.data);
  
  return (
    <>
      {!isLoading ? <OrderTable orders={data?.data} /> : <div>Loading...</div>}
    </>
  );
}
