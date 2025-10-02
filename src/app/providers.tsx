'use client';

import { useEffect, useMemo, useState } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';

import { ThemeRegistry } from '@/lib/theme-registry';
import {
  isInKakaoInAppBrowser,
  openExternalBrowser,
} from '@/utils/kakao-browser';

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
  const [timeZone, setTimeZone] = useState('UTC');

  useEffect(() => {
    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(browserTimeZone);
  }, []);

  useEffect(() => {
    if (NProgress.isStarted()) {
      NProgress.done();
    }
  }, [pathname]);

  // Redirect to external browser if in KakaoTalk in-app browser
  useEffect(() => {
    if (isInKakaoInAppBrowser()) {
      openExternalBrowser();
    }
  }, []);

  return (
    <ThemeRegistry>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone={timeZone}
      >
        <JotaiProvider>{children}</JotaiProvider>
      </NextIntlClientProvider>
    </ThemeRegistry>
  );
};
