import { Order } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchOrder = async (_id: number) => {
  // const { data } = await http.get(`${API_ENDPOINTS.ORDER}`);
  if(_id){
    const { data } = await http.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/orders/${Number(_id)}`);
     
    return data;

  }
};
export const useOrderQuery = (id: number) => {
  return useQuery<Order, Error>({
    // queryKey: [API_ENDPOINTS.ORDER, id],
    queryKey: [`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/orders/${Number(id)}`, id],
    queryFn: () => fetchOrder(id),
  });
};




