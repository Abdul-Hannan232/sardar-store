import Container from '@components/ui/container';
import { refinedSixHeroBanner as heroBanner } from '@framework/static/banner';
import { Metadata } from 'next';
import DownloadAppsTwo from '@components/common/download-apps-two';
import HeroCarouselBlock from '@components/hero/hero-carousel-block';
import CategoryWithProduct from './category-with-products';
import Footer from '@layouts/footer/footer';
import Header from '@layouts/ancient/header';
import MobileNavigation from '@layouts/mobile-navigation/mobile-navigation';
import http from '@framework/utils/http';

 
export const metadata: Metadata = {
  title: 'SARDARBABA',
};

export default async function Page() {
  // const { data:{banners} } = await http.get(
  //   `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/banners`,
  // );

  // const today = new Date(); 
  // const visibleBanners = banners.filter((banner:any) => banner.isVisible && new Date(banner.endingDate) >= today);


  // let banners = [];

  // try {
  //   const res = await http.get(
  //     `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/banners`
  //   );
  //   const today = new Date();
  //   banners = res.data.banners.filter(
  //     (banner: any) =>
  //       banner.isVisible && new Date(banner.endingDate) >= today
  //   );
  // } catch (error) {
  //   console.error("Failed to fetch banners", error);
  //   banners = [];
  // }
// console.log("banners >>>> ",banners);
// console.log("visibleBanners >>>> ",visibleBanners);

  return (
    <>
    
      <Header />
      <Container className="mt-24">
        {/* <HeroCarouselBlock heroBanner={visibleBanners} /> */}
        <HeroCarouselBlock  />
        {/* <HeroCarouselBlock heroBanner={banners} /> 
        {/* <HeroCarouselBlock heroBanner={heroBanner} /> */}
        <CategoryWithProduct />
      </Container>
      <DownloadAppsTwo />
      <Footer />
      <MobileNavigation />

    </>
  );
}
