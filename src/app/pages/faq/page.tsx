
import { Metadata } from 'next';
import { Suspense } from 'react';
import FaqPageContent  from './FaqPageContent';

export const metadata: Metadata = {
  title: 'FAQ',
};

export default async function Page() {
  function SearchBarFallback() {
    return <>Loading...</>;
  }
  return (
    <>
      <Suspense fallback={<SearchBarFallback />}>
        <FaqPageContent />
      </Suspense>
    </>
  );
}



