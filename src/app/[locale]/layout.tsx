import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import 'antd/dist/reset.css';
import '@/styles/globals.css';

import Navigation from '@/components/Navigation/Navigation';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import AntdRegistry from '@/lib/antd-registry';
import { ThemeRegistry } from '@/lib/theme-registry';
import { pretendard } from '@/styles/fonts';

export const metadata: Metadata = {
  title: 'Modive App',
  description: 'A modern multilingual app',
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={pretendard.variable}
      suppressHydrationWarning
    >
      <body>
        <ThemeRegistry>
          <NextIntlClientProvider messages={messages}>
            <AntdRegistry>
              <div className="flex h-full flex-col">
                {children}
                <Navigation className="mt-auto" />
              </div>
            </AntdRegistry>
          </NextIntlClientProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
