import PageHeroSection from '@components/ui/page-hero-section';
import DownloadApps from '@components/common/download-apps';
import { Metadata } from 'next';
import TermsPageContent from './terms-page-content';

export const metadata: Metadata = {
  title: 'Terms',
};

export default async function Page() {
  return (
    <>
      <PageHeroSection />
      {/* <PageHeroSection heroTitle="text-page-terms-condition" /> */}
      <TermsPageContent />
      <DownloadApps />
    </>
  );
}
