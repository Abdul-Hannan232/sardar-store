import Legal from '@components/my-account/notice';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notice',
};

export default async function LegalNotice() {
  return <Legal />;
}
