import WishlistProductCard from '@components/product/wishlist-product-card';
import { useWishlistProductsQuery } from '@framework/product/get-wishlist-product';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import Alert from '@components/ui/alert';
import cn from 'classnames';
import { useEffect, useState } from 'react';

interface ProductWishlistProps {
  className?: string;
}

export default function ProductWishlistGrid({
  className = '',
}: ProductWishlistProps) {
  const [data, setDAta] = useState([]);
  const [isLoading, setIsLaoading] = useState(true);
  const [error, setError] = useState<any>(false);
  // const limit = 35;
  // const { data, isLoading, error } = useWishlistProductsQuery({
  //   limit: limit,
  // });

  useEffect(() => {
    // Check if the product is already in the wishlist
    const wishlist =
      JSON.parse(localStorage.getItem('wishlist') as string) || [];
    if (wishlist) {
      setDAta(wishlist);
      
    }else{
      setError({ message: 'Error in fetching whishList' });
    }
    setIsLaoading(false);
  }, []);

  console.log('wishlist ', data);

  return (
    <div className={cn(className)}>
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="flex flex-col">
          {isLoading
            ? Array.from({ length: 35 }).map((_, idx) => (
                <ProductCardLoader
                  key={`product--key-${idx}`}
                  uniqueKey={`product--key-${idx}`}
                />
              ))
            : data?.map((product: any) => (
                <WishlistProductCard
                  key={`product--key${product.id}`}
                  product={product}
                />
              ))}
        </div>
      )}
    </div>
  );
}
