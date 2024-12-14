'use client';

import Heading from '@components/ui/heading';
import Accordion from '@components/ui/accordion';
import { help } from '@settings/help-setting';

export default function HelpCenter() {
  return (
    <>
      <Heading variant="titleLarge">Help Center</Heading>
      <div className="flex flex-col pt-6 2xl:pt-8">
        {help?.map((item, index) => (
          <Accordion
            key={`${item.title}-${index}`}
            item={item}
            translatorNS="help"
          />
        ))}
      </div>
    </>
  );
}
