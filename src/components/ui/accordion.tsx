// 'use client';

// import cn from 'classnames';
// import { Disclosure, Transition } from '@headlessui/react';
// import { MdKeyboardArrowRight } from 'react-icons/md';

// type CollapseProps = {
//   item: any;
//   translatorNS: string;
//   variant?: 'gray' | 'transparent';
// };

// export const Accordion: React.FC<CollapseProps> = ({
//   item,
//   translatorNS,
//   variant = 'gray',
// }) => {
//   const { id, question, answer } = item;
//   // const { id, title, content } = item;
//   return (
//     <div className="w-full">
//       <div className="w-full mx-auto mb-4 rounded shadow-category text-brand-light group">
//         <Disclosure>
//           {({ open }) => (
//             <div>
//               <Disclosure.Button className="flex justify-between w-full px-5 py-4 text-base font-medium 2xl:px-6 2xl:py-6 ltr:text-left rtl:text-right text-brand-dark focus:outline-none">
//                 <span
//                   className={cn(
//                     'text-sm font-medium leading-relaxed text-heading ltr:pr-2 rtl:pl-2',
//                     {
//                       'md:text-base': variant === 'gray',
//                       'md:text-base lg:text-lg': variant === 'transparent',
//                     },
//                   )}
//                 >
//                   {question}
//                 </span>
//                 <MdKeyboardArrowRight
//                   className={`text-xl lg:text-2xl text-brand-dark text-opacity-60 group-hover:text-opacity-100 -mr-2 lg:-mr-1.5 shrink-0 ${
//                     open ? 'transform rotate-90' : ''
//                   }`}
//                 />
//               </Disclosure.Button>

//               <Transition
//                 show={open}
//                 enter="transition duration-500 ease-out"
//                 enterFrom="transform scale-5 opacity-0"
//                 enterTo="transform scale-10 opacity-100"
//                 leave="transition duration-75 ease-out"
//                 leaveFrom="transform scale-100 opacity-100"
//                 leaveTo="transform scale-5 opacity-0"
//               >
//                 {open && (
//                   <Disclosure.Panel static>
//                     <div className="px-5 pb-4 -mt-1 text-sm leading-7 2xl:pb-7 2xl:px-6 2xl:mt-0 2xl:text-15px text-brand-dark opacity-70">
//                       {answer}
//                     </div>
//                   </Disclosure.Panel>
//                 )}
//               </Transition>
//             </div>
//           )}
//         </Disclosure>
//       </div>
//     </div>
//   );
// };

// export default Accordion;



'use client';

import cn from 'classnames';
import { Disclosure, Transition } from '@headlessui/react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

type CollapseProps = {
  item: any;
  translatorNS: string;
  variant?: 'gray' | 'transparent';
};

export const Accordion: React.FC<CollapseProps> = ({
  item,
  translatorNS,
  variant = 'gray',
}) => {
  const { id, question, answer } = item;
  // const { id, title, content } = item;
  return (
    <div className="w-full">
      <div className="w-full mx-auto mb-4 rounded shadow-category text-brand-light group">
        <Disclosure>
          {({ open }) => (
            <div>
              <Disclosure.Button className="flex justify-between w-full px-5 py-4 text-base font-medium 2xl:px-6 2xl:py-6 text-right text-brand-dark focus:outline-none">
                {/* <MdKeyboardArrowRight */}
                <MdKeyboardArrowLeft
                  className={`text-xl lg:text-2xl text-brand-dark text-opacity-60 group-hover:text-opacity-100 -mr-2 lg:-mr-1.5 shrink-0 ${
                    open ? 'transform -rotate-90' : ''
                  }`}
                />
                <span
                  className={cn(
                    'text-sm flex-grow font-medium leading-relaxed text-heading  ltr:pr-2 rtl:pl-2',
                    {
                      'md:text-base': variant === 'gray',
                      'md:text-base lg:text-lg': variant === 'transparent',
                    },
                  )}
                  dir="rtl"
                >
                  {question}
                </span>
                
              </Disclosure.Button>

              <Transition
              as="div"
                show={open}
                enter="transition duration-500 ease-out"
                enterFrom="transform scale-5 opacity-0"
                enterTo="transform scale-10 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-5 opacity-0"
              >
                {open && (
                  <Disclosure.Panel static>
                    <div dir="rtl" className="px-5 pb-4 -mt-1 text-sm leading-7 2xl:pb-7 2xl:px-6 2xl:mt-0 2xl:text-15px text-brand-dark opacity-70">
                      {answer}
                    </div>
                  </Disclosure.Panel>
                )}
              </Transition>
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default Accordion;
