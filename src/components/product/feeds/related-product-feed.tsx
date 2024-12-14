'use client';

import ProductsCarousel from '@components/product/products-carousel';
import { useProductQuery } from '@framework/product/get-product';
import { useRelatedProductsQuery } from '@framework/product/get-related-product';
import { LIMITS } from '@framework/utils/limits';
import { useParams } from 'next/navigation';


interface RelatedProductsProps {
  carouselBreakpoint?: {} | any;
  className?: string;
  uniqueKey?: number;
  // uniqueKey?: string;
}

const RelatedProductFeed: React.FC<RelatedProductsProps> = ({
  carouselBreakpoint,
  className,
  uniqueKey ,
  // uniqueKey = 'related-product-popup',
}) => {
  const pathname = useParams();
  const { slug } = pathname;

  
  const {  data: productData, isLoading:isProductLoading } = useProductQuery(slug as string);
  // console.log('data>>>>>>>>>>>>>> ', typeof productData?.id);

  // console.log(data?.category_id);
  

  const {  data: relatedProductsData, isLoading, error } = useRelatedProductsQuery({
    limit: LIMITS.RELATED_PRODUCTS_LIMITS,
    categoryId: uniqueKey ? uniqueKey as number :  productData?.category_id as number
  });

  // console.log('related-product-popup-uniqueKey',relatedProductsData);
   
  return (
    <ProductsCarousel
      sectionHeading="Related Products"
      categorySlug="/pages/search"
      className={className}
      products={relatedProductsData}
      loading={isProductLoading}
      error={error?.message}
      limit={LIMITS.RELATED_PRODUCTS_LIMITS}
      uniqueKey={uniqueKey}
      carouselBreakpoint={carouselBreakpoint}
    />
  );
};

export default RelatedProductFeed;
