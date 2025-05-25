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
//     currencyCode: 'PKR',
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
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';
import { isString } from 'lodash';
import { useUser } from '@contexts/user/userContext';

const CheckoutCard: React.FC<CheckoutCardProps> = ({ userData }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthorized } = useUI();
  const { setUser } = useUser();

  const { openModal } = useModalAction();

  const id = searchParams.get('id');
  const quantity = searchParams.get('q');
  const variationName = searchParams.get('v');
  const [productData, setProductData] = useState<Product | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { width } = useWindowSize();

  useEffect(() => {
    if (id) {
      const getProductData = async () => {
        try {
          const data = await fetchProduct(`/product/${id}`);

          let variations = data?.variations
            ? JSON.parse(data?.variations as string)
            : [];

          if (variationName && variations?.length > 0) {
            const selectedVariation = variations?.find(
              (v: any) => v.size === variationName,
            );

            // console.log('order',selectedVariation);

            setProductData({
              ...data,
              promo_price_pkr: selectedVariation.promo_price_pkr,
              price: selectedVariation.price,
              variant: variationName,
            });
            setOrder({
              userId: Number(userData?.id),
              items: [
                {
                  productId: data.id,
                  quantity: Number(quantity) || 1,
                  selectedVariation,
                },
              ],
              totalPrice:
                ((selectedVariation.promo_price_pkr
                  ? selectedVariation.promo_price_pkr * Number(quantity)
                  : selectedVariation.price * Number(quantity)) as number) +
                Number(data?.delivery),
            });

            // console.log("order >>> ",{
            //   userId: Number(userData?.id),
            //   items: [{ productId: data.id, quantity: Number(quantity) || 1 , selectedVariation}],
            //   totalPrice: (selectedVariation.promo_price_pkr ? selectedVariation.promo_price_pkr * Number(quantity): selectedVariation.price * Number(quantity)) as number + Number(data?.delivery),
            // });
          } else {
            setProductData(data);
            setOrder({
              userId: Number(userData?.id),
              items: [{ productId: data.id, quantity: Number(quantity) || 1 }],
              totalPrice:
                ((data.promo_price_pkr
                  ? data.promo_price_pkr * Number(quantity)
                  : data.price * Number(quantity)) as number) +
                Number(data?.delivery),
            });
          }

          setLoading(false);
        } catch (error) {
          console.error('Error fetching product data:', error);
          setLoading(false);
        }
      };

      getProductData();
    }
  }, [id, userData]);

  // get cart items
  const { items, total, isEmpty } = useCart();
  // console.log('----------cart', items);
  // console.log('----------productData', productData);
  // console.log('----------isLoading', isLoading);

  const { price: subtotal } = usePrice({
    amount: total,
    currencyCode: 'PKR',
  });

  const updateUser = async (id: number) => {
    if (id) {
      const { data } = await http.put(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/user/${id}`,
        userData,
      );
      // console.log(">>>>>>>>>>>>>> id.. ", data.user);
      setUser(data.user);
      return data;
    }
  };
  // console.log(items);

  //  cart data order

  useEffect(() => {
    if (!productData && items) {
      setLoading(false);

      const orderItems: OrderItem[] = items.map((item) => ({
        productId:
          typeof item?.id === 'string'
            ? parseInt(item?.id?.split('.')[0], 10)
            : Number(item.id),
        // productId: Number(item.id),
        quantity: Number(item.quantity),
        selectedVariation:
          typeof item?.id === 'string' ? item?.id.split('.')[1] : '',
      }));

      const totalPrice = items.reduce(
        (total, item) => total + item.itemTotal + item.delivery,
        0,
      );
      // console.log("----------------- ",totalPrice);

      const order: Order = {
        userId: Number(userData?.id),
        items: orderItems,
        totalPrice: totalPrice,
      };

      setOrder(order);
    }
  }, [productData, items, userData]);

  // place order

  function orderHeader() {
    // console.log(' ggggggggg ', order);

    setIsPending(true);
    updateUser(userData?.id as number);
    const placeOrder = async () => {
      try {
        if (!userData.phone || !userData.address) {
          toast(!userData.phone ? 'Phone is required' : 'Address is required', {
            progressClassName: 'fancy-progress-bar',
            position: width! > 768 ? 'bottom-right' : 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          return;
        }
        const { data } = await http.post(
          `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/order/add`,
          order,
        );

        // console.log('order success ', data);
        data ? router.push(`${ROUTES.ORDER}?oid=${data.id}`) : '';
        return data;
      } catch (error) {
        console.error('Error in Place order:', error);
      } finally {
        setIsPending(false);
      }
    };

    if (!isAuthorized) {
      openModal('LOGIN_VIEW');
      setIsPending(false);
    } else {
      placeOrder();
    }
  }

  type FooterD = {
    id: number;
    name: string;
    price?: string | number;
    delivery?: string | number;
  };

  // console.log(items);

  const totalDelivery =
    items && !id
      ? items?.reduce((acc, item) => acc + Number(item.delivery), 0)
      : // : Number(productData?.delivery) * Number(quantity);
        Number(productData?.delivery);
  const checkoutFooter: FooterD[] = [
    {
      id: 1,
      name: 'Subtotal',
      // price: productData?.price
      //   ? productData?.price * Number(quantity)
      //   : subtotal,
      price: productData?.promo_price_pkr
        ? 'Rs ' + productData?.promo_price_pkr * Number(quantity)
        : productData?.price
          ? productData?.price * Number(quantity)
          : 'Rs ' +
            items?.reduce(
              (acc, item) => acc + item.price * (item?.quantity as number),
              0,
            ),
      // price:  productData?.price
      //   ? "Rs "+ productData?.price * Number(quantity)
      //   : "Rs "+ items?.reduce((acc, item) => acc + (item.price * (item?.quantity as number)), 0),

      delivery: Number(productData?.delivery),
    },
    {
      id: 2,
      name: 'Shipping',
      // price:  productData?.delivery
      // ? Number(productData?.delivery)
      // : 'Rs 0',
      // price: items && !id
      // ? "Rs "+ items?.reduce((acc, item) => acc + Number(item.delivery), 0)
      //   : "Rs "+ Number(productData?.delivery) * Number(quantity)
      price: totalDelivery === 0 ? 'Free Shipping' : 'Rs ' + totalDelivery,
    },
    {
      id: 3,
      name: 'Total',
      price: productData?.promo_price_pkr
        ? 'Rs ' +
          (productData?.promo_price_pkr * Number(quantity) +
            (Number(productData?.delivery) || 0))
        : productData?.price
          ? 'Rs ' +
            (Number(productData?.price) * Number(quantity) +
              (Number(productData?.delivery) || 0))
          : subtotal?.replace('$', 'Rs '),
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
          <CheckoutItem
            item={productData}
            quantity={quantity as string}
            variationName={variationName as string}
          />
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
            mounted && isEmpty && !isAuthorized
              ? 'opacity-40 cursor-not-allowed'
              : '!bg-brand !text-brand-light',
          )}
          loading={isPending}
          onClick={orderHeader}
        >
          Order Now
        </Button>
      </div>
      <Text className="mt-8">
        By placing your order, you agree to be bound by the BoroBazar
        <Link href={`${ROUTES.TERMS}`}>
          <span className="font-medium underline text-brand">
            Terms of Service
          </span>
        </Link>
        and
        <Link href={`${ROUTES.PRIVACY}`}>
          <span className="font-medium underline text-brand">Privacy</span>
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
