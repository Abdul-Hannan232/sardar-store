'use client';

import ProductWishlistGrid from '@components/product/wishlist-product';

export default function Wishlist() {
  return (
    <>
      <h2 className="text-base md:text-lg xl:text-[20px] font-semibold text-brand-dark  lg:pt-0">
        Favorite List
      </h2>
      <div className="flex flex-col pt-8 2xl:pt-12">
        <ProductWishlistGrid />
      </div>
    </>
  );
}
