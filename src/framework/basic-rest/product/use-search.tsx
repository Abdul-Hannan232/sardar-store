// import { QueryOptionsType, Product } from '@framework/types';
// import http from '@framework/utils/http';
// import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
// import { useQuery } from '@tanstack/react-query';

// export const fetchSearchedProducts = async ({ queryKey }: any) => {
//   const options = queryKey[1];

//   const { data } = await http.get(API_ENDPOINTS.SEARCH);

//   function searchProduct(product: any) {
//     return product.name.toLowerCase().indexOf(options.text.toLowerCase()) > -1;
//   }

//   return data.filter(searchProduct);
// };
// export const useSearchQuery = (options: QueryOptionsType) => {
//   return useQuery({
//     queryKey: [API_ENDPOINTS.SEARCH, options],
//     queryFn: fetchSearchedProducts,
//   });
// };

import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { useProductsQuery } from './get-all-products';

export const fetchSearchedProducts = async ({ queryKey }: any) => {
  const options = queryKey[1];
// console.log(options.text);

  // const {
  //   data,
  // } =  useProductsQuery({
  //   // @ts-ignore
  //   text: 'all=true',
  // });
  // const { data } = await http.get(API_ENDPOINTS.SEARCH);
  const { data } = await http.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/products?all=true`);
// console.log('data', data.products);


  function searchProduct(product: any) {
    return product.title.toLowerCase().indexOf(options.text.toLowerCase()) > -1;
  }


  return Array.isArray(data.products)  && data.products?.filter(searchProduct);
};

export const useSearchQuery = (options: QueryOptionsType) => {
  // console.log(options);
  
  return useQuery({
    queryKey: [API_ENDPOINTS.SEARCH, options],
    queryFn: fetchSearchedProducts,
  });
};

