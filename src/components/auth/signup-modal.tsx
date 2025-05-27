'use client';

import Logo from '@components/ui/logo';
import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import cn from 'classnames';
import Image from 'next/image';
import { useEffect } from 'react';


export default function SignUpModal({
  isPopup = true,
  
}) {
  const { closeModal } = useModalAction();

  // useEffect(() => {
  //   setTimeout(() => {
  //     closeModal();
  //   }, 3500);
  // }, []);

  return (
    <div
      className={cn(
        'flex bg-brand-light mx-auto rounded-lg md:w-[500px] ',
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}
      <div className="flex w-full mx-auto overflow-hidden rounded-lg bg-brand-light">
        <div className="w-full   py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md shadow-dropDown flex flex-col justify-center">
          <div className="text-center mb-6 pt-2.5">
            <div onClick={closeModal}>
              <Logo />
            </div>
            <Image
              alt="check mark loader"
              className="rounded mx-auto my-4"
              src="/assets/images/check-loader-2.gif"
              width={300}
              height={300}
            />

            <h1 className="text-xl py-2">Please check your email to verify!</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
