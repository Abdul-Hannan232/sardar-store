import type { FC } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import ProductCardAlpine from '@components/product/product-cards/product-card-alpine';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import cn from 'classnames';
import { useProductsQuery } from '@framework/product/get-all-products';
import { LIMITS } from '@framework/utils/limits';
import { Product } from '@framework/types';
import useQueryParam from '@utils/use-query-params';

interface ProductGridProps { 
  className?: string;
    data: any;
    isLoading: boolean;
    error: any;
    fetchNextPage:any;
    hasNextPage:any;
    loadingMore:any;
}

export const ProductGrid: FC<ProductGridProps> = ({data,loadingMore,hasNextPage, isLoading, error, className = '', fetchNextPage }) => {
// export const ProductGrid: FC<ProductGridProps> = ({ className = ''}) => {
  // const pathname = usePathname();
  // const { getParams, query } = useQueryParam(pathname ?? '/');
  // const newQuery: any = getParams(
  //   // @ts-ignore
  //   `${process.env.NEXT_PUBLIC_WEBSITE_URL}${query}`,
  // );  
  //  console.log('newQuery, newQuery' , newQuery);

  // const {
  //   isFetching: isLoading,
  //   isFetchingNextPage: loadingMore,
  //   fetchNextPage,
  //   hasNextPage,
  //   data,
  //   error,
  // } = useProductsQuery({
  //   // limit: LIMITS.PRODUCTS_LIMITS,
  //   // @ts-ignore
  //   text: newQuery.category ? `category=${newQuery?.category}` : 'all=true',
  // });

  
  return (
  
    <>
      <div
        className={cn(
          'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3 md:gap-4 2xl:gap-5',
          className,
        )}
      >
        {error ? (
          <div className="col-span-full">
            <Alert message={error?.message} />
          </div>
        ) : isLoading && !data?.pages?.length ? (
          Array.from({ length: 30 }).map((_, idx) => (
            <ProductCardLoader
              key={`product--key-${idx}`}
              uniqueKey={`product--key-${idx}`}
            />
          ))
        ) : (
          data?.pages?.map((page: any) => {
            return page?.data?.map((product: Product) => (
              <ProductCardAlpine
                key={`product--key-${product.id}`}
                product={product}
              />
            ));
          })
        )}
        {/* end of error state */}
      </div>
      {hasNextPage && (
        <div className="pt-8 text-center xl:pt-10">
          <Button
            loading={loadingMore}
            disabled={loadingMore}
            onClick={() => fetchNextPage()}
          >
            Load More
          </Button>
        </div>
      )}
    </>
  );
};
