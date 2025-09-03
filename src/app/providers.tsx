'use client';

import { useEffect } from 'react';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';

import { ThemeRegistry } from '@/lib/theme-registry';

type Props = {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
  locale: string;
};

NProgress.configure({ showSpinner: false, speed: 100 });

/**
 * A wrapper component that composes all client-side context providers.
 * This keeps the root layout as a Server Component and centralizes provider logic.
 */
export const Providers = ({ children, messages, locale }: Props) => {
  const pathname = usePathname();

  useEffect(() => {
    if (NProgress.isStarted()) {
      NProgress.done();
    }
  }, [pathname]);

  console.log(process.env.NEXT_PUBLIC_APP_VERSION);
  return (
    <ThemeRegistry>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone="UTC"
      >
        {children}
      </NextIntlClientProvider>
    </ThemeRegistry>
  );
};
