import { OrderDetailsContent } from './order-details-content';
// import { formatAddress } from '@utils/format-address';
import Heading from '@components/ui/heading';
import { IoClose } from 'react-icons/io5';
import OrderStatus from './order-status';
// import useWindowSize from '@utils/use-window-size';
// import { toast } from 'react-toastify';
import { useUI } from '@contexts/ui.context';
import ReviewForm from '@components/common/form/review-form';
// import http from '@framework/utils/http';

const OrderReviewDrawer = () => {
  const { data, closeDrawer } = useUI();
  // const { width } = useWindowSize();

  let { user } = data;

  return (
    <>
      {data !== '' && (
        <>
          <div className="block">
            <div className="relative flex items-center justify-between w-full border-b ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 border-border-base">
              <Heading variant="titleMedium">ADD Review:</Heading>
              <button
                className="flex items-center justify-center px-4 py-6 text-2xl transition-opacity md:px-6 lg:py-7 focus:outline-none text-brand-dark hover:opacity-60"
                onClick={closeDrawer}
                aria-label="close"
              >
                <IoClose />
              </button>
            </div>

            <ReviewForm
              order={data}
              className="flex-grow lg:w-[500px] xl:w-[540px] 2xl:w-[600px] 3xl:w-[730px]  ltr:pl-10  rtl:pr-10 xl:ltr:pl-14 xl:rtl:pr-14 3xl:ltr:pl-20 3xl:rtl:pr-20 shrink-0 pt-10"
            />

            {/* <div className="p-5 md:p-8">
              <div className="text-[14px] opacity-70 mb-3 text-brand-dark">
                Delivery Address
              </div>
              <div className="rounded border border-solid min-h-[90px] bg-fill-base p-4 border-border-two text-[12px] md:text-[14px]">
                <p className="text-brand-dark opacity-70">
                  {user?.address}
                </p>
              </div>
              <OrderStatus status={data?.status} />

              {data?.status === 'Cancel' && (
                <div className="text-[16px] text-center text-red-600  opacity-70 mb-3 ">
                  Cancelled
                </div>
              )}

              <div className="grid grid-cols-12 bg-fill-base py-3 rounded-[3px] text-brand-dark/70 text-[12px] md:text-[14px]">
                <div className="col-span-2"></div>
                <div className="col-span-5">Items Name</div>
                <div className="col-span-3 text-center md:ltr:text-left md:rtl:text-right">
                  Quantity
                </div>
                <div className="col-span-2">Price</div>
              </div>
              {data?.items?.map((item: any, index: string) => (
                <OrderDetailsContent key={index} item={item} />
              ))}
              <div className="mt-3 ltr:text-right rtl:text-left">
                <div className="text-black inline-flex flex-col text-[12px] md:text-[14px]">
                  <p className="flex justify-between mb-2 ltr:pl-20 rtl:pr-20">
                    <span className="ltr:mr-8 rtl:ml-8">Total Cost:</span>
                    <span className="font-medium">Rs {data.totalPrice}</span>
                  </p>
                </div>
              </div>
             
            </div> */}
          </div>
        </>
      )}
    </>
  );
};

export default OrderReviewDrawer;
