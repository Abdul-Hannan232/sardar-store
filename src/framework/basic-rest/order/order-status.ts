import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

const fetchOrderStatus = async () => {
  // const { data } = await http.get(API_ENDPOINTS.ORDER_STATUS);
  const data = [
    {
        "id": 0,
        "name": "Order placed",
        "serial": 0,
        "color": "#02B290",
        "created_at": "Thu Jun 17 2021 22:12:50 GMT+0600",
        "updated_at": "Thu Jun 17 2021 22:12:35 GMT+0600"
    },
    {
        "id": 1,
        "name": "Order Received",
        "serial": 1,
        "color": "#02B290",
        "created_at": "Thu Jun 17 2021 22:12:50 GMT+0600",
        "updated_at": "Thu Jun 17 2021 22:12:35 GMT+0600"
    },
    
    {
        "id": 2,
        "name": "On the way",
        "serial": 2,
        "color": "#FED030",
        "created_at": "Thu Jun 17 2021 22:12:50 GMT+0600",
        "updated_at": "Thu Jun 17 2021 22:12:35 GMT+0600"
    },
    {
        "id": 3,
        "name": "Delivered",
        "serial": 3,
        "color": "#02B290",
        "created_at": "Thu Jun 17 2021 22:12:50 GMT+0600",
        "updated_at": "Thu Jun 17 2021 22:12:35 GMT+0600"
    }
]
  return {
    data: data,
  };
};

const useOrderStatusQuery = () => {
  return useQuery({
    queryKey: [API_ENDPOINTS.ORDER_STATUS],
    queryFn: fetchOrderStatus,
  });
};

export { useOrderStatusQuery, fetchOrderStatus };
