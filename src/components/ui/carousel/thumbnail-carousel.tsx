import {
  Swiper,
  SwiperSlide,
  SwiperOptions,
  Navigation,
  Thumbs,
} from '@components/ui/carousel/slider';
import Image from 'next/image';
// import Image from '@components/ui/image';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { productGalleryPlaceholder } from '@assets/placeholders';
import { getDirection } from '@utils/get-direction';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface Props {
  gallery: any[];
  thumbnailClassName?: string;
  galleryClassName?: string;
  // lang: string;
}

// product gallery breakpoints
const galleryCarouselBreakpoints = {
  '0': {
    slidesPerView: 4,
  },
};

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
};

const ThumbnailCarousel: React.FC<Props> = ({
  gallery,
  thumbnailClassName = 'xl:w-[480px] 2xl:w-[650px]',
  galleryClassName = 'xl:w-28 2xl:w-[130px]',
  // lang,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  // const dir = getDirection(lang);
  const dir = getDirection('rtl');
// console.log(gallery);

  return (
    <div className="w-full xl:flex xl:flex-row-reverse">
      <div
        className={cn(
          'w-full xl:ltr:ml-5 xl:rtl:mr-5 mb-2.5 md:mb-3 border border-border-base overflow-hidden rounded-md relative',
          thumbnailClassName,
        )}
      >
        <Swiper
          id="productGallery"
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Navigation, Thumbs]}
          navigation={{
            prevEl: prevRef.current!, // Assert non-null
            nextEl: nextRef.current!, // Assert non-null
          }}
          {...swiperParams}
        >
          {Array.isArray(gallery) && gallery?.map((item: any, i:number) => (
            <SwiperSlide
              key={`product-gallery-${i}`}
              className="flex items-center justify-center"
            >
              <Image
                // src={item?.original ?? productGalleryPlaceholder}
                src={item ?? productGalleryPlaceholder}
                alt={`Product gallery ${i}`}
                width={650}
                height={590}
                className="mx-auto rounded-lg"
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-between w-full absolute top-2/4 z-10 px-2.5">
          <div
            ref={prevRef}
            className="flex items-center justify-center text-base transition duration-300 transform -translate-y-1/2 rounded-full cursor-pointer w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 lg:text-lg xl:text-xl bg-brand-light hover:bg-brand hover:text-brand-light focus:outline-none shadow-navigation"
          >
            {dir === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
          </div>
          <div
            ref={nextRef}
            className="flex items-center justify-center text-base transition duration-300 transform -translate-y-1/2 rounded-full cursor-pointer w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 lg:text-lg xl:text-xl bg-brand-light hover:bg-brand hover:text-brand-light focus:outline-none shadow-navigation"
          >
            {dir === 'rtl' ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </div>
        </div>
      </div>
      {/* End of product main slider */}

      <div className={`shrink-0 ${galleryClassName}`}>
        <Swiper
          id="productGalleryThumbs"
          onSwiper={setThumbsSwiper}
          spaceBetween={0}
          watchSlidesProgress={true}
          freeMode={true}
          observer={true}
          observeParents={true}
          breakpoints={galleryCarouselBreakpoints}
        >
          {Array.isArray(gallery) && gallery.map((item: any, i:number) => (
            <SwiperSlide
            key={item.id ? `product-thumb-gallery-${item.id}` : `product-thumb-gallery-index-${i}`}
              className="flex items-center justify-center overflow-hidden transition border rounded cursor-pointer border-border-base hover:opacity-75"
            >
              <Image
                // src={item?.thumbnail ?? productGalleryPlaceholder}
                src={`${item}` || productGalleryPlaceholder}
                alt={`Product thumb gallery ${item}`}
                width={170}
                height={170}
                unoptimized
                style={{ width: 'auto' }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
