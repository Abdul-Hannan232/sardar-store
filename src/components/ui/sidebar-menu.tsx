// 'use client';

// import { usePathname, useSearchParams } from 'next/navigation';
// import cn from 'classnames';
// import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
// import { useUI } from '@contexts/ui.context';
// import { useEffect, useState } from 'react';
// import Image from '@components/ui/image';
// import useQueryParam from '@utils/use-query-params';

// function SidebarMenuItem({ className, item, depth = 0 }: any) {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const { updateQueryparams } = useQueryParam(pathname ?? '/');
//   const [formState, setFormState] = useState<string>('');
//   const active = searchParams.get('category');
//   const isActive = false
//     // active === item.slug ||
//     // item?.children?.some((_item: any) => _item.slug === active);
//   // const isActive =
//   //   active === item.slug ||
//   //   item?.children?.some((_item: any) => _item.slug === active);
//   const [isOpen, setOpen] = useState<boolean>(isActive);
//   useEffect(() => {
//     setOpen(isActive);
//   }, [isActive]);

//   // const { slug, name, children: items, icon } = item;
//   const { slug, name, children: items, icon } = item;
//   console.log('000000000000 ' , typeof items);

//   const { displaySidebar, closeSidebar } = useUI();

//   function toggleCollapse() {
//     setOpen((prevValue) => !prevValue);
//   }

//   const hasQueryKey = searchParams?.get('category');

//   useEffect(() => {
//     updateQueryparams('category', formState.toString());
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [formState]);

//   useEffect(() => {
//     setFormState(hasQueryKey ?? '');
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [hasQueryKey]);

//   function onClick() {
//     if (Array.isArray(items) && !!items.length) {
//       toggleCollapse();
//     } else {
//       setFormState(slug);
//       displaySidebar && closeSidebar();
//     }
//   }

//   let expandIcon;
//   if (Array.isArray(items) && items.length) {
//     expandIcon = !isOpen ? (
//       <IoIosArrowDown className="text-base text-brand-dark text-opacity-40" />
//     ) : (
//       <IoIosArrowUp className="text-base text-brand-dark text-opacity-40" />
//     );
//   }

//   return (
//     <>
//       <li
//         onClick={onClick}
//         className={`flex justify-between items-center transition ${
//           className
//             ? className
//             : 'text-sm md:text-15px hover:bg-fill-base border-t border-border-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3'
//         } ${isOpen ? 'bg-fill-base' : 'text-brand-dark text-opacity-70'}`}
//       >
//         <button
//           className={cn(
//             'flex items-center w-full ltr:text-left rtl:text-right outline-none focus:outline-none group focus:ring-0 focus:text-brand-dark',
//           )}
//         >
//           {icon && (
//             <div className="inline-flex shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto">
//               <Image
//                 src={icon ?? '/assets/placeholder/category-small.svg'}
//                 alt={name || 'Categories'}
//                 // alt={name || t('text-category-thumbnail')}
//                 width={40}
//                 height={40}
//                 style={{ width: 'auto', height: 'auto' }}
//               />
//             </div>
//           )}
//           <span className="text-brand-dark group-hover:text-opacity-80 capitalize ltr:pl-2.5 rtl:pr-2.5 md:ltr:pl-4 md:rtl:pr-4 2xl:ltr:pl-3 2xl:rtl:pr-3 3xl:ltr:pl-4 3xl:rtl:pr-4">
//             {name}
//           </span>
//           <span className="ltr:ml-auto rtl:mr-auto">{expandIcon}</span>
//         </button>
//       </li>
//       {Array.isArray(items) && isOpen ? (
//         <li>
//           <ul
//             key="content"
//             className="py-3 text-xs border-t border-border-base"
//           >
//             {items?.map((currentItem) => {
//               const childDepth = depth + 1;
//               return (
//                 <SidebarMenuItem
//                   key={`${currentItem.name}${currentItem.slug}`}
//                   item={currentItem}
//                   depth={childDepth}
//                   className={cn(
//                     'text-sm ltr:pl-14 rtl:pr-14 py-2.5 ltr:pr-4 rtl:pl-4',
//                   )}
//                 />
//               );
//             })}
//           </ul>
//         </li>
//       ) : null}
//     </>
//   );
// }

// function SidebarMenu({ items, className }: { items: any; className?: string }) {
//   return (
//     <ul className={cn(className)}>
//       {items?.map((item: any) => (
//         <SidebarMenuItem key={`${item.slug}-key-${item.id}`} item={item} />
//       ))}
//     </ul>
//   );
// }

// export default SidebarMenu;

'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import cn from 'classnames';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useUI } from '@contexts/ui.context';
import { useEffect, useState } from 'react';
import Image from '@components/ui/image';
import useQueryParam from '@utils/use-query-params';

function SidebarMenuItem({ className, item, subItem, depth = 0 }: any) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { updateQueryparams } = useQueryParam(pathname ?? '/');
  const [formState, setFormState] = useState<string>('');
  const active = searchParams.get('category');
  const [items, setItems] = useState<any[]>([]);
  const isActive = false;
  // active === item.slug ||
  // item?.children?.some((_item: any) => _item.slug === active);
  // const isActive =
  //   active === item.slug ||
  //   item?.children?.some((_item: any) => _item.slug === active);
  const [isOpen, setOpen] = useState<boolean>(isActive);
  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);

  const { name, children, icon } = item;

  // const { slug, name, children, icon } = item;
  useEffect(() => {
    if (children) {
      try {
        setItems(JSON.parse(children));
      } catch (error) {
        console.error('Error parsing children JSON:', error);
        setItems([]); // Set to empty array or handle as necessary
      }
    } else {
      setItems([]); // Set to empty array or handle as necessary
    }
  }, [children]);
  const { displaySidebar, closeSidebar } = useUI();

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }

  const hasQueryKey = searchParams?.get('category');

  useEffect(() => {
    // updateQueryparams('category', formState.toString());
    updateQueryparams('category', formState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useEffect(() => {
    setFormState(hasQueryKey ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasQueryKey]);

  function onClick() {
    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
    } else {
      setFormState(name ? name : subItem);
      // setFormState(slug);
      displaySidebar && closeSidebar();
    }
  }

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isOpen ? (
      <IoIosArrowDown className="text-base text-brand-dark text-opacity-40" />
    ) : (
      <IoIosArrowUp className="text-base text-brand-dark text-opacity-40" />
    );
  }
  // console.log('000000000000 ', items);

  return (
    <>
      <li
        onClick={onClick}
        className={`flex justify-between items-center transition ${
          className
            ? className
            : 'text-sm md:text-15px hover:bg-fill-base border-t border-border-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3'
        } ${isOpen ? 'bg-fill-base' : 'text-brand-dark text-opacity-70'}`}
      >
        <button
          className={cn(
            'flex items-center w-full ltr:text-left rtl:text-right outline-none focus:outline-none group focus:ring-0 focus:text-brand-dark',
          )}
        >
          {icon && (
            <div className="inline-flex shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto">
              <Image
                src={icon ?? '/assets/placeholder/category-small.svg'}
                alt={name || 'Categories'}
                // alt={name || t('text-category-thumbnail')}
                width={40}
                height={40}
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          )}
          <span className="text-brand-dark group-hover:text-opacity-80 capitalize ltr:pl-2.5 rtl:pr-2.5 md:ltr:pl-4 md:rtl:pr-4 2xl:ltr:pl-3 2xl:rtl:pr-3 3xl:ltr:pl-4 3xl:rtl:pr-4">
            {subItem ? subItem : name}
          </span>
          <span className="ltr:ml-auto rtl:mr-auto">{expandIcon}</span>
        </button>
      </li>
      {Array.isArray(items) && isOpen ? (
        <>
          {/* {console.log('pppppppppppppp ', items)} */}

          <li>
            <ul
              key="content"
              className="py-3 text-xs border-t border-border-base"
            >
              {items?.map((currentItem, i) => {
                const childDepth = depth + 1;
                return (
                  // <li>{currentItem}</li>
                  <SidebarMenuItem
                    key={i}
                    // key={`${currentItem.name}${currentItem.slug}`}
                    subItem={currentItem}
                    item={currentItem}
                    depth={childDepth}
                    className={cn(
                      'text-sm ltr:pl-14 rtl:pr-14 py-2.5 ltr:pr-4 rtl:pl-4',
                    )}
                  />
                );
              })}
            </ul>
          </li>
        </>
      ) : null}
    </>
  );
}

function SidebarMenu({ items, className }: { items: any; className?: string }) {
  return (
    <ul className={cn(className)}>
      {items?.map((item: any, i: number) => (
        <SidebarMenuItem key={i} item={item} />

        // <SidebarMenuItem key={`${item.slug}-key-${item.id}`} item={item} />
      ))}
    </ul>
  );
}

export default SidebarMenu;
