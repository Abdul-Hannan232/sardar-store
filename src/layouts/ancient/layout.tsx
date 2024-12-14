'use client';

import MobileNavigation from '@layouts/mobile-navigation/mobile-navigation';
import Header from '@layouts/ancient/header';

export default function AncientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main
        className="relative flex-grow pt-16 lg:pt-20"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </main>
      <MobileNavigation />
    </div>
  );
}
