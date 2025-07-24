import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { ViewTransitions } from 'next-view-transitions';

import 'antd/dist/reset.css';
import '@/styles/globals.css';

import Navigation from '@/components/Navigation/Navigation';
import { ViewTransitionProvider } from '@/components/ViewTransitionProvider';
import AntdRegistry from '@/lib/antd-registry';
import { type Locale } from '@/lib/locale';
import { ThemeRegistry } from '@/lib/theme-registry';
import { pretendard } from '@/styles/fonts';

type LayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Pick<LayoutProps, 'params'>): Promise<Metadata> {
  const t = await getTranslations({
    namespace: 'default.metadata',
    locale: locale as Locale,
  });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({
  children,
  modal,
  params: { locale },
}: LayoutProps) {
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
                <ViewTransitionProvider>
                  <div className="flex h-full flex-col">
                    {children}
                    <Navigation className="mt-auto" />
                  </div>
                  {modal}
                </ViewTransitionProvider>
              </AntdRegistry>
            </NextIntlClientProvider>
          </ThemeRegistry>
        </body>
      </html>
    </ViewTransitions>
  );
}
