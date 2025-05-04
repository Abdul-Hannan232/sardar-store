"use client"
import cn from 'classnames';
// import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import { Eye } from '@components/icons/eye-icon';
import { useCart } from '@contexts/cart/cart.context';
import {CalculatePrice} from "@utils/calculate-price"

import { productPlaceholder } from '@assets/placeholders';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const AddToCart = dynamic(() => import('@components/product/add-to-cart'), {
  ssr: false,
});

interface ProductProps {
  product: Product;
  className?: string;
}
function RenderPopupOrAddToCart({ props }: { props: Object }) {
  let { data , variations:allVariations}: any = props;
  const { id, quantity, stock, product_type, status, gallery } = data ?? {};


  const outOfStock = !allVariations.some(
    (variation:any) => Number(variation?.stock) >0 
  ) && (Number(stock) < 1)
 
  // if (Number(stock) < 1 || outOfStock) {
  if (outOfStock ) {
    return (
      <span className="text-[11px] md:text-xs font-bold text-brand-light uppercase inline-block bg-brand-danger rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
        Out Of Stock
      </span>
    );
  }
  const variations = data?.variations? JSON.parse(data?.variations as string): []
  const {delPrice, displayPrice, discount,variationName, setVariationName} = CalculatePrice(data, variations)

  let selectedVariation = variations?.find((v:any)=> v.size === variationName)

  // console.log("5554444444444",selectedVariation);
  
  // return <AddToCart data={data} variant="mercury" />;
  return <AddToCart data={data} variation={selectedVariation} />;
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
    variations: productVariations,
    promo_price_usd,
  } = product ?? {};
  
  let variations = JSON.parse(productVariations as string)
  const {delPrice, displayPrice, discount} = CalculatePrice(product, variations)

  // let variations =JSON.parse(productVariations as string)

  const { openModal } = useModalAction();

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

  const showTitle =
    (title as string).length > 70
      ? `${(title as string).substring(0, 70)}...`
      : title;

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
          {discount && (
            <span className="text-[11px] md:text-xs font-bold text-brand-light uppercase inline-block bg-brand rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              on sale
            </span>
          )}
          <div className={`block product-count-button-position`}>
            <RenderPopupOrAddToCart props={{ data: product , variations}} />
          </div>
        </div>
      </div>

      <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 pt-1.5 h-full">
        <div className="mb-1 lg:mb-1.5 -mx-1 flex justify-between">
          {/* <span className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand-dark">
            RS {promo_price_pkr > 0 ? promo_price_pkr : price}
          </span>
          {promo_price_pkr > 0 && (
            <del className="mx-1 text-sm text-brand-dark text-opacity-70">
              RS {price}
            </del>
          )} */}
          {/* {basePrice && (
            <del className="mx-1 text-sm text-brand-dark text-opacity-70">
              {basePrice}
            </del>
          )} */}


<span className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand-dark">
        RS {displayPrice}
      </span>
      {delPrice && (
        <del className="mx-1 text-sm text-brand-dark text-opacity-70">
          RS {delPrice}
        </del>
      )}
        </div>
        {/* {price_usd && (
          <div className="mb-1 lg:mb-1.5 -mx-1 flex justify-between">
            {price_usd && (
              <span className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand-dark">
                $ {promo_price_usd}
              </span>
            )}
            {promo_price_usd && (
              <del className="mx-1 text-sm text-brand-dark text-opacity-70">
                $ {price_usd}
              </del>
            )}
          </div>
        )} */}
        <h2 className="text-brand-dark text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5">
          {showTitle as string}
        </h2>
        <div className="mt-auto text-13px sm:text-sm">{unit}</div>
      </div>
    </article>
  );
};

export default ProductCardAlpine;
