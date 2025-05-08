import Link from '@components/ui/link';
// import Image from '@components/ui/image';
import { IoIosCloseCircle } from 'react-icons/io';
import { useCart } from '@contexts/cart/cart.context';
import usePrice from '@framework/product/use-price';
import { ROUTES } from '@utils/routes';
import Counter from '@components/ui/counter';
import Image from 'next/image';

type CartItemProps = {
  item: any;
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  // console.log('cart --------  ',item);

  const {
    isInStock,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    isInCart,
    getItemFromCart,
  } = useCart();

  const { price: totalPrice } = usePrice({
    amount: item?.itemTotal,
    currencyCode: 'PKR',
  });
  const outOfStock = !isInStock(item.id);
  // console.log('ite cart ', item);

  return (
    <div
      className={`group w-full h-auto flex justify-start items-center text-brand-light py-4 md:py-7 border-b border-border-one border-opacity-70 relative last:border-b-0`}
      title={item?.title}
      // title={item?.name}
    >
      <div className="relative flex rounded overflow-hidden shrink-0 cursor-pointer w-[90px] md:w-[100px] h-[90px] md:h-[100px]">
        <Image
          src={item?.image ?? '/assets/placeholder/cart-item.svg'}
          width={100}
          height={100}
          loading="eager"
          alt={item.title || 'Product Image'}
          // alt={item.name || 'Product Image'}
          style={{ width: 'auto' }}
          className="object-cover bg-fill-thumbnail"
          unoptimized
        />
        <div
          className="absolute top-0 flex items-center justify-center w-full h-full transition duration-200 ease-in-out bg-black ltr:left-0 rtl:right-0 bg-opacity-30 md:bg-opacity-0 md:group-hover:bg-opacity-30"
          onClick={() => clearItemFromCart(item.id)}
          role="button"
        >
          <IoIosCloseCircle className="relative text-2xl text-white transition duration-300 ease-in-out transform md:scale-0 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100" />
        </div>
      </div>

      <div className="flex items-start justify-between w-full overflow-hidden">
        <div className="ltr:pl-3 rtl:pr-3 md:ltr:pl-4 md:rtl:pr-4">
          <Link
            href={`${ROUTES.PRODUCT}/${item?.title}`}
            className="block leading-5 transition-all text-brand-dark text-13px sm:text-sm lg:text-15px hover:text-brand"
          >
            {item?.title?.split(' ').slice(0, 3).join(' ')}
          </Link>
          <div className="text-13px sm:text-sm text-brand-muted mt-1.5 block mb-2">
            1 each X {item.quantity}
            {/* {item.unit} X {item.quantity} */}
          </div>
          <Counter
            value={item.quantity}
            onIncrement={() => {
              // console.log("Button clicked");
              addItemToCart(item, 1);
            }}
            onDecrement={() => removeItemFromCart(item.id)}
            variant="cart"
            disabled={
              isInCart(item.id)
                ? getItemFromCart(item.id).quantity >= Number(item?.stock)
                : getItemFromCart(item.id).quantity >= Number(item?.stock)
            }
            // disabled={outOfStock}
          />
        </div>

        {/* <div className="flex  font-semibold text-sm md:text-base text-brand-dark leading-5 shrink-0 min-w-[65px] md:min-w-[80px] justify-end">
          {totalPrice} <span>hello</span>
        </div> */}
        <div className="flex flex-col font-semibold text-sm md:text-base text-brand-dark leading-5 shrink-0 min-w-[65px] md:min-w-[80px] justify-end items-end">
          {/* {totalPrice}  {item?.delivery &&  <span className='text-13px sm:text-sm text-brand-muted  font-normal'>Delivery:<span className='    ltr:pl-3 rtl:pr-3 '>Rs {item?.delivery}</span> </span>}  */}
          {totalPrice}{' '}
          {
            <span className="text-13px sm:text-sm text-brand-muted  font-normal">
              Delivery:
              <span className="    ">
                {' '}
                {item?.delivery ? `Rs ${item?.delivery}` : 'Free'}
              </span>{' '}
            </span>
          }
          {item?.variant && (
            <span className="text-13px  text-brand-muted  font-normal">
              Size:<span className=""> {item?.variant}</span>{' '}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
