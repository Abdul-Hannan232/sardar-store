import { QueryOptionsType, Order } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

const fetchOrders = async (id?:string) => {
  // const { data } = await http.get(API_ENDPOINTS.ORDERS);
  const { data } = await http.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/orders/user/${Number(id)}`);
  return {
    data: data,
  };
};


// const fetchOrders = async () => {
//   const { data } = await http.get(API_ENDPOINTS.ORDERS);
//   return {
//     data: data,
//   };
// };

const useOrdersQuery = (options: QueryOptionsType) => {
  // console.log('>>>>>>>>>>>> options', options);
  
  return useQuery({
    // queryKey: [API_ENDPOINTS.ORDERS, options],
    queryKey: [`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/orders/user/`, options],
    queryFn: ()=> fetchOrders(options?.id as string),
  });
};

export { useOrdersQuery, fetchOrders };
