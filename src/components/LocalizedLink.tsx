'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type LocalizedLinkProps = React.ComponentProps<typeof Link>;

export default function LocalizedLink({ href, ...rest }: LocalizedLinkProps) {
  const pathname = usePathname();
  const lang = pathname.split('/')[1];

  let localizedHref;

  if (typeof href === 'string') {
    localizedHref = `/${lang}${href}`;
  } else {
    localizedHref = {
      ...href,
      pathname: `/${lang}${href.pathname}`,
    };
  }

  return <Link href={localizedHref} {...rest} />;
}
