import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchRelatedProducts = async ({ limit , categoryId}: any) => {
  // console.log('fetchRelatedProducts queryKey', queryKey);
  
  // const { data } = await http.get(API_ENDPOINTS.RELATED_PRODUCTS);
  const { data } = await http.get( `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/products/bycategory/${categoryId}`);
  return data;
};
export const useRelatedProductsQuery = (options: QueryOptionsType) => {
  // console.log('fetchRelatedProducts optoons', options);

  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.RELATED_PRODUCTS, options],
    queryFn: () => fetchRelatedProducts(options),
  });
};
