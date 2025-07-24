import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { ViewTransitions } from 'next-view-transitions';

import 'antd/dist/reset.css';
import '@/styles/globals.css';

import Navigation from '@/components/Navigation/Navigation';
import AntdRegistry from '@/lib/antd-registry';
import { ThemeRegistry } from '@/lib/theme-registry';
import { pretendard } from '@/styles/fonts';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ namespace: 'default.metadata', locale });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({
  children,
  modal,
  params: { locale },
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <ViewTransitions>
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
                {modal}
              </AntdRegistry>
            </NextIntlClientProvider>
          </ThemeRegistry>
        </body>
      </html>
    </ViewTransitions>
  );
}
