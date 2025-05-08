import { useOrderQuery } from '@framework/order/get-order';
import usePrice from '@framework/product/use-price';
import { OrderItem } from '@framework/types';
import { useRouter } from 'next/navigation';

import Heading from '@components/ui/heading';

const OrderItemCard = ({ product }: { product: OrderItem }) => {
  // console.log("order details >>> ", product);

  const selectedVariation =
    typeof product?.selectedVariation === 'string'
      ? JSON.parse(product?.productDetails.variations || '[]').find(
          (v: any) => v.size === product?.selectedVariation,
        )
      : product?.selectedVariation;

  const { price: itemTotal } = usePrice({
    // amount: product.productDetails?.price * product.quantity,
    amount: selectedVariation?.promo_price_pkr
      ? selectedVariation?.promo_price_pkr * Number(product?.quantity)
      : selectedVariation?.price
        ? selectedVariation?.price * Number(product?.quantity)
        : product.productDetails?.promo_price_pkr
          ? product?.productDetails?.promo_price_pkr * Number(product?.quantity)
          : product?.productDetails?.price
            ? product?.productDetails?.price * Number(product.quantity)
            : null,
    currencyCode: 'PKR',
  });
 

  // console.log('>>>>>>>>>>>>>> order details product', product);

  return (
    <tr
      className="font-normal border-b border-border-base last:border-b-0"
      key={product.id}
    >
      <td className="p-4">
        {product.productDetails.title} * {product.quantity}
      </td>
      <td className="p-4 flex flex-col">
        {itemTotal}{' '}
        {product.productDetails.delivery > 0 && (
          <div className="text-sm text-gray-500">
            Delivery: {product.productDetails.delivery}
          </div>
        )}{' '}
        {product.productDetails.variations  && selectedVariation &&  (
          <div className="text-sm text-gray-500">
            Size: {selectedVariation?.size}
          </div>
        )}{' '}
      </td>
    </tr>
  );
};
const OrderDetails: React.FC<{ className?: string; id?: number }> = ({
  className = 'pt-10 lg:pt-12',
  id,
}) => {
  // const {
  //   query: { id },
  // } = useRouter();
  // const { data: order, isLoading } = useOrderQuery(id?.toString()!);
  const { data: order, isLoading } = useOrderQuery(id as number);
  const { price: subtotal } = usePrice(
    order && {
      amount: order.totalPrice,
      currencyCode: 'PKR',
    },
  );
 
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
          
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">Payment method:</td>
            <td className="p-4">{order?.paymentMethod}</td>
          </tr>
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">Total:</td>
            <td className="p-4">Rs {order?.totalPrice}</td>
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
