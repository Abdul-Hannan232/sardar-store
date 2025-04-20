import usePrice from '@framework/product/use-price';
import { calculateTotal } from '@contexts/cart/cart.utils';

export const TotalPrice: React.FC<{ items?: any }> = ({ items }) => {
  // console.log('>>>>>>>>>>>>>>>>>>> ',items);

  const { price } = usePrice({
    amount: Math.round(
      calculateTotal(items?.products) + items?.delivery_fee - items?.discount,
    ),
    currencyCode: 'PKR',
  });
  return <span className="total_price">{price}</span>;
};

export const DiscountPrice = (discount: any) => {
  const { price } = usePrice({
    amount: discount?.discount,
    currencyCode: 'PKR',
  });
  return <>-{price}</>;
};

export const DeliveryFee = (delivery: any) => {
  const { price } = usePrice({
    amount: delivery?.delivery,
    currencyCode: 'PKR',
  });
  return <>{price}</>;
};

export const SubTotalPrice: React.FC<{ items?: any }> = ({ items }) => {
  const { price } = usePrice({
    amount: calculateTotal(items),
    currencyCode: 'PKR',
  });
  return <>{price}</>;
};
