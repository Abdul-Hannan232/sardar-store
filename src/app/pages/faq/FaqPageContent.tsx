'use client';

import { useEffect, useState } from 'react';
import Container from '@components/ui/container';
import PageHeroSection from '@components/ui/page-hero-section';
import DownloadApps from '@components/common/download-apps';
import Accordion from '@components/ui/accordion';
import axios from 'axios';

interface Faqs {
  id: number;
  question: string;
  answer: string;
}

const FaqPageContent = () => {
  const [faqs, setFaqs] = useState<Faqs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/faqs/all`);
        setFaqs(res.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch FAQs');
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <PageHeroSection title='Frequently Ask Question' className="faq-banner-area" />
      <Container>
        <div className="flex flex-col max-w-2xl py-12 mx-auto 2xl:max-w-4xl md:py-20">
          {faqs.map((item) => (
            <Accordion key={item.id} item={item} translatorNS="faq" />
          ))}
        </div>
      </Container>
      <DownloadApps />
    </>
  );
};

export default FaqPageContent;
