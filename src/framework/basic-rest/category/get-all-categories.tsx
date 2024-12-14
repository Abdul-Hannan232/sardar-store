import { CategoriesQueryOptionsType, Category } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
 
export const fetchCategories = async ({ queryKey }: any) => {
  // const options = queryKey[1];
  // const { data } = await http.get(API_ENDPOINTS.CATEGORIES);
  const { data } = await http.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/category`);
// console.log('================== ', data);

  return {
    categories: {
      data: data as Category[],
      // data: data.data as Category[],
    },
  };
};

export const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  return useQuery<{ categories: { data: Category[] } }, Error>({
    // queryKey: [API_ENDPOINTS.CATEGORIES, options],
    queryKey: [`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/category`, options],
    queryFn: fetchCategories,
  });
};
