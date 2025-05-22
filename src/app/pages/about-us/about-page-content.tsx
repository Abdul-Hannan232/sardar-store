'use client';

// import { useTranslation } from 'src/app/i18n/client';
import Image from '@components/ui/image';
import Container from '@components/ui/container';
import { aboutSetting } from '@settings/about-setting';
import aboutUs1 from '@public/assets/images/about/About-Us-Banner-1.png';
import aboutUs2 from '@public/assets/images/about/About-Us-Banner-2.png';
import aboutUs3 from '@public/assets/images/about/Who-We-Are-Banner-1.png';
import aboutUs4 from '@public/assets/images/about/Who-We-Are-Banner-2.png';
import aboutUs5 from '@public/assets/images/about/Who-We-Are-Banner-3.png';
import aboutUs6 from '@public/assets/images/about/Bottom-Banner.png';

// const backgroundThumbnail = '/assets/images/about-us.png';
const backgroundThumbnail = '/assets/images/Top-Banner.png';

export default function AboutPageContent() {
  return (
    <>
      <div
        className="flex justify-center h-[250px] lg:h-96 2xl:h-[500px] w-full bg-cover bg-no-repeat bg-center relative"
        style={{
          // backgroundImage: `url(${backgroundThumbnail})`,
          position:"relative"
        }}
      />
      <img alt="about-us-banner" className='h-[250px] lg:h-96 2xl:h-[500px]' style={{position:"absolute", top:"0", left:"0", right:"0", bottom:"0"}} src={backgroundThumbnail}  />
      <div className="py-8 lg:py-16 2xl:py-20">
        <Container>
          <div className="flex flex-col w-full mx-auto max-w-[1200px]">
            <h2 className="text-lg md:text-xl lg:text-[24px] text-brand-dark font-semibold mb-4 lg:mb-7">
              {
                // @ts-ignore
                aboutSetting?.titleOne
              }
            </h2>
            <div
              className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose"
              dangerouslySetInnerHTML={{
                // @ts-ignore
                __html: aboutSetting.descriptionOne,
              }}
            />

            <div className="grid grid-cols-2 gap-4 my-8 lg:my-14">
              <Image src={aboutUs1} alt="about" className="ltr:mr-5 rtl:ml-5" />
              <Image
                src={aboutUs2}
                alt="about"
                // alt={t('text-map')}
                className=""
              />
            </div>
             <h2 className="text-lg md:text-xl lg:text-[24px] text-brand-dark font-semibold mb-4 lg:mb-7">
              {
                // @ts-ignore
                aboutSetting?.titleTwo
              }
            </h2>
            <div
              className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose"
              dangerouslySetInnerHTML={{
                // @ts-ignore
                __html: aboutSetting.descriptionTwo,
              }}
            />
            <div className="flex flex-col grid-cols-3 gap-4 my-8 lg:my-14 sm:grid">
              <Image src={aboutUs3} alt="about" className="ltr:mr-4 rtl:ml-4" />
              <Image src={aboutUs4} alt="about" className="ltr:mr-4 rtl:ml-4" />
              <Image src={aboutUs5} alt="about" className="" />
            </div>
             <h2 className="text-lg md:text-xl lg:text-[24px] text-brand-dark font-semibold mb-4 lg:mb-7">
              {
                // @ts-ignore
                aboutSetting?.titleThree
              }
            </h2>
            <div
              className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose"
              dangerouslySetInnerHTML={{
                // @ts-ignore
                __html: aboutSetting.descriptionThree,
              }}
            />
            <div className="flex mt-8 mb-6 lg:mt-14 lg:mb-10">
              <Image src={aboutUs6} alt="about" className="ltr:mr-4 rtl:ml-4" />
            </div>
            <h2 className="text-lg md:text-xl lg:text-[24px] text-brand-dark font-semibold mb-4 lg:mb-7">
              {
                // @ts-ignore
                aboutSetting.titleFour
              }
            </h2>
            <div
              className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose"
              dangerouslySetInnerHTML={{
                // @ts-ignore
                __html: aboutSetting.descriptionFour,
              }}
            />
            <p className="text-brand-dark font-medium text-base lg:text-lg leading-7 2xl:text-[20px] lg:leading-loose lg:mt-4 mb-3.5">
              {aboutSetting.titleFive} &nbsp;
              {/* <a href="mailto:press@borobazar.com">press@sardar.store.com</a>. */}
            </p>
            <div
              className="text-sm leading-7 text-brand-dark opacity-70 lg:text-15px lg:leading-loose"
              dangerouslySetInnerHTML={{
                // @ts-ignore
                __html: aboutSetting.descriptionFive,
              }}
            />
          </div>
        </Container>
      </div>
    </>
  );
}
