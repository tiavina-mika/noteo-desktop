import NextHead from 'next/head';

import { SEO } from '../utils/texting';
import { formatPageTitle } from '../utils/utils';

type Props = {
  title?: string;
  metaDescription?: string;
}

const Head = ({
  title, metaDescription,
}: Props) => {
  const formattedTitle = formatPageTitle(title);

  return (
    <NextHead>
      <title>{formattedTitle}</title>
      <meta property="description" content={metaDescription || SEO.defaultMetaDescription} />
    </NextHead>
  );
};

export default Head;
