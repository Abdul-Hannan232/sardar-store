import Container from '@components/ui/container';
// import { refinedSixHeroBanner as heroBanner } from '@framework/static/banner';
import { Metadata } from 'next';
import DownloadAppsTwo from '@components/common/download-apps-two';
import HeroCarouselBlock from '@components/hero/hero-carousel-block';
import CategoryWithProduct from './category-with-products';
import Footer from '@layouts/footer/footer';
import Header from '@layouts/ancient/header';
import MobileNavigation from '@layouts/mobile-navigation/mobile-navigation';

 
export const metadata: Metadata = {
  title: 'SARDARBABA',
};

export default async function Page() {

  return (
    <>
    
      <Header />
      <Container className="mt-24">
        <HeroCarouselBlock  />
        {/* <HeroCarouselBlock heroBanner={heroBanner} /> */}
        <CategoryWithProduct />
      </Container>
      <DownloadAppsTwo />
      <Footer />
      <MobileNavigation />

    </>
  );
}
