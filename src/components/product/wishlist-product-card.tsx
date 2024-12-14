'use client';

import { useEffect, useState } from 'react';
import type { FC } from 'react';
import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';


interface ProductProps {
  product: Product;
  className?: string;
}

const WishlistProductCard: FC<ProductProps> = ({ product, className }) => {
  const { title, gallery, image, price } = product ?? {};
  const [addToWishlistLoader, setAddToWishlistLoader] =
  useState<boolean>(false);
  const { width } = useWindowSize();


  const placeholderImage = `/assets/placeholder/product.svg`;
  const [favorite, setFavorite] = useState<boolean>(false);
  // const { price, basePrice, discount } = usePrice({
  //   amount: product.sale_price ? product.sale_price : product.price,
  //   baseAmount: product.price,
  //   currencyCode: 'USD',
  // });

  // track status

  useEffect(() => {
    // Check if the product is already in the wishlist
    const wishlist =
      JSON.parse(localStorage.getItem('wishlist') as string) || [];
    const isFavorite = wishlist.some((item: any) => item.id === product.id);
    setFavorite(isFavorite);
  }, [product.id]);

  // check gallery

  let galleryImgs: string[] = [];
  if (gallery) {
    try {
      galleryImgs = Array.isArray(gallery) ? gallery : JSON.parse(gallery);
    } catch (error) {
      console.error('Failed to parse gallery:', error);
    }
  }

  function addToWishlist(newItem: any) {
    setAddToWishlistLoader(true);
    setFavorite(!favorite);
    const toastStatus =
      favorite === true
        ? 'Remove from favorite list'
        : 'Added to favorite list';

    // Retrieve existing wishlist 
    let wishlist =
      JSON.parse(localStorage?.getItem('wishlist') as string) || [];
    // console.log(wishlist);

   
    const itemIndex = wishlist.findIndex((item: any) => item.id === newItem.id);

    if (itemIndex === -1) {
            wishlist.push(newItem);
    } else {
      // remove item
      wishlist.splice(itemIndex, 1);
    }

    // Save updated wishlist 
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // setTimeout(() => {
    //   setAddToWishlistLoader(false);
    // }, 1500);

    toast(toastStatus, {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }



  return (
    <div className="flex flex-col py-4 border-b md:flex-row border-border-base 2xl:py-5 wishlist-card last:pb-0 first:-mt-8 lg:first:-mt-4 2xl:first:-mt-7">
      <div className="flex ">
        <div className="relative mt-1 shrink-0">
          <div className="flex overflow-hidden max-w-[80px]  transition duration-200 ease-in-out transform group-hover:scale-105">
            {Array.isArray(galleryImgs) && galleryImgs?.length > 0 ? (
              <Image
                // src={image?.thumbnail ?? placeholderImage}
                src={galleryImgs[0] ?? placeholderImage}
                alt={(title as string) || 'Product Image'}
                width={80}
                height={80}
                quality={100}
                style={{ width: 'auto' }}
                className="object-cover bg-fill-thumbnail"
              />
            ) : (
              <Image
                // src={image?.thumbnail ?? placeholderImage}
                src={image ?? placeholderImage}
                alt={(title as string) || 'Product Image'}
                width={80}
                height={80}
                quality={100}
                style={{ width: 'auto' }}
                className="object-cover bg-fill-thumbnail"
              />
            )}
          </div>
        </div>

        <div className="flex flex-col ltr:ml-2 rtl:mr-2 2xl:ltr:ml-3.5 2xl:rtl:mr-3.5 h-full">
          <h2 className="text-brand-dark text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5">
            {title as string}
          </h2>
          {/* <div className="mb-1 text-13px sm:text-sm lg:mb-2">{unit}</div> */}
          <div className="-mx-1">
            <span className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand-dark">
              {price}$
            </span>
            {/* {discount && (
              <del className="mx-1 text-sm text-opacity-50 text-brand-dark">
                {basePrice}
              </del>
            )} */}
          </div>
        </div>
      </div>
      <div
        className="flex cursor-pointer ltr:ml-auto rtl:mr-auto md:pt-7"
        // onClick={() => {
        //   setFavorite(!favorite);
        // }}
        onClick={() => addToWishlist(product)}
        // loading={addToWishlistLoader}
      >
        {favorite ? (
          <>
            <IoIosHeart className="text-brand w-5 h-5 mt-0.5" />
            <span className="text-brand ltr:ml-3 rtl:mr-3 font-semibold text-15px -mt-0.5 md:mt-0">
              Favorited
            </span>
          </>
        ) : (
          <>
            <IoIosHeartEmpty className="w-5 h-5 mt-0.5" />

            <span className=" ltr:ml-3 rtl:mr-3 text-brand-dark font-medium text-15px -mt-0.5 md:mt-0">
              Favorite
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistProductCard;
