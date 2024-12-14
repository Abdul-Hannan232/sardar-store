// import { useOrderStatusQuery } from '@framework/order/order-status';
// import ProgressBox from './progress-box';

// interface Props {
//   status: number;
// }

// const OrderStatus = ({ status }: Props) => {

  
//   const { data, isLoading } = useOrderStatusQuery();
//   console.log('>>>>>>>>>> status', data);
//   return !isLoading ? (
//     <ProgressBox data={data} status={status} />
//   ) : (
//     <div>Loading...</div>
//   );
// };

// export default OrderStatus;



import { useOrderStatusQuery } from '@framework/order/order-status';
import ProgressBox from './progress-box';

interface Props {
  status: string;
}

const OrderStatus = ({ status }: Props) => {
  const { data, isLoading } = useOrderStatusQuery();
  // console.log('>>>>>>>>>> status', data);

  return !isLoading ? (
    <ProgressBox data={data?.data} status={status} />
  ) : (
    <div>Loading...</div>
  );
};

export default OrderStatus;
