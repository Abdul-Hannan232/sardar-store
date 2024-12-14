import Container from '@components/ui/container';
import PageHeroSection from '@components/ui/page-hero-section';
import DownloadApps from '@components/common/download-apps';
import { Metadata } from 'next';
import Accordion from '@components/ui/accordion';
import { faq } from '@settings/faq-settings';
import usefetchFaqs from './useFetchFaqs';

export const metadata: Metadata = {
  title: 'FAQ',
};

export default async function Page() {
  const { faqs, loading, error } = await usefetchFaqs();
  // console.log('faqsfaqsfaqs ', loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  interface Faqs {
    id: number;
    question: string;
    answer: string;
  }
  return (
    <>
      <PageHeroSection className="faq-banner-area" />
      {/* <PageHeroSection heroTitle="text-page-faq" className="faq-banner-area" /> */}
      <Container>
        <div className="flex flex-col max-w-2xl py-12 mx-auto 2xl:max-w-4xl md:py-20">
          {faqs?.map((item:Faqs, index:number) => (
            <Accordion
              key={`${item.id}-${index}`}
              item={item}
              translatorNS="faq"
            />
          ))}
        </div>
      </Container>
      <DownloadApps />
    </>
  );
}
