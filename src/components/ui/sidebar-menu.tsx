// 'use client';

// import { usePathname, useSearchParams } from 'next/navigation';
// import cn from 'classnames';
// import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
// import { useUI } from '@contexts/ui.context';
// import { useEffect, useState } from 'react';
// import Image from '@components/ui/image';
// import useQueryParam from '@utils/use-query-params';

// const SidebarMenuItem =({ className, item, subItem, depth = 0 , activeCategory,
//   setActiveCategory,}: any) =>{
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const { updateQueryparams } = useQueryParam(pathname ?? '/');
//   const [formState, setFormState] = useState<string>('');
//   // const active = searchParams.get('category');
//   const [items, setItems] = useState<any[]>([]);
//   const isActive = false;

//   const [isOpen, setOpen] = useState<boolean>(isActive);
//   useEffect(() => {
//     setOpen(isActive);
//   }, [isActive]);

//   const { name, children, icon } = item;

//   useEffect(() => {
//     if (children) {
//       try {
//         setItems(JSON.parse(children));
//       } catch (error) {
//         console.error('Error parsing children JSON:', error);
//         setItems([]); // Set to empty array or handle as necessary
//       }
//     } else {
//       setItems([]); // Set to empty array or handle as necessary
//     }
//   }, [children]);
//   const { displaySidebar, closeSidebar } = useUI();

//   function toggleCollapse() {
//     setOpen((prevValue) => !prevValue);
//   }

//   const hasQueryKey = searchParams?.get('category');

//   useEffect(() => {
//     // updateQueryparams('category', formState.toString());
//     updateQueryparams('category', formState);
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
//       setFormState(name ? name : subItem);
//       // setFormState(slug);
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
//         type='button'
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
//             {subItem ? subItem : name}
//           </span>
//           <span className="ltr:ml-auto rtl:mr-auto">{expandIcon}</span>
//         </button>
//       </li>
//       {Array.isArray(items) && isOpen ? (
//         <>
//           {/* {console.log('pppppppppppppp ', items)} */}

//           <li>
//             <ul
//               key="content"
//               className="py-3 text-xs border-t border-border-base"
//             >
//               {items?.map((currentItem, i) => {
//                 const childDepth = depth + 1;
//                 return (
//                   // <li>{currentItem}</li>
//                   <SidebarMenuItem
//                     key={i}
//                     // key={`${currentItem.name}${currentItem.slug}`}
//                     subItem={currentItem}
//                     item={currentItem}
//                     depth={childDepth}
//                     className={cn(
//                       'text-sm ltr:pl-14 rtl:pr-14 py-2.5 ltr:pr-4 rtl:pl-4',
//                     )}
//                   />
//                 );
//               })}
//             </ul>
//           </li>
//         </>
//       ) : null}
//     </>
//   );
// }

// function SidebarMenu({ items, className }: { items: any; className?: string }) {
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   return (
//     <ul className={cn(className)}>
//       {items?.map((item: any, i: number) => (
//         <SidebarMenuItem key={i} item={item} activeCategory={activeCategory}
//         setActiveCategory={setActiveCategory}/>

//         // <SidebarMenuItem key={`${item.slug}-key-${item.id}`} item={item} />
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
import { useRouter } from 'next/navigation';
import { useCategoryContext } from '@pages/category-with-products';
import Link from 'next/link';

const SidebarMenuItem = ({
  className,
  item,
  subItem,
  depth = 0,
  activeCategory,
  setActiveCategory,
}: any) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { updateQueryparams } = useQueryParam(pathname ?? '/');
  const [formState, setFormState] = useState<string>('');
  const [items, setItems] = useState<any[]>([]);
  const [isOpen, setOpen] = useState<boolean>(false);
  const { params, setParams } = useCategoryContext();

  const { name, children, icon } = item;
  const isActive = activeCategory === name;
  // console.log(item);
  // console.log(formState);

  useEffect(() => {
    if (children) {
      try {
        setItems(JSON.parse(children));
      } catch (error) {
        console.error('Error parsing children JSON:', error);
        setItems([]);
      }
    } else {
      setItems([]);
    }
  }, [children]);

  const { displaySidebar, closeSidebar } = useUI();

  function toggleCollapse() {
    setActiveCategory(isActive ? null : name); // toggle between expanding and collapsing
  }

  useEffect(() => {
    const hasQueryKey = searchParams?.get('category');
    // console.log('searchParams:', searchParams.toString());
    // console.log('hasQueryKey:', hasQueryKey);
    setFormState(hasQueryKey ?? '');
  }, [searchParams]);

  // function onClick() {
  //   const newParams = new URLSearchParams(searchParams as any); // Clone current query params

  //   if (item.name === formState) {
  //     // Remove category from query params if already selected
  //     newParams.delete('category');
  //     setFormState('');
  //   } else {
  //     // Add or update category
  //     newParams.set('category', item.name);
  //     setFormState(item.name);
  //   }

  //   // Update the URL without reloading
  //   const newUrl = `${pathname}?${newParams.toString()}`;
  //   window.history.pushState({}, '', newUrl);

  //   // Toggle collapse
  //   setOpen(!isOpen);
  //   if (Array.isArray(items) && !!items.length) {
  //     toggleCollapse();
  //   } else {
  //     setFormState(name ? name : subItem);
  //     displaySidebar && closeSidebar();
  //   }
  // }

  function onClick() {
    const newParams = new URLSearchParams(searchParams as any); // Clone current query params
    const categoryName = item.name || subItem || ''; // Ensure name fallback

    // console.log(">>>>>",item);

    if (categoryName === formState) {
      // Remove category from query params if already selected
      newParams.delete('category');
      setParams('');
      setFormState('');
    } else {
      // Add or update category
      newParams.set('category', categoryName);
      setFormState(categoryName);
      setParams(categoryName);
    }
    // setParams(categoryName)

    // Update the URL without reloading
    const newUrl = `${pathname}?${newParams.toString()}`;
    window.history.pushState({}, '', newUrl);

    // Toggle collapse
    setOpen(!isOpen);

    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
    } else {
      setFormState(categoryName);
      displaySidebar && closeSidebar();
    }
  }

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isActive ? (
      <IoIosArrowDown className="text-base text-brand-dark text-opacity-40" />
    ) : (
      <IoIosArrowUp className="text-base text-brand-dark text-opacity-40" />
    );
  }

  return (
    <>
      <li
        onClick={onClick}
        className={`flex justify-between items-center transition ${
          className
            ? className
            : 'text-sm md:text-15px hover:bg-fill-base border-t border-border-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3'
        } ${isActive ? 'bg-fill-base' : 'text-brand-dark text-opacity-70'}`}
      >
        <button
          type="button"
          className={cn(
            'flex items-center w-full ltr:text-left rtl:text-right outline-none focus:outline-none group focus:ring-0 focus:text-brand-dark',
          )}
        >
          {icon && (
            <div className="inline-flex shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto">
              <Image
                src={icon ?? '/assets/placeholder/category-small.svg'}
                alt={name || 'Categories'}
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
      {Array.isArray(items) && isActive ? (
        <li>
          <ul
            key="content"
            className="py-3 text-xs border-t border-border-base"
          >
            {items?.map((currentItem, i) => {
              const childDepth = depth + 1;
              return (
                <SidebarMenuItem
                  key={i}
                  subItem={currentItem}
                  item={currentItem}
                  depth={childDepth}
                  className={cn(
                    'text-sm ltr:pl-14 rtl:pr-14 py-2.5 ltr:pr-4 rtl:pl-4',
                  )}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              );
            })}
          </ul>
        </li>
      ) : null}
    </>
  );
};

// function SidebarMenu({ items, className, setParams }: { items: any; className?: string ;setParams:Function}) {
// function SidebarMenu({ items, className,  }: { items: any; className?: string }) {
//     const { params, setParams } = useCategoryContext();
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);

//    const searchParams = useSearchParams();

//       // Clone current query params

//   return (
//     <ul className={cn(className)}>
//         <li
//         className={`flex justify-between items-center transition ${
//           className
//             ? className
//             : 'text-sm md:text-15px hover:bg-fill-base border-t border-border-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3'
//         } text-brand-dark text-opacity-70`}
//       >
//         <button
//         onClick={()=>{const newParams = new URLSearchParams(searchParams as any); console.log(newParams);
//           newParams.delete('category'); setParams("");}}
//         // href="/"

//           type="button"
//           className={cn(
//             'flex items-center w-full ltr:text-left rtl:text-right outline-none focus:outline-none group focus:ring-0 focus:text-brand-dark',
//           )}
//         >

//             <div className="inline-flex shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto">
//               <Image
//                 src={"/assets/images/clear-filter.webp" }
//                 alt={'clear all'}
//                 width={40}
//                 height={40}
//                 style={{ width: 'auto', height: 'auto' }}
//               />
//             </div>

//           <span className="text-brand-dark group-hover:text-opacity-80 capitalize ltr:pl-2.5 rtl:pr-2.5 md:ltr:pl-4 md:rtl:pr-4 2xl:ltr:pl-3 2xl:rtl:pr-3 3xl:ltr:pl-4 3xl:rtl:pr-4">
//            Clear All
//           </span>
//           <span className="ltr:ml-auto rtl:mr-auto"></span>
//         </button >
//       </li>
//       {items?.map((item: any, i: number) => (
//         // <SidebarMenuItem setParams={setParams} key={i} item={item} activeCategory={activeCategory}
//         <SidebarMenuItem  key={i} item={item} activeCategory={activeCategory}
//         setActiveCategory={setActiveCategory}/>

//         // <SidebarMenuItem key={`${item.slug}-key-${item.id}`} item={item} />
//       ))}
//     </ul>
//   );
// }

function SidebarMenu({ items, className }: { items: any; className?: string }) {
  const { params, setParams } = useCategoryContext();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const isClearDisabled = !searchParams?.has('category');
  const [isClearing, setIsClearing] = useState(false);

  const handleClearAll = () => {
    setIsClearing(true); // Show loader
    const newParams = new URLSearchParams(searchParams as any);
    newParams.delete('category');

    // Update state and URL together
    setParams('');
    router.replace(`?${newParams.toString()}`);

    // Remove loader after 500ms
    setTimeout(() => setIsClearing(false), 500);
  };

  return (
    <ul className={cn(className)}>
      <li
        className={`flex justify-between items-center transition ${
          className
            ? className
            : 'text-sm md:text-15px hover:bg-fill-base border-t border-border-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3'
        } text-brand-dark text-opacity-70`}
      >
        <button
          disabled={isClearDisabled}
          onClick={handleClearAll}
          type="button"
          className={cn(
            'flex items-center w-full ltr:text-left rtl:text-right outline-none focus:outline-none group focus:ring-0 focus:text-brand-dark py-2 px-4',
          )}
        >
          <div className="inline-flex shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto">
            <Image
              src="/assets/images/all-product.png"
              alt="clear all"
              width={40}
              height={40}
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
          <span className="text-brand-dark group-hover:text-opacity-80 capitalize ltr:pl-2.5 rtl:pr-2.5 md:ltr:pl-4 md:rtl:pr-4 2xl:ltr:pl-3 2xl:rtl:pr-3 3xl:ltr:pl-4 3xl:rtl:pr-4">
            {isClearing ? 'Clearing...' : 'All Products'}
          </span>
          <span className="ltr:ml-auto rtl:mr-auto"></span>
        </button>
      </li>
      {/* {Array.isArray(items) && items?.map((item: any, i: number) => (
        <SidebarMenuItem
          key={i}
          item={item}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />


      ))} */}

      {Array.isArray(items) && items.length > 0 ? (
        items.map((item: any, i: number) => (
          <SidebarMenuItem
            key={i}
            item={item}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        ))
      ) : (
        <p>No items available</p>
      )}
    </ul>
  );
}

export default SidebarMenu;
