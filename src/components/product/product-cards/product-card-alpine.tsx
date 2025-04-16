import cn from 'classnames';
// import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import { Eye } from '@components/icons/eye-icon';
import { useCart } from '@contexts/cart/cart.context';

import { productPlaceholder } from '@assets/placeholders';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const AddToCart = dynamic(() => import('@components/product/add-to-cart'), {
  ssr: false,
});

interface ProductProps {
  product: Product;
  className?: string;
}
function RenderPopupOrAddToCart({ props }: { props: Object }) {
  let { data }: any = props;
  // console.log(variant);

  const { id, quantity, stock, product_type, status, gallery } = data ?? {};
  const { width } = useWindowSize();
  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const iconSize = width! > 1024 ? '19' : '17';
  const outOfStock = isInCart(id) && !isInStock(id);
  function handlePopupView() {
    openModal('PRODUCT_VIEW', data);
  }
  // if (status === 'Hide') {
  //   return (
  //     <>
  //      {/* <span className="text-[11px] md:text-xs font-bold text-brand-light uppercase inline-block bg-brand-danger rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
  //       Out Of Stock
  //     </span> */}
  //       <button
  //         className="inline-flex items-center justify-center w-8 h-8 text-4xl rounded-full bg-brand lg:w-10 lg:h-10 text-brand-light focus:outline-none focus-visible:outline-none"
  //         aria-label="Count Button"
  //         onClick={handlePopupView}
  //       >
  //         <Eye width={iconSize} height={iconSize} opacity="1" />
  //       </button>
  //     </>
  //     // <>
  //     //  <span className="text-[11px] md:text-xs font-bold text-brand-light uppercase inline-block bg-brand-danger rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
  //     //   Out Of Stock
  //     // </span>
  //     //   <button
  //     //     className="inline-flex items-center justify-center w-8 h-8 text-4xl rounded-full bg-brand lg:w-10 lg:h-10 text-brand-light focus:outline-none focus-visible:outline-none"
  //     //     aria-label="Count Button"
  //     //     onClick={handlePopupView}
  //     //   >
  //     //     <Eye width={iconSize} height={iconSize} opacity="1" />
  //     //   </button>
  //     // </>
  //   );
  // }
  // if (Number(stock) < 1 || outOfStock) {
  if (Number(stock) < 1) {
    return (
      <span className="text-[11px] md:text-xs font-bold text-brand-light uppercase inline-block bg-brand-danger rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
        Out Of Stock
      </span>
    );
  }

  // if (status === 'Show') {
  //   // if (product_type === 'variable') {
  //   return (
  //     <button
  //       className="inline-flex items-center justify-center w-8 h-8 text-4xl rounded-full bg-brand lg:w-10 lg:h-10 text-brand-light focus:outline-none focus-visible:outline-none"
  //       aria-label="Count Button"
  //       onClick={handlePopupView}
  //     >
  //       <Eye width={iconSize} height={iconSize} opacity="1" />
  //     </button>
  //   );
  // }
  return <AddToCart data={data} variant="mercury" />;
}
const ProductCardAlpine: React.FC<ProductProps> = ({ product, className }) => {
  // console.log('----------------- ', product);

  const {
    title,
    image,
    gallery,
    unit,
    stock,
    product_type,
    price,
    price_usd,
    promo_price_pkr,
    promo_price_usd,
  } = product ?? {};
  // console.log('title,', title);

  const { openModal } = useModalAction();
  // const { t } = useTranslation(lang, 'common');
  // const { price, basePrice, discount } = usePrice({
  //   amount: product?.sale_price ? product?.sale_price : product?.price,
  //   baseAmount: product?.price,
  //   currencyCode: 'USD',
  // });
  // const { price: minPrice } = usePrice({
  //   amount: product?.min_price ?? 0,
  //   currencyCode: 'USD',
  // });
  // const { price: maxPrice } = usePrice({
  //   amount: product?.max_price ?? 0,
  //   currencyCode: 'USD',
  // });

  function handlePopupView() {
    openModal('PRODUCT_VIEW', product);
  }

  const imageUrl =
    typeof image === 'string'
      ? (image as string).replace('4000', '5055')
      : productPlaceholder;

  let galleryImgs: string[] = [];
  if (gallery) {
    try {
      galleryImgs = Array.isArray(gallery) ? gallery : JSON.parse(gallery);
    } catch (error) {
      console.error('Failed to parse gallery:', error);
    }
  }
// console.log(galleryImgs);

  return (
    <article
      className={cn(
        'flex flex-col group overflow-hidden rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full',
        className,
      )}
      onClick={handlePopupView}
      title={title as string}
    >
      <div className="relative shrink-0">
        <div className="overflow-hidden mx-auto w-full sm:w-[180px] h-[180px] md:w-[200px] md:h-[200px] transition duration-200 ease-in-out transform group-hover:scale-105 relative">
          {Array.isArray(galleryImgs) && galleryImgs?.length > 0 ? (
            <Image
              src={galleryImgs[0].replace('4000', '5055')}
              // src={image?.thumbnail ?? productPlaceholder}
              alt={(title as string) || 'Product Image'}
              quality={100}
              priority
              unoptimized
              fill
              sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
              className="object-cover bg-fill-thumbnail"
            />
          ) : (
            <Image
              src={imageUrl}
              // src={image?.thumbnail ?? productPlaceholder}
              alt={(title as string) || 'Product Image'}
              quality={100}
              priority
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              className="object-cover bg-fill-thumbnail"
              unoptimized
            />
          )}
        </div>
        <div className="w-full h-full absolute top-0 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
          {/* {discount && (
            <span className="text-[11px] md:text-xs font-bold text-brand-light uppercase inline-block bg-brand rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              on sale
            </span>
          )} */}
          <div className={`block product-count-button-position`}>
            <RenderPopupOrAddToCart props={{ data: product }} />
          </div>
        </div>
      </div>

      <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full">
        <div className="mb-1 lg:mb-1.5 -mx-1 flex justify-between">
          <span className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand-dark">
            {/* {product_type === 'variable' ? `${minPrice} - ${maxPrice}` : price} */}
           RS {promo_price_pkr.toFixed(2)}
          </span>
          <del className="mx-1 text-sm text-brand-dark text-opacity-70">
            {/* {product_type === 'variable' ? `${minPrice} - ${maxPrice}` : price} */}
            RS {price.toFixed(2)}
          </del>
          {/* {basePrice && (
            <del className="mx-1 text-sm text-brand-dark text-opacity-70">
              {basePrice}
            </del>
          )} */}
        </div>
        {price_usd && (
          <div className="mb-1 lg:mb-1.5 -mx-1 flex justify-between">
            {price_usd && (
              <span className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand-dark">
               $ {promo_price_usd?.toFixed(2)}
              </span>
            )}
            {promo_price_usd && (
              <del className="mx-1 text-sm text-brand-dark text-opacity-70">
                 $ {price_usd?.toFixed(2)}
                
              </del>
            )}
          </div>
        )}
        <h2 className="text-brand-dark text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5">
          {title as string}
        </h2>
        <div className="mt-auto text-13px sm:text-sm">{unit}</div>
      </div>
    </article>
  );
};

export default ProductCardAlpine;
