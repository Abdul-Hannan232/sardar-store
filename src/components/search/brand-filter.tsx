import { CheckBox } from '@components/ui/form/checkbox';
import { useBrandsQuery } from '@framework/brand/get-all-brands';
import { Disclosure } from '@headlessui/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import React, { useState, useEffect } from 'react';
import Heading from '@components/ui/heading';
import useQueryParam from '@utils/use-query-params';

export const BrandFilter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { updateQueryparams } = useQueryParam(pathname ?? '/');
  const [formState, setFormState] = useState<string[]>([]);

  const hasQueryKey = searchParams?.get('brand');

  useEffect(() => {
    updateQueryparams('brand', formState.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useEffect(() => {
    setFormState(hasQueryKey?.split(',') ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasQueryKey]);

  const { data, isLoading, error } = useBrandsQuery({
    limit: 10,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    setFormState(
      formState.includes(value)
        ? formState.filter((item: string) => item !== value)
        : [...formState, value],
    );
  }
  const items = data?.brands?.data;

  return (
    <div className="block">
      <Heading className="mb-5 -mt-1">Brands</Heading>
      <div className="flex flex-col p-5 border rounded-md border-border-base">
        {items
          ?.slice(0, 3)
          ?.map((item: any) => (
            <CheckBox
              key={`${item.name}-key-${item.id}`}
              label={item.name}
              name={item.name.toLowerCase()}
              checked={formState.includes(item.slug)}
              value={item.name}
              onChange={handleItemClick}
            />
          ))}
        {items!?.length > 3 && (
          <div className="w-full">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Panel className="pt-4 pb-2">
                    {items
                      ?.slice(3, items.length)
                      .map((item: any) => (
                        <CheckBox
                          key={`${item.name}-key-${item.id}`}
                          label={item.name}
                          name={item.name.toLowerCase()}
                          checked={formState.includes(item.name)}
                          value={item.name}
                          onChange={handleItemClick}
                        />
                      ))}
                  </Disclosure.Panel>
                  <Disclosure.Button className="flex justify-center items-center w-full px-4 pt-3.5 pb-1 text-sm font-medium text-center bg-brand focus:outline-none">
                    {open ? (
                      <>
                        <span className="inline-block ltr:pr-1 rtl:pl-1">
                          See less
                        </span>
                        <IoIosArrowUp className="text-brand-dark text-opacity-60 text-15px" />
                      </>
                    ) : (
                      <>
                        <span className="inline-block ltr:pr-1 rtl:pl-1">
                          See more
                        </span>
                        <IoIosArrowDown className="text-brand-dark text-opacity-60 text-15px" />
                      </>
                    )}
                  </Disclosure.Button>
                </>
              )}
            </Disclosure>
          </div>
        )}
      </div>
    </div>
  );
};
