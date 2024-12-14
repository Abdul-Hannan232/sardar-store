import { QueryOptionsType, Brand } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const fetchBrands = async () => {
  const {
    data: { data },
  } = await axios.get(`${process.env.NEXT_PUBLIC_LOCAL_API_ENDPOINT}/${API_ENDPOINTS.BRANDS}`);
  return { brands: { data: data as Brand[] } };
};
export const useBrandsQuery = (options: QueryOptionsType) => {
  return useQuery<{ brands: { data: Brand[] } }, Error>({
    queryKey: [API_ENDPOINTS.BRANDS, options],
    queryFn: fetchBrands,
  });
};
