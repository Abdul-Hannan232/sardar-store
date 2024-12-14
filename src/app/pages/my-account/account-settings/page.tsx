import AccountDetails from '@components/my-account/account-details';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account Settings',
};

export default async function AccountDetailsPage() {
  return <AccountDetails />;
}
