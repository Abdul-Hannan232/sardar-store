// import Heading from '@components/ui/heading';
// import CategoryFilterMenu from '@components/search/category-filter-menu';
// import Alert from '@components/ui/alert';
// import Scrollbar from '@components/ui/scrollbar';
// import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
// import { useCategoriesQuery } from '@framework/category/get-all-categories';

// export const CategoryFilter = () => {
//   const {
//     data,
//     isLoading: loading,
//     error,
//   } = useCategoriesQuery({
//     limit: 10,
//   });

//   if (loading) {
//     return (
//       <div className="hidden xl:block">
//         <div className="px-2 mt-8 w-72">
//           <CategoryListCardLoader uniqueKey="category-list-card-loader" />
//         </div>
//       </div>
//     );
//   }
//   if (error) return <Alert message={error.message} />;
// // console.log('data?.categories?.data,', data?.categories?.data);

//   return (
//     <div className="block">
//       {/* <Heading  className="mb-5 -mt-1">Categories</Heading> */}
//       <div className="max-h-full overflow-hidden border rounded border-border-base">
//         <Scrollbar className="w-full category-filter-scrollbar">
//           {data?.categories?.data?.length ? (
//             <CategoryFilterMenu items={data?.categories?.data} />
//           ) : (
//             <div className="min-h-full pt-6 pb-8 px-9 lg:p-8">
//               No results found
//             </div>
//           )}
//         </Scrollbar>
//       </div>
//     </div>
//   );
// };




'use client';

import Heading from '@components/ui/heading';
import CategoryFilterMenu from '@components/search/category-filter-menu';
import Alert from '@components/ui/alert';
import Scrollbar from '@components/ui/scrollbar';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import { useCategoriesQuery } from '@framework/category/get-all-categories';
import { useEffect, useState } from 'react';

export const CategoryFilter = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    limit: 10,
  });

  // Ensure consistent rendering during hydration
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="hidden xl:block"><CategoryListCardLoader uniqueKey="category-list-card-loader" /></div>;
  }

  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="px-2 mt-8 w-72">
          <CategoryListCardLoader uniqueKey="category-list-card-loader" />
        </div>
      </div>
    );
  }

  if (error) return <Alert message={error.message} />;

  return (
    <div className="block">
      <div className="max-h-full overflow-hidden border rounded border-border-base">
        <Scrollbar className="w-full category-filter-scrollbar">
          {data?.categories?.data?.length ? (
            <CategoryFilterMenu items={data?.categories?.data} />
          ) : (
            <div className="min-h-full pt-6 pb-8 px-9 lg:p-8">
              No results found
            </div>
          )}
        </Scrollbar>
      </div>
    </div>
  );
};
