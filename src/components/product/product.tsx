'use client';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@components/ui/button';
import Counter from '@components/ui/counter';
import { useParams } from 'next/navigation';
import { ROUTES } from '@utils/routes';
import useWindowSize from '@utils/use-window-size';
import { useProductQuery } from '@framework/product/get-product';
// import { getVariations } from '@framework/utils/get-variations';
// import usePrice from '@framework/product/use-price';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
// import ProductAttributes from '@components/product/product-attributes';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Image from '@components/ui/image';
import CartIcon from '@components/icons/cart-icon';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import TagLabel from '@components/ui/tag-label';
import LabelIcon from '@components/icons/label-icon';
import { IoArrowRedoOutline, IoCartOutline } from 'react-icons/io5';
import SocialShareBox from '@components/ui/social-share-box';
import ProductDetailsTab from '@components/product/product-details/product-tab';
// import VariationPrice from './variation-price';
// import isEqual from 'lodash/isEqual';
// import CheckoutPage from '@pages/pages/checkout/page';
import CalculatePrice from '@utils/calculate-price';

 
const ProductSingleDetails = () => {
  // const ProductSingleDetails:React.FC<ChildProps> = ({getCid}) => {
  const router = useRouter();
  const pathname = useParams();
  const { slug } = pathname;
  const { width } = useWindowSize();
  const { data, isLoading } = useProductQuery(slug as string);
  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [favorite, setFavorite] = useState<boolean>(false);
  // const [gallery, setGallery] = useState([]);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);

  const variations = data?.variations
  ? JSON.parse(data?.variations as string)
  : [];
  const { delPrice, displayPrice, discount, variationName, setVariationName } =
    CalculatePrice(data, variations);

 
    // const selectedVariation: any = variations?.find(
    //   (v: any) => v.size === variationName,
    // );
    const [selectedVariation, setSelectedVariation] = useState<any>(null);
    const [stock, setStock] = useState<number>();
  
    useEffect(() => {
      setStock(data?.stock as number); // Set product stock
    
      if (variations?.length > 0) {
        let newVariation = null;
    
        if (variationName) {
          // Select variation based on variationName
          newVariation = variations.find((v: any) => v.size === variationName);
        } else {
          // Select lowest price variation by default
          newVariation = [...variations].sort((a: any, b: any) => {
            const priceA = a.promo_price_pkr || a.price;
            const priceB = b.promo_price_pkr || b.price;
            return priceA - priceB; // Ascending order
          })[0]; // First item in sorted array is the lowest price
        }
    
        // Update selectedVariation only if it's different
        if (JSON.stringify(newVariation) !== JSON.stringify(selectedVariation)) {
          setSelectedVariation(newVariation);
          setVariationName(newVariation.size)
          console.log("Selected Variation:", newVariation); // Debug log
        }
      }
    }, [data, variations, variationName, selectedVariation]);
    
// useEffect(()=>{
// setStock(data?.stock as number)

// if(variations){
//   const lowest = variations?.sort((a:any, b:any) => {
//     const priceA = a.promo_price_pkr || a.price;
//     const priceB = b.promo_price_pkr || b.price;
//     return priceA - priceB; // Ascending order
//   });
//   console.log("----------",lowest[0]);
  
// }
// },[data,variations])



    // console.log("stock ?>>>> ", data);
    // console.log("selectedQuantity ?>>>> ", selectedQuantity);
  
  // console.log(variations);

  // const [variationName, setVariationName ]= useState(variations[0]?.size || "")
  const productUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${ROUTES.PRODUCT}/${pathname.slug}`;

  // const productUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${ROUTES.PRODUCT}/${data?.title}`;
  // const { price, basePrice, discount } = usePrice(
  //   data && {
  //     amount: data?.promo_price_pkr ? data?.promo_price_pkr : data.price,
  //     baseAmount: data.price,
  //     currencyCode: 'PKR',
  //   },
  // );

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

  // console.log(shareButtonStatus);
  if (isLoading) return <p>Loading...</p>;
 
  const item = generateCartItem(data!, selectedVariation);
  // const outOfStock = isInCart(item.id) && !isInStock(item.id);

  function addToCart() {
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);

    const item = generateCartItem(data!, selectedVariation);
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

 
  function addToWishlist() {
    // to show btn feedback while product wishlist
    setAddToWishlistLoader(true);
    setFavorite(!favorite);
    const toastStatus: string =
      favorite === true
        ? 'Remove from favorite list'
        : 'Added to favorite list';
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

  let tags: string[] = [];
  if (data?.tag) {
    try {
      tags = Array.isArray(data.tag) ? data.tag : JSON.parse(data.tag);
    } catch (error) {
      console.error('Failed to parse tags:', error);
    }
  }

  let gallery: string[] = [];
  if (data?.gallery) {
    try {
      gallery = Array.isArray(data.gallery)
        ? data.gallery
        : JSON.parse(data.gallery);
    } catch (error) {
      console.error('Failed to parse gallery:', error);
    }
  }

  // console.log('gallery', gallery);

  const orderNow = () => {
        router.push(
      `/pages/checkout?id=${data?.id}&q=${selectedQuantity}&v=${variationName}`,
    );
  };


  
  return (
    <div className="pt-6 pb-2 md:pt-7">
      <div className="grid-cols-10 lg:grid gap-7 2xl:gap-8">
        <div className="col-span-5 mb-6 overflow-hidden xl:col-span-6 md:mb-8 lg:mb-0">
          {/* {!!gallery?.length ? ( */}
          {Array.isArray(gallery) && gallery?.length > 0 ? (
            <ThumbnailCarousel
              gallery={gallery}
              thumbnailClassName="xl:w-[700px] 2xl:w-[900px]"
              galleryClassName="xl:w-[150px] 2xl:w-[170px]"
            />
          ) : (
            <div className="flex items-center justify-center w-auto">
              <Image
                // src={data?.image?.original ?? '/product-placeholder.svg'}
                src={
                  data?.image?.replace(
                    'http://localhost:4000/',
                    'http://localhost:5055/',
                  ) ?? '/product-placeholder.svg'
                }
                alt={data?.title! as string}
                // alt={data?.name!}
                width={900}
                height={680}
                style={{ width: 'auto' }}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col col-span-5 shrink-0 xl:col-span-4 xl:ltr:pl-2 xl:rtl:pr-2">
          <div className="pb-3 lg:pb-5">
            <div className="md:mb-2.5 block -mt-1.5">
              <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl">
                {data?.title as string}
                {/* {data?.name} */}
              </h2>
            </div>
            {/* {data?.unit && isEmpty(variations) ? (
              <div className="text-sm font-medium md:text-15px">
                {data?.unit}
              </div>
            ) : (
              <VariationPrice
                selectedVariation={selectedVariation}
                minPrice={data?.min_price}
                maxPrice={data?.max_price}
              />
            )} */}

            {/* {isEmpty(variations) && ( */}
            <div className="flex items-center mt-5">
              <div className="text-brand-dark font-bold text-base md:text-xl xl:text-[22px]">
                {/* {price} */}
                Rs {displayPrice || ''}
              </div>
              {/* {(data?.promo_price_pkr as number) > 0 && (
                  <del className="text-sm text-opacity-50 md:text-15px ltr:pl-3 rtl:pr-3 text-brand-dark ">
                    {data?.promo_price_pkr as number}
                  </del>
                )} */}
              {discount && (
                <>
                  <del className="text-sm text-opacity-50 md:text-15px ltr:pl-3 rtl:pr-3 text-brand-dark ">
                    Rs {delPrice || 50}
                  </del>
                  <span className="inline-block rounded font-bold text-xs md:text-sm bg-brand-tree bg-opacity-20 text-brand-tree uppercase px-2 py-1 ltr:ml-2.5 rtl:mr-2.5">
                    {discount} Off
                  </span>
                </>
              )}
            </div>
            {/* )} */}
          </div>

          <div className="  mb-5 ">
            <span className="text-sm md:text-15px text-brand-dark text-opacity-80 ltr:mr-2 rtl:ml-2 ">
              Delivery Charges:{' '}
            </span>
            {data?.delivery
              ? (('Rs ' + data?.delivery) as string)
              : 'Free Delivery'}
          </div>

          {/* {Object.keys(variations).map((variation) => {
            return (
              <ProductAttributes
                key={`popup-attribute-key${variation}`}
                variations={variations}
                attributes={attributes}
                setAttributes={setAttributes}
              />
            );
          })} */}

          <ul className="flex flex-wrap ltr:-mr-2 rtl:-ml-2">
            {variations?.map((attribute: any, index: any) => (
              <li
                key={attribute.id || index}
                className={cn(
                  'cursor-pointer rounded border h-9 md:h-10 p-1 mb-2 md:mb-3 ltr:mr-2 rtl:ml-2 flex justify-center items-center font-medium text-sm md:text-15px text-brand-dark transition duration-200 ease-in-out hover:text-brand hover:border-brand px-3',
                  {
                    'border-brand text-brand': variationName === attribute.size || selectedVariation?.size === attribute.size,
                  },
                )}
                onClick={() => setVariationName(attribute.size)}
              >
                {attribute.size}
              </li>
            ))}
          </ul>

          <div className="pb-2">
            {/* check that item isInCart and place the available quantity or the item quantity */}
            {/* {isEmpty(variations) && (
              <>
                {Number(stock) > 0 || !outOfStock ? (
                  <span className="text-sm font-medium text-yellow">
                    {` Only  ${stock} item left!`}
                  </span>
                ) : (
                  <div className="text-base text-red-500 whitespace-nowrap">
                    Out Of Stock
                  </div>
                )}
              </>
            )} */}

            {/* {isEmpty(selectedVariation) && data && (
              <>

                {(
                  isInCart(item.id)
                    ? getItemFromCart(item.id).quantity + selectedQuantity >=
                      Number(data.stock)
                    : selectedQuantity >= Number(data.stock)
                ) ? (
                  <span className="text-sm font-medium text-red-500">
                    {` Only  ${data.stock} items are Available!`}
                  </span>
                ) : Number(data.stock) > 0 ? (
                  <span className="text-sm font-medium text-yellow">
                    {` Only  ${data.stock} item left!`}
                  </span>
                ) : (
                  <div className="text-base text-brand-danger whitespace-nowrap">
                    Out Of Stock
                  </div>
                )}
              </>
            )} */}
            {/* 
            {!isEmpty(selectedVariation) && (
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

            {isEmpty(variations) && (
              <>
                {/* {(selectedQuantity >  Number(stock)) ? ( */}
                {(
                  isInCart(item.id)
                    ? getItemFromCart(item.id).quantity + selectedQuantity >=
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

            {!isEmpty(variations) && (
              <>
                {/* {(selectedQuantity >  Number(stock)) ? ( */}
                {Number(selectedVariation?.stock) === 0 ? (
                      <div className="text-base text-brand-danger whitespace-nowrap">
                        Out Of Stock
                      </div>
                    ) : (
                  isInCart(item.id)
                    ? getItemFromCart(item.id).quantity + selectedQuantity >=
                      Number(selectedVariation.stock)
                    : selectedQuantity >= Number(selectedVariation?.stock)
                ) ? (
                  <span className="text-sm font-medium text-red-500">
                    {` Only  ${selectedVariation?.stock} items are Available!`}
                  </span>
                ) : Number(selectedVariation?.stock) > 0 ? (
                  <span className="text-sm font-medium text-yellow">
                    {` Only  ${selectedVariation?.stock} item left!`}
                  </span>
                ) : (
                  <div className="text-base text-green-500 whitespace-nowrap">
                    Out Of Stock
                  </div>
                )}
              </>
            )}
          </div>

          <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
            {/* <Counter
              variant="single"
              value={selectedQuantity}
              onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
              onDecrement={() =>
                setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
              }
              disabled={
             data && (  isInCart(item.id)
                  ? getItemFromCart(item.id).quantity + selectedQuantity >=
                    Number(data.stock)
                  : selectedQuantity >= Number(data.stock))
              }
            /> */}

            <Counter
              variant="single"
              value={selectedQuantity}
              onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
              onDecrement={() =>
                setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
              }
              // disabled={
              //   isInCart(data?.id as string)
              //     ? getItemFromCart(data?.id as string).quantity + selectedQuantity >=
              //       Number(data?.stock)
              //     : selectedQuantity >= Number(data?.stock)
              // }
              disabled={
                isInCart(item.id)
                  ? getItemFromCart(item.id).quantity + selectedQuantity >=
                    (selectedVariation
                      ? Number(selectedVariation.stock)
                      : Number(stock))
                  : selectedQuantity >=
                    (selectedVariation
                      ? Number(selectedVariation.stock)
                      : Number(stock))
              }
            />
            {/* <Button
              onClick={addToCart}
              className="w-full px-1.5"
              disabled={!isSelected}
              loading={addToCartLoader}
            >
              <CartIcon color="#ffffff" className="ltr:mr-3 rtl:ml-3" />
              Add to Cart
            </Button> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Button
                onClick={orderNow}
                className="w-full px-1.5"
                // disabled={!isSelected}
                disabled={status === 'Hide'}
                // loading={addToCartLoader}
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
                onClick={addToWishlist}
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
                  ref={shareRef}
                  variant="border"
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
          {data?.tag && (
            <ul className="pt-5 xl:pt-6">
              <li className="relative inline-flex items-center justify-center text-sm md:text-15px text-brand-dark text-opacity-80 ltr:mr-2 rtl:ml-2 top-1">
                <LabelIcon className="ltr:mr-2 rtl:ml-2" /> Tags:
              </li>

              {tags.map((item: any, i: number) => (
                <li className="inline-block p-[3px]" key={`tag-${i}`}>
                  <TagLabel data={item} />
                </li>
              ))}
            </ul>
          )}

          <div className="pt-6 ">
            <span className="text-sm md:text-15px text-brand-dark text-opacity-80 ltr:mr-2 rtl:ml-2 ">
              Category:{' '}
            </span>
            {data?.children as string}
          </div>

          <div className="pt-6 ">
            <span className="text-sm md:text-15px text-brand-dark text-opacity-80 ltr:mr-2 rtl:ml-2 ">
              Brand:{' '}
            </span>
            {data?.brand as string}
          </div>

          <div className="pt-6 ">
            <span className="text-sm md:text-15px text-brand-dark text-opacity-80 ltr:mr-2 rtl:ml-2 ">
              Product Code:{' '}
            </span>{' '}
            {data?.productCode as string}
          </div>
        </div>
      </div>
      <ProductDetailsTab productId={data?.id} products_detail={data?.description as string} />
    </div>
  );
};

export default ProductSingleDetails;
