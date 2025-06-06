import React, { Suspense, useState } from 'react';
import Container from '@components/ui/container';
import ProductSingleDetails from '@components/product/product';
import DownloadApps from '@components/common/download-apps';
import PopcornJerkyProductFeed from '@components/product/feeds/popcorn-jerky-product-feed';
import RelatedProductFeed from '@components/product/feeds/related-product-feed';
import Breadcrumb from '@components/ui/breadcrumb';
import Divider from '@components/ui/divider';

export default async function Page() {
  // const [id, setId] = useState<number>();

  // const getCategoryId =(category_id:number)=>{
  //   console.log(category_id);
  //   // setId(category_id)

  // }

  // http://localhost:3000/pages/products/ludo%20board    serch product detail
  {
    /* <ProductSingleDetails  getCid={getCategoryId}/> */
  }

  return (
    <>
      <Divider />
      <div className="pt-6 lg:pt-7">
        <Container>
          {/* <Breadcrumb /> */}
          {/* <Suspense fallback={<div>Loading...</div>}> */}
          <ProductSingleDetails />
          {/* </Suspense> */}
        </Container>
      </div>

      {/* <RelatedProductFeed uniqueKey="related-products" /> */}
      <RelatedProductFeed />
      {/* <RelatedProductFeed uniqueKey={slug} /> */}
      {/* <PopcornJerkyProductFeed /> */}
      <DownloadApps />
    </>
  );
}
