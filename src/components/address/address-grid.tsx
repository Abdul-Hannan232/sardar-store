// 'use client';

// import { useState } from 'react';
// import { TiPencil } from 'react-icons/ti';
// import { AiOutlinePlus } from 'react-icons/ai';
// import { RadioGroup } from '@headlessui/react';
// import { useModalAction } from '@components/common/modal/modal.context';
// import { formatAddress } from '@utils/format-address';
// import Button from '@components/ui/button';

// const AddressGrid: React.FC<{ address?: any }> = ({ address }) => {
//   const { openModal } = useModalAction();

//   function handlePopupView(item: any) {
//     openModal('ADDRESS_VIEW_AND_EDIT', item);
//   }

//   address = address || [];

//   const [selected, setSelected] = useState(address[0]);
//   return (
//     <div className="flex flex-col justify-between h-full -mt-4 text-15px md:mt-0">
//       <RadioGroup
//         value={selected}
//         onChange={setSelected}
//         className="space-y-4 md:grid md:grid-cols-2 md:gap-5 auto-rows-auto md:space-y-0"
//       >
//         <RadioGroup.Label className="sr-only">address</RadioGroup.Label>
//         {address?.length > 0 ? (
//           address?.map((item: any, index: any) => (
//             <RadioGroup.Option
//               key={index}
//               value={item}
//               className={({ checked }) =>
//                 `${checked ? 'border-brand' : 'border-border-base'}
//                   border-2 relative focus:outline-none rounded-md p-5 block cursor-pointer min-h-[112px] h-full group address__box`
//               }
//             >
//               <RadioGroup.Label
//                 as="h3"
//                 className="mb-2 -mt-1 font-semibold text-brand-dark "
//               >
//                 {item?.title}
//               </RadioGroup.Label>
//               <RadioGroup.Description
//                 as="div"
//                 className="leading-6 text-brand-muted"
//               >
//                 {formatAddress(item?.address)}
//               </RadioGroup.Description>
//               <div className="absolute z-10 flex transition-all ltr:right-3 rtl:left-3 top-3 lg:opacity-0 address__actions">
//                 <button
//                   onClick={() => handlePopupView(item)}
//                   className="flex items-center justify-center w-6 h-6 text-base rounded-full bg-brand text-brand-light text-opacity-80"
//                 >
//                   <span className="sr-only">{item?.title}</span>
//                   <TiPencil />
//                 </button>
//               </div>
//             </RadioGroup.Option>
//           ))
//         ) : (
//           <div className="border-2 border-border-base rounded font-semibold p-5 px-10 text-brand-danger flex justify-start items-center min-h-[112px] h-full">
//             No address found
//           </div>
//         )}
//         {/* <button
//           className="w-full border-2 transition-all border-border-base rounded font-semibold p-5 px-10 cursor-pointer text-brand flex justify-start hover:border-brand items-center min-h-[112px] h-full"
//           onClick={handlePopupView}
//         >
//           <AiOutlinePlus size={18} className="ltr:mr-2 rtl:ml-2" />
//           Add Address
//         </button> */}
//       </RadioGroup>

//       <div className="flex mt-5 sm:justify-end md:mt-10 lg:mt-20 save-change-button">
//         <Button className="w-full sm:w-auto">Save Changes</Button>
//       </div>
//     </div>
//   );
// };

// export default AddressGrid;

'use client';

// import AddressGrid from '@components/address/address-grid';
import Button from '@components/ui/button';
import TextArea from '@components/ui/form/text-area';
import { useAddressQuery } from '@framework/address/address';
import http from '@framework/utils/http';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';

export default function AddressGrid() {
  const [isLoading, setIsLoading] = useState(true);
  // let { data, isLoading } = useAddressQuery();
  const { width } = useWindowSize();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
      setIsLoading(false);
    }
  }, []);

  const updateUser = async (id: number) => {
    if (id) {
      const { data } = await http.put(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/user/${id}`,
        user,
      );

      // console.log('>>>>>>>>>>>>>>> data ' , data);
      
      if (data.success) {
        toast('Address updated Successfully', {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });


      
          localStorage.setItem('user', JSON.stringify(data.user));
   
      }

      return data;
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateUser(user.id);
    // console.log(event.target.address.value);
  };

  return (
    <>
      {!isLoading ? (
        <form onSubmit={handleSubmit} noValidate >
          <div className="mb-6">
            <TextArea
              inputClassName="focus:border-2 focus:outline-none focus:border-brand"
              label="Address"
              variant="normal"
              name="address"
              required
              value={(user?.address as string) || ''}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
              className="w-full lg:w-4/5 "
            />
          </div>
          {/* // <AddressGrid address={data?.data} /> */}

          <div className="flex mt-5 sm:justify-end md:mt-10 lg:mt-20 save-change-button">
            <Button className="w-full sm:w-auto">Save Changes</Button>
          </div>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
