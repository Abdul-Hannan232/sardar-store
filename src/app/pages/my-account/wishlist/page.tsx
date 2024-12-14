import Wishlist from '@components/my-account/wishlist';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wishlist',
};

export default async function WishlistPage() {
  return <Wishlist />;
}
