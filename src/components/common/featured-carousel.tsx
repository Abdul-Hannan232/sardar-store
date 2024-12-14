'use client';

import ChatIcon from '@components/icons/featured/chat-icon';
import FeedbackIcon from '@components/icons/featured/feedback-icon';
import CalendarIcon from '@components/icons/featured/calendar-icon';
import CouponIcon from '@components/icons/featured/coupon-icon';
import FeaturedCard from '@components/cards/featured-card-two';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import PromotionIcon from '@components/icons/featured/promotion-icon';

const data = [
  {
    id: 1,
    icon: (
      <CouponIcon
        color="#E9AD26"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'Digital Coupons',
    description: 'Save time & money, load before you go',
  },
  {
    id: 2,
    icon: (
      <CalendarIcon
        color="#E9AD26"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'Weekly Newsfeed',
    description: 'Browse our weekly newsfeed and add items to your cart',
  },
  {
    id: 3,
    icon: (
      <FeedbackIcon
        width="55px"
        height="55px"
        color="#E9AD26"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'Digital Spotlight',
    description: 'Find products easily & navigate store with the appn',
  },
  {
    id: 4,
    icon: (
      <PromotionIcon
        color="#E9AD26"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'Online Promotion',
    description: 'Select an online shopping store to see current offers.',
  },
  {
    id: 5,
    icon: (
      <ChatIcon
        color="#E9AD26"
        width="55px"
        height="55px"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'Support 24/7',
    description: 'Member Services is always here to help.',
  },
];

interface Props {
  className?: string;
}

const breakpoints = {
  '1400': {
    slidesPerView: 4,
    spaceBetween: 24,
  },
  '1024': {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  '768': {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  '640 ': {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  '0': {
    slidesPerView: 1,
  },
};

const FeatureCarousel: React.FC<Props> = ({
  className = 'mb-12 md:mb-14 xl:mb-[74px]',
}) => {
  return (
    <div className={`heightFull ${className}`}>
      <Carousel
        autoplay={false}
        breakpoints={breakpoints}
        prevActivateId="featured-carousel-button-prev"
        nextActivateId="featured-carousel-button-next"
      >
        {data?.map((item) => (
          <SwiperSlide key={`featured-key-${item.id}`}>
            <FeaturedCard item={item} />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
};

export default FeatureCarousel;
