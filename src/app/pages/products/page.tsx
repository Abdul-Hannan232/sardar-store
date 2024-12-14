import DownloadApps from '@components/common/download-apps';
import PageHeroSection from '@components/ui/page-hero-section';
import ProductsPageContent from './products-page-content';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Products',
};

export default async function Page() {
  function SearchBarFallback() {
    return <>Loading...</>;
  }

  return (
    <>
      <PageHeroSection />
      {/* <PageHeroSection heroTitle="text-all-grocery-items" /> */}
      <Suspense fallback={<SearchBarFallback />}>
        <ProductsPageContent />
      </Suspense>
      <DownloadApps />
    </>
  );
}
