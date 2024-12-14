'use client';

import ReferFriendsIcon from '@components/icons/featured/refer-friends-icon';
import DeliveryIcon from '@components/icons/featured/delivery-icon';
import ChatIcon from '@components/icons/featured/chat-icon';
import FeedbackIcon from '@components/icons/featured/feedback-icon';
import FeaturedCard from '@components/cards/featured-card';
import useWindowSize from '@utils/use-window-size';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import { ROUTES } from '@utils/routes';

const data = [
  {
    id: 1,
    icon: (
      <ReferFriendsIcon
        color="#F38E00"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'Refer friends & get 10% discount on all item.',
    href: ROUTES.SEARCH,
    bgColor: '#FFEED6',
  },
  {
    id: 2,
    icon: (
      <DeliveryIcon
        color="#0095E7"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'Fastest delivery system that we ever built.',
    href: ROUTES.SEARCH,
    bgColor: '#CCEDFF',
  },
  {
    id: 3,
    icon: (
      <ChatIcon
        color="#02B290"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'Join inner cycle to help us improve our system.',
    href: ROUTES.SEARCH,
    bgColor: '#D7F1EC',
  },
  {
    id: 4,
    icon: (
      <FeedbackIcon
        color="#FF7B7B"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: 'Share your feedback with others and get prize.',
    href: ROUTES.SEARCH,
    bgColor: '#FFE1E1',
  },
];

interface Props {
  className?: string;
}

const breakpoints = {
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

const FeatureGrid: React.FC<Props> = ({
  className = 'mb-12 md:mb-14 xl:mb-16',
}) => {
  const { width } = useWindowSize();
  return (
    <div className={`heightFull ${className}`}>
      {width! < 1536 ? (
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
      ) : (
        <div className="grid-cols-1 gap-5 2xl:grid sm:grid-cols-2 lg:grid-cols-4">
          {data?.map((item) => (
            <FeaturedCard item={item} key={`featured-key-${item.id}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeatureGrid;
