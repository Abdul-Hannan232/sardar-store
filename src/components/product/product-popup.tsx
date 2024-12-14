import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import isEmpty from 'lodash/isEmpty';
import { ROUTES } from '@utils/routes';
import Button from '@components/ui/button';
import Counter from '@components/ui/counter';
import { useCart } from '@contexts/cart/cart.context';
import ProductAttributes from '@components/product/product-attributes';
import { generateCartItem } from '@utils/generate-cart-item';
import usePrice from '@framework/product/use-price';
import { getVariations } from '@framework/utils/get-variations';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Image from '@components/ui/image';
import CartIcon from '@components/icons/cart-icon';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import TagLabel from '@components/ui/tag-label';
import LabelIcon from '@components/icons/label-icon';
import RelatedProductFeed from '@components/product/feeds/related-product-feed';
import SocialShareBox from '@components/ui/social-share-box';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { IoArrowRedoOutline, IoCartOutline } from 'react-icons/io5';

import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import VariationPrice from './variation-price';
import isEqual from 'lodash/isEqual';
import { productGalleryPlaceholder } from '@assets/placeholders';

const breakpoints = {
  '1536': {
    slidesPerView: 6,
  },
  '1280': {
    slidesPerView: 5,
  },
  '1024': {
    slidesPerView: 4,
  },
  '640': {
    slidesPerView: 3,
  },
  '360': {
    slidesPerView: 2,
  },
  '0': {
    slidesPerView: 1,
  },
};

export default function ProductPopup() {
  const { data } = useModalState();
  const { width } = useWindowSize();
  const { closeModal } = useModalAction();
  const router = useRouter();
  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const { price, basePrice, discount } = usePrice({
    amount: data.sale_price ? data.sale_price : data.price,
    baseAmount: data.price,
    currencyCode: 'USD',
  });
  const variations = getVariations(data.variations);
  // const { slug, image, name, unit, description, gallery, tag, quantity } = data;
  const {
    slug,
    image,
    title,
    unit,
    description,
    gallery,
    tag,
    parent,
    quantity,
    stock,
    status,
    category_id,
  } = data;
  // console.log('data???????????? ', data);

  const productUrl = encodeURIComponent(
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}${ROUTES.PRODUCT}/${title}`,
  );
  // const productUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${lang}${ROUTES.PRODUCT}/${slug}`;
  // const handleChange = () => {
  //   setShareButtonStatus(!shareButtonStatus);
  // };
  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation),
      )
    : true;
  let selectedVariation: any = {};
  if (isSelected) {
    selectedVariation = data?.variation_options?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort(),
      ),
    );
  }
  const item = generateCartItem(data, selectedVariation);
  const outOfStock = isInCart(item.id) && !isInStock(item.id);
  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);
    addItemToCart(item, selectedQuantity);
    // @ts-ignore
    toast('Added to the cart', {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  // function addToWishlist() {
  //   setAddToWishlistLoader(true);
  //   setFavorite(!favorite);
  //   const toastStatus: string =
  //     favorite === true
  //       ? 'Remove from favorite list'
  //       : 'Added to favorite list';
  //   setTimeout(() => {
  //     setAddToWishlistLoader(false);
  //   }, 1500);

  //   localStorage.setItem('wishlist', JSON.stringify(data))
  //   toast(toastStatus, {
  //     progressClassName: 'fancy-progress-bar',
  //     position: width! > 768 ? 'bottom-right' : 'top-right',
  //     autoClose: 1500,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //   });
  // }

  useEffect(() => {
    // Check if the product is already in the wishlist
    const wishlist =
      JSON.parse(localStorage.getItem('wishlist') as string) || [];
    const isFavorite = wishlist.some((item: any) => item.id === data.id);
    setFavorite(isFavorite);
  }, [data.id]);

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
    console.log(wishlist);

   
    const itemIndex = wishlist.findIndex((item: any) => item.id === newItem.id);

    if (itemIndex === -1) {
            wishlist.push(newItem);
    } else {
      // remove item
      wishlist.splice(itemIndex, 1);
    }

    // Save updated wishlist 
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    setTimeout(() => {
      setAddToWishlistLoader(false);
    }, 1500);

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

  function navigateToProductPage() {
    closeModal();
    // router.push(`/${lang}/${ROUTES.PRODUCT}/${slug}`);
    router.push(`${ROUTES.PRODUCT}/${title}`);
    // router.push(`${ROUTES.PRODUCT}/${slug}`);
  }

  useEffect(() => setSelectedQuantity(1), [data.id]);
  // console.log('image>>>>>?>>>>>>>>>>> ', image)

  let galleryImgs: string[] = [];
  if (gallery) {
    try {
      galleryImgs = Array.isArray(gallery) ? gallery : JSON.parse(gallery);
    } catch (error) {
      console.error('Failed to parse gallery:', error);
    }
  }

  const orderNow = () => {
    router.push(`/pages/checkout?id=${data?.id}&q=${selectedQuantity}`);
    closeModal();
  };

  // close share popup

  const shareRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        shareRef.current &&
        !shareRef.current.contains(event.target as Node)
      ) {
        setShareButtonStatus(false);
      }
    };

    if (shareButtonStatus) {
      window.addEventListener('click', handleClickOutside);
    } else {
      window.removeEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [shareButtonStatus]);

  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };

  return (
    <div className="md:w-[600px] lg:w-[940px] xl:w-[1180px] 2xl:w-[1360px] mx-auto p-1 lg:p-0 xl:p-3 bg-brand-light rounded-md">
      <CloseButton onClick={closeModal} />
      <div className="overflow-hidden">
        <div className="px-4 pt-4 md:px-6 lg:p-8 2xl:p-10 mb-9 lg:mb-2 md:pt-7 2xl:pt-10">
          <div className="items-start justify-between lg:flex">
            <div className="items-center justify-center mb-6 overflow-hidden xl:flex md:mb-8 lg:mb-0">
              {/* {!!galleryImgs?.length ? ( */}
              {Array.isArray(galleryImgs) && galleryImgs?.length > 0 ? (
                <ThumbnailCarousel gallery={galleryImgs} />
              ) : (
                <div className="flex items-center justify-center w-auto">
                  <Image
                    src={
                      image.replace(
                        'http://localhost:4000/',
                        ' http://localhost:5055/',
                      ) ?? productGalleryPlaceholder
                    }
                    // src={image?.original ?? productGalleryPlaceholder}
                    // alt={name!}
                    alt={title!}
                    width={650}
                    height={590}
                    style={{ width: 'auto' }}
                  />
                </div>
              )}
            </div>

            <div className="shrink-0 flex flex-col lg:ltr:pl-5 lg:rtl:pr-5 xl:ltr:pl-8 xl:rtl:pr-8 2xl:ltr:pl-10 2xl:rtl:pr-10 lg:w-[430px] xl:w-[470px] 2xl:w-[480px]">
              <div className="pb-5">
                <div
                  className="mb-2 md:mb-2.5 block -mt-1.5"
                  onClick={navigateToProductPage}
                  role="button"
                >
                  <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl hover:text-brand">
                    {title}
                    {/* {name} */}
                  </h2>
                </div>
                {/* {unit && isEmpty(variations) ? (
                  <div className="text-sm font-medium md:text-15px">{unit}</div>
                ) : (
                  <VariationPrice
                    selectedVariation={selectedVariation}
                    minPrice={data.min_price}
                    maxPrice={data.max_price}
                  />
                )} */}

                {isEmpty(variations) && (
                  <div className="flex items-center mt-5">
                    <div className="text-brand-dark font-bold text-base md:text-xl xl:text-[22px]">
                      {price}
                    </div>
                    {discount && (
                      <>
                        <del className="text-sm text-opacity-50 md:text-15px ltr:pl-3 rtl:pr-3 text-brand-dark ">
                          {basePrice}
                        </del>
                        <span className="inline-block rounded font-bold text-xs md:text-sm bg-brand-tree bg-opacity-20 text-brand-tree uppercase px-2 py-1 ltr:ml-2.5 rtl:mr-2.5">
                          {discount} Off
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {Object.keys(variations).map((variation) => {
                return (
                  <ProductAttributes
                    key={`popup-attribute-key${variation}`}
                    variations={variations}
                    attributes={attributes}
                    setAttributes={setAttributes}
                  />
                );
              })}

              <div className="pb-2">
                {/* check that item isInCart and place the available quantity or the item quantity */}
                {isEmpty(variations) && (
                  <>
                    {/* {(selectedQuantity >  Number(stock)) ? ( */}
                    {(
                      isInCart(item.id)
                        ? getItemFromCart(item.id).quantity +
                            selectedQuantity >=
                          Number(stock)
                        : selectedQuantity >= Number(stock)
                    ) ? (
                      <span className="text-sm font-medium text-red-500">
                        {` Only  ${stock} items are Available!`}
                      </span>
                    ) : Number(stock) > 0 ? (
                      <span className="text-sm font-medium text-yellow">
                        {` Only  ${stock} item left!`}
                      </span>
                    ) : (
                      <div className="text-base text-brand-danger whitespace-nowrap">
                        Out Of Stock
                      </div>
                    )}
                  </>
                )}

                {/* {status === 'Hide' ? (
                  <span className="text-sm font-medium text-yellow">
                    Out Of Stock
                  </span>
                ) : (
                  <span className="text-sm font-medium text-brand">
                    Available
                  </span>
                )} */}
                {/* {!isEmpty(selectedVariation) && (
                  <span className="text-sm font-medium text-yellow">
                    {selectedVariation?.is_disable ||
                    selectedVariation.quantity === 0
                      ? 'Out Of Stock'
                      : `${
                          'Only' +
                          ' ' +
                          selectedVariation.quantity +
                          ' ' +
                          'item left!'
                        }`}
                  </span>
                )} */}
              </div>

              {/* <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5"> */}
              <div
                className={`pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5 `}
              >
                <Counter
                  variant="single"
                  value={selectedQuantity}
                  onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
                  onDecrement={() =>
                    setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                  }
                  disabled={
                    isInCart(item.id)
                      ? getItemFromCart(item.id).quantity + selectedQuantity >=
                        Number(stock)
                      : selectedQuantity >= Number(stock)
                  }
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <Button
                    onClick={orderNow}
                    className="w-full px-1.5"
                    // disabled={!isSelected}
                    disabled={status === 'Hide'}
                    loading={addToCartLoader}
                  >
                    <CartIcon color="#ffffff" className="ltr:mr-3 rtl:ml-3" />
                    Order now
                  </Button>

                  <Button
                    onClick={addToCart}
                    className="w-full px-1.5"
                    // disabled={!isSelected}
                    disabled={status === 'Hide'}
                    loading={addToCartLoader}
                  >
                    <IoCartOutline
                      color="#ffffff"
                      className="ltr:mr-3 rtl:ml-3 text-3xl"
                    />
                    Add to Cart
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <Button
                    variant="border"
                    onClick={() => addToWishlist(data)}
                    loading={addToWishlistLoader}
                    className={`group hover:text-brand ${
                      favorite === true && 'text-brand'
                    }`}
                  >
                    {favorite === true ? (
                      <IoIosHeart className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all" />
                    ) : (
                      <IoIosHeartEmpty className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all group-hover:text-brand" />
                    )}
                    Wishlist
                  </Button>
                  <div className="relative group">
                    <Button
                      variant="border"
                      ref={shareRef}
                      className={`w-full hover:text-brand ${
                        shareButtonStatus === true && 'text-brand'
                      }`}
                      onClick={handleChange}
                    >
                      <IoArrowRedoOutline className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all group-hover:text-brand" />
                      Share
                    </Button>
                    <SocialShareBox
                      className={`absolute z-10 ltr:right-0 rtl:left-0 w-[300px] md:min-w-[400px] transition-all duration-300 ${
                        shareButtonStatus === true
                          ? 'visible opacity-100 top-full'
                          : 'opacity-0 invisible top-[130%]'
                      }`}
                      shareUrl={productUrl}
                    />
                  </div>
                </div>
              </div>
              {tag && (
                <ul className="pt-5 xl:pt-6">
                  <li className="relative inline-flex items-center justify-center text-sm md:text-15px text-brand-dark text-opacity-80 ltr:mr-2 rtl:ml-2 top-1">
                    <LabelIcon className="ltr:mr-2 rtl:ml-2" /> Tags :
                  </li>
                  {JSON.parse(tag)?.map((item: any, i: number) => (
                    <li className="inline-block p-[3px]" key={`tag-${i}`}>
                      <TagLabel data={item} />
                    </li>
                  ))}
                </ul>
              )}

              <div className="pt-6 xl:pt-8">
                <Heading className="mb-3 lg:mb-3.5">Product Details:</Heading>
                <Text variant="small">
                  {description.split(' ').slice(0, 40).join(' ')}
                  {'...'}
                  <span
                    onClick={navigateToProductPage}
                    role="button"
                    className="text-brand ltr:ml-0.5 rtl:mr-0.5"
                  >
                    Read More
                  </span>
                </Text>
              </div>
            </div>
          </div>
        </div>
        <RelatedProductFeed
          carouselBreakpoint={breakpoints}
          className="mb-0.5 md:mb-2 lg:mb-3.5 xl:mb-4 2xl:mb-6"
          uniqueKey={category_id}
        />
      </div>
    </div>
  );
}
