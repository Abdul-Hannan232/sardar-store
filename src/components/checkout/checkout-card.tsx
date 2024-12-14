// 'use client';

// import Link from 'next/link';
// import usePrice from '@framework/product/use-price';
// import cn from 'classnames';
// import { useCart } from '@contexts/cart/cart.context';
// import Text from '@components/ui/text';
// import Button from '@components/ui/button';
// import { CheckoutItem } from '@components/checkout/checkout-card-item';
// import { CheckoutCardFooterItem } from './checkout-card-footer-item';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { ROUTES } from '@utils/routes';
// import { useIsMounted } from '@utils/use-is-mounted';
// import { useEffect, useState } from 'react';
// import SearchResultLoader from '@components/ui/loaders/search-result-loader';
// import { useProductsQuery } from '@framework/product/get-all-products';
// import { fetchProduct } from '@framework/product/get-product';
// import http from '@framework/utils/http';
// import { Product } from '@framework/types';
// import { useUI } from '@contexts/ui.context';
// import { useModalAction } from '@components/common/modal/modal.context';

// const CheckoutCard = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { isAuthorized } = useUI();
//   const { openModal } = useModalAction();

//   const id = searchParams.get('id');
//   const quantity = searchParams.get('q');
//   const [productData, setProductData] = useState<Product | null>(null);
//   const [isLoading, setLoading] = useState(true);

//   useEffect(() => {
//     if (id) {
//       const getProductData = async () => {
//         try {
//           const data = await fetchProduct(`/product/${id}`);
//           setProductData(data);
//           setLoading(false);
//         } catch (error) {
//           console.error('Error fetching product data:', error);
//           setLoading(false);
//         }
//       };

//       getProductData();
//     }
//   }, [id]);
//   //   console.log('productData ------------', id);
//   // console.log('productData ------------', quantity);
//   // console.log('tData ------------', productData);

//   useEffect(() => {
//     setLoading(false);
//   }, []);
//   const { items, total, isEmpty } = useCart();
//   const { price: subtotal } = usePrice({
//     amount: total,
//     currencyCode: 'USD',
//   });
//   function orderHeader() {
//     !isAuthorized ? openModal('LOGIN_VIEW') : router.push(`${ROUTES.ORDER}`);

//     // !isEmpty && router.push(`${ROUTES.ORDER}`);
//   }

//   type FooterD ={
//     id:number,
//     name:string,
//     price?: string | number
//   }
//   const checkoutFooter:FooterD[] = [
//     {
//       id: 1,
//       name: 'Subtotal',
//       price: productData?.price  ?  productData?.price * Number(quantity) :  subtotal,
//     },
//     {
//       id: 2,
//       name: 'Shipping',
//       price: '$0',
//     },
//     {
//       id: 3,
//       name: 'Total',
//       price: productData?.price  ?  productData?.price * Number(quantity) :  subtotal,
//     },
//   ];
//   const mounted = useIsMounted();
//   return (
//     <>
//       <div className="px-4 pt-4 border rounded-md border-border-base text-brand-light xl:py-6 xl:px-7">
//         <div className="flex pb-2 text-sm font-semibold rounded-md text-heading">
//           <span className="font-medium text-15px text-brand-dark">Product</span>
//           <span className="font-medium ltr:ml-auto rtl:mr-auto shrink-0 text-15px text-brand-dark">
//             Subtotal
//           </span>
//         </div>
//         {isLoading ? (
//           <div className="w-full">
//             <SearchResultLoader uniqueKey={`product-key`} />
//           </div>
//         ) : productData ? (
//            <CheckoutItem item={productData} quantity={quantity as string}/>
//         ) : !productData && !isEmpty && mounted ? (
//           items.map((item) => <CheckoutItem item={item} key={item.id} />)
//         ) : (
//           <p className="py-4 text-brand-danger text-opacity-70">
//             Your cart is empty.
//           </p>
//         )}
//         {mounted &&
//           checkoutFooter.map((item: any) => (
//             <CheckoutCardFooterItem item={item} key={item.id} />
//           ))}
//         <Button
//           variant="formButton"
//           className={cn(
//             'w-full mt-8 mb-5 rounded font-semibold px-4 py-3 transition-all',
//             mounted && isEmpty
//               ? 'opacity-40 cursor-not-allowed'
//               : '!bg-brand !text-brand-light',
//           )}
//           onClick={orderHeader}
//         >
//           Order Now
//         </Button>
//       </div>
//       <Text className="mt-8">
//         By placing your order, you agree to be bound by the BoroBazar
//         <Link href={`${ROUTES.TERMS}`} legacyBehavior>
//           <a className="font-medium underline text-brand">Terms of Service</a>
//         </Link>
//         and
//         <Link href={`${ROUTES.PRIVACY}`} legacyBehavior>
//           <a className="font-medium underline text-brand">Privacy</a>
//         </Link>
//         . Your credit/debit card data will not saved.
//       </Text>
//       <Text className="mt-4">
//         A bag fee may be added to your final total if required by law or the
//         retailer. The fee will be visible on your receipt after delivery.
//       </Text>
//     </>
//   );
// };

// export default CheckoutCard;

'use client';
import Link from 'next/link';
import usePrice from '@framework/product/use-price';
import cn from 'classnames';
import { useCart } from '@contexts/cart/cart.context';
import Text from '@components/ui/text';
import Button from '@components/ui/button';
import { CheckoutItem } from '@components/checkout/checkout-card-item';
import { CheckoutCardFooterItem } from './checkout-card-footer-item';
import { useRouter, useSearchParams } from 'next/navigation';
import { ROUTES } from '@utils/routes';
import { useIsMounted } from '@utils/use-is-mounted';
import { useEffect, useState } from 'react';
import SearchResultLoader from '@components/ui/loaders/search-result-loader';
import { fetchProduct } from '@framework/product/get-product';
import { Product } from '@framework/types';
import { useUI } from '@contexts/ui.context';
import { useModalAction } from '@components/common/modal/modal.context';
import http from '@framework/utils/http';
import { Order, OrderItem, CheckoutCardProps } from '@framework/types';



const CheckoutCard: React.FC<CheckoutCardProps> = ({ userData }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthorized } = useUI();
  const { openModal } = useModalAction();

  const id = searchParams.get('id');
  const quantity = searchParams.get('q');
  const [productData, setProductData] = useState<Product | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (id) {
      const getProductData = async () => {
        try {
          const data = await fetchProduct(`/product/${id}`);
          setProductData(data);
          setOrder({
            userId: Number(userData?.id),
            items: [{ productId: data.id, quantity: Number(quantity) || 1 }],
            totalPrice: (data.price * Number(quantity)) as number,
          });
          setLoading(false);
        } catch (error) {
          console.error('Error fetching product data:', error);
          setLoading(false);
        }
      };

      getProductData();
    }
  }, [id]);

  // get cart items
  const { items, total, isEmpty } = useCart();
  // console.log('----------cart', items);
  // console.log('----------productData', productData);
  // console.log('----------isLoading', isLoading);

  const { price: subtotal } = usePrice({
    amount: total,
    currencyCode: 'USD',
  }); 

  const updateUser = async (id: number) => {
    if(id){
      const { data } = await http.put(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/user/${id}`,
        userData,
      );
  
      return data;
    }
   
  };

  //  cart data order

  useEffect(() => {
    if (!productData && items) {
      setLoading(false);

      const orderItems: OrderItem[] = items.map((item) => ({
        productId: Number(item.id),
        quantity: Number(item.quantity),
      }));

      // Calculate total price
      const totalPrice = items.reduce(
        (total, item) => total + item.itemTotal,
        0,
      );

      const order: Order = {
        userId: Number(userData?.id),
        items: orderItems,
        totalPrice: totalPrice,
      };

      setOrder(order);
    }
  }, [productData, items]);

  // place order

  function orderHeader () {
    // console.log('items  -------------------  ', order);

    // console.log('User Data:', userData);
    updateUser(userData?.id as number);
    // console.log('oredr ------------------- ', order);

    const placeOrder = async () => {
      try {
        const { data } = await http.post(
          `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/order/add`,
          order,
        );
       
        console.log('order success ', data);
       data ? router.push(`${ROUTES.ORDER}?oid=${data.id}`) : ''
        return data;
      } catch (error) {
        console.error('Error in Place order:', error);
      }
    };
    
    !isAuthorized ? openModal('LOGIN_VIEW') : placeOrder();
  }

  type FooterD = {
    id: number;
    name: string;
    price?: string | number;
  };

  const checkoutFooter: FooterD[] = [
    {
      id: 1,
      name: 'Subtotal',
      price: productData?.price
        ? productData?.price * Number(quantity)
        : subtotal,
    },
    {
      id: 2,
      name: 'Shipping',
      price: '$0',
    },
    {
      id: 3,
      name: 'Total',
      price: productData?.price
        ? productData?.price * Number(quantity)
        : subtotal,
    },
  ];

  const mounted = useIsMounted();
  return (
    <>
      <div className="px-4 pt-4 border rounded-md border-border-base text-brand-light xl:py-6 xl:px-7">
        <div className="flex pb-2 text-sm font-semibold rounded-md text-heading">
          <span className="font-medium text-15px text-brand-dark">Product</span>
          <span className="font-medium ltr:ml-auto rtl:mr-auto shrink-0 text-15px text-brand-dark">
            Subtotal
          </span>
        </div>
        {isLoading ? (
          <div className="w-full">
            <SearchResultLoader uniqueKey={`product-key`} />
          </div>
        ) : productData ? (
          <CheckoutItem item={productData} quantity={quantity as string} />
        ) : !productData && !isEmpty && mounted ? (
          items.map((item) => <CheckoutItem item={item} key={item.id} />)
        ) : (
          <p className="py-4 text-brand-danger text-opacity-70">
            Your cart is empty.
          </p>
        )}
        {mounted &&
          checkoutFooter.map((item: any) => (
            <CheckoutCardFooterItem item={item} key={item.id} />
          ))}
        <Button
          variant="formButton"
          className={cn(
            'w-full mt-8 mb-5 rounded font-semibold px-4 py-3 transition-all',
            mounted && isEmpty
              ? 'opacity-40 cursor-not-allowed'
              : '!bg-brand !text-brand-light',
          )}
          onClick={orderHeader}
        >
          Order Now
        </Button>
      </div>
      <Text className="mt-8">
        By placing your order, you agree to be bound by the BoroBazar
        <Link href={`${ROUTES.TERMS}`} legacyBehavior>
          <a className="font-medium underline text-brand">Terms of Service</a>
        </Link>
        and
        <Link href={`${ROUTES.PRIVACY}`} legacyBehavior>
          <a className="font-medium underline text-brand">Privacy</a>
        </Link>
        . Your credit/debit card data will not be saved.
      </Text>
      <Text className="mt-4">
        A bag fee may be added to your final total if required by law or the
        retailer. The fee will be visible on your receipt after delivery.
      </Text>
    </>
  );
};

export default CheckoutCard;
