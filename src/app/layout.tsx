import ManagedModal from '@components/common/modal/managed-modal';
import { ManagedUIContext } from '@contexts/ui.context';
import { Inter, Manrope } from 'next/font/google';
import { dir } from 'i18next';
// import { languages } from '../i18n/settings';
import ManagedDrawer from '@components/common/drawer/managed-drawer';
import { Metadata } from 'next';
import ToasterProvider from 'src/app/provider/toaster-provider';
import Providers from 'src/app/provider/provider';
import { UserProvider } from '@contexts/user/userProvider';

// import  "./[lang]/globals.css"
import './globals.css';
import AntiqueRefinedLayout from '@layouts/antique-refined/layout';

// external
import 'react-toastify/dist/ReactToastify.css';

// base css file
import '@assets/css/scrollbar.css';
import '@assets/css/swiper-carousel.css';
import '@assets/css/custom-plugins.css';
import '@assets/css/rc-drawer.css';
import CustomerCare from '@components/common/customer-care/customerCare';
import { CategoryContextProvider } from './category-with-products';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const manrope = Manrope({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: {
    template: 'SARDARBABA | %s',
    default: 'SARDARBABA',
  },
};

// export async function generateStaticParams() {
//   return languages.map((lang) => ({ lang }));
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <>
      <html dir={dir('en')}>
           <head>
        {/* Load the Facebook SDK */}
        <script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.fbAsyncInit = function() {
                FB.init({
                  appId: '${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}',
                  autoLogAppEvents: true,
                  xfbml: true,
                  version: 'v12.0' // Use the latest version here
                });
              };
            `,
          }}
        />
      </head>
        <body className={`${inter.variable} ${manrope.variable}`}>
          <Providers>
            <UserProvider>
              <CategoryContextProvider>
            <ManagedUIContext>
              {/* <AntiqueRefinedLayout> */}
            
              {children}
              <CustomerCare />
              {/* </ AntiqueRefinedLayout > */}
              <ManagedModal />
              <ManagedDrawer />
              <ToasterProvider />
            </ManagedUIContext>
            </CategoryContextProvider>
            </UserProvider>
          </Providers>

          <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
        </body>
      </html>
    </>
  );
}
