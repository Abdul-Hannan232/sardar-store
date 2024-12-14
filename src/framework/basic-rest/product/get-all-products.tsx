import { QueryOptionsType, Product } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import shuffle from 'lodash/shuffle';
import { useInfiniteQuery } from '@tanstack/react-query';
type PaginatedProduct = {
  data: Product[];
  paginatorInfo: any;
};
// const fetchProducts = async ({queryKey }: any) => {
const fetchProducts = async (pageParam: any, queryKey : any) => {
  // console.log('queryKey ', queryKey);
  
  // const { data } = await http.get(API_ENDPOINTS.PRODUCTS);
  const { data } = await http.get(
    `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/products?${queryKey}`,
  );
  // console.log('data', data.products); 

  return {
    // data: shuffle(data.products) as Product[],
    data: queryKey.includes('price') ?  data.products as Product[]: shuffle(data.products) as Product[],
    paginatorInfo: {
      nextPageUrl: '',
    },
  };
};

const useProductsQuery = (options: QueryOptionsType) => {
  // console.log(options);
  
  return useInfiniteQuery<PaginatedProduct, Error>({
    queryKey: [`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/products`, options?.text],
    // queryKey: [API_ENDPOINTS.PRODUCTS, options],
    queryFn: ({ pageParam }) => fetchProducts(pageParam , options?.text),
    initialPageParam: 0,
    getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
  });
};

export { useProductsQuery, fetchProducts };
