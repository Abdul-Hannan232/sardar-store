'use client';

import { ProductGrid } from '@components/product/product-grid';
import { ShopFilters } from '@components/search/filters';
import SearchTopBar from '@components/search/search-top-bar';
import Container from '@components/ui/container';
import { Element } from 'react-scroll';
import useQueryParam from '@utils/use-query-params';
import { usePathname } from 'next/navigation';
import { useProductsQuery } from '@framework/product/get-all-products';

export default function SearchPageContent() {
  const pathname = usePathname();
  const { getParams, query } = useQueryParam(pathname ?? '/');
  const newQuery: any = getParams(
    // @ts-ignore
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}${query}`,
  );

  // console.log('url ------------- ', newQuery);

  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage, 
    data,
    error,
  } = useProductsQuery({
    // limit: LIMITS.PRODUCTS_LIMITS,
    // @ts-ignore
    text:
      newQuery.category && newQuery.price
        ? `category=${newQuery?.category}&price=${newQuery?.price}`
        : newQuery.category
          ? `category=${newQuery?.category}`
          : newQuery.price
            ? `price=${newQuery?.price}`
            : 'all=true',
  });

  // console.log('fetchNextPagefetchNextPage', data?.pages[0].data.length);

  return (
    <Container>
      {/* @ts-ignore */}
      <Element name="grid" className="flex pb-16 pt-7 lg:pt-7 lg:pb-20">
        <div className="sticky hidden h-full lg:pt-4 shrink-0 ltr:pr-8 rtl:pl-8 xl:ltr:pr-16 xl:rtl:pl-16 lg:block w-80 xl:w-96 top-16">
          <ShopFilters />
        </div>
        <div className="w-full lg:pt-4 lg:ltr:-ml-4 lg:rtl:-mr-2 xl:ltr:-ml-8 xl:rtl:-mr-8 lg:-mt-1">
          <SearchTopBar itemsLength={data?.pages[0].data.length as number} />
          <ProductGrid
            data={data}
            loadingMore={loadingMore}
            hasNextPage={hasNextPage}
            isLoading={isLoading}
            error={error}
            fetchNextPage={fetchNextPage}
          />
        </div>
      </Element>
    </Container>
  );
}
