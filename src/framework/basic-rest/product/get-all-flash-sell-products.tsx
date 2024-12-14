import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const fetchFlashSellProducts = async ({ queryKey }: any) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_API_ENDPOINT}/${API_ENDPOINTS.FLASH_SELL_PRODUCTS}`);
  return data as Product[];
};
export const useFlashSellProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.FLASH_SELL_PRODUCTS, options],
    queryFn: () => fetchFlashSellProducts(options),
  });
};
