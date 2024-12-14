// import Link from '@components/ui/link';
// import { FaChevronDown } from 'react-icons/fa';
// import ListMenu from '@components/ui/list-menu';
// import cn from 'classnames';

// interface MenuProps {
//   data: any;
//   className?: string;
// }

// const HeaderMenu: React.FC<MenuProps> = ({ data, className }) => {
//   const  site_header= {
//     pagesMenu: [
//       {
//         id: 1,
//         path: '/',
//         label: 'Home',
//       },
//       {
//         id: 2,
//         path: '/pages/search',
//         label: 'Categories',
//         subMenu: [
//           {
//             id: 1,
//             path: '/pages/search',
//             label: 'Fresh Vegetables',
//           },
//           {
//             id: 2,
//             path: '/pages/search',
//             label: 'Diet Nutrition',
//           },
//           {
//             id: 3,
//             path: '/pages/search',
//             label: 'Healthy Foods',
//           },
//           {
//             id: 4,
//             path: '/pages/search',
//             label: 'Grocery Items',
//           },
//           {
//             id: 5,
//             path: '/pages/search',
//             label: 'Beaf Steak',
//           },
//         ],
//       },
//       {
//         id: 4,
//         path: '/pages/search',
//         label: 'Search',
//       },

//       {
//         id: 4,
//         path: '/pages/my-account/account-settings',
//         label: 'My Account',
//       },

//     ],
//   }
//   console.log('site_header ', site_header);

//   console.log('Header ---', data)
//   return (
//     <nav
//       className={cn(
//         'headerMenu flex w-full relative -mx-3 xl:-mx-4',
//         className,
//       )}
//     >

//       {data?.map((item: any, index: number) => (
//         <div
//           className="relative py-3 mx-3 cursor-pointer menuItem group xl:mx-4"
//           key={item.id + index}
//         >
//           <Link
//             href={`${item.path}`}
//             className="relative inline-flex items-center py-2 text-sm font-normal lg:text-15px text-brand-dark group-hover:text-brand before:absolute before:w-0 before:ltr:right-0 rtl:left-0 before:bg-brand before:h-[3px] before:transition-all before:duration-300 before:-bottom-[14px] group-hover:before:w-full ltr:group-hover:before:left-0 rtl:group-hover:before:right-0 lrt:group-hover:before:right-auto rtl:group-hover:before:left-auto"
//           >
//             {item.label}
//             {(item?.columns || item.subMenu) && (
//               <span className="text-xs mt-1 xl:mt-0.5 w-4 flex justify-end text-brand-dark opacity-40 group-hover:text-brand">
//                 <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
//               </span>
//             )}
//           </Link>

//           {item?.subMenu && Array.isArray(item?.subMenu) && (
//             <div className="absolute z-30 opacity-0 subMenu shadow-dropDown transition-all duration-300 invisible bg-brand-light ltr:left-0 rtl:right-0 w-[220px] xl:w-[240px] group-hover:opacity-100">
//               <ul className="py-5 text-sm text-brand-muted">
//                 {item.subMenu.map((menu: any, index: number) => {
//                   const dept: number = 1;
//                   const menuName: string = `sidebar-menu-${dept}-${index}`;
//                   return (
//                     <ListMenu
//                       dept={dept}
//                       data={menu}
//                       hasSubMenu={menu.subMenu}
//                       menuName={menuName}
//                       // key={menuName}
//                       key={index}
//                       menuIndex={index}
//                     />
//                   );
//                 })}
//               </ul>
//             </div>
//           )}
//         </div>
//       ))}
//     </nav>
//   );
// };

// export default HeaderMenu;

import Link from '@components/ui/link';
import { FaChevronDown } from 'react-icons/fa';
import ListMenu from '@components/ui/list-menu';
import cn from 'classnames';
import { useCategoriesQuery } from '@framework/category/get-all-categories';

interface MenuProps {
  data: any;
  className?: string;
}

const HeaderMenu: React.FC<MenuProps> = ({ className }) => {
  const {
    data: categories,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    limit: 10,
  });

  // console.log('category ', categories?.categories.data);

  const data = [
    {
      id: 1,
      path: '/',
      label: 'Home',
    },
    // {
    //   id: 6,
    //   path: '/pages/my-account/account-settings',
    //   label: 'Categories',
    //   subMenu: categories?.categories?.data
    // },
    // {
    //   id: 4,
    //   path: '/pages/search',
    //   label: 'Search',
    // },

    {
      id: 5,
      path: '/pages/my-account/account-settings',
      label: 'My Account',
    },
    {
      id: 6,
      path: '/pages/faq',
      label: 'Faq',
    },
   
  ];
  // console.log('site_header ', site_header);

  // console.log('Header ---', data)
  return (
    <nav
      className={cn(
        'headerMenu flex w-full relative -mx-3 xl:-mx-4',
        className,
      )}
    >
      {data?.map((item: any, index: number) => (
        <div
          className="relative py-3 mx-3 cursor-pointer menuItem group xl:mx-4"
          key={item.id + index}
        >
          <Link
            href={`${item.path}`}
            className="relative inline-flex items-center py-2 text-sm font-normal lg:text-15px text-brand-dark group-hover:text-brand before:absolute before:w-0 before:ltr:right-0 rtl:left-0 before:bg-brand before:h-[3px] before:transition-all before:duration-300 before:-bottom-[14px] group-hover:before:w-full ltr:group-hover:before:left-0 rtl:group-hover:before:right-0 lrt:group-hover:before:right-auto rtl:group-hover:before:left-auto"
          >
            {item.label}
            {(item?.columns || item.subMenu) && (
              <span className="text-xs mt-1 xl:mt-0.5 w-4 flex justify-end text-brand-dark opacity-40 group-hover:text-brand">
                <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
              </span>
            )}
          </Link>

           
      {item?.label === 'Categories' && Array.isArray(categories?.categories?.data) && (
            // <div className={`absolute z-30 opacity-0 subMenu shadow-dropDown transition-all duration-300 invisible bg-brand-light ltr:left-0 rtl:right-0 w-[220px] xl:w-[240px] group-hover:opacity-100`}>
            <div className={`absolute z-30 opacity-0 subMenu shadow-dropDown transition-all duration-300 invisible bg-brand-light ltr:left-0 rtl:right-0 w-[220px] xl:w-[240px] group-hover:opacity-100`}>
              <ul className="py-5 text-sm text-brand-muted">
                {categories?.categories.data.map((menu: any, index: number) => {
                  // {console.log(menu);
                  // }
                  const dept: number = 1;
                  const menuName: string = `sidebar-menu-${dept}-${index}`;
                  return (
                    <ListMenu
                      dept={dept}
                      data={menu}
                      hasSubMenu={menu.children ? true:false}
                      menuName={menuName}
                      // key={menuName}
                      key={index}
                      menuIndex={index}
                    />
                  );
                })}
              </ul>
            </div>
          )}

        </div>
      ))}

      {/* <Link
        href={`/pages/search`}
        className="relative inline-flex items-center py-2 text-sm font-normal lg:text-15px text-brand-dark group-hover:text-brand before:absolute before:w-0 before:ltr:right-0 rtl:left-0 before:bg-brand before:h-[3px] before:transition-all before:duration-300 before:-bottom-[14px] group-hover:before:w-full ltr:group-hover:before:left-0 rtl:group-hover:before:right-0 lrt:group-hover:before:right-auto rtl:group-hover:before:left-auto"
      >
        Categories
        <span className="text-xs mt-1 xl:mt-0.5 w-4 flex justify-end text-brand-dark opacity-40 group-hover:text-brand">
          <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
        </span>
      </Link>

      */}
    </nav>
  );
};

export default HeaderMenu;
