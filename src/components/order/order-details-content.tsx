import usePrice from '@framework/product/use-price';
import Image from '@components/ui/image';

export const OrderDetailsContent: React.FC<{ item?: any }> = ({ item }) => {
  // console.log('----------- product ',item);

  // const { price } = usePrice({
  //   amount: item.productDetails.price,
  //   currencyCode: 'PKR',
  // });
const product = item
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

  let gallery: string[] = [];
  if (item?.productDetails.gallery) {
    try {
      gallery = Array.isArray(item.productDetails.gallery)
        ? item.productDetails.gallery
        : JSON.parse(item.productDetails.gallery);
    } catch (error) {
      console.error('Failed to parse gallery:', error);
    }
  }

  return (
    <div className="relative grid grid-cols-12 py-2 pb-0 border-b border-solid border-border-base text-[12px] md:text-[14px]">
      <div className="self-center col-span-2">
      {Array.isArray(gallery) && gallery?.length > 0 ? (
          <Image
            // src={gallery[0].replace(
            //   'http://localhost:4000/',
            //   'http://localhost:5055/',
            // ) ?? '/assets/placeholder/order-product.svg'}
            src={gallery[0] ?? '/assets/placeholder/order-product.svg'}
            alt={item?.productDetails.title || 'Product Image'}
            width="60"
            height="60"
            quality={100}
            className="object-cover"
            style={{ width: 'auto' }}
          />
        ) : (
          <Image
          src={item?.productDetails.image}
          alt={item?.productDetails.title || 'Product Image'}
          width="60"
          height="60"
          quality={100}
          className="object-cover"
          style={{ width: 'auto' }}
        /> 
        )}
       
      </div>
      <div className="self-center col-span-5">
        <h2 className="text-brand-dark">{item?.productDetails.title}</h2>
      </div>
      <div className="self-center col-span-3 text-center md:ltr:text-left md:rtl:text-right">
        {typeof item.quantity === 'number' && <p>{item.quantity}x</p>}
      </div>
      <div className="self-center col-span-2">
        {/* {typeof item.productDetails.price === 'number' && <p>{price}</p>} */}
        <div>{itemTotal} 
         {product.productDetails.delivery > 0 ? (
          <div className="min-w-[100px] text-sm text-gray-500">
            Delivery: Rs {product.productDetails.delivery}
          </div>
        ): <div className="min-w-[100px] text-sm text-gray-500">
        Free Delivery
      </div>}
      {product.productDetails.variations  && selectedVariation &&  (
          <div className="text-sm text-gray-500">
            Size: {selectedVariation?.size}
          </div>
        )}
        </div>
      </div>
    </div>
  );
};
