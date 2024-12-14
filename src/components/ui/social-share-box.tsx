import { useState, useEffect } from 'react';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import Input from '@components/ui/form/input';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaInstagram } from 'react-icons/fa';
// import Share from '@components/share';

import {
  FacebookShareButton,
  WhatsappShareButton,
  InstapaperShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  InstapaperIcon,
  TwitterIcon,
} from 'react-share';

interface Props {
  className?: string;
  shareUrl?: string;
}
interface NewsLetterFormValues {
  shareLink: string;
}
const defaultValues = {
  shareLink: '',
};
// import FacebookShareButton from '@components/FacebookShareButton';
const SocialShareBox: React.FC<Props> = ({ className = '', shareUrl = '' }) => {
  const [copyText, setCopyText] = useState({
    value: shareUrl,
    // value: 'https://www.daraz.pk/products/m10-tws-wireless-headphones-earbuds-touch-control-bluetooth-compatible-51-50-earphones-wireless-headset-waterproof-9d-hifi-quality-earbuds-led-display-wireless-earphone-with-charging-box-sound-like-f9-m90-n35-best-for-gaming-pubg-gym-airdots-i410242158-s2334381235.html?spm=a2a0e.home.flashSale.3.35e34076f6MVSN',
    copied: false,
  });
  const shareToInstagram = () => {
    const instagramUrl = `https://www.instagram.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(instagramUrl, '_blank');
  };

  const { register } = useForm<NewsLetterFormValues>({
    defaultValues,
  });
  useEffect(() => {
    if (copyText.copied) {
      setTimeout(() => {
        setCopyText({
          ...copyText,
          copied: false,
        });
      }, 1500);
    }
  }, [copyText]);
  return (
    <div
      className={cn(
        'shadow-card bg-brand-light rounded-md p-4 md:p-6 lg:p-7',
        className,
      )}
    >
      <Heading className="mb-2">Share in social network</Heading>
      <Text variant="small">
        To reach the highest traffic view share this product
      </Text>
      <div className="flex flex-wrap items-center mb-4 -mx-1">
        <FacebookShareButton  url={`https://www.daraz.pk/products/-i520305005-s2461621046.html?spm=a2a0e.searchlistcategory.sku.2.477c6539d3Oetm&search=1`}  >
        {/* <Share description = "Check out this awesome product!" /> */}

          <FacebookIcon
            size={40}
            round={true}
            className="transition-all hover:opacity-90"
          />
        </FacebookShareButton>

        <button
          onClick={shareToInstagram}
          className="mx-1 transition-all hover:opacity-90"
        >
          <FaInstagram size={40} />
        </button>
        {/* <TwitterShareButton url={shareUrl} className="mx-1">
          <TwitterIcon
            size={40}
            round
            className="transition-all hover:opacity-90"
          />
        </TwitterShareButton> */}
        <WhatsappShareButton url={shareUrl} separator=":: " className="mx-1">
          <WhatsappIcon
            size={40}
            round
            className="transition-all hover:opacity-90"
          />
        </WhatsappShareButton>
        {/* <LinkedinShareButton url={shareUrl} className="mx-1">
          <LinkedinIcon
            size={40}
            round
            className="transition-all hover:opacity-90"
          />
        </LinkedinShareButton> */}
      </div>
      <Text variant="small">or copy link</Text>
      <form noValidate className="space-y-5">
        <div className="relative mt-2.5 mb-1.5">
          <Input
            type="link"
            variant="solid"
            className="w-full"
            value={shareUrl}
            inputClassName="px-4 border-border-base rounded-md focus:outline focus:border-brand"
            {...register('shareLink', {
              pattern: {
                value:
                  /^((https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}))$/,
                message: ' ',
              },
            })}
          />
          {!copyText.copied ? (
            <>
              {/* @ts-ignore */}
              <CopyToClipboard
                text={copyText.value}
                onCopy={() =>
                  setCopyText({
                    ...copyText,
                    copied: true,
                  })
                }
              >
                <span
                  className="absolute ltr:right-0.5 rtl:left-0.5 top-[6%] h-[90%] px-2 text-brand text-sm uppercase font-bold flex items-center bg-brand-light cursor-pointer"
                  role="button"
                >
                  copy
                </span>
              </CopyToClipboard>
            </>
          ) : (
            <span className="absolute ltr:right-0.5 rtl:left-0.5 top-[6%] h-[90%] ltr:pr-1.5 rtl:pl-1.5 ltr:pl-8 rtl:pr-8 text-brand text-sm uppercase font-bold flex items-center bg-brand-light cursor-pointer">
              Copied!
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default SocialShareBox;
