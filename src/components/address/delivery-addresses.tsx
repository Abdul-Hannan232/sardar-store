import { useAddressQuery } from '@framework/address/address';
import AddressGrid from '@components/address/address-grid';
import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import Heading from '@components/ui/heading';

const DeliveryAddresses = () => {
  let { data, isLoading } = useAddressQuery();
  const { closeModal } = useModalAction();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className=" w-96 lg:w-[820px] bg-brand-light p-5 sm:p-8 md:p-10 border border-border-base rounded-md relative">
      <CloseButton onClick={closeModal}  className='absolute top-2 right-2'/>
      <div className="w-full">
        <Heading variant="title" className="mb-5 md:mb-8 md:-mt-1.5">
          Delivery Address
        </Heading>
        {/* <AddressGrid address={data?.data} /> */}
        <AddressGrid  />
        
        
      </div>
    </div>
  );
};

export default DeliveryAddresses;
