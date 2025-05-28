'use client';

import Link from '@components/ui/link';
import Image from 'next/image';
import useWindowSize from '@utils/use-window-size';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';

interface BannerProps {
  banner: any;
  variant?: 'rounded' | 'default';
  effectActive?: boolean;
  className?: string;
  classNameInner?: string;
}

function getImage(deviceWidth: number, imgObj: any) {
  // return deviceWidth < 480 ? imgObj.mobile : imgObj.desktop;
  return deviceWidth < 480
    ? {
        url: imgObj,
        width: 450,
        // height: 520,
        height: 520,
      }
    : {
        url: imgObj,
        width: 1840,
        height: 370,
      };
}

const BannerCard: React.FC<BannerProps> = ({
  banner,
  className,
  variant = 'default',
  effectActive = true,
  classNameInner,
}) => {
  const { width } = useWindowSize();
  const { title, image, smImage } = banner;
  const selectedImage = getImage(width!, image);
  const selectedSmImage = getImage(width!, smImage);
  return (
    <div className={cn('mx-auto', className)}>
      <Link
        href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${ROUTES.PRODUCT}/${banner?.product?.title}`}
        // href={`/pages/search`}
        className={cn(
          ' h-full group flex justify-center relative overflow-hidden',
          classNameInner,
        )}
      >
        <Image
          // src={selectedImage.url}
          src={
            width && width <= 768
              ? selectedSmImage.url || selectedImage.url
              : selectedImage.url || '/assets/images/page-hero-bg-mobile.png'
          }
          width={selectedImage.width}
          height={selectedImage.height}
          // alt={title}
          alt={banner?.alt}
          quality={100}
          priority
          // className={cn(' bg-fill-thumbnail object-cover max-h-[280px] w-full', {
          className={cn(
            // ' bg-fill-thumbnail object-cover object-center max-h-[250px] w-full',
            ' bg-fill-thumbnail object-cover object-center  max-h-[442px] md:max-h-[250px] w-full',
            {
              'rounded-md': variant === 'rounded',
            },
          )}
        />
        {effectActive && (
          <div className="absolute top-0 block w-1/2 h-full transform -skew-x-12 ltr:-left-full rtl:-right-full z-5 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine" />
        )}
      </Link>
    </div>
  );
};

export default BannerCard;
