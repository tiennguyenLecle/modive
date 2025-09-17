'use client';

import { useEffect } from 'react';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';

import { createBrowserSupabase } from '@/lib/supabase/factory';
import { ThemeRegistry } from '@/lib/theme-registry';
import {
  backgroundRegisterSW,
  backgroundSubscribe,
  requestNotificationPermission,
} from '@/notifications';

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
  const supabase = createBrowserSupabase('user');

  useEffect(() => {
    if (NProgress.isStarted()) {
      NProgress.done();
    }
  }, [pathname]);

  useEffect(() => {
    const handleLoad = () => {
      requestNotificationPermission();
      // Run service worker registration immediately instead of waiting for idle
      backgroundRegisterSW()
        .then(reg => {
          if (reg) {
            backgroundSubscribe(supabase);
          }
        })
        .catch(error => {
          console.error('Providers: Service worker registration failed', error);
        });
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [supabase]);

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
