// 'use client';

// import { useEffect, useState } from 'react';
// import Image from '@components/ui/image';
// import cn from 'classnames';
// import Link from '@components/ui/link';
// import http from '@framework/utils/http';

// const data = {
//   title: 'Make your online shop easier with our mobile app',
//   description:
//     'SARDAR_STORE makes online grocery shopping fast and easy. Get groceries delivered and order the best of seasonal farm fresh food.',
//   appImage: '/assets/images/app-thumbnail.png',
//   appButtons: [
//     {
//       id: 1,
//       slug: 'https://www.apple.com/app-store/',
//       altText: 'App Store',
//       appButton: '/assets/images/app-store.png',
//       buttonWidth: 170,
//       buttonHeight: 56,
//     },
//     {
//       id: 2,
//       slug: 'https://play.google.com/store/games',
//       altText: 'Play Store',
//       appButton: '/assets/images/play-store.png',
//       buttonWidth: 170,
//       buttonHeight: 56,
//     },
//   ],
// };

// interface Props {
//   className?: string;
// }

// const DownloadApps: React.FC<Props> =  ({ className = 'pt-1.5 md:pt-0' }) => {
//   const { appButtons, title, description, appImage } = data;
//   const [visibleBanner, setVisibleBanner] = useState({});

// // ////////////// getApp Promo Banners

// useEffect(() => {
//   const fetchBanners = async () => {
//     try {
//       const { data: { banners } } = await http.get(
//         `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/promo-banners`
//       );

//       const today = new Date();
//       const filtered = banners.filter((banner: any) =>
//         banner.isVisible && new Date(banner.endingDate) >= today
//       );

//       setVisibleBanner(filtered[0]);
//     } catch (error) {
//       console.error('Error fetching banners:', error);
//     }
//   };

//   fetchBanners();
// }, []);

//   return (
//     // <div className={cn('bg-fill-two overflow-hidden', className)}>
//     <div className={cn('bg-fill-two overflow-hidden bg-red-500', className)}>
//       <div className="max-w-[1920px] mx-auto px-4 sm:px-5 md:px-6 lg:px-16 xl:px-28 2xl:px-32 3xl:px-40 md:flex justify-between items-center">
//         <div className="shrink-0 mx-auto md:ltr:ml-0 md:rtl:mr-0 lg:flex lg:items-center pb-5 pt-1.5 md:pt-4 max-w-[350px] md:max-w-[340px] lg:max-w-[485px] xl:max-w-[540px] 2xl:max-w-[680px] 3xl:ltr:pl-10 3xl:rtl:pr-10">
//           <div className="py-8 text-center xl:py-10 2xl:py-14 md:ltr:text-left md:rtl:text-right">
//             <h2 className="text-[22px] md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[42px] leading-9 lg:leading-[1.4em] xl:leading-[1.45em] text-brand-dark font-bold font-manrope -tracking-[0.2px] mb-3 lg:mb-4">
//               {title}
//             </h2>
//             <p className="text-15px xl:text-base 2xl:text-[17px] leading-7 xl:leading-9 text-brand-dark text-opacity-70 pb-5 lg:pb-7 ltr:pr-0 rtl:pl-0 xl:ltr:pr-8 xl:rtl:pl-8 2xl:ltr:pr-20 2xl:rtl:pl-20">
//               {description}
//             </p>
//             <div className="flex justify-center md:justify-start -mx-1 md:-mx-1.5 pt-0.5 px-7 sm:px-0">
//               {appButtons?.map((item) => (
//                 <Link
//                   key={item.id}
//                   href={item.slug}
//                   className="inline-flex transition duration-200 ease-in hover:box-shadow hover:opacity-80 mx-1 md:mx-1.5"
//                 >
//                   <Image
//                     src={item.appButton}
//                     alt={item.altText}
//                     className="rounded-md w-36 lg:w-44"
//                     width={item.buttonWidth}
//                     height={item.buttonHeight}
//                     // style={{ width: 'auto' }}
//                     priority
//                   />
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="hidden md:flex items-end ltr:pl-4 rtl:pr-4 2xl:ltr:pl-0 2xl:rtl:pr-0 md:max-w-[480px] lg:max-w-[540px] xl:max-w-auto ltr:-mr-16 rtl:-ml-16 lg:ltr:-mr-8 lg:rtl:-ml-8 3xl:ltr:mr-24 3xl:rtl:ml-24">
//           <Image
//             src={appImage}
//             alt="App Thumbnail"
//             width={597}
//             height={500}
//             // style={{ width: 'auto' }}
//             priority
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DownloadApps;

'use client';

import { useEffect, useState } from 'react';
// import Image from '@components/ui/image';
import cn from 'classnames';
import Link from '@components/ui/link';
import http from '@framework/utils/http';
import Image from 'next/image';
import useWindowSize from '@utils/use-window-size';

const data = {
  title: 'Make your online shop easier with our mobile app',
  description:
    'SARDAR_STORE makes online grocery shopping fast and easy. Get groceries delivered and order the best of seasonal farm fresh food.',
  appImage: '/assets/images/app-thumbnail.png',
  appButtons: [
    {
      id: 1,
      slug: 'https://www.apple.com/app-store/',
      altText: 'App Store',
      appButton: '/assets/images/app-store.png',
      buttonWidth: 170,
      buttonHeight: 56,
    },
    {
      id: 2,
      slug: 'https://play.google.com/store/games/',
      altText: 'Play Store',
      appButton: '/assets/images/play-store.png',
      buttonWidth: 170,
      buttonHeight: 56,
    },
  ],
};

interface Props {
  className?: string;
}

const DownloadApps: React.FC<Props> =  ({ className = 'pt-1.5 md:pt-0' }) => {
  const { appButtons, title, description, appImage } = data;
  const [visibleBanner, setVisibleBanner] = useState<any>({});
  const { width } = useWindowSize();
// ////////////// getApp Promo Banners

useEffect(() => {
  const fetchBanners = async () => {
    try {
      const { data: { banners } } = await http.get(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/promo-banners`
      );

      const today = new Date();
      const filtered = banners.filter((banner: any) =>
        banner.isVisible && new Date(banner.endingDate) >= today
      );

      setVisibleBanner({...filtered[0] , image:"https://lihabackend.mayonity.com/upload/1743006728594$2y$10$BhoUXGMKvvUANn3UUugsyeBofDJ44UITRRmIkLjezq1wGVOz81yEi.jpeg" });
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  fetchBanners();
}, []);

console.log(visibleBanner.image);

  return (
    // <div className={cn('bg-fill-two overflow-hidden', className)}>
    <div className={cn('relative bg-fill-two overflow-hidden h-[400px] bg-red-300 bg-cover bg-center bg-no-repeat', className)}   style={{ backgroundImage: `url('${visibleBanner?.image}' || '/app-thumbnail.png'})` }}>
       
      <div className={`max-w-[1920px] mx-auto h-full  px-4 sm:px-5 md:px-6 lg:px-16 xl:px-28 2xl:px-32 3xl:px-40 md:flex justify-between items-center  `}  >
        <div className="shrink-0  mx-auto md:ltr:ml-0 md:rtl:mr-0 lg:flex lg:items-center pb-5 pt-1.5 md:pt-4 max-w-[350px] md:max-w-[340px] lg:max-w-[485px] xl:max-w-[540px] 2xl:max-w-[680px] 3xl:ltr:pl-10 3xl:rtl:pr-10">
          <div className="py-8 text-center xl:py-10 2xl:py-14 md:ltr:text-left md:rtl:text-right">
            {/* <h2 className="text-[22px] md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[42px] leading-9 lg:leading-[1.4em] xl:leading-[1.45em] text-brand-dark font-bold font-manrope -tracking-[0.2px] mb-3 lg:mb-4"> */}
            <h2 className="text-[22px] md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[42px] leading-9 lg:leading-[1.4em] xl:leading-[1.45em] text-transparent font-bold font-manrope -tracking-[0.2px] mb-3 lg:mb-4">
              {title}
            </h2>
            {/* <p className="text-15px xl:text-base 2xl:text-[17px] leading-7 xl:leading-9 text-brand-dark text-opacity-70 pb-5 lg:pb-7 ltr:pr-0 rtl:pl-0 xl:ltr:pr-8 xl:rtl:pl-8 2xl:ltr:pr-20 2xl:rtl:pl-20"> */}
            <p className="text-15px xl:text-base 2xl:text-[17px] leading-7 xl:leading-9 text-transparent text-opacity-70 pb-5 lg:pb-7 ltr:pr-0 rtl:pl-0 xl:ltr:pr-8 xl:rtl:pl-8 2xl:ltr:pr-20 2xl:rtl:pl-20">
              {description}
            </p>
            <div className="flex justify-center md:justify-start -mx-1 md:-mx-1.5 pt-0.5 px-7 sm:px-0">
              {/* {appButtons?.map((item) => ( */}
                <Link
                  key={visibleBanner.id}
                  href={visibleBanner?.app_store_url || ""}
                  className="inline-flex transition duration-200 ease-in hover:box-shadow hover:opacity-80 mx-1 md:mx-1.5"
                >
                  <Image
                    src='/assets/images/app-store.png'
                    alt={visibleBanner.title}
                    className="rounded-md w-36 lg:w-44"
                    width={170}
                    height={56}
                    // style={{ width: 'auto' }}
                    priority
                  />
                </Link>
              {/* ))} */}
            </div>
          </div>
        </div>
        {/* <div className="hidden md:flex items-end ltr:pl-4 rtl:pr-4 2xl:ltr:pl-0 2xl:rtl:pr-0 md:max-w-[480px] lg:max-w-[540px] xl:max-w-auto ltr:-mr-16 rtl:-ml-16 lg:ltr:-mr-8 lg:rtl:-ml-8 3xl:ltr:mr-24 3xl:rtl:ml-24"> */}
        <div className="hidden  items-end ltr:pl-4 rtl:pr-4 2xl:ltr:pl-0 2xl:rtl:pr-0 md:max-w-[480px] lg:max-w-[540px] xl:max-w-auto ltr:-mr-16 rtl:-ml-16 lg:ltr:-mr-8 lg:rtl:-ml-8 3xl:ltr:mr-24 3xl:rtl:ml-24">
          <Image
            src={appImage}
            alt="App Thumbnail"
            width={597}
            height={500}
            // style={{ width: 'auto' }}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default DownloadApps;

// 'use client';

// import { useEffect, useState } from 'react';
// // import Image from '@components/ui/image';
// import cn from 'classnames';
// import Link from '@components/ui/link';
// import http from '@framework/utils/http';
// import Image from 'next/image';
// import useWindowSize from '@utils/use-window-size';

// const data = {
//   title: 'Make your online shop easier with our mobile app',
//   description:
//     'SARDAR_STORE makes online grocery shopping fast and easy. Get groceries delivered and order the best of seasonal farm fresh food.',
//   appImage: '/assets/images/app-thumbnail.png',
//   appButtons: [
//     {
//       id: 1,
//       slug: 'https://www.apple.com/app-store/',
//       altText: 'App Store',
//       appButton: '/assets/images/app-store.png',
//       buttonWidth: 170,
//       buttonHeight: 56,
//     },
//     {
//       id: 2,
//       slug: 'https://play.google.com/store/games',
//       altText: 'Play Store',
//       appButton: '/assets/images/play-store.png',
//       buttonWidth: 170,
//       buttonHeight: 56,
//     },
//   ],
// };

// interface Props {
//   className?: string;
// }

// const DownloadApps: React.FC<Props> = ({ className = 'pt-1.5 md:pt-0' }) => {
//   const { appButtons, title, description, appImage } = data;
//   const [visibleBanner, setVisibleBanner] = useState<any>({});
//   const [bgImage, setBgImage] = useState<string | null>(null);

//   const { width } = useWindowSize();
//   // ////////////// getApp Promo Banners

//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         const {
//           data: { banners },
//         } = await http.get(
//           `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/promo-banners`,
//         );

//         const today = new Date();
//         const filtered = banners.filter(
//           (banner: any) =>
//             banner.isVisible && new Date(banner.endingDate) >= today,
//         );

//         setVisibleBanner(filtered[0]);
//       } catch (error) {
//         console.error('Error fetching banners:', error);
//       }
//     };

//     fetchBanners();
//   }, []);

//   console.log(visibleBanner.image);

//   useEffect(() => {
//     if (visibleBanner?.image) {
//       setBgImage(visibleBanner.image);
//     }
//   }, [visibleBanner]);
//   return (
//     <div
//       className={cn(
//         'relative bg-fill-two overflow-hidden h-[400px] ',
//         className,
//       )}
//     >
//       <Image
//         src={visibleBanner?.image || '/assets/images/page-hero-bg-mobile.png'}
//         alt="App Banner"
//         // fill
//         width={width as number < 480 ? 450 : 1840}
//         height={width as number < 780 ? 520 : 370}
//         quality={100}
//           priority
//          className={cn(`   object-cover object-center max-h-[${width as number < 480 ? 520 : 370}] w-[${width as number < 480 ? 450 : 1840}]`, {
//                    'rounded-md': true,
//                  })}
//       />
//     </div>
//   );
// };

// export default DownloadApps;
