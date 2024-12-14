import AddressGrid from '@components/address/address-grid';
import { useAddressQuery } from '@framework/address/address';

export default function AccountDetailsPage() {
  let { data, isLoading } = useAddressQuery();
  return (
    <div className="pt-4">
      {!isLoading ? (
        // <AddressGrid address={data?.data} />
        <AddressGrid  />

      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
