'use client';

import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';

import { ThemeRegistry } from '@/lib/theme-registry';

type Props = {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
  locale: string;
};

/**
 * A wrapper component that composes all client-side context providers.
 * This keeps the root layout as a Server Component and centralizes provider logic.
 */
export const Providers = ({ children, messages, locale }: Props) => {
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
