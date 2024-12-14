import { useOrderQuery } from '@framework/order/get-order';
import usePrice from '@framework/product/use-price';
import { OrderItem } from '@framework/types';
import { useRouter } from 'next/navigation';

import Heading from '@components/ui/heading';

const OrderItemCard = ({ product }: { product: OrderItem }) => {


  const { price: itemTotal } = usePrice({
    amount: product.productDetails?.price  * product.quantity,
    currencyCode: 'USD',
  });

  // console.log('>>>>>>>>>>>>>> product', product);
  
  return (
    <tr
      className="font-normal border-b border-border-base last:border-b-0"
      key={product.id}
    >
      <td className="p-4">
        {product.productDetails.title} * {product.quantity}
      </td>
      <td className="p-4">{itemTotal}</td>
    </tr>
  );
};
const OrderDetails: React.FC<{ className?: string; id?:number }> = ({
  className = 'pt-10 lg:pt-12',
  id
}) => {
  // const {
  //   query: { id },
  // } = useRouter();
  // const { data: order, isLoading } = useOrderQuery(id?.toString()!);
  const { data: order, isLoading } = useOrderQuery(id as number);
  const { price: subtotal } = usePrice(
    order && {
      amount: order.totalPrice,
      currencyCode: 'USD',
    },
  );
  // const { price: total } = usePrice(
  //   order && {
  //     amount: order.shipping_fee
  //       ? order.total + order.shipping_fee
  //       : order.total,
  //     currencyCode: 'USD',
  //   },
  // );
  // const { price: shipping } = usePrice(
  //   order && {
  //     amount: order.shipping_fee,
  //     currencyCode: 'USD',
  //   },
  // );
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={className}>
      <Heading variant="heading" className="mb-6 xl:mb-7">
        Order details:
      </Heading>
      <table className="w-full text-sm font-semibold text-brand-dark lg:text-base">
        <thead>
          <tr>
            <th className="w-1/2 p-4 bg-fill-secondary ltr:text-left rtl:text-right ltr:first:rounded-tl-md rtl:first:rounded-tr-md">
              Product
            </th>
            <th className="w-1/2 p-4 bg-fill-secondary ltr:text-left rtl:text-right ltr:last:rounded-tr-md rtl:last:rounded-tl-md">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {order?.items.map((product, index) => (
            <OrderItemCard key={index} product={product} />
          ))}
        </tbody>
        <tfoot>
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">Subtotal:</td>
            <td className="p-4">{subtotal}</td>
          </tr>
          {/* <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">Shipping:</td>
            <td className="p-4">
              {shipping}
              <span className="text-[13px] font-normal ltr:pl-1.5 rtl:pr-1.5 inline-block">
                via Flat rate
              </span>
            </td>
          </tr> */}
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">Payment method:</td>
            <td className="p-4">{order?.paymentMethod}</td>
          </tr>
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">Total:</td>
            <td className="p-4">{order?.totalPrice}</td>
          </tr>
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">Note:</td>
            <td className="p-4">new order</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrderDetails;
