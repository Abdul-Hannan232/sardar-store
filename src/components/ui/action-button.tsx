import { BsThreeDots } from 'react-icons/bs';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useUI } from '@contexts/ui.context';
import useWindowSize from '@utils/use-window-size';
import { toast } from 'react-toastify';
import http from '@framework/utils/http';


const ActionsButton: React.FC<{ item?: any }> = ({ item }) => {

  // console.log('----------- ActionsButton ',item);
  
  const { openDrawer, setDrawerView, closeDrawer } = useUI();
  const { width } = useWindowSize();


  function handleCartOpen(item: any) {
    setDrawerView('ORDER_DETAILS');
    return openDrawer(item);
  }



  const handleCancelOrder = async (orderId: number) => {
    // console.log('orderId: ' , orderId);

    closeDrawer();
    try {
      const response = await http.put(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/orders/${orderId}`,
        {
          status: 'Cancel',
        },
      );

      if (response.status === 200) {
        // @ts-ignore
        toast(response.data.message, {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // getUpdatedOrder()

      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order');
    }
  };

  return (
    <>
      <Popover className="relative actions_button_group">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${!open && 'text-opacity-90'}
                text-white group  px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <BsThreeDots
                style={{ color: 'rgba(140, 150, 159, 1)' }}
                size={20}
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute top-[100%] ltr:right-4 ltr:top-full rtl:left-0 z-10 bg-white shadow-dropDown rounded py-2 table-more-menu">
                <div
                  className="text-[14px] whitespace-nowrap text-brand-dark py-2 px-5 hover:bg-[#F6F9FC] transition-all cursor-pointer"
                  onClick={() => handleCartOpen(item)}
                >
                  Order Details
                </div>
                <div onClick={()=>handleCancelOrder(item.id)} className="text-[14px] whitespace-nowrap text-[#F35C5C] py-2 px-5 hover:bg-[#F6F9FC] transition-all cursor-pointer">
                  Cancel Order
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};

export default ActionsButton;
