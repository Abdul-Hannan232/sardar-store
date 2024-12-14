import { Item } from '@contexts/cart/cart.utils';
import Image from '@components/ui/image';
import { generateCartItemName } from '@utils/generate-cart-item-name';
import usePrice from '@framework/product/use-price';

export const CheckoutItem: React.FC<{ item: Item , quantity?:string}> = ({ item , quantity}) => {

  // console.log('tData ------------', item);


  const { price } = usePrice({
    amount: item.itemTotal,
    currencyCode: 'USD',
  });

  let gallery: string[] = []; 
  if (item?.gallery) {
    try {
      gallery = Array.isArray(item.gallery)
        ? item.gallery
        : JSON.parse(item.gallery);
    } catch (error) {
      console.error('Failed to parse gallery:', error);
    }
  }
  return (
    <div className="flex items-center py-4 border-b border-border-base ">
      <div className="flex w-16 h-16 border rounded-md border-border-base shrink-0">
        {Array.isArray(gallery) && gallery?.length > 0 ? (
          <Image
            src={gallery[0] ?? '/assets/placeholder/order-product.svg'}
            // src={gallery[0].replace(
            //   'http://localhost:4000/',
            //   'http://localhost:5055/',
            // ) ?? '/assets/placeholder/order-product.svg'}
            alt={'item image'}
            className="rounded-md ltr:mr-5 rtl:ml-5"
            width={64}
            height={64}
            style={{ width: 'auto' }}
          />
        ) : (
          <Image
            src={item.image ?? '/assets/placeholder/order-product.svg'}
            alt={'item image'}
            className="rounded-md ltr:mr-5 rtl:ml-5"
            width={64}
            height={64}
            style={{ width: 'auto' }}
          />
        )}
      </div>
      <h6 className="font-normal text-15px text-brand-dark ltr:pl-3 rtl:pr-3">
        {/* hello */}
        {item.title ? item.title: generateCartItemName(item.name, item.attributes)}
      </h6>
      <div className="flex font-normal ltr:ml-auto rtl:mr-auto text-15px text-brand-dark ltr:pl-2 rtl:pr-2 shrink-0">
       {price ? price : item.price * Number(quantity)}
      </div>
    </div>
  );
};
