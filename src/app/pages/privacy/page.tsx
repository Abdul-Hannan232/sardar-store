import PageHeroSection from '@components/ui/page-hero-section';
import DownloadApps from '@components/common/download-apps';
import PrivacyPageContent from './privacy-page-content';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy',
};

export default async function Page() {
  return (
    <>
      <PageHeroSection />
      {/* <PageHeroSection heroTitle="text-page-privacy-policy" /> */}
      <PrivacyPageContent />
      <DownloadApps />
    </>
  );
}
