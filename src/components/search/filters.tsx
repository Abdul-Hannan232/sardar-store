import { CategoryFilter } from './category-filter';
import { BrandFilter } from './brand-filter';
import SelectedFilters from './selected-filters';
import { DietaryFilter } from './dietary-filter';
import { useCategoriesQuery } from '@framework/category/get-all-categories';


export const ShopFilters = () => {
  const {
    data,
    isLoading,
    error,
  } = useCategoriesQuery({
    limit: 10,
  });


  return (
    <div className="space-y-10">
      <SelectedFilters/>
      <CategoryFilter  />
      {/* <CategoryFilter data={data} loading={isLoading} error={error} /> */}
      <DietaryFilter  />
      <BrandFilter />
    </div>
  );
};
