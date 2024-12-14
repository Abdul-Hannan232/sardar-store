import { GetServerSideProps } from 'next';
import ShopsSingleDetails from '@components/shops/shops-single-details';
import DownloadApps from '@components/common/download-apps';

export default async function ShopDetailsPage() {
  return (
    <>
      <ShopsSingleDetails />
      <DownloadApps />
    </>
  );
}
