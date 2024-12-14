import DownloadApps from '@components/common/download-apps';
import { Metadata } from 'next';
import AboutPageContent from './about-page-content';

export const metadata: Metadata = {
  title: 'About Us',
};

export default async function Page() {
  return (
    <>
      <AboutPageContent />
      <DownloadApps />
    </>
  );
}
