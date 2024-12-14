'use client';

import { useSessionStorage } from 'react-use';
import Image from '@components/ui/image';
import HighlightedBar from '@components/common/highlighted-bar';
import Countdown from '@components/common/countdown';
import Header from '@layouts/default/header';
import Footer from '@layouts/footer/footer';
import MobileNavigation from '@layouts/mobile-navigation/mobile-navigation';
// import { useTranslation } from 'src/app/i18n/client';
import { useIsMounted } from '@utils/use-is-mounted';

function ClientRenderedHighLightedBar() {
  // const { t } = useTranslation(lang, 'common');
  const [highlightedBar, setHighlightedBar] = useSessionStorage(
    'liha-highlightedBar',
    // 'borobazar-highlightedBar',
    'false',
  );
  return (
    <>
      {highlightedBar !== 'true' && (
        <HighlightedBar onClose={() => setHighlightedBar('true')}>
          <div className="flex items-center">
            <div className="hidden sm:flex shrink-0 items-center justify-center bg-brand-light w-9 h-9 rounded-full ltr:mr-2.5 rtl:ml-2.5">
              <Image
                width={23}
                height={23}
                src="/assets/images/delivery-box.svg"
                alt="Delivery Box"
                style={{ width: 'auto' }}
              />
            </div>
            <p
              // @ts-ignore
              dangerouslySetInnerHTML={{
                __html:
                  'Claim your online <strong>FREE Delivery or Shipping</strong> today! Expires in',
              }}
            />
          </div>
          <Countdown date={Date.now() + 4000000 * 71} />
        </HighlightedBar>
      )}
    </>
  );
}

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMounted = useIsMounted();

  return (
    <div className="flex flex-col min-h-screen">
      {isMounted && <ClientRenderedHighLightedBar />}
      {/* End of highlighted bar  */}

      <Header />
      <main
        className="relative flex-grow"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </main>
      <Footer />
      <MobileNavigation />
    </div>
  );
}
