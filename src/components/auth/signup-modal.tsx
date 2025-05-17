'use client';

import Logo from '@components/ui/logo';
import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';


interface SignUpFormProps {
  isPopup?: boolean;
  className?: string;
}

export default function SignUpModal({
  isPopup = true,
  className,
}: SignUpFormProps) {
  const { closeModal } = useModalAction();

 
  
 

  return (
    <div
      className={cn(
        'flex bg-brand-light mx-auto rounded-lg md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px]',
        className,
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}
      <div className="flex w-full mx-auto overflow-hidden rounded-lg bg-brand-light">
       
        <div className="w-full  lg:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md shadow-dropDown flex flex-col justify-center">
          <div className="text-center mb-6 pt-2.5">
            <div onClick={closeModal}>
              <Logo />
            </div>
           
           <h1></h1>
           
          </div>
         
         
        </div>
      </div>
    </div>
  );
}


