// 'use client';

// import CategoryDropdownSidebar from '@components/category/category-dropdown-sidebar';
// import RefinedSidebar from '@components/common/refined-sidebar';
// import RefinedAllProductFeed from '@components/product/feeds/refined-all-products-feed';
// import { createContext, useState } from 'react';
// import { Element } from 'react-scroll';


// const categoryContext= createContext("")
// export default function CategoryWithProduct() {
// const [params,setParams] = useState<string>("")

// // console.log(">>>>>>>>>> params ", params);
  
//   return (
//     //@ts-ignore
//     <categoryContext.Provider value={{params, setParams}}>
//     <Element name="grid" className="flex flex-col mb-16 md:flex-row">
//       {/* <CategoryDropdownSidebar setParams={setParams} className="shrink-0 ltr:pr-8 rtl:pl-8 xl:ltr:pr-10 xl:rtl:pl-10 hidden xl:block w-[350px] 2xl:w-96 lg:sticky lg:top-24" /> */}
//       <CategoryDropdownSidebar   className="shrink-0 ltr:pr-8 rtl:pl-8 xl:ltr:pr-10 xl:rtl:pl-10 hidden xl:block w-[350px] 2xl:w-96 lg:sticky lg:top-24" />
//       <RefinedAllProductFeed className="w-full xl:ltr:-ml-3 xl:rtl:-mr-3 3xl:ltr:-ml-1 3xl:rtl:-mr-1 3xl:ltr:pr-2 3xl:rtl:pl-2" />
//       {/* <RefinedSidebar className="w-full md:w-[300px] lg:w-[350px] mt-10 md:mt-0 md:sticky md:top-20 lg:top-24" /> */}
//     </Element>
//     </categoryContext.Provider>
//   );
// }



'use client';

import CategoryDropdownSidebar from '@components/category/category-dropdown-sidebar';
import RefinedSidebar from '@components/common/refined-sidebar';
import RefinedAllProductFeed from '@components/product/feeds/refined-all-products-feed';
import { useSearchParams } from 'next/navigation';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Element } from 'react-scroll';

// Define the context type
interface CategoryContextType {
  params: string;
  setParams: (value: string) => void;
}

// Create the context with a default value
const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

// Custom hook for using context
export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategoryContext must be used within a CategoryContextProvider');
  }
  return context;
};

// Provider Component
export const CategoryContextProvider = ({ children }: { children: ReactNode }) => {
  const [params, setParams] = useState<string>('');
  
    // console.log(">>>>>",item);
    
    
  //  useEffect(()=>{
  //    if (!params) {
  //     // Remove category from query params if already selected
  //     newParams.delete('category');
  //     setParams("");
  //   } 
  //  },[params])


  return (
    <CategoryContext.Provider value={{ params, setParams }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Main Component
export default function CategoryWithProduct() {
  return (
    // <CategoryContextProvider>
      <Element name="grid" className="flex flex-col mb-16 md:flex-row">
        <CategoryDropdownSidebar className="shrink-0 ltr:pr-8 rtl:pl-8 xl:ltr:pr-10 xl:rtl:pl-10 hidden xl:block w-[350px] 2xl:w-96 lg:sticky lg:top-24" />
        <RefinedAllProductFeed className="w-full xl:ltr:-ml-3 xl:rtl:-mr-3 3xl:ltr:-ml-1 3xl:rtl:-mr-1 3xl:ltr:pr-2 3xl:rtl:pl-2" />
      </Element>
    // </CategoryContextProvider>
  );
}
