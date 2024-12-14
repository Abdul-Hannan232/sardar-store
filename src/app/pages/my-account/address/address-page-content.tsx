'use client';

import AddressGrid from '@components/address/address-grid';
import Button from '@components/ui/button';
import TextArea from '@components/ui/form/text-area';
import { useAddressQuery } from '@framework/address/address';
import http from '@framework/utils/http';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';

export default function AddressPageContent() {
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
      const { data } = await http.put(`user/${id}`, user);

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
        <form onSubmit={handleSubmit} noValidate>
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
